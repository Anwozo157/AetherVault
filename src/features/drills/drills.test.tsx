import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import type { DrillEvidence, DrillsCapability, RunSummary } from '../../domain/dr';
import DrillsPanel from './DrillsPanel';
import EvidenceReport from './EvidenceReport';
import {
  canonicalJson,
  evidenceFileName,
  fingerprint,
  formatSeconds,
  rpoSummary,
  runPassed,
} from './evidence';

const REP: NonNullable<DrillEvidence['replication_at_launch']> = {
  snapshot_id: 1,
  source: 'aws-drs',
  collected_at: '2026-11-09T08:59:40Z',
  received_at: '2026-11-09T08:59:41Z',
  aws_account_id: '111122223333',
  aws_region: 'us-west-2',
  server_count: 3,
  healthy_count: 3,
  problem_count: 0,
  max_lag_seconds: 4,
  rpo_target_seconds: 30,
  rpo_met: true,
};

const evidence = (over: Partial<DrillEvidence> = {}): DrillEvidence => ({
  report_version: 1,
  generated_at: '2026-11-09T10:00:00Z',
  generated_by: 'op@co.com',
  organization: { id: 'org-1', name: 'Acme' },
  objectives: { rto_seconds: 300, rpo_seconds: 30 },
  run: {
    id: 'abcdef12-0000-0000-0000-000000000000',
    source_region: 'us-east-1',
    target_region: 'aws-us-west-2',
    requested_by: 'op@co.com',
    requested_at: '2026-11-09T09:59:00Z',
    approved_by: 'ap@co.com',
    approved_at: '2026-11-09T09:59:30Z',
    aborted_at: null,
    reset_at: null,
    outcome: 'secured',
    two_person_rule_met: true,
  },
  timeline: [
    { stage: 'QUIESCE_AND_SNAPSHOT', at: '2026-11-09T09:59:30Z' },
    { stage: 'TARGET_SECURED', at: '2026-11-09T09:59:35.5Z' },
  ],
  results: { decision_seconds: 30, recovery_seconds: 5.5, rto_met: true, rpo_measured: false },
  audit_entries: [
    {
      id: 7,
      at: '2026-11-09T09:59:00Z',
      actor: 'op@co.com',
      action: 'failover.requested',
      hash: 'a'.repeat(64),
    },
    {
      id: 8,
      at: '2026-11-09T09:59:30Z',
      actor: 'ap@co.com',
      action: 'failover.approved',
      hash: 'b'.repeat(64),
    },
  ],
  chain: {
    ok: true,
    broken_id: null,
    checked: 8,
    head_hash: 'b'.repeat(64),
    verified_at: '2026-11-09T10:00:00Z',
  },
  ...over,
});

describe('evidence helpers', () => {
  test('canonical JSON sorts keys at every level and drops undefined', () => {
    expect(canonicalJson({ b: 1, a: { d: [3, { z: 1, y: 2 }], c: undefined } })).toBe(
      '{"a":{"d":[3,{"y":2,"z":1}]},"b":1}',
    );
  });

  test('fingerprint is the real SHA-256 of the canonical JSON and is order-independent', async () => {
    // sha256("{}") is a well-known constant.
    const empty = await fingerprint({} as DrillEvidence);
    expect(empty).toBe('44136fa355b3678a1146ad16f7e8649e94fb4fc21fe77e8310c060f61caaff8a');
    const e = evidence();
    const { chain, ...rest } = e;
    const reordered = JSON.parse(JSON.stringify({ chain, ...rest })) as DrillEvidence;
    expect(await fingerprint(reordered)).toBe(await fingerprint(e));
    expect(await fingerprint(evidence({ generated_by: 'x' }))).not.toBe(await fingerprint(e));
  });

  test('formats durations and file names', () => {
    expect(formatSeconds(5.5)).toBe('5.5 s');
    expect(formatSeconds(900)).toBe('15 min');
    expect(formatSeconds(5400)).toBe('1 h 30 min');
    expect(formatSeconds(3600)).toBe('1 h');
    expect(formatSeconds(null)).toBe('n/a');
    expect(evidenceFileName(evidence())).toBe(
      'aethervault-drill-evidence-2026-11-09-abcdef12.json',
    );
  });
});

