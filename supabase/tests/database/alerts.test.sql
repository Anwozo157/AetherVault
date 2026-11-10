-- pgTAP tests for Slack / PagerDuty alerts. Requests are only queued in pg_net;
-- the transaction rolls back, so nothing is ever sent.
begin;
create extension if not exists pgtap with schema extensions;
select plan(29);

insert into auth.users (id, email, aud, role) values
  ('e1000000-0000-0000-0000-000000000001', 'admin@al.local', 'authenticated', 'authenticated'),
  ('e1000000-0000-0000-0000-000000000002', 'op@al.local',    'authenticated', 'authenticated'),
  ('e1000000-0000-0000-0000-000000000003', 'ap@al.local',    'authenticated', 'authenticated'),
  ('e1000000-0000-0000-0000-000000000004', 'out@al.local',   'authenticated', 'authenticated');
insert into public.orgs (id, name) values ('e2000000-0000-0000-0000-000000000001', 'Alert Org');
insert into public.memberships (org_id, user_id, role) values
  ('e2000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000001', 'admin'),
  ('e2000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000002', 'operator'),
  ('e2000000-0000-0000-0000-000000000001', 'e1000000-0000-0000-0000-000000000003', 'approver');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
-- Requests queued for a host, newest last.
create function pg_temp.queued(p_host text) returns setof jsonb language sql as $$
  select convert_from(q.body, 'utf8')::jsonb from net.http_request_queue q where q.url like p_host || '%' order by q.id
$$;

-- Park the scheduler's other orgs and any earlier queue (rolled back at the end).
update public.drill_schedules set enabled = false;
update public.failover_runs set completed_at = approved_at where kind = 'drill' and completed_at is null;
delete from net.http_request_queue;

set local role authenticated;

-- Adding channels: admin only, validated destinations, secret never stored or audited in clear
select pg_temp.login('e1000000-0000-0000-0000-000000000002');
select throws_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'slack', 'Ops', 'https://hooks.slack.com/services/T1/B1/abc1', '{failover}')$$,
  '42501', 'admin role required', 'operators cannot add channels');
select pg_temp.login('e1000000-0000-0000-0000-000000000001');
select throws_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'slack', 'Ops', 'https://evil.example.com/services/T1/B1/abc1', '{failover}')$$,
  '23514', null, 'non-Slack URLs are rejected');
select throws_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'slack', 'Ops', 'https://hooks.slack.com.evil.io/services/T1/B1/x', '{failover}')$$,
  '23514', null, 'look-alike Slack hosts are rejected');
select throws_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'pagerduty', 'PD', 'short', '{failover}')$$,
  '23514', 'PagerDuty integration key must be 32 letters and digits', 'bad PagerDuty key rejected');
select throws_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'slack', 'Ops', 'https://hooks.slack.com/services/T1/B1/abc1', '{everything}')$$,
  '23514', null, 'unknown event categories rejected');
select lives_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'slack', 'Ops room', 'https://hooks.slack.com/services/T1/B1/secretABCD', '{failover,drill_failed,drill_passed}')$$,
  'admin adds a Slack channel');
select lives_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'pagerduty', 'On-call', 'abcdefghijklmnopqrstuvwxyz012345', '{failover,drill_failed}')$$,
  'admin adds a PagerDuty channel');
select lives_ok($$select public.add_alert_channel('e2000000-0000-0000-0000-000000000001', 'slack', 'Drill failures', 'https://hooks.slack.com/services/T2/B2/onlyFAIL', '{drill_failed}')$$,
  'admin adds a failures-only channel');

select throws_ok($$select * from public.alert_channels$$, '42501', null, 'clients cannot read the channels table');
select set_eq($$select name, hint from public.list_alert_channels('e2000000-0000-0000-0000-000000000001')$$,
  $$values ('Ops room'::text, 'ABCD'::text), ('On-call', '2345'), ('Drill failures', 'FAIL')$$,
  'listing shows only the last 4 characters');
select is((select count(*)::int from public.audit_log where org_id = 'e2000000-0000-0000-0000-000000000001'
            and (detail::text like '%secretABCD%' or detail::text like '%abcdefghij%')), 0,
  'secrets never appear in the audit log');
reset role;
select is((select count(*)::int from vault.decrypted_secrets s join public.alert_channels c on c.secret_id = s.id
            where c.org_id = 'e2000000-0000-0000-0000-000000000001'), 3, 'secrets are stored in Vault');
set local role authenticated;

select pg_temp.login('e1000000-0000-0000-0000-000000000004');
select throws_ok($$select * from public.list_alert_channels('e2000000-0000-0000-0000-000000000001')$$,
  '42501', 'not a member of this organization', 'non-members cannot list channels');

