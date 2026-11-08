import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { SystemState } from '../domain/dr';
import { MockDrProvider } from './MockDrProvider';

const created: MockDrProvider[] = [];
function track(provider: MockDrProvider) {
  created.push(provider);
  return provider;
}

describe('MockDrProvider failover lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    created.splice(0).forEach((p) => p.dispose());
    vi.useRealTimers();
  });

  test('walks through every phase and ends secured', async () => {
    const backend = track(new MockDrProvider());
    const states: SystemState[] = [];
    backend.onStateChange((s) => states.push(s));

    const done = backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(6000);
    await done;

    expect(states).toEqual([
      SystemState.REPLICATING,
      SystemState.FAILOVER_TRIGGERED,
      SystemState.REROUTING_TRAFFIC,
      SystemState.SECURED,
    ]);
  });

  test('ignores a second failover while one is running', async () => {
    const backend = track(new MockDrProvider());
    const states: SystemState[] = [];
    backend.onStateChange((s) => states.push(s));

    const first = backend.triggerFailover('us-east-1', 'aws-us-west-2');
    backend.triggerFailover('us-east-1', 'azure-eastus2');
    await vi.advanceTimersByTimeAsync(6000);
    await first;

    expect(states.filter((s) => s === SystemState.REPLICATING)).toHaveLength(1);
  });

  test('resetToStandby returns a secured system to idle and allows another failover', async () => {
    const backend = track(new MockDrProvider());
    const run = backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(6000);
    await run;
    expect(backend.getState()).toBe(SystemState.SECURED);

    const metrics = vi.fn();
    backend.onMetricsUpdate(metrics);
    backend.resetToStandby();

    expect(backend.getState()).toBe(SystemState.IDLE);
    expect(metrics).toHaveBeenCalledWith({ rpo: '0.0s', rto: '--', sync: 100 });

    // Live telemetry resumes once back in standby.
    const telemetry = vi.fn();
    backend.onDrTelemetryUpdate(telemetry);
    telemetry.mockClear();
    await vi.advanceTimersByTimeAsync(1000);
    expect(telemetry).toHaveBeenCalled();

    const again = backend.triggerFailover('us-east-1', 'gcp-us-central1');
    await vi.advanceTimersByTimeAsync(6000);
    await again;
    expect(backend.getState()).toBe(SystemState.SECURED);
  });

  test('resetToStandby does nothing mid-failover', async () => {
    const backend = track(new MockDrProvider());
    backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(500);

    backend.resetToStandby();
    expect(backend.getState()).toBe(SystemState.REPLICATING);
  });

  test('abort during snapshot returns to idle and stops the run', async () => {
    const backend = track(new MockDrProvider());
    const states: SystemState[] = [];
    backend.onStateChange((s) => states.push(s));

    const run = backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(500);

    expect(backend.abortFailover()).toBe(true);
    await run; // resolves promptly once aborted
    await vi.advanceTimersByTimeAsync(10000);

    expect(backend.getState()).toBe(SystemState.IDLE);
    expect(states).toEqual([SystemState.REPLICATING, SystemState.IDLE]);
    expect(backend.getRecentLogs().some((log) => /aborted by operator/i.test(log.message))).toBe(
      true,
    );
  });

  test('abort during target hydration is allowed', async () => {
    const backend = track(new MockDrProvider());
    backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(1500);
    expect(backend.getState()).toBe(SystemState.FAILOVER_TRIGGERED);

    expect(backend.abortFailover()).toBe(true);
    expect(backend.getState()).toBe(SystemState.IDLE);
  });

  test('abort is refused once traffic cutover has started', async () => {
    const backend = track(new MockDrProvider());
    const run = backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(4000);
    expect(backend.getState()).toBe(SystemState.REROUTING_TRAFFIC);

    expect(backend.abortFailover()).toBe(false);
    await vi.advanceTimersByTimeAsync(3000);
    await run;
    expect(backend.getState()).toBe(SystemState.SECURED);
  });

  test('abort when idle does nothing', () => {
    const backend = track(new MockDrProvider());
    expect(backend.abortFailover()).toBe(false);
    expect(backend.getState()).toBe(SystemState.IDLE);
  });

  test('a new failover can start after an abort', async () => {
    const backend = track(new MockDrProvider());
    backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(500);
    backend.abortFailover();

    const again = backend.triggerFailover('us-east-1', 'gcp-us-central1');
    await vi.advanceTimersByTimeAsync(6000);
    await again;
    expect(backend.getState()).toBe(SystemState.SECURED);
  });

  test('exposes snapshots for initial render and declares itself simulated', () => {
    const backend = track(new MockDrProvider());
    expect(backend.isSimulated).toBe(true);
    expect(backend.getMetrics()).toEqual({ rpo: '0.0s', rto: '--', sync: 100 });
    expect(backend.getTelemetry().totalStagingDisks).toBe(12);
    expect(backend.getRecentLogs()).toHaveLength(3);
  });

  test('keeps at most 50 recent logs', () => {
    const backend = track(new MockDrProvider());
    for (let i = 0; i < 40; i++) {
      backend.setChaosMode(i % 2 === 0);
    }
    expect(backend.getRecentLogs()).toHaveLength(43);
    for (let i = 0; i < 20; i++) backend.setChaosMode(true);
    expect(backend.getRecentLogs()).toHaveLength(50);
  });
});

