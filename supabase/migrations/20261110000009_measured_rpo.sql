-- Phase 4.5: measured data-loss (RPO) in drill and failover evidence.
--
-- When a drill launches or a failover is approved, the latest replication snapshot received in
-- the 5 minutes before that moment is copied onto the run. Its worst replication lag is the data
-- that would have been lost had the primary failed at that instant: the measured RPO.
-- The copy lives on the run (snapshots are kept 7 days; evidence must outlive them).
-- No snapshot in the window, or no lag reported -> RPO "not measured", exactly as before.
-- Recovery time is still simulated (5.5 s stage model) and stays labeled as such.

alter table public.failover_runs add column replication_at_launch jsonb;

-- Snapshot summary at a point in time (server receive clock, not the collector's), or null.
create or replace function public.replication_at(p_org uuid, p_at timestamptz)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
           'snapshot_id', s.id,
           'source', s.source,
           'collected_at', s.collected_at,
           'received_at', s.received_at,
           'aws_account_id', s.aws_account_id,
           'aws_region', s.aws_region,
           'server_count', s.server_count,
           'healthy_count', s.healthy_count,
           'problem_count', s.problem_count,
           'max_lag_seconds', s.max_lag_seconds,
           'rpo_target_seconds', s.rpo_target_seconds,
           'rpo_met', s.rpo_met)
    from public.replication_snapshots s
   where s.org_id = p_org
     and s.received_at <= p_at
     and s.received_at > p_at - interval '5 minutes'
   order by s.received_at desc
   limit 1
$$;

create or replace function public.capture_replication_at_launch()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.approved_at is not null and new.replication_at_launch is null
     and (tg_op = 'INSERT' or old.approved_at is null) then
    new.replication_at_launch := public.replication_at(new.org_id, new.approved_at);
  end if;
  return new;
end
$$;

create trigger failover_runs_capture_replication
  before insert or update of approved_at on public.failover_runs
  for each row execute function public.capture_replication_at_launch();

-- ---------------------------------------------------------------------------
-- Scheduler: a drill fails if recovery missed the RTO *or* measured replication missed the RPO.
-- (Same as 4.2 otherwise.)
-- ---------------------------------------------------------------------------
create or replace function public.run_drill_scheduler(p_now timestamptz default now())
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
  s public.drill_schedules;
  v_rto int;
  v_aborted boolean;
  v_rpo_met boolean;
  v_completed int := 0;
  v_started int := 0;
begin
  -- The scheduler acts as the system: audit entries it writes have no actor.
  perform set_config('request.jwt.claims', '', true);
  perform set_config('request.jwt.claim.sub', '', true);

  -- 1. Record drills that have finished (or were aborted).
  for r in
    select * from public.failover_runs f
     where f.kind = 'drill' and f.completed_at is null
       and (f.aborted_at is not null or p_now >= f.approved_at + interval '5.5 seconds')
     order by f.approved_at
     for update skip locked
  loop
    select o.rto_target_seconds into v_rto from public.orgs o where o.id = r.org_id;
    v_aborted := r.aborted_at is not null;
    v_rpo_met := (r.replication_at_launch->>'rpo_met')::boolean;
    update public.failover_runs
       set completed_at = case when v_aborted then r.aborted_at else r.approved_at + interval '5.5 seconds' end
     where id = r.id;
    perform public.append_audit(r.org_id, 'drill.completed', jsonb_build_object(
      'run_id', r.id,
      'trigger', r.trigger,
      'result', case when v_aborted then 'aborted'
                     when 5.5 <= v_rto and v_rpo_met is not false then 'passed'
                     else 'failed' end,
      'recovery_seconds', case when v_aborted then null else 5.5 end,
      'rto_target_seconds', v_rto,
      'simulated', true,
      'rpo_measured', v_rpo_met is not null,
      'rpo_met', v_rpo_met,
      'rpo_seconds', r.replication_at_launch->'max_lag_seconds',
      'rpo_target_seconds', r.replication_at_launch->'rpo_target_seconds',
      'replication_source', r.replication_at_launch->>'source'));
    v_completed := v_completed + 1;
  end loop;

  -- 2. Launch drills that are due (one per organization; catch-up runs once, not per missed slot).
  for s in
    select * from public.drill_schedules d
     where d.enabled and d.next_run_at <= p_now
     order by d.next_run_at
     for update skip locked
  loop
    if exists (select 1 from public.failover_runs f
                where f.org_id = s.org_id and f.kind = 'drill' and f.completed_at is null) then
      continue; -- a drill is still running; try again next minute
    end if;
    perform public.launch_drill(s.org_id, s.source_region, s.target_region, 'scheduled', p_now,
      jsonb_build_object('scheduled_for', s.next_run_at));
    update public.drill_schedules
       set last_run_at = p_now, next_run_at = public.next_drill_time(s.anchor_at, s.cadence, p_now)
     where org_id = s.org_id;
    v_started := v_started + 1;
  end loop;

  return jsonb_build_object('completed', v_completed, 'started', v_started);
