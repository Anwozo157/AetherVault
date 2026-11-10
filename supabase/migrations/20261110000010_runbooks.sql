-- Phase 4.6: DR runbooks.
--
-- Each organization keeps one versioned runbook: ordered steps for before, during and after
-- recovery. Admins edit it. Every run (drill or failover) copies the version in force when it was
-- requested, so later edits never rewrite history. Operators and above tick steps off on a run;
-- ticks are permanent (like the audit log) and each one is audited, so they appear in the run's
-- evidence report with who and when.

create table public.runbooks (
  org_id uuid primary key references public.orgs (id) on delete cascade,
  version int not null default 1,
  steps jsonb not null,
  updated_by uuid references auth.users (id) on delete set null,
  updated_at timestamptz not null default now()
);

alter table public.failover_runs add column runbook_at_launch jsonb;

create table public.runbook_checks (
  run_id uuid not null references public.failover_runs (id) on delete cascade,
  step_id uuid not null,
  checked_by uuid references auth.users (id) on delete set null,
  checked_at timestamptz not null default now(),
  note text check (note is null or char_length(note) between 1 and 500),
  primary key (run_id, step_id)
);

alter table public.runbooks enable row level security;
alter table public.runbook_checks enable row level security;
revoke all on public.runbooks, public.runbook_checks from anon, authenticated;

-- Copy the runbook onto each new run (drills and failover requests alike).
create or replace function public.capture_runbook_at_launch()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.runbook_at_launch is null then
    new.runbook_at_launch := (select jsonb_build_object('version', b.version, 'steps', b.steps)
                                from public.runbooks b where b.org_id = new.org_id);
  end if;
  return new;
end
$$;

create trigger failover_runs_capture_runbook
  before insert on public.failover_runs
  for each row execute function public.capture_runbook_at_launch();

