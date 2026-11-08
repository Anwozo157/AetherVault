// ==========================================
// 1. BACKEND STATE MACHINE & ENTERPRISE TELEMETRY STREAM
// ==========================================

export enum SystemState {
  IDLE = 'ACTIVE_SYNC',
  REPLICATING = 'QUIESCE_AND_SNAPSHOT',
  FAILOVER_TRIGGERED = 'HYDRATING_TARGET',
  REROUTING_TRAFFIC = 'DNS_CUTOVER',
  SECURED = 'TARGET_SECURED',
  DEGRADED = 'DEGRADED_STATE'
}

export interface BasicMetrics {
  rpo: string;
  rto: string;
  sync: number;
}

export interface DrTelemetry {
  // AWS DRS Subsystem
  drsAgentStatus: 'HEALTHY' | 'SYNCHRONIZING' | 'THROTTLED';
  stagingDisksInSync: number;
  totalStagingDisks: number;
  replicationLagMs: number;
  continuousDataBacklogBytes: number;
  lastSnapshotTimestamp: string;
  pitLogRetentionHours: number;

  // AWS CloudWatch Synthetic & Metric Feed
  cloudWatchCanarySla: number;
  cloudWatchP99LatencyMs: number;
  cloudWatchAlarmsOk: number;
  cloudWatchAlarmsTriggered: number;
  ingressThroughputGbps: number;
  ebpfProbesAttached: number;

  // Sparkline rolling data points (20 samples)
  historyRpoMs: number[];
  historyThroughput: number[];
}

export interface LogEvent {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'CRIT' | 'DRS';
  service: 'DRS' | 'CLOUDWATCH' | 'EBPF' | 'ROUTE53' | 'CORE';
  message: string;
}

export type StateListener = (state: SystemState) => void;
export type MetricsListener = (metrics: BasicMetrics) => void;
export type DrTelemetryListener = (telemetry: DrTelemetry) => void;
export type LogListener = (log: LogEvent) => void;

