import { Flame, HardDrive, Layers, ScrollText } from 'lucide-react';
import { TARGET_REGIONS } from '../../config/regions';

export type CommandTab = 'hud' | 'drs' | 'audit';

interface ControlBarProps {
  tab: CommandTab;
  onTabChange: (tab: CommandTab) => void;
  targetRegion: string;
  onTargetRegionChange: (region: string) => void;
  regionLocked: boolean;
  chaosActive: boolean;
  onToggleChaos: () => void;
  /** Show the Audit Log tab (server-backed providers only). */
  showAudit?: boolean;
}

export default function ControlBar({
  tab,
  onTabChange,
  targetRegion,
  onTargetRegionChange,
  regionLocked,
  chaosActive,
  onToggleChaos,
  showAudit = false,
}: ControlBarProps) {
  const tabClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
      active ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
    }`;

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
      <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/10">
        <button
          onClick={() => onTabChange('hud')}
          aria-pressed={tab === 'hud'}
          className={tabClass(tab === 'hud')}
        >
          <Layers className="w-3.5 h-3.5 text-aether-cyan" />
          <span>3D Global HUD</span>
        </button>
        <button
          onClick={() => onTabChange('drs')}
          aria-pressed={tab === 'drs'}
          className={tabClass(tab === 'drs')}
        >
          <HardDrive className="w-3.5 h-3.5 text-aether-green" />
          <span>AWS DRS & Telemetry</span>
        </button>
        {showAudit && (
          <button
            onClick={() => onTabChange('audit')}
            aria-pressed={tab === 'audit'}
            className={tabClass(tab === 'audit')}
          >
            <ScrollText className="w-3.5 h-3.5 text-aether-amber" />
            <span>Audit Log</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <select
          value={targetRegion}
          onChange={(e) => onTargetRegionChange(e.target.value)}
          disabled={regionLocked}
          aria-label="Failover target region"
          className="bg-aether-panel border border-white/10 rounded-lg px-2.5 py-1.5 text-zinc-200 font-mono text-xs focus:outline-none focus:border-aether-cyan/50 disabled:opacity-50 cursor-pointer"
        >
          {TARGET_REGIONS.map((region) => (
            <option key={region.id} value={region.id}>
              {region.label}
            </option>
          ))}
        </select>

        <button
          onClick={onToggleChaos}
          aria-pressed={chaosActive}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
            chaosActive
              ? 'bg-red-500/20 border-red-500/50 text-red-300 shadow-[0_0_15px_rgba(255,59,48,0.3)] animate-pulse'
              : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${chaosActive ? 'text-red-400' : 'text-zinc-500'}`} />
          <span className="hidden sm:inline">
            {chaosActive ? 'Chaos Active' : 'SDET Chaos Mode'}
          </span>
          <span className="sm:hidden">{chaosActive ? 'Chaos On' : 'Chaos'}</span>
        </button>
      </div>
    </div>
  );
}
