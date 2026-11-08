import { Database, Radio, Bell, Activity, HardDrive } from 'lucide-react';
import { DrTelemetry, LogEvent } from './MockBackend';

interface AwsDrsHudProps {
  telemetry: DrTelemetry;
  logs: LogEvent[];
  chaosActive: boolean;
}

export default function AwsDrsHud({ telemetry, logs, chaosActive }: AwsDrsHudProps) {
  // 12 simulated EBS gp3 replica disks
  const disks = Array.from({ length: telemetry.totalStagingDisks }, (_, i) => ({
    id: `vol-${(1000 + i * 42).toString(16)}`,
    inSync: i < telemetry.stagingDisksInSync,
    size: '500 GB gp3',
  }));

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      {/* Subsystems Overview Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* DRS Agent Health */}
        <div className="bg-[#0B0F17]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl ${chaosActive ? 'bg-amber-500/10 text-amber-400' : 'bg-[#00FF9D]/10 text-[#00FF9D]'}`}
          >
            <Database className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              AWS DRS Agent
            </p>
            <p
              className={`text-sm font-mono font-semibold ${chaosActive ? 'text-amber-400' : 'text-[#00FF9D]'}`}
            >
              {telemetry.drsAgentStatus}
            </p>
            <p className="text-[10px] font-mono text-zinc-500">v4.2.1-RELEASE</p>
          </div>
        </div>

        {/* CloudWatch SLA */}
        <div className="bg-[#0B0F17]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              CloudWatch Canary
            </p>
            <p className="text-sm font-mono font-semibold text-[#00F0FF]">
              {telemetry.cloudWatchCanarySla}%
            </p>
            <p className="text-[10px] font-mono text-zinc-500">
              P99: {telemetry.cloudWatchP99LatencyMs}ms
            </p>
          </div>
        </div>

        {/* Staging Disk Pool */}
        <div className="bg-[#0B0F17]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              EBS Replica Disks
            </p>
            <p className="text-sm font-mono font-semibold text-purple-300">
              {telemetry.stagingDisksInSync} / {telemetry.totalStagingDisks} Synced
            </p>
            <p className="text-[10px] font-mono text-zinc-500">6.0 TB gp3 Total</p>
          </div>
        </div>

        {/* CloudWatch Alarms */}
        <div className="bg-[#0B0F17]/80 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl ${chaosActive ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}
          >
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              CloudWatch Alarms
            </p>
            <p className="text-sm font-mono font-semibold text-white">
              {telemetry.cloudWatchAlarmsTriggered > 0 ? (
                <span className="text-red-400">
                  {telemetry.cloudWatchAlarmsTriggered} Triggered
                </span>
              ) : (
                <span className="text-emerald-400">0 Alarms Active</span>
              )}
            </p>
            <p className="text-[10px] font-mono text-zinc-500">
              {telemetry.cloudWatchAlarmsOk} Metric Probes OK
            </p>
          </div>
        </div>
      </div>

      {/* Deep-Dive Grid: Staging Volume Matrix & Real-Time Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* AWS DRS Block Storage Matrix (5 Cols) */}
        <div className="lg:col-span-5 bg-[#0B0F17]/80 border border-white/5 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
              <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#00F0FF]" />
                AWS DRS Staging Storage Pool
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                PIT Retention: {telemetry.pitLogRetentionHours}h
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
              Block-level continuous replication mirrors OS & DB data journals directly into target
              AWS VPC staging volumes without server compute costs.
            </p>

            {/* Volume Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-3">
              {disks.map((disk) => (
                <div
                  key={disk.id}
                  className={`p-2 rounded-lg border text-center transition-colors ${
                    disk.inSync
                      ? 'bg-[#00FF9D]/5 border-[#00FF9D]/20 text-zinc-200'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-300 animate-pulse'
                  }`}
                >
                  <p className="text-[10px] font-mono font-bold truncate">{disk.id}</p>
                  <p className="text-[9px] font-mono text-zinc-500">{disk.size}</p>
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full mt-1 ${disk.inSync ? 'bg-[#00FF9D]' : 'bg-amber-400'}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between pt-2 border-t border-white/5">
            <span>
              Backlog:{' '}
              {telemetry.continuousDataBacklogBytes === 0
                ? '0 B (Real-Time)'
                : `${(telemetry.continuousDataBacklogBytes / 1024).toFixed(1)} KB`}
            </span>
            <span className="text-[#00FF9D]">100% Zero-Trust Encrypted</span>
          </div>
        </div>

        {/* Real-Time Security & Telemetry Audit Log (7 Cols) */}
        <div className="lg:col-span-7 bg-[#0B0F17]/80 border border-white/5 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
            <span className="text-xs font-mono font-semibold text-zinc-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00FF9D]" />
              Live Replication & Audit Stream
            </span>
            <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-ping" />
              STREAMING
            </span>
          </div>

          {/* Scrolling Monospace Terminal */}
          <div className="h-48 overflow-y-auto font-mono text-[11px] space-y-1.5 pr-1 select-text scrollbar-thin">
            {logs
              .slice(-8)
              .reverse()
              .map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-2 py-0.5 border-b border-white/[0.02]"
                >
                  <span className="text-zinc-500 text-[10px] whitespace-nowrap">
                    {log.timestamp}
                  </span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold whitespace-nowrap ${
                      log.level === 'SUCCESS'
                        ? 'bg-[#00FF9D]/20 text-[#00FF9D]'
                        : log.level === 'WARN'
                          ? 'bg-amber-500/20 text-amber-400'
                          : log.level === 'CRIT'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-white/10 text-[#00F0FF]'
                    }`}
                  >
                    {log.service}
                  </span>
                  <span className="text-zinc-300 leading-snug">{log.message}</span>
                </div>
              ))}
          </div>

          <div className="mt-2 pt-2 border-t border-white/5 text-[10px] font-mono text-zinc-500 flex justify-between">
            <span>Kernel eBPF: {telemetry.ebpfProbesAttached} Probes Active</span>
            <span>AWS CloudWatch Logs: Continuous</span>
          </div>
        </div>
      </div>
    </div>
  );
}