describe('EvidenceReport', () => {
  test('shows PASS, the people, the timeline, the chain status and a fingerprint', async () => {
    render(<EvidenceReport evidence={evidence()} onClose={vi.fn()} />);
    expect(screen.getByText('PASS')).toBeInTheDocument();
    expect(
      screen.getByText(
        '5.5 s (target 5 min). Simulated: recovery is not yet run against real infrastructure.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Met (different requester and approver)')).toBeInTheDocument();
    expect(screen.getByText('TARGET SECURED')).toBeInTheDocument();
    expect(screen.getByText(/Audit chain intact: 8 entries verified/)).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Report fingerprint \(SHA-256 of the downloaded JSON\): [0-9a-f]{64}/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Not measured: replication telemetry was simulated when this run happened/),
    ).toBeInTheDocument();
  });

  test('a broken chain and a missed target are called out', () => {
    render(
      <EvidenceReport
        evidence={evidence({
          results: {
            decision_seconds: 30,
            recovery_seconds: 5.5,
            rto_met: false,
            rpo_measured: false,
          },
          chain: { ok: false, broken_id: 3, checked: 8, head_hash: null, verified_at: '' },
        })}
        onClose={vi.fn()}
      />,
    );
    expect(screen.getByText('FAIL')).toBeInTheDocument();
    expect(screen.getByText(/Audit chain BROKEN at entry #3/)).toBeInTheDocument();
  });

  test('an unfinished drill is NOT COMPLETED; Print, Download and Escape work', async () => {
    const onClose = vi.fn();
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    Object.assign(URL, { createObjectURL: vi.fn(() => 'blob:x'), revokeObjectURL: vi.fn() });
    render(
      <EvidenceReport
        evidence={evidence({
          run: {
            ...evidence().run,
            approved_by: null,
            approved_at: null,
            outcome: 'withdrawn',
            two_person_rule_met: false,
          },
          timeline: [],
          results: {
            decision_seconds: null,
            recovery_seconds: null,
            rto_met: null,
            rpo_measured: false,
          },
        })}
        onClose={onClose}
      />,
    );
    expect(screen.getByText('NOT COMPLETED')).toBeInTheDocument();
    expect(screen.getByText('Not met')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Print/ }));
    expect(print).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Download JSON/ }));
    expect(click).toHaveBeenCalled();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
    print.mockRestore();
    click.mockRestore();
  });
});

