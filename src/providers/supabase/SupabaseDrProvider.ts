// Server-backed DR provider (Phase 3.4). The failover workflow, two-person approval
// and audit log are real and shared by everyone in the organization. Replication
// telemetry is still simulated (no AWS account until funded) and labeled as such.

import {
  type AlertsCapability,
  type ReplicationCapability,
  type ApprovalCapability,
  type AuditCapability,
  type TeamCapability,
  type DrillsCapability,
  type BasicMetrics,
  type DrProvider,
  type DrTelemetry,
  type FailoverRun,
  type LogEvent,
  type MemberRole,
  type Unsubscribe,
  SystemState,
  isAbortable,
} from '../../domain/dr';
import { stageAfterApproval } from '../../domain/failoverStage';
import { SOURCE_REGION } from '../../config/regions';
import { MockDrProvider } from '../MockDrProvider';
import type { AuditEntry, ConsoleApi, ServerRun } from './consoleApi';

const MAX_LOGS = 50;
const ROLE_RANK: Record<MemberRole, number> = { viewer: 0, operator: 1, approver: 2, admin: 3 };

export interface ConsoleContext {
  orgId: string;
  orgName: string;
  userId: string;
  role: MemberRole;
}

export interface SupabaseDrProviderOptions {
  /** Fallback refresh interval in case a Realtime event is missed. */
  pollMs?: number;
  /** How often the local stage is recomputed while a run is executing. */
  tickMs?: number;
  now?: () => number;
}

function describeAudit(entry: AuditEntry): { level: LogEvent['level']; message: string } {
  const actor = entry.actor_email ?? 'system';
  const d = entry.detail;
  switch (entry.action) {
    case 'failover.requested':
      return {
        level: 'WARN',
        message: `Failover requested by ${actor}: ${String(d.source)} → ${String(d.target)}. Awaiting second-person approval.`,
      };
    case 'failover.approved':
      return { level: 'WARN', message: `Failover approved by ${actor}. Execution started.` };
    case 'failover.aborted':
      return {
        level: 'WARN',
        message: `Failover aborted by ${actor} (stage: ${String(d.stage).replace(/_/g, ' ')}).`,
      };
    case 'failover.reset':
      return { level: 'INFO', message: `Failover drill reset by ${actor}. Primary region active.` };
    case 'org.created':
      return { level: 'INFO', message: `Organization created: ${String(d.name)}.` };
    case 'member.invited':
      return {
        level: 'INFO',
        message: `${actor} invited ${String(d.email)} as ${String(d.role)}.`,
      };
    case 'member.joined':
      return { level: 'SUCCESS', message: `${String(d.email)} joined as ${String(d.role)}.` };
    case 'member.invite_revoked':
      return { level: 'INFO', message: `${actor} revoked the invite for ${String(d.email)}.` };
    case 'member.removed':
      return {
        level: 'WARN',
        message: `${actor} removed ${String(d.email)} from the organization.`,
      };
    case 'drill.started':
      return {
        level: 'INFO',
        message:
          d.trigger === 'scheduled'
            ? `Scheduled drill started: ${String(d.source)} → ${String(d.target)} (isolated, no production cutover).`
            : `Drill started by ${actor}: ${String(d.source)} → ${String(d.target)} (isolated, no production cutover).`,
      };
    case 'drill.completed':
      return d.result === 'passed'
        ? {
            level: 'SUCCESS',
            message: `Drill passed: recovered in ${String(d.recovery_seconds)} s (target ${String(d.rto_target_seconds)} s).`,
          }
        : d.result === 'failed'
          ? {
              level: 'CRIT',
              message: `Drill failed: recovery took ${String(d.recovery_seconds)} s (target ${String(d.rto_target_seconds)} s).`,
            }
          : { level: 'WARN', message: 'Drill aborted before completion.' };
    case 'drill.schedule_set':
      return {
        level: 'INFO',
        message: `${actor} scheduled ${String(d.cadence)} drills; next ${new Date(String(d.next_run_at)).toLocaleString()}.`,
      };
    case 'drill.schedule_disabled':
      return { level: 'WARN', message: `${actor} turned off scheduled drills.` };
    case 'alert.channel_added':
      return {
        level: 'INFO',
        message: `${actor} added ${d.kind === 'pagerduty' ? 'PagerDuty' : 'Slack'} alerts: ${String(d.name)}.`,
      };
    case 'alert.channel_removed':
      return { level: 'INFO', message: `${actor} removed alert channel ${String(d.name)}.` };
    case 'alert.test_sent':
      return { level: 'INFO', message: `${actor} sent a test alert to ${String(d.name)}.` };
    case 'replication.rpo_breached':
      return {
        level: 'CRIT',
        message: `${d.source === 'fixture' ? '[SAMPLE DATA] ' : ''}Data-loss target at risk: ${String(d.problem_count)} of ${String(d.server_count)} servers not replicating normally (worst lag ${d.max_lag_seconds === null ? 'unknown' : `${String(d.max_lag_seconds)} s`}, target ${String(d.rpo_target_seconds)} s).`,
      };
    case 'replication.rpo_recovered':
      return {
        level: 'SUCCESS',
        message: `${d.source === 'fixture' ? '[SAMPLE DATA] ' : ''}Replication back within the data-loss target (worst lag ${String(d.max_lag_seconds)} s, target ${String(d.rpo_target_seconds)} s).`,
      };
    case 'replication.token_created':
      return {
        level: 'INFO',
        message: `${actor} created an AWS collector token (…${String(d.hint)}).`,
      };
    case 'replication.token_revoked':
      return { level: 'WARN', message: `${actor} revoked the AWS collector token.` };
    case 'org.objectives_set':
      return {
        level: 'INFO',
        message: `${actor} set recovery targets: RTO ${String(d.rto_seconds)} s, RPO ${String(d.rpo_seconds)} s.`,
      };
    case 'member.role_set':
      return { level: 'INFO', message: `${actor} set a member's role to ${String(d.role)}.` };
    default:
      return { level: 'INFO', message: `${entry.action} by ${actor}` };
  }
}

