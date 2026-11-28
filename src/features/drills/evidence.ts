// Helpers for drill evidence: stable fingerprint, durations, file name.
import type { DrillEvidence, MeasuredRecovery, RunSummary } from '../../domain/dr';

/** JSON with object keys sorted at every level, so the same evidence always hashes the same. */
export function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonicalJson(v)}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

/** SHA-256 of the canonical JSON, hex. Anyone can recompute it from the downloaded file. */
export async function fingerprint(evidence: DrillEvidence): Promise<string> {
  const bytes = new TextEncoder().encode(canonicalJson(evidence));
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** 5.5 -> "5.5 s", 900 -> "15 min", 5400 -> "1 h 30 min". */
export function formatSeconds(s: number | null | undefined): string {
  if (s === null || s === undefined) return 'n/a';
  if (s < 60) return `${Number(s.toFixed(1))} s`;
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return h ? `${h} h${m ? ` ${m} min` : ''}` : `${m} min`;
}

export const OUTCOME_LABEL: Record<DrillEvidence['run']['outcome'], string> = {
  pending: 'Awaiting approval',
  in_progress: 'In progress',
  secured: 'Target secured',
  aborted: 'Aborted',
  withdrawn: 'Withdrawn',
};

export function evidenceFileName(e: DrillEvidence): string {
  return `aethervault-drill-evidence-${e.run.requested_at.slice(0, 10)}-${e.run.id.slice(0, 8)}.json`;
}

/**
 * Overall verdict for a run: null until recovery completes; otherwise it passes only if recovery
 * met the RTO and the measured RPO (when there is one) was not missed.
 */
export function runPassed(
  rtoMet: boolean | null,
  rpoMet: boolean | null | undefined,
): boolean | null {
  if (rtoMet === null) return null;
  return rtoMet && rpoMet !== false;
}

/** One sentence on the recovery time: measured by AWS when linked, otherwise labeled simulated. */
export function recoverySummary(e: DrillEvidence): string {
  const target = formatSeconds(e.objectives.rto_seconds);
  const time = `${formatSeconds(e.results.recovery_seconds)} (target ${target})`;
  const m = e.recovery_measured;
  if (!m) return `${time}. Simulated: recovery is not yet run against real infrastructure.`;
  const by = m.linked_by ? `, linked by ${m.linked_by}` : '';
  return `${time}. Measured by AWS Elastic Disaster Recovery: job ${m.job_id} in ${m.aws_region}, from the recovery request ${new Date(m.started_at).toLocaleString()} to ${m.launched} of ${m.servers} servers launched ${new Date(m.ended_at).toLocaleString()}${by}. Does not include application checks after launch.`;
}

/** One sentence on the data-loss target, for the evidence report. */
export function rpoSummary(e: DrillEvidence): string {
  const target = formatSeconds(e.objectives.rpo_seconds);
  const rep = e.replication_at_launch;
  if (e.report_version < 3) {
    return `${target}. Not measured: replication telemetry was simulated when this run happened.`;
  }
  if (!rep || rep.rpo_met === null) {
    return `${target}. Not measured: no replication data was received in the 5 minutes before launch.`;
  }
  const sample = rep.source === 'fixture' ? 'SAMPLE DATA (not a real account): ' : '';
  const lag =
    rep.max_lag_seconds === null
      ? 'worst lag unknown'
      : `${formatSeconds(rep.max_lag_seconds)} worst replication lag`;
  const servers =
    rep.problem_count > 0
      ? `${rep.problem_count} of ${rep.server_count} servers not replicating normally`
      : `all ${rep.server_count} servers replicating`;
  const where = `${rep.source === 'azure-asr' ? 'Azure Site Recovery' : 'AWS DRS'} ${rep.aws_region}${rep.aws_account_id ? `, account …${rep.aws_account_id.slice(-4)}` : ''}`;
  return `${sample}${rep.rpo_met ? 'Met' : 'MISSED'}: ${lag} at launch (target ${target}); ${servers}. Measured from ${where}, collected ${new Date(rep.collected_at).toLocaleString()}.`;
}

/**
 * The AWS DRS job that most likely carried out a run, for the console to suggest linking.
 * Mirrors the database rules in link_recovery_job(): same kind (drill -> drill job, failover ->
 * recovery job), completed with every server launched, the run's target Region, started between
 * 30 minutes before and 6 hours after the run was requested, and not linked to another run.
 * Picks the job that started closest to the request. A person still confirms the link.
 */
export function matchingRecovery(
  run: RunSummary,
  jobs: readonly MeasuredRecovery[],
  linkedJobIds: ReadonlySet<string>,
): MeasuredRecovery | null {
  if (run.recoveryJobId !== null || run.approvedAt === null) return null;
  const kind = run.kind === 'drill' ? 'drill' : 'recovery';
  const requested = Date.parse(run.requestedAt);
  let best: MeasuredRecovery | null = null;
  let bestGap = Infinity;
  for (const j of jobs) {
    if (j.kind !== kind || j.status !== 'COMPLETED' || j.durationSeconds === null) continue;
    if (j.launched < 1 || j.launched !== j.servers || linkedJobIds.has(j.jobId)) continue;
    if (run.targetRegion !== `aws-${j.awsRegion}`) continue;
    const gap = Date.parse(j.startedAt) - requested;
    if (gap < -30 * 60_000 || gap > 6 * 3600_000) continue;
    if (Math.abs(gap) < bestGap) {
      best = j;
      bestGap = Math.abs(gap);
    }
  }
  return best;
}
