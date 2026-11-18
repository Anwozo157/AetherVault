-- AetherVault: drill and failover records carry the recovery time measured by AWS.
--
-- Until now a console run's recovery time came from the simulated stage model (5.5 s, labeled
-- "simulated"), while the real AWS Elastic Disaster Recovery jobs sat in a separate table
-- (recovery_jobs). An operator now links a run to the AWS job that carried it out. From then
-- on the runs list and the evidence report use AWS's measured time instead of the simulated one.
--
-- Linking is explicit and audited, not guessed: the console suggests the matching job, a person
-- confirms it. A link is permanent (evidence must not change after the fact), and the job's
-- facts are copied onto the run, so the evidence survives the 400-day job retention.
--
-- Rules: drill runs link to DRS drill jobs, failover runs to DRS recovery jobs; the job must be
-- COMPLETED with every server launched, in the run's target Region, and started between 30
-- minutes before and 6 hours after the run was requested; each job links to one run only.

alter table public.failover_runs add column recovery_measured jsonb;
create unique index failover_runs_one_run_per_job
  on public.failover_runs (org_id, (recovery_measured->>'job_id'))
  where recovery_measured is not null;

-- Recovery time for a run: AWS's measured job time when linked, else the simulated model.
create or replace function public.run_recovery_seconds(r public.failover_runs)
returns numeric
language sql
stable
set search_path = ''
as $$
  select case
    when r.recovery_measured is not null then (r.recovery_measured->>'duration_seconds')::numeric
    when public.run_outcome(r) = 'secured' then 5.5
  end
$$;

-- ---------------------------------------------------------------------------
-- Link (operators and above).
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
  v_job_kind := 'recovery';
  if r.kind = 'drill' then
    v_job_kind := 'drill';
  end if;
  if j.kind <> v_job_kind then
    raise exception 'a % run links to an AWS % job', r.kind, v_job_kind using errcode = 'check_violation';
  end if;
  if j.status <> 'COMPLETED' or j.ended_at is null or j.launched < 1 or j.launched <> j.servers then
    raise exception 'the AWS job has not launched every server' using errcode = 'check_violation';
  end if;
  if r.target_region <> 'aws-' || j.aws_region then
    raise exception 'the AWS job ran in a different Region than this run' using errcode = 'check_violation';
  end if;
  if j.started_at < r.requested_at - interval '30 minutes' or j.started_at > r.requested_at + interval '6 hours' then
    raise exception 'the AWS job did not start near this run' using errcode = 'check_violation';
  end if;

  v_seconds := round(extract(epoch from (j.ended_at - j.started_at))::numeric, 1);
  update public.failover_runs set recovery_measured = jsonb_build_object(
      'source', 'aws-drs',
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
    'run_id', r.id, 'job_id', j.job_id, 'aws_region', j.aws_region, 'duration_seconds', v_seconds));
  return v_seconds;
exception when unique_violation then
  if sqlerrm like '%failover_runs_one_run_per_job%' then
    raise exception 'that AWS job is already linked to another run' using errcode = 'unique_violation';
  end if;
  raise;
end
$$;

