// Domain model for AetherVault disaster recovery.
// The UI depends only on these types and the DrProvider interface, never on a
// concrete provider. MockDrProvider implements it today; real cloud providers
// (e.g. AWS Elastic Disaster Recovery) will implement the same contract later.

export enum SystemState {
  IDLE = 'ACTIVE_SYNC',
  REPLICATING = 'QUIESCE_AND_SNAPSHOT',
  FAILOVER_TRIGGERED = 'HYDRATING_TARGET',
  REROUTING_TRAFFIC = 'DNS_CUTOVER',
  SECURED = 'TARGET_SECURED',
  DEGRADED = 'DEGRADED_STATE',
}

/**
 * Allowed failover state transitions. Providers must reject anything else.
 * Abort (back to IDLE) is only allowed before traffic is rerouted: once DNS
 * cutover starts, rolling back is a separate failback operation.
 */
export const ALLOWED_TRANSITIONS: Readonly<Record<SystemState, readonly SystemState[]>> = {
  [SystemState.IDLE]: [SystemState.REPLICATING, SystemState.DEGRADED],
  [SystemState.REPLICATING]: [SystemState.FAILOVER_TRIGGERED, SystemState.IDLE],
  [SystemState.FAILOVER_TRIGGERED]: [SystemState.REROUTING_TRAFFIC, SystemState.IDLE],
  [SystemState.REROUTING_TRAFFIC]: [SystemState.SECURED],
  [SystemState.SECURED]: [SystemState.IDLE],
  [SystemState.DEGRADED]: [SystemState.IDLE],
};

export function canTransition(from: SystemState, to: SystemState): boolean {
  return ALLOWED_TRANSITIONS[from].includes(to);
}

/** States in which an in-flight failover can still be safely aborted. */
export function isAbortable(state: SystemState): boolean {
  return canTransition(state, SystemState.IDLE) && state !== SystemState.SECURED;
}

export interface BasicMetrics {
  rpo: string;
  rto: string;
  sync: number;
}

export interface DrTelemetry {
  // Replication subsystem
  drsAgentStatus: 'HEALTHY' | 'SYNCHRONIZING' | 'THROTTLED';
  stagingDisksInSync: number;
  totalStagingDisks: number;
  replicationLagMs: number;
  continuousDataBacklogBytes: number;
  lastSnapshotTimestamp: string;
  pitLogRetentionHours: number;

  // Monitoring feed
  cloudWatchCanarySla: number;
  cloudWatchP99LatencyMs: number;
  cloudWatchAlarmsOk: number;
  cloudWatchAlarmsTriggered: number;
  ingressThroughputGbps: number;
  ebpfProbesAttached: number;

