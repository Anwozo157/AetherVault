-- pgTAP tests for recovery objectives and drill evidence.
begin;
create extension if not exists pgtap with schema extensions;
select plan(16);

insert into auth.users (id, email, aud, role) values
  ('b1000000-0000-0000-0000-000000000001', 'admin@ev.local', 'authenticated', 'authenticated'),
  ('b1000000-0000-0000-0000-000000000002', 'op@ev.local',    'authenticated', 'authenticated'),
  ('b1000000-0000-0000-0000-000000000003', 'ap@ev.local',    'authenticated', 'authenticated'),
  ('b1000000-0000-0000-0000-000000000004', 'out@ev.local',   'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('b2000000-0000-0000-0000-000000000001', 'Evidence Org');
insert into public.memberships (org_id, user_id, role) values
  ('b2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'admin'),
  ('b2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002', 'operator'),
  ('b2000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000003', 'approver');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
set local role authenticated;

-- Objectives: defaults, admin-only, validated, audited
select pg_temp.login('b1000000-0000-0000-0000-000000000002');
select is((select rto_target_seconds from public.orgs where id = 'b2000000-0000-0000-0000-000000000001'), 900, 'default RTO target is 15 minutes');
select throws_ok($$select public.set_recovery_objectives('b2000000-0000-0000-0000-000000000001', 60, 10)$$,
  '42501', 'admin role required', 'operators cannot change objectives');
select pg_temp.login('b1000000-0000-0000-0000-000000000001');
select throws_ok($$select public.set_recovery_objectives('b2000000-0000-0000-0000-000000000001', 0, 10)$$,
  '23514', 'objectives must be between 0 seconds and 7 days', 'RTO must be positive');
select lives_ok($$select public.set_recovery_objectives('b2000000-0000-0000-0000-000000000001', 300, 30)$$, 'admin sets objectives');
select is((select action from public.audit_log where org_id = 'b2000000-0000-0000-0000-000000000001' order by id desc limit 1),
  'org.objectives_set', 'objective changes are audited');

-- A completed drill: operator requests, approver approves, approval backdated 10 s (secured)
select pg_temp.login('b1000000-0000-0000-0000-000000000002');
select public.request_failover('b2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2');
select pg_temp.login('b1000000-0000-0000-0000-000000000003');
select public.approve_failover((select id from public.failover_runs where org_id = 'b2000000-0000-0000-0000-000000000001'));
reset role;
update public.failover_runs set requested_at = now() - interval '40 seconds', approved_at = now() - interval '10 seconds'
 where org_id = 'b2000000-0000-0000-0000-000000000001';
set local role authenticated;
select pg_temp.login('b1000000-0000-0000-0000-000000000002');

create temp table ev as
  select public.drill_evidence((select id from public.failover_runs where org_id = 'b2000000-0000-0000-0000-000000000001')) as j;
select is((select j->'run'->>'outcome' from ev), 'secured', 'outcome is secured');
select is((select j->'run'->>'requested_by' from ev), 'op@ev.local', 'requester recorded');
select is((select j->'run'->>'approved_by' from ev), 'ap@ev.local', 'approver recorded');
select is((select (j->'run'->>'two_person_rule_met')::boolean from ev), true, 'two-person rule recorded as met');
select is((select (j->'results'->>'recovery_seconds')::numeric from ev), 5.5, 'recovery time measured');
select is((select (j->'results'->>'rto_met')::boolean from ev), true, 'RTO target met (5.5 s <= 300 s)');
select is((select (j->'results'->>'decision_seconds')::numeric from ev), 30.0, 'time to approval measured');
select is((select jsonb_array_length(j->'audit_entries') from ev), 2, 'run audit entries included (requested, approved)');
select is((select (j->'chain'->>'ok')::boolean from ev), true, 'chain status included');

select results_eq($$select outcome from public.list_failover_runs('b2000000-0000-0000-0000-000000000001')$$,
  $$values ('secured'::text)$$, 'runs list shows outcome');

select pg_temp.login('b1000000-0000-0000-0000-000000000004');
select throws_ok($$select public.drill_evidence((select id from public.failover_runs limit 1))$$,
  '42501', 'not a member of this organization', 'non-members cannot read evidence');

select * from finish();
rollback;
