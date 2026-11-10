// Display and export helpers for the audit log.
import type { AuditRecord, ChainReport } from '../../domain/dr';

/** Plain-language names for audit actions. */
export const ACTION_LABEL: Record<string, string> = {
  'org.created': 'Organization created',
  'member.role_set': 'Role changed',
  'failover.requested': 'Failover requested',
  'failover.approved': 'Failover approved',
  'failover.aborted': 'Failover aborted / withdrawn',
  'failover.reset': 'Drill reset',
  'member.invited': 'Member invited',
  'member.invite_revoked': 'Invite revoked',
  'member.joined': 'Member joined',
  'member.removed': 'Member removed',
  'org.objectives_set': 'Recovery targets changed',
  'drill.started': 'Drill started',
  'drill.completed': 'Drill completed',
  'drill.schedule_set': 'Drill schedule set',
  'drill.schedule_disabled': 'Drill schedule turned off',
  'alert.channel_added': 'Alert channel added',
  'alert.channel_removed': 'Alert channel removed',
  'alert.test_sent': 'Test alert sent',
};

export function describeDetail(r: AuditRecord): string {
  const d = r.detail;
  const s = (k: string) => (typeof d[k] === 'string' ? (d[k] as string) : undefined);
  if (r.action === 'failover.requested') return `${s('source') ?? '?'} → ${s('target') ?? '?'}`;
  if (r.action === 'failover.aborted' && s('stage'))
    return `at ${s('stage')!.replace(/_/g, ' ').toLowerCase()}`;
  if (r.action === 'member.role_set' && s('role')) return `role: ${s('role')}`;
  if (r.action === 'org.created' && s('name')) return s('name')!;
  if (r.action === 'org.objectives_set')
    return `RTO ${String(d.rto_seconds)} s, RPO ${String(d.rpo_seconds)} s`;
  if (r.action === 'drill.started')
    return `${s('trigger') ?? '?'}: ${s('source') ?? '?'} → ${s('target') ?? '?'}`;
  if (r.action === 'drill.completed')
    return s('result') === 'aborted'
      ? 'aborted'
      : `${s('result') ?? '?'}: ${String(d.recovery_seconds)} s vs ${String(d.rto_target_seconds)} s target (simulated)`;
  if (r.action === 'drill.schedule_set')
    return `${s('cadence') ?? '?'}, next ${s('next_run_at') ? new Date(s('next_run_at')!).toISOString().slice(0, 16).replace('T', ' ') + ' UTC' : '?'}`;
  if (r.action === 'alert.channel_added' || r.action === 'alert.channel_removed')
    return `${s('kind') ?? '?'}: ${s('name') ?? '?'}`;
  if (r.action === 'alert.test_sent') return s('name') ?? '';
  if (r.action === 'member.invited' || r.action === 'member.joined')
    return `${s('email') ?? '?'} as ${s('role') ?? '?'}`;
  if (r.action === 'member.invite_revoked' || r.action === 'member.removed')
    return s('email') ?? '';
  return '';
}

/** RFC 4180 CSV (quotes doubled; formula-leading cells neutralized for spreadsheet safety). */
export function toCsv(records: AuditRecord[], report: ChainReport | null): string {
  const cell = (v: string) => {
    const safe = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  const header = ['id', 'time_utc', 'actor', 'action', 'detail', 'prev_hash', 'hash'];
  const rows = records.map((r) =>
    [
      String(r.id),
      new Date(r.createdAt).toISOString(),
      r.actorEmail ?? 'system',
      r.action,
      JSON.stringify(r.detail),
      r.prevHash,
      r.hash,
    ]
      .map(cell)
      .join(','),
  );
  const note = report
    ? `# chain ${report.ok ? 'intact' : `BROKEN at entry ${report.brokenId}`}; ${report.checked} entries verified at ${report.verifiedAt}`
    : '# chain not verified at export time';
  return [note, header.join(','), ...rows].join('\n') + '\n';
}