describe('MockDrProvider telemetry and subscriptions', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    created.splice(0).forEach((p) => p.dispose());
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test('streams nominal telemetry every second while idle', () => {
    const backend = track(new MockDrProvider());
    const metrics = vi.fn();
    const telemetry = vi.fn();
    backend.onMetricsUpdate(metrics);
    backend.onDrTelemetryUpdate(telemetry);
    expect(telemetry).toHaveBeenCalledTimes(1); // immediate initial snapshot

    vi.advanceTimersByTime(1000);
    expect(metrics).toHaveBeenLastCalledWith(expect.objectContaining({ rto: '--', sync: 100 }));
    const latest = telemetry.mock.lastCall?.[0];
    expect(latest.drsAgentStatus).toBe('HEALTHY');
    expect(latest.continuousDataBacklogBytes).toBe(0);
    expect(latest.historyRpoMs).toHaveLength(20);
  });

  test('chaos mode degrades telemetry and emits background audit events', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9); // > 0.7 forces an audit event
    const backend = track(new MockDrProvider());
    const telemetry = vi.fn();
    const logs = vi.fn();
    backend.onDrTelemetryUpdate(telemetry);
    backend.onLogEvent(logs);
    backend.setChaosMode(true);

    vi.advanceTimersByTime(1000);
    const latest = telemetry.mock.lastCall?.[0];
    expect(latest.drsAgentStatus).toBe('SYNCHRONIZING');
    expect(latest.cloudWatchAlarmsTriggered).toBe(2);
    expect(latest.stagingDisksInSync).toBe(10);
    expect(backend.getMetrics().sync).toBe(88);
    expect(logs).toHaveBeenCalledTimes(2); // chaos notice + background event
  });

  test('unsubscribe stops every listener type', async () => {
    const backend = track(new MockDrProvider());
    const state = vi.fn();
    const metrics = vi.fn();
    const telemetry = vi.fn();
    const logs = vi.fn();
    const offs = [
      backend.onStateChange(state),
      backend.onMetricsUpdate(metrics),
      backend.onDrTelemetryUpdate(telemetry),
      backend.onLogEvent(logs),
    ];
    offs.forEach((off) => off());
    telemetry.mockClear();

    void backend.triggerFailover('us-east-1', 'us-west-2');
    await vi.advanceTimersByTimeAsync(6000);
    expect(state).not.toHaveBeenCalled();
    expect(metrics).not.toHaveBeenCalled();
    expect(telemetry).not.toHaveBeenCalled();
    expect(logs).not.toHaveBeenCalled();
  });

  test('dispose is safe to call twice', () => {
    const backend = new MockDrProvider();
    backend.dispose();
    expect(() => backend.dispose()).not.toThrow();
  });
});
