import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudLightning, Activity, Server, CheckCircle, AlertTriangle, 
  Volume2, VolumeX, Smartphone, RefreshCw, Flame, ExternalLink
} from 'lucide-react';
import { backend, SystemState } from './MockBackend';
import GlobalTopologyCanvas from './GlobalTopologyCanvas';
import { sound } from './audioEffects';

export default function App() {
  const [sysState, setSysState] = useState<SystemState>(SystemState.IDLE);
  const [metrics, setMetrics] = useState({ rpo: '0.0s', rto: '--', sync: 100 });
  const [isHolding, setIsHolding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [targetRegion, setTargetRegion] = useState('gcp-us-central1');
  const [chaosActive, setChaosActive] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Subscribe to simulated WebSocket telemetry
    const unsubscribeState = backend.onStateChange((newState) => {
      setSysState(newState);
      if (newState === SystemState.SECURED) {
        sound.playSecuredChime();
      }
    });

    const unsubscribeMetrics = backend.onMetricsUpdate((newMetrics) => {
      if (chaosActive) {
        // Inject chaos jitter into telemetry metrics
        setMetrics({
          rpo: `${(Math.random() * 1.8 + 0.8).toFixed(2)}s`,
          rto: newMetrics.rto,
          sync: Math.floor(Math.random() * 15 + 82)
        });
      } else {
        setMetrics(newMetrics);
      }
    });

    return () => {
      unsubscribeState();
      unsubscribeMetrics();
    };
  }, [chaosActive]);

  const toggleSound = () => {
    sound.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleChaos = () => {
    const nextChaos = !chaosActive;
    setChaosActive(nextChaos);
    if (nextChaos) {
      sound.playChaosGlitch();
    }
  };

  const handleHoldStart = () => {
    setIsHolding(true);
    sound.startHoldCharge(1.2);
  };

  const handleHoldEnd = () => {
    setIsHolding(false);
    sound.stopHoldCharge();
  };

  const handleTriggerComplete = () => {
    sound.stopHoldCharge();
    sound.playFailoverTriggered();
    backend.triggerFailover('us-east-1', targetRegion);
    setIsHolding(false);
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-white flex flex-col items-center justify-between p-4 sm:p-8 font-sans relative selection:bg-[#00F0FF]/30">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-20"
          style={{
            backgroundColor: chaosActive ? '#FF3B30' : sysState === SystemState.SECURED ? '#00FF9D' : sysState === SystemState.IDLE ? '#00F0FF' : '#FFB800'
          }}
        />
        <div 
          className="absolute bottom-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-15"
          style={{
            backgroundColor: chaosActive ? '#FF9500' : sysState === SystemState.SECURED ? '#00FF9D' : sysState === SystemState.IDLE ? '#3B82F6' : '#FF3B30'
          }}
        />
      </div>

      {/* Top Navigation Bar with Titanium Brand Logo */}
      <header className="w-full max-w-4xl z-20 flex items-center justify-between py-4 mb-4 border-b border-white/5">
        <div className="flex items-center gap-3.5">
          <img 
            src="/aethervault-logo.jpeg" 
            alt="AetherVault Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-2xl border border-white/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">AetherVault</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#00F0FF]">
                ENTERPRISE DR
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">by Aegis Core Labs</p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button 
            onClick={toggleSound}
            title={isMuted ? "Unmute Synthesizer Audio" : "Mute Audio"}
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00F0FF]" />}
          </button>

          {/* Share on Mobile Button */}
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
          >
            <Smartphone className="w-4 h-4 text-[#00FF9D]" />
            <span className="hidden sm:inline">Share on Phone</span>
          </button>
        </div>
      </header>

      {/* Main Interactive Command Center */}
      <main className="w-full max-w-4xl relative z-10 flex flex-col items-center flex-grow justify-center">
        {/* Controls Bar: Multi-Region Selector & SDET Chaos Mode */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
          {/* Target Region Switcher */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-zinc-500 uppercase tracking-wider">Target Cloud:</span>
            <select 
              value={targetRegion}
              onChange={(e) => setTargetRegion(e.target.value)}
              disabled={sysState !== SystemState.IDLE}
              className="bg-[#0B0F17] border border-white/10 rounded-lg px-3 py-1.5 text-zinc-200 font-mono text-xs focus:outline-none focus:border-[#00F0FF]/50 disabled:opacity-50 cursor-pointer"
            >
              <option value="gcp-us-central1">GCP us-central1 (Iowa)</option>
              <option value="aws-us-west-2">AWS us-west-2 (Oregon)</option>
              <option value="azure-eastus2">Azure East US 2 (Virginia)</option>
            </select>
          </div>

          {/* SDET Chaos Injection Toggle */}
          <button
            onClick={toggleChaos}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              chaosActive 
                ? 'bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(255,59,48,0.3)] animate-pulse' 
                : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${chaosActive ? 'text-red-400' : 'text-zinc-500'}`} />
            <span>{chaosActive ? 'Chaos Active: Jitter Injected' : 'SDET Chaos Simulation'}</span>
          </button>
        </div>

        {/* Phase 2 & 3: 3D Global Topology Canvas (Three.js / React Three Fiber) */}
        <GlobalTopologyCanvas 
          status={sysState} 
          targetRegion={targetRegion} 
          chaosActive={chaosActive} 
        />

        {/* Glassmorphic Telemetry Grid */}
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 p-6 sm:p-8 rounded-[2rem] border border-white/10 bg-[#121826]/40 backdrop-blur-3xl shadow-2xl"
          layout
        >
          <MetricCard 
            icon={<Activity className="w-5 h-5 text-gray-400" />}
            label="RPO (Lag)" 
            value={metrics.rpo} 
            color={chaosActive ? 'text-[#FF3B30]' : metrics.sync === 100 ? 'text-[#00FF9D]' : 'text-[#FFB800]'} 
          />
          <MetricCard 
            icon={<Server className="w-5 h-5 text-gray-400" />}
            label="System State" 
            value={chaosActive ? 'DEGRADED_JITTER' : sysState.replace(/_/g, ' ')} 
            color={chaosActive ? 'text-[#FF3B30]' : 'text-white'} 
          />
          <MetricCard 
            icon={<CloudLightning className="w-5 h-5 text-gray-400" />}
            label="Data Sync" 
            value={`${metrics.sync}%`} 
            color={chaosActive ? 'text-[#FF9500]' : 'text-[#00F0FF]'} 
          />

          {/* Failover Interaction Zone */}
          <div className="col-span-1 md:col-span-3 mt-4 flex flex-col items-center justify-center py-8 border-t border-white/5 relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              {sysState === SystemState.IDLE ? (
                <div className="flex flex-col items-center">
                  <motion.button
                    key="trigger"
                    onMouseDown={handleHoldStart}
                    onMouseUp={handleHoldEnd}
                    onMouseLeave={handleHoldEnd}
                    onTouchStart={handleHoldStart}
                    onTouchEnd={handleHoldEnd}
                    whileTap={{ scale: 0.96 }}
                    className="relative group flex items-center justify-center w-72 h-16 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#00F0FF]/50 transition-colors shadow-lg overflow-hidden cursor-pointer select-none"
                  >
                    <span className="relative z-10 text-xs font-mono tracking-widest text-[#00F0FF] font-semibold uppercase group-hover:text-white transition-colors">
                      {isHolding ? 'HOLD TO INITIATE FAILOVER' : '1-CLICK FAILOVER'}
                    </span>
                    
                    {/* Hold Progress Ring Fill */}
                    {isHolding && (
                      <motion.div 
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.2, ease: "linear" }}
                        onAnimationComplete={handleTriggerComplete}
                        className="absolute left-0 top-0 h-full bg-[#00F0FF]/25 backdrop-blur-sm"
                      />
                    )}
                  </motion.button>
                  <p className="text-[11px] font-mono text-zinc-500 mt-3 tracking-wider">
                    {isHolding ? 'Hold 1.2s to confirm failover...' : 'Press and hold for 1.2s to prevent accidental execution'}
                  </p>
                </div>
              ) : (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center"
                >
                  {sysState === SystemState.SECURED ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center text-[#00FF9D]"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center mb-3 shadow-[0_0_25px_rgba(0,255,157,0.3)]">
                        <CheckCircle className="w-8 h-8 text-[#00FF9D]" />
                      </div>
                      <p className="text-xl font-mono tracking-widest uppercase font-semibold">TARGET SECURED</p>
                      <p className="text-xs text-zinc-400 font-mono mt-1">Live Workloads Routed to {targetRegion}</p>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="relative flex items-center justify-center mb-5">
                        <div className="w-16 h-16 border-4 border-t-[#FFB800] border-r-transparent border-b-transparent border-l-[#FFB800]/30 rounded-full animate-spin" />
                        <div className="absolute w-12 h-12 border-4 border-t-transparent border-r-[#00F0FF] border-b-[#00F0FF]/30 border-l-transparent rounded-full animate-[spin_1.5s_reverse_infinite]" />
                        <AlertTriangle className="w-5 h-5 text-[#FFB800]" />
                      </div>
                      <p className="text-sm font-mono text-[#FFB800] animate-pulse tracking-widest uppercase font-semibold">
                        {sysState.replace(/_/g, ' ')}...
                      </p>
                      <p className="text-xs text-gray-500 mt-2 font-mono">ESTIMATED RTO ELAPSED: {metrics.rto}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      {/* Share / Mobile Investor Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D121F] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-center"
            >
              <h3 className="text-xl font-bold text-white mb-2">Share With Shareholders</h3>
              <p className="text-xs text-zinc-400 mb-6">
                AetherVault is fully mobile-responsive. When deployed to Vercel/Web, shareholders can interact with the live 3D globe and failover simulation right on their phones.
              </p>

              {/* QR Code Placeholder Graphic */}
              <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://github.com/Anwozo157/AetherVault" 
                  alt="AetherVault QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full max-w-4xl z-10 py-4 mt-6 text-center text-xs font-mono text-zinc-600 border-t border-white/5">
        AetherVault Platform • Zero-Trust Cloud Resilience • Powered by Aegis Core Labs
      </footer>
    </div>
  );
}

function MetricCard({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: React.ReactNode }) {
  return (
    <motion.div 
      layout
      className="flex flex-col items-start p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-2xl border border-white/5"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">{label}</span>
      </div>
      <span className={`text-3xl font-mono font-medium tracking-tight ${color}`}>
        {value}
      </span>
    </motion.div>
  );
}
