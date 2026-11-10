import type { DescribeSourceServersResponse } from '@aws-sdk/client-drs';
import { describe, expect, test, vi } from 'vitest';
import degraded from './fixtures/describe-source-servers.degraded.json';
import healthy from './fixtures/describe-source-servers.healthy.json';
import { collectSnapshot, listAllSourceServers, pushSnapshot, recordedApi } from './collect';
import { accountFromArn, buildSnapshot, parseLagSeconds, rebaseSampleTimes } from './snapshot';

const pages = (x: unknown) => x as DescribeSourceServersResponse[];
const NOW = new Date('2026-11-09T22:00:00Z');

describe('parseLagSeconds', () => {
  test.each([
    ['PT2S', 2],
    ['PT0.5S', 0.5],
    ['PT2M10S', 130],
    ['PT1H', 3600],
    ['P1DT2H3M4S', 93784],
    ['12', 12],
    ['7.25', 7.25],
  ])('%s -> %s seconds', (raw, secs) => expect(parseLagSeconds(raw)).toBe(secs));

  test.each([[undefined], [null], [''], ['P'], ['PT'], ['5 seconds'], ['-PT5S'], ['PT5X']])(
    'unparseable %s -> null (shown as unknown, never guessed)',
    (raw) => expect(parseLagSeconds(raw)).toBeNull(),
  );
});

test('accountFromArn', () => {
  expect(
    accountFromArn('arn:aws:drs:us-west-2:111122223333:source-server/s-0a1b2c3d4e5f60001'),
  ).toBe('111122223333');
  expect(accountFromArn('arn:aws-us-gov:drs:us-gov-west-1:111122223333:source-server/s-x')).toBe(
    '111122223333',
  );
  expect(accountFromArn('not-an-arn')).toBeNull();
  expect(accountFromArn(undefined)).toBeNull();
});

describe('collector against recorded responses', () => {
  test('follows nextToken across pages', async () => {
    const api = recordedApi(pages(healthy));
    const spy = vi.spyOn(api, 'describeSourceServers');
    const items = await listAllSourceServers(api);
    expect(items.map((s) => s.sourceServerID)).toEqual([
      's-0a1b2c3d4e5f60001',
      's-0a1b2c3d4e5f60002',
      's-0a1b2c3d4e5f60003',
    ]);
    expect(spy.mock.calls).toEqual([[undefined], ['page-1']]);
  });

  test('stops a runaway pagination loop', async () => {
    const api = { describeSourceServers: async () => ({ items: [], nextToken: 'again' }) };
    await expect(listAllSourceServers(api)).rejects.toThrow('more than 100 pages');
  });

  test('healthy account: status only, lag parsed, bytes summed across disks', async () => {
    const snap = await collectSnapshot(recordedApi(pages(healthy)), {
      region: 'us-west-2',
      now: NOW,
    });
    expect(snap).toMatchObject({
      source: 'aws-drs',
      collected_at: '2026-11-09T22:00:00.000Z',
      aws_account_id: '111122223333',
      aws_region: 'us-west-2',
      collector_version: '0.1.0',
    });
    expect(snap.servers[1]).toEqual({
      id: 's-0a1b2c3d4e5f60002',
      hostname: 'db-server-01',
      state: 'CONTINUOUS',
      lag_seconds: 4,
      lag_raw: 'PT4S',
      backlog_bytes: 0,
      total_bytes: 620 * 1024 ** 3,
      replicated_bytes: 620 * 1024 ** 3,
      eta_at: null,
      last_seen_at: '2026-11-09T21:59:40Z',
      error: null,
      last_launch_result: 'NOT_STARTED',
    });
    // Nothing beyond the status fields leaves the account (no OS, IPs, tags, raw errors).
    expect(JSON.stringify(snap)).not.toMatch(/Windows|rawError|fqdn|ramBytes|tags/);
  });

  test('degraded account: backlog, stalled with error, initial sync with ETA', async () => {
    const snap = await collectSnapshot(recordedApi(pages(degraded)), {
      region: 'us-west-2',
      source: 'fixture',
      now: NOW,
    });
    const by = Object.fromEntries(snap.servers.map((s) => [s.hostname, s]));
    expect(snap.source).toBe('fixture');
    expect(by['db-server-01']).toMatchObject({
      state: 'BACKLOG',
      lag_seconds: 130,
      backlog_bytes: 3 * 1024 ** 3,
    });
    expect(by['file-server-01']).toMatchObject({
      state: 'STALLED',
      lag_seconds: null,
      error: 'UNSTABLE_NETWORK',
    });
    expect(by['reports-server-01']).toMatchObject({
      state: 'INITIAL_SYNC',
      eta_at: '2026-11-10T03:15:00Z',
      replicated_bytes: 96 * 1024 ** 3,
    });
  });

  test('failback copies are excluded; servers without an ID are skipped; fqdn/ID fallbacks', () => {
    const snap = buildSnapshot(
      [
        { sourceServerID: 's-a', replicationDirection: 'FAILBACK' },
        { arn: 'arn:aws:drs:us-west-2:111122223333:source-server/s-b' },
        { sourceServerID: 's-c', sourceProperties: { identificationHints: { fqdn: 'c.corp' } } },
        { sourceServerID: 's-d' },
      ],
      { region: 'us-west-2', source: 'aws-drs', collectorVersion: 't', now: NOW },
    );
    expect(snap.servers.map((s) => [s.id, s.hostname, s.state])).toEqual([
      ['s-c', 'c.corp', 'UNKNOWN'],
      ['s-d', 's-d', 'UNKNOWN'],
    ]);
    expect(snap.aws_account_id).toBe('111122223333');
  });
});

