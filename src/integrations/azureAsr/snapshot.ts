// Turns Azure Site Recovery replication protected items (Azure-to-Azure) into the replication
// snapshot AetherVault already ingests for AWS DRS. Status only: no disk contents, no
// credentials, no subscription ID (the database rejects one for azure-asr).
// Field names follow the Site Recovery REST API (api-version 2025-08-01) and our recordings
// (fixtures/README.md). Values we haven't seen recorded map to UNKNOWN, never to a guess.
import type { ReplicationSnapshotPayload, SnapshotServer } from '../awsDrs/snapshot';

export interface AsrHealthError {
  errorCode?: string | null;
  errorLevel?: string | null;
  errorMessage?: string | null;
}

export interface AsrManagedDisk {
  diskCapacityInBytes?: number | null;
  dataPendingAtSourceAgentInMB?: number | null;
  dataPendingInStagingStorageAccountInMB?: number | null;
}

export interface AsrProtectedItem {
  id?: string;
  name?: string;
  properties?: {
    friendlyName?: string | null;
    protectionState?: string | null;
    replicationHealth?: string | null;
    healthErrors?: AsrHealthError[] | null;
    providerSpecificDetails?: {
      instanceType?: string | null;
      rpoInSeconds?: number | null;
      lastHeartbeat?: string | null;
      monitoringPercentageCompletion?: number | null;
      protectedManagedDisks?: AsrManagedDisk[] | null;
    } | null;
  } | null;
}

export interface AsrPage<T> {
  value?: T[];
  nextLink?: string | null;
}

const MB = 1024 * 1024;
const sum = (xs: Array<number | null | undefined>) => xs.reduce<number>((a, b) => a + (b ?? 0), 0);

/** First error-level health error as "code: message" (warnings such as 161011 are not failures). */
function firstError(errors: AsrHealthError[] | null | undefined): string | null {
  const e = (errors ?? []).find((x) => (x.errorLevel ?? '').toLowerCase() === 'error');
  if (!e) return null;
  return [e.errorCode, e.errorMessage].filter(Boolean).join(': ').slice(0, 500) || 'error';
}

/**
 * Site Recovery protection state + replication health -> the DRS state names the database's
 * replication_health() understands (CONTINUOUS, INITIAL_SYNC, STALLED, STOPPED, UNKNOWN).
 */
export function asrState(item: AsrProtectedItem): string {
  const p = item.properties ?? {};
  const protection = (p.protectionState ?? '').toLowerCase();
  const health = (p.replicationHealth ?? '').toLowerCase();
  if (protection.includes('failed')) return 'STALLED';
  if (protection.startsWith('unprotected') || protection.includes('disabl')) return 'STOPPED';
  // monitoringPercentageCompletion is NOT sync progress: a recorded Protected item had 0 there.
  if (protection.includes('initial') || protection.includes('enabling')) return 'INITIAL_SYNC';
  if (protection === 'protected') {
    if (health === 'critical') return 'STALLED';
    if (health === 'normal' || health === 'warning') return 'CONTINUOUS';
  }
  return 'UNKNOWN';
}

export function toSnapshotServer(item: AsrProtectedItem): SnapshotServer | null {
  if (!item.name) return null;
  const p = item.properties ?? {};
  const d = p.providerSpecificDetails ?? {};
  const disks = d.protectedManagedDisks ?? [];
  const total = sum(disks.map((x) => x.diskCapacityInBytes));
  const backlog = Math.round(
    sum(
      disks.map((x) =>
        sum([x.dataPendingAtSourceAgentInMB, x.dataPendingInStagingStorageAccountInMB]),
      ),
    ) * MB,
  );
  const state = asrState(item);
  const pct = d.monitoringPercentageCompletion;
  const replicated =
    state === 'INITIAL_SYNC' && pct != null ? Math.round((total * pct) / 100) : total;
  const rpo = typeof d.rpoInSeconds === 'number' && d.rpoInSeconds >= 0 ? d.rpoInSeconds : null;
  return {
    id: item.name.slice(0, 64),
    hostname: p.friendlyName || item.name,
    state,
    lag_seconds: rpo,
    lag_raw: rpo === null ? null : `rpoInSeconds=${rpo}`,
    backlog_bytes: backlog,
    total_bytes: total,
    replicated_bytes: replicated,
    eta_at: null,
    last_seen_at: d.lastHeartbeat ?? null,
    error:
      state === 'STALLED'
        ? (firstError(p.healthErrors) ?? `replication health ${p.replicationHealth ?? 'unknown'}`)
        : null,
    last_launch_result: null,
  };
}

export function buildSnapshot(
  items: AsrProtectedItem[],
  meta: { region: string; source?: 'azure-asr' | 'fixture'; collectorVersion: string; now?: Date },
): ReplicationSnapshotPayload {
  // Azure-to-Azure items only (the collector reads one vault).
  const a2a = items.filter(
    (i) => (i.properties?.providerSpecificDetails?.instanceType ?? 'A2A') === 'A2A',
  );
  return {
    source: meta.source ?? 'azure-asr',
    collected_at: (meta.now ?? new Date()).toISOString(),
    aws_account_id: null,
    aws_region: meta.region,
    collector_version: meta.collectorVersion,
    servers: a2a.map(toSnapshotServer).filter((x): x is SnapshotServer => x !== null),
  };
}
