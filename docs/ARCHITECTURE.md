# Architecture

> Status: front-end prototype. No real backend; all data is simulated in the browser.

## Overview

```
index.html → src/main.tsx → App.tsx
                              ├── GlobalTopologyCanvas.tsx   3D globe (Three.js / R3F)
                              ├── AwsDrsHud.tsx              telemetry dashboard tab
                              │     └── TelemetrySparkline.tsx
                              ├── InvestorPitchDeck.tsx      pitch slides
                              └── audioEffects.ts            Web Audio synth (no asset files)

MockBackend.ts  ── DisasterRecoveryBackend (simulated)
                   state machine + telemetry/log streams via listener callbacks
```

## Failover state machine (`SystemState`)

```
ACTIVE_SYNC → QUIESCE_AND_SNAPSHOT → HYDRATING_TARGET → DNS_CUTOVER → TARGET_SECURED
     ↑                                                                    │
     └──────────────────── resetToStandby() ──────────────────────────────┘
DEGRADED_STATE: defined but not yet used. Chaos mode (setChaosMode) only perturbs telemetry and shows a DEGRADED_JITTER label.
```

The UI subscribes with `onStateChange`, `onMetricsUpdate`, `onDrTelemetryUpdate`, `onLogEvent` (each returns an unsubscribe function). `dispose()` stops the telemetry timer.

## Tooling

- Vite 5 build, base `./` for GitHub Pages.
- Tailwind v3 compiled via PostCSS; brand tokens in `tailwind.config.js`.
- Vitest + jsdom + Testing Library (`src/setupTests.ts`).
- ESLint flat config (`eslint.config.js`), Prettier (`.prettierrc.json`).

## Hosting

GitHub Pages (free). No servers, no paid services.

## Planned (Phase 1)

- Split `App.tsx` into feature folders.
- `DrProvider` interface so `MockDrProvider` can later be swapped for a real provider without UI changes.
- Lazy-load the globe and pitch deck (current JS bundle exceeds 500 kB).