export class DisasterRecoveryBackend {
  private currentState: SystemState = SystemState.IDLE;
  private stateListeners: Set<StateListener> = new Set();
  private metricsListeners: Set<MetricsListener> = new Set();
  private drTelemetryListeners: Set<DrTelemetryListener> = new Set();
  private logListeners: Set<LogListener> = new Set();
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
    historyThroughput: [4.7, 4.8, 4.9, 4.8, 4.85, 4.79, 4.82, 4.88, 4.81, 4.84, 4.78, 4.85, 4.9, 4.83, 4.82, 4.87, 4.81, 4.85, 4.82, 4.84]
  };

  constructor() {
    this.startTelemetryStream();
  }

  public setChaosMode(enabled: boolean) {
    this.isChaos = enabled;
    if (enabled) {
      this.pushLog('WARN', 'DRS', 'Chaos injection active: artificial packet jitter & network delay simulated');
    } else {
      this.pushLog('INFO', 'DRS', 'Chaos mode deactivated. Continuous replication returning to nominal baseline');
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
      let baseLag = this.isChaos ? Math.floor(Math.random() * 120 + 85) : Math.floor(Math.random() * 15 + 18);
      let throughput = this.isChaos 
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
        cloudWatchP99LatencyMs: this.isChaos ? +(Math.random() * 45 + 50).toFixed(1) : +(Math.random() * 0.8 + 3.4).toFixed(1),
        cloudWatchAlarmsTriggered: this.isChaos ? 2 : 0,
        ingressThroughputGbps: throughput,
        stagingDisksInSync: this.isChaos ? 10 : 12,
        historyRpoMs: updatedRpoHistory,
        historyThroughput: updatedTputHistory
      };

      // Emit standard basic metrics
      this.emitMetrics({
        rpo: this.isChaos ? `${(baseLag / 100).toFixed(2)}s` : `${(baseLag / 1000).toFixed(2)}s`,
        rto: '--',
        sync: this.isChaos ? 88 : 100
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
      { level: 'INFO', service: 'DRS', msg: 'Block-level continuous delta: 18.4 MB mirrored to staging EBS gp3 volume' },
      { level: 'INFO', service: 'CLOUDWATCH', msg: 'Canary probe health check passed: us-east-1 -> target heartbeat 3.8ms' },
      { level: 'INFO', service: 'EBPF', msg: 'eBPF TC egress filter re-balanced: 0 dropped packets across 32 stream pipelines' },
      { level: 'SUCCESS', service: 'CORE', msg: 'Continuous Data Protection (CDP) checkpoint logged to journal index' },
      { level: 'INFO', service: 'ROUTE53', msg: 'DNS health probe returned status ALIVE for primary ingress endpoint' }
    ];
    const picked = events[Math.floor(Math.random() * events.length)];
    this.pushLog(picked.level, picked.service, picked.msg);
  }

  public pushLog(level: LogEvent['level'], service: LogEvent['service'], message: string) {
    const log: LogEvent = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      level,
      service,
      message
    };
    this.logListeners.forEach(listener => listener(log));
  }

  public async triggerFailover(sourceRegion: string, targetRegion: string) {
    if (this.currentState !== SystemState.IDLE) return;

    this.pushLog('WARN', 'CORE', `🚨 MANUAL FAILOVER INITIATED: Route cutover requested to ${targetRegion}`);
    this.updateState(SystemState.REPLICATING);

    // T+1.2s: Quiesce & Snapshot
    await this.delay(1200);
    this.pushLog('INFO', 'DRS', `Quiesce signal acknowledged. Final continuous journal flush completed.`);
    this.updateState(SystemState.FAILOVER_TRIGGERED);
    this.emitMetrics({ rpo: '0.0s', rto: '1.2s', sync: 85 });

    // T+3.5s: Target Storage Hydration
    await this.delay(2300);
    this.pushLog('INFO', 'DRS', `EBS staging volumes cloned into target VPC. EC2 launch template triggered.`);
    this.emitMetrics({ rpo: '0.0s', rto: '3.5s', sync: 95 });

    // T+5.5s: Traffic Cutover
    this.updateState(SystemState.REROUTING_TRAFFIC);
    this.pushLog('WARN', 'ROUTE53', `Rerouting BGP / DNS Anycast endpoints to target: ${targetRegion}`);
    await this.delay(2000);

    this.updateState(SystemState.SECURED);
    this.pushLog('SUCCESS', 'CORE', `✅ FAILOVER COMPLETE: System nominal in target region ${targetRegion}. Zero data loss.`);
    this.emitMetrics({ rpo: '< 0.01s', rto: 'COMPLETED', sync: 100 });
  }

  public onStateChange(listener: StateListener) {
    this.stateListeners.add(listener);
    return () => this.stateListeners.delete(listener);
  }

  public onMetricsUpdate(listener: MetricsListener) {
    this.metricsListeners.add(listener);
    return () => this.metricsListeners.delete(listener);
  }

  public onDrTelemetryUpdate(listener: DrTelemetryListener) {
    this.drTelemetryListeners.add(listener);
    // Send immediate initial state
    listener(this.currentTelemetry);
    return () => this.drTelemetryListeners.delete(listener);
  }

  public onLogEvent(listener: LogListener) {
    this.logListeners.add(listener);
    return () => this.logListeners.delete(listener);
  }

  private updateState(newState: SystemState) {
    this.currentState = newState;
    this.stateListeners.forEach(listener => listener(newState));
  }

  private emitMetrics(metrics: BasicMetrics) {
    this.metricsListeners.forEach(listener => listener(metrics));
  }

  private emitDrTelemetry(telemetry: DrTelemetry) {
    this.drTelemetryListeners.forEach(listener => listener(telemetry));
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const backend = new DisasterRecoveryBackend();
