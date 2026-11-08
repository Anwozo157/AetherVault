import { Suspense, lazy, useEffect, useState } from 'react';
import AmbientBackground from './components/AmbientBackground';
import AppFooter from './components/AppFooter';
import AppHeader, { type AppMode, type HeaderSession } from './components/AppHeader';
import ErrorBoundary from './components/ErrorBoundary';
import ShareModal from './components/ShareModal';
import { SystemState } from './domain/dr';
import CommandCenter from './features/CommandCenter';
import { useDrSession } from './hooks/useDrSession';
import { MotionConfig } from 'framer-motion';
import { saveSoundEnabled, sound } from './lib/audioEffects';

const InvestorPitchDeck = lazy(() => import('./features/pitch/InvestorPitchDeck'));

interface AppProps {
  /** Signed-in console session (absent on the public simulated demo). */
  session?: HeaderSession;
  signInHref?: string;
}

export default function App({ session, signInHref }: AppProps = {}) {
  const { provider, state } = useDrSession();
  const [mode, setMode] = useState<AppMode>('command');
  const [isMuted, setIsMuted] = useState(() => sound.isMuted);
  const [chaosActive, setChaosActive] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    if (state === SystemState.SECURED) sound.playSecuredChime();
  }, [state]);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    sound.isMuted = nextMuted;
    saveSoundEnabled(!nextMuted);
    setIsMuted(nextMuted);
  };

  const toggleChaos = () => {
    const next = !chaosActive;
    setChaosActive(next);
    provider.setChaosMode(next);
    if (next) sound.playChaosGlitch();
  };

  return (
    // reducedMotion="user": Framer Motion honors the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#05070B] text-white flex flex-col items-center justify-between p-3 sm:p-8 font-sans relative selection:bg-aether-cyan/30">
        <AmbientBackground state={state} chaosActive={chaosActive} />

        <AppHeader
          mode={mode}
          onModeChange={setMode}
          isMuted={isMuted}
          onToggleSound={toggleSound}
          onShare={() => setShowShare(true)}
          isSimulated={provider.isSimulated}
          telemetryIsSimulated={provider.telemetryIsSimulated}
          session={session}
          signInHref={signInHref}
        />

        {mode === 'deck' ? (
          <ErrorBoundary
            fallback={<p className="text-sm text-zinc-400">Pitch deck failed to load.</p>}
          >
            <Suspense fallback={<p className="text-xs font-mono text-zinc-500">Loading deck…</p>}>
              <InvestorPitchDeck onLaunchDemo={() => setMode('command')} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <CommandCenter chaosActive={chaosActive} onToggleChaos={toggleChaos} />
        )}

        <ShareModal open={showShare} onClose={() => setShowShare(false)} />
        <AppFooter />
      </div>
    </MotionConfig>
  );
}