describe('DrillsPanel', () => {
  const runs: RunSummary[] = [
    {
      id: 'r1',
      kind: 'failover',
      trigger: null,
      sourceRegion: 'us-east-1',
      targetRegion: 'aws-us-west-2',
      requestedByEmail: 'op@co.com',
      requestedAt: '2026-11-09T09:59:00Z',
      approvedByEmail: 'ap@co.com',
      approvedAt: '2026-11-09T09:59:30Z',
      outcome: 'secured',
      recoverySeconds: 5.5,
      rtoTargetSeconds: 300,
      rpoMet: null,
      rpoSeconds: null,
      rpoTargetSeconds: null,
      replicationSource: null,
    },
    {
      id: 'r2',
      kind: 'failover',
      trigger: null,
      sourceRegion: 'us-east-1',
      targetRegion: 'gcp-us-central1',
      requestedByEmail: 'op@co.com',
      requestedAt: '2026-11-09T09:00:00Z',
      approvedByEmail: null,
      approvedAt: null,
      outcome: 'withdrawn',
      recoverySeconds: null,
      rtoTargetSeconds: 300,
      rpoMet: null,
      rpoSeconds: null,
      rpoTargetSeconds: null,
      replicationSource: null,
    },
  ];
  const fake = (): DrillsCapability => ({
    getObjectives: vi.fn(async () => ({ rtoSeconds: 300, rpoSeconds: 30 })),
    setObjectives: vi.fn(async () => {}),
    listRuns: vi.fn(async () => runs),
    evidence: vi.fn(async () => evidence()),
    getSchedule: vi.fn(async () => null),
    setSchedule: vi.fn(async () => '2026-11-10T17:00:00.000Z'),
    disableSchedule: vi.fn(async () => {}),
    startDrill: vi.fn(async () => 'd1'),
  });

  test('lists drills with pass/fail and a summary; opens the evidence report', async () => {
    const drills = fake();
    render(<DrillsPanel drills={drills} myRole="operator" refreshKey={0} />);
    expect(await screen.findByText('5.5 s · PASS')).toBeInTheDocument();
    expect(screen.getByText('Withdrawn')).toBeInTheDocument();
    expect(
      screen.getByText(
        '1 of 1 completed drills passed: recovered within 5 min, and data loss within 30 s where measured.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Only admins change targets.')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: /Evidence report for failover/ })[0]);
    expect(
      await screen.findByRole('dialog', { name: /us-east-1 → aws-us-west-2/ }),
    ).toBeInTheDocument();
    expect(drills.evidence).toHaveBeenCalledWith('r1');
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('admins save recovery targets (minutes and seconds converted)', async () => {
    const drills = fake();
    render(<DrillsPanel drills={drills} myRole="admin" refreshKey={0} />);
    const rto = await screen.findByLabelText('Recovery time target (minutes)');
    await waitFor(() => expect(rto).toHaveValue(5));
    fireEvent.change(rto, { target: { value: '2.5' } });
    fireEvent.change(screen.getByLabelText('Data-loss target (seconds)'), {
      target: { value: '15' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save targets' }));
    await waitFor(() =>
      expect(drills.setObjectives).toHaveBeenCalledWith({ rtoSeconds: 150, rpoSeconds: 15 }),
    );
    expect(await screen.findByText('Saved and recorded in the audit log.')).toBeInTheDocument();
  });

  test('errors are shown', async () => {
    const drills = { ...fake(), listRuns: vi.fn(async () => Promise.reject(new Error('boom'))) };
    render(<DrillsPanel drills={drills} myRole="viewer" refreshKey={0} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('boom');
  });
});

describe('Drill schedule', () => {
  const base = (over: Partial<DrillsCapability> = {}): DrillsCapability => ({
    getObjectives: vi.fn(async () => ({ rtoSeconds: 900, rpoSeconds: 60 })),
    setObjectives: vi.fn(async () => {}),
    listRuns: vi.fn(async () => []),
    evidence: vi.fn(async () => evidence()),
    getSchedule: vi.fn(async () => null),
    setSchedule: vi.fn(async () => '2026-12-01T17:00:00.000Z'),
    disableSchedule: vi.fn(async () => {}),
    startDrill: vi.fn(async () => 'd1'),
    ...over,
  });
  const weekly = {
    cadence: 'weekly' as const,
    nextRunAt: new Date(Date.now() + 3 * 86_400_000).toISOString(),
    lastRunAt: '2026-11-02T17:00:00Z',
    sourceRegion: 'us-east-1',
    targetRegion: 'aws-us-west-2',
    enabled: true,
  };

  test('admins save a schedule; the local time is sent as ISO', async () => {
    const drills = base();
    render(<DrillsPanel drills={drills} myRole="admin" refreshKey={0} />);
    expect(await screen.findByTestId('schedule-status')).toHaveTextContent('No drills scheduled.');
    fireEvent.change(screen.getByLabelText('Repeat'), { target: { value: 'quarterly' } });
    fireEvent.change(screen.getByLabelText('First drill'), {
      target: { value: '2026-12-01T09:00' },
    });
    fireEvent.change(screen.getByLabelText('Recovery region'), {
      target: { value: 'gcp-us-central1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save schedule' }));
    await waitFor(() =>
      expect(drills.setSchedule).toHaveBeenCalledWith({
        cadence: 'quarterly',
        firstRunAt: new Date('2026-12-01T09:00').toISOString(),
        targetRegion: 'gcp-us-central1',
      }),
    );
    expect(await screen.findByText(/Scheduled\. Next drill/)).toBeInTheDocument();
  });

  test('shows the active schedule; admins can turn it off', async () => {
    const drills = base({ getSchedule: vi.fn(async () => weekly) });
    render(<DrillsPanel drills={drills} myRole="admin" refreshKey={0} />);
    expect(await screen.findByTestId('schedule-status')).toHaveTextContent(
      /Weekly to AWS us-west-2 \(Oregon\)\. Next drill .* \(in 3 days\)\./,
    );
    expect(screen.getByText(/Last scheduled drill/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Update schedule' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Turn off' }));
    await waitFor(() => expect(drills.disableSchedule).toHaveBeenCalled());
    expect(await screen.findByText('Scheduled drills turned off.')).toBeInTheDocument();
  });

  test('flags an overdue schedule (scheduler not running)', async () => {
    const drills = base({
      getSchedule: vi.fn(async () => ({
        ...weekly,
        nextRunAt: new Date(Date.now() - 3_600_000).toISOString(),
      })),
    });
    render(<DrillsPanel drills={drills} myRole="viewer" refreshKey={0} />);
    expect(
      await screen.findByText(/Overdue: the scheduler checks every minute/),
    ).toBeInTheDocument();
  });

  test('operators run a drill now but cannot change the schedule', async () => {
    const drills = base();
    render(<DrillsPanel drills={drills} myRole="operator" refreshKey={0} />);
    await screen.findByText('No drills scheduled.');
    expect(screen.queryByLabelText('Repeat')).not.toBeInTheDocument();
    expect(screen.getByText(/Only admins change the schedule/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Run drill now' }));
    await waitFor(() => expect(drills.startDrill).toHaveBeenCalledWith('aws-us-west-2'));
    expect(await screen.findByText(/Drill started in an isolated network/)).toBeInTheDocument();
  });

  test('viewers cannot run drills; errors are shown', async () => {
    const drills = base({ getSchedule: vi.fn(async () => Promise.reject(new Error('nope'))) });
    render(<DrillsPanel drills={drills} myRole="viewer" refreshKey={0} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('nope');
    expect(screen.queryByRole('button', { name: 'Run drill now' })).not.toBeInTheDocument();
    expect(screen.getByLabelText('Recovery region')).toBeDisabled();
  });

  test('drill rows and drill evidence read as drills', async () => {
    const drills = base({
      listRuns: vi.fn(async (): Promise<RunSummary[]> => [
        {
          id: 'd1',
          kind: 'drill',
          trigger: 'scheduled',
          sourceRegion: 'us-east-1',
          targetRegion: 'aws-us-west-2',
          requestedByEmail: null,
          requestedAt: '2026-11-09T09:00:00Z',
          approvedByEmail: null,
          approvedAt: '2026-11-09T09:00:00Z',
          outcome: 'secured',
          recoverySeconds: 5.5,
          rtoTargetSeconds: 900,
          rpoMet: false,
          rpoSeconds: 130,
          rpoTargetSeconds: 60,
          replicationSource: 'aws-drs',
        },
      ]),
      evidence: vi.fn(async () =>
        evidence({
          report_version: 3,
          results: {
            decision_seconds: null,
            recovery_seconds: 5.5,
            recovery_simulated: true,
            rto_met: true,
            rpo_measured: true,
            rpo_seconds: 130,
            rpo_met: false,
          },
          replication_at_launch: { ...REP, max_lag_seconds: 130, problem_count: 1, rpo_met: false },
          run: {
            ...evidence().run,
            kind: 'drill',
            trigger: 'scheduled',
            requested_by: null,
            approved_by: null,
            two_person_rule_met: null,
          },
          timeline: [{ stage: 'DRILL_COMPLETE', at: '2026-11-09T09:00:05.5Z' }],
        }),
      ),
    });
    render(<DrillsPanel drills={drills} myRole="viewer" refreshKey={0} />);
    expect(await screen.findByText('Scheduler')).toBeInTheDocument();
    expect(screen.getByText('isolated · no approval needed')).toBeInTheDocument();
    // Recovery met the RTO, but measured replication missed the RPO: the drill fails.
    expect(screen.getByText('5.5 s · FAIL')).toBeInTheDocument();
    expect(screen.getByText('data loss 2 min · missed')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Evidence report for drill/ }));
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toHaveTextContent('Scheduled drill evidence (isolated, no production cutover)');
    expect(dialog).toHaveTextContent('Drill scheduler');
    expect(dialog).toHaveTextContent(/Not required: drills run in an isolated network/);
    expect(dialog).not.toHaveTextContent('Time to approval');
    expect(dialog).toHaveTextContent('DRILL COMPLETE');
    expect(dialog).toHaveTextContent('FAIL');
    expect(dialog).toHaveTextContent(
      'MISSED: 2 min worst replication lag at launch (target 30 s); 1 of 3 servers not replicating normally. Measured from AWS DRS us-west-2, account …3333',
    );
  });
});

describe('measured RPO', () => {
  test('a run passes only if RTO is met and the measured RPO was not missed', () => {
    expect(runPassed(null, true)).toBeNull();
    expect(runPassed(true, null)).toBe(true);
    expect(runPassed(true, undefined)).toBe(true);
    expect(runPassed(true, false)).toBe(false);
    expect(runPassed(false, true)).toBe(false);
  });

  test('the RPO sentence is honest about where the number came from', () => {
    expect(rpoSummary(evidence({ report_version: 2 }))).toBe(
      '30 s. Not measured: replication telemetry was simulated when this run happened.',
    );
    expect(rpoSummary(evidence({ report_version: 3, replication_at_launch: null }))).toBe(
      '30 s. Not measured: no replication data was received in the 5 minutes before launch.',
    );
    expect(
      rpoSummary(
        evidence({ report_version: 3, replication_at_launch: { ...REP, source: 'fixture' } }),
      ),
    ).toMatch(
      /^SAMPLE DATA \(not a real account\): Met: 4 s worst replication lag at launch \(target 30 s\); all 3 servers replicating\./,
    );
    expect(
      rpoSummary(
        evidence({
          report_version: 3,
          replication_at_launch: {
            ...REP,
            max_lag_seconds: null,
            problem_count: 1,
            rpo_met: false,
          },
        }),
      ),
    ).toMatch(/^MISSED: worst lag unknown at launch/);
  });
});

describe('schedule helpers', () => {
  test('relative time, default first run, local input format', async () => {
    const { relativeTime, defaultFirstRun, toLocalInput } = await import('./DrillSchedule');
    const now = Date.parse('2026-11-09T12:00:00Z');
    expect(relativeTime('2026-11-09T12:00:30Z', now)).toBe('now');
    expect(relativeTime('2026-11-09T12:20:00Z', now)).toBe('in 20 min');
    expect(relativeTime('2026-11-09T17:00:00Z', now)).toBe('in 5 hours');
    expect(relativeTime('2026-11-12T12:00:00Z', now)).toBe('in 3 days');
    expect(defaultFirstRun(new Date(2026, 10, 9, 15, 30))).toBe('2026-11-10T09:00');
    expect(toLocalInput(new Date(2026, 0, 5, 7, 4))).toBe('2026-01-05T07:04');
  });
});
