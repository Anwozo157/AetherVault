-- AetherVault Phase 4.2: scheduled, non-disruptive DR drills.
--
-- A drill launches recovery in an isolated network and checks it against the recovery time
-- target, without cutting production traffic over (AWS Elastic Disaster Recovery "drill"
-- launches work this way). Because nothing in production changes, a drill does not need the
-- two-person approval a real failover does; it is still recorded in the audit log and
-- produces the same evidence report.
--
-- * Drills are rows in failover_runs with kind = 'drill'. approved_at holds the launch time,
--   so run_stage() / run_outcome() and the evidence timeline work unchanged.
-- * Drills never appear as the organization's live failover (get_failover_status) and never
--   block a real failover. At most one drill runs at a time per organization.
-- * drill_schedules: one schedule per organization (weekly, monthly, quarterly), set by admins.
-- * run_drill_scheduler(): called every minute by pg_cron. It records completed drills
--   (audit 'drill.completed', which alerting builds on) and launches drills that are due.
-- * Telemetry is still simulated: drill timing follows the stage model (ADR 0003).

create extension if not exists pg_cron with schema pg_catalog;

-- ---------------------------------------------------------------------------
-- Drill runs
-- ---------------------------------------------------------------------------
alter table public.failover_runs
  add column kind text not null default 'failover' check (kind in ('failover', 'drill')),
  add column trigger text check (trigger in ('scheduled', 'manual')),
  add column completed_at timestamptz;

-- Scheduled drills have no human requester.
alter table public.failover_runs alter column requested_by drop not null;
alter table public.failover_runs drop constraint approval_fields_together;
alter table public.failover_runs
  add constraint failover_has_requester check (kind = 'drill' or requested_by is not null),
  add constraint approval_fields_together
    check (kind = 'drill' or (approved_by is null) = (approved_at is null)),
  add constraint drill_shape
    check (kind = 'failover' or (trigger is not null and approved_by is null and approved_at is not null)),
  add constraint failover_shape check (kind = 'drill' or (trigger is null and completed_at is null));

drop index public.failover_runs_one_open_per_org;
create unique index failover_runs_one_open_per_org
  on public.failover_runs (org_id)
  where kind = 'failover' and aborted_at is null and reset_at is null;
create unique index failover_runs_one_drill_per_org
  on public.failover_runs (org_id)
  where kind = 'drill' and completed_at is null;

-- Drill stage names: a drill never cuts production DNS over.
create or replace function public.drill_timeline(r public.failover_runs)
returns jsonb
language sql
stable
set search_path = ''
as $$
  select case
    when r.approved_at is null then '[]'::jsonb
    when r.kind = 'drill' then jsonb_build_array(
      jsonb_build_object('stage', 'SNAPSHOT_SELECTED', 'at', r.approved_at),
      jsonb_build_object('stage', 'LAUNCH_ISOLATED_INSTANCE', 'at', r.approved_at + interval '1.2 seconds'),
      jsonb_build_object('stage', 'VALIDATE_RECOVERY', 'at', r.approved_at + interval '3.5 seconds'),
      jsonb_build_object('stage', 'DRILL_COMPLETE', 'at', r.approved_at + interval '5.5 seconds'))
    else jsonb_build_array(
      jsonb_build_object('stage', 'QUIESCE_AND_SNAPSHOT', 'at', r.approved_at),
      jsonb_build_object('stage', 'HYDRATING_TARGET', 'at', r.approved_at + interval '1.2 seconds'),
      jsonb_build_object('stage', 'DNS_CUTOVER', 'at', r.approved_at + interval '3.5 seconds'),
      jsonb_build_object('stage', 'TARGET_SECURED', 'at', r.approved_at + interval '5.5 seconds'))
  end
$$;

-- ---------------------------------------------------------------------------
-- Schedules
-- ---------------------------------------------------------------------------
create table public.drill_schedules (
  org_id uuid primary key references public.orgs (id) on delete cascade,
  cadence text not null check (cadence in ('weekly', 'monthly', 'quarterly')),
  -- First run; later runs are anchor + n * cadence, so monthly drills don't drift.
  anchor_at timestamptz not null,
  next_run_at timestamptz not null,
  last_run_at timestamptz,
  source_region text not null check (source_region ~ '^[a-z0-9-]{2,40}$'),
  target_region text not null check (target_region ~ '^[a-z0-9-]{2,40}$'),
  enabled boolean not null default true,
  updated_by uuid references auth.users (id),
  updated_at timestamptz not null default now()
);

