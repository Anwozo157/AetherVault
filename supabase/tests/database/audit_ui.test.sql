-- pgTAP tests for the Phase 3.5 audit log page and verification report.
begin;
create extension if not exists pgtap with schema extensions;
select plan(10);

insert into auth.users (id, email, aud, role) values
  ('f1000000-0000-0000-0000-000000000001', 'op@audit.local',  'authenticated', 'authenticated'),
  ('f1000000-0000-0000-0000-000000000002', 'out@audit.local', 'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('f2000000-0000-0000-0000-000000000001', 'Audit Org');
insert into public.memberships (org_id, user_id, role) values
  ('f2000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', 'operator');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims',
    json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;

set local role authenticated;
select pg_temp.login('f1000000-0000-0000-0000-000000000001');

-- Three entries: request, withdraw (abort), request again.
select public.request_failover('f2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2');
select public.abort_failover((select id from public.failover_runs where org_id = 'f2000000-0000-0000-0000-000000000001' and aborted_at is null));
select public.request_failover('f2000000-0000-0000-0000-000000000001', 'us-east-1', 'gcp-us-central1');

select is((select count(*) from public.audit_log_page('f2000000-0000-0000-0000-000000000001'))::int, 3,
  'page returns all entries for the org');
select is((select action from public.audit_log_page('f2000000-0000-0000-0000-000000000001', 1)), 'failover.requested',
  'newest entry first');
select is((select count(*) from public.audit_log_page('f2000000-0000-0000-0000-000000000001', 100,
  (select max(id) from public.audit_log where org_id = 'f2000000-0000-0000-0000-000000000001')))::int, 2,
  'keyset pagination: entries before an id');
select ok((select bool_and(hash ~ '^[0-9a-f]{64}$' and prev_hash ~ '^[0-9a-f]{64}$')
  from public.audit_log_page('f2000000-0000-0000-0000-000000000001')), 'entries carry SHA-256 chain hashes');
select is((select actor_email from public.audit_log_page('f2000000-0000-0000-0000-000000000001', 1)), 'op@audit.local',
  'entries carry the actor email');

select is(public.verify_audit_chain_report('f2000000-0000-0000-0000-000000000001')->>'ok', 'true', 'intact chain verifies');
select is((public.verify_audit_chain_report('f2000000-0000-0000-0000-000000000001')->>'checked')::int, 3,
  'report counts checked entries');

-- Tamper (as the database owner, bypassing the append-only trigger) and re-verify.
reset role;
alter table public.audit_log disable trigger audit_log_no_update_delete;
update public.audit_log set detail = '{"target":"evil-region"}'
 where id = (select min(id) from public.audit_log where org_id = 'f2000000-0000-0000-0000-000000000001');
alter table public.audit_log enable trigger audit_log_no_update_delete;
set local role authenticated;
select pg_temp.login('f1000000-0000-0000-0000-000000000001');

select is(public.verify_audit_chain_report('f2000000-0000-0000-0000-000000000001')->>'ok', 'false', 'tampering is detected');
select is((public.verify_audit_chain_report('f2000000-0000-0000-0000-000000000001')->>'broken_id')::bigint,
  (select min(id) from public.audit_log where org_id = 'f2000000-0000-0000-0000-000000000001'),
  'report names the first altered entry');

select pg_temp.login('f1000000-0000-0000-0000-000000000002');
select throws_ok($$select * from public.audit_log_page('f2000000-0000-0000-0000-000000000001')$$,
  '42501', 'not a member of this organization', 'non-members cannot read the log');

select * from finish();
rollback;
