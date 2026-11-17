-- pgTAP tests for recovery jobs measured by AWS DRS.
begin;
create extension if not exists pgtap with schema extensions;
select plan(14);

insert into auth.users (id, email, aud, role) values
  ('f3000000-0000-0000-0000-000000000001', 'admin@rj.local', 'authenticated', 'authenticated'),
  ('f3000000-0000-0000-0000-000000000002', 'out@rj.local',   'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('f4000000-0000-0000-0000-000000000001', 'RJ Org');
insert into public.memberships (org_id, user_id, role) values
  ('f4000000-0000-0000-0000-000000000001', 'f3000000-0000-0000-0000-000000000001', 'admin');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
create function pg_temp.job(p_id text, p_status text, p_end timestamptz, p_kind text default 'drill') returns jsonb language sql as $$
  select jsonb_build_object('job_id', p_id, 'kind', p_kind, 'status', p_status,
    'started_at', '2026-11-17T18:09:27Z', 'ended_at', p_end, 'servers', 1,
    'launched', case when p_end is null then 0 else 1 end)
$$;

select pg_temp.login('f3000000-0000-0000-0000-000000000001');
create temp table tok as select public.create_ingest_token('f4000000-0000-0000-0000-000000000001') t;
grant select on tok to anon;

set local role anon;
select throws_ok($$ select public.ingest_recovery_jobs('avi_wrong', 'us-west-2', '[]') $$,
  'invalid ingest token', 'a wrong token is rejected');
select throws_ok($$ select public.ingest_recovery_jobs((select t from tok), 'not a region', '[]') $$,
  'invalid AWS Region', 'the Region is validated');
select throws_ok($$ select public.ingest_recovery_jobs((select t from tok), 'us-west-2',
    (select jsonb_agg(pg_temp.job('drsjob-0000000000000000' || (g % 10)::text, 'STARTED', null)) from generate_series(1, 101) g)) $$,
  'jobs must be an array of at most 100 entries', 'at most 100 jobs per push');
select throws_ok($$ select public.ingest_recovery_jobs((select t from tok), 'us-west-2',
    jsonb_build_array(pg_temp.job('not-a-job', 'STARTED', null))) $$,
  '23514', null, 'job IDs must look like DRS job IDs');
select throws_ok($$ select public.ingest_recovery_jobs((select t from tok), 'us-west-2',
    jsonb_build_array(pg_temp.job('drsjob-506416001759e958f', 'COMPLETED', '2026-11-17T18:00:00Z'))) $$,
  '23514', null, 'a job cannot end before it starts');

select is((public.ingest_recovery_jobs((select t from tok), 'us-west-2',
    jsonb_build_array(pg_temp.job('drsjob-506416001759e958f', 'STARTED', null))))->>'changed', '1',
  'a running drill is stored');
select is((public.ingest_recovery_jobs((select t from tok), 'us-west-2',
    jsonb_build_array(pg_temp.job('drsjob-506416001759e958f', 'COMPLETED', '2026-11-17T18:26:42Z'))))->>'changed', '1',
  'the same drill is updated when it completes');
select is((public.ingest_recovery_jobs((select t from tok), 'us-west-2',
    jsonb_build_array(pg_temp.job('drsjob-506416001759e958f', 'STARTED', null))))->>'changed', '0',
  'a completed job never goes back to running');
reset role;

-- Reads
select pg_temp.login('f3000000-0000-0000-0000-000000000002');
set local role authenticated;
select throws_ok($$ select public.list_recovery_jobs('f4000000-0000-0000-0000-000000000001') $$,
  'not a member of this organization', 'non-members cannot read recovery jobs');
select throws_ok($$ select * from public.recovery_jobs $$, '42501', null, 'no direct table access');
reset role;

select pg_temp.login('f3000000-0000-0000-0000-000000000001');
set local role authenticated;
select is(jsonb_array_length(public.list_recovery_jobs('f4000000-0000-0000-0000-000000000001')), 1, 'members see the job');
select is((public.list_recovery_jobs('f4000000-0000-0000-0000-000000000001'))->0->>'status', 'COMPLETED', 'status is COMPLETED');
select is(((public.list_recovery_jobs('f4000000-0000-0000-0000-000000000001'))->0->>'duration_seconds')::numeric, 1035::numeric,
  'duration is measured from start to end (17 min 15 s)');
select is((public.list_recovery_jobs('f4000000-0000-0000-0000-000000000001'))->0->>'kind', 'drill', 'kind is kept');
reset role;

select * from finish();
rollback;