alter table public.drill_schedules enable row level security;
create policy "members read drill schedule" on public.drill_schedules
  for select to authenticated using (public.has_role(org_id, 'viewer'));
revoke all on public.drill_schedules from anon, authenticated;
grant select on public.drill_schedules to authenticated;

create or replace function public.cadence_interval(p_cadence text)
returns interval
language sql
immutable
set search_path = ''
as $$
  select case p_cadence
    when 'weekly' then interval '7 days'
    when 'monthly' then interval '1 month'
    when 'quarterly' then interval '3 months'
  end
$$;

-- First anchor + n * cadence strictly after p_after.
create or replace function public.next_drill_time(p_anchor timestamptz, p_cadence text, p_after timestamptz)
returns timestamptz
language plpgsql
immutable
set search_path = ''
as $$
declare
  n int := 0;
begin
  if p_anchor > p_after then
    return p_anchor;
  end if;
  -- Jump close for weekly; months need the loop (variable length).
  if p_cadence = 'weekly' then
    n := floor(extract(epoch from p_after - p_anchor) / 604800)::int;
  end if;
  while p_anchor + public.cadence_interval(p_cadence) * n <= p_after loop
    n := n + 1;
  end loop;
  return p_anchor + public.cadence_interval(p_cadence) * n;
end
$$;

create or replace function public.set_drill_schedule(
  p_org uuid, p_cadence text, p_first_run timestamptz, p_source text, p_target text
)
returns timestamptz
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_next timestamptz;
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if public.cadence_interval(p_cadence) is null then
    raise exception 'cadence must be weekly, monthly or quarterly' using errcode = 'check_violation';
  end if;
  if p_first_run is null or p_first_run > now() + interval '1 year' then
    raise exception 'first drill must be within the next year' using errcode = 'check_violation';
  end if;
  v_next := public.next_drill_time(p_first_run, p_cadence, now() - interval '1 minute');
  insert into public.drill_schedules
    (org_id, cadence, anchor_at, next_run_at, source_region, target_region, enabled, updated_by, updated_at)
  values (p_org, p_cadence, p_first_run, v_next, p_source, p_target, true, (select auth.uid()), now())
  on conflict (org_id) do update
    set cadence = excluded.cadence, anchor_at = excluded.anchor_at, next_run_at = excluded.next_run_at,
        source_region = excluded.source_region, target_region = excluded.target_region,
        enabled = true, updated_by = excluded.updated_by, updated_at = excluded.updated_at;
  perform public.append_audit(p_org, 'drill.schedule_set', jsonb_build_object(
    'cadence', p_cadence, 'next_run_at', v_next, 'source', p_source, 'target', p_target));
  return v_next;
end
$$;

