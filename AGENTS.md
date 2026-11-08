# AetherVault — Agent & Contributor Guide

> Single source of truth for **every** AI agent (Claude Code, Google Antigravity, etc.) and human contributor.
> `CLAUDE.md` imports this file. Do not duplicate rules elsewhere; edit them here.
>
> **Start every session by reading, in order:** this file → `docs/STATUS.md` (current phase, next steps) → `CHANGELOG.md` → `docs/ARCHITECTURE.md`.
> **End every session by updating `docs/STATUS.md` and `CHANGELOG.md`, then committing.**

Enterprise disaster-recovery command center by Aegis Core Labs. Currently a front-end demo; **all telemetry is simulated** by `src/providers/MockDrProvider.ts`.

## Commands

- `npm run dev`: dev server on http://localhost:5174 (Vite picks the next free port if taken; check the terminal output)
- `npm test` — Vitest unit/component tests
- `npm run coverage`: tests with coverage thresholds
- `npm run e2e`: Playwright browser tests (desktop + mobile; locally uses installed Google Chrome)
- `npm run typecheck` — strict TypeScript (`tsc --noEmit`)
- `npm run lint` / `npm run format` — ESLint / Prettier
- `npm run build` — production build to `dist/`
- `npm run deploy`: verify, build, publish to GitHub Pages (`gh-pages` branch). **Founder runs this or explicitly approves it.**

Install with `npm install --legacy-peer-deps` (React Three Fiber peer ranges).

## Rules

1. **$0 spend until funded.** Only free/open-source tools and free tiers that cannot bill without a card. Never add a paid service or cloud account that can incur charges without the founder's explicit approval.
2. **Honesty.** Simulated data must be labeled as simulated. Pitch/README copy must not claim metrics, customers, certifications, or integrations we don't have.
3. **Before every commit:** `npm run verify` (lint, typecheck, tests, build) must pass. Chain it: `npm run verify && git commit ...` so a failure blocks the commit.
4. **Small commits**, Conventional Commits format (`feat:`, `fix:`, `build:`, `docs:`, `test:`, `style:`, `refactor:`). One concern per commit.
5. **Document everything:** update `CHANGELOG.md` (Unreleased section) with each change; update `docs/ARCHITECTURE.md` when structure changes.
6. **No push/deploy** to GitHub without the founder's OK.
7. **Never commit secrets** (API keys, tokens, recovery codes, `.env`). The founder's credentials are stored outside the repo.
8. **Branches:** work on a branch (`feat/…`, `fix/…`, `refactor/…`, `chore/…`), merge into `main` with `--no-ff` after all checks pass.
9. **Verify in a real browser**, not just tests, for any UI change (desktop and ~390px phone width).
10. **Ask before deleting** anything you didn't create.

## CI

GitHub Actions runs `.github/workflows/ci.yml` (verify + coverage + E2E + audit) and CodeQL on every push/PR. Keep `main` green; check the Actions tab after pushing.

## Architecture

UI talks only to the `DrProvider` interface (`src/domain/dr.ts`) via `useDrProvider()` / `useDrSession()`; never import a concrete provider in UI code. Details: `docs/ARCHITECTURE.md`.

## Styling

- Tailwind v3 (compiled, not CDN). Use the `aether-*` brand tokens from `tailwind.config.js` (`aether-green`, `aether-cyan`, `aether-amber`, `aether-red`, `aether-panel`, …) — no new raw hex classes.

## Roadmap

Phased plan: `docs/CONTINUE_BUILD_PROMPT.md`. Current position and next steps: `docs/STATUS.md`.

## Commit attribution

Use Conventional Commits. AI agents add a `Co-Authored-By:` trailer naming the tool/model that made the change.
