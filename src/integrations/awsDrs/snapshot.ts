// Turns AWS Elastic Disaster Recovery DescribeSourceServers items into the replication
// snapshot AetherVault ingests. Status only: no disk contents, no credentials.
// Field names follow the DRS API reference (SourceServer, DataReplicationInfo).
import type { SourceServer } from '@aws-sdk/client-drs';

/** What the collector sends; mirrors ingest_replication_snapshot() in the database. */
export interface SnapshotServer {
  id: string;
  hostname: string;
  state: string;
  lag_seconds: number | null;
  /** lagDuration exactly as AWS returned it (its format is not documented). */
  lag_raw: string | null;
  backlog_bytes: number;
  total_bytes: number;
  replicated_bytes: number;
  eta_at: string | null;
  last_seen_at: string | null;
  error: string | null;
  last_launch_result: string | null;
}

export interface ReplicationSnapshotPayload {
  source: 'aws-drs' | 'fixture';
  collected_at: string;
  aws_account_id: string | null;
  aws_region: string;
  collector_version: string;
  servers: SnapshotServer[];
}

/**
 * ISO 8601 duration ("PT5S", "PT1M30.5S", "P1DT2H") to seconds. AWS documents lagDuration
 * only as a 1-64 character string, so anything unparseable returns null ("unknown") rather
 * than a guess. A bare number is taken as seconds.
 */
export function parseLagSeconds(raw: string | null | undefined): number | null {
  if (!raw) return null;
  const s = raw.trim();
  if (/^\d+(\.\d+)?$/.test(s)) return Number(s);
  const m =
    /^P(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/.exec(
      s,
    );
  if (!m || s === 'P' || s.endsWith('T')) return null;
  const [, d, h, min, sec] = m.map((v) => (v === undefined ? 0 : Number(v)));
  return d * 86400 + h * 3600 + min * 60 + sec;
}

/** 12-digit account from arn:aws:drs:<region>:<account>:source-server/s-... */
export function accountFromArn(arn: string | undefined): string | null {
  const m = arn ? /^arn:[\w-]+:drs:[\w-]*:(\d{12}):/.exec(arn) : null;
  return m ? m[1] : null;
}

const sum = (xs: Array<number | undefined>) => xs.reduce<number>((a, b) => a + (b ?? 0), 0);

export function toSnapshotServer(s: SourceServer): SnapshotServer | null {
  if (!s.sourceServerID) return null;
  const info = s.dataReplicationInfo;
  const disks = info?.replicatedDisks ?? [];
  const hints = s.sourceProperties?.identificationHints;
  return {
    id: s.sourceServerID,
    hostname: hints?.hostname || hints?.fqdn || s.sourceServerID,
    state: info?.dataReplicationState ?? 'UNKNOWN',
    lag_seconds: parseLagSeconds(info?.lagDuration),
    lag_raw: info?.lagDuration ?? null,
    backlog_bytes: sum(disks.map((d) => d.backloggedStorageBytes)),
    total_bytes: sum(disks.map((d) => d.totalStorageBytes)),
    replicated_bytes: sum(disks.map((d) => d.replicatedStorageBytes)),
    eta_at: info?.etaDateTime ?? null,
    last_seen_at: s.lifeCycle?.lastSeenByServiceDateTime ?? null,
    error: info?.dataReplicationError?.error ?? null,
    last_launch_result: s.lastLaunchResult ?? null,
  };
}

export function buildSnapshot(
  items: SourceServer[],
  meta: { region: string; source: 'aws-drs' | 'fixture'; collectorVersion: string; now?: Date },
): ReplicationSnapshotPayload {
  // Only servers replicating into this account (not failback copies of recovery instances).
  const replicating = items.filter((s) => s.replicationDirection !== 'FAILBACK');
  return {
    source: meta.source,
    collected_at: (meta.now ?? new Date()).toISOString(),
    aws_account_id: replicating.map((s) => accountFromArn(s.arn)).find(Boolean) ?? null,
    aws_region: meta.region,
    collector_version: meta.collectorVersion,
    servers: replicating.map(toSnapshotServer).filter((x): x is SnapshotServer => x !== null),
  };
}

/** Time the sample fixtures were written as of; sample mode shifts their times to "now". */
export const FIXTURE_TIME = '2026-11-09T22:00:00Z';

/** Shifts a sample snapshot's server times so "last seen" and ETAs read as current. */
export function rebaseSampleTimes(
  snapshot: ReplicationSnapshotPayload,
  from: string = FIXTURE_TIME,
  now: Date = new Date(),
): ReplicationSnapshotPayload {
  const offset = now.getTime() - Date.parse(from);
  const shift = (iso: string | null) =>
    iso === null ? null : new Date(Date.parse(iso) + offset).toISOString();
  return {
    ...snapshot,
    servers: snapshot.servers.map((s) => ({
      ...s,
      eta_at: shift(s.eta_at),
      last_seen_at: shift(s.last_seen_at),
    })),
  };
}
