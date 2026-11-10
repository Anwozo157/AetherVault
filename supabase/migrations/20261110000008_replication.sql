-- AetherVault Phase 4.4: real replication status from AWS Elastic Disaster Recovery.
--
-- Push model: a small read-only collector runs in the customer's own AWS account
-- (Lambda + the AWSElasticDisasterRecoveryReadOnlyAccess managed policy), calls
-- DescribeSourceServers, and pushes replication STATUS only (state, lag, backlog bytes,
-- errors) to ingest_replication_snapshot(). No server data and no AWS credentials leave
-- the customer's account, and AetherVault needs no inbound access.
--
-- * The collector authenticates with a per-organization ingest token (192 random bits).
--   Only its SHA-256 is stored; admins create or revoke it; it is shown once.
-- * The database computes each server's health from the DRS state itself, and whether the
--   organization's data-loss target (RPO) is met. Transitions are audited
--   (replication.rpo_breached / replication.rpo_recovered) and therefore alert (4.3).
-- * source = 'fixture' marks sample data pushed by the collector's --fixture mode; the
--   console labels it as sample data and it never counts as measured.
-- * Snapshots are kept 7 days.

-- ---------------------------------------------------------------------------
-- Tables (no direct client access)
-- ---------------------------------------------------------------------------
create table public.ingest_tokens (
  org_id uuid primary key references public.orgs (id) on delete cascade,
  token_hash text not null unique,
  hint text not null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  last_used_at timestamptz
);

create table public.replication_snapshots (
  id bigint generated always as identity primary key,
  org_id uuid not null references public.orgs (id) on delete cascade,
  source text not null check (source in ('aws-drs', 'fixture')),
  collected_at timestamptz not null,
  received_at timestamptz not null default now(),
  aws_account_id text check (aws_account_id ~ '^[0-9]{12}$'),
  aws_region text not null check (aws_region ~ '^[a-z]{2}(-gov)?-[a-z]+-[0-9]$'),
  collector_version text,
  server_count int not null,
  healthy_count int not null,
  problem_count int not null,
  max_lag_seconds numeric,
  backlog_bytes bigint not null,
  rpo_target_seconds int not null,
  rpo_met boolean,
  servers jsonb not null
);
create index replication_snapshots_org_idx on public.replication_snapshots (org_id, received_at desc);

-- Last known RPO state per org, so only transitions are audited.
create table public.replication_state (
  org_id uuid primary key references public.orgs (id) on delete cascade,
  rpo_met boolean,
  changed_at timestamptz not null default now()
);

alter table public.ingest_tokens enable row level security;
alter table public.replication_snapshots enable row level security;
alter table public.replication_state enable row level security;
revoke all on public.ingest_tokens, public.replication_snapshots, public.replication_state
  from anon, authenticated;

