import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { ReplicationCapability, ReplicationStatus } from '../../domain/dr';
import ReplicationPanel, { ago, formatBytes, formatLag, freshness } from './ReplicationPanel';

const NOW = '2026-11-10T12:00:00Z';
const status = (over: Partial<ReplicationStatus> = {}): ReplicationStatus => ({
  source: 'aws-drs',
  collectedAt: '2026-11-10T11:59:40Z',
  receivedAt: '2026-11-10T11:59:41Z',
  serverNow: NOW,
  awsAccountId: '111122223333',
  awsRegion: 'us-west-2',
  collectorVersion: '0.1.0',
  serverCount: 4,
  healthyCount: 1,
  problemCount: 2,
  maxLagSeconds: 130,
  backlogBytes: 3 * 1024 ** 3,
  rpoTargetSeconds: 60,
  rpoMet: false,
  servers: [
    {
      id: 's-2',
      hostname: 'db-server-01',
      state: 'BACKLOG',
      health: 'lagging',
      lagSeconds: 130,
      lagRaw: 'PT2M10S',
      backlogBytes: 3 * 1024 ** 3,
      totalBytes: 100,
      replicatedBytes: 100,
      etaAt: null,
      lastSeenAt: '2026-11-10T11:59:40Z',
      error: null,
      lastLaunchResult: 'NOT_STARTED',
    },
    {
      id: 's-3',
      hostname: 'file-server-01',
      state: 'STALLED',
      health: 'stalled',
      lagSeconds: null,
      lagRaw: null,
      backlogBytes: 0,
      totalBytes: 100,
      replicatedBytes: 100,
      etaAt: null,
      lastSeenAt: '2026-11-10T11:41:00Z',
      error: 'UNSTABLE_NETWORK',
      lastLaunchResult: null,
    },
    {
      id: 's-4',
      hostname: 'reports-server-01',
      state: 'INITIAL_SYNC',
      health: 'syncing',
      lagSeconds: null,
      lagRaw: null,
      backlogBytes: 0,
      totalBytes: 300,
      replicatedBytes: 96,
      etaAt: '2026-11-10T15:15:00Z',
      lastSeenAt: '2026-11-10T11:59:40Z',
      error: null,
      lastLaunchResult: null,
    },
  ],
  ...over,
});

const fake = (over: Partial<ReplicationCapability> = {}): ReplicationCapability => ({
  latest: vi.fn(async () => status()),
  history: vi.fn(async () => [
    { collectedAt: '2026-11-10T11:58:00Z', maxLagSeconds: 4, rpoMet: true },
    { collectedAt: '2026-11-10T11:59:00Z', maxLagSeconds: 130, rpoMet: false },
  ]),
  tokenStatus: vi.fn(async () => ({
    hint: 'abcd',
    createdAt: '2026-11-10T09:00:00Z',
    lastUsedAt: '2026-11-10T11:59:41Z',
  })),
  createToken: vi.fn(async () => 'avi_' + 'f'.repeat(48)),
  revokeToken: vi.fn(async () => {}),
  ...over,
});

afterEach(() => vi.useRealTimers());

describe('formatting', () => {
  test('bytes, lag, relative time, freshness', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1536)).toBe('1.5 KiB');
    expect(formatBytes(3 * 1024 ** 3)).toBe('3 GiB');
    expect(formatBytes(2000 * 1024 ** 3)).toBe('2 TiB');
    expect(formatLag(null)).toBe('unknown');
    expect(formatLag(2)).toBe('2 s');
    expect(formatLag(130)).toBe('2 min 10 s');
    expect(formatLag(120)).toBe('2 min');
    expect(formatLag(3900)).toBe('1 h 5 min');
    expect(formatLag(7200)).toBe('2 h');
    expect(ago(null, NOW)).toBe('never');
    expect(ago('2026-11-10T11:59:40Z', NOW)).toBe('20 s ago');
    expect(ago('2026-11-10T11:41:00Z', NOW)).toBe('19 min ago');
    expect(ago('2026-11-10T09:00:00Z', NOW)).toBe('3 h ago');
    expect(ago('2026-11-01T00:00:00Z', NOW)).toBe('10 days ago');
    expect(freshness(status())).toBe('live');
    expect(freshness(status({ receivedAt: '2026-11-10T11:50:00Z' }))).toBe('stale');
    expect(freshness(status({ source: 'fixture' }))).toBe('sample');
  });
});