-- ---------------------------------------------------------------------------
-- Read and edit the runbook
-- ---------------------------------------------------------------------------
create or replace function public.get_runbook(p_org uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  return (select jsonb_build_object(
                   'version', b.version,
                   'steps', b.steps,
                   'updated_by', (select u.email from auth.users u where u.id = b.updated_by),
                   'updated_at', b.updated_at)
            from public.runbooks b where b.org_id = p_org);
end
$$;

-- Replaces the whole runbook. Steps: [{id?, phase, title, detail?}], 0..50 of them.
-- A step keeps its id when the client sends a valid one, so ticks on older runs still line up.
create or replace function public.set_runbook(p_org uuid, p_steps jsonb)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_step jsonb;
  v_clean jsonb := '[]'::jsonb;
  v_id uuid;
  v_title text;
  v_detail text;
  v_version int;
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if p_steps is null or jsonb_typeof(p_steps) <> 'array' or jsonb_array_length(p_steps) > 50 then
    raise exception 'a runbook has at most 50 steps' using errcode = 'check_violation';
  end if;

  for v_step in select value from jsonb_array_elements(p_steps)
  loop
    v_title := btrim(v_step->>'title');
    v_detail := nullif(btrim(coalesce(v_step->>'detail', '')), '');
    if jsonb_typeof(v_step) <> 'object'
       or v_step->>'phase' is null or v_step->>'phase' not in ('before', 'during', 'after')
       or v_title is null or char_length(v_title) not between 1 and 120
       or char_length(coalesce(v_detail, '')) > 1000 then
      raise exception 'each step needs a phase (before, during, after), a title of 1-120 characters and at most 1000 characters of detail'
        using errcode = 'check_violation';
    end if;
    v_id := case when v_step->>'id' ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
                 then (v_step->>'id')::uuid else gen_random_uuid() end;
    if v_clean @> jsonb_build_array(jsonb_build_object('id', v_id)) then
      v_id := gen_random_uuid(); -- duplicate id from the client: treat as a new step
    end if;
    v_clean := v_clean || jsonb_build_array(jsonb_build_object(
      'id', v_id, 'phase', v_step->>'phase', 'title', v_title, 'detail', v_detail));
  end loop;

  insert into public.runbooks as b (org_id, version, steps, updated_by, updated_at)
  values (p_org, 1, v_clean, (select auth.uid()), now())
  on conflict (org_id) do update
    set version = b.version + 1, steps = excluded.steps,
        updated_by = excluded.updated_by, updated_at = excluded.updated_at
  returning version into v_version;

  perform public.append_audit(p_org, 'runbook.updated',
    jsonb_build_object('version', v_version, 'steps', jsonb_array_length(v_clean)));
  return v_version;
end
$$;

-- ---------------------------------------------------------------------------
-- Checklist for one run
-- ---------------------------------------------------------------------------
-- Ticks are accepted for 7 days after a run is requested (a drill finishes in seconds; the
-- validation and follow-up steps take longer). Withdrawn requests have nothing to tick.
create or replace function public.run_checklist_open(r public.failover_runs)
returns boolean
language sql
stable
set search_path = ''
as $$
  select public.run_outcome(r) <> 'withdrawn' and r.requested_at > now() - interval '7 days'
$$;

create or replace function public.run_checklist(p_run uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
begin
  select * into r from public.failover_runs where id = p_run;
  if not found or not public.has_role(r.org_id, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  if r.runbook_at_launch is null then
    return null;
  end if;
  return jsonb_build_object(
    'run_id', r.id,
    'version', r.runbook_at_launch->'version',
    'open', public.run_checklist_open(r),
    'steps', coalesce((
      select jsonb_agg(s.step || jsonb_build_object(
               'checked_by', (select u.email from auth.users u where u.id = c.checked_by),
               'checked_at', c.checked_at,
               'note', c.note,
               'done', c.step_id is not null)
             order by s.ord)
        from jsonb_array_elements(r.runbook_at_launch->'steps') with ordinality as s(step, ord)
        left join public.runbook_checks c on c.run_id = r.id and c.step_id = (s.step->>'id')::uuid
    ), '[]'::jsonb));
end
$$;

create or replace function public.check_runbook_step(p_run uuid, p_step uuid, p_note text default null)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
  v_step jsonb;
  v_note text := nullif(btrim(coalesce(p_note, '')), '');
begin
  select * into r from public.failover_runs where id = p_run for update;
  if not found or not public.has_role(r.org_id, 'operator') then
    raise exception 'operator role required' using errcode = 'insufficient_privilege';
  end if;
  select s into v_step from jsonb_array_elements(r.runbook_at_launch->'steps') s
   where s->>'id' = p_step::text;
  if v_step is null then
    raise exception 'step is not in this run''s runbook' using errcode = 'no_data_found';
  end if;
  if not public.run_checklist_open(r) then
    raise exception 'this run''s checklist is closed' using errcode = 'check_violation';
  end if;
  if char_length(coalesce(v_note, '')) > 500 then
    raise exception 'note is limited to 500 characters' using errcode = 'check_violation';
  end if;
  if exists (select 1 from public.runbook_checks c where c.run_id = p_run and c.step_id = p_step) then
    raise exception 'step already checked' using errcode = 'unique_violation';
  end if;

  insert into public.runbook_checks (run_id, step_id, checked_by, note)
  values (p_run, p_step, (select auth.uid()), v_note);
  perform public.append_audit(r.org_id, 'runbook.step_checked', jsonb_build_object(
    'run_id', r.id, 'step_id', p_step, 'title', v_step->>'title', 'phase', v_step->>'phase',
    'note', v_note));
end
$$;

-- ---------------------------------------------------------------------------
-- Evidence report v4: adds the runbook checklist.
-- ---------------------------------------------------------------------------
create or replace function public.drill_evidence(p_run uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
  o public.orgs;
  v_outcome text;
  v_recovery numeric;
  v_rep jsonb;
  v_checklist jsonb;
begin
  select * into r from public.failover_runs where id = p_run;
  if not found or not public.has_role(r.org_id, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  select * into o from public.orgs where id = r.org_id;
  v_outcome := public.run_outcome(r);
  v_recovery := case when v_outcome = 'secured' then 5.5 end;
  v_rep := r.replication_at_launch;
  v_checklist := public.run_checklist(p_run);

  return jsonb_build_object(
    'report_version', 4,
    'generated_at', now(),
    'generated_by', (select u.email from auth.users u where u.id = (select auth.uid())),
    'organization', jsonb_build_object('id', o.id, 'name', o.name),
    'objectives', jsonb_build_object('rto_seconds', o.rto_target_seconds, 'rpo_seconds', o.rpo_target_seconds),
    'run', jsonb_build_object(
      'id', r.id,
      'kind', r.kind,
      'trigger', r.trigger,
      'source_region', r.source_region,
      'target_region', r.target_region,
      'requested_by', (select u.email from auth.users u where u.id = r.requested_by),
      'requested_at', r.requested_at,
      'approved_by', (select u.email from auth.users u where u.id = r.approved_by),
      'approved_at', r.approved_at,
      'aborted_at', r.aborted_at,
      'reset_at', r.reset_at,
      'outcome', v_outcome,
      'two_person_rule_met', case when r.kind = 'drill' then null
                                  else r.approved_by is not null and r.approved_by <> r.requested_by end
    ),
    'timeline', public.drill_timeline(r),
    'results', jsonb_build_object(
      'decision_seconds', case when r.kind = 'failover' and r.approved_at is not null
                               then round(extract(epoch from r.approved_at - r.requested_at)::numeric, 1) end,
      'recovery_seconds', v_recovery,
      'recovery_simulated', true,
      'rto_met', case when v_recovery is not null then v_recovery <= o.rto_target_seconds end,
      'rpo_measured', v_rep->'rpo_met' is not null and v_rep->'rpo_met' <> 'null'::jsonb,
      'rpo_seconds', v_rep->'max_lag_seconds',
      'rpo_met', v_rep->'rpo_met'
    ),
    'replication_at_launch', v_rep,
    'runbook', case when v_checklist is null then null else jsonb_build_object(
      'version', v_checklist->'version',
      'total', jsonb_array_length(v_checklist->'steps'),
      'completed', (select count(*) from jsonb_array_elements(v_checklist->'steps') s where (s->>'done')::boolean),
      'steps', (select coalesce(jsonb_agg(jsonb_build_object(
                  'id', t.s->'id', 'phase', t.s->'phase', 'title', t.s->'title', 'done', t.s->'done',
                  'checked_by', t.s->'checked_by', 'checked_at', t.s->'checked_at', 'note', t.s->'note')
                  order by t.ord), '[]'::jsonb)
                  from jsonb_array_elements(v_checklist->'steps') with ordinality as t(s, ord))) end,
    'audit_entries', coalesce((
      select jsonb_agg(jsonb_build_object(
               'id', a.id, 'at', a.created_at, 'actor', au.email, 'action', a.action, 'hash', a.hash)
             order by a.id)
        from public.audit_log a
        left join auth.users au on au.id = a.actor
       where a.org_id = r.org_id and a.detail->>'run_id' = r.id::text
    ), '[]'::jsonb),
    'chain', public.verify_audit_chain_report(r.org_id)
  );
end
$$;

-- ---------------------------------------------------------------------------
-- Privileges
-- ---------------------------------------------------------------------------
revoke execute on function
  public.capture_runbook_at_launch(),
  public.get_runbook(uuid),
  public.set_runbook(uuid, jsonb),
  public.run_checklist_open(public.failover_runs),
  public.run_checklist(uuid),
  public.check_runbook_step(uuid, uuid, text)
from public, anon, authenticated;
grant execute on function
  public.get_runbook(uuid),
  public.set_runbook(uuid, jsonb),
  public.run_checklist(uuid),
  public.check_runbook_step(uuid, uuid, text)
to authenticated;
