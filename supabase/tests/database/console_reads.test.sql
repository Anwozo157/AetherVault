-- pgTAP tests for the Phase 3.4 console read functions.
begin;
create extension if not exists pgtap with schema extensions;
select plan(11);

insert into auth.users (id, email, aud, role) values
  ('c0000000-0000-0000-0000-000000000001', 'op@reads.local',  'authenticated', 'authenticated'),
  ('c0000000-0000-0000-0000-000000000002', 'ap@reads.local',  'authenticated', 'authenticated'),
  ('c0000000-0000-0000-0000-000000000003', 'out@reads.local', 'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('e0000000-0000-0000-0000-000000000001', 'Reads Org');
insert into public.memberships (org_id, user_id, role) values
  ('e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'operator'),
  ('e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'approver');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;

set local role authenticated;

-- No open run yet
select pg_temp.login('c0000000-0000-0000-0000-000000000001');
select ok(public.get_failover_status('e0000000-0000-0000-0000-000000000001') ? 'server_now',
  'status includes the server clock');
select is(public.get_failover_status('e0000000-0000-0000-0000-000000000001')->'run', 'null'::jsonb,
  'status run is null when nothing is open');

-- Operator requests
select lives_ok($$select public.request_failover('e0000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2')$$,
  'operator requests a failover');
select is(public.get_failover_status('e0000000-0000-0000-0000-000000000001')->'run'->>'stage', 'PENDING_APPROVAL',
  'open run shows as pending approval');
select is(public.get_failover_status('e0000000-0000-0000-0000-000000000001')->'run'->>'requested_by_email', 'op@reads.local',
  'status resolves the requester email');
select is(public.get_failover_status('e0000000-0000-0000-0000-000000000001')->'run'->>'target_region', 'aws-us-west-2',
  'status includes the target region');

-- Approver approves; status reflects it
select pg_temp.login('c0000000-0000-0000-0000-000000000002');
select lives_ok($$select public.approve_failover((select id from public.failover_runs where org_id = 'e0000000-0000-0000-0000-000000000001'))$$,
  'approver approves');
select is(public.get_failover_status('e0000000-0000-0000-0000-000000000001')->'run'->>'approved_by_email', 'ap@reads.local',
  'status resolves the approver email');

-- Audit feed: newest first, with actor emails
select results_eq(
  $$select action, actor_email from public.org_audit_feed('e0000000-0000-0000-0000-000000000001')$$,
  $$values ('failover.approved'::text, 'ap@reads.local'::text), ('failover.requested', 'op@reads.local')$$,
  'audit feed lists actions newest first with actor emails');

-- Non-members are refused
select pg_temp.login('c0000000-0000-0000-0000-000000000003');
select throws_ok($$select public.get_failover_status('e0000000-0000-0000-0000-000000000001')$$,
  '42501', 'not a member of this organization', 'non-member cannot read status');
select throws_ok($$select * from public.org_audit_feed('e0000000-0000-0000-0000-000000000001')$$,
  '42501', 'not a member of this organization', 'non-member cannot read the audit feed');

select * from finish();
rollback;
