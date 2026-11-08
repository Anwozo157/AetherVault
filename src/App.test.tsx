import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from './App';
import {
  SystemState,
  type BasicMetrics,
  type DrProvider,
  type DrTelemetry,
  type LogEvent,
} from './domain/dr';
import { MockDrProvider } from './providers/MockDrProvider';
import { DrProviderRoot } from './providers/DrProviderContext';

// WebGL and Web Audio are not available in jsdom.
vi.mock('./features/topology/GlobalTopologyCanvas', () => ({
  default: () => <div data-testid="globe" />,
}));
vi.mock('./lib/audioEffects', () => ({
  sound: {
    isMuted: false,
    startHoldCharge: vi.fn(),
    stopHoldCharge: vi.fn(),
    playFailoverTriggered: vi.fn(),
    playSecuredChime: vi.fn(),
    playChaosGlitch: vi.fn(),
  },
}));

/** Test double: real snapshot data from the mock, with spied actions and manual state pushes. */
class FakeProvider implements DrProvider {
  readonly name = 'Fake';
  readonly isSimulated = true;
  readonly telemetryIsSimulated = true;
  private snapshot = new MockDrProvider();
  private state = SystemState.IDLE;
  private stateListeners = new Set<(s: SystemState) => void>();

  constructor() {
    this.snapshot.dispose(); // only used for initial data; no timers
  }

  getState = () => this.state;
  getMetrics = (): BasicMetrics => this.snapshot.getMetrics();
  getTelemetry = (): DrTelemetry => this.snapshot.getTelemetry();
  getRecentLogs = (): LogEvent[] => this.snapshot.getRecentLogs();
  onStateChange = (l: (s: SystemState) => void) => {
    this.stateListeners.add(l);
    return () => void this.stateListeners.delete(l);
  };
  onMetricsUpdate = () => () => {};
  onDrTelemetryUpdate = () => () => {};
  onLogEvent = () => () => {};
  triggerFailover = vi.fn(async () => {});
  abortFailover = vi.fn(() => true);
  resetToStandby = vi.fn();
  setChaosMode = vi.fn();
  dispose = vi.fn();

  push(state: SystemState) {
    this.state = state;
    act(() => this.stateListeners.forEach((l) => l(state)));
  }
}

let provider: FakeProvider;

/** Renders the app and waits for the lazy 3D globe so no suspense update leaks past the test. */
async function renderApp() {
  const utils = render(
    <DrProviderRoot provider={provider}>
      <App />
    </DrProviderRoot>,
  );
  await screen.findByTestId('globe');
  return utils;
}

describe('AetherVault Command Center', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    provider = new FakeProvider();
  });

  test('prevents accidental failover on quick clicks (requires hold)', async () => {
    await renderApp();
    const button = screen.getByText('1-CLICK FAILOVER');
    fireEvent.mouseDown(button);
    fireEvent.mouseUp(button);
    expect(provider.triggerFailover).not.toHaveBeenCalled();
  });

  test('triggers failover after the full 1.2s hold', async () => {
    await renderApp();
    fireEvent.mouseDown(screen.getByText('1-CLICK FAILOVER'));
    await waitFor(
      () => expect(provider.triggerFailover).toHaveBeenCalledWith('us-east-1', 'gcp-us-central1'),
      { timeout: 3000 },
    );
  });

  test('progresses through state machine phases', async () => {
    await renderApp();
    provider.push(SystemState.REPLICATING);
    expect(await screen.findByText(/QUIESCE AND SNAPSHOT\.\.\./i)).toBeInTheDocument();

    provider.push(SystemState.REROUTING_TRAFFIC);
    expect(await screen.findByText(/DNS CUTOVER\.\.\./i)).toBeInTheDocument();

    provider.push(SystemState.SECURED);
    expect(await screen.findByText(/Live Workloads Routed to gcp-us-central1/)).toBeInTheDocument();
  });

  test('Abort is offered before cutover and calls the provider', async () => {
    await renderApp();
    provider.push(SystemState.REPLICATING);
    fireEvent.click(await screen.findByText('Abort Failover'));
    expect(provider.abortFailover).toHaveBeenCalledTimes(1);
  });

  test('Abort is hidden once traffic cutover starts', async () => {
    await renderApp();
    provider.push(SystemState.REROUTING_TRAFFIC);
    expect(await screen.findByText(/Abort no longer available/)).toBeInTheDocument();
    expect(screen.queryByText('Abort Failover')).not.toBeInTheDocument();
  });

  test('Reset to Standby returns the console to the failover button', async () => {
    await renderApp();
    provider.push(SystemState.SECURED);
    fireEvent.click(await screen.findByText('Reset to Standby'));
    expect(provider.resetToStandby).toHaveBeenCalledTimes(1);

    provider.push(SystemState.IDLE);
    expect(await screen.findByText('1-CLICK FAILOVER')).toBeInTheDocument();
  });

  test('chaos mode shows a wrappable DEGRADED JITTER system state', async () => {
    await renderApp();
    fireEvent.click(screen.getByText('SDET Chaos Mode'));
    expect(provider.setChaosMode).toHaveBeenCalledWith(true);

    const state = screen.getByText('DEGRADED JITTER');
    expect(state).toHaveClass('break-words');
    expect(screen.queryByText('DEGRADED_JITTER')).not.toBeInTheDocument();
  });

  test('labels simulated data', async () => {
    await renderApp();
    expect(screen.getByText('SIMULATED DATA')).toBeInTheDocument();
  });

  test('loads the 3D globe lazily', async () => {
    await renderApp();
    expect(screen.getByTestId('globe')).toBeInTheDocument();
  });

  test('renders initial metrics from the provider snapshot', async () => {
    await renderApp();
    expect(screen.getByText('RPO (Lag)')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
  });

  test('keyboard: holding Space for 1.2s triggers failover', async () => {
    await renderApp();
    vi.useFakeTimers();
    try {
      const button = screen.getByText('1-CLICK FAILOVER').closest('button')!;
      fireEvent.keyDown(button, { key: ' ' });
      act(() => vi.advanceTimersByTime(1250));
      expect(provider.triggerFailover).toHaveBeenCalledWith('us-east-1', 'gcp-us-central1');
    } finally {
      vi.useRealTimers();
    }
  });

  test('keyboard: a quick Enter tap does not trigger failover', async () => {
    await renderApp();
    vi.useFakeTimers();
    try {
      const button = screen.getByText('1-CLICK FAILOVER').closest('button')!;
      fireEvent.keyDown(button, { key: 'Enter' });
      act(() => vi.advanceTimersByTime(300));
      fireEvent.keyUp(button, { key: 'Enter' });
      act(() => vi.advanceTimersByTime(2000));
      expect(provider.triggerFailover).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });

  test('moving focus away cancels a keyboard hold', async () => {
    await renderApp();
    vi.useFakeTimers();
    try {
      const button = screen.getByText('1-CLICK FAILOVER').closest('button')!;
      fireEvent.keyDown(button, { key: ' ' });
      fireEvent.blur(button);
      act(() => vi.advanceTimersByTime(2000));
      expect(provider.triggerFailover).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});
