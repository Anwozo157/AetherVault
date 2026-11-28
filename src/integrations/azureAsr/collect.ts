// Azure collector core: walk one Recovery Services vault (fabrics -> protection containers ->
// protected items, the path the Site Recovery Reader role can read), build the shared snapshot,
// and map Site Recovery jobs to recovery jobs. The HTTP call sits behind AsrReadApi so tests run
// on recorded responses and collector-azure/ supplies the real, token-authenticated client.
import type { RecoveryJobPayload } from '../awsDrs/collect';
import type { ReplicationSnapshotPayload } from '../awsDrs/snapshot';
import { buildSnapshot, type AsrPage, type AsrProtectedItem } from './snapshot';

export const COLLECTOR_VERSION = '0.1.0-azure';
/** api-version used and recorded on 2026-11-27/28 (docs/AZURE_LIVE_POC.md). */
export const ASR_API_VERSION = '2025-08-01';
/** Safety stop for pagination per list (far beyond any pilot). */
const MAX_PAGES = 100;
const JOBS_LOOKBACK_MS = 30 * 86_400_000;

/** Read-only GET of an ARM path (or a nextLink URL) returning one page. */
export interface AsrReadApi {
  get<T>(pathOrNextLink: string): Promise<AsrPage<T>>;
}

interface ArmResource {
  id?: string;
  name?: string;
}

export async function listAll<T>(api: AsrReadApi, path: string): Promise<T[]> {
  const out: T[] = [];
  let next: string | null | undefined = path;
  for (let page = 0; page < MAX_PAGES && next; page++) {
    const res: AsrPage<T> = await api.get<T>(next);
    out.push(...(res.value ?? []));
    next = res.nextLink;
  }
  if (next) throw new Error(`${path} returned more than ${MAX_PAGES} pages`);
  return out;
}

/** Every protected item in the vault, via fabrics and protection containers. */
export async function listProtectedItems(
  api: AsrReadApi,
  vaultId: string,
): Promise<AsrProtectedItem[]> {
  const items: AsrProtectedItem[] = [];
  for (const fabric of await listAll<ArmResource>(api, `${vaultId}/replicationFabrics`)) {
    if (!fabric.id) continue;
    for (const container of await listAll<ArmResource>(
      api,
      `${fabric.id}/replicationProtectionContainers`,
    )) {
      if (!container.id) continue;
      items.push(
        ...(await listAll<AsrProtectedItem>(api, `${container.id}/replicationProtectedItems`)),
      );
    }
  }
  return items;
}

export async function collectSnapshot(
  api: AsrReadApi,
  opts: { vaultId: string; region: string; source?: 'azure-asr' | 'fixture'; now?: Date },
): Promise<ReplicationSnapshotPayload> {
  return buildSnapshot(await listProtectedItems(api, opts.vaultId), {
    region: opts.region,
    source: opts.source ?? 'azure-asr',
    collectorVersion: COLLECTOR_VERSION,
    now: opts.now,
  });
}

// ---------------------------------------------------------------------------
// Jobs: Azure's measured recovery times for drills (test failovers) and failovers
// ---------------------------------------------------------------------------

export interface AsrJob {
  name?: string;
  properties?: {
    scenarioName?: string | null;
    state?: string | null;
    startTime?: string | null;
    endTime?: string | null;
  } | null;
}

const KIND_BY_SCENARIO: Record<string, RecoveryJobPayload['kind']> = {
  TestFailover: 'drill',
  UnplannedFailover: 'recovery',
  PlannedFailover: 'recovery',
  Failover: 'recovery',
};

const DONE = new Set(['succeeded', 'failed', 'cancelled', 'completedwithinformation', 'suspended']);
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** Keeps test failovers and failovers; drops setup, cleanup and other jobs. */
export function toRecoveryJob(job: AsrJob): RecoveryJobPayload | null {
  const p = job.properties ?? {};
  const kind = KIND_BY_SCENARIO[p.scenarioName ?? ''];
  if (!kind || !job.name || !GUID.test(job.name) || !p.startTime) return null;
  const state = (p.state ?? '').toLowerCase();
  const status: RecoveryJobPayload['status'] = DONE.has(state)
    ? 'COMPLETED'
    : state === 'notstarted'
      ? 'PENDING'
      : 'STARTED';
  return {
    job_id: job.name,
    kind,
    status,
    started_at: new Date(p.startTime).toISOString(),
    ended_at: status === 'COMPLETED' && p.endTime ? new Date(p.endTime).toISOString() : null,
    servers: 1,
    launched: state === 'succeeded' ? 1 : 0,
  };
}

export async function collectRecoveryJobs(
  api: AsrReadApi,
  vaultId: string,
  now = new Date(),
): Promise<RecoveryJobPayload[]> {
  const since = now.getTime() - JOBS_LOOKBACK_MS;
  const jobs = (await listAll<AsrJob>(api, `${vaultId}/replicationJobs`))
    .map(toRecoveryJob)
    .filter((j): j is RecoveryJobPayload => j !== null && Date.parse(j.started_at) >= since);
  // The ingest accepts at most 100; keep the newest.
  return jobs.sort((a, b) => b.started_at.localeCompare(a.started_at)).slice(0, 100);
}

/** Serves recorded pages by path (tests and --fixture mode). */
export function recordedApi(pages: Record<string, AsrPage<unknown>>): AsrReadApi {
  return {
    async get<T>(pathOrNextLink: string) {
      const page = pages[pathOrNextLink];
      if (!page) throw new Error(`no recorded page for ${pathOrNextLink}`);
      return page as AsrPage<T>;
    },
  };
}
