import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { SystemState, type MemberRole } from '../../domain/dr';
import type { AuditEntry, ConsoleApi, FailoverStatus, ServerRun } from './consoleApi';
import { SupabaseDrProvider } from './SupabaseDrProvider';

const ORG = 'org-1';
const USERS = { op: 'user-op', ap: 'user-ap', viewer: 'user-viewer' } as const;
const EMAIL: Record<string, string> = {
  [USERS.op]: 'op@test',
  [USERS.ap]: 'ap@test',
  [USERS.viewer]: 'viewer@test',
};

/** In-memory stand-in for the database RPCs, enforcing the same rules. */
class FakeServer {
  run: ServerRun | null = null;
  audit: AuditEntry[] = [];
  clockSkewMs = 0;
  failNextStatus = false;
  /** Simulates the server detecting an altered entry. */
  tampered: number | null = null;
  private listeners = new Set<() => void>();

  serverNow() {
    return Date.now() + this.clockSkewMs;
  }

  private log(actor: string | null, action: string, detail: Record<string, unknown> = {}) {
    this.audit.unshift({
      id: this.audit.length + 1,
      actor_email: actor ? EMAIL[actor] : null,
      action,
      detail,
      created_at: new Date(this.serverNow()).toISOString(),
    });
    this.listeners.forEach((l) => l());
  }

  apiFor(userId: string): ConsoleApi {
    return {
      getStatus: async (): Promise<FailoverStatus> => {
        if (this.failNextStatus) {
          this.failNextStatus = false;
          throw new Error('network down');
        }
        return {
          server_now: new Date(this.serverNow()).toISOString(),
          run: this.run && { ...this.run },
        };
      },
      getAuditFeed: async () => [...this.audit],
      requestFailover: vi.fn(async (_org: string, source: string, target: string) => {
        if (this.run) throw new Error('a failover is already open for this organization');
        this.run = {
          id: 'run-1',
          source_region: source,
          target_region: target,
          requested_by: userId,
          requested_by_email: EMAIL[userId],
          requested_at: new Date(this.serverNow()).toISOString(),
          approved_by: null,
          approved_by_email: null,
          approved_at: null,
          stage: 'PENDING_APPROVAL',
        };
        this.log(userId, 'failover.requested', { run_id: 'run-1', source, target });
        return 'run-1';
      }),
      approveFailover: vi.fn(async () => {
        if (!this.run || this.run.requested_by === userId)
          throw new Error('two-person rule: requester cannot approve');
        this.run = {
          ...this.run,
          approved_by: userId,
          approved_by_email: EMAIL[userId],
          approved_at: new Date(this.serverNow()).toISOString(),
        };
        this.log(userId, 'failover.approved', { run_id: 'run-1' });
      }),
      abortFailover: vi.fn(async () => {
        this.run = null;
        this.log(userId, 'failover.aborted', { run_id: 'run-1', stage: 'QUIESCE_AND_SNAPSHOT' });
      }),
      resetFailover: vi.fn(async () => {
        this.run = null;
        this.log(userId, 'failover.reset', { run_id: 'run-1' });
      }),
      getAuditPage: async (_org: string, limit: number, before?: number) =>
        this.audit
          .filter((e) => before === undefined || e.id < before)
          .slice(0, limit)
          .map((e) => ({
            ...e,
            prev_hash: '0'.repeat(64),
            hash: e.id.toString(16).padStart(64, 'a'),
          })),
      verifyAuditChain: async () => ({
        ok: this.tampered === null,
        broken_id: this.tampered,
        checked: this.audit.length,
        head_hash: this.audit[0] ? 'a'.repeat(64) : null,
        verified_at: new Date(this.serverNow()).toISOString(),
      }),
      subscribe: (_org, onChange) => {
        this.listeners.add(onChange);
        return () => this.listeners.delete(onChange);
      },
    };
  }
}

const lastLog = (p: SupabaseDrProvider) => p.getRecentLogs().slice(-1)[0];

const providers: SupabaseDrProvider[] = [];
function connect(server: FakeServer, userId: string, role: MemberRole) {
  const p = new SupabaseDrProvider(
    server.apiFor(userId),
    { orgId: ORG, orgName: 'Acme', userId, role },
    { pollMs: 5000, tickMs: 100 },
  );
  providers.push(p);
  return p;
}

