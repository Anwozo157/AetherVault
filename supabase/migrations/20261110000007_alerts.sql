-- AetherVault Phase 4.3: alerts to Slack and PagerDuty.
--
-- * Admins add alert channels: a Slack incoming webhook, or a PagerDuty Events API v2
--   integration key. The secret is encrypted with Supabase Vault and never returned to a
--   browser; the console shows only its last 4 characters.
-- * Only two fixed destinations are possible: https://hooks.slack.com/services/... and
--   https://events.pagerduty.com/v2/enqueue. No arbitrary URLs (prevents the database being
--   used to call internal or unexpected hosts).
-- * An AFTER INSERT trigger on audit_log turns failover and drill events into alerts and
--   queues them with pg_net, which sends after the transaction commits. Alerting can never
--   block or roll back a failover: every error is caught and recorded as a failed delivery.
-- * PagerDuty incidents use a dedup key per run, so a failover's incident resolves itself
--   when the failover is aborted or reset.
-- * Every delivery is logged; a pg_cron job records the HTTP result every minute.

create extension if not exists pg_net with schema extensions;

-- ---------------------------------------------------------------------------
-- Tables (no client access: read through role-checked functions)
-- ---------------------------------------------------------------------------
create table public.alert_channels (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs (id) on delete cascade,
  kind text not null check (kind in ('slack', 'pagerduty')),
  name text not null check (char_length(name) between 1 and 60),
  -- vault.secrets id holding the webhook URL or integration key.
  secret_id uuid not null,
  hint text not null check (char_length(hint) = 4),
  events text[] not null check (
    cardinality(events) > 0 and events <@ array['failover', 'drill_failed', 'drill_passed']),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);
create index alert_channels_org_idx on public.alert_channels (org_id);