-- ---------------------------------------------------------------------------
-- Reads: runs list and evidence use the measured time when present.
-- ---------------------------------------------------------------------------
drop function public.list_failover_runs(uuid, int);
create function public.list_failover_runs(p_org uuid, p_limit int default 50)
returns table (
  id uuid, kind text, trigger text, source_region text, target_region text,
  requested_by_email text, requested_at timestamptz,
  approved_by_email text, approved_at timestamptz,
  aborted_at timestamptz, reset_at timestamptz,
  outcome text, recovery_seconds numeric, rto_target_seconds int,
  rpo_met boolean, rpo_seconds numeric, rpo_target_seconds int, replication_source text,
  recovery_job_id text
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  return query
    select r.id, r.kind, r.trigger, r.source_region, r.target_region,
           ru.email::text, r.requested_at,
           au.email::text, r.approved_at,
           r.aborted_at, r.reset_at,
           public.run_outcome(r),
           public.run_recovery_seconds(r),
           o.rto_target_seconds,
           (r.replication_at_launch->>'rpo_met')::boolean,
           (r.replication_at_launch->>'max_lag_seconds')::numeric,
           (r.replication_at_launch->>'rpo_target_seconds')::int,
           r.replication_at_launch->>'source',
           r.recovery_measured->>'job_id'
      from public.failover_runs r
      join public.orgs o on o.id = r.org_id
      left join auth.users ru on ru.id = r.requested_by
      left join auth.users au on au.id = r.approved_by
     where r.org_id = p_org
     order by r.requested_at desc
     limit least(greatest(p_limit, 1), 200);
end
$$;

-- Evidence report v5: recovery time measured by AWS when the run is linked to its job.
create or replace function public.drill_evidence(p_run uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
  o public.orgs;
  v_outcome text;
  v_recovery numeric;
  v_rep jsonb;
  v_checklist jsonb;
begin
  select * into r from public.failover_runs where id = p_run;
  if not found or not public.has_role(r.org_id, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  select * into o from public.orgs where id = r.org_id;
  v_outcome := public.run_outcome(r);
  v_recovery := public.run_recovery_seconds(r);
  v_rep := r.replication_at_launch;
  v_checklist := public.run_checklist(p_run);

  return jsonb_build_object(
    'report_version', 5,
    'generated_at', now(),
    'generated_by', (select u.email from auth.users u where u.id = (select auth.uid())),
    'organization', jsonb_build_object('id', o.id, 'name', o.name),
    'objectives', jsonb_build_object('rto_seconds', o.rto_target_seconds, 'rpo_seconds', o.rpo_target_seconds),
    'run', jsonb_build_object(
      'id', r.id,
      'kind', r.kind,
      'trigger', r.trigger,
      'source_region', r.source_region,
      'target_region', r.target_region,
      'requested_by', (select u.email from auth.users u where u.id = r.requested_by),
      'requested_at', r.requested_at,
      'approved_by', (select u.email from auth.users u where u.id = r.approved_by),
      'approved_at', r.approved_at,
      'aborted_at', r.aborted_at,
      'reset_at', r.reset_at,
      'outcome', v_outcome,
      'two_person_rule_met', case when r.kind = 'drill' then null
                                  else r.approved_by is not null and r.approved_by <> r.requested_by end
    ),
    'timeline', public.drill_timeline(r),
    'results', jsonb_build_object(
      'decision_seconds', case when r.kind = 'failover' and r.approved_at is not null
                               then round(extract(epoch from r.approved_at - r.requested_at)::numeric, 1) end,
      'recovery_seconds', v_recovery,
      'recovery_simulated', r.recovery_measured is null,
      'rto_met', case when v_recovery is not null then v_recovery <= o.rto_target_seconds end,
      'rpo_measured', v_rep->'rpo_met' is not null and v_rep->'rpo_met' <> 'null'::jsonb,
      'rpo_seconds', v_rep->'max_lag_seconds',
      'rpo_met', v_rep->'rpo_met'
    ),
    'recovery_measured', r.recovery_measured,
    'replication_at_launch', v_rep,
    'runbook', case when v_checklist is null then null else jsonb_build_object(
      'version', v_checklist->'version',
      'total', jsonb_array_length(v_checklist->'steps'),
      'completed', (select count(*) from jsonb_array_elements(v_checklist->'steps') s where (s->>'done')::boolean),
      'steps', (select coalesce(jsonb_agg(jsonb_build_object(
                  'id', t.s->'id', 'phase', t.s->'phase', 'title', t.s->'title', 'done', t.s->'done',
                  'checked_by', t.s->'checked_by', 'checked_at', t.s->'checked_at', 'note', t.s->'note')
                  order by t.ord), '[]'::jsonb)
                  from jsonb_array_elements(v_checklist->'steps') with ordinality as t(s, ord))) end,
    'audit_entries', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', a.id, 'at', a.created_at, 'actor', au.email, 'action', a.action, 'hash', a.hash)
             order by a.id)
        from public.audit_log a
        left join auth.users au on au.id = a.actor
       where a.org_id = r.org_id and a.detail->>'run_id' = r.id::text
    ), '[]'::jsonb),
    'chain', public.verify_audit_chain_report(r.org_id)
  );
end
$$;

-- ---------------------------------------------------------------------------
-- Privileges
-- ---------------------------------------------------------------------------
revoke execute on function
  public.run_recovery_seconds(public.failover_runs),
  public.link_recovery_job(uuid, text),
  public.list_failover_runs(uuid, int)
from public, anon, authenticated;
grant execute on function
  public.link_recovery_job(uuid, text),
  public.list_failover_runs(uuid, int)
to authenticated;
