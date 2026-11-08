# 0002. Auth and role-based access with row-level security

- Status: Accepted (2026-11-08, approved by founder)

## Context

Enterprise DR tools must restrict who can trigger a failover and prove who did what.

## Decision

- Sign-in with **GitHub OAuth** and **email magic link** (no passwords to store).
- Roles per organization: `viewer`, `operator`, `approver`, `admin` in a `memberships` table.
- Every table has **RLS policies**; the browser holds only the public anon key. The service-role
  key exists only in Supabase secrets, never in git or the browser.
- Role checks live in SQL functions shared by policies, so each rule is written once.

| Action                           | Viewer | Operator | Approver | Admin |
| -------------------------------- | ------ | -------- | -------- | ----- |
| Watch runs and logs              | ✅     | ✅       | ✅       | ✅    |
| Request failover / abort         |        | ✅       | ✅       | ✅    |
| Approve another person's request |        |          | ✅       | ✅    |
| Manage members and roles         |        |          |          | ✅    |

## Consequences

- Each policy needs automated allow **and** deny tests (pgTAP or SQL tests in CI).
- The public demo remains login-free and simulated.

## Amendment (2026-11-08, Phase 3.4)

- **Implemented:** email magic link. **Password sign-in exists only against the local Docker
  database** (seeded demo accounts in `supabase/seed.sql`, used by `npm run e2e:console`); the
  console hides it for any non-local backend.
- **Deferred to 3.6:** GitHub OAuth (needs an OAuth app registered against the hosted project).
  When the hosted project is created, disable password sign-ups in its Auth settings.
