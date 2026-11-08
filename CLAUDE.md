# AetherVault — Project Conventions

Enterprise disaster-recovery command center by Aegis Core Labs. Currently a front-end demo; **all telemetry is simulated** by `src/MockBackend.ts`.

## Commands

- `npm run dev` — dev server on http://localhost:5174
- `npm test` — Vitest unit/component tests
- `npm run typecheck` — strict TypeScript (`tsc --noEmit`)
- `npm run lint` / `npm run format` — ESLint / Prettier
- `npm run build` — production build to `dist/`

Install with `npm install --legacy-peer-deps` (React Three Fiber peer ranges).

## Rules

1. **$0 spend until funded.** Only free/open-source tools and free tiers that cannot bill without a card. Never add a paid service or cloud account that can incur charges without the founder's explicit approval.
2. **Honesty.** Simulated data must be labeled as simulated. Pitch/README copy must not claim metrics, customers, certifications, or integrations we don't have.
3. **Before every commit:** `npm run lint && npm run typecheck && npm test && npm run build` all pass.
4. **Small commits**, Conventional Commits format (`feat:`, `fix:`, `build:`, `docs:`, `test:`, `style:`, `refactor:`). One concern per commit.
5. **Document everything:** update `CHANGELOG.md` (Unreleased section) with each change; update `docs/ARCHITECTURE.md` when structure changes.
6. **No push/deploy** to GitHub without the founder's OK.

## Architecture

UI talks only to the `DrProvider` interface (`src/domain/dr.ts`) via `useDrProvider()` / `useDrSession()`; never import a concrete provider in UI code. Details: `docs/ARCHITECTURE.md`.

## Styling

- Tailwind v3 (compiled, not CDN). Use the `aether-*` brand tokens from `tailwind.config.js` (`aether-green`, `aether-cyan`, `aether-amber`, `aether-red`, `aether-panel`, …) — no new raw hex classes.

## Roadmap

See `docs/CONTINUE_BUILD_PROMPT.md` for the phased plan.
