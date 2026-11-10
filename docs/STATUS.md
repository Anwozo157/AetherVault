# Project Status

> Living handoff document. **Every agent or contributor updates this at the end of a session.**
> Last updated: 2026-11-09 (landing page) by Claude Code (Opus 5.5).

## Where we are

| Phase           | Scope                                                                         | Status                                                      |
| --------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 0. Foundation   | Strict TS, ESLint/Prettier, compiled Tailwind + brand tokens, docs            | ✅ Done (2026-11-08)                                        |
| 1. Architecture | `DrProvider` interface, feature folders, abort, lazy loading, simulated badge | ✅ Done (2026-11-08)                                        |
| 2. Quality bar  | Playwright E2E, WCAG 2.2 AA, Lighthouse 90+, GitHub Actions CI                | ✅ Done (2026-11-08)                                        |
| 3. Backend MVP  | Free-tier only until funded (see `AGENTS.md` rule 1)                          | 🚧 3.1–3.5, 3.7 done; 3.6 CI done, hosting waits on founder |
| 4. Productize   | Multi-tenant, DR drills, compliance reports                                   | 🚧 Team invites + 4.1 drill evidence reports done           |

Phase 3 milestones (`docs/PHASE_3_PLAN.md`):

| #   | Deliverable                                         | Status                                                                                          |
| --- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 3.1 | ADRs: platform, auth, audit                         | ✅ Accepted                                                                                     |
| 3.2 | Local Supabase + schema + RLS + audit triggers      | ✅ pgTAP                                                                                        |
| 3.3 | Server failover functions                           | ✅ pgTAP                                                                                        |
| 3.4 | `SupabaseDrProvider` + sign-in + approval UI        | ✅ Two-browser E2E                                                                              |
| 3.5 | Audit log UI + hash-chain verification              | ✅ Tamper E2E (a direct database edit is detected in the UI)                                    |
| 3.6 | CI runs Supabase; hosted free project; GitHub OAuth | 🟡 CI done (pgTAP + console E2E on every PR); hosting needs the founder's free Supabase account |
| 3.7 | `docs/SECURITY.md`, deck roadmap                    | ✅ Done                                                                                         |

Details of every change: `CHANGELOG.md`. Full plan: `docs/CONTINUE_BUILD_PROMPT.md`.

## Health (verified 2026-11-09)

- CI on every PR, all green on `main`: lint, types, 160+ unit tests, coverage thresholds, build, bundle budget, production audit · Playwright desktop + mobile, including a Content-Security-Policy check · local Supabase: 96 pgTAP + 10 console E2E · CodeQL · gitleaks full-history secret scan.
- Live site deployed from `main`; `version.json` matches; CSP active; the Share QR always encodes the live version (verified by decoding it).
- GitHub: secret scanning + push protection, private vulnerability reporting, Dependabot alerts + automated security fixes are enabled.
- `npm audit`: 0 vulnerabilities. Toolchain: Vite 8, Vitest 5, React 18.
- Local machine is memory-starved (swap ~5–6 GB): public-demo E2E times out locally but passes on CI. Founder deferred Mac cleanup.

## Next steps (in order)

1. **Founder (free, no card):** create a Supabase account (sign up with GitHub). Then 3.6 hosting: link the project, push migrations, create the GitHub OAuth app, disable password sign-ups, set the console env in the deploy.
2. **Phase 4, free parts:** DR drill scheduler (non-disruptive drills against the simulated provider), Slack/PagerDuty webhook alerts (free tiers). ✅ Done 2026-11-09: team invites/roles + onboarding checklist; 4.1 drill evidence reports (RTO/RPO targets, PASS/FAIL drill history, Print/Save as PDF, SHA-256-fingerprinted JSON; deployed as `89c4e1b`). RPO stays "not measured" until real replication data is connected.
3. **Requires funding (founder approves):** AWS account + Elastic Disaster Recovery for real replication data (~$40–60/mo), Supabase Pro ($25/mo), custom domain (~$1/mo), which also enables HTTP security headers (`frame-ancestors`).

4. **SOC 2 readiness (free):** checklist started in `docs/SOC2_READINESS.md`. Branch protection on `main` enabled 2026-11-09. Founder: FileVault/auto-updates/2FA check. Agent: write the core policy set, risk register, vendor inventory.

5. **Landing page** built (2026-11-09) on `feat/landing-page`: set `CONTACT_EMAIL` in `src/config/site.ts` once a company address exists (pilot buttons appear automatically); add real console screenshots and the NewConnect case study when available.

## Open decisions for the founder

- Approve funds (costs in `docs/PHASE_3_PLAN.md` and the investor market report).
- Pricing assumption in the market report ($3,000/month per customer): confirm, or choose a lower entry tier.
- Seed-round date; document the $4.2B SAM methodology.
- Mac cleanup (deferred).
- `.claude/launch.json` (untracked, port 5173 vs 5174): keep or remove? Old duplicate at `~/Documents/aethervault-command-center`: archive or delete?

## Known issues

- Repo lives at `~/Developer/AetherVault`. Do not move it back into iCloud.
- Local Supabase: analytics, Studio, storage and edge runtime are disabled in `supabase/config.toml` (analytics alone used ~4 CPU cores).
- `DEGRADED_STATE` exists in the state machine but is never entered; chaos mode only changes telemetry.
- Supabase CLI 3.0 is available (repo pins 2.122.0); upgrade as its own tested task.
- Deck cites "MarketsandMarkets, Jan 2026"; the verified press release is dated 14 May 2026 with the same figures. Confirm the report's own publication month.
