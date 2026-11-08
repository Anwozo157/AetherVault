-- LOCAL DEVELOPMENT ONLY. Runs on `npm run db:reset` against the local Docker database.
-- Never run against a hosted project: these accounts have a published password.
--
-- Demo organization with one user per role. Password for all: aether-demo-local
--   admin@aethervault.local     admin
--   operator@aethervault.local  operator   (requests failovers)
--   approver@aethervault.local  approver   (approves someone else's request)
--   viewer@aethervault.local    viewer     (read-only)

do $$
declare
  v_org uuid := 'd0000000-0000-0000-0000-000000000001';
  v_users jsonb := '[
    {"id": "d1000000-0000-0000-0000-000000000001", "email": "admin@aethervault.local",    "role": "admin"},
    {"id": "d1000000-0000-0000-0000-000000000002", "email": "operator@aethervault.local", "role": "operator"},
    {"id": "d1000000-0000-0000-0000-000000000003", "email": "approver@aethervault.local", "role": "approver"},
    {"id": "d1000000-0000-0000-0000-000000000004", "email": "viewer@aethervault.local",   "role": "viewer"}
  ]';
  u jsonb;
begin
  for u in select * from jsonb_array_elements(v_users) loop
    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
      raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
      confirmation_token, recovery_token, email_change_token_new, email_change
    ) values (
      '00000000-0000-0000-0000-000000000000', (u->>'id')::uuid, 'authenticated', 'authenticated',
      u->>'email', extensions.crypt('aether-demo-local', extensions.gen_salt('bf')), now(),
      '{"provider": "email", "providers": ["email"]}', '{}', now(), now(), '', '', '', ''
    );
    insert into auth.identities (
      id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(), (u->>'id')::uuid, u->>'id', 'email',
      jsonb_build_object('sub', u->>'id', 'email', u->>'email', 'email_verified', true),
      now(), now(), now()
    );
  end loop;

  insert into public.orgs (id, name) values (v_org, 'Aegis Demo Org');
  insert into public.memberships (org_id, user_id, role)
  select v_org, (m->>'id')::uuid, (m->>'role')::public.app_role
    from jsonb_array_elements(v_users) m;
  perform public.append_audit(v_org, 'org.created', '{"name": "Aegis Demo Org", "seed": true}');
end
$$;
