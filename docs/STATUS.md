# Project Status

> Living handoff document. **Every agent or contributor updates this at the end of a session.**
> Last updated: 2026-11-08 by Claude Code (Opus 5.5).

## Where we are

| Phase           | Scope                                                                         | Status               |
| --------------- | ----------------------------------------------------------------------------- | -------------------- |
| 0. Foundation   | Strict TS, ESLint/Prettier, compiled Tailwind + brand tokens, docs            | ✅ Done (2026-11-08) |
| 1. Architecture | `DrProvider` interface, feature folders, abort, lazy loading, simulated badge | ✅ Done (2026-11-08) |
| 2. Quality bar  | Playwright E2E, WCAG 2.2 AA, Lighthouse 90+, GitHub Actions CI                | ⏭️ Next              |
| 3. Backend MVP  | Free-tier only until funded (see `AGENTS.md` rule 1)                          | Not started          |
| 4. Productize   | Multi-tenant, DR drills, compliance reports                                   | Not started          |

Details of every change: `CHANGELOG.md`. Full plan: `docs/CONTINUE_BUILD_PROMPT.md`.

## Health (as of last update)

- `npm run lint`, `npm run typecheck`, `npm test` (25 tests), `npm run build`: all passing.
- Initial JS bundle 293 kB (95 kB gzip); 3D globe chunk loads lazily.
- Verified in headless Chrome: home, hold-to-failover, abort, AWS DRS tab, investor deck.

## Next steps (in order)

1. ✅ Pitch deck accuracy pass done (2026-11-08): all statistics cited (EMA 2024, ITIC 2024, Uptime 2025, Flexera 2026, MarketsandMarkets Jan 2026); founder bio grounded in master resume; pilots targeted March 2027. Open: seed-round date still TBD; $4.2B SAM is an internal estimate (document the methodology).
2. **Redeploy live site** (`gh-pages` branch). Live site is still the pre-Phase-0 build: it lacks the pitch-deck crash fix, chaos overflow fix, abort, and simulated badge. Needs founder OK.
3. **Phase 2:** keyboard-operable hold-to-confirm, reduced-motion fallback, audio off by default, Playwright E2E, GitHub Actions CI (free for public repos), bundle budget.

## Open decisions for the founder

- Approve `docs/PHASE_3_PLAN.md` (Supabase recommended).
- Move the repo out of iCloud-synced `~/Documents` (iCloud is creating " 2" conflict copies, including `.git/index 2`). Suggested: `~/Developer/AetherVault`.
- Dependabot opened 9 PRs; majors (Vitest 5, plugin-react 6, framer-motion 14, jest-dom 7) need a planned upgrade; Vitest 5 and plugin-react 6 fail CI as expected (need Vite 6+).

- Push local `main` to GitHub? (Backup only; does not change the live site.)
- Delete `tsconfig 2.json` (identical duplicate of `tsconfig.json`, not created by an agent)?
- `.claude/launch.json` (untracked, points at port 5173; the app runs on 5174): keep or remove?
- Old duplicate project at `~/Documents/aethervault-command-center`: archive or delete?

## Known issues

- Dev-only dependency advisories (Vite 5, Vitest 2) need major upgrades: do as a dedicated, tested task.

- `DEGRADED_STATE` exists in the state machine but is never entered; chaos mode only changes telemetry.
- Share modal QR code uses the free `api.qrserver.com` service (external request).