create table public.alert_deliveries (
  id bigint generated always as identity primary key,
  org_id uuid not null references public.orgs (id) on delete cascade,
  channel_id uuid references public.alert_channels (id) on delete set null,
  channel_name text not null,
  kind text not null,
  audit_id bigint,
  event text not null,
  title text not null,
  status text not null check (status in ('queued', 'sent', 'failed')),
  request_id bigint,
  http_status int,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index alert_deliveries_org_idx on public.alert_deliveries (org_id, id desc);
create index alert_deliveries_queued_idx on public.alert_deliveries (request_id) where status = 'queued';

alter table public.alert_channels enable row level security;
alter table public.alert_deliveries enable row level security;
revoke all on public.alert_channels, public.alert_deliveries from anon, authenticated;

-- ---------------------------------------------------------------------------
-- What each audit event means as an alert (null = not alerted)
-- ---------------------------------------------------------------------------
create or replace function public.alert_for(p_action text, p_detail jsonb, p_actor text)
returns jsonb
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_run text := p_detail->>'run_id';
  v_result text := p_detail->>'result';
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
  end;
end
$$;

-- Queue one alert to one channel. Never raises: failures become 'failed' deliveries.
create or replace function public.enqueue_alert(
  c public.alert_channels, p_alert jsonb, p_org_name text, p_audit_id bigint, p_event text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_secret text;
  v_url text;
  v_body jsonb;
  v_request bigint;
begin
  if c.kind = 'pagerduty' and p_alert->>'pd_action' is null then
    return; -- informational events don't page anyone
  end if;
  begin
    select s.decrypted_secret into v_secret from vault.decrypted_secrets s where s.id = c.secret_id;
    if v_secret is null then
      raise exception 'channel secret is missing';
    end if;
    if c.kind = 'slack' then
      v_url := v_secret;
      v_body := jsonb_build_object('text', format('*AetherVault · %s*%s%s', p_org_name, chr(10), p_alert->>'title'));
    else
      v_url := 'https://events.pagerduty.com/v2/enqueue';
      v_body := jsonb_build_object(
        'routing_key', v_secret,
        'event_action', p_alert->>'pd_action',
        'dedup_key', 'aethervault-' || (p_alert->>'dedup_key'));
      if p_alert->>'pd_action' = 'trigger' then
        v_body := v_body || jsonb_build_object('payload', jsonb_build_object(
          'summary', left(format('%s: %s', p_org_name, p_alert->>'title'), 1024),
          'source', 'AetherVault',
          'severity', p_alert->>'severity',
          'component', p_org_name,
          'custom_details', jsonb_build_object('event', p_event)));
      end if;
    end if;
    v_request := net.http_post(url := v_url, body := v_body, timeout_milliseconds := 5000);
    insert into public.alert_deliveries (org_id, channel_id, channel_name, kind, audit_id, event, title, status, request_id)
    values (c.org_id, c.id, c.name, c.kind, p_audit_id, p_event, p_alert->>'title', 'queued', v_request);
  exception when others then
    insert into public.alert_deliveries (org_id, channel_id, channel_name, kind, audit_id, event, title, status, error)
    values (c.org_id, c.id, c.name, c.kind, p_audit_id, p_event, coalesce(p_alert->>'title', p_event), 'failed', left(sqlerrm, 200));
  end;
end
$$;

create or replace function public.audit_alert_dispatch()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_alert jsonb;
  v_org text;
  c public.alert_channels;
begin
  if not exists (select 1 from public.alert_channels ch where ch.org_id = new.org_id) then
    return null;
  end if;
  v_alert := public.alert_for(new.action, new.detail,
    coalesce((select u.email from auth.users u where u.id = new.actor)::text, 'the scheduler'));
  if v_alert is null then
    return null;
  end if;
  select o.name into v_org from public.orgs o where o.id = new.org_id;
  for c in
    select * from public.alert_channels ch
     where ch.org_id = new.org_id and (v_alert->>'category') = any (ch.events)
     order by ch.created_at
  loop
    perform public.enqueue_alert(c, v_alert, v_org, new.id, new.action);
  end loop;
  return null;
exception when others then
  -- Alerting must never block the audited action itself.
  raise warning 'alert dispatch failed: %', sqlerrm;
  return null;
end
$$;

create trigger audit_log_alerts
  after insert on public.audit_log
  for each row execute function public.audit_alert_dispatch();

-- ---------------------------------------------------------------------------
-- RPCs
-- ---------------------------------------------------------------------------
create or replace function public.add_alert_channel(
  p_org uuid, p_kind text, p_name text, p_secret text, p_events text[]
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_secret_id uuid;
  v_id uuid := gen_random_uuid();
  v_secret text := btrim(p_secret);
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if p_kind = 'slack' and v_secret !~ '^https://hooks\.slack\.com/services/[A-Za-z0-9]+/[A-Za-z0-9]+/[A-Za-z0-9]+$' then
    raise exception 'Slack webhook URL must look like https://hooks.slack.com/services/T.../B.../...'
      using errcode = 'check_violation';
  end if;
  if p_kind = 'pagerduty' and v_secret !~ '^[A-Za-z0-9]{32}$' then
    raise exception 'PagerDuty integration key must be 32 letters and digits' using errcode = 'check_violation';
  end if;
  if p_kind not in ('slack', 'pagerduty') then
    raise exception 'channel must be slack or pagerduty' using errcode = 'check_violation';
  end if;
  if (select count(*) from public.alert_channels ch where ch.org_id = p_org) >= 10 then
    raise exception 'at most 10 alert channels per organization' using errcode = 'check_violation';
  end if;
  v_secret_id := vault.create_secret(v_secret, 'aethervault-alert-' || v_id, 'AetherVault alert channel secret');
  insert into public.alert_channels (id, org_id, kind, name, secret_id, hint, events, created_by)
  values (v_id, p_org, p_kind, btrim(p_name), v_secret_id, right(v_secret, 4), p_events, (select auth.uid()));
  -- The secret itself is never written to the audit log.
  perform public.append_audit(p_org, 'alert.channel_added', jsonb_build_object(
    'channel_id', v_id, 'kind', p_kind, 'name', btrim(p_name), 'events', to_jsonb(p_events)));
  return v_id;
end
$$;

create or replace function public.remove_alert_channel(p_channel uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  c public.alert_channels;
begin
  select * into c from public.alert_channels where id = p_channel;
  if not found or not public.has_role(c.org_id, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  delete from public.alert_channels where id = p_channel;
  delete from vault.secrets where id = c.secret_id;
  perform public.append_audit(c.org_id, 'alert.channel_removed', jsonb_build_object(
    'channel_id', c.id, 'kind', c.kind, 'name', c.name));
end
$$;

create or replace function public.send_test_alert(p_channel uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  c public.alert_channels;
begin
  select * into c from public.alert_channels where id = p_channel;
  if not found or not public.has_role(c.org_id, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  perform public.enqueue_alert(c, jsonb_build_object(
      'severity', 'info', 'pd_action', 'trigger', 'dedup_key', 'test-' || gen_random_uuid(),
      'title', 'Test alert from AetherVault. If you can read this, alerts are working.'),
    (select o.name from public.orgs o where o.id = c.org_id), null, 'test');
  perform public.append_audit(c.org_id, 'alert.test_sent', jsonb_build_object('channel_id', c.id, 'name', c.name));
end
$$;

create or replace function public.list_alert_channels(p_org uuid)
returns table (
  id uuid, kind text, name text, hint text, events text[], created_by_email text, created_at timestamptz
)
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
    select ch.id, ch.kind, ch.name, ch.hint, ch.events, u.email::text, ch.created_at
      from public.alert_channels ch
      left join auth.users u on u.id = ch.created_by
     where ch.org_id = p_org
     order by ch.created_at, ch.name;
end
$$;

create or replace function public.list_alert_deliveries(p_org uuid, p_limit int default 30)
returns table (
  id bigint, channel_name text, kind text, event text, title text, status text,
  http_status int, error text, created_at timestamptz
)
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
    select d.id, d.channel_name, d.kind, d.event, d.title, d.status, d.http_status, d.error, d.created_at
      from public.alert_deliveries d
     where d.org_id = p_org
     order by d.id desc
     limit least(greatest(p_limit, 1), 100);
end
$$;

-- Records HTTP results from pg_net (called every minute by pg_cron).
create or replace function public.sweep_alert_deliveries()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_done int;
  v_lost int;
begin
  update public.alert_deliveries d
     set status = case when r.status_code between 200 and 299 then 'sent' else 'failed' end,
         http_status = r.status_code,
         error = case
           when r.timed_out then 'timed out'
           when r.error_msg is not null then left(r.error_msg, 200)
           when r.status_code not between 200 and 299 then left(coalesce(r.content, ''), 200)
         end,
         updated_at = now()
    from net._http_response r
   where d.status = 'queued' and r.id = d.request_id;
  get diagnostics v_done = row_count;
  -- pg_net keeps responses for a few hours; anything older without one is lost.
  update public.alert_deliveries d
     set status = 'failed', error = 'no response recorded', updated_at = now()
   where d.status = 'queued' and d.created_at < now() - interval '15 minutes';
  get diagnostics v_lost = row_count;
  return v_done + v_lost;
end
$$;

-- ---------------------------------------------------------------------------
-- Privileges
-- ---------------------------------------------------------------------------
revoke execute on function
  public.alert_for(text, jsonb, text),
  public.enqueue_alert(public.alert_channels, jsonb, text, bigint, text),
  public.audit_alert_dispatch(),
  public.add_alert_channel(uuid, text, text, text, text[]),
  public.remove_alert_channel(uuid),
  public.send_test_alert(uuid),
  public.list_alert_channels(uuid),
  public.list_alert_deliveries(uuid, int),
  public.sweep_alert_deliveries()
from public, anon, authenticated;
grant execute on function
  public.add_alert_channel(uuid, text, text, text, text[]),
  public.remove_alert_channel(uuid),
  public.send_test_alert(uuid),
  public.list_alert_channels(uuid),
  public.list_alert_deliveries(uuid, int)
to authenticated;

select cron.schedule('aethervault-alert-sweeper', '* * * * *', 'select public.sweep_alert_deliveries()');
