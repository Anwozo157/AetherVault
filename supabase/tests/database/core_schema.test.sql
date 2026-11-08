-- pgTAP tests for roles, RLS, failover rules, and the audit log.
-- Run: npx supabase test db   (requires `npx supabase start`)
begin;
create extension if not exists pgtap with schema extensions;
select no_plan();

-- ---------------------------------------------------------------------------
-- Fixtures (as the database owner, bypassing RLS)
-- ---------------------------------------------------------------------------
insert into auth.users (id, email, aud, role) values
  ('a0000000-0000-0000-0000-000000000001', 'admin@test.local',    'authenticated', 'authenticated'),
  ('a0000000-0000-0000-0000-000000000002', 'viewer@test.local',   'authenticated', 'authenticated'),
  ('a0000000-0000-0000-0000-000000000003', 'operator@test.local', 'authenticated', 'authenticated'),
  ('a0000000-0000-0000-0000-000000000004', 'approver@test.local', 'authenticated', 'authenticated'),
  ('a0000000-0000-0000-0000-000000000005', 'outsider@test.local', 'authenticated', 'authenticated');

insert into public.orgs (id, name) values ('b0000000-0000-0000-0000-000000000001', 'Acme');
insert into public.memberships (org_id, user_id, role) values
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'admin'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 'viewer'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000003', 'operator'),
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000004', 'approver');

-- Switch identity: set the JWT claims Supabase uses for auth.uid(), then the role.
create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;

-- ---------------------------------------------------------------------------
-- Viewer: read-only
-- ---------------------------------------------------------------------------
select pg_temp.login('a0000000-0000-0000-0000-000000000002');
set local role authenticated;

select is((select count(*) from public.orgs)::int, 1, 'viewer sees their organization');
select throws_ok(
  $$select public.request_failover('b0000000-0000-0000-0000-000000000001', 'us-east-1', 'gcp-us-central1')$$,
  '42501', 'operator role required', 'viewer cannot request a failover');
select throws_like(
  $$insert into public.failover_runs (org_id, source_region, target_region, requested_by)
    values ('b0000000-0000-0000-0000-000000000001', 'us-east-1', 'gcp-us-central1',
            'a0000000-0000-0000-0000-000000000002')$$,
  '%permission denied%', 'clients cannot insert runs directly');
reset role;

-- ---------------------------------------------------------------------------
-- Outsider: sees nothing
-- ---------------------------------------------------------------------------
select pg_temp.login('a0000000-0000-0000-0000-000000000005');
set local role authenticated;

select is((select count(*) from public.orgs)::int, 0, 'non-member sees no organizations');
select is((select count(*) from public.failover_runs)::int, 0, 'non-member sees no runs');
select throws_ok(
  $$select public.verify_audit_chain('b0000000-0000-0000-0000-000000000001')$$,
  '42501', 'not a member of this organization', 'non-member cannot read the audit chain');
reset role;

-- ---------------------------------------------------------------------------
-- Run 1: operator requests, approver approves, timing, abort window, reset
-- ---------------------------------------------------------------------------
select pg_temp.login('a0000000-0000-0000-0000-000000000003');
set local role authenticated;

select lives_ok(
  $$select set_config('test.run1',
      public.request_failover('b0000000-0000-0000-0000-000000000001', 'us-east-1', 'gcp-us-central1')::text,
      true)$$,
  'operator can request a failover');
select is(
  (select public.run_stage(r) from public.failover_runs r where r.id = current_setting('test.run1')::uuid),
  'PENDING_APPROVAL', 'a new run waits for approval');
select throws_ok(
  $$select public.request_failover('b0000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2')$$,
  '23505', 'a failover is already open for this organization', 'only one open run per organization');
select throws_ok(
  $$select public.approve_failover(current_setting('test.run1')::uuid)$$,
  '42501', 'approver role required', 'operator cannot approve');
reset role;