end
$$;

-- ---------------------------------------------------------------------------
-- Alerts: drill results say whether data loss was measured, and from what.
-- ---------------------------------------------------------------------------
create or replace function public.drill_rpo_note(p_detail jsonb)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when p_detail->>'rpo_met' is null then ' Data-loss target not measured (no replication data at launch).'
    else format(' Data-loss target %s: worst lag %s (target %s s, %s).',
                case when (p_detail->>'rpo_met')::boolean then 'met' else 'MISSED' end,
                coalesce((p_detail->>'rpo_seconds') || ' s', 'unknown, servers not replicating'),
                p_detail->>'rpo_target_seconds',
                case when p_detail->>'replication_source' = 'fixture' then 'SAMPLE DATA'
                     else 'measured from AWS DRS' end)
  end
$$;

create or replace function public.alert_for(p_action text, p_detail jsonb, p_actor text)
returns jsonb
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_run text := p_detail->>'run_id';
  v_result text := p_detail->>'result';
  v_sample text := case when p_detail->>'source' = 'fixture' then ' [SAMPLE DATA]' else '' end;
begin
  return case
    when p_action = 'failover.requested' then jsonb_build_object(
      'category', 'failover', 'severity', 'warning', 'pd_action', 'trigger', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover requested by %s: %s → %s. Needs a second approver.',
                      p_actor, p_detail->>'source', p_detail->>'target'))
    when p_action = 'failover.approved' then jsonb_build_object(
      'category', 'failover', 'severity', 'critical', 'pd_action', 'trigger', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover approved by %s. Executing now.', p_actor))
    when p_action = 'failover.aborted' and p_detail->>'stage' = 'PENDING_APPROVAL' then jsonb_build_object(
      'category', 'failover', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover request withdrawn by %s.', p_actor))
    when p_action = 'failover.aborted' then jsonb_build_object(
      'category', 'failover', 'severity', 'warning', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover aborted by %s at %s.', p_actor, lower(replace(p_detail->>'stage', '_', ' '))))
    when p_action = 'failover.reset' then jsonb_build_object(
      'category', 'failover', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover reset by %s. Primary region active.', p_actor))
    when p_action = 'drill.completed' and v_result = 'failed' then jsonb_build_object(
      'category', 'drill_failed', 'severity', 'error', 'pd_action', 'trigger', 'dedup_key', 'drill-' || v_run,
      'title', format('Drill FAILED: recovery took %s s (simulated), target %s s.%s',
                      p_detail->>'recovery_seconds', p_detail->>'rto_target_seconds',
                      public.drill_rpo_note(p_detail)))
    when p_action = 'drill.completed' and v_result = 'aborted' then jsonb_build_object(
      'category', 'drill_failed', 'severity', 'warning', 'pd_action', null, 'dedup_key', 'drill-' || v_run,
      'title', 'Drill aborted before completion.')
    when p_action = 'drill.completed' and v_result = 'passed' then jsonb_build_object(
      'category', 'drill_passed', 'severity', 'info', 'pd_action', null, 'dedup_key', 'drill-' || v_run,
      'title', format('Drill passed: recovered in %s s (simulated), target %s s.%s',
                      p_detail->>'recovery_seconds', p_detail->>'rto_target_seconds',
                      public.drill_rpo_note(p_detail)))
    when p_action = 'replication.rpo_breached' then jsonb_build_object(
      'category', 'replication', 'severity', 'error', 'pd_action', 'trigger', 'dedup_key', 'replication-rpo',
      'title', format('Data-loss target at risk%s: %s of %s servers not replicating normally; worst lag %s s (target %s s).',
                      v_sample, p_detail->>'problem_count', p_detail->>'server_count',
                      coalesce(p_detail->>'max_lag_seconds', 'unknown'), p_detail->>'rpo_target_seconds'))
    when p_action = 'replication.rpo_recovered' then jsonb_build_object(
      'category', 'replication', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'replication-rpo',
      'title', format('Replication back within the data-loss target%s: worst lag %s s (target %s s).',
                      v_sample, p_detail->>'max_lag_seconds', p_detail->>'rpo_target_seconds'))
  end;
end
$$;

-- ---------------------------------------------------------------------------
-- Reads: runs list and evidence carry the measured RPO.
-- ---------------------------------------------------------------------------
drop function public.list_failover_runs(uuid, int);
create function public.list_failover_runs(p_org uuid, p_limit int default 50)
returns table (
  id uuid, kind text, trigger text, source_region text, target_region text,
  requested_by_email text, requested_at timestamptz,
  approved_by_email text, approved_at timestamptz,
  aborted_at timestamptz, reset_at timestamptz,
  outcome text, recovery_seconds numeric, rto_target_seconds int,
  rpo_met boolean, rpo_seconds numeric, rpo_target_seconds int, replication_source text
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
           case when public.run_outcome(r) = 'secured' then 5.5 end,
           o.rto_target_seconds,
           (r.replication_at_launch->>'rpo_met')::boolean,
           (r.replication_at_launch->>'max_lag_seconds')::numeric,
           (r.replication_at_launch->>'rpo_target_seconds')::int,
           r.replication_at_launch->>'source'
      from public.failover_runs r
      join public.orgs o on o.id = r.org_id
      left join auth.users ru on ru.id = r.requested_by
      left join auth.users au on au.id = r.approved_by
     where r.org_id = p_org
     order by r.requested_at desc
     limit least(greatest(p_limit, 1), 200);
end
$$;

-- Evidence report v3: results carry the measured RPO and the replication snapshot it came from.
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
begin
  select * into r from public.failover_runs where id = p_run;
  if not found or not public.has_role(r.org_id, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  select * into o from public.orgs where id = r.org_id;
  v_outcome := public.run_outcome(r);
  v_recovery := case when v_outcome = 'secured' then 5.5 end;
  v_rep := r.replication_at_launch;

  return jsonb_build_object(
    'report_version', 3,
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
      'recovery_simulated', true,
      'rto_met', case when v_recovery is not null then v_recovery <= o.rto_target_seconds end,
      'rpo_measured', v_rep->'rpo_met' is not null and v_rep->'rpo_met' <> 'null'::jsonb,
      'rpo_seconds', v_rep->'max_lag_seconds',
      'rpo_met', v_rep->'rpo_met'
    ),
    'replication_at_launch', v_rep,
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
-- Privileges (new and re-created functions)
-- ---------------------------------------------------------------------------
revoke execute on function
  public.replication_at(uuid, timestamptz),
  public.capture_replication_at_launch(),
  public.drill_rpo_note(jsonb),
  public.list_failover_runs(uuid, int)
from public, anon, authenticated;
grant execute on function public.list_failover_runs(uuid, int) to authenticated;
