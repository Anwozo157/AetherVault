# Changelog

All notable changes to AetherVault are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Phase 0 — Foundation (2026-11-08)

#### Added

- Strict TypeScript config and `npm run typecheck`.
- ESLint (typescript-eslint, react-hooks) and Prettier with `lint`, `format`, `format:check` scripts.
- Compiled Tailwind v3 via PostCSS with `aether-*` brand color tokens.
- `DisasterRecoveryBackend.dispose()` to stop background telemetry timers.
- Project docs: `CLAUDE.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `LICENSE`, `.editorconfig`, `.nvmrc`.
- `docs/CONTINUE_BUILD_PROMPT.md` — phased roadmap, including the $0-until-funded rule.

#### Fixed

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