select pg_temp.login('a0000000-0000-0000-0000-000000000004');
set local role authenticated;
select lives_ok(
  $$select public.approve_failover(current_setting('test.run1')::uuid)$$,
  'approver can approve another person''s request');
select is(
  (select public.run_stage(r) from public.failover_runs r where r.id = current_setting('test.run1')::uuid),
  'QUIESCE_AND_SNAPSHOT', 'an approved run starts at snapshot');
select throws_ok(
  $$select public.approve_failover(current_setting('test.run1')::uuid)$$,
  '23514', 'run is not awaiting approval', 'a run cannot be approved twice');
reset role;

-- Stage boundaries (pure function of elapsed time)
select is(
  (select public.run_stage(r, r.approved_at + interval '1.3 seconds') from public.failover_runs r
    where r.id = current_setting('test.run1')::uuid),
  'HYDRATING_TARGET', 'stage at 1.3s is target hydration');
select is(
  (select public.run_stage(r, r.approved_at + interval '3.6 seconds') from public.failover_runs r
    where r.id = current_setting('test.run1')::uuid),
  'DNS_CUTOVER', 'stage at 3.6s is DNS cutover');
select is(
  (select public.run_stage(r, r.approved_at + interval '6 seconds') from public.failover_runs r
    where r.id = current_setting('test.run1')::uuid),
  'TARGET_SECURED', 'stage at 6s is secured');

-- Move the run into DNS cutover: abort and reset must both be refused.
update public.failover_runs set approved_at = now() - interval '4 seconds'
  where id = current_setting('test.run1')::uuid;
select pg_temp.login('a0000000-0000-0000-0000-000000000003');
set local role authenticated;
select throws_ok(
  $$select public.abort_failover(current_setting('test.run1')::uuid)$$,
  '23514', 'abort not allowed at stage DNS_CUTOVER', 'abort is refused once DNS cutover starts');
select throws_ok(
  $$select public.reset_failover(current_setting('test.run1')::uuid)$$,
  '23514', 'reset only allowed after target is secured', 'reset is refused before the target is secured');
reset role;

-- Move the run past completion: reset is allowed.
update public.failover_runs set approved_at = now() - interval '10 seconds'
  where id = current_setting('test.run1')::uuid;
select pg_temp.login('a0000000-0000-0000-0000-000000000003');
set local role authenticated;
select lives_ok(
  $$select public.reset_failover(current_setting('test.run1')::uuid)$$,
  'operator can reset a secured run');
reset role;

-- ---------------------------------------------------------------------------
-- Run 2: two-person rule and abort during hydration
-- ---------------------------------------------------------------------------
select pg_temp.login('a0000000-0000-0000-0000-000000000004');
set local role authenticated;
select lives_ok(
  $$select set_config('test.run2',
      public.request_failover('b0000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2')::text,
      true)$$,
  'a new run can open after the previous one is reset');
select throws_ok(
  $$select public.approve_failover(current_setting('test.run2')::uuid)$$,
  '23514', 'two-person rule: requester cannot approve', 'requester cannot approve their own run');
reset role;

select pg_temp.login('a0000000-0000-0000-0000-000000000001');
set local role authenticated;
select lives_ok(
  $$select public.approve_failover(current_setting('test.run2')::uuid)$$,
  'admin can approve as the second person');
reset role;

update public.failover_runs set approved_at = now() - interval '2 seconds'
  where id = current_setting('test.run2')::uuid;
select pg_temp.login('a0000000-0000-0000-0000-000000000003');
set local role authenticated;
select lives_ok(
  $$select public.abort_failover(current_setting('test.run2')::uuid)$$,
  'operator can abort during target hydration');
select is(
  (select public.run_stage(r) from public.failover_runs r where r.id = current_setting('test.run2')::uuid),
  'ACTIVE_SYNC', 'an aborted run returns to active sync');
reset role;