export class SupabaseDrProvider implements DrProvider {
  readonly name: string;
  readonly isSimulated = false;
  readonly telemetryIsSimulated = true;
  readonly approvals: ApprovalCapability;
  readonly audit: AuditCapability;
  readonly team: TeamCapability;
  readonly drills: DrillsCapability;
  readonly alerts: AlertsCapability;
  readonly replication: ReplicationCapability;
  /** Resolves after the first sync with the server (useful in tests). */
  readonly ready: Promise<void>;

  private readonly telemetrySource = new MockDrProvider();
  private readonly now: () => number;
  private state: SystemState = SystemState.IDLE;
  private metrics: BasicMetrics;
  private run: ServerRun | null = null;
  private clockOffsetMs = 0;
  private logs: LogEvent[] = [];
  private seenAudit = new Set<number>();
  private refreshSeq = 0;
  private disposed = false;
  private ticker: ReturnType<typeof setInterval> | null = null;
  private readonly poller: ReturnType<typeof setInterval>;
  private readonly cleanups: Unsubscribe[] = [];

  private stateListeners = new Set<(s: SystemState) => void>();
  private metricsListeners = new Set<(m: BasicMetrics) => void>();
  private logListeners = new Set<(l: LogEvent) => void>();
  private runListeners = new Set<(r: FailoverRun | null) => void>();

