import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudLightning, Activity, Server, CheckCircle, AlertTriangle, 
  Volume2, VolumeX, Smartphone, Flame, Presentation, ShieldCheck, 
  Layers, HardDrive
} from 'lucide-react';
import { backend, SystemState, DrTelemetry, LogEvent } from './MockBackend';
import GlobalTopologyCanvas from './GlobalTopologyCanvas';
import { sound } from './audioEffects';
import TelemetrySparkline from './TelemetrySparkline';
import AwsDrsHud from './AwsDrsHud';
import InvestorPitchDeck from './InvestorPitchDeck';

export default function App() {
  const [sysState, setSysState] = useState<SystemState>(SystemState.IDLE);
  const [metrics, setMetrics] = useState({ rpo: '0.0s', rto: '--', sync: 100 });
  const [isHolding, setIsHolding] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [targetRegion, setTargetRegion] = useState('gcp-us-central1');
  const [chaosActive, setChaosActive] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [appMode, setAppMode] = useState<'command' | 'deck'>('command');
  const [activeSubTab, setActiveSubTab] = useState<'hud' | 'drs'>('hud');

  // Live DRS & CloudWatch Telemetry
  const [drTelemetry, setDrTelemetry] = useState<DrTelemetry>({
    drsAgentStatus: 'HEALTHY',
    stagingDisksInSync: 12,
    totalStagingDisks: 12,
    replicationLagMs: 24,
    continuousDataBacklogBytes: 0,
    lastSnapshotTimestamp: 'Just now',
    pitLogRetentionHours: 72,
    cloudWatchCanarySla: 99.998,
    cloudWatchP99LatencyMs: 3.8,
    cloudWatchAlarmsOk: 18,
    cloudWatchAlarmsTriggered: 0,
    ingressThroughputGbps: 4.82,
    ebpfProbesAttached: 32,
    historyRpoMs: [22, 25, 21, 28, 24, 26, 23, 27, 25, 24, 22, 23, 25, 24, 21, 23, 26, 24, 22, 24],
    historyThroughput: [4.7, 4.8, 4.9, 4.8, 4.85, 4.79, 4.82, 4.88, 4.81, 4.84, 4.78, 4.85, 4.9, 4.83, 4.82, 4.87, 4.81, 4.85, 4.82, 4.84]
  });

  const [logs, setLogs] = useState<LogEvent[]>([
    { id: '1', timestamp: new Date().toLocaleTimeString(), level: 'INFO', service: 'DRS', message: 'AWS DRS continuous journal attached to volume pool' },
    { id: '2', timestamp: new Date().toLocaleTimeString(), level: 'INFO', service: 'CLOUDWATCH', message: 'Canary probe OK: 99.998% SLA confirmed' },
    { id: '3', timestamp: new Date().toLocaleTimeString(), level: 'SUCCESS', service: 'CORE', message: 'AetherVault system ready for autonomous failover' }
  ]);

  useEffect(() => {
    // Subscribe to simulated WebSocket telemetry
    const unsubscribeState = backend.onStateChange((newState) => {
      setSysState(newState);
      if (newState === SystemState.SECURED) {
        sound.playSecuredChime();
      }
    });

    const unsubscribeMetrics = backend.onMetricsUpdate((newMetrics) => {
      setMetrics(newMetrics);
    });

    const unsubscribeDr = backend.onDrTelemetryUpdate((telemetry) => {
      setDrTelemetry(telemetry);
    });

    const unsubscribeLogs = backend.onLogEvent((newLog) => {
      setLogs((prev) => [...prev.slice(-49), newLog]);
    });

    return () => {
      unsubscribeState();
      unsubscribeMetrics();
      unsubscribeDr();
      unsubscribeLogs();
    };
  }, []);

  const toggleSound = () => {
    sound.isMuted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleChaos = () => {
    const nextChaos = !chaosActive;
    setChaosActive(nextChaos);
    backend.setChaosMode(nextChaos);
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
    <div className="min-h-screen bg-[#05070B] text-white flex flex-col items-center justify-between p-3 sm:p-8 font-sans relative selection:bg-[#00F0FF]/30">
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
      <header className="w-full max-w-5xl z-20 flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4 mb-2 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img 
            src="./aethervault-logo.jpeg" 
            alt="AetherVault Logo" 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-2xl border border-white/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">AetherVault</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#00F0FF]">
                ENTERPRISE DR
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">by Aegis Core Labs</p>
          </div>
        </div>

        {/* Mode Switcher: Mission Control vs Shareholder Pitch Deck */}
        <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setAppMode('command')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              appMode === 'command' 
                ? 'bg-[#00F0FF]/15 text-[#00F0FF] font-semibold border border-[#00F0FF]/30 shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mission Control</span>
          </button>
          <button
            onClick={() => setAppMode('deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              appMode === 'deck' 
                ? 'bg-gradient-to-r from-[#00F0FF]/20 to-[#00FF9D]/20 text-[#00FF9D] font-semibold border border-[#00FF9D]/30 shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Investor Deck</span>
          </button>
        </div>

        {/* Actions: Audio Synthesizer & Share Modal */}
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleSound}
            title={isMuted ? "Unmute Synthesizer Audio" : "Mute Audio"}
            className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00F0FF]" />}
          </button>

          <button 
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
          >
            <Smartphone className="w-4 h-4 text-[#00FF9D]" />
            <span className="hidden sm:inline">Share on Phone</span>
          </button>
        </div>
      </header>

      {/* Main Content Area: Mode Dependent */}
      {appMode === 'deck' ? (
        <InvestorPitchDeck onLaunchDemo={() => setAppMode('command')} />
      ) : (
        <main className="w-full max-w-5xl relative z-10 flex flex-col items-center flex-grow justify-center">
          {/* Sub-Navigation & Controls Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
            {/* View Sub-Tabs */}
            <div className="flex items-center gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveSubTab('hud')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  activeSubTab === 'hud' ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>3D Global HUD</span>
              </button>
              <button
                onClick={() => setActiveSubTab('drs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  activeSubTab === 'drs' ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <HardDrive className="w-3.5 h-3.5 text-[#00FF9D]" />
                <span>AWS DRS & Telemetry</span>
              </button>
            </div>

            {/* Target Cloud Switcher & SDET Chaos Mode */}
            <div className="flex items-center gap-2">
              <select 
                value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                disabled={sysState !== SystemState.IDLE}
                className="bg-[#0B0F17] border border-white/10 rounded-lg px-2.5 py-1.5 text-zinc-200 font-mono text-xs focus:outline-none focus:border-[#00F0FF]/50 disabled:opacity-50 cursor-pointer"
              >
                <option value="gcp-us-central1">GCP us-central1 (Iowa)</option>
                <option value="aws-us-west-2">AWS us-west-2 (Oregon)</option>
                <option value="azure-eastus2">Azure East US 2 (Virginia)</option>
              </select>

              <button
                onClick={toggleChaos}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  chaosActive 
                    ? 'bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(255,59,48,0.3)] animate-pulse' 
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${chaosActive ? 'text-red-400' : 'text-zinc-500'}`} />
                <span className="hidden sm:inline">{chaosActive ? 'Chaos Active' : 'SDET Chaos Mode'}</span>
                <span className="sm:hidden">{chaosActive ? 'Chaos On' : 'Chaos'}</span>
              </button>
            </div>
          </div>

          {/* Sub-Tab 1: 3D Global HUD & Instant Cutover */}
          {activeSubTab === 'hud' ? (
            <>
              <GlobalTopologyCanvas 
                status={sysState} 
                targetRegion={targetRegion} 
                chaosActive={chaosActive} 
              />

              {/* Glassmorphic Telemetry Grid */}
              <motion.div 
                className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 p-5 sm:p-6 rounded-[2rem] border border-white/10 bg-[#121826]/40 backdrop-blur-3xl shadow-2xl mt-4"
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

                {/* Real-Time Waveform Sparklines */}
                <div className="col-span-1 md:col-span-3 flex flex-wrap gap-3 pt-2">
                  <TelemetrySparkline 
                    data={drTelemetry.historyRpoMs}
                    color={chaosActive ? '#FF3B30' : '#00FF9D'}
                    fillId="rpoGrad"
                    label="Continuous RPO Latency Stream"
                    currentValue={`${drTelemetry.replicationLagMs}`}
                    unit="ms lag"
                  />
                  <TelemetrySparkline 
                    data={drTelemetry.historyThroughput}
                    color="#00F0FF"
                    fillId="tputGrad"
                    label="eBPF Encrypted Ingress Throughput"
                    currentValue={`${drTelemetry.ingressThroughputGbps}`}
                    unit="Gbps"
                  />
                </div>

                {/* Failover Interaction Zone */}
                <div className="col-span-1 md:col-span-3 mt-4 flex flex-col items-center justify-center py-6 border-t border-white/5 relative overflow-hidden rounded-2xl">
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
            </>
          ) : (
            /* Sub-Tab 2: Deep-Dive AWS DRS & CloudWatch HUD */
            <AwsDrsHud telemetry={drTelemetry} logs={logs} chaosActive={chaosActive} />
          )}
        </main>
      )}

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
              <p className="text-xs text-zinc-400 mb-4">
                AetherVault is fully mobile-optimized. Scan this QR code with any smartphone camera to launch the live 3D failover command center and executive pitch deck.
              </p>

              {/* QR Code Graphic pointing to GitHub Pages Live Site */}
              <div className="w-52 h-52 mx-auto bg-white p-3 rounded-2xl flex flex-col items-center justify-center mb-4 shadow-xl">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://anwozo157.github.io/AetherVault/" 
                  alt="AetherVault Live Mobile QR Code"
                  className="w-44 h-44 object-contain"
                />
              </div>

              <div className="mb-5 text-center">
                <a 
                  href="https://anwozo157.github.io/AetherVault/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-mono text-[#00F0FF] underline hover:text-white"
                >
                  https://anwozo157.github.io/AetherVault/
                </a>
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
      <footer className="w-full max-w-5xl z-10 py-4 mt-6 text-center text-xs font-mono text-zinc-600 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
        <span>AetherVault Platform • Zero-Trust Cloud Resilience</span>
        <span>Aegis Core Labs • Founded by Antonio Nwozo</span>
      </footer>
    </div>
  );
}

function MetricCard({ label, value, color, icon }: { label: string; value: string | number; color: string; icon: React.ReactNode }) {
  return (
    <motion.div 
      layout
      className="flex flex-col items-start p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-2xl border border-white/5"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-[11px] text-gray-500 uppercase tracking-widest font-mono">{label}</span>
      </div>
      <span className={`text-2xl sm:text-3xl font-mono font-medium tracking-tight ${color}`}>
        {value}
      </span>
    </motion.div>
  );
}
