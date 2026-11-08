// Console-mode UI: header session, approval panel, view-only notice, sign-in form.
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import App from './App';
import {
  SystemState,
  type ApprovalCapability,
  type DrProvider,
  type FailoverRun,
  type MemberRole,
} from './domain/dr';
import SignInForm from './features/console/SignInForm';
import { DrProviderRoot } from './providers/DrProviderContext';
import { MockDrProvider } from './providers/MockDrProvider';

vi.mock('./features/topology/GlobalTopologyCanvas', () => ({
  default: () => <div data-testid="globe" />,
}));
vi.mock('./lib/audioEffects', () => ({
  sound: {
    isMuted: true,
    startHoldCharge: vi.fn(),
    stopHoldCharge: vi.fn(),
    playFailoverTriggered: vi.fn(),
    playSecuredChime: vi.fn(),
    playChaosGlitch: vi.fn(),
  },
  saveSoundEnabled: vi.fn(),
}));

const pendingRun = (over: Partial<FailoverRun> = {}): FailoverRun => ({
  id: 'run-1',
  sourceRegion: 'us-east-1',
  targetRegion: 'aws-us-west-2',
  requestedByEmail: 'op@test',
  requestedByMe: false,
  requestedAt: new Date().toISOString(),
  approvedByEmail: null,
  approvedAt: null,
  pendingApproval: true,
  ...over,
});

/** Console-style provider: real snapshot data, controllable run and role. */
function consoleProvider(role: MemberRole, run: FailoverRun | null) {
  const base = new MockDrProvider();
  base.dispose();
  const listeners = new Set<(r: FailoverRun | null) => void>();
  let current = run;
  const approvals: ApprovalCapability = {
    role,
    getRun: () => current,
    onRunChange: (l) => {
      listeners.add(l);
      return () => void listeners.delete(l);
    },
    canRequest: () => role !== 'viewer',
    canApprove: () =>
      !!current?.pendingApproval &&
      !current.requestedByMe &&
      (role === 'approver' || role === 'admin'),
    approve: vi.fn(async () => {}),
    cancel: vi.fn(async () => {}),
  };
  const provider: DrProvider = {
    name: 'Acme',
    isSimulated: false,
    telemetryIsSimulated: true,
    approvals,
    getState: () => SystemState.IDLE,
    getMetrics: () => base.getMetrics(),
    getTelemetry: () => base.getTelemetry(),
    getRecentLogs: () => [],
    onStateChange: () => () => {},
    onMetricsUpdate: () => () => {},
    onDrTelemetryUpdate: () => () => {},
    onLogEvent: () => () => {},
    triggerFailover: vi.fn(async () => {}),
    abortFailover: () => false,
    resetToStandby: () => {},
    setChaosMode: () => {},
    dispose: () => {},
  };
  const setRun = (r: FailoverRun | null) => {
    current = r;
    act(() => listeners.forEach((l) => l(r)));
  };
  return { provider, approvals, setRun };
}

async function renderConsole(provider: DrProvider, onSignOut = vi.fn()) {
  render(
    <DrProviderRoot provider={provider}>
      <App session={{ orgName: 'Acme', role: 'approver', email: 'ap@test', onSignOut }} />
    </DrProviderRoot>,
  );
  await screen.findByTestId('globe');
  return { onSignOut };
}

describe('console header', () => {
  test('shows simulated-telemetry badge, org, role and sign-out', async () => {
    const { provider } = consoleProvider('approver', null);
    const { onSignOut } = await renderConsole(provider);
    expect(screen.getByText('SIMULATED TELEMETRY')).toBeInTheDocument();
    expect(screen.queryByText('SIMULATED DATA')).not.toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(onSignOut).toHaveBeenCalled();
  });

  test('public demo shows a sign-in link only when a backend is configured', async () => {
    const demo = new MockDrProvider();
    const { unmount } = render(
      <DrProviderRoot provider={demo}>
        <App signInHref="#/console" />
      </DrProviderRoot>,
    );
    await screen.findByTestId('globe');
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '#/console');
    unmount();
    render(
      <DrProviderRoot provider={demo}>
        <App />
      </DrProviderRoot>,
    );
    await screen.findByTestId('globe');
    expect(screen.queryByRole('link', { name: 'Sign in' })).not.toBeInTheDocument();
    demo.dispose();
  });
});

