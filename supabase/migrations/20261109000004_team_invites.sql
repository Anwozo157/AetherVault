-- AetherVault: team management and email invites.
--
-- Flow: an admin invites an email address with a role. When a person signs in with that
-- (verified) email, accept_pending_invites() adds them to every organization that invited
-- them. Every step is written to the audit log.
--
-- Rules enforced here (not in the UI):
-- * only admins invite, revoke, change roles or remove members
-- * admins cannot remove or demote themselves, so an organization always keeps an admin
-- * invites are accepted only for the signed-in user's own, verified email

create table public.org_invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.orgs (id) on delete cascade,
  email text not null check (email = lower(email) and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 254),
  role public.app_role not null default 'viewer',
  invited_by uuid not null references auth.users (id),
  created_at timestamptz not null default now(),
  accepted_at timestamptz,
  accepted_by uuid references auth.users (id),
  revoked_at timestamptz,
  constraint accept_fields_together check ((accepted_at is null) = (accepted_by is null))
);
-- At most one open invite per email per organization.
create unique index org_invites_one_open
  on public.org_invites (org_id, email)
  where accepted_at is null and revoked_at is null;
create index org_invites_email_idx on public.org_invites (email) where accepted_at is null and revoked_at is null;

alter table public.org_invites enable row level security;
create policy "admins read invites" on public.org_invites
  for select to authenticated using (public.has_role(org_id, 'admin'));
revoke all on public.org_invites from anon, authenticated;
grant select on public.org_invites to authenticated;

-- ---------------------------------------------------------------------------

create or replace function public.invite_member(p_org uuid, p_email text, p_role public.app_role)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text := lower(trim(p_email));
  v_id uuid;
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or char_length(v_email) > 254 then
    raise exception 'enter a valid email address' using errcode = 'check_violation';
  end if;
  if exists (
    select 1 from public.memberships m join auth.users u on u.id = m.user_id
     where m.org_id = p_org and lower(u.email) = v_email
  ) then
    raise exception 'that person is already a member' using errcode = 'unique_violation';
  end if;
  -- Re-inviting replaces the open invite (e.g. to change the role).
  update public.org_invites set revoked_at = now()
   where org_id = p_org and email = v_email and accepted_at is null and revoked_at is null;
  insert into public.org_invites (org_id, email, role, invited_by)
  values (p_org, v_email, p_role, (select auth.uid()))
  returning id into v_id;
  perform public.append_audit(p_org, 'member.invited', jsonb_build_object('email', v_email, 'role', p_role));
  return v_id;
end
$$;

create or replace function public.revoke_invite(p_invite uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  i public.org_invites;
begin
  select * into i from public.org_invites where id = p_invite for update;
  if not found or not public.has_role(i.org_id, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if i.accepted_at is not null or i.revoked_at is not null then
    raise exception 'invite is no longer open' using errcode = 'check_violation';
  end if;
  update public.org_invites set revoked_at = now() where id = p_invite;
  perform public.append_audit(i.org_id, 'member.invite_revoked', jsonb_build_object('email', i.email));
end
$$;

-- Called after sign-in. Joins every organization that invited this verified email.
create or replace function public.accept_pending_invites()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_email text;
  i public.org_invites;
  n int := 0;
begin
  if v_uid is null then
    raise exception 'sign in required' using errcode = 'insufficient_privilege';
  end if;
  select lower(u.email) into v_email from auth.users u
   where u.id = v_uid and u.email_confirmed_at is not null;
  if v_email is null then
    return 0; -- unverified email: never accept
  end if;
  for i in
    select * from public.org_invites
     where email = v_email and accepted_at is null and revoked_at is null
     for update
  loop
    insert into public.memberships (org_id, user_id, role) values (i.org_id, v_uid, i.role)
    on conflict (org_id, user_id) do nothing;
    update public.org_invites set accepted_at = now(), accepted_by = v_uid where id = i.id;
    perform public.append_audit(i.org_id, 'member.joined', jsonb_build_object('email', v_email, 'role', i.role));
    n := n + 1;
  end loop;
  return n;
end
$$;

create or replace function public.remove_member(p_org uuid, p_user uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_email text;
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  if p_user = (select auth.uid()) then
    raise exception 'admins cannot remove themselves' using errcode = 'check_violation';
  end if;
  select u.email into v_email from auth.users u where u.id = p_user;
  delete from public.memberships where org_id = p_org and user_id = p_user;
  if not found then
    raise exception 'not a member of this organization' using errcode = 'no_data_found';
  end if;
  perform public.append_audit(p_org, 'member.removed', jsonb_build_object('email', v_email));
end
$$;

-- Members with emails (any member may see who is in their organization).
create or replace function public.list_org_members(p_org uuid)
returns table (user_id uuid, email text, role public.app_role, joined_at timestamptz)
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
    select m.user_id, u.email::text, m.role, m.created_at
      from public.memberships m join auth.users u on u.id = m.user_id
     where m.org_id = p_org
     order by m.role desc, u.email;
end
$$;

-- Open invites (admins only).
create or replace function public.list_org_invites(p_org uuid)
returns table (id uuid, email text, role public.app_role, invited_by_email text, created_at timestamptz)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.has_role(p_org, 'admin') then
    raise exception 'admin role required' using errcode = 'insufficient_privilege';
  end if;
  return query
    select i.id, i.email, i.role, u.email::text, i.created_at
      from public.org_invites i left join auth.users u on u.id = i.invited_by
     where i.org_id = p_org and i.accepted_at is null and i.revoked_at is null
     order by i.created_at desc;
end
$$;

revoke execute on function
  public.invite_member(uuid, text, public.app_role),
  public.revoke_invite(uuid),
  public.accept_pending_invites(),
  public.remove_member(uuid, uuid),
  public.list_org_members(uuid),
  public.list_org_invites(uuid)
from public, anon;
grant execute on function
  public.invite_member(uuid, text, public.app_role),
  public.revoke_invite(uuid),
  public.accept_pending_invites(),
  public.remove_member(uuid, uuid),
  public.list_org_members(uuid),
  public.list_org_invites(uuid)
to authenticated;