create or replace function public.disable_drill_schedule(p_org uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  update public.drill_schedules set enabled = false, updated_by = (select auth.uid()), updated_at = now()
   where org_id = p_org and enabled;
  if found then
    perform public.append_audit(p_org, 'drill.schedule_disabled', '{}'::jsonb);
  end if;
end
$$;

-- ---------------------------------------------------------------------------
-- Launching and completing drills
-- ---------------------------------------------------------------------------
create or replace function public.launch_drill(
  p_org uuid, p_source text, p_target text, p_trigger text, p_at timestamptz, p_detail jsonb default '{}'::jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_run uuid;
begin
  insert into public.failover_runs
    (org_id, kind, trigger, source_region, target_region, requested_by, requested_at, approved_at)
  values (p_org, 'drill', p_trigger, p_source, p_target,
          case when p_trigger = 'manual' then (select auth.uid()) end, p_at, p_at)
  returning id into v_run;
  perform public.append_audit(p_org, 'drill.started', jsonb_build_object(
    'run_id', v_run, 'trigger', p_trigger, 'source', p_source, 'target', p_target) || p_detail);
  return v_run;
end
$$;

-- On-demand drill (operators and above).
create or replace function public.start_drill(p_org uuid, p_source text, p_target text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'operator') then
    raise exception 'operator role required' using errcode = 'insufficient_privilege';
  end if;
  return public.launch_drill(p_org, p_source, p_target, 'manual', now());
exception when unique_violation then
  raise exception 'a drill is already running for this organization' using errcode = 'unique_violation';
end
$$;

-- Called by pg_cron every minute (and by tests with an explicit time).
-- Not callable by clients.
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
    update public.failover_runs
       set completed_at = case when v_aborted then r.aborted_at else r.approved_at + interval '5.5 seconds' end
     where id = r.id;
    perform public.append_audit(r.org_id, 'drill.completed', jsonb_build_object(
      'run_id', r.id,
      'trigger', r.trigger,
      'result', case when v_aborted then 'aborted' when 5.5 <= v_rto then 'passed' else 'failed' end,
      'recovery_seconds', case when v_aborted then null else 5.5 end,
      'rto_target_seconds', v_rto,
      'simulated', true));
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
-- Reads: drills stay out of the live status; runs list and evidence know about drills.
-- ---------------------------------------------------------------------------
create or replace function public.get_failover_status(p_org uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;

  -- The open failover if there is one (at most one, by unique index). Drills never count.
  select * into r
    from public.failover_runs f
   where f.org_id = p_org and f.kind = 'failover' and f.aborted_at is null and f.reset_at is null
   limit 1;

  return jsonb_build_object(
    'server_now', now(),
    'run', case when r.id is null then null else jsonb_build_object(
      'id', r.id,
      'source_region', r.source_region,
      'target_region', r.target_region,
      'requested_by', r.requested_by,
      'requested_by_email', (select u.email from auth.users u where u.id = r.requested_by),
      'requested_at', r.requested_at,
      'approved_by', r.approved_by,
      'approved_by_email', (select u.email from auth.users u where u.id = r.approved_by),
      'approved_at', r.approved_at,
      'stage', public.run_stage(r)
    ) end
  );
end
$$;

drop function public.list_failover_runs(uuid, int);
create function public.list_failover_runs(p_org uuid, p_limit int default 50)
returns table (
  id uuid, kind text, trigger text, source_region text, target_region text,
  requested_by_email text, requested_at timestamptz,
  approved_by_email text, approved_at timestamptz,
  aborted_at timestamptz, reset_at timestamptz,
  outcome text, recovery_seconds numeric, rto_target_seconds int
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
           o.rto_target_seconds
      from public.failover_runs r
      join public.orgs o on o.id = r.org_id
      left join auth.users ru on ru.id = r.requested_by
      left join auth.users au on au.id = r.approved_by
     where r.org_id = p_org
     order by r.requested_at desc
     limit least(greatest(p_limit, 1), 200);
end
$$;

-- Evidence report v2: adds run.kind and run.trigger; two_person_rule_met is null for drills
-- (not required: nothing in production changes).
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
begin
  select * into r from public.failover_runs where id = p_run;
  if not found or not public.has_role(r.org_id, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  select * into o from public.orgs where id = r.org_id;
  v_outcome := public.run_outcome(r);
  v_recovery := case when v_outcome = 'secured' then 5.5 end;

  return jsonb_build_object(
    'report_version', 2,
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
      'rto_met', case when v_recovery is not null then v_recovery <= o.rto_target_seconds end,
      'rpo_measured', false
    ),
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
  public.drill_timeline(public.failover_runs),
  public.cadence_interval(text),
  public.next_drill_time(timestamptz, text, timestamptz),
  public.set_drill_schedule(uuid, text, timestamptz, text, text),
  public.disable_drill_schedule(uuid),
  public.launch_drill(uuid, text, text, text, timestamptz, jsonb),
  public.start_drill(uuid, text, text),
  public.run_drill_scheduler(timestamptz),
  public.list_failover_runs(uuid, int)
from public, anon, authenticated;
grant execute on function
  public.set_drill_schedule(uuid, text, timestamptz, text, text),
  public.disable_drill_schedule(uuid),
  public.start_drill(uuid, text, text),
  public.list_failover_runs(uuid, int)
to authenticated;

alter publication supabase_realtime add table public.drill_schedules;

-- Every minute. Idempotent: re-running a migration replaces the job of the same name.
select cron.schedule('aethervault-drill-scheduler', '* * * * *', 'select public.run_drill_scheduler()');
