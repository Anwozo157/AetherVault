-- pgTAP tests for AWS DRS replication ingest (Phase 4.4).
begin;
create extension if not exists pgtap with schema extensions;
select plan(29);

insert into auth.users (id, email, aud, role) values
  ('f1000000-0000-0000-0000-000000000001', 'admin@rep.local', 'authenticated', 'authenticated'),
  ('f1000000-0000-0000-0000-000000000002', 'op@rep.local',    'authenticated', 'authenticated'),
  ('f1000000-0000-0000-0000-000000000003', 'out@rep.local',   'authenticated', 'authenticated');
insert into public.orgs (id, name, rpo_target_seconds) values ('f2000000-0000-0000-0000-000000000001', 'Rep Org', 60);
insert into public.memberships (org_id, user_id, role) values
  ('f2000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000001', 'admin'),
  ('f2000000-0000-0000-0000-000000000001', 'f1000000-0000-0000-0000-000000000002', 'operator');

create function pg_temp.login(p_user uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claims', json_build_object('sub', p_user, 'role', 'authenticated')::text, true);
end $$;
create function pg_temp.snap(p_servers jsonb, p_source text default 'aws-drs') returns jsonb language sql as $$
  select jsonb_build_object('source', p_source, 'collected_at', now(), 'aws_account_id', '123456789012',
    'aws_region', 'us-west-2', 'collector_version', 'test', 'servers', p_servers)
$$;
create function pg_temp.srv(p_id text, p_state text, p_lag numeric, p_error text default null) returns jsonb language sql as $$
  select jsonb_build_object('id', p_id, 'hostname', p_id || '.example.internal', 'state', p_state,
    'lag_seconds', p_lag, 'backlog_bytes', 0, 'total_bytes', 1000, 'replicated_bytes', 1000, 'error', p_error)
$$;
-- Ingest runs every 20 s at most; tests backdate the previous snapshot instead of waiting.
create function pg_temp.age_snapshots() returns void language sql as $$
  update public.replication_snapshots set received_at = received_at - interval '1 minute'
$$;
create function pg_temp.last_action() returns text language sql as $$
  select action from public.audit_log where org_id = 'f2000000-0000-0000-0000-000000000001' order by id desc limit 1
$$;

-- Health mapping from the DRS dataReplicationState enum
select is(public.replication_health('CONTINUOUS', null), 'healthy', 'CONTINUOUS is healthy');
select is(public.replication_health('BACKLOG', null), 'lagging', 'BACKLOG is lagging');
select is(public.replication_health('INITIAL_SYNC', null), 'syncing', 'INITIAL_SYNC is syncing');
select is(public.replication_health('STALLED', null), 'stalled', 'STALLED is stalled');
select is(public.replication_health('CONTINUOUS', 'AGENT_NOT_SEEN'), 'stalled', 'any replication error means stalled');
select is(public.replication_health('SOMETHING_NEW', null), 'unknown', 'unknown future states are not treated as healthy');

-- Tokens: admin only, shown once, stored hashed
set local role authenticated;
select pg_temp.login('f1000000-0000-0000-0000-000000000002');
select throws_ok($$select public.create_ingest_token('f2000000-0000-0000-0000-000000000001')$$,
  '42501', 'admin role required', 'operators cannot create ingest tokens');
select pg_temp.login('f1000000-0000-0000-0000-000000000001');
create temp table tok as select public.create_ingest_token('f2000000-0000-0000-0000-000000000001') as t;
select matches((select t from tok), '^avi_[0-9a-f]{48}$', 'token is 192 random bits');
select is((select public.ingest_token_status('f2000000-0000-0000-0000-000000000001')->>'hint'), (select right(t, 4) from tok),
  'status shows only the last 4 characters');
select is(pg_temp.last_action(), 'replication.token_created', 'token creation is audited');
select public.add_alert_channel('f2000000-0000-0000-0000-000000000001', 'slack', 'Ops', 'https://hooks.slack.com/services/T9/B9/repTEST', '{replication}');
select throws_ok($$select * from public.ingest_tokens$$, '42501', null, 'clients cannot read the token table');
reset role;
select is((select count(*)::int from public.ingest_tokens where token_hash = (select t from tok)), 0, 'the plain token is not stored');
grant select on tok to anon;

-- Ingest as the collector (anon key + token)
set local role anon;
select throws_ok($$select public.ingest_replication_snapshot('avi_wrong', pg_temp.snap('[]'))$$,
  '42501', 'invalid ingest token', 'a wrong token is rejected');
select throws_ok(format($$select public.ingest_replication_snapshot(%L, jsonb_set(pg_temp.snap('[]'), '{collected_at}', to_jsonb(now() - interval '1 hour')))$$, (select t from tok)),
  '23514', 'collected_at must be within the last 10 minutes', 'stale snapshots are rejected');
select throws_ok(format($$select public.ingest_replication_snapshot(%L, pg_temp.snap(jsonb_build_array(pg_temp.srv('s-1', 'CONTINUOUS', -5))))$$, (select t from tok)),
  '23514', 'invalid server entry', 'negative lag is rejected');
select throws_ok($$select * from public.latest_replication_snapshot('f2000000-0000-0000-0000-000000000001')$$,
  '42501', null, 'anon cannot read snapshots');

-- First healthy snapshot: accepted, RPO met, no "recovered" noise
select is(public.ingest_replication_snapshot((select t from tok),
  pg_temp.snap(jsonb_build_array(pg_temp.srv('s-1', 'CONTINUOUS', 2), pg_temp.srv('s-2', 'CONTINUOUS', 4)))),
  '{"accepted": true, "rpo_met": true, "servers": 2}'::jsonb, 'healthy snapshot accepted, RPO met');
select is(public.ingest_replication_snapshot((select t from tok), pg_temp.snap('[]'))->>'reason', 'too_soon',
  'a second snapshot within 20 s is skipped');
reset role;
select is(pg_temp.last_action(), 'alert.channel_added', 'first healthy snapshot is not audited as a recovery');

-- Breach: a stalled server -> audited once, alerts category replication
select pg_temp.age_snapshots();
set local role anon;
select is(public.ingest_replication_snapshot((select t from tok),
  pg_temp.snap(jsonb_build_array(pg_temp.srv('s-1', 'CONTINUOUS', 2), pg_temp.srv('s-2', 'STALLED', null, 'UNSTABLE_NETWORK'))))->>'rpo_met',
  'false', 'a stalled server breaks the RPO');
reset role;
select is(pg_temp.last_action(), 'replication.rpo_breached', 'breach is audited');
select is((select convert_from(body, 'utf8')::jsonb->>'text' from net.http_request_queue where url like '%/T9/B9/%' order by id desc limit 1),
  E'*AetherVault · Rep Org*\nData-loss target at risk: 1 of 2 servers not replicating normally; worst lag 2 s (target 60 s).',
  'a breach alerts subscribed channels');
select pg_temp.age_snapshots();
set local role anon;
select public.ingest_replication_snapshot((select t from tok),
  pg_temp.snap(jsonb_build_array(pg_temp.srv('s-1', 'CONTINUOUS', 2), pg_temp.srv('s-2', 'STALLED', null, 'UNSTABLE_NETWORK'))));
reset role;
select is((select count(*)::int from public.audit_log where org_id = 'f2000000-0000-0000-0000-000000000001'
            and action = 'replication.rpo_breached'), 1, 'a continuing breach is not re-audited');

-- Lag above target, then recovery
select pg_temp.age_snapshots();
set local role anon;
select is(public.ingest_replication_snapshot((select t from tok),
  pg_temp.snap(jsonb_build_array(pg_temp.srv('s-1', 'CONTINUOUS', 3), pg_temp.srv('s-2', 'CONTINUOUS', 5))))->>'rpo_met',
  'true', 'all servers continuous within target');
reset role;
select is(pg_temp.last_action(), 'replication.rpo_recovered', 'recovery is audited');

-- Member reads: latest snapshot (sanitized, health computed) and history
set local role authenticated;
select pg_temp.login('f1000000-0000-0000-0000-000000000002');
create temp table latest as select public.latest_replication_snapshot('f2000000-0000-0000-0000-000000000001') as j;
select is((select (j->>'max_lag_seconds')::numeric from latest), 5::numeric, 'latest snapshot reports the worst lag');
select is((select j->'servers'->0->>'health' from latest), 'healthy', 'server health computed by the database');
select is((select count(*)::int from public.replication_lag_history('f2000000-0000-0000-0000-000000000001')), 4,
  'history has one point per accepted snapshot');
select pg_temp.login('f1000000-0000-0000-0000-000000000003');
select throws_ok($$select public.latest_replication_snapshot('f2000000-0000-0000-0000-000000000001')$$,
  '42501', 'not a member of this organization', 'non-members cannot read replication status');

select * from finish();
rollback;
