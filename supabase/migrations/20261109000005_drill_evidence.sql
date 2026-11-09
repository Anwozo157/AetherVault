-- AetherVault Phase 4.1: recovery objectives and drill evidence reports.
--
-- Aligns with AWS Well-Architected Reliability:
-- * REL13-BP01 "define a Recovery Time Objective (RTO) and Recovery Point Objective (RPO)
--   for each workload" -> per-organization targets, set by admins, audited.
-- * REL13-BP03 "Regularly test failover ... verify ... that RTO and RPO are met" -> every
--   failover run produces an evidence record: who requested and approved, the stage
--   timeline, achieved recovery time vs target, related audit entries, and the audit
--   chain status at the time the report was generated.

alter table public.orgs
  add column rto_target_seconds int not null default 900 check (rto_target_seconds between 1 and 604800),
  add column rpo_target_seconds int not null default 60 check (rpo_target_seconds between 0 and 604800);

create or replace function public.set_recovery_objectives(p_org uuid, p_rto int, p_rpo int)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if p_rto is null or p_rto < 1 or p_rto > 604800 or p_rpo is null or p_rpo < 0 or p_rpo > 604800 then
    raise exception 'objectives must be between 0 seconds and 7 days' using errcode = 'check_violation';
  end if;
  update public.orgs set rto_target_seconds = p_rto, rpo_target_seconds = p_rpo where id = p_org;
  perform public.append_audit(p_org, 'org.objectives_set', jsonb_build_object('rto_seconds', p_rto, 'rpo_seconds', p_rpo));
end
$$;

-- Outcome of a run, from its timestamps (mirrors run_stage).
create or replace function public.run_outcome(run public.failover_runs, at_time timestamptz default now())
returns text
language sql
stable
set search_path = ''
as $$
  select case
    when run.aborted_at is not null and run.approved_at is null then 'withdrawn'
    when run.aborted_at is not null then 'aborted'
    when run.approved_at is null then 'pending'
    when at_time < run.approved_at + interval '5.5 seconds' then 'in_progress'
    else 'secured'
  end
$$;

create or replace function public.list_failover_runs(p_org uuid, p_limit int default 50)
returns table (
  id uuid, source_region text, target_region text,
  requested_by_email text, requested_at timestamptz,
  approved_by_email text, approved_at timestamptz,
  aborted_at timestamptz, reset_at timestamptz,
  outcome text, recovery_seconds numeric, rto_target_seconds int
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
    select r.id, r.source_region, r.target_region,
           ru.email::text, r.requested_at,
           au.email::text, r.approved_at,
           r.aborted_at, r.reset_at,
           public.run_outcome(r),
           case when public.run_outcome(r) = 'secured' then 5.5 end,
           o.rto_target_seconds
      from public.failover_runs r
      join public.orgs o on o.id = r.org_id
      left join auth.users ru on ru.id = r.requested_by
      left join auth.users au on au.id = r.approved_by
     where r.org_id = p_org
     order by r.requested_at desc
     limit least(greatest(p_limit, 1), 200);
end
$$;

-- Full evidence record for one run.
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
begin
  select * into r from public.failover_runs where id = p_run;
  if not found or not public.has_role(r.org_id, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;
  select * into o from public.orgs where id = r.org_id;
  v_outcome := public.run_outcome(r);
  -- Recovery time measured from approval to target secured (stage model, ADR 0003).
  v_recovery := case when v_outcome = 'secured' then 5.5 end;

  return jsonb_build_object(
    'report_version', 1,
    'generated_at', now(),
    'generated_by', (select u.email from auth.users u where u.id = (select auth.uid())),
    'organization', jsonb_build_object('id', o.id, 'name', o.name),
    'objectives', jsonb_build_object('rto_seconds', o.rto_target_seconds, 'rpo_seconds', o.rpo_target_seconds),
    'run', jsonb_build_object(
      'id', r.id,
      'source_region', r.source_region,
      'target_region', r.target_region,
      'requested_by', (select u.email from auth.users u where u.id = r.requested_by),
      'requested_at', r.requested_at,
      'approved_by', (select u.email from auth.users u where u.id = r.approved_by),
      'approved_at', r.approved_at,
      'aborted_at', r.aborted_at,
      'reset_at', r.reset_at,
      'outcome', v_outcome,
      'two_person_rule_met', r.approved_by is not null and r.approved_by <> r.requested_by
    ),
    'timeline', case when r.approved_at is null then '[]'::jsonb else jsonb_build_array(
      jsonb_build_object('stage', 'QUIESCE_AND_SNAPSHOT', 'at', r.approved_at),
      jsonb_build_object('stage', 'HYDRATING_TARGET', 'at', r.approved_at + interval '1.2 seconds'),
      jsonb_build_object('stage', 'DNS_CUTOVER', 'at', r.approved_at + interval '3.5 seconds'),
      jsonb_build_object('stage', 'TARGET_SECURED', 'at', r.approved_at + interval '5.5 seconds')
    ) end,
    'results', jsonb_build_object(
      'decision_seconds', case when r.approved_at is not null then round(extract(epoch from r.approved_at - r.requested_at)::numeric, 1) end,
      'recovery_seconds', v_recovery,
      'rto_met', case when v_recovery is not null then v_recovery <= o.rto_target_seconds end,
      'rpo_measured', false
    ),
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

revoke execute on function
  public.set_recovery_objectives(uuid, int, int),
  public.run_outcome(public.failover_runs, timestamptz),
  public.list_failover_runs(uuid, int),
  public.drill_evidence(uuid)
from public, anon;
grant execute on function
  public.set_recovery_objectives(uuid, int, int),
  public.list_failover_runs(uuid, int),
  public.drill_evidence(uuid)
to authenticated;
