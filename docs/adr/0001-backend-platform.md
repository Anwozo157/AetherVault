# 0001. Backend platform: Supabase free tier

- Status: Proposed (2026-11-08)
- Deciders: Founder; Claude Code (drafted)

## Context

AetherVault needs sign-in, roles, shared live state, and an audit log. Constraint: **$0 spend and
no card on file** until the founder decides to fund (`AGENTS.md` rule 1). The frontend stays on
GitHub Pages. No always-on server is available on free tiers.

## Options

1. **Supabase Free**: Postgres, Auth, row-level security (RLS), Realtime, Edge Functions. No card.
   Pauses after 7 idle days; 500 MB DB; 2 projects.
2. **Cloudflare Workers Free + D1**: generous requests, but auth/roles and realtime must be built.
3. **Firebase Spark**: auth + realtime built in; permissions via rules language; NoSQL data model.

## Decision

Use **Supabase Free**. Authorization is enforced in Postgres via RLS, so it cannot be bypassed
by a client bug; Postgres + RLS is familiar to enterprise security reviewers; one service covers
every Phase 3 need; local development and CI use `supabase start` (Docker), free.

## Consequences

- Free project pauses when idle: wake it before demos. Upgrading to Pro ($25/mo) removes this.
- Vendor coupling is limited: data is plain Postgres; the UI depends only on `DrProvider`.
- Requires Docker Desktop locally (installed; v20.10, may need updating for the Supabase CLI).
