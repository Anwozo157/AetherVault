import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { SystemState, isAbortable } from '../../domain/dr';
import { sound } from '../../lib/audioEffects';

export const HOLD_SECONDS = 1.2;

interface FailoverControlProps {
  state: SystemState;
  targetRegion: string;
  rto: string;
  onTrigger: () => void;
  onAbort: () => void;
  onReset: () => void;
}

/** Hold-to-confirm failover button, in-flight progress (with abort), and secured state. */
export default function FailoverControl({
  state,
  targetRegion,
  rto,
  onTrigger,
  onAbort,
  onReset,
}: FailoverControlProps) {
  const [isHolding, setIsHolding] = useState(false);
  // The hold is timed independently of the progress animation, so the guard
  // still holds when animations are shortened (e.g. reduced-motion settings).
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoldTimer = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  useEffect(() => clearHoldTimer, []);

  const handleHoldComplete = () => {
    holdTimer.current = null;
    sound.stopHoldCharge();
    sound.playFailoverTriggered();
    setIsHolding(false);
    onTrigger();
  };

  const handleHoldStart = () => {
    if (holdTimer.current) return;
    setIsHolding(true);
    sound.startHoldCharge(HOLD_SECONDS);
    holdTimer.current = setTimeout(handleHoldComplete, HOLD_SECONDS * 1000);
  };

  const handleHoldEnd = () => {
    if (!holdTimer.current) return;
    clearHoldTimer();
    setIsHolding(false);
    sound.stopHoldCharge();
  };

  // Keyboard users hold Space or Enter, mirroring press-and-hold.
  const isHoldKey = (e: KeyboardEvent) => e.key === ' ' || e.key === 'Enter';
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isHoldKey(e)) return;
    e.preventDefault();
    if (!e.repeat) handleHoldStart();
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (!isHoldKey(e)) return;
    e.preventDefault();
    handleHoldEnd();
  };

  return (
    <div className="col-span-1 md:col-span-3 mt-4 flex flex-col items-center justify-center py-6 border-t border-white/5 relative overflow-hidden rounded-2xl">
      <p className="sr-only" aria-live="polite">
        Failover status: {state.replace(/_/g, ' ')}
      </p>
      <AnimatePresence mode="wait">
        {state === SystemState.IDLE ? (
          <div className="flex flex-col items-center">
            <motion.button
              key="trigger"
              onMouseDown={handleHoldStart}
              onMouseUp={handleHoldEnd}
              onMouseLeave={handleHoldEnd}
              onTouchStart={handleHoldStart}
              onTouchEnd={handleHoldEnd}
              onTouchCancel={handleHoldEnd}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              onBlur={handleHoldEnd}
              aria-describedby="failover-hold-hint"
              whileTap={{ scale: 0.96 }}
              className="relative group flex items-center justify-center w-72 h-16 rounded-full bg-white/[0.03] border border-white/10 hover:border-aether-cyan/50 transition-colors shadow-lg overflow-hidden cursor-pointer select-none"
            >
              <span className="relative z-10 text-xs font-mono tracking-widest text-aether-cyan font-semibold uppercase group-hover:text-white transition-colors">
                {isHolding ? 'HOLD TO INITIATE FAILOVER' : '1-CLICK FAILOVER'}
              </span>
              {isHolding && (
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: HOLD_SECONDS, ease: 'linear' }}
                  className="absolute left-0 top-0 h-full bg-aether-cyan/25 backdrop-blur-sm"
                />
              )}
            </motion.button>
            <p
              id="failover-hold-hint"
              className="text-[11px] font-mono text-zinc-500 mt-3 tracking-wider"
            >
              {isHolding
                ? `Hold ${HOLD_SECONDS}s to confirm failover...`
                : `Press and hold (or hold Space/Enter) for ${HOLD_SECONDS}s to prevent accidental execution`}
            </p>
          </div>
        ) : (
          <motion.div
            key="status"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            {state === SystemState.SECURED ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-aether-green"
              >
                <div className="w-16 h-16 rounded-full bg-aether-green/10 border border-aether-green/30 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(0,255,157,0.3)]">
                  <CheckCircle className="w-8 h-8 text-aether-green" />
                </div>
                <p className="text-xl font-mono tracking-widest uppercase font-semibold">
                  TARGET SECURED
                </p>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  Live Workloads Routed to {targetRegion}
                </p>
                <button
                  onClick={onReset}
                  className="mt-5 px-5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-aether-green/40 text-xs font-mono tracking-widest uppercase text-zinc-300 hover:text-white transition-colors"
                >
                  Reset to Standby
                </button>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center mb-5">
                  <div className="w-16 h-16 border-4 border-t-aether-amber border-r-transparent border-b-transparent border-l-aether-amber/30 rounded-full animate-spin" />
                  <div className="absolute w-12 h-12 border-4 border-t-transparent border-r-aether-cyan border-b-aether-cyan/30 border-l-transparent rounded-full animate-[spin_1.5s_reverse_infinite]" />
                  <AlertTriangle className="w-5 h-5 text-aether-amber" />
                </div>
                <p className="text-sm font-mono text-aether-amber animate-pulse tracking-widest uppercase font-semibold">
                  {state.replace(/_/g, ' ')}...
                </p>
                <p className="text-xs text-gray-500 mt-2 font-mono">ESTIMATED RTO ELAPSED: {rto}</p>
                {isAbortable(state) ? (
                  <button
                    onClick={onAbort}
                    className="mt-5 px-5 py-2 rounded-full bg-aether-red/10 hover:bg-aether-red/20 border border-aether-red/40 text-xs font-mono tracking-widest uppercase text-red-300 hover:text-white transition-colors"
                  >
                    Abort Failover
                  </button>
                ) : (
                  <p className="mt-5 text-[11px] font-mono text-zinc-500 tracking-wider">
                    Traffic cutover in progress. Abort no longer available.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
