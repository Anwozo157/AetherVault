# Phase 3 Plan: Backend MVP ($0, free tier)

> Status: **Proposed, awaiting founder approval** (2026-11-08).
> Constraint: `AGENTS.md` rule 1, no spend and nothing that can bill without a card.

## Goal

Turn the demo into a real multi-user product **without** paid cloud accounts:

- People **sign in** and get a **role** (Viewer, Operator, Approver, Admin).
- The failover state machine runs **on the server**, so everyone watching sees the same run live.
- Every action is written to a **tamper-resistant audit log**.
- Starting a failover needs **two-person approval** (Operator requests, a different Approver approves).

The public demo stays exactly as it is (simulated, no login). The real backend lives behind a
"Sign in" path. This proves the `DrProvider` design: a second provider, zero UI rewrites.

**Out of scope until funded:** live AWS Elastic Disaster Recovery data (AWS requires a card),
custom domain, paid uptime (free projects pause), SOC 2 tooling.

## Platform decision (recommended: Supabase Free)

| Need                     | Supabase Free                                         | Cloudflare Workers Free      | Firebase Spark           |
| ------------------------ | ----------------------------------------------------- | ---------------------------- | ------------------------ |
| Card required            | No                                                    | No                           | No                       |
| Database                 | Postgres (500 MB)                                     | D1 SQLite                    | Firestore                |
| Auth + roles             | Built in; row-level security enforces roles in the DB | Build yourself               | Built in; rules language |
| Live updates to browsers | Realtime built in                                     | Durable Objects (extra work) | Built in                 |
| Append-only audit log    | Postgres triggers                                     | Manual                       | Rules (weaker)           |
| Local dev + CI testing   | `supabase start` (Docker)                             | Wrangler                     | Emulators                |
| Free-tier catch          | Pauses after 7 days idle; 2 projects                  | 100k requests/day            | Daily read/write caps    |

**Why Supabase:** auth, database, permissions, realtime and audit in one free service, enforced
inside Postgres (row-level security) rather than in app code. Enterprise buyers recognize
Postgres + RLS. The pause-when-idle catch is fine for demos and pilots; un-pausing is one click.

## Design

### Server-authoritative failover without a long-running server

Free tiers have no always-on server, so the stage is **derived from timestamps**:

```
failover_runs: id, org_id, source, target, requested_by, approved_by,
               approved_at, aborted_at, reset_at
stage = f(now() - approved_at) unless aborted_at/reset_at is set
```

The same `ALLOWED_TRANSITIONS` rules from `src/domain/dr.ts` are mirrored in a Postgres
function, so the browser and server can't disagree. Abort is rejected by the database once
cutover starts.

### Data model (migrations in `supabase/migrations/`)

- `orgs`, `memberships(user_id, org_id, role)`: roles `viewer | operator | approver | admin`
- `failover_runs` as above
- `audit_log(id, org_id, actor, action, detail, created_at)`: insert-only. A trigger blocks
  UPDATE and DELETE, and each row stores a hash of the previous row (tamper-evident chain).

### Permissions (row-level security)

| Action                         | Viewer | Operator | Approver | Admin |
| ------------------------------ | ------ | -------- | -------- | ----- |
| Watch runs and logs            | ✅     | ✅       | ✅       | ✅    |
| Request failover / abort       |        | ✅       | ✅       | ✅    |
| Approve someone else's request |        |          | ✅       | ✅    |
| Manage members and roles       |        |          |          | ✅    |

### Frontend

- `SupabaseDrProvider` implements `DrProvider`; `createDefaultProvider()` picks it on the
  signed-in route and `MockDrProvider` everywhere else. Header badge switches from
  **SIMULATED DATA** to the org name.
- New UI: sign-in (GitHub or email magic link), pending-approval banner, audit log view.
- Telemetry (lag, throughput) stays simulated on the server until real AWS data is funded,
  still labeled simulated.

### Security

- Only the public "anon" key ships to browsers (safe by design; RLS protects data). The
  service-role key lives in Supabase secrets only, never in git.
- Input validation with `zod`; Content-Security-Policy meta tag; Supabase auth rate limits.
- Threat model and data-flow diagram in `docs/SECURITY.md`.

## Milestones (each one merges green, with docs)

| #   | Deliverable                                                    | Done when                                                      |
| --- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| 3.1 | ADRs: platform, auth, audit design (`docs/adr/`)               | Founder approves                                               |
| 3.2 | Local Supabase + schema + RLS + audit triggers                 | RLS tests prove each role's allowed and denied actions         |
| 3.3 | Server failover functions (request, approve, abort, reset)     | Tests cover two-person rule, abort window, invalid transitions |
| 3.4 | `SupabaseDrProvider` + sign-in + approval UI                   | E2E: two browser users complete an approved failover live      |
| 3.5 | Audit log UI + hash-chain verification                         | E2E: log shows every action; tamper check passes               |
| 3.6 | CI runs Supabase locally for tests; deploy hosted free project | CI green; hosted demo login works                              |
| 3.7 | `docs/SECURITY.md`, updated architecture, deck roadmap         | Docs reviewed                                                  |

## What the founder needs to do

1. **Approve this plan** (or pick Cloudflare/Firebase instead).
2. **Create a free Supabase account** (sign up with GitHub, no card) when we reach 3.6.
   Everything before that runs locally.
3. **Install Docker Desktop** (free for personal use and small businesses) for the local database.

## Costs once funded (founder decides when; stays $0 until then)

Estimates checked 2026-11-08 against published pricing; re-check before purchase.

| Item                                                    | Purpose                                | Est. monthly                                                                        |
| ------------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- |
| Supabase Pro                                            | No pausing, daily backups, 100K MAU    | $25 (includes $10 compute credit)                                                   |
| AWS Elastic Disaster Recovery, 1–2 small source servers | Real replication data for demos/pilots | ~$40–60 ($0.028/server-hour ≈ $20/server + staging EBS, replication EC2, snapshots) |
| Custom domain                                           | Professional URL                       | ~$1 ($10–15/yr)                                                                     |
| GitHub, Pages, Actions, CodeQL                          | Hosting + CI                           | $0 (public repo)                                                                    |
| **Starting total**                                      |                                        | **~$65–90**                                                                         |

Later: Supabase Team tier (much higher), SOC 2 tooling (thousands/yr) only when customers require it.
**On day one of any AWS account: create an AWS Budgets alert (e.g. $50).**

## Risks

- Free project pauses after 7 idle days: before demos, open the dashboard to wake it.
- Docker Desktop's free license covers companies under 250 employees and $10M revenue.
- Supabase free-tier terms can change; re-check before relying on limits.
