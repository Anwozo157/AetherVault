// Collector core: page through DescribeSourceServers, build a snapshot, push it to AetherVault.
// The AWS call is behind DrsReadApi so this runs against recorded responses in tests and
// against the real SDK in collector/ (Lambda or CLI).
import type {
  DescribeJobsResponse,
  DescribeSourceServersResponse,
  Job,
  SourceServer,
} from '@aws-sdk/client-drs';
import { buildSnapshot, type ReplicationSnapshotPayload } from './snapshot';

export const COLLECTOR_VERSION = '0.1.0';
/** Safety stop for pagination (100 pages is far beyond any pilot). */
const MAX_PAGES = 100;

/** The read-only DRS calls the collector makes (drs:DescribeSourceServers, drs:DescribeJobs). */
export interface DrsReadApi {
  describeSourceServers(nextToken?: string): Promise<DescribeSourceServersResponse>;
  /** Optional: recovery jobs since `fromDate` (ISO 8601). Recorded fixtures may omit it. */
  describeJobs?(fromDate: string, nextToken?: string): Promise<DescribeJobsResponse>;
}

export async function listAllSourceServers(api: DrsReadApi): Promise<SourceServer[]> {
  const items: SourceServer[] = [];
  let token: string | undefined;
  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await api.describeSourceServers(token);
    items.push(...(res.items ?? []));
    token = res.nextToken || undefined;
    if (!token) return items;
  }
  throw new Error(`DescribeSourceServers returned more than ${MAX_PAGES} pages`);
}

export async function collectSnapshot(
  api: DrsReadApi,
  opts: { region: string; source?: 'aws-drs' | 'fixture'; now?: Date },
): Promise<ReplicationSnapshotPayload> {
  return buildSnapshot(await listAllSourceServers(api), {
    region: opts.region,
    source: opts.source ?? 'aws-drs',
    collectorVersion: COLLECTOR_VERSION,
    now: opts.now,
  });
}

export interface IngestTarget {
  /** Supabase project URL, e.g. https://xyz.supabase.co */
  url: string;
  /** Public anon key (safe to hold; the ingest token is what authorizes). */
  anonKey: string;
  /** Per-organization ingest token from the console (avi_...). */
  token: string;
}

export interface IngestResult {
  accepted: boolean;
  reason?: string;
  rpo_met?: boolean | null;
  servers?: number;
}

export function pushSnapshot(
  target: IngestTarget,
  snapshot: ReplicationSnapshotPayload,
  fetchImpl: typeof fetch = fetch,
): Promise<IngestResult> {
  return rpc(
    target,
    'ingest_replication_snapshot',
    { p_token: target.token, p_snapshot: snapshot },
    'snapshot',
    fetchImpl,
  );
}

// ---------------------------------------------------------------------------
// Recovery jobs: real recovery times measured by AWS (drills, recoveries, failbacks)
// ---------------------------------------------------------------------------

/** Recovery jobs from the last 30 days are reported (the console keeps them longer). */
const JOBS_LOOKBACK_MS = 30 * 86_400_000;

export interface RecoveryJobPayload {
  job_id: string;
  kind: 'drill' | 'recovery' | 'failback';
  status: 'PENDING' | 'STARTED' | 'COMPLETED';
  started_at: string;
  ended_at: string | null;
  servers: number;
  launched: number;
}

const KIND_BY_INITIATOR: Record<string, RecoveryJobPayload['kind']> = {
  START_DRILL: 'drill',
  START_RECOVERY: 'recovery',
  FAILBACK: 'failback',
};

/** Keeps launch jobs for drills, recoveries and failbacks; drops everything else. */
export function toRecoveryJob(job: Job): RecoveryJobPayload | null {
  const kind = KIND_BY_INITIATOR[job.initiatedBy ?? ''];
  if (job.type !== 'LAUNCH' || !kind || !job.jobID || !job.creationDateTime) return null;
  const status = job.status ?? 'PENDING';
  const servers = job.participatingServers ?? [];
  return {
    job_id: job.jobID,
    kind,
    status,
    started_at: new Date(job.creationDateTime).toISOString(),
    // Only a COMPLETED job has a meaningful end time.
    ended_at:
      status === 'COMPLETED' && job.endDateTime ? new Date(job.endDateTime).toISOString() : null,
    servers: servers.length,
    launched: servers.filter((s) => s.launchStatus === 'LAUNCHED').length,
  };
}

export async function collectRecoveryJobs(
  api: DrsReadApi,
  now = new Date(),
): Promise<RecoveryJobPayload[] | null> {
  if (!api.describeJobs) return null;
  const from = new Date(now.getTime() - JOBS_LOOKBACK_MS).toISOString().replace(/\.\d{3}Z$/, 'Z');
  const jobs: RecoveryJobPayload[] = [];
  let token: string | undefined;
  for (let page = 0; page < MAX_PAGES; page++) {
    const res = await api.describeJobs(from, token);
    for (const j of res.items ?? []) {
      const r = toRecoveryJob(j);
      if (r) jobs.push(r);
    }
    token = res.nextToken || undefined;
    if (!token) break;
  }
  // The ingest accepts at most 100; keep the newest.
  return jobs.sort((a, b) => b.started_at.localeCompare(a.started_at)).slice(0, 100);
}

async function rpc<T>(
  target: IngestTarget,
  fn: string,
  body: unknown,
  what: string,
  fetchImpl: typeof fetch,
): Promise<T> {
  if (!/^https?:\/\//.test(target.url)) throw new Error('AetherVault URL must start with https://');
  const res = await fetchImpl(`${target.url.replace(/\/+$/, '')}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: target.anonKey,
      Authorization: `Bearer ${target.anonKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    let message = text;
    try {
      message = (JSON.parse(text) as { message?: string }).message ?? text;
    } catch {
      // not JSON; keep the raw text
    }
    throw new Error(`AetherVault rejected the ${what} (HTTP ${res.status}): ${message}`);
  }
  return JSON.parse(text) as T;
}

export function pushRecoveryJobs(
  target: IngestTarget,
  region: string,
  jobs: RecoveryJobPayload[],
  fetchImpl: typeof fetch = fetch,
  source: 'aws-drs' | 'azure-asr' = 'aws-drs',
): Promise<{ accepted: boolean; jobs: number; changed: number }> {
  // p_source is sent only for Azure, so AWS collectors keep matching the original signature.
  const body =
    source === 'aws-drs'
      ? { p_token: target.token, p_region: region, p_jobs: jobs }
      : { p_token: target.token, p_region: region, p_jobs: jobs, p_source: source };
  return rpc(target, 'ingest_recovery_jobs', body, 'recovery jobs', fetchImpl);
}

/** Serves recorded DescribeSourceServers pages in order (tests and --fixture mode). */
export function recordedApi(pages: DescribeSourceServersResponse[]): DrsReadApi {
  return {
    async describeSourceServers(nextToken) {
      const i = nextToken ? pages.findIndex((_, idx) => `page-${idx}` === nextToken) : 0;
      if (i < 0) throw new Error(`unknown nextToken ${nextToken}`);
      return pages[i];
    },
  };
}