  constructor(
    private readonly api: ConsoleApi,
    private readonly ctx: ConsoleContext,
    private readonly options: SupabaseDrProviderOptions = {},
  ) {
    this.name = ctx.orgName;
    this.now = options.now ?? (() => Date.now());
    this.metrics = this.telemetrySource.getMetrics();
    this.approvals = this.createApprovals();
    const org = ctx.orgId;
    this.team = {
      orgId: ctx.orgId,
      orgName: ctx.orgName,
      myRole: ctx.role,
      listMembers: async () =>
        (await api.listMembers(org)).map((m) => ({
          userId: m.user_id,
          email: m.email,
          role: m.role,
          joinedAt: m.joined_at,
          isMe: m.user_id === ctx.userId,
        })),
      listInvites: async () =>
        (await api.listInvites(org)).map((i) => ({
          id: i.id,
          email: i.email,
          role: i.role,
          invitedByEmail: i.invited_by_email,
          createdAt: i.created_at,
        })),
      invite: (email, role) => api.inviteMember(org, email, role),
      revokeInvite: (id) => api.revokeInvite(id),
      setRole: (userId, role) => api.setMemberRole(org, userId, role),
      remove: (userId) => api.removeMember(org, userId),
    };
    this.drills = {
      getObjectives: async () => {
        const o = await api.getObjectives(org);
        return { rtoSeconds: o.rto_target_seconds, rpoSeconds: o.rpo_target_seconds };
      },
      setObjectives: ({ rtoSeconds, rpoSeconds }) => api.setObjectives(org, rtoSeconds, rpoSeconds),
      listRuns: async () =>
        (await api.listRuns(org)).map((r) => ({
          id: r.id,
          kind: r.kind,
          trigger: r.trigger,
          sourceRegion: r.source_region,
          targetRegion: r.target_region,
          requestedByEmail: r.requested_by_email,
          requestedAt: r.requested_at,
          approvedByEmail: r.approved_by_email,
          approvedAt: r.approved_at,
          outcome: r.outcome,
          recoverySeconds: r.recovery_seconds === null ? null : Number(r.recovery_seconds),
          rtoTargetSeconds: r.rto_target_seconds,
        })),
      evidence: (runId) => api.drillEvidence(runId),
      getSchedule: async () => {
        const s = await api.getDrillSchedule(org);
        return s
          ? {
              cadence: s.cadence,
              nextRunAt: s.next_run_at,
              lastRunAt: s.last_run_at,
              sourceRegion: s.source_region,
              targetRegion: s.target_region,
              enabled: s.enabled,
            }
          : null;
      },
      setSchedule: ({ cadence, firstRunAt, targetRegion }) =>
        api.setDrillSchedule(org, cadence, firstRunAt, SOURCE_REGION, targetRegion),
      disableSchedule: () => api.disableDrillSchedule(org),
      startDrill: (targetRegion) => api.startDrill(org, SOURCE_REGION, targetRegion),
    };
    this.alerts = {
      listChannels: async () =>
        (await api.listAlertChannels(org)).map((c) => ({
          id: c.id,
          kind: c.kind,
          name: c.name,
          hint: c.hint,
          events: c.events,
          createdByEmail: c.created_by_email,
          createdAt: c.created_at,
        })),
      listDeliveries: async () =>
        (await api.listAlertDeliveries(org)).map((d) => ({
          id: d.id,
          channelName: d.channel_name,
          kind: d.kind,
          event: d.event,
          title: d.title,
          status: d.status,
          httpStatus: d.http_status,
          error: d.error,
          createdAt: d.created_at,
        })),
      addChannel: async ({ kind, name, secret, events }) => {
        await api.addAlertChannel(org, kind, name, secret, events);
      },
      removeChannel: (id) => api.removeAlertChannel(id),
      sendTest: (id) => api.sendTestAlert(id),
    };
    const num = (v: number | string | null) => (v === null ? null : Number(v));
    this.replication = {
      latest: async () => {
        const r = await api.latestReplication(org);
        if (!r) return null;
        return {
          source: r.source,
          collectedAt: r.collected_at,
          receivedAt: r.received_at,
          serverNow: r.server_now,
          awsAccountId: r.aws_account_id,
          awsRegion: r.aws_region,
          collectorVersion: r.collector_version,
          serverCount: r.server_count,
          healthyCount: r.healthy_count,
          problemCount: r.problem_count,
          maxLagSeconds: num(r.max_lag_seconds),
          backlogBytes: Number(r.backlog_bytes),
          rpoTargetSeconds: r.rpo_target_seconds,
          rpoMet: r.rpo_met,
          servers: r.servers.map((s) => ({
            id: s.id,
            hostname: s.hostname,
            state: s.state,
            health: s.health,
            lagSeconds: num(s.lag_seconds),
            lagRaw: s.lag_raw,
            backlogBytes: Number(s.backlog_bytes),
            totalBytes: Number(s.total_bytes),
            replicatedBytes: Number(s.replicated_bytes),
            etaAt: s.eta_at,
            lastSeenAt: s.last_seen_at,
            error: s.error,
            lastLaunchResult: s.last_launch_result,
          })),
        };
      },
      history: async () =>
        (await api.replicationHistory(org)).map((h) => ({
          collectedAt: h.collected_at,
          maxLagSeconds: num(h.max_lag_seconds),
          rpoMet: h.rpo_met,
        })),
      tokenStatus: async () => {
        const t = await api.ingestTokenStatus(org);
        return t ? { hint: t.hint, createdAt: t.created_at, lastUsedAt: t.last_used_at } : null;
      },
      createToken: () => api.createIngestToken(org),
      revokeToken: () => api.revokeIngestToken(org),
    };
    this.audit = {
      list: async ({ limit = 100, before } = {}) =>
        (await this.api.getAuditPage(this.ctx.orgId, limit, before)).map((r) => ({
          id: r.id,
          actorEmail: r.actor_email,
          action: r.action,
          detail: r.detail,
          createdAt: r.created_at,
          prevHash: r.prev_hash,
          hash: r.hash,
        })),
      verify: async () => {
        const r = await this.api.verifyAuditChain(this.ctx.orgId);
        return {
          ok: r.ok,
          brokenId: r.broken_id,
          checked: r.checked,
          headHash: r.head_hash,
          verifiedAt: r.verified_at,
        };
      },
    };

    // Simulated idle metrics flow through only while no failover is executing.
    this.cleanups.push(
      this.telemetrySource.onMetricsUpdate((m) => {
        if (this.state === SystemState.IDLE) this.emitMetrics(m);
      }),
      api.subscribe(ctx.orgId, () => void this.refresh()),
    );
    this.poller = setInterval(() => void this.refresh(), options.pollMs ?? 5000);
    this.ready = this.refresh();
  }

