-- pgTAP tests for scheduled, non-disruptive drills.
begin;
create extension if not exists pgtap with schema extensions;
select plan(31);

insert into auth.users (id, email, aud, role) values
  ('c1000000-0000-0000-0000-000000000001', 'admin@sch.local', 'authenticated', 'authenticated'),
  ('c1000000-0000-0000-0000-000000000002', 'op@sch.local',    'authenticated', 'authenticated'),
  ('c1000000-0000-0000-0000-000000000003', 'view@sch.local',  'authenticated', 'authenticated'),
  ('c1000000-0000-0000-0000-000000000004', 'out@sch.local',   'authenticated', 'authenticated'),
  ('c1000000-0000-0000-0000-000000000005', 'ap@sch.local',    'authenticated', 'authenticated');
insert into public.orgs (id, name) values
  ('c2000000-0000-0000-0000-000000000001', 'Schedule Org'),
  ('c2000000-0000-0000-0000-000000000002', 'Other Org');
insert into public.memberships (org_id, user_id, role) values
  ('c2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'admin'),
  ('c2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'operator'),
  ('c2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000003', 'viewer'),
  ('c2000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000005', 'approver'),
  ('c2000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000004', 'admin');

-- The scheduler covers every organization: park anything left by other runs (rolled back at the end).
update public.drill_schedules set enabled = false;
update public.failover_runs set completed_at = approved_at where kind = 'drill' and completed_at is null;

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
create function pg_temp.last_action(p_org uuid) returns text language sql as $$
  select action from public.audit_log where org_id = p_org order by id desc limit 1
$$;

-- Cadence arithmetic (no drift for monthly)
select is(public.next_drill_time('2026-01-31 09:00Z', 'monthly', '2026-02-01Z'), '2026-02-28 09:00Z'::timestamptz,
  'monthly from Jan 31 lands on Feb 28');
select is(public.next_drill_time('2026-01-31 09:00Z', 'monthly', '2026-03-01Z'), '2026-03-31 09:00Z'::timestamptz,
  'monthly returns to the 31st (anchored, no drift)');
select is(public.next_drill_time('2026-01-05 09:00Z', 'weekly', '2026-03-02 09:00Z'), '2026-03-09 09:00Z'::timestamptz,
  'weekly skips to the next slot strictly after');
select is(public.next_drill_time('2027-01-01Z', 'quarterly', '2026-06-01Z'), '2027-01-01Z'::timestamptz,
  'a future anchor is the next run');

set local role authenticated;

-- Schedule: admin only, validated, audited
select pg_temp.login('c1000000-0000-0000-0000-000000000002');
select throws_ok($$select public.set_drill_schedule('c2000000-0000-0000-0000-000000000001', 'weekly', now() + interval '1 day', 'us-east-1', 'aws-us-west-2')$$,
  '42501', 'admin role required', 'operators cannot set the schedule');
select pg_temp.login('c1000000-0000-0000-0000-000000000001');
select throws_ok($$select public.set_drill_schedule('c2000000-0000-0000-0000-000000000001', 'daily', now() + interval '1 day', 'us-east-1', 'aws-us-west-2')$$,
  '23514', 'cadence must be weekly, monthly or quarterly', 'unknown cadence rejected');
select throws_ok($$select public.set_drill_schedule('c2000000-0000-0000-0000-000000000001', 'weekly', now() + interval '2 years', 'us-east-1', 'aws-us-west-2')$$,
  '23514', 'first drill must be within the next year', 'far-future start rejected');
select is(public.set_drill_schedule('c2000000-0000-0000-0000-000000000001', 'weekly', now() + interval '1 day', 'us-east-1', 'aws-us-west-2'),
  now() + interval '1 day', 'admin sets a weekly schedule; next run is the first run');
select is(pg_temp.last_action('c2000000-0000-0000-0000-000000000001'), 'drill.schedule_set', 'schedule change is audited');

select pg_temp.login('c1000000-0000-0000-0000-000000000003');
select is((select cadence from public.drill_schedules where org_id = 'c2000000-0000-0000-0000-000000000001'), 'weekly',
  'members can read the schedule');
select pg_temp.login('c1000000-0000-0000-0000-000000000004');
select is((select count(*)::int from public.drill_schedules where org_id = 'c2000000-0000-0000-0000-000000000001'), 0,
  'non-members cannot read the schedule');
select throws_ok($$insert into public.drill_schedules (org_id, cadence, anchor_at, next_run_at, source_region, target_region) values ('c2000000-0000-0000-0000-000000000002', 'weekly', now(), now(), 'a1', 'b1')$$,
  '42501', null, 'no direct writes to schedules');

-- Clients cannot run the scheduler or launch drills directly
select throws_ok($$select public.run_drill_scheduler()$$, '42501', null, 'clients cannot run the scheduler');
select throws_ok($$select public.launch_drill('c2000000-0000-0000-0000-000000000002', 'a1', 'b1', 'manual', now())$$,
  '42501', null, 'clients cannot call launch_drill');

-- Manual drill: operator+, no approval needed, one at a time, invisible to live status
select pg_temp.login('c1000000-0000-0000-0000-000000000003');
select throws_ok($$select public.start_drill('c2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2')$$,
  '42501', 'operator role required', 'viewers cannot start drills');
select pg_temp.login('c1000000-0000-0000-0000-000000000002');
select lives_ok($$select public.start_drill('c2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2')$$,
  'operator starts a drill');
select throws_ok($$select public.start_drill('c2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2')$$,
  '23505', 'a drill is already running for this organization', 'only one drill at a time');
select is((select public.get_failover_status('c2000000-0000-0000-0000-000000000001')->'run'), 'null'::jsonb,
  'a drill is not the live failover');
select lives_ok($$select public.request_failover('c2000000-0000-0000-0000-000000000001', 'us-east-1', 'gcp-us-central1')$$,
  'a drill does not block a real failover');
select pg_temp.login('c1000000-0000-0000-0000-000000000005');
select throws_ok($$select public.approve_failover((select id from public.failover_runs where kind = 'drill' and org_id = 'c2000000-0000-0000-0000-000000000001'))$$,
  '23514', 'run is not awaiting approval', 'drills are not approvable');

-- Scheduler: completes the manual drill, then launches the scheduled one when due
reset role;
create temp table tick1 as select public.run_drill_scheduler(now() + interval '10 seconds') as j;
select is((select j from tick1), '{"completed": 1, "started": 0}'::jsonb, 'tick records the finished drill, nothing due yet');
select is((select detail->>'result' from public.audit_log
            where org_id = 'c2000000-0000-0000-0000-000000000001' and action = 'drill.completed'), 'passed',
  'drill passed (5.5 s within the 15 min target)');

update public.orgs set rto_target_seconds = 3 where id = 'c2000000-0000-0000-0000-000000000001';
create temp table tick2 as select public.run_drill_scheduler(now() + interval '1 day 30 seconds') as j;
select is((select j from tick2), '{"completed": 0, "started": 1}'::jsonb, 'due scheduled drill launches');
select ok((select requested_by is null from public.failover_runs where trigger = 'scheduled' and org_id = 'c2000000-0000-0000-0000-000000000001'),
  'scheduled drills have no human requester');
select is((select next_run_at from public.drill_schedules where org_id = 'c2000000-0000-0000-0000-000000000001'),
  now() + interval '8 days', 'next run advances one week');
select ok((select actor is null from public.audit_log where action = 'drill.started' and detail->>'trigger' = 'scheduled'
             and org_id = 'c2000000-0000-0000-0000-000000000001'),
  'scheduler actions are recorded with no actor (system)');

create temp table tick3 as select public.run_drill_scheduler(now() + interval '1 day 40 seconds') as j;
select is((select detail->>'result' from public.audit_log
            where org_id = 'c2000000-0000-0000-0000-000000000001' and action = 'drill.completed' order by id desc limit 1),
  'failed', 'drill fails when recovery exceeds the target (5.5 s > 3 s)');

-- Evidence for a drill
set local role authenticated;
select pg_temp.login('c1000000-0000-0000-0000-000000000003');
create temp table ev as select public.drill_evidence((select id from public.failover_runs where trigger = 'scheduled' and org_id = 'c2000000-0000-0000-0000-000000000001')) as j;
select is((select j->'run'->>'kind' || '/' || (j->'run'->>'trigger') from ev), 'drill/scheduled', 'evidence names the drill and trigger');
select is((select j->'run'->'two_person_rule_met' from ev), 'null'::jsonb, 'two-person rule marked not applicable for drills');
select is((select j->'timeline'->3->>'stage' from ev), 'DRILL_COMPLETE', 'drill timeline has no DNS cutover');

-- Disable
select pg_temp.login('c1000000-0000-0000-0000-000000000001');
select public.disable_drill_schedule('c2000000-0000-0000-0000-000000000001');
select is(pg_temp.last_action('c2000000-0000-0000-0000-000000000001'), 'drill.schedule_disabled', 'disabling is audited');

select * from finish();
rollback;
