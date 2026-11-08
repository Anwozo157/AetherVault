-- AetherVault Phase 3.2: core schema, roles, row-level security, audit log.
-- Design: docs/adr/0002-auth-and-rbac.md, docs/adr/0003-failover-and-audit.md
--
-- Principles
-- * Browsers hold only the public anon key; every table has RLS.
-- * Clients never write tables directly. All writes go through SECURITY DEFINER
--   functions that check the caller's role, enforce the failover rules, and append
--   to the audit log in the same transaction.
-- * The audit log is append-only (triggers) and hash-chained per organization.

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------------------
-- Roles (declaration order matters: later = more privileged)
-- ---------------------------------------------------------------------------
create type public.app_role as enum ('viewer', 'operator', 'approver', 'admin');

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table public.orgs (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  created_at timestamptz not null default now()
);

create table public.memberships (
  org_id uuid not null references public.orgs (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.app_role not null default 'viewer',
  created_at timestamptz not null default now(),
  primary key (org_id, user_id)
);
create index memberships_user_idx on public.memberships (user_id);

create table public.failover_runs (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs (id) on delete cascade,
  source_region text not null check (source_region ~ '^[a-z0-9-]{2,40}$'),
  target_region text not null check (target_region ~ '^[a-z0-9-]{2,40}$'),
  requested_by uuid not null references auth.users (id),
  requested_at timestamptz not null default now(),
  approved_by uuid references auth.users (id),
  approved_at timestamptz,
  aborted_by uuid references auth.users (id),
  aborted_at timestamptz,
  reset_at timestamptz,
  -- Two-person rule, enforced by the database itself.
  constraint approver_is_not_requester check (approved_by is null or approved_by <> requested_by),
  constraint approval_fields_together check ((approved_by is null) = (approved_at is null)),
  constraint abort_fields_together check ((aborted_by is null) = (aborted_at is null))
);
-- At most one open (not aborted, not reset) run per organization.
create unique index failover_runs_one_open_per_org
  on public.failover_runs (org_id)
  where aborted_at is null and reset_at is null;

create table public.audit_log (
  id bigint generated always as identity primary key,
  -- RESTRICT: an organization with audit history cannot be deleted.
  org_id uuid not null references public.orgs (id) on delete restrict,
  actor uuid references auth.users (id),
  action text not null check (action ~ '^[a-z_]+\.[a-z_]+$'),
  detail jsonb not null default '{}'::jsonb,
  created_at timestamptz not null,
  prev_hash text not null,
  hash text not null unique
);
create index audit_log_org_idx on public.audit_log (org_id, id);

-- ---------------------------------------------------------------------------
-- Failover stage, derived from timestamps (ADR 0003). Mirrors src/domain/dr.ts
-- and MockDrProvider timings: snapshot 0–1.2s, hydrate 1.2–3.5s,
-- DNS cutover 3.5–5.5s, secured after 5.5s.
-- ---------------------------------------------------------------------------
create or replace function public.run_stage(run public.failover_runs, at_time timestamptz default now())
returns text
language sql
stable
set search_path = ''
as $$
  select case
    when run.aborted_at is not null or run.reset_at is not null then 'ACTIVE_SYNC'
    when run.approved_at is null then 'PENDING_APPROVAL'
    when at_time < run.approved_at + interval '1.2 seconds' then 'QUIESCE_AND_SNAPSHOT'
    when at_time < run.approved_at + interval '3.5 seconds' then 'HYDRATING_TARGET'
    when at_time < run.approved_at + interval '5.5 seconds' then 'DNS_CUTOVER'
    else 'TARGET_SECURED'
  end
$$;

-- ---------------------------------------------------------------------------
-- Role check used by RLS policies and RPCs.
-- ---------------------------------------------------------------------------
create or replace function public.has_role(p_org uuid, p_min public.app_role)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.memberships m
    where m.org_id = p_org
      and m.user_id = (select auth.uid())
      and m.role >= p_min
  )
$$;

