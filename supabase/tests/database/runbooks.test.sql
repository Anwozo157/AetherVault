-- pgTAP tests for DR runbooks (Phase 4.6).
begin;
create extension if not exists pgtap with schema extensions;
select plan(28);

insert into auth.users (id, email, aud, role) values
  ('a7000000-0000-0000-0000-000000000001', 'admin@rb.local', 'authenticated', 'authenticated'),
  ('a7000000-0000-0000-0000-000000000002', 'op@rb.local',    'authenticated', 'authenticated'),
  ('a7000000-0000-0000-0000-000000000003', 'view@rb.local',  'authenticated', 'authenticated'),
  ('a7000000-0000-0000-0000-000000000004', 'out@rb.local',   'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('a8000000-0000-0000-0000-000000000001', 'Runbook Org');
insert into public.memberships (org_id, user_id, role) values
  ('a8000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000001', 'admin'),
  ('a8000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000002', 'operator'),
  ('a8000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000003', 'viewer');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
create function pg_temp.last_action() returns text language sql as $$
  select action from public.audit_log where org_id = 'a8000000-0000-0000-0000-000000000001' order by id desc limit 1
$$;

set local role authenticated;

-- No runbook yet; runs started now carry none
select pg_temp.login('a7000000-0000-0000-0000-000000000003');
select is(public.get_runbook('a8000000-0000-0000-0000-000000000001'), null, 'no runbook until an admin writes one');

-- Editing: admin only, validated, versioned, audited
select pg_temp.login('a7000000-0000-0000-0000-000000000002');
select throws_ok($$select public.set_runbook('a8000000-0000-0000-0000-000000000001', '[]')$$,
  '42501', 'admin role required', 'operators cannot edit the runbook');
select pg_temp.login('a7000000-0000-0000-0000-000000000001');
select throws_ok($$select public.set_runbook('a8000000-0000-0000-0000-000000000001', '[{"phase":"sometime","title":"x"}]')$$,
  '23514', null, 'unknown phase rejected');
select throws_ok($$select public.set_runbook('a8000000-0000-0000-0000-000000000001', '[{"phase":"before","title":"   "}]')$$,
  '23514', null, 'blank title rejected');
select throws_ok(format('select public.set_runbook(%L, %L)', 'a8000000-0000-0000-0000-000000000001',
    (select jsonb_agg(jsonb_build_object('phase', 'during', 'title', 'step ' || i)) from generate_series(1, 51) i)),
  '23514', 'a runbook has at most 50 steps', 'more than 50 steps rejected');
select is(public.set_runbook('a8000000-0000-0000-0000-000000000001', '[
  {"phase":"before","title":"  Declare the incident  ","detail":"Incident lead confirms the primary is down."},
  {"id":"11111111-1111-4111-8111-111111111111","phase":"during","title":"Verify replication lag","detail":""},
  {"id":"11111111-1111-4111-8111-111111111111","phase":"after","title":"Confirm field engineers can connect"}
]'), 1, 'admin saves version 1');
select is(pg_temp.last_action(), 'runbook.updated', 'runbook edits are audited');
create temp table rb as select public.get_runbook('a8000000-0000-0000-0000-000000000001') as j;
select is((select j->'steps'->0->>'title' from rb), 'Declare the incident', 'titles are trimmed');
select is((select j->'steps'->1->>'detail' from rb), null, 'empty detail is stored as null');
select is((select j->'steps'->1->>'id' from rb), '11111111-1111-4111-8111-111111111111', 'a valid step id is kept');
select isnt((select j->'steps'->2->>'id' from rb), '11111111-1111-4111-8111-111111111111', 'a duplicate id gets a new one');
select is((select j->>'updated_by' from rb), 'admin@rb.local', 'shows who last edited');

-- Runs copy the runbook in force when they start
select pg_temp.login('a7000000-0000-0000-0000-000000000002');
create temp table run1 as select public.start_drill('a8000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2') as id;
select pg_temp.login('a7000000-0000-0000-0000-000000000001');
select is(public.set_runbook('a8000000-0000-0000-0000-000000000001',
  (select jsonb_build_array(j->'steps'->0) from rb)), 2, 'an edit bumps the version');
select pg_temp.login('a7000000-0000-0000-0000-000000000003');
create temp table cl as select public.run_checklist((select id from run1)) as j;
select is((select (j->>'version')::int from cl), 1, 'the run keeps the version it started with');
select is((select jsonb_array_length(j->'steps') from cl), 3, 'and all of its steps');
select is((select (j->>'open')::boolean from cl), true, 'a recent run''s checklist is open');

-- Ticking steps: operator+, once, audited, attributed
select throws_ok(format('select public.check_runbook_step(%L, %L)', (select id from run1), '11111111-1111-4111-8111-111111111111'),
  '42501', 'operator role required', 'viewers cannot tick steps');
select pg_temp.login('a7000000-0000-0000-0000-000000000002');
select lives_ok(format('select public.check_runbook_step(%L, %L, %L)', (select id from run1),
  '11111111-1111-4111-8111-111111111111', '  lag 4 s on all servers  '), 'an operator ticks a step with a note');
select is(pg_temp.last_action(), 'runbook.step_checked', 'ticks are audited');
select is((select detail->>'run_id' from public.audit_log where action = 'runbook.step_checked' order by id desc limit 1),
  (select id::text from run1), 'the audit entry belongs to the run (so it is in the evidence)');
select throws_ok(format('select public.check_runbook_step(%L, %L)', (select id from run1), '11111111-1111-4111-8111-111111111111'),
  '23505', 'step already checked', 'a step is ticked once (ticks are permanent)');
select throws_ok(format('select public.check_runbook_step(%L, %L)', (select id from run1), gen_random_uuid()),
  'P0002', null, 'steps outside the run''s runbook are rejected');
select pg_temp.login('a7000000-0000-0000-0000-000000000004');
select throws_ok($$select public.run_checklist((select id from run1))$$, '42501', null, 'non-members cannot read checklists');

-- Evidence v4 includes the checklist
select pg_temp.login('a7000000-0000-0000-0000-000000000003');
create temp table ev as select public.drill_evidence((select id from run1)) as j;
select is((select j->>'report_version' from ev), '4', 'evidence is report v4');
select is((select (j->'runbook'->>'completed')::int || '/' || (j->'runbook'->>'total') from ev), '1/3',
  'evidence counts completed steps');
select is((select j->'runbook'->'steps'->1->>'checked_by' || ' · ' || (j->'runbook'->'steps'->1->>'note') from ev),
  'op@rb.local · lag 4 s on all servers', 'evidence shows who ticked a step, with the trimmed note');

-- Closed: older than 7 days
reset role;
update public.failover_runs set requested_at = requested_at - interval '8 days', approved_at = approved_at - interval '8 days'
 where id = (select id from run1);
set local role authenticated;
select pg_temp.login('a7000000-0000-0000-0000-000000000002');
select throws_ok(format('select public.check_runbook_step(%L, %L)', (select id from run1), (select j->'steps'->0->>'id' from rb)),
  '23514', 'this run''s checklist is closed', 'checklists close 7 days after the run');

-- No direct table access
select throws_ok($$select * from public.runbook_checks$$, '42501', null, 'clients cannot read check rows directly');
reset role;

select * from finish();
rollback;
