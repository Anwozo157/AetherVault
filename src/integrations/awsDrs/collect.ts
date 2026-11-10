// Collector core: page through DescribeSourceServers, build a snapshot, push it to AetherVault.
// The AWS call is behind DrsReadApi so this runs against recorded responses in tests and
// against the real SDK in collector/ (Lambda or CLI).
import type { DescribeSourceServersResponse, SourceServer } from '@aws-sdk/client-drs';
import { buildSnapshot, type ReplicationSnapshotPayload } from './snapshot';

export const COLLECTOR_VERSION = '0.1.0';
/** Safety stop for pagination (100 pages is far beyond any pilot). */
const MAX_PAGES = 100;

/** The single read-only DRS call the collector needs (drs:DescribeSourceServers). */
export interface DrsReadApi {
  describeSourceServers(nextToken?: string): Promise<DescribeSourceServersResponse>;
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

export async function pushSnapshot(
  target: IngestTarget,
  snapshot: ReplicationSnapshotPayload,
  fetchImpl: typeof fetch = fetch,
): Promise<IngestResult> {
  if (!/^https?:\/\//.test(target.url)) throw new Error('AetherVault URL must start with https://');
  const res = await fetchImpl(
    `${target.url.replace(/\/+$/, '')}/rest/v1/rpc/ingest_replication_snapshot`,
    {
      method: 'POST',
      headers: {
        apikey: target.anonKey,
        Authorization: `Bearer ${target.anonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_token: target.token, p_snapshot: snapshot }),
    },
  );
  const text = await res.text();
  if (!res.ok) {
    let message = text;
    try {
      message = (JSON.parse(text) as { message?: string }).message ?? text;
    } catch {
      // not JSON; keep the raw text
    }
    throw new Error(`AetherVault rejected the snapshot (HTTP ${res.status}): ${message}`);
  }
  return JSON.parse(text) as IngestResult;
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