  // ---- server sync -------------------------------------------------------

  async refresh(): Promise<void> {
    const seq = ++this.refreshSeq;
    const sentAt = this.now();
    try {
      const [status, feed] = await Promise.all([
        this.api.getStatus(this.ctx.orgId),
        this.api.getAuditFeed(this.ctx.orgId),
      ]);
      if (this.disposed || seq !== this.refreshSeq) return; // a newer refresh superseded this one
      const midpoint = (sentAt + this.now()) / 2;
      this.clockOffsetMs = Date.parse(status.server_now) - midpoint;
      this.applyFeed(feed);
      this.applyRun(status.run);
    } catch (error) {
      if (!this.disposed) this.logError('Sync with server failed', error);
    }
  }

  private applyRun(run: ServerRun | null) {
    const changed = JSON.stringify(run) !== JSON.stringify(this.run);
    this.run = run;
    this.recomputeState();
    if (run?.approved_at && this.state !== SystemState.SECURED) this.startTicker();
    else this.stopTicker();
    if (changed) {
      const view = this.toFailoverRun();
      this.runListeners.forEach((l) => l(view));
    }
  }

  private applyFeed(entries: AuditEntry[]) {
    // Feed is newest first; append unseen entries oldest first.
    for (const entry of [...entries].reverse()) {
      if (this.seenAudit.has(entry.id)) continue;
      this.seenAudit.add(entry.id);
      const { level, message } = describeAudit(entry);
      this.pushLog({
        id: `audit-${entry.id}`,
        timestamp: new Date(entry.created_at).toLocaleTimeString(),
        level,
        service: 'CORE',
        message,
      });
    }
  }

  private serverNow() {
    return this.now() + this.clockOffsetMs;
  }

  private elapsedSinceApproval() {
    return this.run?.approved_at ? this.serverNow() - Date.parse(this.run.approved_at) : 0;
  }

  private recomputeState() {
    const next = this.run?.approved_at
      ? stageAfterApproval(this.elapsedSinceApproval())
      : SystemState.IDLE;
    if (next !== this.state) {
      this.state = next;
      this.stateListeners.forEach((l) => l(next));
    }
    if (next === SystemState.SECURED) this.stopTicker();
    this.emitMetrics(this.metricsFor(next));
  }

  private metricsFor(state: SystemState): BasicMetrics {
    const rto = `${(this.elapsedSinceApproval() / 1000).toFixed(1)}s`;
    switch (state) {
      case SystemState.REPLICATING:
        return { rpo: '0.0s', rto, sync: 85 };
      case SystemState.FAILOVER_TRIGGERED:
        return { rpo: '0.0s', rto, sync: 95 };
      case SystemState.REROUTING_TRAFFIC:
        return { rpo: '0.0s', rto, sync: 98 };
      case SystemState.SECURED:
        return { rpo: '< 0.01s', rto: 'COMPLETED', sync: 100 };
      default:
        return this.telemetrySource.getMetrics();
    }
  }

  private startTicker() {
    if (this.ticker) return;
    this.ticker = setInterval(() => this.recomputeState(), this.options.tickMs ?? 200);
  }

  private stopTicker() {
    if (this.ticker) clearInterval(this.ticker);
    this.ticker = null;
  }

  // ---- roles and approvals -------------------------------------------------

  private hasRole(min: MemberRole) {
    return ROLE_RANK[this.ctx.role] >= ROLE_RANK[min];
  }

  private toFailoverRun(): FailoverRun | null {
    const r = this.run;
    if (!r) return null;
    return {
      id: r.id,
      sourceRegion: r.source_region,
      targetRegion: r.target_region,
      requestedByEmail: r.requested_by_email,
      requestedByMe: r.requested_by === this.ctx.userId,
      requestedAt: r.requested_at,
      approvedByEmail: r.approved_by_email,
      approvedAt: r.approved_at,
      pendingApproval: !r.approved_at,
    };
  }

