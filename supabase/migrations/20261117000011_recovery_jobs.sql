-- AetherVault: real recovery times measured by AWS Elastic Disaster Recovery.
--
-- The collector (read-only, in the customer's account) also calls drs:DescribeJobs and pushes
-- the recent recovery launch jobs (drills, recoveries, failbacks) to ingest_recovery_jobs().
-- AetherVault stores only job metadata: job ID, kind, status, start/end times and how many
-- servers launched. The console shows these as measured recovery times, separately from the
-- console's own drill records (whose recovery timer is still simulated and labeled so).
--
-- Recovery time here is AWS's job time: from the recovery request to the recovery servers
-- launched. It does not include the customer's own application checks.

create table public.recovery_jobs (
  org_id uuid not null references public.orgs (id) on delete cascade,
  job_id text not null check (job_id ~ '^drsjob-[0-9a-f]{17}$'),
  kind text not null check (kind in ('drill', 'recovery', 'failback')),
  status text not null check (status in ('PENDING', 'STARTED', 'COMPLETED')),
  aws_region text not null check (aws_region ~ '^[a-z]{2}(-gov)?-[a-z]+-[0-9]$'),
  started_at timestamptz not null,
  ended_at timestamptz,
  servers int not null check (servers between 0 and 500),
  launched int not null check (launched between 0 and 500),
  received_at timestamptz not null default now(),
  primary key (org_id, job_id),
  check (ended_at is null or ended_at >= started_at),
  check (launched <= servers)
);
create index recovery_jobs_org_idx on public.recovery_jobs (org_id, started_at desc);

alter table public.recovery_jobs enable row level security;
revoke all on public.recovery_jobs from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Ingest (collector, anon key + ingest token). Upserts by job ID; jobs move PENDING ->
-- STARTED -> COMPLETED across collector runs.
-- ---------------------------------------------------------------------------
create or replace function public.ingest_recovery_jobs(p_token text, p_region text, p_jobs jsonb)
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
  if coalesce(p_region, '') !~ '^[a-z]{2}(-gov)?-[a-z]+-[0-9]$' then
    raise exception 'invalid AWS Region' using errcode = 'check_violation';
  end if;
  if jsonb_typeof(p_jobs) <> 'array' or jsonb_array_length(p_jobs) > 100 then
    raise exception 'jobs must be an array of at most 100 entries' using errcode = 'check_violation';
  end if;

  insert into public.recovery_jobs as r
    (org_id, job_id, kind, status, aws_region, started_at, ended_at, servers, launched)
  select v_org,
         e->>'job_id',
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
    -- A finished job never goes back to running.
    where r.status <> 'COMPLETED';
  get diagnostics v_count = row_count;

  -- Keep 400 days (a year of quarterly drills plus margin).
  delete from public.recovery_jobs
   where org_id = v_org and started_at < now() - interval '400 days';

  return jsonb_build_object('accepted', true, 'jobs', jsonb_array_length(p_jobs), 'changed', v_count);
end
$$;

-- ---------------------------------------------------------------------------
-- Read (members): newest first, with the measured duration.
-- ---------------------------------------------------------------------------
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
                 'job_id', r.job_id, 'kind', r.kind, 'status', r.status, 'aws_region', r.aws_region,
                 'started_at', r.started_at, 'ended_at', r.ended_at,
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

revoke execute on function
  public.ingest_recovery_jobs(text, text, jsonb),
  public.list_recovery_jobs(uuid, int)
  from public;
grant execute on function public.ingest_recovery_jobs(text, text, jsonb) to anon, authenticated;
grant execute on function public.list_recovery_jobs(uuid, int) to authenticated;
