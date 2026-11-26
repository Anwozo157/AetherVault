-- AetherVault: multi-cloud groundwork (Azure Site Recovery next to AWS DRS).
--
-- Replication snapshots and recovery jobs were AWS-shaped: AWS Region names, DRS job IDs,
-- source 'aws-drs'. This adds Azure Site Recovery ('azure-asr') the same way, without changing
-- anything for AWS:
--
-- * replication_snapshots.source may be 'azure-asr'; the region may be an Azure region name
--   (eastus, westus2). aws_region keeps its column name (renaming would ripple through every
--   read); it holds the cloud's region. aws_account_id stays AWS-only (null for Azure: the
--   collector sends no subscription ID).
-- * recovery_jobs gets a source column. Azure jobs are identified by the job's resource name
--   (a GUID); their region is the Azure region.
-- * ingest_recovery_jobs() takes an optional p_source (default 'aws-drs', so collectors already
--   deployed keep working unchanged).
-- * link_recovery_job() matches an Azure job to a run targeting 'azure-<region>', the same way an
--   AWS job matches 'aws-<region>'.
--
-- Health is still computed in the database from the state the collector reports; the Azure
-- collector maps Site Recovery's health into the same state names (see
-- src/integrations/azureAsr/snapshot.ts).

-- ---------------------------------------------------------------------------
-- Region names per cloud
-- ---------------------------------------------------------------------------
create or replace function public.valid_cloud_region(p_source text, p_region text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select case
    when p_region is null then false
    when p_source = 'aws-drs' then p_region ~ '^[a-z]{2}(-gov)?-[a-z]+-[0-9]$'
    when p_source = 'azure-asr' then p_region ~ '^[a-z]{4,30}[0-9]?$'
    -- Sample data may use either cloud's names.
    when p_source = 'fixture' then p_region ~ '^[a-z]{2}(-gov)?-[a-z]+-[0-9]$' or p_region ~ '^[a-z]{4,30}[0-9]?$'
    else false
  end
$$;

-- ---------------------------------------------------------------------------
-- Replication snapshots
-- ---------------------------------------------------------------------------
alter table public.replication_snapshots drop constraint replication_snapshots_source_check;
alter table public.replication_snapshots drop constraint replication_snapshots_aws_region_check;
alter table public.replication_snapshots
  add constraint replication_snapshots_source_check check (source in ('aws-drs', 'azure-asr', 'fixture')),
  add constraint replication_snapshots_region_check check (public.valid_cloud_region(source, aws_region)),
  add constraint replication_snapshots_account_check check (source <> 'azure-asr' or aws_account_id is null);

-- ---------------------------------------------------------------------------
-- Recovery jobs
-- ---------------------------------------------------------------------------
alter table public.recovery_jobs add column source text not null default 'aws-drs'
  check (source in ('aws-drs', 'azure-asr'));
alter table public.recovery_jobs drop constraint recovery_jobs_job_id_check;
alter table public.recovery_jobs drop constraint recovery_jobs_aws_region_check;
alter table public.recovery_jobs
  add constraint recovery_jobs_job_id_check check (
    (source = 'aws-drs' and job_id ~ '^drsjob-[0-9a-f]{17}$')
    or (source = 'azure-asr' and job_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$')),
  add constraint recovery_jobs_region_check check (public.valid_cloud_region(source, aws_region));

drop function public.ingest_recovery_jobs(text, text, jsonb);
create function public.ingest_recovery_jobs(p_token text, p_region text, p_jobs jsonb,
                                            p_source text default 'aws-drs')
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_org uuid;
  v_count int;
begin
  select t.org_id into v_org from public.ingest_tokens t
   where t.token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
  if v_org is null then
    raise exception 'invalid ingest token' using errcode = 'insufficient_privilege';
  end if;
  if coalesce(p_source, '') not in ('aws-drs', 'azure-asr') then
    raise exception 'invalid source' using errcode = 'check_violation';
  end if;
  if not public.valid_cloud_region(p_source, p_region) then
    raise exception 'invalid %', case p_source when 'azure-asr' then 'Azure region' else 'AWS Region' end
      using errcode = 'check_violation';
  end if;
  if jsonb_typeof(p_jobs) <> 'array' or jsonb_array_length(p_jobs) > 100 then
    raise exception 'jobs must be an array of at most 100 entries' using errcode = 'check_violation';
  end if;

  insert into public.recovery_jobs as r
    (org_id, job_id, source, kind, status, aws_region, started_at, ended_at, servers, launched)
  select v_org,
         e->>'job_id',
         p_source,
         e->>'kind',
         upper(e->>'status'),
         p_region,
         (e->>'started_at')::timestamptz,
         (e->>'ended_at')::timestamptz,
         (e->>'servers')::int,
         (e->>'launched')::int
    from jsonb_array_elements(p_jobs) e
  on conflict (org_id, job_id) do update
    set status = excluded.status, ended_at = excluded.ended_at, servers = excluded.servers,
        launched = excluded.launched, received_at = now()
    -- A finished job never goes back to running, and a job never changes cloud.
    where r.status <> 'COMPLETED' and r.source = excluded.source;
  get diagnostics v_count = row_count;

  delete from public.recovery_jobs
   where org_id = v_org and started_at < now() - interval '400 days';

  return jsonb_build_object('accepted', true, 'jobs', jsonb_array_length(p_jobs), 'changed', v_count);
end
$$;

create or replace function public.list_recovery_jobs(p_org uuid, p_limit int default 20)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  return coalesce((
    select jsonb_agg(j order by j->>'started_at' desc)
      from (
        select jsonb_build_object(
                 'job_id', r.job_id, 'source', r.source, 'kind', r.kind, 'status', r.status,
                 'aws_region', r.aws_region, 'started_at', r.started_at, 'ended_at', r.ended_at,
                 'duration_seconds', extract(epoch from (r.ended_at - r.started_at)),
                 'servers', r.servers, 'launched', r.launched) j
          from public.recovery_jobs r
         where r.org_id = p_org
         order by r.started_at desc
         limit least(greatest(coalesce(p_limit, 20), 1), 100)
      ) x
  ), '[]'::jsonb);
end
$$;

-- ---------------------------------------------------------------------------
-- Linking a run to the cloud job that carried it out (rules unchanged; cloud-aware)
-- ---------------------------------------------------------------------------
create or replace function public.link_recovery_job(p_run uuid, p_job_id text)
returns numeric
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
  j public.recovery_jobs;
  v_seconds numeric;
  v_job_kind text;
  v_cloud text;
  v_prefix text;
begin
  select * into r from public.failover_runs where id = p_run for update;
  if not found or not public.has_role(r.org_id, 'operator') then
    raise exception 'operator role required' using errcode = 'insufficient_privilege';
  end if;
  if r.recovery_measured is not null then
    raise exception 'this run already has a measured recovery time' using errcode = 'unique_violation';
  end if;
  if r.approved_at is null then
    raise exception 'this run never launched' using errcode = 'check_violation';
  end if;
  select * into j from public.recovery_jobs where org_id = r.org_id and job_id = p_job_id;
  if not found then
    raise exception 'recovery job not found' using errcode = 'no_data_found';
  end if;
  v_cloud := case j.source when 'azure-asr' then 'Azure' else 'AWS' end;
  v_prefix := case j.source when 'azure-asr' then 'azure-' else 'aws-' end;
  v_job_kind := 'recovery';
  if r.kind = 'drill' then
    v_job_kind := 'drill';
  end if;
  if j.kind <> v_job_kind then
    raise exception 'a % run links to an % % job', r.kind, v_cloud, v_job_kind using errcode = 'check_violation';
  end if;
  if j.status <> 'COMPLETED' or j.ended_at is null or j.launched < 1 or j.launched <> j.servers then
    raise exception 'the % job has not launched every server', v_cloud using errcode = 'check_violation';
  end if;
  if r.target_region <> v_prefix || j.aws_region then
    raise exception 'the % job ran in a different Region than this run', v_cloud using errcode = 'check_violation';
  end if;
  if j.started_at < r.requested_at - interval '30 minutes' or j.started_at > r.requested_at + interval '6 hours' then
    raise exception 'the % job did not start near this run', v_cloud using errcode = 'check_violation';
  end if;

  v_seconds := round(extract(epoch from (j.ended_at - j.started_at))::numeric, 1);
  update public.failover_runs set recovery_measured = jsonb_build_object(
      'source', j.source,
      'job_id', j.job_id,
      'job_kind', j.kind,
      'aws_region', j.aws_region,
      'started_at', j.started_at,
      'ended_at', j.ended_at,
      'duration_seconds', v_seconds,
      'servers', j.servers,
      'launched', j.launched,
      'linked_by', (select u.email from auth.users u where u.id = (select auth.uid())),
      'linked_at', now())
   where id = p_run;
  perform public.append_audit(r.org_id, 'run.recovery_measured', jsonb_build_object(
    'run_id', r.id, 'job_id', j.job_id, 'source', j.source, 'aws_region', j.aws_region,
    'duration_seconds', v_seconds));
  return v_seconds;
exception when unique_violation then
  if sqlerrm like '%failover_runs_one_run_per_job%' then
    raise exception 'that % job is already linked to another run', coalesce(v_cloud, 'AWS') using errcode = 'unique_violation';
  end if;
  raise;
end
$$;

revoke execute on function
  public.ingest_recovery_jobs(text, text, jsonb, text),
  public.list_recovery_jobs(uuid, int),
  public.link_recovery_job(uuid, text)
  from public;
-- valid_cloud_region() stays executable: check constraints call it as the inserting role.
grant execute on function public.ingest_recovery_jobs(text, text, jsonb, text) to anon, authenticated;
grant execute on function public.list_recovery_jobs(uuid, int) to authenticated;
grant execute on function public.link_recovery_job(uuid, text) to authenticated;
