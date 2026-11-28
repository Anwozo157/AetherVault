import { describe, expect, test, vi } from 'vitest';
import { pushRecoveryJobs } from '../awsDrs/collect';
import critical from './fixtures/protected-items.critical.json';
import paged1 from './fixtures/protected-items.paged-1.json';
import paged2 from './fixtures/protected-items.paged-2.json';
import healthy from './fixtures/protected-items.recorded-healthy.json';
import tfoWarning from './fixtures/protected-items.recorded-tfo-warning.json';
import recordedJobs from './fixtures/replication-jobs.recorded.json';
import {
  collectRecoveryJobs,
  collectSnapshot,
  listProtectedItems,
  recordedApi,
  toRecoveryJob,
  type AsrJob,
} from './collect';
import { asrState, buildSnapshot, type AsrPage, type AsrProtectedItem } from './snapshot';

const NOW = new Date('2026-11-28T01:10:00Z');
const item = (page: unknown) => (page as AsrPage<AsrProtectedItem>).value![0];
const itemId = item(healthy).id!;
const container = itemId.slice(0, itemId.indexOf('/replicationProtectedItems'));
const fabric = container.slice(0, container.indexOf('/replicationProtectionContainers'));
const vault = fabric.slice(0, fabric.indexOf('/replicationFabrics'));

/** One fabric, one container, protected-item pages as given. */
function vaultApi(
  itemPages: Record<string, AsrPage<unknown>>,
  first = `${container}/replicationProtectedItems`,
) {
  return recordedApi({
    [`${vault}/replicationFabrics`]: { value: [{ id: fabric, name: 'fabric-primary' }] },
    [`${fabric}/replicationProtectionContainers`]: {
      value: [{ id: container, name: 'container-primary' }],
    },
    ...Object.fromEntries(
      Object.entries(itemPages).map(([k, v]) => [k === 'first' ? first : k, v]),
    ),
    [`${vault}/replicationJobs`]: recordedJobs as AsrPage<unknown>,
  });
}

describe('recorded protected items (our Azure test, 27-28 Nov 2026)', () => {
  test('healthy item maps to a CONTINUOUS server with the real RPO and no subscription ID', () => {
    const snap = buildSnapshot([item(healthy)], {
      region: 'westus2',
      collectorVersion: 't',
      now: NOW,
    });
    expect(snap).toMatchObject({
      source: 'azure-asr',
      aws_account_id: null,
      aws_region: 'westus2',
    });
    expect(snap.servers).toEqual([
      expect.objectContaining({
        id: 'vm-aethervault-source',
        hostname: 'vm-aethervault-source',
        state: 'CONTINUOUS',
        lag_seconds: 82,
        total_bytes: 34359738368,
        replicated_bytes: 34359738368,
        error: null,
      }),
    ]);
    expect(JSON.stringify(snap)).not.toMatch(/00000000-0000-0000-0000-000000000000/);
  });

  test('a warning-level health error (161011, no test failover yet) is not a failure', () => {
    const s = buildSnapshot([item(tfoWarning)], { region: 'westus2', collectorVersion: 't' })
      .servers[0];
    expect(s.state).toBe('CONTINUOUS');
    expect(s.error).toBeNull();
    expect(s.lag_seconds).toBe(105);
  });
});

describe('asrState', () => {
  const with_ = (props: Record<string, unknown>, details: Record<string, unknown> = {}) =>
    ({
      name: 'vm',
      properties: { ...props, providerSpecificDetails: details },
    }) as AsrProtectedItem;
  test.each([
    [with_({ protectionState: 'Protected', replicationHealth: 'Normal' }), 'CONTINUOUS'],
    [with_({ protectionState: 'Protected', replicationHealth: 'Warning' }), 'CONTINUOUS'],
    [with_({ protectionState: 'Protected', replicationHealth: 'Critical' }), 'STALLED'],
    [with_({ protectionState: 'EnablingFailed' }), 'STALLED'],
    [with_({ protectionState: 'UnprotectedStatesBegin' }), 'STOPPED'],
    // Recorded: a Protected item reported monitoringPercentageCompletion 0 after initial sync.
    [
      with_(
        { protectionState: 'Protected', replicationHealth: 'Normal' },
        { monitoringPercentageCompletion: 0 },
      ),
      'CONTINUOUS',
    ],
    [with_({ protectionState: 'InitialReplicationInProgress' }), 'INITIAL_SYNC'],
    [with_({ protectionState: 'SomethingNew', replicationHealth: 'Normal' }), 'UNKNOWN'],
    [with_({}), 'UNKNOWN'],
  ])('%#', (i, expected) => expect(asrState(i)).toBe(expected));
});

