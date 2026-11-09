# Project Status

> Living handoff document. **Every agent or contributor updates this at the end of a session.**
> Last updated: 2026-11-08 (evening) by Claude Code (Opus 5.5).

## Where we are

| Phase           | Scope                                                                         | Status               |
| --------------- | ----------------------------------------------------------------------------- | -------------------- |
| 0. Foundation   | Strict TS, ESLint/Prettier, compiled Tailwind + brand tokens, docs            | ✅ Done (2026-11-08) |
| 1. Architecture | `DrProvider` interface, feature folders, abort, lazy loading, simulated badge | ✅ Done (2026-11-08) |
| 2. Quality bar  | Playwright E2E, WCAG 2.2 AA, Lighthouse 90+, GitHub Actions CI                | ✅ Done (2026-11-08) |
| 3. Backend MVP  | Free-tier only until funded (see `AGENTS.md` rule 1)                          | 🚧 3.1–3.4 done      |
| 4. Productize   | Multi-tenant, DR drills, compliance reports                                   | Not started          |

Phase 3 milestones (`docs/PHASE_3_PLAN.md`):

| #   | Deliverable                                         | Status                                            |
| --- | --------------------------------------------------- | ------------------------------------------------- |
| 3.1 | ADRs: platform, auth, audit                         | ✅ Accepted                                       |
| 3.2 | Local Supabase + schema + RLS + audit triggers      | ✅ pgTAP                                          |
| 3.3 | Server failover functions                           | ✅ pgTAP                                          |
| 3.4 | `SupabaseDrProvider` + sign-in + approval UI        | ✅ Two-browser E2E passes (`npm run e2e:console`) |
| 3.5 | Audit log UI + hash-chain verification              | Next                                              |
| 3.6 | CI runs Supabase; hosted free project; GitHub OAuth | Needs founder: free Supabase account (no card)    |
| 3.7 | `docs/SECURITY.md`, deck roadmap                    | Not started                                       |

Details of every change: `CHANGELOG.md`. Full plan: `docs/CONTINUE_BUILD_PROMPT.md`.

## Health (verified 2026-11-08)

- Unit/component: 94 tests passing; coverage above all thresholds (~95% lines overall).
- Database: 50 pgTAP tests passing (local Supabase, Postgres 17).
- Console E2E (`npm run e2e:console`): 6/6, passed 4 runs in a row (two real browsers: request → approve → secured → reset).
- Public-demo E2E: 20/20 on GitHub CI (desktop + mobile). Locally they time out while the Mac is memory-starved (swap ~6 GB); rerun after cleanup.
- `npm audit`: 0 vulnerabilities. Toolchain: Vite 8, Vitest 5, React 18.
- Initial JS 100 kB gzip (budget 120 kB); supabase-js loads only on `#/console`.
- Live site (GitHub Pages) shows the public simulated demo; no app changes for it since the last deploy except the toolchain (redeploy optional).

## Next steps (in order)

1. **Phase 3.5:** audit log view in the console (filter, actor, time) + "Verify chain" button calling `verify_audit_chain()`; E2E proves a tampered row is detected.
2. **Phase 3.6:** add Supabase to CI (`supabase start` in GitHub Actions, free) so `db:test` and `e2e:console` run on every PR; founder creates a free Supabase project (no card); GitHub OAuth app; disable password sign-ups on hosted.
3. **Phase 3.7:** `docs/SECURITY.md` threat model + data-flow diagram; update the deck roadmap slide.

## Open decisions for the founder

- Mac cleanup (deferred by founder): local tests are slow/flaky until memory pressure drops.
- Seed-round date still TBD; document the $4.2B SAM methodology.
- `.claude/launch.json` (untracked, points at port 5173; the app runs on 5174): keep or remove?
- Old duplicate project at `~/Documents/aethervault-command-center`: archive or delete?

## Known issues

- Repo lives at `~/Developer/AetherVault`. Do not move it back into iCloud.
- Local Supabase: analytics, Studio, storage and edge runtime are disabled in `supabase/config.toml` (analytics alone used ~4 CPU cores). Re-enable Studio temporarily if you need the web dashboard.
- `DEGRADED_STATE` exists in the state machine but is never entered; chaos mode only changes telemetry.
- Supabase CLI 3.0 is available (repo pins 2.122.0); upgrade as its own tested task.
