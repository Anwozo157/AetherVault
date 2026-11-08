// Simulated disaster-recovery provider. Generates realistic-looking telemetry
// in the browser for demos. Nothing here talks to real infrastructure.

import {
  BasicMetrics,
  DrProvider,
  DrTelemetry,
  LogEvent,
  SystemState,
  Unsubscribe,
  canTransition,
  isAbortable,
} from '../domain/dr';

const MAX_LOGS = 50;

export class MockDrProvider implements DrProvider {
  readonly name = 'Simulated Demo';
  readonly isSimulated = true;
  readonly telemetryIsSimulated = true;

  private currentState: SystemState = SystemState.IDLE;
  private stateListeners = new Set<(state: SystemState) => void>();
  private metricsListeners = new Set<(metrics: BasicMetrics) => void>();
  private drTelemetryListeners = new Set<(telemetry: DrTelemetry) => void>();
  private logListeners = new Set<(log: LogEvent) => void>();
  private currentMetrics: BasicMetrics = { rpo: '0.0s', rto: '--', sync: 100 };
  private recentLogs: LogEvent[] = [];
  /** Incremented on abort so an in-flight failover knows to stop. */
  private runId = 0;
  private pendingDelay: { timer: ReturnType<typeof setTimeout>; resolve: () => void } | null = null;
  private metricsInterval: ReturnType<typeof setInterval> | null = null;
  private isChaos = false;

  private currentTelemetry: DrTelemetry = {
    drsAgentStatus: 'HEALTHY',
    stagingDisksInSync: 12,
    totalStagingDisks: 12,
    replicationLagMs: 24,
    continuousDataBacklogBytes: 0,
    lastSnapshotTimestamp: new Date().toLocaleTimeString(),
    pitLogRetentionHours: 72,
    cloudWatchCanarySla: 99.998,
    cloudWatchP99LatencyMs: 3.8,
    cloudWatchAlarmsOk: 18,
    cloudWatchAlarmsTriggered: 0,
    ingressThroughputGbps: 4.82,
    ebpfProbesAttached: 32,
    historyRpoMs: [22, 25, 21, 28, 24, 26, 23, 27, 25, 24, 22, 23, 25, 24, 21, 23, 26, 24, 22, 24],
    historyThroughput: [
      4.7, 4.8, 4.9, 4.8, 4.85, 4.79, 4.82, 4.88, 4.81, 4.84, 4.78, 4.85, 4.9, 4.83, 4.82, 4.87,
      4.81, 4.85, 4.82, 4.84,
    ],
  };

  constructor() {
    this.pushLog('INFO', 'DRS', 'Continuous replication journal attached to volume pool');
    this.pushLog('INFO', 'CLOUDWATCH', 'Canary probe OK: 99.998% availability');
    this.pushLog('SUCCESS', 'CORE', 'AetherVault ready for failover');
    this.startTelemetryStream();
  }

  public setChaosMode(enabled: boolean) {
    this.isChaos = enabled;
    if (enabled) {
      this.pushLog(
        'WARN',
        'DRS',
        'Chaos injection active: artificial packet jitter & network delay simulated',
      );
    } else {
      this.pushLog(
        'INFO',
        'DRS',
        'Chaos mode deactivated. Continuous replication returning to nominal baseline',
      );
    }
  }

  private startTelemetryStream() {
    this.metricsInterval = setInterval(() => {
      this.tickTelemetry();
    }, 1000);
  }

