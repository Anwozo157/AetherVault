import { Suspense, lazy, useEffect, useState } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import { DEMO_HASH } from '../../config/backend';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

// The same globe the live demo uses, loaded after the landing page has painted.
const GlobalTopologyCanvas = lazy(() => import('../topology/GlobalTopologyCanvas'));

/** One simulated failover, looped: the product's real state machine, at a watchable pace. */
const HERO_SEQUENCE = [
  { status: 'ACTIVE_SYNC', label: 'Active sync', ms: 5000 },
  { status: 'QUIESCE_AND_SNAPSHOT', label: 'Quiesce + snapshot', ms: 2200 },
  { status: 'HYDRATING_TARGET', label: 'Hydrate target', ms: 2600 },
  { status: 'DNS_CUTOVER', label: 'DNS cutover', ms: 2200 },
  { status: 'TARGET_SECURED', label: 'Target secured', ms: 5000 },
] as const;

const STATS: Array<[string, string]> = [
  ['Data loss (RPO)', 'seconds'],
  ['Recovery (RTO)', 'minutes'],
  ['Recovery servers', 'on demand'],
  ['Approval', '2 people'],
];

function GlobePlaceholder() {
  return (
    <div className="flex h-80 md:h-[30rem] items-center justify-center text-xs font-mono text-zinc-500">
      Loading 3D topology…
    </div>
  );
}

export default function HeroMissionControl() {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setTimeout(
      () => setStep((s) => (s + 1) % HERO_SEQUENCE.length),
      HERO_SEQUENCE[step].ms,
    );
    return () => window.clearTimeout(t);
  }, [step, reducedMotion]);

  const current = HERO_SEQUENCE[reducedMotion ? 0 : step];
  const secured = current.status === 'TARGET_SECURED';

  return (
    <figure
      aria-label="Simulated failover on a 3D globe: replication from the primary region to a recovery region, looping through each recovery stage"
      className="landing-ring overflow-hidden rounded-2xl bg-aether-panel/80 shadow-[0_40px_160px_-40px] shadow-aether-cyan/30 backdrop-blur"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </span>
          <span className="truncate text-xs font-mono text-zinc-400">
            aethervault / mission control
          </span>
        </div>
        <span className="shrink-0 rounded-md border border-aether-amber/30 bg-aether-amber/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-aether-amber">
          SIMULATED
        </span>
      </div>

      <div className="[&>div]:mb-0 [&>div]:h-80 md:[&>div]:h-[30rem] [&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none">
        <ErrorBoundary fallback={<GlobePlaceholder />}>
          <Suspense fallback={<GlobePlaceholder />}>
            <GlobalTopologyCanvas status={current.status} targetRegion="aws-us-west-2" />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="border-t border-white/[0.08] px-4 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-mono text-zinc-400">
            failover /{' '}
            <span className={secured ? 'text-aether-green' : 'text-aether-cyan'}>
              {current.label.toLowerCase()}
            </span>
          </p>
          <a href={DEMO_HASH} className="text-xs font-mono text-aether-cyan hover:text-white">
            Drive it yourself →
          </a>
        </div>
        <ol className="relative mt-5 grid grid-cols-5 gap-2" aria-label="Recovery stages">
          <span
            className="absolute left-2 right-2 top-[7px] h-0.5 bg-white/10"
            aria-hidden="true"
          />
          <span
            className="absolute left-2 top-[7px] h-0.5 bg-gradient-to-r from-aether-cyan to-aether-green transition-[width] duration-300 ease-out"
            style={{ width: `calc((100% - 1rem) * ${step / (HERO_SEQUENCE.length - 1)})` }}
            aria-hidden="true"
          />
          {HERO_SEQUENCE.map((s, i) => {
            const done = i <= (reducedMotion ? 0 : step);
            const last = i === HERO_SEQUENCE.length - 1;
            return (
              <li
                key={s.status}
                className="relative flex flex-col items-start"
                aria-current={i === step ? 'step' : undefined}
              >
                <span
                  className={`h-4 w-4 rounded-full border-2 transition-colors duration-200 ${
                    done
                      ? last
                        ? 'border-aether-green bg-aether-green'
                        : 'border-aether-cyan bg-aether-cyan'
                      : 'border-white/20 bg-aether-ink'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`mt-3 text-[10px] sm:text-xs font-mono leading-snug transition-colors duration-200 ${
                    i === step ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {s.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <dl className="grid grid-cols-2 md:grid-cols-4 border-t border-white/[0.08] text-left">
        {STATS.map(([k, v], i) => (
          <div
            key={k}
            className={`px-4 py-3 sm:px-6 border-white/[0.08] ${i % 2 ? 'border-l' : ''} ${
              i > 1 ? 'border-t md:border-t-0' : ''
            } ${i === 2 ? 'md:border-l' : ''}`}
          >
            <dt className="text-[10px] font-mono uppercase tracking-[0.16em] text-zinc-500">{k}</dt>
            <dd className="mt-1 text-sm font-semibold text-white">{v}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
