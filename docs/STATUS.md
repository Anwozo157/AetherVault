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

1. **Pitch deck honesty pass:** reword unverified claims (sub-second RPO, eBPF probes, design partners, AWS Marketplace, "Zero-Downtime") as targets/roadmap. Requires founder review of the copy.
2. **Redeploy live site** (`gh-pages` branch). Live site is still the pre-Phase-0 build: it lacks the pitch-deck crash fix, chaos overflow fix, abort, and simulated badge. Needs founder OK.
3. **Phase 2:** keyboard-operable hold-to-confirm, reduced-motion fallback, audio off by default, Playwright E2E, GitHub Actions CI (free for public repos), bundle budget.

## Open decisions for the founder

- Push local `main` to GitHub? (Backup only; does not change the live site.)
- Delete `tsconfig 2.json` (identical duplicate of `tsconfig.json`, not created by an agent)?
- `.claude/launch.json` (untracked, points at port 5173; the app runs on 5174): keep or remove?
- Old duplicate project at `~/Documents/aethervault-command-center`: archive or delete?

## Known issues

- `DEGRADED_STATE` exists in the state machine but is never entered; chaos mode only changes telemetry.
- Hold-to-confirm button is mouse/touch only (no keyboard). Planned for Phase 2.
- Audio is on by default. Planned to default off in Phase 2.
- Share modal QR code uses the free `api.qrserver.com` service (external request).
