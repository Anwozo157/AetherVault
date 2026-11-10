import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import type {
  DrillsCapability,
  Runbook,
  RunbooksCapability,
  RunChecklist,
  RunSummary,
} from '../../domain/dr';
import RunbookPanel from './RunbookPanel';
import { STARTER_RUNBOOK } from './template';

const BOOK: Runbook = {
  version: 2,
  steps: [
    { id: 's1', phase: 'before', title: 'Declare the incident', detail: 'Name a lead.' },
    { id: 's2', phase: 'during', title: 'Launch recovery', detail: null },
    { id: 's3', phase: 'after', title: 'Confirm remote access', detail: null },
  ],
  updatedBy: 'admin@co.com',
  updatedAt: '2026-11-10T12:00:00Z',
};

const run = (id: string, over: Partial<RunSummary> = {}): RunSummary => ({
  id,
  kind: 'drill',
  trigger: 'manual',
  sourceRegion: 'us-east-1',
  targetRegion: 'aws-us-west-2',
  requestedByEmail: 'op@co.com',
  requestedAt: '2026-11-10T12:30:00Z',
  approvedByEmail: null,
  approvedAt: '2026-11-10T12:30:00Z',
  outcome: 'secured',
  recoverySeconds: 5.5,
  rtoTargetSeconds: 900,
  rpoMet: null,
  rpoSeconds: null,
  rpoTargetSeconds: null,
  replicationSource: null,
  ...over,
});

const checklist = (over: Partial<RunChecklist> = {}): RunChecklist => ({
  runId: 'r1',
  version: 2,
  open: true,
  steps: [
    {
      ...BOOK.steps[0],
      done: true,
      checkedBy: 'op@co.com',
      checkedAt: '2026-11-10T12:31:00Z',
      note: 'bridge open',
    },
    { ...BOOK.steps[1], done: false, checkedBy: null, checkedAt: null, note: null },
    { ...BOOK.steps[2], done: false, checkedBy: null, checkedAt: null, note: null },
  ],
  ...over,
});

function fakeRunbooks(over: Partial<RunbooksCapability> = {}): RunbooksCapability {
  return {
    get: vi.fn(async () => BOOK),
    save: vi.fn(async () => 3),
    checklist: vi.fn(async () => checklist()),
    check: vi.fn(async () => {}),
    ...over,
  };
}

const drills = (runs: RunSummary[]) =>
  ({ listRuns: vi.fn(async () => runs) }) as unknown as DrillsCapability;

describe('RunbookPanel', () => {
  test('admin with no runbook starts from the template and saves it', async () => {
    const runbooks = fakeRunbooks({ get: vi.fn(async () => null) });
    render(<RunbookPanel runbooks={runbooks} drills={drills([])} myRole="admin" refreshKey={0} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Start from template' }));
    expect(screen.getAllByLabelText(/^Title of step/)).toHaveLength(STARTER_RUNBOOK.length);
    expect(screen.getByLabelText('Title of step 1')).toHaveValue(STARTER_RUNBOOK[0].title);
    fireEvent.click(screen.getByRole('button', { name: 'Save runbook' }));
    await waitFor(() => expect(runbooks.save).toHaveBeenCalledWith(STARTER_RUNBOOK));
  });

  test('non-admins see that an admin creates the runbook, with no editor', async () => {
    render(
      <RunbookPanel
        runbooks={fakeRunbooks({ get: vi.fn(async () => null) })}
        drills={drills([])}
        myRole="operator"
        refreshKey={0}
      />,
    );
    expect(await screen.findByText('No runbook yet. An admin can create one.')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Start from template' })).toBeNull();
  });

  test('editor: reorder, remove, add, blank titles block saving; ids are kept', async () => {
    const runbooks = fakeRunbooks();
    render(<RunbookPanel runbooks={runbooks} drills={drills([])} myRole="admin" refreshKey={0} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Edit runbook' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move step 2 up' }));
    expect(screen.getByLabelText('Title of step 1')).toHaveValue('Launch recovery');
    fireEvent.click(screen.getByRole('button', { name: 'Remove step 3' }));
    fireEvent.click(screen.getByRole('button', { name: 'Add step' }));
    expect(screen.getByRole('button', { name: 'Save runbook' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Title of step 3'), {
      target: { value: 'Plan failback' },
    });
    fireEvent.change(screen.getByLabelText('Phase of step 3'), { target: { value: 'after' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save runbook' }));
    await waitFor(() =>
      expect(runbooks.save).toHaveBeenCalledWith([
        { id: 's2', phase: 'during', title: 'Launch recovery', detail: null },
        { id: 's1', phase: 'before', title: 'Declare the incident', detail: 'Name a lead.' },
        { phase: 'after', title: 'Plan failback', detail: null },
      ]),
    );
  });

  test('operator ticks a step with a note on the latest run', async () => {
    const runbooks = fakeRunbooks();
    render(
      <RunbookPanel
        runbooks={runbooks}
        drills={drills([run('r1'), run('r0', { outcome: 'withdrawn' })])}
        myRole="operator"
        refreshKey={0}
      />,
    );
    expect(await screen.findByText(/1 of 3 steps done · runbook v2/)).toBeInTheDocument();
    expect(screen.getByText(/Done by op@co.com/)).toHaveTextContent('bridge open');
    // Withdrawn requests have nothing to tick, so they are not offered.
    expect(screen.getAllByRole('option')).toHaveLength(1);
    const step = screen.getByTestId('check-s2');
    fireEvent.change(within(step).getByLabelText('Note for Launch recovery'), {
      target: { value: 'drill started 12:30' },
    });
    fireEvent.click(within(step).getByRole('button', { name: 'Mark done: Launch recovery' }));
    await waitFor(() =>
      expect(runbooks.check).toHaveBeenCalledWith('r1', 's2', 'drill started 12:30'),
    );
    expect(runbooks.checklist).toHaveBeenCalledTimes(2); // reloaded after the tick
    expect(screen.queryByRole('button', { name: /Mark done: Declare/ })).toBeNull();
  });

  test('viewers and closed checklists cannot tick; errors are shown', async () => {
    const { unmount } = render(
      <RunbookPanel
        runbooks={fakeRunbooks()}
        drills={drills([run('r1')])}
        myRole="viewer"
        refreshKey={0}
      />,
    );
    await screen.findByText(/1 of 3 steps done/);
    expect(screen.queryByRole('button', { name: /Mark done/ })).toBeNull();
    unmount();

    render(
      <RunbookPanel
        runbooks={fakeRunbooks({
          checklist: vi.fn(async () => checklist({ open: false })),
          check: vi.fn(async () => {
            throw new Error('never called');
          }),
        })}
        drills={drills([run('r1')])}
        myRole="operator"
        refreshKey={0}
      />,
    );
    expect(await screen.findByText(/closed \(older than 7 days\)/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Mark done/ })).toBeNull();
  });

  test('a run from before the runbook existed says so', async () => {
    render(
      <RunbookPanel
        runbooks={fakeRunbooks({ checklist: vi.fn(async () => null) })}
        drills={drills([run('r1')])}
        myRole="operator"
        refreshKey={0}
      />,
    );
    expect(
      await screen.findByText(/started before your organization had a runbook/),
    ).toBeInTheDocument();
  });

  test('a failed tick shows the server message', async () => {
    render(
      <RunbookPanel
        runbooks={fakeRunbooks({
          check: vi.fn(async () => {
            throw new Error('step already checked');
          }),
        })}
        drills={drills([run('r1')])}
        myRole="operator"
        refreshKey={0}
      />,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Mark done: Launch recovery' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('step already checked');
  });
});