-- ---------------------------------------------------------------------------
-- Audit log
-- ---------------------------------------------------------------------------
select pg_temp.login('a0000000-0000-0000-0000-000000000002');
set local role authenticated;
select is(
  (select array_agg(action order by id) from public.audit_log
    where org_id = 'b0000000-0000-0000-0000-000000000001'),
  array['failover.requested', 'failover.approved', 'failover.reset',
        'failover.requested', 'failover.approved', 'failover.aborted'],
  'every action is audited, in order');
select is(
  public.verify_audit_chain('b0000000-0000-0000-0000-000000000001'), null::bigint,
  'the audit hash chain verifies');
select throws_like(
  $$update public.audit_log set action = 'x.y'$$,
  '%permission denied%', 'members cannot modify the audit log');
reset role;

select throws_ok(
  $$update public.audit_log set detail = '{}'::jsonb$$,
  '42501', 'audit_log is append-only', 'even the database owner cannot update audit rows');
select throws_ok(
  $$delete from public.audit_log$$,
  '42501', 'audit_log is append-only', 'even the database owner cannot delete audit rows');

-- Simulate tampering by someone who disables the trigger: the chain must catch it.
alter table public.audit_log disable trigger audit_log_no_update_delete;
update public.audit_log set detail = '{"tampered": true}'::jsonb
  where id = (select min(id) from public.audit_log where org_id = 'b0000000-0000-0000-0000-000000000001');
alter table public.audit_log enable trigger audit_log_no_update_delete;

select pg_temp.login('a0000000-0000-0000-0000-000000000002');
set local role authenticated;
select isnt(
  public.verify_audit_chain('b0000000-0000-0000-0000-000000000001'), null::bigint,
  'tampering with an audit row is detected');
reset role;

-- ---------------------------------------------------------------------------
-- Membership management and organization creation
-- ---------------------------------------------------------------------------
select pg_temp.login('a0000000-0000-0000-0000-000000000003');
set local role authenticated;
select throws_ok(
  $$select public.set_member_role('b0000000-0000-0000-0000-000000000001',
      'a0000000-0000-0000-0000-000000000005', 'viewer')$$,
  '42501', 'admin role required', 'operator cannot manage members');
reset role;

select pg_temp.login('a0000000-0000-0000-0000-000000000001');
set local role authenticated;
select lives_ok(
  $$select public.set_member_role('b0000000-0000-0000-0000-000000000001',
      'a0000000-0000-0000-0000-000000000005', 'viewer')$$,
  'admin can add a member');
select throws_ok(
  $$select public.set_member_role('b0000000-0000-0000-0000-000000000001',
      'a0000000-0000-0000-0000-000000000001', 'viewer')$$,
  '23514', 'admins cannot demote themselves', 'admin cannot demote themselves');
reset role;

select pg_temp.login('a0000000-0000-0000-0000-000000000005');
set local role authenticated;
select is((select count(*) from public.orgs)::int, 1, 'a newly added member sees the organization');
select lives_ok($$select public.create_org('Outsider Co')$$, 'any signed-in user can create an organization');
select is((select count(*) from public.orgs)::int, 2, 'the creator sees their new organization');
select is(
  (select m.role::text from public.memberships m join public.orgs o on o.id = m.org_id
    where o.name = 'Outsider Co' and m.user_id = 'a0000000-0000-0000-0000-000000000005'),
  'admin', 'the creator becomes admin');
reset role;

-- ---------------------------------------------------------------------------
-- Anonymous (signed-out) visitors
-- ---------------------------------------------------------------------------
set local role anon;
select throws_like($$select count(*) from public.orgs$$, '%permission denied%',
  'signed-out visitors cannot read organizations');
select throws_like(
  $$select public.request_failover('b0000000-0000-0000-0000-000000000001', 'us-east-1', 'gcp-us-central1')$$,
  '%permission denied%', 'signed-out visitors cannot call failover functions');
reset role;

select * from finish();
rollback;
