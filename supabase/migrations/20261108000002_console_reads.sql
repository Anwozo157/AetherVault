-- AetherVault Phase 3.4: read functions for the signed-in console.
--
-- * get_failover_status: the organization's current run plus the server clock, so every
--   browser derives the same stage from approved_at (ADR 0003) regardless of local clock skew.
-- * org_audit_feed: recent audit entries with the actor's email. auth.users is not readable
--   by clients, so names are resolved here, for members only.

create or replace function public.get_failover_status(p_org uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  r public.failover_runs;
begin
  if not public.has_role(p_org, 'viewer') then
    raise exception 'not a member of this organization' using errcode = 'insufficient_privilege';
  end if;

  -- The open run if there is one (at most one, by unique index), else nothing.
  select * into r
    from public.failover_runs f
   where f.org_id = p_org and f.aborted_at is null and f.reset_at is null
   limit 1;

  return jsonb_build_object(
    'server_now', now(),
    'run', case when r.id is null then null else jsonb_build_object(
      'id', r.id,
      'source_region', r.source_region,
      'target_region', r.target_region,
      'requested_by', r.requested_by,
      'requested_by_email', (select u.email from auth.users u where u.id = r.requested_by),
      'requested_at', r.requested_at,
      'approved_by', r.approved_by,
      'approved_by_email', (select u.email from auth.users u where u.id = r.approved_by),
      'approved_at', r.approved_at,
      'stage', public.run_stage(r)
    ) end
  );
end
$$;

create or replace function public.org_audit_feed(p_org uuid, p_limit int default 50)
returns table (
  id bigint,
  actor_email text,
  action text,
  detail jsonb,
  created_at timestamptz
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
    select a.id, u.email::text, a.action, a.detail, a.created_at
      from public.audit_log a
      left join auth.users u on u.id = a.actor
     where a.org_id = p_org
     order by a.id desc
     limit least(greatest(p_limit, 1), 200);
end
$$;

revoke execute on function public.get_failover_status(uuid) from public, anon;
revoke execute on function public.org_audit_feed(uuid, int) from public, anon;
grant execute on function public.get_failover_status(uuid) to authenticated;
grant execute on function public.org_audit_feed(uuid, int) to authenticated;
