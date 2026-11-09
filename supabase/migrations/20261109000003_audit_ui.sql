-- AetherVault Phase 3.5: audit log screen + chain verification report.
--
-- * audit_log_page: newest-first page of entries with actor email and chain hashes,
--   keyset-paginated by id (stable under concurrent inserts).
-- * verify_audit_chain_report: same check as verify_audit_chain, plus how many entries
--   were checked and the newest hash, so the UI can show "N entries verified".

create or replace function public.audit_log_page(
  p_org uuid,
  p_limit int default 100,
  p_before bigint default null
)
returns table (
  id bigint,
  actor_email text,
  action text,
  detail jsonb,
  created_at timestamptz,
  prev_hash text,
  hash text
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
    select a.id, u.email::text, a.action, a.detail, a.created_at, a.prev_hash, a.hash
      from public.audit_log a
      left join auth.users u on u.id = a.actor
     where a.org_id = p_org
       and (p_before is null or a.id < p_before)
     order by a.id desc
     limit least(greatest(p_limit, 1), 500);
end
$$;

create or replace function public.verify_audit_chain_report(p_org uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_broken bigint;
  v_checked bigint;
  v_head text;
begin
  -- verify_audit_chain enforces membership and raises for non-members.
  v_broken := public.verify_audit_chain(p_org);
  select count(*), (select a2.hash from public.audit_log a2 where a2.org_id = p_org order by a2.id desc limit 1)
    into v_checked, v_head
    from public.audit_log a where a.org_id = p_org;
  return jsonb_build_object(
    'ok', v_broken is null,
    'broken_id', v_broken,
    'checked', v_checked,
    'head_hash', v_head,
    'verified_at', now()
  );
end
$$;

revoke execute on function public.audit_log_page(uuid, int, bigint) from public, anon;
revoke execute on function public.verify_audit_chain_report(uuid) from public, anon;
grant execute on function public.audit_log_page(uuid, int, bigint) to authenticated;
grant execute on function public.verify_audit_chain_report(uuid) to authenticated;
