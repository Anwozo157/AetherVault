import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import App from './App';
import { SystemState } from './MockBackend';

// Capture the listeners App registers so tests can push state changes into it.
const listeners = vi.hoisted(() => ({
  state: null as null | ((s: string) => void),
}));

vi.mock('./MockBackend', async (importActual) => {
  const actual = await importActual<typeof import('./MockBackend')>();
  return {
    ...actual,
    backend: {
      onStateChange: vi.fn((cb) => {
        listeners.state = cb;
        return () => {};
      }),
      onMetricsUpdate: vi.fn(() => () => {}),
      onDrTelemetryUpdate: vi.fn(() => () => {}),
      onLogEvent: vi.fn(() => () => {}),
      setChaosMode: vi.fn(),
      triggerFailover: vi.fn(),
      resetToStandby: vi.fn(),
    },
  };
});

// WebGL and Web Audio are not available in jsdom.
vi.mock('./GlobalTopologyCanvas', () => ({ default: () => <div data-testid="globe" /> }));
vi.mock('./audioEffects', () => ({
  sound: {
    isMuted: false,
    startHoldCharge: vi.fn(),
    stopHoldCharge: vi.fn(),
    playFailoverTriggered: vi.fn(),
    playSecuredChime: vi.fn(),
    playChaosGlitch: vi.fn(),
  },
}));

const { backend } = await import('./MockBackend');

function pushState(state: SystemState) {
  act(() => listeners.state!(state));
}

describe('AetherVault Command Center - Chaos & Resilience Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    listeners.state = null;
  });

  test('prevents accidental failover on quick clicks (requires hold)', () => {
    render(<App />);
    const failoverButton = screen.getByText('1-CLICK FAILOVER');

    fireEvent.mouseDown(failoverButton);
    fireEvent.mouseUp(failoverButton);

    expect(backend.triggerFailover).not.toHaveBeenCalled();
  });

  test('triggers failover after the full 1.2s hold', async () => {
    render(<App />);
    fireEvent.mouseDown(screen.getByText('1-CLICK FAILOVER'));

    await waitFor(
      () => expect(backend.triggerFailover).toHaveBeenCalledWith('us-east-1', 'gcp-us-central1'),
      { timeout: 3000 },
    );
  });

  test('progresses through state machine phases', async () => {
    render(<App />);

    pushState(SystemState.REPLICATING);
    expect(await screen.findByText(/QUIESCE AND SNAPSHOT\.\.\./i)).toBeInTheDocument();

    pushState(SystemState.REROUTING_TRAFFIC);
    expect(await screen.findByText(/DNS CUTOVER\.\.\./i)).toBeInTheDocument();

    pushState(SystemState.SECURED);
    expect(await screen.findByText(/Live Workloads Routed to gcp-us-central1/)).toBeInTheDocument();
  });

  test('Reset to Standby returns the console to the failover button', async () => {
    render(<App />);
    pushState(SystemState.SECURED);

    fireEvent.click(await screen.findByText('Reset to Standby'));
    expect(backend.resetToStandby).toHaveBeenCalledTimes(1);

    pushState(SystemState.IDLE);
    expect(await screen.findByText('1-CLICK FAILOVER')).toBeInTheDocument();
  });

  test('renders safely with no telemetry received', () => {
    render(<App />);
    expect(screen.getByText('RPO (Lag)')).toBeInTheDocument();
  });
});