-- ---------------------------------------------------------------------------
-- Health of one server, from the DRS dataReplicationState (API reference enum) and error.
-- ---------------------------------------------------------------------------
create or replace function public.replication_health(p_state text, p_error text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when p_error is not null and p_error <> '' then 'stalled'
    when p_state in ('STALLED', 'DISCONNECTED') then 'stalled'
    when p_state in ('STOPPED', 'PAUSED') then 'stopped'
    when p_state in ('INITIATING', 'INITIAL_SYNC', 'RESCAN') then 'syncing'
    when p_state = 'BACKLOG' then 'lagging'
    when p_state in ('CONTINUOUS', 'CREATING_SNAPSHOT') then 'healthy'
    else 'unknown'
  end
$$;

-- ---------------------------------------------------------------------------
-- Ingest token management (admins)
-- ---------------------------------------------------------------------------
create or replace function public.create_ingest_token(p_org uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_token text := 'avi_' || encode(extensions.gen_random_bytes(24), 'hex');
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  insert into public.ingest_tokens (org_id, token_hash, hint, created_by)
  values (p_org, encode(extensions.digest(v_token, 'sha256'), 'hex'), right(v_token, 4), (select auth.uid()))
  on conflict (org_id) do update
    set token_hash = excluded.token_hash, hint = excluded.hint, created_by = excluded.created_by,
        created_at = now(), last_used_at = null;
  perform public.append_audit(p_org, 'replication.token_created', jsonb_build_object('hint', right(v_token, 4)));
  return v_token; -- shown once; only the hash is stored
end
$$;

create or replace function public.revoke_ingest_token(p_org uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  delete from public.ingest_tokens where org_id = p_org;
  if found then
    perform public.append_audit(p_org, 'replication.token_revoked', '{}'::jsonb);
  end if;
end
$$;

create or replace function public.ingest_token_status(p_org uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  t public.ingest_tokens;
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  select * into t from public.ingest_tokens where org_id = p_org;
  if not found then
    return null;
  end if;
  return jsonb_build_object('hint', t.hint, 'created_at', t.created_at, 'last_used_at', t.last_used_at);
end
$$;

-- ---------------------------------------------------------------------------
-- Ingest (called by the collector with the anon key + ingest token)
-- ---------------------------------------------------------------------------
create or replace function public.ingest_replication_snapshot(p_token text, p_snapshot jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_org uuid;
  v_rto int;
  v_rpo int;
  v_collected timestamptz;
  v_source text := coalesce(p_snapshot->>'source', 'aws-drs');
  v_servers jsonb;
  v_count int;
  v_healthy int;
  v_problems int;
  v_max_lag numeric;
  v_backlog bigint;
  v_rpo_met boolean;
  v_prev boolean;
  v_had_state boolean;
begin
  select t.org_id into v_org from public.ingest_tokens t
   where t.token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
  if v_org is null then
    raise exception 'invalid ingest token' using errcode = 'insufficient_privilege';
  end if;

  if pg_column_size(p_snapshot) > 512 * 1024 then
    raise exception 'snapshot too large' using errcode = 'check_violation';
  end if;
  if jsonb_typeof(p_snapshot->'servers') <> 'array' or jsonb_array_length(p_snapshot->'servers') > 500 then
    raise exception 'servers must be an array of at most 500 entries' using errcode = 'check_violation';
  end if;
  v_collected := (p_snapshot->>'collected_at')::timestamptz;
  if v_collected is null or v_collected > now() + interval '2 minutes' or v_collected < now() - interval '10 minutes' then
    raise exception 'collected_at must be within the last 10 minutes' using errcode = 'check_violation';
  end if;

  -- One snapshot per 20 seconds per org is plenty (the collector runs every minute).
  if exists (select 1 from public.replication_snapshots s
              where s.org_id = v_org and s.received_at > now() - interval '20 seconds') then
    return jsonb_build_object('accepted', false, 'reason', 'too_soon');
  end if;

  -- Keep only known fields, typed and bounded; health is computed here, not trusted.
  select coalesce(jsonb_agg(jsonb_build_object(
           'id', left(e->>'id', 64),
           'hostname', left(coalesce(e->>'hostname', ''), 256),
           'state', left(upper(coalesce(e->>'state', 'UNKNOWN')), 40),
           'health', public.replication_health(upper(e->>'state'), e->>'error'),
           'lag_seconds', (e->>'lag_seconds')::numeric,
           'lag_raw', left(e->>'lag_raw', 64),
           'backlog_bytes', coalesce((e->>'backlog_bytes')::bigint, 0),
           'total_bytes', coalesce((e->>'total_bytes')::bigint, 0),
           'replicated_bytes', coalesce((e->>'replicated_bytes')::bigint, 0),
           'eta_at', (e->>'eta_at')::timestamptz,
           'last_seen_at', (e->>'last_seen_at')::timestamptz,
           'error', left(nullif(e->>'error', ''), 80),
           'last_launch_result', left(e->>'last_launch_result', 20)
         ) order by e->>'hostname'), '[]'::jsonb)
    into v_servers
    from jsonb_array_elements(p_snapshot->'servers') e;

  if exists (select 1 from jsonb_array_elements(v_servers) s
              where s->>'id' is null
                 or (s->>'lag_seconds')::numeric < 0
                 or (s->>'backlog_bytes')::bigint < 0
                 or (s->>'total_bytes')::bigint < 0
                 or (s->>'replicated_bytes')::bigint < 0) then
    raise exception 'invalid server entry' using errcode = 'check_violation';
  end if;

  select o.rto_target_seconds, o.rpo_target_seconds into v_rto, v_rpo from public.orgs o where o.id = v_org;
  select count(*)::int,
         count(*) filter (where s->>'health' = 'healthy')::int,
         count(*) filter (where s->>'health' in ('stalled', 'stopped', 'syncing', 'unknown'))::int,
         max((s->>'lag_seconds')::numeric),
         coalesce(sum((s->>'backlog_bytes')::bigint), 0)
    into v_count, v_healthy, v_problems, v_max_lag, v_backlog
    from jsonb_array_elements(v_servers) s;

  -- RPO met: every server replicating and the worst lag within target. Unknown if no lag reported.
  v_rpo_met := case
    when v_count = 0 then null
    when v_problems > 0 then false
    when v_max_lag is null then null
    else v_max_lag <= v_rpo
  end;

  insert into public.replication_snapshots (
    org_id, source, collected_at, aws_account_id, aws_region, collector_version,
    server_count, healthy_count, problem_count, max_lag_seconds, backlog_bytes,
    rpo_target_seconds, rpo_met, servers)
  values (
    v_org, v_source, v_collected, nullif(p_snapshot->>'aws_account_id', ''), p_snapshot->>'aws_region',
    left(p_snapshot->>'collector_version', 40),
    v_count, v_healthy, v_problems, v_max_lag, v_backlog, v_rpo, v_rpo_met, v_servers);

  update public.ingest_tokens set last_used_at = now() where org_id = v_org;
  delete from public.replication_snapshots where org_id = v_org and received_at < now() - interval '7 days';

  -- Audit (and so alert) only on a change of a known RPO state.
  select r.rpo_met, true into v_prev, v_had_state from public.replication_state r where r.org_id = v_org;
  if v_rpo_met is not null and v_rpo_met is distinct from v_prev then
    insert into public.replication_state (org_id, rpo_met, changed_at) values (v_org, v_rpo_met, now())
    on conflict (org_id) do update set rpo_met = excluded.rpo_met, changed_at = excluded.changed_at;
    -- The first healthy snapshot is not a "recovery".
    if not v_rpo_met or coalesce(v_had_state, false) then
      perform public.append_audit(v_org,
        case when v_rpo_met then 'replication.rpo_recovered' else 'replication.rpo_breached' end,
        jsonb_build_object(
          'max_lag_seconds', v_max_lag, 'rpo_target_seconds', v_rpo,
          'problem_count', v_problems, 'server_count', v_count, 'source', v_source));
    end if;
  end if;

  return jsonb_build_object('accepted', true, 'rpo_met', v_rpo_met, 'servers', v_count);
end
$$;

-- ---------------------------------------------------------------------------
-- Reads (members)
-- ---------------------------------------------------------------------------
create or replace function public.latest_replication_snapshot(p_org uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  s public.replication_snapshots;
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  select * into s from public.replication_snapshots r where r.org_id = p_org order by r.received_at desc limit 1;
  if not found then
    return null;
  end if;
  return jsonb_build_object(
    'source', s.source, 'collected_at', s.collected_at, 'received_at', s.received_at, 'server_now', now(),
    'aws_account_id', s.aws_account_id, 'aws_region', s.aws_region, 'collector_version', s.collector_version,
    'server_count', s.server_count, 'healthy_count', s.healthy_count, 'problem_count', s.problem_count,
    'max_lag_seconds', s.max_lag_seconds, 'backlog_bytes', s.backlog_bytes,
    'rpo_target_seconds', s.rpo_target_seconds, 'rpo_met', s.rpo_met, 'servers', s.servers);
end
$$;

create or replace function public.replication_lag_history(p_org uuid, p_limit int default 60)
returns table (collected_at timestamptz, max_lag_seconds numeric, rpo_met boolean)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  return query
    select h.collected_at, h.max_lag_seconds, h.rpo_met from (
      select r.collected_at, r.max_lag_seconds, r.rpo_met
        from public.replication_snapshots r
       where r.org_id = p_org
       order by r.received_at desc
       limit least(greatest(p_limit, 1), 1440)) h
     order by h.collected_at;
end
$$;

-- ---------------------------------------------------------------------------
-- Alerts: RPO breach pages; recovery resolves the incident.
-- ---------------------------------------------------------------------------
alter table public.alert_channels drop constraint alert_channels_events_check;
alter table public.alert_channels add constraint alert_channels_events_check check (
  cardinality(events) > 0 and events <@ array['failover', 'drill_failed', 'drill_passed', 'replication']);

create or replace function public.alert_for(p_action text, p_detail jsonb, p_actor text)
returns jsonb
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_run text := p_detail->>'run_id';
  v_result text := p_detail->>'result';
  v_sample text := case when p_detail->>'source' = 'fixture' then ' [SAMPLE DATA]' else '' end;
begin
  return case
    when p_action = 'failover.requested' then jsonb_build_object(
      'category', 'failover', 'severity', 'warning', 'pd_action', 'trigger', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover requested by %s: %s → %s. Needs a second approver.',
                      p_actor, p_detail->>'source', p_detail->>'target'))
    when p_action = 'failover.approved' then jsonb_build_object(
      'category', 'failover', 'severity', 'critical', 'pd_action', 'trigger', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover approved by %s. Executing now.', p_actor))
    when p_action = 'failover.aborted' and p_detail->>'stage' = 'PENDING_APPROVAL' then jsonb_build_object(
      'category', 'failover', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover request withdrawn by %s.', p_actor))
    when p_action = 'failover.aborted' then jsonb_build_object(
      'category', 'failover', 'severity', 'warning', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover aborted by %s at %s.', p_actor, lower(replace(p_detail->>'stage', '_', ' '))))
    when p_action = 'failover.reset' then jsonb_build_object(
      'category', 'failover', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover reset by %s. Primary region active.', p_actor))
    when p_action = 'drill.completed' and v_result = 'failed' then jsonb_build_object(
      'category', 'drill_failed', 'severity', 'error', 'pd_action', 'trigger', 'dedup_key', 'drill-' || v_run,
      'title', format('Drill FAILED (simulated telemetry): recovery took %s s, target %s s.',
                      p_detail->>'recovery_seconds', p_detail->>'rto_target_seconds'))
    when p_action = 'drill.completed' and v_result = 'aborted' then jsonb_build_object(
      'category', 'drill_failed', 'severity', 'warning', 'pd_action', null, 'dedup_key', 'drill-' || v_run,
      'title', 'Drill aborted before completion.')
    when p_action = 'drill.completed' and v_result = 'passed' then jsonb_build_object(
      'category', 'drill_passed', 'severity', 'info', 'pd_action', null, 'dedup_key', 'drill-' || v_run,
      'title', format('Drill passed (simulated telemetry): recovered in %s s, target %s s.',
                      p_detail->>'recovery_seconds', p_detail->>'rto_target_seconds'))
    when p_action = 'replication.rpo_breached' then jsonb_build_object(
      'category', 'replication', 'severity', 'error', 'pd_action', 'trigger', 'dedup_key', 'replication-rpo',
      'title', format('Data-loss target at risk%s: %s of %s servers not replicating normally; worst lag %s s (target %s s).',
                      v_sample, p_detail->>'problem_count', p_detail->>'server_count',
                      coalesce(p_detail->>'max_lag_seconds', 'unknown'), p_detail->>'rpo_target_seconds'))
    when p_action = 'replication.rpo_recovered' then jsonb_build_object(
      'category', 'replication', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'replication-rpo',
      'title', format('Replication back within the data-loss target%s: worst lag %s s (target %s s).',
                      v_sample, p_detail->>'max_lag_seconds', p_detail->>'rpo_target_seconds'))
  end;
end
$$;

-- ---------------------------------------------------------------------------
-- Privileges
-- ---------------------------------------------------------------------------
revoke execute on function
  public.replication_health(text, text),
  public.create_ingest_token(uuid),
  public.revoke_ingest_token(uuid),
  public.ingest_token_status(uuid),
  public.ingest_replication_snapshot(text, jsonb),
  public.latest_replication_snapshot(uuid),
  public.replication_lag_history(uuid, int)
from public, anon, authenticated;
grant execute on function
  public.create_ingest_token(uuid),
  public.revoke_ingest_token(uuid),
  public.ingest_token_status(uuid),
  public.latest_replication_snapshot(uuid),
  public.replication_lag_history(uuid, int)
to authenticated;
-- The collector holds only the public anon key + its ingest token.
grant execute on function public.ingest_replication_snapshot(text, jsonb) to anon, authenticated;
