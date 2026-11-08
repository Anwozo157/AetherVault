import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { DisasterRecoveryBackend, SystemState } from './MockBackend';

describe('DisasterRecoveryBackend failover lifecycle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('walks through every phase and ends secured', async () => {
    const backend = new DisasterRecoveryBackend();
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
    const backend = new DisasterRecoveryBackend();
    const states: SystemState[] = [];
    backend.onStateChange((s) => states.push(s));

    const first = backend.triggerFailover('us-east-1', 'aws-us-west-2');
    backend.triggerFailover('us-east-1', 'azure-eastus2');
    await vi.advanceTimersByTimeAsync(6000);
    await first;

    expect(states.filter((s) => s === SystemState.REPLICATING)).toHaveLength(1);
  });

  test('resetToStandby returns a secured system to idle and allows another failover', async () => {
    const backend = new DisasterRecoveryBackend();
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
    const backend = new DisasterRecoveryBackend();
    backend.triggerFailover('us-east-1', 'aws-us-west-2');
    await vi.advanceTimersByTimeAsync(500);

    backend.resetToStandby();
    expect(backend.getState()).toBe(SystemState.REPLICATING);
  });
});