describe('SupabaseDrProvider', () => {
  let server: FakeServer;

  beforeEach(() => {
    vi.useFakeTimers();
    server = new FakeServer();
  });

  afterEach(() => {
    providers.splice(0).forEach((p) => p.dispose());
    vi.useRealTimers();
  });

  test('labels itself honestly: real workflow, simulated telemetry', async () => {
    const p = connect(server, USERS.op, 'operator');
    await p.ready;
    expect(p.name).toBe('Acme');
    expect(p.isSimulated).toBe(false);
    expect(p.telemetryIsSimulated).toBe(true);
    expect(p.getState()).toBe(SystemState.IDLE);
    expect(p.getTelemetry().totalStagingDisks).toBe(12);
  });

  test('two-person flow: request stays pending until another user approves, then runs to secured', async () => {
    const op = connect(server, USERS.op, 'operator');
    const ap = connect(server, USERS.ap, 'approver');
    await Promise.all([op.ready, ap.ready]);

    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await ap.refresh(); // realtime already notified; make sure it has landed

    expect(op.getState()).toBe(SystemState.IDLE);
    expect(op.approvals.getRun()).toMatchObject({ pendingApproval: true, requestedByMe: true });
    expect(op.approvals.canApprove()).toBe(false); // requester cannot approve
    expect(ap.approvals.getRun()).toMatchObject({
      requestedByEmail: 'op@test',
      targetRegion: 'aws-us-west-2',
      requestedByMe: false,
    });
    expect(ap.approvals.canApprove()).toBe(true);

    const states: SystemState[] = [];
    op.onStateChange((s) => states.push(s));
    await ap.approvals.approve();
    await op.refresh();

    await vi.advanceTimersByTimeAsync(6000);
    expect(states).toEqual([
      SystemState.REPLICATING,
      SystemState.FAILOVER_TRIGGERED,
      SystemState.REROUTING_TRAFFIC,
      SystemState.SECURED,
    ]);
    expect(ap.getState()).toBe(SystemState.SECURED);
    expect(op.getMetrics()).toEqual({ rpo: '< 0.01s', rto: 'COMPLETED', sync: 100 });

    const messages = op.getRecentLogs().map((l) => l.message);
    expect(messages.some((m) => /requested by op@test/.test(m))).toBe(true);
    expect(messages.some((m) => /approved by ap@test/.test(m))).toBe(true);
  });

  test('derives stage from the server clock, not the local clock', async () => {
    server.clockSkewMs = 60_000; // server is a minute ahead of this browser
    const op = connect(server, USERS.op, 'operator');
    await op.ready;
    server.run = {
      id: 'run-1',
      source_region: 'us-east-1',
      target_region: 'aws-us-west-2',
      requested_by: USERS.op,
      requested_by_email: 'op@test',
      requested_at: new Date(server.serverNow() - 10_000).toISOString(),
      approved_by: USERS.ap,
      approved_by_email: 'ap@test',
      approved_at: new Date(server.serverNow() - 4000).toISOString(), // 4s into the run
      stage: 'DNS_CUTOVER',
    };
    await op.refresh();
    expect(op.getState()).toBe(SystemState.REROUTING_TRAFFIC);
  });

  test('viewers cannot request: logs a clear error and never calls the server', async () => {
    const viewer = connect(server, USERS.viewer, 'viewer');
    await viewer.ready;
    expect(viewer.approvals.canRequest()).toBe(false);
    await viewer.triggerFailover('us-east-1', 'aws-us-west-2');
    expect(server.run).toBeNull();
    expect(lastLog(viewer)).toMatchObject({ level: 'CRIT' });
    expect(lastLog(viewer)?.message).toMatch(/viewer.*cannot request/);
  });

  test('abort before cutover shows standby immediately and tells the server', async () => {
    const op = connect(server, USERS.op, 'operator');
    const ap = connect(server, USERS.ap, 'approver');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await ap.refresh();
    await ap.approvals.approve();
    await op.refresh();
    expect(op.getState()).toBe(SystemState.REPLICATING);

    expect(op.abortFailover()).toBe(true);
    expect(op.getState()).toBe(SystemState.IDLE);
    await vi.advanceTimersByTimeAsync(0);
    expect(server.run).toBeNull();
    expect(op.approvals.getRun()).toBeNull();
  });

  test('abort is refused once traffic cutover has started', async () => {
    const op = connect(server, USERS.op, 'operator');
    const ap = connect(server, USERS.ap, 'approver');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await ap.refresh();
    await ap.approvals.approve();
    await op.refresh();
    await vi.advanceTimersByTimeAsync(4000);
    expect(op.getState()).toBe(SystemState.REROUTING_TRAFFIC);
    expect(op.abortFailover()).toBe(false);
  });

  test('cancel withdraws a pending request', async () => {
    const op = connect(server, USERS.op, 'operator');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await op.approvals.cancel();
    expect(op.approvals.getRun()).toBeNull();
    expect(lastLog(op)?.message).toMatch(/aborted by op@test/);
  });

  test('reset returns a secured run to standby', async () => {
    const op = connect(server, USERS.op, 'operator');
    const ap = connect(server, USERS.ap, 'approver');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await ap.refresh();
    await ap.approvals.approve();
    await op.refresh();
    await vi.advanceTimersByTimeAsync(6000);
    expect(op.getState()).toBe(SystemState.SECURED);

    op.resetToStandby();
    await vi.advanceTimersByTimeAsync(0);
    expect(op.getState()).toBe(SystemState.IDLE);
    expect(server.run).toBeNull();
  });

  test('a rejected approval is logged and rethrown', async () => {
    const op = connect(server, USERS.op, 'operator');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    // Force the requester down the approve path to hit the server's two-person rule.
    await expect(op.approvals.approve()).rejects.toThrow(/two-person rule/);
    expect(op.getRecentLogs().some((l) => l.level === 'CRIT')).toBe(true);
  });

  test('sync failures are logged, and the poller recovers', async () => {
    server.failNextStatus = true;
    const op = connect(server, USERS.op, 'operator');
    await op.ready;
    expect(lastLog(op)?.message).toMatch(/Sync with server failed: network down/);

    server.run = null;
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(5000);
    expect(op.approvals.getRun()).not.toBeNull();
  });

  test('dispose stops listening to the server', async () => {
    const op = connect(server, USERS.op, 'operator');
    await op.ready;
    const runs = vi.fn();
    op.approvals.onRunChange(runs);
    op.dispose();
    await server.apiFor(USERS.ap).requestFailover(ORG, 'us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(10_000);
    expect(runs).not.toHaveBeenCalled();
  });

  test('listeners receive runs, logs, metrics and telemetry, and can unsubscribe', async () => {
    const op = connect(server, USERS.op, 'operator');
    const ap = connect(server, USERS.ap, 'approver');
    await Promise.all([op.ready, ap.ready]);
    const runs = vi.fn();
    const logs = vi.fn();
    const metrics = vi.fn();
    const telemetry = vi.fn();
    const states = vi.fn();
    const offs = [
      op.approvals.onRunChange(runs),
      op.onLogEvent(logs),
      op.onMetricsUpdate(metrics),
      op.onDrTelemetryUpdate(telemetry),
      op.onStateChange(states),
    ];
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await ap.refresh();
    await ap.approvals.approve();
    await op.refresh();
    await vi.advanceTimersByTimeAsync(1000);
    expect(runs).toHaveBeenCalledWith(expect.objectContaining({ pendingApproval: true }));
    expect(logs).toHaveBeenCalledWith(expect.objectContaining({ service: 'CORE' }));
    expect(metrics).toHaveBeenCalled();
    expect(telemetry).toHaveBeenCalled(); // immediate snapshot from the simulated source
    expect(states).toHaveBeenCalledWith(SystemState.REPLICATING);

    offs.forEach((off) => off());
    [runs, logs, metrics, states].forEach((fn) => fn.mockClear());
    await vi.advanceTimersByTimeAsync(6000);
    expect(states).not.toHaveBeenCalled();
    expect(metrics).not.toHaveBeenCalled();
  });

  test('a failed abort is logged and the server state is restored', async () => {
    const op = connect(server, USERS.op, 'operator');
    const ap = connect(server, USERS.ap, 'approver');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await ap.refresh();
    await ap.approvals.approve();
    await op.refresh();
    const api = (op as unknown as { api: { abortFailover: ReturnType<typeof vi.fn> } }).api;
    api.abortFailover.mockRejectedValueOnce(new Error('abort not allowed at stage DNS_CUTOVER'));
    expect(op.abortFailover()).toBe(true);
    await vi.advanceTimersByTimeAsync(0);
    expect(lastLog(op).message).toMatch(/Abort failed: abort not allowed/);
    expect(op.getState()).not.toBe(SystemState.IDLE); // run is still open on the server
  });

  test('a failed reset is logged, not thrown', async () => {
    const op = connect(server, USERS.op, 'operator');
    const ap = connect(server, USERS.ap, 'approver');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await ap.refresh();
    await ap.approvals.approve();
    await op.refresh();
    await vi.advanceTimersByTimeAsync(6000);
    const api = (op as unknown as { api: { resetFailover: ReturnType<typeof vi.fn> } }).api;
    api.resetFailover.mockRejectedValueOnce(new Error('operator role required'));
    op.resetToStandby();
    await vi.advanceTimersByTimeAsync(0);
    expect(
      op.getRecentLogs().some((l) => /Reset failed: operator role required/.test(l.message)),
    ).toBe(true);
    expect(op.getState()).toBe(SystemState.SECURED);
  });

  test('chaos mode only affects the simulated telemetry', async () => {
    const op = connect(server, USERS.op, 'operator');
    await op.ready;
    op.setChaosMode(true);
    await vi.advanceTimersByTimeAsync(1000);
    expect(op.getTelemetry().drsAgentStatus).toBe('SYNCHRONIZING');
    expect(op.getState()).toBe(SystemState.IDLE);
  });

  test('audit: lists entries newest first with hashes, pages by id, and reports the chain', async () => {
    const op = connect(server, USERS.op, 'operator');
    await op.triggerFailover('us-east-1', 'aws-us-west-2');
    await op.approvals.cancel();
    const page = await op.audit.list({ limit: 1 });
    expect(page).toHaveLength(1);
    expect(page[0]).toMatchObject({ action: 'failover.aborted', actorEmail: 'op@test' });
    expect(page[0].hash).toMatch(/^[0-9a-f]{64}$/);
    const older = await op.audit.list({ before: page[0].id });
    expect(older.map((r) => r.action)).toEqual(['failover.requested']);

    await expect(op.audit.verify()).resolves.toMatchObject({
      ok: true,
      brokenId: null,
      checked: 2,
    });
    server.tampered = 1;
    await expect(op.audit.verify()).resolves.toMatchObject({ ok: false, brokenId: 1 });
  });
});
