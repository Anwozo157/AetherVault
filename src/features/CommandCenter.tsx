import { motion } from 'framer-motion';
import { Suspense, lazy, useState } from 'react';
import { DEFAULT_TARGET_REGION, SOURCE_REGION } from '../config/regions';
import { SystemState } from '../domain/dr';
import { useDrSession } from '../hooks/useDrSession';
import { useFailoverRun } from '../hooks/useFailoverRun';
import ErrorBoundary from '../components/ErrorBoundary';
import { sound } from '../lib/audioEffects';
import ApprovalPanel from './failover/ApprovalPanel';
import ControlBar, { type CommandTab } from './failover/ControlBar';
import FailoverControl from './failover/FailoverControl';
import MetricsOverview from './telemetry/MetricsOverview';

// Heavy panels load on demand so the first paint stays fast on phones.
const GlobalTopologyCanvas = lazy(() => import('./topology/GlobalTopologyCanvas'));
const AwsDrsHud = lazy(() => import('./telemetry/AwsDrsHud'));

function PanelPlaceholder({ label, height = 'h-[320px]' }: { label: string; height?: string }) {
  return (
    <div
      className={`w-full ${height} rounded-[2rem] border border-white/10 bg-white/[0.02] flex items-center justify-center text-xs font-mono text-zinc-500`}
    >
      {label}
    </div>
  );
}

/** Mission Control view: controls, 3D topology, metrics, and failover. */
export default function CommandCenter({
  chaosActive,
  onToggleChaos,
}: {
  chaosActive: boolean;
  onToggleChaos: () => void;
}) {
  const { provider, state, metrics, telemetry, logs } = useDrSession();
  const [tab, setTab] = useState<CommandTab>('hud');
  const [selectedTarget, setSelectedTarget] = useState(DEFAULT_TARGET_REGION);
  const run = useFailoverRun();
  const approvals = provider.approvals;
  // With a server backend, everyone sees the open run's target, not their own selection.
  const targetRegion = run?.targetRegion ?? selectedTarget;
  const viewOnly = !!approvals && !approvals.canRequest() && state === SystemState.IDLE;

  const handleAbort = () => {
    if (provider.abortFailover()) sound.stopHoldCharge();
  };

  return (
    <main className="w-full max-w-5xl relative z-10 flex flex-col items-center flex-grow justify-center">
      <ControlBar
        tab={tab}
        onTabChange={setTab}
        targetRegion={targetRegion}
        onTargetRegionChange={setSelectedTarget}
        regionLocked={state !== SystemState.IDLE || !!run}
        chaosActive={chaosActive}
        onToggleChaos={onToggleChaos}
      />

      {tab === 'hud' ? (
        <>
          <ErrorBoundary
            fallback={<PanelPlaceholder label="3D view unavailable on this device (WebGL)." />}
          >
            <Suspense fallback={<PanelPlaceholder label="Loading 3D topology…" />}>
              <GlobalTopologyCanvas
                status={state}
                targetRegion={targetRegion}
                chaosActive={chaosActive}
              />
            </Suspense>
          </ErrorBoundary>

          <motion.div
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-5 sm:p-6 rounded-[2rem] border border-white/10 bg-[#121826]/40 backdrop-blur-3xl shadow-2xl mt-4"
            layout
          >
            <MetricsOverview
              state={state}
              metrics={metrics}
              telemetry={telemetry}
              chaosActive={chaosActive}
            />
            {approvals && run?.pendingApproval ? (
              <ApprovalPanel run={run} approvals={approvals} />
            ) : viewOnly ? (
              <p className="col-span-1 md:col-span-3 mt-4 py-6 border-t border-white/5 text-center text-xs font-mono text-zinc-400">
                View-only access ({approvals.role}). Operators can request failovers; approvers
                approve them.
              </p>
            ) : (
              <FailoverControl
                state={state}
                targetRegion={targetRegion}
                rto={metrics.rto}
                onTrigger={() => provider.triggerFailover(SOURCE_REGION, targetRegion)}
                onAbort={handleAbort}
                onReset={() => provider.resetToStandby()}
              />
            )}
          </motion.div>
        </>
      ) : (
        <ErrorBoundary fallback={<PanelPlaceholder label="Telemetry panel failed to load." />}>
          <Suspense fallback={<PanelPlaceholder label="Loading telemetry…" />}>
            <AwsDrsHud telemetry={telemetry} logs={logs} chaosActive={chaosActive} />
          </Suspense>
        </ErrorBoundary>
      )}
    </main>
  );
}
