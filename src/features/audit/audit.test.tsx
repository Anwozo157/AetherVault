import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import type { AuditCapability, AuditRecord } from '../../domain/dr';
import AuditLogPanel from './AuditLogPanel';
import { ACTION_LABEL, describeDetail, toCsv } from './auditFormat';

const rec = (id: number, over: Partial<AuditRecord> = {}): AuditRecord => ({
  id,
  actorEmail: id % 2 ? 'op@test' : 'ap@test',
  action: id % 2 ? 'failover.requested' : 'failover.approved',
  detail: id % 2 ? { source: 'us-east-1', target: 'aws-us-west-2' } : { run_id: 'r' },
  createdAt: new Date(Date.UTC(2026, 10, 8, 12, 0, id)).toISOString(),
  prevHash: '0'.repeat(64),
  hash: id.toString(16).padStart(64, 'a'),
  ...over,
});

function fakeAudit(records: AuditRecord[], over: Partial<AuditCapability> = {}): AuditCapability {
  return {
    list: vi.fn(async ({ limit = 100, before }: { limit?: number; before?: number } = {}) =>
      records.filter((r) => before === undefined || r.id < before).slice(0, limit),
    ),
    verify: vi.fn(async () => ({
      ok: true,
      brokenId: null,
      checked: records.length,
      headHash: 'b'.repeat(64),
      verifiedAt: new Date().toISOString(),
    })),
    ...over,
  };
}

describe('auditFormat', () => {
  test('describes common actions in plain words', () => {
    expect(describeDetail(rec(1))).toBe('us-east-1 → aws-us-west-2');
    expect(
      describeDetail(rec(2, { action: 'failover.aborted', detail: { stage: 'HYDRATING_TARGET' } })),
    ).toBe('at hydrating target');
    expect(
      describeDetail(rec(3, { action: 'member.role_set', detail: { role: 'approver' } })),
    ).toBe('role: approver');
    expect(ACTION_LABEL['failover.approved']).toBe('Failover approved');
    expect(
      describeDetail(
        rec(4, { action: 'member.joined', detail: { email: 'n@co.com', role: 'approver' } }),
      ),
    ).toBe('n@co.com as approver');
    expect(
      describeDetail(rec(5, { action: 'member.removed', detail: { email: 'x@co.com' } })),
    ).toBe('x@co.com');
  });

  test('describes drill events', () => {
    expect(
      describeDetail(
        rec(6, {
          action: 'drill.started',
          detail: { trigger: 'scheduled', source: 'us-east-1', target: 'aws-us-west-2' },
        }),
      ),
    ).toBe('scheduled: us-east-1 → aws-us-west-2');
    expect(
      describeDetail(
        rec(7, {
          action: 'drill.completed',
          detail: { result: 'passed', recovery_seconds: 5.5, rto_target_seconds: 900 },
        }),
      ),
    ).toBe('passed: 5.5 s vs 900 s target (simulated)');
    expect(
      describeDetail(rec(8, { action: 'drill.completed', detail: { result: 'aborted' } })),
    ).toBe('aborted');
    expect(
      describeDetail(
        rec(9, {
          action: 'drill.schedule_set',
          detail: { cadence: 'monthly', next_run_at: '2026-12-01T17:00:00+00:00' },
        }),
      ),
    ).toBe('monthly, next 2026-12-01 17:00 UTC');
    expect(ACTION_LABEL['drill.schedule_disabled']).toBe('Drill schedule turned off');
    expect(
      describeDetail(
        rec(10, { action: 'alert.channel_added', detail: { kind: 'slack', name: 'Ops' } }),
      ),
    ).toBe('slack: Ops');
    expect(describeDetail(rec(11, { action: 'alert.test_sent', detail: { name: 'Ops' } }))).toBe(
      'Ops',
    );
  });

  test('CSV quotes fields, records the chain status, and neutralizes spreadsheet formulas', () => {
    const csv = toCsv(
      [rec(1, { actorEmail: '=HYPERLINK("http://evil")', detail: { note: 'say "hi"' } })],
      { ok: false, brokenId: 1, checked: 1, headHash: null, verifiedAt: '2026-11-08T12:00:00Z' },
    );
    const lines = csv.trim().split('\n');
    expect(lines[0]).toBe('# chain BROKEN at entry 1; 1 entries verified at 2026-11-08T12:00:00Z');
    expect(lines[1]).toBe('id,time_utc,actor,action,detail,prev_hash,hash');
    expect(lines[2]).toContain(`"'=HYPERLINK(""http://evil"")"`);
    expect(lines[2]).toContain('"{""note"":""say \\""hi\\""""}"');
  });
});

