import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import type { DrillEvidence, DrillsCapability, RunSummary } from '../../domain/dr';
import DrillsPanel from './DrillsPanel';
import EvidenceReport from './EvidenceReport';
import { canonicalJson, evidenceFileName, fingerprint, formatSeconds } from './evidence';

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
    expect(screen.getByText('5.5 s (target 5 min)')).toBeInTheDocument();
    expect(screen.getByText('Met (different requester and approver)')).toBeInTheDocument();
    expect(screen.getByText('TARGET SECURED')).toBeInTheDocument();
    expect(screen.getByText(/Audit chain intact: 8 entries verified/)).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Report fingerprint \(SHA-256 of the downloaded JSON\): [0-9a-f]{64}/,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Not measured: replication telemetry is simulated/),
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
      sourceRegion: 'us-east-1',
      targetRegion: 'aws-us-west-2',
      requestedByEmail: 'op@co.com',
      requestedAt: '2026-11-09T09:59:00Z',
      approvedByEmail: 'ap@co.com',
      approvedAt: '2026-11-09T09:59:30Z',
      outcome: 'secured',
      recoverySeconds: 5.5,
      rtoTargetSeconds: 300,
    },
    {
      id: 'r2',
      sourceRegion: 'us-east-1',
      targetRegion: 'gcp-us-central1',
      requestedByEmail: 'op@co.com',
      requestedAt: '2026-11-09T09:00:00Z',
      approvedByEmail: null,
      approvedAt: null,
      outcome: 'withdrawn',
      recoverySeconds: null,
      rtoTargetSeconds: 300,
    },
  ];
  const fake = (): DrillsCapability => ({
    getObjectives: vi.fn(async () => ({ rtoSeconds: 300, rpoSeconds: 30 })),
    setObjectives: vi.fn(async () => {}),
    listRuns: vi.fn(async () => runs),
    evidence: vi.fn(async () => evidence()),
  });

  test('lists drills with pass/fail and a summary; opens the evidence report', async () => {
    const drills = fake();
    render(<DrillsPanel drills={drills} myRole="operator" refreshKey={0} />);
    expect(await screen.findByText('5.5 s · PASS')).toBeInTheDocument();
    expect(screen.getByText('Withdrawn')).toBeInTheDocument();
    expect(screen.getByText('1 of 1 completed drills met the 5 min target.')).toBeInTheDocument();
    expect(screen.getByText('Only admins change targets.')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: /Evidence report for drill/ })[0]);
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
