# Architecture

> Status: front-end prototype. No real backend; all data is simulated in the browser
> by `MockDrProvider` and labeled **SIMULATED DATA** in the UI.

## Layers

```
src/
├── domain/dr.ts                 Types, SystemState, transition rules, DrProvider interface
├── providers/
│   ├── MockDrProvider.ts        Simulated implementation of DrProvider
│   ├── defaultProvider.ts       Chooses which provider the app runs with
│   └── DrProviderContext.tsx    React context: <DrProviderRoot>, useDrProvider()
├── hooks/useDrSession.ts        Subscribes to the provider → state, metrics, telemetry, logs
├── hooks/usePrefersReducedMotion.ts  OS reduce-motion preference
├── config/regions.ts            Source + target failover regions (single source of truth)
├── features/
│   ├── CommandCenter.tsx        Mission Control view (composes the pieces below)
│   ├── failover/                ControlBar (tabs, region, chaos), FailoverControl (hold/abort/reset)
│   ├── telemetry/               MetricCard, MetricsOverview, TelemetrySparkline, AwsDrsHud
│   ├── topology/                GlobalTopologyCanvas (Three.js globe, lazy-loaded)
│   └── pitch/                   InvestorPitchDeck (lazy-loaded)
├── components/                  AppHeader, AppFooter, AmbientBackground, ShareModal, ErrorBoundary
├── lib/audioEffects.ts          Web Audio synth (no audio files)
├── App.tsx                      App shell: header, mode switch, chaos + sound state
└── main.tsx                     Creates the provider and mounts <DrProviderRoot><App/></DrProviderRoot>
```

**Dependency rule:** UI code depends on `domain/dr.ts` and `useDrProvider()`, never on a concrete
provider. To add a real data source, implement `DrProvider` (e.g. `AwsDrsProvider`) and return it
from `createDefaultProvider()`. No UI changes needed.

## Failover state machine

```
ACTIVE_SYNC → QUIESCE_AND_SNAPSHOT → HYDRATING_TARGET → DNS_CUTOVER → TARGET_SECURED
     ↑               │                      │                              │
     └──── abort ────┴────── abort ─────────┘                              │
     └──────────────────────── resetToStandby() ───────────────────────────┘
```

- Allowed transitions live in `ALLOWED_TRANSITIONS` (`domain/dr.ts`); providers reject anything else.
- **Abort** is allowed only before `DNS_CUTOVER`. Once traffic is moving, rolling back is a
  failback operation, not an abort. The UI hides the Abort button at that point.
- `DEGRADED_STATE` is defined but not yet used. Chaos mode only perturbs telemetry and shows a
  `DEGRADED JITTER` label.

## Performance

- The 3D globe (three.js), AWS DRS tab, and pitch deck are code-split with `React.lazy`.
- Initial JS: ~293 kB (95 kB gzip), down from 1,250 kB (348 kB gzip) before Phase 1.
- `ErrorBoundary` wraps lazy panels so a WebGL failure shows a placeholder instead of a blank page.

## Accessibility

- Failover hold works with mouse, touch, and keyboard (Space/Enter); hold timing is a timer, not the animation.
- `prefers-reduced-motion` respected globally (Framer `MotionConfig reducedMotion="user"`, CSS media query, globe).
- Sound off by default; preference stored in `localStorage` (`aethervault:sound-enabled`), failing safe if storage is blocked.
- Live region announces failover status; icon buttons have accessible names.

## Testing

- `domain/dr.test.ts`: transition rules.
- `providers/MockDrProvider.test.ts`: lifecycle, abort windows, log buffer (fake timers).
- `App.test.tsx`: UI behavior against a `FakeProvider` injected via `<DrProviderRoot>`.

## Tooling

Vite 5 (base `./` for GitHub Pages), Tailwind v3 via PostCSS with `aether-*` tokens, Vitest +
jsdom + Testing Library, ESLint flat config, Prettier.

## Hosting

GitHub Pages (free), served from the `gh-pages` branch. No servers, no paid services.