describe('ReplicationPanel', () => {
  test('live data: RPO at risk, per-server health, lag and sync progress', async () => {
    render(<ReplicationPanel replication={fake()} myRole="viewer" refreshKey={0} />);
    expect(await screen.findByTestId('replication-badge')).toHaveTextContent('LIVE · AWS DRS');
    expect(
      screen.getByText('Account 111122223333 · us-west-2 · collected 20 s ago'),
    ).toBeInTheDocument();
    expect(screen.getByText('At risk')).toBeInTheDocument();
    expect(screen.getByText('worst lag 2 min 10 s · target 1 min')).toBeInTheDocument();
    expect(screen.getByText('1 of 4')).toBeInTheDocument();
    expect(screen.getByTestId('server-db-server-01')).toHaveTextContent('Catching up');
    expect(screen.getByTestId('server-file-server-01')).toHaveTextContent(
      'StalledSTALLED · UNSTABLE_NETWORK',
    );
    expect(screen.getByTestId('server-file-server-01')).toHaveTextContent('unknown');
    expect(screen.getByTestId('server-reports-server-01')).toHaveTextContent('INITIAL_SYNC · 32%');
    expect(screen.getByText('Worst lag, last 2 reports')).toBeInTheDocument();
    expect(screen.getByText('Only admins manage the collector token.')).toBeInTheDocument();
  });

  test('stale and sample data are labeled', async () => {
    const { unmount } = render(
      <ReplicationPanel
        replication={fake({
          latest: vi.fn(async () => status({ receivedAt: '2026-11-10T11:00:00Z' })),
        })}
        myRole="viewer"
        refreshKey={0}
      />,
    );
    expect(await screen.findByTestId('replication-badge')).toHaveTextContent('STALE');
    expect(screen.getByText(/No update for over 5 minutes/)).toBeInTheDocument();
    unmount();
    render(
      <ReplicationPanel
        replication={fake({
          latest: vi.fn(async () => status({ source: 'fixture', rpoMet: true, problemCount: 0 })),
        })}
        myRole="viewer"
        refreshKey={0}
      />,
    );
    expect(await screen.findByTestId('replication-badge')).toHaveTextContent(
      'SAMPLE DATA · NOT A REAL ACCOUNT',
    );
    expect(screen.getByText('Met')).toBeInTheDocument();
    expect(screen.getByText('all normal')).toBeInTheDocument();
  });

  test('not connected: admins create a token, shown once, and can copy it', async () => {
    const writeText = vi.fn(async () => {});
    Object.assign(navigator, { clipboard: { writeText } });
    const replication = fake({
      latest: vi.fn(async () => null),
      history: vi.fn(async () => []),
      tokenStatus: vi.fn(async () => null),
    });
    render(<ReplicationPanel replication={replication} myRole="admin" refreshKey={0} />);
    expect(await screen.findByText('No replication data received yet.')).toBeInTheDocument();
    expect(screen.getByTestId('token-status')).toHaveTextContent('No collector token yet.');
    fireEvent.click(screen.getByRole('button', { name: 'Create collector token' }));
    expect(await screen.findByTestId('new-token')).toHaveTextContent('avi_' + 'f'.repeat(48));
    expect(screen.getByText(/It is shown once; only a hash is stored/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('avi_' + 'f'.repeat(48)));
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  test('rotate and revoke ask for confirmation', async () => {
    const confirm = vi.spyOn(window, 'confirm');
    const replication = fake();
    render(<ReplicationPanel replication={replication} myRole="admin" refreshKey={0} />);
    expect(await screen.findByTestId('token-status')).toHaveTextContent('Collector token …abcd');
    confirm.mockReturnValueOnce(false);
    fireEvent.click(screen.getByRole('button', { name: 'Rotate token' }));
    expect(replication.createToken).not.toHaveBeenCalled();
    confirm.mockReturnValueOnce(true);
    fireEvent.click(screen.getByRole('button', { name: 'Revoke' }));
    await waitFor(() => expect(replication.revokeToken).toHaveBeenCalled());
    confirm.mockRestore();
  });

  test('errors are shown; polls every 30 s', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const replication = fake({ latest: vi.fn(async () => Promise.reject(new Error('boom'))) });
    render(<ReplicationPanel replication={replication} myRole="viewer" refreshKey={0} />);
    expect(await screen.findByText('boom')).toBeInTheDocument();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30_000);
    });
    expect(replication.latest).toHaveBeenCalledTimes(2);
  });
});