test('sample mode shifts server times relative to now', async () => {
  const snap = await collectSnapshot(recordedApi(pages(degraded)), {
    region: 'us-west-2',
    source: 'fixture',
    now: NOW,
  });
  const later = rebaseSampleTimes(snap, '2026-11-09T22:00:00Z', new Date('2026-11-12T10:00:00Z'));
  const file = later.servers.find((s) => s.hostname === 'file-server-01')!;
  const reports = later.servers.find((s) => s.hostname === 'reports-server-01')!;
  expect(file.last_seen_at).toBe('2026-11-12T09:41:02.000Z');
  expect(reports.eta_at).toBe('2026-11-12T15:15:00.000Z');
  expect(reports.last_seen_at).toBe('2026-11-12T09:59:40.000Z');
  expect(later.servers.find((s) => s.hostname === 'app-server-01')!.eta_at).toBeNull();
});

describe('pushSnapshot', () => {
  const target = { url: 'https://proj.supabase.co/', anonKey: 'anon', token: 'avi_x' };
  const snap = buildSnapshot([], {
    region: 'us-west-2',
    source: 'aws-drs',
    collectorVersion: 't',
    now: NOW,
  });

  test('posts to the ingest RPC with the anon key and token', async () => {
    const fetchImpl = vi.fn(
      async () => new Response('{"accepted":true,"rpo_met":null,"servers":0}'),
    );
    await expect(pushSnapshot(target, snap, fetchImpl as unknown as typeof fetch)).resolves.toEqual(
      {
        accepted: true,
        rpo_met: null,
        servers: 0,
      },
    );
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('https://proj.supabase.co/rest/v1/rpc/ingest_replication_snapshot');
    expect(init.headers).toMatchObject({ apikey: 'anon', Authorization: 'Bearer anon' });
    expect(JSON.parse(String(init.body))).toEqual({ p_token: 'avi_x', p_snapshot: snap });
  });

  test('surfaces the database error message', async () => {
    const fetchImpl = vi.fn(
      async () => new Response('{"message":"invalid ingest token"}', { status: 403 }),
    );
    await expect(pushSnapshot(target, snap, fetchImpl as unknown as typeof fetch)).rejects.toThrow(
      'AetherVault rejected the snapshot (HTTP 403): invalid ingest token',
    );
    const plain = vi.fn(async () => new Response('Bad Gateway', { status: 502 }));
    await expect(pushSnapshot(target, snap, plain as unknown as typeof fetch)).rejects.toThrow(
      '(HTTP 502): Bad Gateway',
    );
  });

  test('refuses a non-HTTP URL', async () => {
    await expect(pushSnapshot({ ...target, url: 'file:///etc' }, snap)).rejects.toThrow('https://');
  });
});