describe('approval panel', () => {
  test('approver sees who asked and can approve', async () => {
    const { provider, approvals } = consoleProvider('approver', pendingRun());
    await renderConsole(provider);
    expect(screen.getByText('Awaiting second-person approval')).toBeInTheDocument();
    expect(
      screen.getByText(/op@test requested failover us-east-1 → aws-us-west-2/),
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /1-CLICK FAILOVER/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Approve failover' }));
    await waitFor(() => expect(approvals.approve).toHaveBeenCalled());
    fireEvent.click(screen.getByRole('button', { name: 'Reject request' }));
    await waitFor(() => expect(approvals.cancel).toHaveBeenCalled());
  });

  test('requester cannot approve but can withdraw', async () => {
    const { provider } = consoleProvider('approver', pendingRun({ requestedByMe: true }));
    await renderConsole(provider);
    expect(screen.getByText(/You requested failover/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Approve failover' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Withdraw request' })).toBeInTheDocument();
  });

  test('a failed approval shows the server message', async () => {
    const { provider, approvals } = consoleProvider('approver', pendingRun());
    vi.mocked(approvals.approve).mockRejectedValueOnce(new Error('run is not awaiting approval'));
    await renderConsole(provider);
    fireEvent.click(screen.getByRole('button', { name: 'Approve failover' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('run is not awaiting approval');
  });

  test('panel disappears when the run is withdrawn elsewhere', async () => {
    const { provider, setRun } = consoleProvider('operator', pendingRun());
    await renderConsole(provider);
    expect(screen.getByText(/Only an approver or admin can approve/)).toBeInTheDocument();
    setRun(null);
    expect(screen.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeInTheDocument();
  });

  test('viewers get a read-only notice instead of the failover button', async () => {
    const { provider } = consoleProvider('viewer', null);
    await renderConsole(provider);
    expect(screen.getByText(/View-only access \(viewer\)/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /1-CLICK FAILOVER/ })).not.toBeInTheDocument();
  });
});

describe('SignInForm', () => {
  test('password sign-in passes trimmed email and shows errors', async () => {
    const onPasswordSignIn = vi.fn().mockRejectedValueOnce(new Error('Invalid login credentials'));
    render(<SignInForm onPasswordSignIn={onPasswordSignIn} onMagicLink={vi.fn()} />);
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: ' a@b.co ' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'pw' } });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid login credentials');
    expect(onPasswordSignIn).toHaveBeenCalledWith('a@b.co', 'pw');
  });

  test('magic link needs an email, then confirms it was sent', async () => {
    const onMagicLink = vi.fn(async () => {});
    render(<SignInForm onPasswordSignIn={vi.fn()} onMagicLink={onMagicLink} />);
    fireEvent.click(screen.getByRole('button', { name: /Email me a sign-in link/ }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter your email first.');
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'a@b.co' } });
    fireEvent.click(screen.getByRole('button', { name: /Email me a sign-in link/ }));
    expect(await screen.findByRole('status')).toHaveTextContent('Sign-in link sent to a@b.co.');
  });

  test('demo account shortcuts fill the form (local only)', () => {
    render(
      <SignInForm
        onPasswordSignIn={vi.fn()}
        onMagicLink={vi.fn()}
        demoAccounts={['operator@aethervault.local']}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'operator@aethervault.local' }));
    expect(screen.getByLabelText('Email')).toHaveValue('operator@aethervault.local');
    expect(screen.getByLabelText('Password')).toHaveValue('aether-demo-local');
  });
});
