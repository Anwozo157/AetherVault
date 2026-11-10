import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const ReplicationScene3D = lazy(() => import('./ReplicationScene3D'));

function Fallback({ label }: { label: string }) {
  return (
    <div className="flex h-full items-center justify-center text-xs font-mono text-zinc-500">
      {label}
    </div>
  );
}

/** The 3D replication scene: loads when it nears the viewport, animates only while visible. */
export default function ReplicationShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const still = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      aria-label="Illustrative 3D scene: a legacy server streams data blocks into a vault in your AWS account; a recovery server is launched on demand"
      className="landing-ring overflow-hidden rounded-2xl bg-aether-ink"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="truncate text-xs font-mono text-zinc-400">replication / pipeline</span>
        <span className="shrink-0 rounded-md border border-aether-amber/30 bg-aether-amber/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-aether-amber">
          ILLUSTRATIVE
        </span>
      </div>
      <div ref={ref} className="h-72 sm:h-[26rem]">
        {near ? (
          <ErrorBoundary fallback={<Fallback label="3D view unavailable on this device." />}>
            <Suspense fallback={<Fallback label="Loading 3D scene…" />}>
              <ReplicationScene3D active={visible} still={still} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <Fallback label="Loading 3D scene…" />
        )}
      </div>
    </figure>
  );
}