-- ---------------------------------------------------------------------------
-- Audit log: append-only, hash-chained per organization.
-- ---------------------------------------------------------------------------
create or replace function public.audit_row_hash(
  p_prev text, p_org uuid, p_actor uuid, p_action text, p_detail jsonb, p_created timestamptz
)
returns text
language sql
immutable
set search_path = ''
as $$
  select encode(
    extensions.digest(
      concat_ws('|', p_prev, p_org::text, coalesce(p_actor::text, ''), p_action, p_detail::text,
                extract(epoch from p_created)::text),
      'sha256'),
    'hex')
$$;

create or replace function public.append_audit(p_org uuid, p_action text, p_detail jsonb default '{}'::jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_prev text;
  v_created timestamptz := clock_timestamp();
  v_actor uuid := (select auth.uid());
begin
  -- Serialize appends per org so the chain cannot fork.
  perform pg_advisory_xact_lock(hashtextextended(p_org::text, 0));
  select a.hash into v_prev from public.audit_log a where a.org_id = p_org order by a.id desc limit 1;
  v_prev := coalesce(v_prev, repeat('0', 64));
  insert into public.audit_log (org_id, actor, action, detail, created_at, prev_hash, hash)
  values (p_org, v_actor, p_action, p_detail, v_created, v_prev,
          public.audit_row_hash(v_prev, p_org, v_actor, p_action, p_detail, v_created));
end
$$;

create or replace function public.audit_log_is_append_only()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'audit_log is append-only' using errcode = 'insufficient_privilege';
end
$$;

create trigger audit_log_no_update_delete
  before update or delete on public.audit_log
  for each row execute function public.audit_log_is_append_only();
create trigger audit_log_no_truncate
  before truncate on public.audit_log
  for each statement execute function public.audit_log_is_append_only();

-- Returns the id of the first row whose hash does not verify, or null if the chain is intact.
create or replace function public.verify_audit_chain(p_org uuid)
returns bigint
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  r record;
  v_prev text := repeat('0', 64);
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  for r in select * from public.audit_log a where a.org_id = p_org order by a.id loop
    if r.prev_hash <> v_prev
       or r.hash <> public.audit_row_hash(r.prev_hash, r.org_id, r.actor, r.action, r.detail, r.created_at) then
      return r.id;
    end if;
    v_prev := r.hash;
  end loop;
  return null;
end
$$;

-- ---------------------------------------------------------------------------
-- RPCs: the only way clients change data.
-- ---------------------------------------------------------------------------
create or replace function public.create_org(p_name text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_org uuid;
begin
  if (select auth.uid()) is null then
    raise exception 'sign in required' using errcode = 'insufficient_privilege';
  end if;
  insert into public.orgs (name) values (p_name) returning id into v_org;
  insert into public.memberships (org_id, user_id, role) values (v_org, (select auth.uid()), 'admin');
  perform public.append_audit(v_org, 'org.created', jsonb_build_object('name', p_name));
  return v_org;
end
$$;

create or replace function public.set_member_role(p_org uuid, p_user uuid, p_role public.app_role)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if p_user = (select auth.uid()) and p_role <> 'admin' then
    raise exception 'admins cannot demote themselves' using errcode = 'check_violation';
  end if;
  insert into public.memberships (org_id, user_id, role) values (p_org, p_user, p_role)
  on conflict (org_id, user_id) do update set role = excluded.role;
  perform public.append_audit(p_org, 'member.role_set',
    jsonb_build_object('user_id', p_user, 'role', p_role));
end
$$;

create or replace function public.request_failover(p_org uuid, p_source text, p_target text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_run uuid;
begin
  if not public.has_role(p_org, 'operator') then
    raise exception 'operator role required' using errcode = 'insufficient_privilege';
  end if;
  insert into public.failover_runs (org_id, source_region, target_region, requested_by)
  values (p_org, p_source, p_target, (select auth.uid()))
  returning id into v_run;
  perform public.append_audit(p_org, 'failover.requested',
    jsonb_build_object('run_id', v_run, 'source', p_source, 'target', p_target));
  return v_run;
exception when unique_violation then
  raise exception 'a failover is already open for this organization' using errcode = 'unique_violation';
end
$$;

create or replace function public.approve_failover(p_run uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
begin
  select * into r from public.failover_runs where id = p_run for update;
  if not found or not public.has_role(r.org_id, 'approver') then
    raise exception 'approver role required' using errcode = 'insufficient_privilege';
  end if;
  if public.run_stage(r) <> 'PENDING_APPROVAL' then
    raise exception 'run is not awaiting approval' using errcode = 'check_violation';
  end if;
  if r.requested_by = (select auth.uid()) then
    raise exception 'two-person rule: requester cannot approve' using errcode = 'check_violation';
  end if;
  update public.failover_runs
     set approved_by = (select auth.uid()), approved_at = now()
   where id = p_run;
  perform public.append_audit(r.org_id, 'failover.approved', jsonb_build_object('run_id', p_run));
end
$$;

create or replace function public.abort_failover(p_run uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
  v_stage text;
begin
  select * into r from public.failover_runs where id = p_run for update;
  if not found or not public.has_role(r.org_id, 'operator') then
    raise exception 'operator role required' using errcode = 'insufficient_privilege';
  end if;
  v_stage := public.run_stage(r);
  if v_stage not in ('PENDING_APPROVAL', 'QUIESCE_AND_SNAPSHOT', 'HYDRATING_TARGET') then
    raise exception 'abort not allowed at stage %', v_stage using errcode = 'check_violation';
  end if;
  update public.failover_runs
     set aborted_by = (select auth.uid()), aborted_at = now()
   where id = p_run;
  perform public.append_audit(r.org_id, 'failover.aborted',
    jsonb_build_object('run_id', p_run, 'stage', v_stage));
end
$$;

create or replace function public.reset_failover(p_run uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
begin
  select * into r from public.failover_runs where id = p_run for update;
  if not found or not public.has_role(r.org_id, 'operator') then
    raise exception 'operator role required' using errcode = 'insufficient_privilege';
  end if;
  if public.run_stage(r) <> 'TARGET_SECURED' then
    raise exception 'reset only allowed after target is secured' using errcode = 'check_violation';
  end if;
  update public.failover_runs set reset_at = now() where id = p_run;
  perform public.append_audit(r.org_id, 'failover.reset', jsonb_build_object('run_id', p_run));
end
$$;

-- ---------------------------------------------------------------------------
-- Row-level security: read-only for members; no direct writes for anyone.
-- ---------------------------------------------------------------------------
alter table public.orgs enable row level security;
alter table public.memberships enable row level security;
alter table public.failover_runs enable row level security;
alter table public.audit_log enable row level security;

create policy "members read their orgs" on public.orgs
  for select to authenticated using (public.has_role(id, 'viewer'));
create policy "members read memberships" on public.memberships
  for select to authenticated using (public.has_role(org_id, 'viewer'));
create policy "members read runs" on public.failover_runs
  for select to authenticated using (public.has_role(org_id, 'viewer'));
create policy "members read audit log" on public.audit_log
  for select to authenticated using (public.has_role(org_id, 'viewer'));

-- ---------------------------------------------------------------------------
-- Privileges: explicit grants (required for new Supabase projects).
-- ---------------------------------------------------------------------------
revoke all on public.orgs, public.memberships, public.failover_runs, public.audit_log
  from anon, authenticated;
grant select on public.orgs, public.memberships, public.failover_runs, public.audit_log
  to authenticated;

revoke execute on all functions in schema public from public, anon;
grant execute on function
  public.run_stage(public.failover_runs, timestamptz),
  public.has_role(uuid, public.app_role),
  public.verify_audit_chain(uuid),
  public.create_org(text),
  public.set_member_role(uuid, uuid, public.app_role),
  public.request_failover(uuid, text, text),
  public.approve_failover(uuid),
  public.abort_failover(uuid),
  public.reset_failover(uuid)
to authenticated;
-- Internal helpers stay private to definer functions.
revoke execute on function public.append_audit(uuid, text, jsonb) from authenticated;
revoke execute on function public.audit_row_hash(text, uuid, uuid, text, jsonb, timestamptz) from authenticated;

-- Live updates for runs and the audit log (Realtime enforces RLS).
alter publication supabase_realtime add table public.failover_runs, public.audit_log;