  private tickTelemetry() {
    if (this.currentState === SystemState.IDLE) {
      // Simulate real-time replication lag fluctuations
      const baseLag = this.isChaos
        ? Math.floor(Math.random() * 120 + 85)
        : Math.floor(Math.random() * 15 + 18);
      const throughput = this.isChaos
        ? +(Math.random() * 1.5 + 2.1).toFixed(2)
        : +(Math.random() * 0.4 + 4.65).toFixed(2);

      const updatedRpoHistory = [...this.currentTelemetry.historyRpoMs.slice(1), baseLag];
      const updatedTputHistory = [...this.currentTelemetry.historyThroughput.slice(1), throughput];

      this.currentTelemetry = {
        ...this.currentTelemetry,
        drsAgentStatus: this.isChaos ? 'SYNCHRONIZING' : 'HEALTHY',
        replicationLagMs: baseLag,
        continuousDataBacklogBytes: this.isChaos ? Math.floor(Math.random() * 520000 + 120000) : 0,
        cloudWatchCanarySla: this.isChaos ? 99.842 : 99.998,
        cloudWatchP99LatencyMs: this.isChaos
          ? +(Math.random() * 45 + 50).toFixed(1)
          : +(Math.random() * 0.8 + 3.4).toFixed(1),
        cloudWatchAlarmsTriggered: this.isChaos ? 2 : 0,
        ingressThroughputGbps: throughput,
        stagingDisksInSync: this.isChaos ? 10 : 12,
        historyRpoMs: updatedRpoHistory,
        historyThroughput: updatedTputHistory,
      };

      // Emit standard basic metrics
      this.emitMetrics({
        rpo: this.isChaos ? `${(baseLag / 100).toFixed(2)}s` : `${(baseLag / 1000).toFixed(2)}s`,
        rto: '--',
        sync: this.isChaos ? 88 : 100,
      });

      this.emitDrTelemetry(this.currentTelemetry);

      // Periodically generate realistic background audit events
      if (Math.random() > 0.7) {
        this.emitRandomAuditEvent();
      }
    }
  }

  private emitRandomAuditEvent() {
    const events: Array<{ level: LogEvent['level']; service: LogEvent['service']; msg: string }> = [
      {
        level: 'INFO',
        service: 'DRS',
        msg: 'Block-level continuous delta: 18.4 MB mirrored to staging EBS gp3 volume',
      },
      {
        level: 'INFO',
        service: 'CLOUDWATCH',
        msg: 'Canary probe health check passed: us-east-1 -> target heartbeat 3.8ms',
      },
      {
        level: 'INFO',
        service: 'EBPF',
        msg: 'eBPF TC egress filter re-balanced: 0 dropped packets across 32 stream pipelines',
      },
      {
        level: 'SUCCESS',
        service: 'CORE',
        msg: 'Continuous Data Protection (CDP) checkpoint logged to journal index',
      },
      {
        level: 'INFO',
        service: 'ROUTE53',
        msg: 'DNS health probe returned status ALIVE for primary ingress endpoint',
      },
    ];
    const picked = events[Math.floor(Math.random() * events.length)];
    this.pushLog(picked.level, picked.service, picked.msg);
  }

