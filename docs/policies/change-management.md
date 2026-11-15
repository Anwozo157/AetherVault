# Change Management Policy

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly

## Scope

Application code, database schema, infrastructure-as-code (Terraform), CI configuration, hosted
service settings (Supabase, Cloudflare, GitHub), and production deploys.

## Rules

1. **Everything through git.** Changes are made on a branch (`feat/…`, `fix/…`, `docs/…`, …) with
   Conventional Commits. Database changes are migrations in `supabase/migrations/` only; nobody
   edits the production schema by hand.
2. **Tested before it lands.** `npm run verify` (lint, types, unit tests, build, bundle budget)
   passes before every commit; database changes also pass `npm run db:test`. Tests are re-run
   immediately before any merge or push.
3. **Protected main.** `main` requires the CI and CodeQL checks to pass; force pushes and deletion
   are blocked. Merges use `--no-ff` so each change is traceable.
4. **Review.** Every change is reviewed before merge. With one engineer, the compensating controls
   are: required CI checks (tests, coverage, E2E, CSP, pgTAP, CodeQL, secret scan), AI-assisted
   review of the diff, and the founder's approval to push. When a second engineer joins, a human
   pull-request approval becomes required and admin bypass is removed.
5. **Deploys are authorized.** Production deploys (`npm run deploy`) are run or explicitly
   approved by the founder. The deploy script refuses builds that point at a local database.
6. **Documented.** Each change is described in `CHANGELOG.md`; structural changes update
   `docs/ARCHITECTURE.md`; security-relevant changes update `docs/SECURITY.md`.
7. **Hosted settings.** Changes to dashboard settings (auth, DNS, email, branch protection) are
   recorded in `CHANGELOG.md` or `docs/STATUS.md` with the date and reason, and mirrored in config
   files where possible (`supabase/config.toml`).
8. **Emergency changes** may skip the normal order only to stop an active incident. They are
   recorded in the incident report and reviewed (and tested) within 2 business days.
9. **Rollback.** Every deploy can be rolled back by redeploying an earlier commit; migrations are
   written so a failure leaves nothing half-applied.

## Evidence

Git history, pull requests, GitHub Actions runs, branch protection settings, `CHANGELOG.md`.
