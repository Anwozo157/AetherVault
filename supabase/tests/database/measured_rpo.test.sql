-- pgTAP tests for measured RPO in drill and failover evidence (Phase 4.5).
begin;
create extension if not exists pgtap with schema extensions;
select plan(22);

insert into auth.users (id, email, aud, role) values
  ('e1000000-0000-0000-0000-000000000001', 'op@rpo.local',  'authenticated', 'authenticated'),
  ('e1000000-0000-0000-0000-000000000002', 'ap@rpo.local',  'authenticated', 'authenticated');
insert into public.orgs (id, name, rto_target_seconds, rpo_target_seconds)
  values ('e2000000-0000-0000-0000-000000000001', 'RPO Org', 900, 60);
insert into public.memberships (org_id, user_id, role) values
  ('e2000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'operator'),
  ('e2000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000002', 'approver');

-- The scheduler covers every organization: park anything left by other runs (rolled back at the end).
update public.drill_schedules set enabled = false;
update public.failover_runs set completed_at = approved_at where kind = 'drill' and completed_at is null;

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
create function pg_temp.snapshot(p_lag numeric, p_met boolean, p_problems int, p_source text default 'aws-drs',
                                 p_age interval default interval '30 seconds') returns void language sql as $$
  insert into public.replication_snapshots (org_id, source, collected_at, received_at, aws_account_id, aws_region,
    collector_version, server_count, healthy_count, problem_count, max_lag_seconds, backlog_bytes,
    rpo_target_seconds, rpo_met, servers)
  values ('e2000000-0000-0000-0000-000000000001', p_source, now() - p_age, now() - p_age, '123456789012', 'us-west-2',
    'test', 3, 3 - p_problems, p_problems, p_lag, 0, 60, p_met, '[]')
$$;
-- Starts a drill as the operator, then lets the scheduler finish it. Returns the run id.
create function pg_temp.drill() returns uuid language plpgsql as $$
declare v uuid;
begin
  perform pg_temp.login('e1000000-0000-0000-0000-000000000001');
  v := public.start_drill('e2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2');
  perform public.run_drill_scheduler(now() + interval '10 seconds');
  perform pg_temp.login('e1000000-0000-0000-0000-000000000001');
  return v;
end $$;
create function pg_temp.completed(p_run uuid) returns jsonb language sql as $$
  select detail from public.audit_log where action = 'drill.completed' and detail->>'run_id' = p_run::text
$$;

-- 1. No replication data: RPO not measured, drill judged on recovery time only (as before)
create temp table d1 as select pg_temp.drill() as id;
select is((select replication_at_launch from public.failover_runs where id = (select id from d1)), null,
  'no snapshot: nothing captured at launch');
select is((select pg_temp.completed(id)->>'result' from d1), 'passed', 'no snapshot: drill passes on recovery time');
select is((select (public.drill_evidence(id)->'results'->>'rpo_measured')::boolean from d1), false,
  'no snapshot: evidence says RPO not measured');
select ok((select (public.drill_evidence(id)->>'report_version')::int >= 3 from d1), 'evidence is report v3 or later');

-- 2. Healthy live snapshot 30 s before launch: RPO measured and met
select pg_temp.snapshot(4, true, 0);
create temp table d2 as select pg_temp.drill() as id;
create temp table e2 as select public.drill_evidence(id) as j from d2;
select is((select (j->'results'->>'rpo_measured')::boolean from e2), true, 'live snapshot: RPO measured');
select is((select (j->'results'->>'rpo_seconds')::numeric from e2), 4::numeric, 'measured RPO is the worst lag at launch');
select is((select (j->'results'->>'rpo_met')::boolean from e2), true, 'within target: RPO met');
select is((select j->'replication_at_launch'->>'source' from e2), 'aws-drs', 'evidence names the data source');
select is((select j->'replication_at_launch'->>'aws_region' from e2), 'us-west-2', 'evidence names the AWS region');
select is((select pg_temp.completed(id)->>'result' from d2), 'passed', 'RTO and RPO met: drill passes');
select is((select (r.rpo_met, r.rpo_seconds, r.rpo_target_seconds, r.replication_source)::text
             from public.list_failover_runs('e2000000-0000-0000-0000-000000000001') r where r.id = (select id from d2)),
  '(t,4,60,aws-drs)', 'runs list carries the measured RPO');

-- 3. Breached snapshot: drill fails even though recovery time was met
select pg_temp.snapshot(130, false, 1, 'aws-drs', interval '5 seconds');
create temp table d3 as select pg_temp.drill() as id;
select is((select pg_temp.completed(id)->>'result' from d3), 'failed', 'RPO missed at launch: drill fails');
select is((select (pg_temp.completed(id)->>'rpo_met')::boolean from d3), false, 'completion record says RPO missed');
select is((select (public.drill_evidence(id)->'results'->>'rpo_met')::boolean from d3), false, 'evidence says RPO missed');
select is((select public.alert_for('drill.completed', pg_temp.completed(id), null)->>'title' from d3),
  'Drill FAILED: recovery took 5.5 s (simulated), target 900 s. Data-loss target MISSED: worst lag 130 s (target 60 s, measured from AWS DRS).',
  'failure alert explains the missed data-loss target');

-- 4. Stale data (older than 5 minutes before launch) is not used
update public.replication_snapshots set received_at = received_at - interval '10 minutes'
 where org_id = 'e2000000-0000-0000-0000-000000000001';
create temp table d4 as select pg_temp.drill() as id;
select is((select replication_at_launch from public.failover_runs where id = (select id from d4)), null,
  'a snapshot more than 5 minutes old is not used');

-- 5. Sample data is labeled as such in alerts
select pg_temp.snapshot(2, true, 0, 'fixture');
create temp table d5 as select pg_temp.drill() as id;
select is((select public.alert_for('drill.completed', pg_temp.completed(id), null)->>'title' from d5),
  'Drill passed: recovered in 5.5 s (simulated), target 900 s. Data-loss target met: worst lag 2 s (target 60 s, SAMPLE DATA).',
  'sample replication data is labeled SAMPLE DATA');
select is((select public.alert_for('drill.completed', pg_temp.completed(id), null)->>'title' from d1),
  'Drill passed: recovered in 5.5 s (simulated), target 900 s. Data-loss target not measured (no replication data at launch).',
  'unmeasured RPO is stated, not hidden');

-- 6. Failovers: captured at approval, not at request
create temp table f as select public.request_failover('e2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2') as id;
select is((select replication_at_launch from public.failover_runs where id = (select id from f)), null,
  'a pending failover request captures nothing');
select pg_temp.login('e1000000-0000-0000-0000-000000000002');
select public.approve_failover((select id from f));
select is((select (replication_at_launch->>'max_lag_seconds')::numeric from public.failover_runs where id = (select id from f)),
  2::numeric, 'approval captures replication at the moment of failover');

-- 7. Clients cannot set the captured snapshot themselves
set local role authenticated;
select throws_ok($$update public.failover_runs set replication_at_launch = '{}'$$, '42501', null,
  'clients cannot write run records');
select throws_ok($$select public.replication_at('e2000000-0000-0000-0000-000000000001', now())$$, '42501', null,
  'the capture helper is not callable by clients');
reset role;

select * from finish();
rollback;