describe('AuditLogPanel', () => {
  test('lists entries newest first and filters by action and person', async () => {
    const records = [rec(4), rec(3), rec(2), rec(1)];
    render(<AuditLogPanel audit={fakeAudit(records)} refreshKey={0} />);
    expect(await screen.findByTestId('audit-row-4')).toBeInTheDocument();
    expect(screen.getByText('4 of 4 entries')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Filter by action'), {
      target: { value: 'failover.approved' },
    });
    expect(screen.getByText('2 of 4 entries')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Filter by action'), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText('Filter by person'), { target: { value: 'OP@' } });
    expect(screen.getByText('2 of 4 entries')).toBeInTheDocument();
  });

  test('Verify chain reports an intact chain', async () => {
    const audit = fakeAudit([rec(2), rec(1)]);
    render(<AuditLogPanel audit={audit} refreshKey={0} />);
    await screen.findByTestId('audit-row-2');
    fireEvent.click(screen.getByRole('button', { name: 'Verify chain' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Chain intact: 2 entries verified');
  });

  test('a broken chain is called out and the altered row highlighted', async () => {
    const audit = fakeAudit([rec(2), rec(1)], {
      verify: vi.fn(async () => ({
        ok: false,
        brokenId: 1,
        checked: 2,
        headHash: null,
        verifiedAt: new Date().toISOString(),
      })),
    });
    render(<AuditLogPanel audit={audit} refreshKey={0} />);
    await screen.findByTestId('audit-row-1');
    fireEvent.click(screen.getByRole('button', { name: 'Verify chain' }));
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Tampering detected: entry #1 was altered',
    );
    expect(
      within(screen.getByTestId('audit-row-1')).getByText('Altered entry:'),
    ).toBeInTheDocument();
  });

  test('loads older pages and reloads when new activity arrives', async () => {
    const many = Array.from({ length: 150 }, (_, i) => rec(150 - i));
    const audit = fakeAudit(many);
    const { rerender } = render(<AuditLogPanel audit={audit} refreshKey={0} />);
    await screen.findByText('100 of 100+ entries');
    fireEvent.click(screen.getByRole('button', { name: 'Load older entries' }));
    expect(await screen.findByText('150 of 150 entries')).toBeInTheDocument();
    expect(audit.list).toHaveBeenLastCalledWith({ limit: 100, before: 51 });
    rerender(<AuditLogPanel audit={audit} refreshKey={1} />);
    await waitFor(() => expect(audit.list).toHaveBeenCalledTimes(3));
  });

  test('server errors are shown, not swallowed', async () => {
    const audit = fakeAudit([], {
      list: vi.fn(async () => {
        throw new Error('not a member of this organization');
      }),
    });
    render(<AuditLogPanel audit={audit} refreshKey={0} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('not a member of this organization');
  });

  test('Export CSV downloads a file', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    Object.assign(URL, { createObjectURL: vi.fn(() => 'blob:x'), revokeObjectURL: vi.fn() });
    render(<AuditLogPanel audit={fakeAudit([rec(1)])} refreshKey={0} />);
    await screen.findByTestId('audit-row-1');
    fireEvent.click(screen.getByRole('button', { name: 'Export CSV' }));
    expect(click).toHaveBeenCalled();
    click.mockRestore();
  });
});