  private pushLog(level: LogEvent['level'], service: LogEvent['service'], message: string) {
    const log: LogEvent = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      service,
      message,
    };
    this.recentLogs = [...this.recentLogs.slice(-(MAX_LOGS - 1)), log];
    this.logListeners.forEach((listener) => listener(log));
  }

  public async triggerFailover(sourceRegion: string, targetRegion: string): Promise<void> {
    if (this.currentState !== SystemState.IDLE) return;
    const run = ++this.runId;

    this.pushLog(
      'WARN',
      'CORE',
      `🚨 MANUAL FAILOVER INITIATED: Route cutover requested from ${sourceRegion} to ${targetRegion}`,
    );
    this.updateState(SystemState.REPLICATING);

    // T+1.2s: Quiesce & Snapshot
    if (!(await this.step(1200, run))) return;
    this.pushLog(
      'INFO',
      'DRS',
      'Quiesce signal acknowledged. Final continuous journal flush completed.',
    );
    this.updateState(SystemState.FAILOVER_TRIGGERED);
    this.emitMetrics({ rpo: '0.0s', rto: '1.2s', sync: 85 });

    // T+3.5s: Target Storage Hydration
    if (!(await this.step(2300, run))) return;
    this.pushLog(
      'INFO',
      'DRS',
      'Staging volumes cloned into target network. Launch template triggered.',
    );
    this.emitMetrics({ rpo: '0.0s', rto: '3.5s', sync: 95 });

    // T+5.5s: Traffic Cutover (point of no return: abort no longer allowed)
    this.updateState(SystemState.REROUTING_TRAFFIC);
    this.pushLog('WARN', 'ROUTE53', `Rerouting DNS endpoints to target: ${targetRegion}`);
    if (!(await this.step(2000, run))) return;

    this.updateState(SystemState.SECURED);
    this.pushLog(
      'SUCCESS',
      'CORE',
      `✅ FAILOVER COMPLETE: System nominal in target region ${targetRegion}.`,
    );
    this.emitMetrics({ rpo: '< 0.01s', rto: 'COMPLETED', sync: 100 });
  }

  public abortFailover(): boolean {
    if (!isAbortable(this.currentState) || this.currentState === SystemState.IDLE) return false;

    this.runId++;
    this.cancelPendingDelay();
    this.updateState(SystemState.IDLE);
    this.pushLog(
      'WARN',
      'CORE',
      'Failover aborted by operator before traffic cutover. Primary region remains active.',
    );
    this.emitMetrics({ rpo: '0.0s', rto: '--', sync: 100 });
    return true;
  }

  /** Return a secured system to standby so the failover can be demoed again. */
  public resetToStandby() {
    if (this.currentState !== SystemState.SECURED) return;

    this.updateState(SystemState.IDLE);
    this.pushLog(
      'INFO',
      'CORE',
      'Failover drill reset. Continuous replication resumed from primary region.',
    );
    this.emitMetrics({ rpo: '0.0s', rto: '--', sync: 100 });
  }

  /** Stop background telemetry timers. Call when the backend is no longer needed. */
  public dispose() {
    this.runId++;
    this.cancelPendingDelay();
    if (this.metricsInterval) {
      clearInterval(this.metricsInterval);
      this.metricsInterval = null;
    }
  }

  public getState() {
    return this.currentState;
  }

  public getMetrics() {
    return this.currentMetrics;
  }

  public getTelemetry() {
    return this.currentTelemetry;
  }

  public getRecentLogs() {
    return [...this.recentLogs];
  }

  public onStateChange(listener: (state: SystemState) => void): Unsubscribe {
    this.stateListeners.add(listener);
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  public onMetricsUpdate(listener: (metrics: BasicMetrics) => void): Unsubscribe {
    this.metricsListeners.add(listener);
    return () => {
      this.metricsListeners.delete(listener);
    };
  }

  public onDrTelemetryUpdate(listener: (telemetry: DrTelemetry) => void): Unsubscribe {
    this.drTelemetryListeners.add(listener);
    // Send immediate initial state
    listener(this.currentTelemetry);
    return () => {
      this.drTelemetryListeners.delete(listener);
    };
  }

  public onLogEvent(listener: (log: LogEvent) => void): Unsubscribe {
    this.logListeners.add(listener);
    return () => {
      this.logListeners.delete(listener);
    };
  }

  private updateState(newState: SystemState) {
    if (!canTransition(this.currentState, newState)) {
      console.error(`Rejected invalid transition ${this.currentState} -> ${newState}`);
      return;
    }
    this.currentState = newState;
    this.stateListeners.forEach((listener) => listener(newState));
  }

  private emitMetrics(metrics: BasicMetrics) {
    this.currentMetrics = metrics;
    this.metricsListeners.forEach((listener) => listener(metrics));
  }

  private emitDrTelemetry(telemetry: DrTelemetry) {
    this.drTelemetryListeners.forEach((listener) => listener(telemetry));
  }

  /** Waits ms; resolves false if the run was aborted in the meantime. */
  private async step(ms: number, run: number): Promise<boolean> {
    await new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        this.pendingDelay = null;
        resolve();
      }, ms);
      this.pendingDelay = { timer, resolve };
    });
    return run === this.runId;
  }

  private cancelPendingDelay() {
    if (this.pendingDelay) {
      clearTimeout(this.pendingDelay.timer);
      this.pendingDelay.resolve();
      this.pendingDelay = null;
    }
  }
}
