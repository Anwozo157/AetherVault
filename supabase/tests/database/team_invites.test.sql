-- pgTAP tests for team management and invites.
begin;
create extension if not exists pgtap with schema extensions;
select plan(20);

insert into auth.users (id, email, aud, role, email_confirmed_at) values
  ('a7000000-0000-0000-0000-000000000001', 'boss@team.local',    'authenticated', 'authenticated', now()),
  ('a7000000-0000-0000-0000-000000000002', 'op@team.local',      'authenticated', 'authenticated', now()),
  ('a7000000-0000-0000-0000-000000000003', 'newhire@team.local', 'authenticated', 'authenticated', now()),
  ('a7000000-0000-0000-0000-000000000004', 'unverified@team.local', 'authenticated', 'authenticated', null);
insert into public.orgs (id, name) values ('a8000000-0000-0000-0000-000000000001', 'Team Org');
insert into public.memberships (org_id, user_id, role) values
  ('a8000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000001', 'admin'),
  ('a8000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000002', 'operator');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
set local role authenticated;

-- Only admins invite
select pg_temp.login('a7000000-0000-0000-0000-000000000002');
select throws_ok($$select public.invite_member('a8000000-0000-0000-0000-000000000001', 'x@team.local', 'viewer')$$,
  '42501', 'admin role required', 'operators cannot invite');

select pg_temp.login('a7000000-0000-0000-0000-000000000001');
select throws_ok($$select public.invite_member('a8000000-0000-0000-0000-000000000001', 'not-an-email', 'viewer')$$,
  '23514', 'enter a valid email address', 'invalid emails are rejected');
select throws_ok($$select public.invite_member('a8000000-0000-0000-0000-000000000001', 'OP@team.local', 'viewer')$$,
  '23505', 'that person is already a member', 'existing members cannot be invited (case-insensitive)');
select lives_ok($$select public.invite_member('a8000000-0000-0000-0000-000000000001', '  NewHire@Team.local ', 'viewer')$$,
  'admin invites an email (trimmed, lower-cased)');
select lives_ok($$select public.invite_member('a8000000-0000-0000-0000-000000000001', 'newhire@team.local', 'approver')$$,
  're-inviting replaces the open invite');
select results_eq($$select email, role::text from public.list_org_invites('a8000000-0000-0000-0000-000000000001')$$,
  $$values ('newhire@team.local'::text, 'approver'::text)$$, 'one open invite, with the latest role');
select is((select count(*) from public.org_invites)::int, 2, 'admins can read their invites (old one revoked, new one open)');

-- Non-admins see no invites and cannot list them
select pg_temp.login('a7000000-0000-0000-0000-000000000002');
select is((select count(*) from public.org_invites)::int, 0, 'operators cannot read invites (RLS)');
select throws_ok($$select * from public.list_org_invites('a8000000-0000-0000-0000-000000000001')$$,
  '42501', 'admin role required', 'operators cannot list invites');
select is((select count(*) from public.list_org_members('a8000000-0000-0000-0000-000000000001'))::int, 2,
  'members can see who is in their organization');

-- Unverified emails never accept
select pg_temp.login('a7000000-0000-0000-0000-000000000004');
select is(public.accept_pending_invites(), 0, 'unverified email accepts nothing');

-- The invitee signs in and joins with the invited role
select pg_temp.login('a7000000-0000-0000-0000-000000000003');
select is(public.accept_pending_invites(), 1, 'invitee joins one organization');
select is((select role::text from public.memberships where user_id = 'a7000000-0000-0000-0000-000000000003'), 'approver',
  'joined with the invited role');
select is(public.accept_pending_invites(), 0, 'accepting is idempotent');

-- Admin rules
select pg_temp.login('a7000000-0000-0000-0000-000000000001');
select throws_ok($$select public.remove_member('a8000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000001')$$,
  '23514', 'admins cannot remove themselves', 'admins cannot remove themselves');
select lives_ok($$select public.remove_member('a8000000-0000-0000-0000-000000000001', 'a7000000-0000-0000-0000-000000000002')$$,
  'admin removes a member');
select is((select count(*) from public.list_org_members('a8000000-0000-0000-0000-000000000001'))::int, 2,
  'member count reflects the removal and the new hire');
select lives_ok($$select public.revoke_invite(public.invite_member('a8000000-0000-0000-0000-000000000001', 'temp@team.local', 'viewer'))$$,
  'admin revokes an invite');
select results_eq(
  $$select action from public.audit_log where org_id = 'a8000000-0000-0000-0000-000000000001' order by id$$,
  $$values ('member.invited'::text), ('member.invited'), ('member.joined'), ('member.removed'), ('member.invited'), ('member.invite_revoked')$$,
  'every team change is audited in order');
select is(public.verify_audit_chain('a8000000-0000-0000-0000-000000000001'), null::bigint, 'audit chain stays intact');

select * from finish();
rollback;