  // Rolling sparkline samples (20 points)
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

export type Unsubscribe = () => void;

export type MemberRole = 'viewer' | 'operator' | 'approver' | 'admin';

/** A failover run as seen by a server-backed provider (two-person approval). */
export interface FailoverRun {
  id: string;
  sourceRegion: string;
  targetRegion: string;
  requestedByEmail: string | null;
  requestedByMe: boolean;
  requestedAt: string;
  approvedByEmail: string | null;
  approvedAt: string | null;
  /** True until a second person (approver or admin) approves the request. */
  pendingApproval: boolean;
}

/**
 * Optional capability for providers that enforce two-person approval
 * (e.g. the Supabase backend). The simulated demo does not implement it.
 */
export interface ApprovalCapability {
  readonly role: MemberRole;
  /** The organization's open run, or null when none is open. */
  getRun(): FailoverRun | null;
  onRunChange(listener: (run: FailoverRun | null) => void): Unsubscribe;
  canRequest(): boolean;
  /** True when this user may approve the current pending run (role and not the requester). */
  canApprove(): boolean;
  approve(): Promise<void>;
  /** Withdraws a pending request (or aborts before cutover). */
  cancel(): Promise<void>;
}

/** One entry of a tamper-evident audit log. */
export interface AuditRecord {
  id: number;
  actorEmail: string | null;
  action: string;
  detail: Record<string, unknown>;
  createdAt: string;
  prevHash: string;
  hash: string;
}

export interface ChainReport {
  ok: boolean;
  /** First entry whose hash does not verify, when `ok` is false. */
  brokenId: number | null;
  checked: number;
  headHash: string | null;
  verifiedAt: string;
}

/** Optional capability: a server-side, hash-chained audit log (not in the simulated demo). */
export interface AuditCapability {
  /** Newest first; pass the oldest id you have as `before` to load the next page. */
  list(options?: { limit?: number; before?: number }): Promise<AuditRecord[]>;
  /** Recomputes the hash chain on the server. */
  verify(): Promise<ChainReport>;
}

export interface TeamMember {
  userId: string;
  email: string;
  role: MemberRole;
  joinedAt: string;
  isMe: boolean;
}

export interface TeamInvite {
  id: string;
  email: string;
  role: MemberRole;
  invitedByEmail: string | null;
  createdAt: string;
}

/** Optional capability: organization membership management (server-backed providers). */
export interface TeamCapability {
  readonly orgId: string;
  readonly orgName: string;
  readonly myRole: MemberRole;
  listMembers(): Promise<TeamMember[]>;
  /** Admins only. */
  listInvites(): Promise<TeamInvite[]>;
  invite(email: string, role: MemberRole): Promise<void>;
  revokeInvite(id: string): Promise<void>;
  setRole(userId: string, role: MemberRole): Promise<void>;
  remove(userId: string): Promise<void>;
}

export interface RecoveryObjectives {
  rtoSeconds: number;
  rpoSeconds: number;
}

export type RunOutcome = 'pending' | 'in_progress' | 'secured' | 'aborted' | 'withdrawn';

/** A real failover (two-person approval) or a non-disruptive drill (isolated, no cutover). */
export type RunKind = 'failover' | 'drill';
export type DrillTrigger = 'scheduled' | 'manual';
export type DrillCadence = 'weekly' | 'monthly' | 'quarterly';

export interface DrillSchedule {
  cadence: DrillCadence;
  nextRunAt: string;
  lastRunAt: string | null;
  sourceRegion: string;
  targetRegion: string;
  enabled: boolean;
}

export interface RunSummary {
  id: string;
  kind: RunKind;
  trigger: DrillTrigger | null;
  sourceRegion: string;
  targetRegion: string;
  requestedByEmail: string | null;
  requestedAt: string;
  approvedByEmail: string | null;
  approvedAt: string | null;
  outcome: RunOutcome;
  recoverySeconds: number | null;
  rtoTargetSeconds: number;
}

/** Evidence record for one failover drill (server-generated; see drill_evidence()). */
export interface DrillEvidence {
  report_version: number;
  generated_at: string;
  generated_by: string | null;
  organization: { id: string; name: string };
  objectives: { rto_seconds: number; rpo_seconds: number };
  run: {
    id: string;
    /** Present from report_version 2. */
    kind?: RunKind;
    trigger?: DrillTrigger | null;
    source_region: string;
    target_region: string;
    requested_by: string | null;
    requested_at: string;
    approved_by: string | null;
    approved_at: string | null;
    aborted_at: string | null;
    reset_at: string | null;
    outcome: RunOutcome;
    /** null for drills: not required, nothing in production changes. */
    two_person_rule_met: boolean | null;
  };
  timeline: Array<{ stage: string; at: string }>;
  results: {
    decision_seconds: number | null;
    recovery_seconds: number | null;
    rto_met: boolean | null;
    rpo_measured: boolean;
  };
  audit_entries: Array<{
    id: number;
    at: string;
    actor: string | null;
    action: string;
    hash: string;
  }>;
  chain: {
    ok: boolean;
    broken_id: number | null;
    checked: number;
    head_hash: string | null;
    verified_at: string;
  };
}

/** Optional capability: recovery objectives and drill evidence (REL13-BP01/BP03). */
export interface DrillsCapability {
  getObjectives(): Promise<RecoveryObjectives>;
  /** Admins only. */
  setObjectives(objectives: RecoveryObjectives): Promise<void>;
  listRuns(): Promise<RunSummary[]>;
  evidence(runId: string): Promise<DrillEvidence>;
  /** The organization's drill schedule, or null if none was ever set. */
  getSchedule(): Promise<DrillSchedule | null>;
  /** Admins only. Returns the next run time (ISO). */
  setSchedule(schedule: {
    cadence: DrillCadence;
    firstRunAt: string;
    targetRegion: string;
  }): Promise<string>;
  /** Admins only. */
  disableSchedule(): Promise<void>;
  /** Operators and above. Starts a non-disruptive drill now; returns its run id. */
  startDrill(targetRegion: string): Promise<string>;
}

export type AlertChannelKind = 'slack' | 'pagerduty';
/** failover: requested/approved/aborted/reset; drill_failed also covers aborted drills. */
export type AlertEvent = 'failover' | 'drill_failed' | 'drill_passed';

export interface AlertChannel {
  id: string;
  kind: AlertChannelKind;
  name: string;
  /** Last 4 characters of the webhook URL or integration key; the secret is never returned. */
  hint: string;
  events: AlertEvent[];
  createdByEmail: string | null;
  createdAt: string;
}

export interface AlertDelivery {
  id: number;
  channelName: string;
  kind: AlertChannelKind;
  event: string;
  title: string;
  status: 'queued' | 'sent' | 'failed';
  httpStatus: number | null;
  error: string | null;
  createdAt: string;
}

/** Optional capability: Slack / PagerDuty alerts on failover and drill events. */
export interface AlertsCapability {
  listChannels(): Promise<AlertChannel[]>;
  listDeliveries(): Promise<AlertDelivery[]>;
  /** Admins only. */
  addChannel(channel: {
    kind: AlertChannelKind;
    name: string;
    secret: string;
    events: AlertEvent[];
  }): Promise<void>;
  /** Admins only. */
  removeChannel(id: string): Promise<void>;
  /** Admins only. */
  sendTest(id: string): Promise<void>;
}

/** Contract every disaster-recovery data source must implement. */
export interface DrProvider {
  /** Human-readable provider name, shown in the UI. */
  readonly name: string;
  /** True when ALL data is generated rather than read from real infrastructure. */
  readonly isSimulated: boolean;
  /** True when replication telemetry (lag, throughput, alarms) is generated. */
  readonly telemetryIsSimulated: boolean;
  /** Present when failovers need a second person's approval. */
  readonly approvals?: ApprovalCapability;
  /** Present when actions are recorded in a verifiable audit log. */
  readonly audit?: AuditCapability;
  /** Present when the organization's members can be managed. */
  readonly team?: TeamCapability;
  /** Present when drills produce evidence reports. */
  readonly drills?: DrillsCapability;
  /** Present when events can be sent to Slack / PagerDuty. */
  readonly alerts?: AlertsCapability;

  getState(): SystemState;
  getMetrics(): BasicMetrics;
  getTelemetry(): DrTelemetry;
  /** Most recent log events, oldest first. */
  getRecentLogs(): LogEvent[];

  onStateChange(listener: (state: SystemState) => void): Unsubscribe;
  onMetricsUpdate(listener: (metrics: BasicMetrics) => void): Unsubscribe;
  onDrTelemetryUpdate(listener: (telemetry: DrTelemetry) => void): Unsubscribe;
  onLogEvent(listener: (log: LogEvent) => void): Unsubscribe;

  /** Starts a failover. Resolves when it finishes or is aborted. No-op unless IDLE. */
  triggerFailover(sourceRegion: string, targetRegion: string): Promise<void>;
  /** Cancels an in-flight failover if it has not reached traffic cutover. Returns true if aborted. */
  abortFailover(): boolean;
  /** Returns a SECURED system to standby (demo drill reset). */
  resetToStandby(): void;
  /** Fault-injection mode for resilience demos. */
  setChaosMode(enabled: boolean): void;

  /** Releases timers and connections. */
  dispose(): void;
}
