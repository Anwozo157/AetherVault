# Changelog

All notable changes to AetherVault are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Phase 2c: Continuous integration (2026-11-08)

#### Added

- GitHub Actions CI (`.github/workflows/ci.yml`) on every push to `main` and every pull request: lint, typecheck, unit tests with coverage thresholds, build, bundle budget, production dependency audit, and the Playwright suite (desktop + mobile). Failure uploads the Playwright report.
- CodeQL security scanning on pushes, PRs, and weekly.
- Dependabot weekly updates for npm (minor/patch grouped) and GitHub Actions.
- Bundle budget (`scripts/check-bundle-size.mjs`): initial JS must stay ≤ 120 kB gzip (currently 93 kB); part of `npm run verify`.
- `.npmrc` with `legacy-peer-deps=true` so `npm ci` works identically locally and in CI.

#### Changed

- Security: Playwright → 1.64.1 (pinned; fixes high-severity advisory), PostCSS → 8.5.32. Production dependencies: 0 known vulnerabilities.
- ESLint/Prettier ignore generated `coverage/` and Playwright output.

#### Known

- Remaining `npm audit` findings are dev-only (Vite 5, Vitest 2) and need major upgrades (Vite 8, Vitest 5); tracked as a separate task.

### Founder slide (2026-11-08)

- Core Expertise set to "DevOps Engineer" (founder request).

### Phase 2b: Test depth (2026-11-08)

#### Added

- Coverage reporting (`npm run coverage`, V8) with enforced thresholds: 80% lines overall, 95% for `src/domain`, 90% for `src/providers`. Current: 97% lines.
- Playwright end-to-end suite (`npm run e2e`), 10 scenarios × desktop + mobile (Pixel 7) = 20 tests: load + simulated badge + globe, hold/abort, short-click guard, keyboard Space hold to completion and reset, chaos label fit, no horizontal scroll, AWS DRS tab, reduced motion, all 7 deck slides without errors, deck citations.
- Unit tests for ShareModal, ErrorBoundary, AwsDrsHud, `usePrefersReducedMotion` (40 unit tests total).

#### Changed

- 3D globe caps device pixel ratio at 1.5x, reducing GPU work on high-density phones by up to 4x.

### Phase 2a: Accessibility (2026-11-08)

#### Added

- Keyboard-operable failover: hold Space or Enter for 1.2s; releasing early or moving focus away cancels.
- Reduced-motion support: honors the OS setting (Framer Motion `MotionConfig`, CSS animations, globe auto-rotation and packet animation).
- `usePrefersReducedMotion` hook.
- 8 new tests (33 total): keyboard hold/cancel/blur, sound default and persistence, storage unavailable.

#### Changed

- Sound is **off by default**; turning it on is remembered per browser.
- Hold-to-confirm is timed independently of the progress animation, so the guard can't be shortened by reduced-motion settings.
- Touch-cancel also cancels a hold.

#### Fixed

- React "not wrapped in act(...)" test warning (tests now wait for the lazily loaded globe).

### Pitch deck sources, founder bio, roadmap date (2026-11-08)

#### Changed

- Market slide: replaced unverified "$15.8B by 2028 / 22.4% CAGR" with MarketsandMarkets (Jan 2026): global DRaaS $16.1B in 2025 → $46.1B by 2032, 16.2% CAGR. SAM ($4.2B) labeled as an internal estimate.
- Problem slide: "60% idle waste" replaced with Flexera 2026 State of the Cloud: organizations estimate 29% of cloud spend is wasted.
- Founder slide rewritten from the founder's master resume: 100+ high-capacity deployments, 2025 Presidential Inauguration broadcast connectivity, UFC 250 at the White House, 6-mile ~4 Gbps backhaul. Removed claims not on the resume (data lake architectures, BGP, AWS DRS specialization). Subtitle now singular ("an engineer").
- Roadmap: design-partner pilots targeted for March 2027.
- All "[source needed]" markers resolved; marker component removed. Test now asserts citations are present.

### Deploy tooling (2026-11-08)

- `npm run deploy` publishes to GitHub Pages after `npm run verify`; `DRY_RUN=1` does everything except push.
- Fixed: first version failed copying the build (`cp: ././.git: Not a directory`). Cause: an earlier manual deploy left a git repository inside `dist/` (Vite preserves `.git` when rebuilding). The copy now excludes `.git` and uses explicit paths. Nothing was published by the failed runs.

### Pitch deck accuracy pass (2026-11-08)

#### Changed