describe('hand-built variants', () => {
  test('critical health becomes STALLED with the error-level health error', () => {
    const s = buildSnapshot([item(critical)], { region: 'westus2', collectorVersion: 't' })
      .servers[0];
    expect(s.state).toBe('STALLED');
    expect(s.error).toMatch(/^153007: HAND-BUILT/);
    expect(s.lag_seconds).toBe(1860);
  });

  test('pages are followed via nextLink across the fabric -> container -> item walk', async () => {
    const api = vaultApi({
      first: paged1 as AsrPage<unknown>,
      'https://management.azure.com/next-page-1': paged2 as AsrPage<unknown>,
    });
    const items = await listProtectedItems(api, vault);
    expect(items.map((i) => i.name)).toEqual(['vm-aethervault-source', 'vm-example-second']);
    const snap = await collectSnapshot(api, { vaultId: vault, region: 'westus2', now: NOW });
    const second = snap.servers.find((s) => s.id === 'vm-example-second')!;
    expect(second.state).toBe('INITIAL_SYNC');
    expect(second.lag_seconds).toBeNull();
    expect(second.replicated_bytes).toBe(Math.round(34359738368 * 0.42));
  });
});

describe('Site Recovery jobs', () => {
  test('recorded jobs: only test failovers become drills, with Azure start and end times', async () => {
    const jobs = await collectRecoveryJobs(
      vaultApi({ first: healthy as AsrPage<unknown> }),
      vault,
      NOW,
    );
    expect(jobs.length).toBeGreaterThan(0);
    expect(new Set(jobs.map((j) => j.kind))).toEqual(new Set(['drill']));
    // The warm-up drill: TestFailover 23:46:10 -> 23:49:20 (docs/AZURE_LIVE_POC.md).
    expect(jobs).toContainEqual(
      expect.objectContaining({
        kind: 'drill',
        status: 'COMPLETED',
        started_at: expect.stringMatching(/^2026-11-27T23:46:10/),
        ended_at: '2026-11-27T23:49:20.000Z',
        launched: 1,
      }),
    );
    // Newest first, as the ingest expects.
    expect([...jobs].sort((a, b) => b.started_at.localeCompare(a.started_at))).toEqual(jobs);
  });

  test.each([
    [{ scenarioName: 'TestFailover', state: 'InProgress' }, 'drill', 'STARTED', null],
    [
      { scenarioName: 'UnplannedFailover', state: 'Succeeded', endTime: '2026-11-28T01:05:00Z' },
      'recovery',
      'COMPLETED',
      '2026-11-28T01:05:00.000Z',
    ],
    [
      { scenarioName: 'TestFailover', state: 'Failed', endTime: '2026-11-28T01:05:00Z' },
      'drill',
      'COMPLETED',
      '2026-11-28T01:05:00.000Z',
    ],
  ])('%o', (props, kind, status, ended) => {
    const job: AsrJob = {
      name: '1c93edb6-efba-4335-8559-58b646c40906',
      properties: { startTime: '2026-11-28T01:00:00Z', ...props },
    };
    expect(toRecoveryJob(job)).toMatchObject({ kind, status, ended_at: ended });
  });

  test('setup and cleanup jobs, and names that are not GUIDs, are dropped', () => {
    const start = { startTime: '2026-11-28T01:00:00Z', state: 'Succeeded' };
    expect(
      toRecoveryJob({
        name: '1c93edb6-efba-4335-8559-58b646c40906',
        properties: { ...start, scenarioName: 'TestFailoverCleanup' },
      }),
    ).toBeNull();
    expect(
      toRecoveryJob({
        name: '1c93edb6-efba-4335-8559-58b646c40906',
        properties: { ...start, scenarioName: 'EnableDr' },
      }),
    ).toBeNull();
    expect(
      toRecoveryJob({ name: 'not-a-guid', properties: { ...start, scenarioName: 'TestFailover' } }),
    ).toBeNull();
  });

  test('Azure jobs are pushed with p_source=azure-asr; AWS calls keep the old body', async () => {
    const fetchImpl = vi.fn(async () => new Response('{"accepted":true,"jobs":0,"changed":0}'));
    const target = { url: 'https://x.supabase.co', anonKey: 'anon', token: 'avi_t' };
    await pushRecoveryJobs(
      target,
      'westus2',
      [],
      fetchImpl as unknown as typeof fetch,
      'azure-asr',
    );
    await pushRecoveryJobs(target, 'us-west-2', [], fetchImpl as unknown as typeof fetch);
    const bodies = fetchImpl.mock.calls.map((c) =>
      JSON.parse((c as unknown as [string, RequestInit])[1].body as string),
    );
    expect(bodies[0]).toMatchObject({ p_region: 'westus2', p_source: 'azure-asr' });
    expect(bodies[1]).not.toHaveProperty('p_source');
  });
});
