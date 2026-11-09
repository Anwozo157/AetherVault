# Architecture

> Status: two entry points.
>
> - **Public demo** (`/`, GitHub Pages): everything simulated in the browser by `MockDrProvider`,
>   labeled **SIMULATED DATA**.
> - **Signed-in console** (`#/console`, local Supabase only until Phase 3.6): real sign-in, roles,
>   two-person approval and audit log via `SupabaseDrProvider`. Replication telemetry is still
>   simulated and labeled **SIMULATED TELEMETRY**.

## Layers

```
src/
├── domain/dr.ts                 Types, SystemState, transition rules, DrProvider + ApprovalCapability
├── domain/failoverStage.ts      Stage from approval timestamp (mirrors SQL run_stage)
├── providers/
│   ├── MockDrProvider.ts        Simulated implementation of DrProvider
│   ├── supabase/consoleApi.ts   Narrow RPC/Realtime layer over supabase-js (fakeable in tests)
│   ├── supabase/SupabaseDrProvider.ts  Server-backed provider (approvals, audit feed)
│   ├── defaultProvider.ts       Chooses the public demo provider
│   └── DrProviderContext.tsx    React context: <DrProviderRoot>, useDrProvider()
├── console/ConsoleRoot.tsx      Composition root for #/console: auth, org, SupabaseDrProvider (lazy)
├── config/backend.ts            Build-time Supabase env; hasBackend; console route
├── hooks/useDrSession.ts        Subscribes to the provider → state, metrics, telemetry, logs
├── hooks/useFailoverRun.ts      The org's open run (providers with approvals)
├── hooks/usePrefersReducedMotion.ts  OS reduce-motion preference
├── config/regions.ts            Source + target failover regions (single source of truth)
├── features/
│   ├── CommandCenter.tsx        Mission Control view (composes the pieces below)
│   ├── failover/                ControlBar, FailoverControl (hold/abort/reset), ApprovalPanel
│   ├── console/SignInForm.tsx   Email + password / magic-link sign-in
│   ├── telemetry/               MetricCard, MetricsOverview, TelemetrySparkline, AwsDrsHud
│   ├── topology/                GlobalTopologyCanvas (Three.js globe, lazy-loaded)
│   └── pitch/                   InvestorPitchDeck (lazy-loaded)
├── components/                  AppHeader, AppFooter, AmbientBackground, ShareModal, ErrorBoundary
├── lib/audioEffects.ts          Web Audio synth (no audio files)
├── App.tsx                      App shell: header, mode switch, chaos + sound state
└── main.tsx                     Routes: public demo (MockDrProvider) or lazy ConsoleRoot
```

**Dependency rule:** UI code depends on `domain/dr.ts` and `useDrProvider()`, never on a concrete
provider. Concrete providers are constructed only in composition roots (`main.tsx`,
`console/ConsoleRoot.tsx`). Adding `SupabaseDrProvider` needed no changes to the failover UI beyond
the optional approval panel.

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
- `providers/supabase/SupabaseDrProvider.test.ts`: two-person flow, clock skew, roles, abort window,
  errors, against an in-memory fake server.
- `e2e/app.spec.ts` (`npm run e2e`): public demo, desktop + mobile.
- `e2e/console.spec.ts` (`npm run e2e:console`): two real browsers against local Supabase complete
  an approved failover live; withdraw; viewer read-only; sign-out.

## Database (Phase 3, local only)

`supabase/` holds the backend that will replace `MockDrProvider` (ADRs 0002, 0003). Not yet wired
into the UI and not hosted.

- `migrations/20261108000001_core_schema.sql`: `orgs`, `memberships` (roles `viewer` < `operator` <
  `approver` < `admin`), `failover_runs`, `audit_log`.
- Clients only read (RLS: members of the org). All writes go through `SECURITY DEFINER` RPCs
  (`create_org`, `set_member_role`, `request_failover`, `approve_failover`, `abort_failover`,
  `reset_failover`) that check the role and append to the audit log in the same transaction.
- Failover stage is derived from timestamps by `run_stage()`, mirroring the mock's timings.
  Two-person approval and one open run per org are enforced by constraints.
- `audit_log` is append-only (triggers) and SHA-256 hash-chained per org; `verify_audit_chain()`
  returns the first broken row.
- `migrations/20261108000002_console_reads.sql`: `get_failover_status()` (open run + server
  `now()`) and `org_audit_feed()` (entries with actor email; members only).
- `seed.sql`: **local only** demo org and one user per role (password `aether-demo-local`).
- `tests/database/*.test.sql`: pgTAP suites (`npm run db:test`), 50 tests.

## Signed-in console (Phase 3.4)

```
Browser A (operator)            Supabase (Postgres + Auth + Realtime)          Browser B (approver)
 hold button ──request_failover──▶ failover_runs (pending) ──Realtime──▶ ApprovalPanel
                                   audit_log += requested
 ApprovalPanel ◀──Realtime────── failover_runs.approved_at ◀─approve_failover── Approve
 stage = f(server now − approved_at), recomputed locally every 200 ms in both browsers
```

- **Server-authoritative timing:** each sync reads `server_now`; the browser keeps a clock offset,
  so all viewers derive the same stage even with skewed clocks.
- **Sync:** Realtime `postgres_changes` on `failover_runs` and `audit_log`, plus a 5 s poll fallback.
  Stale responses are discarded by sequence number.
- **Roles in the UI:** viewers get a read-only notice; requesters cannot approve (also enforced by
  the database); RPC errors appear as `CRIT` lines in the audit stream.
- **Bundle:** supabase-js loads only on `#/console`; the public demo's initial JS is unchanged
  (budget 120 kB gzip).
- **Audit Log tab (3.5):** `AuditCapability` (optional on `DrProvider`) lists pages from `audit_log_page()` and verifies via `verify_audit_chain_report()`; `features/audit/` renders the table, filters, Verify and CSV export (formula-injection safe).
- **Public build:** no `VITE_SUPABASE_*` env, so no sign-in link and `#/console` explains that the
  console isn't deployed.

## Tooling

Vite 8 (base `./` for GitHub Pages), Tailwind v3 via PostCSS with `aether-*` tokens, Vitest +
jsdom + Testing Library, ESLint flat config, Prettier.

## Hosting

GitHub Pages (free), served from the `gh-pages` branch. No servers, no paid services.