- Slide 2 statistics replaced with verified, cited figures: $14,056/min average unplanned downtime (EMA, Feb 2024, 415 IT leaders); over 90% of mid-size/large enterprises lose >$300K per hour (ITIC 2024); 85% of human-error outages tied to procedures (Uptime Institute, May 2025). Removed the misattributed "Gartner $9,000/min" claim.
- Unbuilt capabilities reworded as planned/targets/roadmap (AWS DRS integration, cross-cloud failover, chaos testing, carrier connect, BGP peering). RPO target stated as "seconds", idle cost as "storage-only".
- "Zero-Downtime" → "Near-Zero-Downtime"; "Apple-Grade" → "Consumer-Grade"; "live engine" → "interactive demo (simulated data)"; "99.999% RTO Guarantee" → "Contractual RTO SLA"; pricing labeled as proposed.
- Roadmap slide: stale Q3/Q4 2026 dates replaced with [date TBD]; telemetry milestone labeled simulated.
- Unverified market figures ($15.8B TAM, 22.4% CAGR, $4.2B SAM, 60% idle waste) marked **[source needed]**; SOM labeled as an assumption.
- README: removed sub-second RPO / eBPF claims; states the demo is simulated.

#### Added

- Deck regression test that renders all 7 slides (guards the earlier black-screen crash).

### Globe visibility (2026-11-08)

#### Changed

- 3D globe wireframe now uses the brand cyan (22% opacity) instead of near-black, over a dark solid core that hides the back half so the grid reads cleanly.
- Region markers are placed on the globe surface so the core never hides them.

### Multi-agent handoff (2026-11-08)

#### Added

- `AGENTS.md`: single source of project rules for all AI agents (Google Antigravity reads it natively); `CLAUDE.md` now imports it.
- `docs/STATUS.md`: living handoff doc covering phase status, health, next steps, open decisions, known issues.
- Rules for branches, secrets, browser verification, and asking before deletes.

### Phase 1 — Architecture (2026-11-08)

#### Added

- `DrProvider` interface (`src/domain/dr.ts`) so real cloud providers can replace the simulator without UI changes. The simulator is now `MockDrProvider`.
- Explicit failover transition rules (`ALLOWED_TRANSITIONS`); invalid transitions are rejected.
- **Abort Failover** button, available until traffic cutover begins.
- **SIMULATED DATA** badge in the header whenever the active provider is simulated.
- Error boundaries around lazy panels (e.g. a WebGL failure shows a placeholder).
- Browser tab icon (fixes a favicon 404).
- 15 new tests (25 total): transition rules, abort windows, log buffer, UI abort/badge/lazy load.

#### Changed

- Split the 550-line `App.tsx` into `domain/`, `providers/`, `hooks/`, `config/`, `features/`, `components/`, `lib/`.
- Code-split the 3D globe, AWS DRS tab, and pitch deck: initial JS 1,250 kB → 293 kB (348 → 95 kB gzip).
- Target regions defined once in `config/regions.ts`.
- Log stream history now lives in the provider, so it survives tab switches.
- Removed the unverifiable "Zero data loss" claim from the simulated completion log.
- Accessibility: ARIA labels on icon buttons, `aria-pressed` on toggles, dialog semantics on the share modal, live region announcing failover status.

### Phase 0 — Foundation (2026-11-08)

#### Added

- Strict TypeScript config and `npm run typecheck`.
- ESLint (typescript-eslint, react-hooks) and Prettier with `lint`, `format`, `format:check` scripts.
- Compiled Tailwind v3 via PostCSS with `aether-*` brand color tokens.
- `DisasterRecoveryBackend.dispose()` to stop background telemetry timers.
- Project docs: `CLAUDE.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `LICENSE`, `.editorconfig`, `.nvmrc`.
- `docs/CONTINUE_BUILD_PROMPT.md` — phased roadmap, including the $0-until-funded rule.

#### Fixed

- Chaos mode "System State" value (`DEGRADED_JITTER`) overflowed its card into the neighboring card. Now shows `DEGRADED JITTER`, and metric cards wrap long values instead of overflowing (verified at 800px and 390px widths).
- Investor pitch deck slide crashed due to missing `Activity` / `Clock` icon imports.

#### Changed

- Removed Tailwind CDN script; styles now ship in the bundle (25.8 kB, 5.3 kB gzip).
- Replaced 110 hard-coded hex color classes with brand tokens.
- Failover log now includes the source region.
- Codebase formatted with Prettier; unused imports removed.

## [0.2.0] — 2026-11-08

### Added

- "Reset to Standby" button so failover drills can be re-run in demos.
- Vitest + Testing Library test suite (9 tests) for the failover flow and mock backend.

## [0.1.0] — 2026-11-07

### Added

- Initial command center: 3D topology globe, hold-to-confirm failover, chaos simulation mode, simulated AWS DRS / CloudWatch telemetry HUD, investor pitch deck, GitHub Pages deployment.