-- A failover request alerts Slack and pages PagerDuty, not the failures-only channel
select pg_temp.login('e1000000-0000-0000-0000-000000000002');
select public.request_failover('e2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2');
reset role;
select is((select count(*)::int from net.http_request_queue), 2, 'one request per subscribed channel');
select is((select q->>'text' from pg_temp.queued('https://hooks.slack.com/services/T1/') q),
  E'*AetherVault · Alert Org*\nFailover requested by op@al.local: us-east-1 → aws-us-west-2. Needs a second approver.',
  'Slack message names the org, requester and route');
select is((select url from net.http_request_queue where url like '%pagerduty%'), 'https://events.pagerduty.com/v2/enqueue',
  'PagerDuty goes to the fixed Events API endpoint');
select is((select q->>'event_action' || '/' || (q->'payload'->>'severity') from pg_temp.queued('https://events.pagerduty.com') q),
  'trigger/warning', 'PagerDuty incident triggered as a warning');
select is((select q->>'dedup_key' from pg_temp.queued('https://events.pagerduty.com') q),
  'aethervault-failover-' || (select id from public.failover_runs where org_id = 'e2000000-0000-0000-0000-000000000001'),
  'incident keyed by run');
select is((select count(*)::int from public.alert_deliveries where status = 'queued' and request_id is not null), 2,
  'deliveries logged as queued');

-- Withdrawing resolves the incident
set local role authenticated;
select public.abort_failover((select id from public.failover_runs where org_id = 'e2000000-0000-0000-0000-000000000001'));
reset role;
select is((select q->>'event_action' from pg_temp.queued('https://events.pagerduty.com') q offset 1),
  'resolve', 'withdrawing resolves the PagerDuty incident');

-- Drill results: passed goes to Slack only; failed reaches every subscribed channel
delete from net.http_request_queue;
update public.orgs set rto_target_seconds = 3 where id = 'e2000000-0000-0000-0000-000000000001';
set local role authenticated;
select public.start_drill('e2000000-0000-0000-0000-000000000001', 'us-east-1', 'aws-us-west-2');
reset role;
select public.run_drill_scheduler(now() + interval '10 seconds');
select is((select count(*)::int from net.http_request_queue), 3, 'a failed drill reaches all three channels');
select is((select q->>'text' from pg_temp.queued('https://hooks.slack.com/services/T2/') q),
  E'*AetherVault · Alert Org*\nDrill FAILED (simulated telemetry): recovery took 5.5 s, target 3 s.',
  'drill failure is labeled simulated');

-- Sweep records HTTP results
insert into net._http_response (id, status_code, timed_out, error_msg, created)
  select request_id, case when kind = 'pagerduty' then 400 else 200 end, false, null, now()
    from public.alert_deliveries where status = 'queued';
select ok(public.sweep_alert_deliveries() >= 2, 'sweep processes responses');
select is((select string_agg(distinct status, ',' order by status) from public.alert_deliveries where kind = 'slack'), 'sent',
  '2xx marks Slack deliveries sent');
select is((select count(*)::int from public.alert_deliveries where kind = 'pagerduty' and status = 'failed' and http_status = 400), 3,
  'non-2xx marks deliveries failed with the status');

-- A broken channel never blocks the failover itself
delete from vault.secrets where id = (select secret_id from public.alert_channels where name = 'Ops room');
set local role authenticated;
select pg_temp.login('e1000000-0000-0000-0000-000000000002');
select lives_ok($$select public.request_failover('e2000000-0000-0000-0000-000000000001', 'us-east-1', 'gcp-us-central1')$$,
  'failover still works when a channel is broken');
reset role;
select is((select error from public.alert_deliveries where channel_name = 'Ops room' order by id desc limit 1),
  'channel secret is missing', 'the broken delivery is recorded as failed');

-- Removing a channel deletes its Vault secret; only admins
set local role authenticated;
select throws_ok($$select public.remove_alert_channel((select id from public.list_alert_channels('e2000000-0000-0000-0000-000000000001') where name = 'On-call'))$$,
  '42501', 'admin role required', 'operators cannot remove channels');
select pg_temp.login('e1000000-0000-0000-0000-000000000001');
select public.remove_alert_channel((select id from public.list_alert_channels('e2000000-0000-0000-0000-000000000001') where name = 'On-call'));
reset role;
select is((select count(*)::int from vault.secrets where name like 'aethervault-alert-%'
            and id not in (select secret_id from public.alert_channels)), 0, 'removed channel secret is deleted');

select * from finish();
rollback;
