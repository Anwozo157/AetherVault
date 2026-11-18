-- pgTAP tests: linking a console run to the AWS DRS job that measured its recovery time.
begin;
create extension if not exists pgtap with schema extensions;
select plan(17);

insert into auth.users (id, email, aud, role) values
  ('f5000000-0000-0000-0000-000000000001', 'admin@lr.local',  'authenticated', 'authenticated'),
  ('f5000000-0000-0000-0000-000000000002', 'viewer@lr.local', 'authenticated', 'authenticated'),
  ('f5000000-0000-0000-0000-000000000003', 'out@lr.local',    'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('f6000000-0000-0000-0000-000000000001', 'LR Org');
insert into public.memberships (org_id, user_id, role) values
  ('f6000000-0000-0000-0000-000000000001', 'f5000000-0000-0000-0000-000000000001', 'admin'),
  ('f6000000-0000-0000-0000-000000000001', 'f5000000-0000-0000-0000-000000000002', 'viewer');

-- Runs (closed, so the one-open-run indexes don't interfere).
insert into public.failover_runs
  (id, org_id, kind, trigger, source_region, target_region, requested_by, requested_at, approved_at, completed_at)
values
  ('f7000000-0000-0000-0000-000000000001', 'f6000000-0000-0000-0000-000000000001', 'drill', 'manual',
   'us-east-1', 'aws-us-west-2', 'f5000000-0000-0000-0000-000000000001',
   '2026-11-17T21:04:50Z', '2026-11-17T21:04:50Z', '2026-11-17T21:30:00Z'),
  ('f7000000-0000-0000-0000-000000000002', 'f6000000-0000-0000-0000-000000000001', 'drill', 'manual',
   'us-east-1', 'aws-us-west-2', 'f5000000-0000-0000-0000-000000000001',
   '2026-11-17T18:09:00Z', '2026-11-17T18:09:00Z', '2026-11-17T18:40:00Z');

insert into public.recovery_jobs (org_id, job_id, kind, status, aws_region, started_at, ended_at, servers, launched) values
  ('f6000000-0000-0000-0000-000000000001', 'drsjob-5d5a5be173b3a4499', 'drill', 'COMPLETED', 'us-west-2',
   '2026-11-17T21:04:58Z', '2026-11-17T21:14:59Z', 1, 1),
  ('f6000000-0000-0000-0000-000000000001', 'drsjob-00000000000000001', 'recovery', 'COMPLETED', 'us-west-2',
   '2026-11-17T21:05:00Z', '2026-11-17T21:15:00Z', 1, 1),
  ('f6000000-0000-0000-0000-000000000001', 'drsjob-00000000000000002', 'drill', 'STARTED', 'us-west-2',
   '2026-11-17T21:05:00Z', null, 1, 0),
  ('f6000000-0000-0000-0000-000000000001', 'drsjob-00000000000000003', 'drill', 'COMPLETED', 'us-east-2',
   '2026-11-17T21:05:00Z', '2026-11-17T21:15:00Z', 1, 1),
  ('f6000000-0000-0000-0000-000000000001', 'drsjob-00000000000000004', 'drill', 'COMPLETED', 'us-west-2',
   '2026-11-18T09:00:00Z', '2026-11-18T09:10:00Z', 1, 1);

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;

set local role authenticated;

-- Who may link
select pg_temp.login('f5000000-0000-0000-0000-000000000003');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-5d5a5be173b3a4499') $$,
  'operator role required', 'non-members cannot link');
select pg_temp.login('f5000000-0000-0000-0000-000000000002');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-5d5a5be173b3a4499') $$,
  'operator role required', 'viewers cannot link');

-- What may be linked
select pg_temp.login('f5000000-0000-0000-0000-000000000001');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-fffffffffffffffff') $$,
  'recovery job not found', 'unknown jobs are rejected');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-00000000000000001') $$,
  'a drill run links to an AWS drill job', 'a drill cannot use a recovery job');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-00000000000000002') $$,
  'the AWS job has not launched every server', 'a running job is rejected');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-00000000000000003') $$,
  'the AWS job ran in a different Region than this run', 'the Region must match the run target');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-00000000000000004') $$,
  'the AWS job did not start near this run', 'a job from much later is rejected');

-- Linking
select is(public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-5d5a5be173b3a4499'), 601.0,
  'linking returns the measured time (10 min 1 s)');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000001', 'drsjob-5d5a5be173b3a4499') $$,
  'this run already has a measured recovery time', 'a link is permanent');
select throws_ok($$ select public.link_recovery_job('f7000000-0000-0000-0000-000000000002', 'drsjob-5d5a5be173b3a4499') $$,
  'that AWS job is already linked to another run', 'one job measures one run');

-- Reads
select is((select recovery_seconds from public.list_failover_runs('f6000000-0000-0000-0000-000000000001')
            where id = 'f7000000-0000-0000-0000-000000000001'), 601.0, 'runs list shows the measured time');
select is((select recovery_job_id from public.list_failover_runs('f6000000-0000-0000-0000-000000000001')
            where id = 'f7000000-0000-0000-0000-000000000001'), 'drsjob-5d5a5be173b3a4499', 'runs list names the AWS job');
select is((select recovery_seconds from public.list_failover_runs('f6000000-0000-0000-0000-000000000001')
            where id = 'f7000000-0000-0000-0000-000000000002'), 5.5, 'unlinked runs keep the simulated time');

select is(public.drill_evidence('f7000000-0000-0000-0000-000000000001')->'results',
  public.drill_evidence('f7000000-0000-0000-0000-000000000001')->'results'
    || '{"recovery_seconds": 601.0, "recovery_simulated": false, "rto_met": true}'::jsonb,
  'evidence: measured time, not simulated, within the 15-minute target');
select is(public.drill_evidence('f7000000-0000-0000-0000-000000000002')->'results'->>'recovery_simulated', 'true',
  'evidence for an unlinked run stays labeled simulated');
reset role;

select is((select count(*)::int from public.audit_log where action = 'run.recovery_measured' and org_id = 'f6000000-0000-0000-0000-000000000001'
            and detail->>'job_id' = 'drsjob-5d5a5be173b3a4499'), 1, 'the link is audited');

-- Evidence survives the job's retention clean-up.
delete from public.recovery_jobs where job_id = 'drsjob-5d5a5be173b3a4499';
select pg_temp.login('f5000000-0000-0000-0000-000000000002');
set local role authenticated;
select is(public.drill_evidence('f7000000-0000-0000-0000-000000000001')->'recovery_measured'->>'ended_at',
  '2026-11-17T21:14:59+00:00', 'evidence keeps the job facts after the job row is gone');
reset role;

select * from finish();
rollback;
