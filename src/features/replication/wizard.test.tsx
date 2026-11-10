import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { ReplicationCapability, ReplicationStatus } from '../../domain/dr';
import ConnectAwsWizard from './ConnectAwsWizard';
import { agentCommands, tfvars } from './setup';

const ENDPOINT = { url: 'https://abc.supabase.co', anonKey: 'anon-key', isLocal: false };
const TOKEN = 'avi_' + 'a'.repeat(48);

const live = (over: Partial<ReplicationStatus> = {}): ReplicationStatus => ({
  source: 'aws-drs',
  collectedAt: '2026-11-10T11:59:40Z',
  receivedAt: '2026-11-10T11:59:41Z',
  serverNow: '2026-11-10T12:00:00Z',
  awsAccountId: '111122223333',
  awsRegion: 'us-west-2',
  collectorVersion: '0.1.0',
  serverCount: 1,
  healthyCount: 1,
  problemCount: 0,
  maxLagSeconds: 2,
  backlogBytes: 0,
  rpoTargetSeconds: 60,
  rpoMet: true,
  servers: [],
  ...over,
});

const fakeReplication = (): ReplicationCapability => ({
  latest: vi.fn(async () => null),
  history: vi.fn(async () => []),
  tokenStatus: vi.fn(async () => null),
  createToken: vi.fn(async () => TOKEN),
  revokeToken: vi.fn(async () => {}),
});

function renderWizard(over: Partial<Parameters<typeof ConnectAwsWizard>[0]> = {}) {
  const props = {
    orgId: 'org-1',
    replication: fakeReplication(),
    isAdmin: true,
    token: null,
    status: null,
    live: false,
    endpoint: ENDPOINT,
    onChanged: vi.fn(),
    ...over,
  };
  return { ...render(<ConnectAwsWizard {...props} />), props };
}

afterEach(() => window.localStorage.clear());

describe('setup helpers', () => {
  test('Terraform settings are filled in from the console; the token placeholder is obvious', () => {
    expect(tfvars('us-west-2', 'https://abc.supabase.co', 'anon', TOKEN)).toContain(
      `ingest_token         = "${TOKEN}"`,
    );
    const blank = tfvars('us-east-2', 'https://abc.supabase.co', 'anon', null);
    expect(blank).toContain('drs_region           = "us-east-2"');
    expect(blank).toContain('ingest_token         = "PASTE_THE_TOKEN_YOU_SAVED"');
  });

  test('agent commands use the region-specific installer and short-lived credentials', () => {
    const { linux, windows } = agentCommands('us-east-2');
    expect(linux).toContain(
      'https://aws-elastic-disaster-recovery-us-east-2.s3.us-east-2.amazonaws.com/latest/linux/aws-replication-installer-init',
    );
    expect(linux).toContain('--region us-east-2 --no-prompt');
    expect(linux).toContain('AWS_SESSION_TOKEN');
    expect(windows).toContain('/latest/windows/AwsReplicationWindowsInstaller.exe');
    expect(windows).toContain('--region us-east-2 --no-prompt');
  });
});

describe('ConnectAwsWizard', () => {
  test('starts open with nothing done; ticks and region are remembered per organization', () => {
    const { unmount } = renderWizard();
    expect(screen.getByTestId('setup-progress')).toHaveTextContent('0 of 6 steps done');
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'us-east-2' } });
    expect(screen.getByText(/aws drs initialize-service --region us-east-2/)).toBeInTheDocument();
    fireEvent.click(within(screen.getByTestId('setup-step-1')).getByLabelText('Done'));
    expect(screen.getByTestId('setup-progress')).toHaveTextContent('1 of 6 steps done');
    unmount();

    renderWizard();
    expect(screen.getByTestId('setup-progress')).toHaveTextContent('1 of 6 steps done');
    expect(screen.getByRole('combobox')).toHaveValue('us-east-2');
    expect(screen.getByTestId('setup-step-1')).toHaveAttribute('data-done', 'true');
  });

  test('creating the token puts it into the Terraform settings, shown once', async () => {
    const { props } = renderWizard();
    fireEvent.click(screen.getByRole('button', { name: 'Create token' }));
    await waitFor(() =>
      expect(screen.getByText(/ingest_token\s+= "avi_a{48}"/)).toBeInTheDocument(),
    );
    expect(props.onChanged).toHaveBeenCalled();
    expect(screen.getByText(/aethervault_url\s+= "https:\/\/abc.supabase.co"/)).toBeInTheDocument();
  });

  test('replacing an existing token asks first', () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    const { props } = renderWizard({
      token: { hint: 'beef', createdAt: '2026-11-10T00:00:00Z', lastUsedAt: null },
    });
    expect(screen.getByTestId('setup-step-4')).toHaveAttribute('data-done', 'true');
    fireEvent.click(screen.getByRole('button', { name: /Create a new token/ }));
    expect(confirm).toHaveBeenCalled();
    expect(props.replication.createToken).not.toHaveBeenCalled();
    confirm.mockRestore();
  });

  test('live data completes every step and starts collapsed', () => {
    renderWizard({
      status: live(),
      live: true,
      token: { hint: 'beef', createdAt: '2026-11-10T00:00:00Z', lastUsedAt: null },
    });
    expect(screen.getByTestId('setup-progress')).toHaveTextContent('6 of 6 steps · connected');
    expect(screen.queryByTestId('setup-step-1')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: /Connect your AWS account/ }));
    expect(screen.getByTestId('setup-live')).toHaveTextContent(
      'Connected: 1 server reporting from account 111122223333 in us-west-2.',
    );
  });

  test('sample data does not count as connected; stale data points at the logs', () => {
    const { unmount } = renderWizard({ status: live({ source: 'fixture' }) });
    expect(screen.getByTestId('setup-live')).toHaveTextContent('Only sample data so far');
    expect(screen.getByTestId('setup-step-3')).toHaveAttribute('data-done', 'false');
    unmount();
    renderWizard({ status: live(), live: false });
    expect(screen.getByTestId('setup-live')).toHaveTextContent(/Check the Lambda logs/);
  });

  test('non-admins follow along read-only; a local database is called out', () => {
    renderWizard({
      isAdmin: false,
      endpoint: { ...ENDPOINT, url: 'http://127.0.0.1:54321', isLocal: true },
    });
    expect(screen.queryByLabelText('Done')).toBeNull();
    expect(screen.queryByRole('button', { name: /token/i })).toBeNull();
    expect(screen.getByText('An admin creates the token.')).toBeInTheDocument();
    expect(screen.getByText(/A collector in AWS cannot reach/)).toBeInTheDocument();
  });
});
