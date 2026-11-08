import { Presentation, ShieldCheck, Smartphone, Volume2, VolumeX } from 'lucide-react';

export type AppMode = 'command' | 'deck';

interface AppHeaderProps {
  mode: AppMode;
  onModeChange: (mode: AppMode) => void;
  isMuted: boolean;
  onToggleSound: () => void;
  onShare: () => void;
  isSimulated: boolean;
}

export default function AppHeader({
  mode,
  onModeChange,
  isMuted,
  onToggleSound,
  onShare,
  isSimulated,
}: AppHeaderProps) {
  return (
    <header className="w-full max-w-5xl z-20 flex flex-wrap items-center justify-between gap-3 py-3 sm:py-4 mb-2 border-b border-white/5">
      <div className="flex items-center gap-3">
        <img
          src="./aethervault-logo.jpeg"
          alt="AetherVault Logo"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-2xl border border-white/20"
        />
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
              AetherVault
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-aether-cyan">
              ENTERPRISE DR
            </span>
            {isSimulated && (
              <span
                title="All data on this page is generated in your browser for demonstration. No real infrastructure is connected."
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-aether-amber/10 border border-aether-amber/30 text-aether-amber"
              >
                SIMULATED DATA
              </span>
            )}
          </div>
          <p className="text-[11px] font-mono text-zinc-400">by Aegis Core Labs</p>
        </div>
      </div>

      {/* Mode Switcher: Mission Control vs Investor Deck */}
      <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
        <button
          onClick={() => onModeChange('command')}
          aria-pressed={mode === 'command'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === 'command'
              ? 'bg-aether-cyan/15 text-aether-cyan font-semibold border border-aether-cyan/30 shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Mission Control</span>
        </button>
        <button
          onClick={() => onModeChange('deck')}
          aria-pressed={mode === 'deck'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            mode === 'deck'
              ? 'bg-gradient-to-r from-aether-cyan/20 to-aether-green/20 text-aether-green font-semibold border border-aether-green/30 shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>Investor Deck</span>
        </button>
      </div>

      {/* Actions: Audio & Share */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSound}
          title={isMuted ? 'Unmute Synthesizer Audio' : 'Mute Audio'}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          className="p-2 sm:p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-aether-cyan" />
          )}
        </button>

        <button
          onClick={onShare}
          aria-label="Share on phone"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
        >
          <Smartphone className="w-4 h-4 text-aether-green" />
          <span className="hidden sm:inline">Share on Phone</span>
        </button>
      </div>
    </header>
  );
}