  private createApprovals(): ApprovalCapability {
    return {
      role: this.ctx.role,
      getRun: () => this.toFailoverRun(),
      onRunChange: (listener) => {
        this.runListeners.add(listener);
        return () => {
          this.runListeners.delete(listener);
        };
      },
      canRequest: () => this.hasRole('operator'),
      canApprove: () =>
        !!this.run &&
        !this.run.approved_at &&
        this.hasRole('approver') &&
        this.run.requested_by !== this.ctx.userId,
      approve: () => this.mutate('Approval failed', (run) => this.api.approveFailover(run.id)),
      cancel: () => this.mutate('Cancel failed', (run) => this.api.abortFailover(run.id)),
    };
  }

  /** Runs a server mutation on the open run, then resyncs. Errors are logged and rethrown. */
  private async mutate(label: string, action: (run: ServerRun) => Promise<void>) {
    const run = this.run;
    if (!run) return;
    try {
      await action(run);
    } catch (error) {
      this.logError(label, error);
      throw error;
    } finally {
      await this.refresh();
    }
  }

  // ---- DrProvider ----------------------------------------------------------

  getState() {
    return this.state;
  }
  getMetrics() {
    return this.metrics;
  }
  getTelemetry(): DrTelemetry {
    return this.telemetrySource.getTelemetry();
  }
  getRecentLogs() {
    return [...this.logs];
  }

  onStateChange(listener: (state: SystemState) => void): Unsubscribe {
    this.stateListeners.add(listener);
    return () => {
      this.stateListeners.delete(listener);
    };
  }
  onMetricsUpdate(listener: (metrics: BasicMetrics) => void): Unsubscribe {
    this.metricsListeners.add(listener);
    return () => {
      this.metricsListeners.delete(listener);
    };
  }
  onDrTelemetryUpdate(listener: (telemetry: DrTelemetry) => void): Unsubscribe {
    return this.telemetrySource.onDrTelemetryUpdate(listener);
  }
  onLogEvent(listener: (log: LogEvent) => void): Unsubscribe {
    this.logListeners.add(listener);
    return () => {
      this.logListeners.delete(listener);
    };
  }

  /** Requests a failover. A second person must approve before it executes. */
  async triggerFailover(sourceRegion: string, targetRegion: string): Promise<void> {
    if (!this.hasRole('operator')) {
      this.logError(
        'Request refused',
        new Error(`role "${this.ctx.role}" cannot request failovers`),
      );
      return;
    }
    if (this.run) return;
    try {
      await this.api.requestFailover(this.ctx.orgId, sourceRegion, targetRegion);
    } catch (error) {
      this.logError('Failover request failed', error);
    }
    await this.refresh();
  }

  abortFailover(): boolean {
    const run = this.run;
    if (!run || !this.hasRole('operator') || !isAbortable(this.state)) return false;
    // Optimistic: show standby now; the server's answer arrives via refresh.
    this.stopTicker();
    this.state = SystemState.IDLE;
    this.stateListeners.forEach((l) => l(SystemState.IDLE));
    this.api
      .abortFailover(run.id)
      .catch((error: unknown) => this.logError('Abort failed', error))
      .finally(() => void this.refresh());
    return true;
  }

  resetToStandby(): void {
    if (this.state !== SystemState.SECURED || !this.hasRole('operator')) return;
    void this.mutate('Reset failed', (run) => this.api.resetFailover(run.id)).catch(() => {});
  }

  setChaosMode(enabled: boolean): void {
    this.telemetrySource.setChaosMode(enabled);
  }

  dispose(): void {
    this.disposed = true;
    clearInterval(this.poller);
    this.stopTicker();
    this.cleanups.splice(0).forEach((off) => off());
    this.telemetrySource.dispose();
  }

  // ---- helpers -------------------------------------------------------------

  private emitMetrics(metrics: BasicMetrics) {
    this.metrics = metrics;
    this.metricsListeners.forEach((l) => l(metrics));
  }

  private pushLog(log: LogEvent) {
    this.logs = [...this.logs.slice(-(MAX_LOGS - 1)), log];
    this.logListeners.forEach((l) => l(log));
  }

  private logError(label: string, error: unknown) {
    const detail = error instanceof Error ? error.message : String(error);
    this.pushLog({
      id: `err-${Math.random().toString(36).slice(2, 9)}`,
      timestamp: new Date(this.now()).toLocaleTimeString(),
      level: 'CRIT',
      service: 'CORE',
      message: `${label}: ${detail}`,
    });
  }
}
