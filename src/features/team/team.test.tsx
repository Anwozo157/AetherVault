import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type {
  AuditCapability,
  MemberRole,
  TeamCapability,
  TeamInvite,
  TeamMember,
} from '../../domain/dr';
import OnboardingChecklist from '../onboarding/OnboardingChecklist';
import { readFlag, setFlag } from '../onboarding/progress';
import TeamPanel from './TeamPanel';
import { ROLE_HELP, consoleUrl, inviteMessage } from './teamText';

function fakeTeam(myRole: MemberRole, over: Partial<TeamCapability> = {}) {
  let members: TeamMember[] = [
    {
      userId: 'me',
      email: 'boss@co.com',
      role: myRole,
      joinedAt: '2026-11-01T00:00:00Z',
      isMe: true,
    },
    {
      userId: 'u2',
      email: 'op@co.com',
      role: 'operator',
      joinedAt: '2026-11-02T00:00:00Z',
      isMe: false,
    },
  ];
  let invites: TeamInvite[] = [];
  const team: TeamCapability = {
    orgId: 'org-1',
    orgName: 'Acme',
    myRole,
    listMembers: vi.fn(async () => members),
    listInvites: vi.fn(async () => invites),
    invite: vi.fn(async (email: string, role: MemberRole) => {
      invites = [{ id: 'i1', email, role, invitedByEmail: 'boss@co.com', createdAt: '' }];
    }),
    revokeInvite: vi.fn(async () => {
      invites = [];
    }),
    setRole: vi.fn(async (userId: string, role: MemberRole) => {
      members = members.map((m) => (m.userId === userId ? { ...m, role } : m));
    }),
    remove: vi.fn(async (userId: string) => {
      members = members.filter((m) => m.userId !== userId);
    }),
    ...over,
  };
  return team;
}

describe('teamText', () => {
  test('invite message tells the person exactly how to join', () => {
    expect(inviteMessage('Acme', 'a@b.co', 'approver', 'https://x/#/console')).toBe(
      'You\'ve been invited to join Acme on AetherVault as approver.\nSign in with a@b.co at https://x/#/console using "Email me a sign-in link". You\'ll be added automatically.',
    );
    expect(consoleUrl({ origin: 'https://x', pathname: '/app/' })).toBe('https://x/app/#/console');
    expect(ROLE_HELP.approver).toMatch(/Approves someone else/);
  });
});

describe('TeamPanel', () => {
  afterEach(() => vi.restoreAllMocks());

  test('admin invites a teammate and gets a message to send', async () => {
    const team = fakeTeam('admin');
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<TeamPanel team={team} refreshKey={0} />);
    expect(await screen.findByText('op@co.com')).toBeInTheDocument();
    expect(screen.getByText('(you)')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Teammate email'), {
      target: { value: ' New@Co.com ' },
    });
    fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'approver' } });
    fireEvent.click(screen.getByRole('button', { name: 'Invite' }));
    await waitFor(() => expect(team.invite).toHaveBeenCalledWith('new@co.com', 'approver'));
    expect(await screen.findByText(/Invited new@co.com as approver/)).toBeInTheDocument();
    expect(screen.getByText(/new@co.com · approver/)).toBeInTheDocument(); // pending list

    fireEvent.click(screen.getByRole('button', { name: 'Copy message' }));
    await waitFor(() =>
      expect(writeText).toHaveBeenCalledWith(expect.stringContaining('join Acme')),
    );
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Revoke' }));
    await waitFor(() => expect(team.revokeInvite).toHaveBeenCalledWith('i1'));
  });

  test('admin changes a role and removes a member only after confirming', async () => {
    const team = fakeTeam('admin');
    render(<TeamPanel team={team} refreshKey={0} />);
    fireEvent.change(await screen.findByLabelText('Role for op@co.com'), {
      target: { value: 'approver' },
    });
    await waitFor(() => expect(team.setRole).toHaveBeenCalledWith('u2', 'approver'));

    fireEvent.click(screen.getByRole('button', { name: 'Remove op@co.com' }));
    expect(team.remove).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Keep' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove op@co.com' }));
    fireEvent.click(screen.getByRole('button', { name: 'Confirm remove' }));
    await waitFor(() => expect(screen.queryByText('op@co.com')).not.toBeInTheDocument());
  });

  test('non-admins see the team read-only', async () => {
    const team = fakeTeam('operator');
    render(<TeamPanel team={team} refreshKey={0} />);
    expect(await screen.findByText('op@co.com')).toBeInTheDocument();
    expect(screen.queryByLabelText('Teammate email')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Role for op@co.com')).not.toBeInTheDocument();
    expect(team.listInvites).not.toHaveBeenCalled();
  });

  test('server errors are shown', async () => {
    const team = fakeTeam('admin', {
      invite: vi.fn(async () => {
        throw new Error('that person is already a member');
      }),
    });
    render(<TeamPanel team={team} refreshKey={0} />);
    await screen.findByText('op@co.com');
    fireEvent.change(screen.getByLabelText('Teammate email'), { target: { value: 'op@co.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Invite' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('that person is already a member');
  });
});

describe('OnboardingChecklist', () => {
  afterEach(() => window.localStorage.clear());

  const audit = (actions: string[]): AuditCapability => ({
    list: vi.fn(async () =>
      actions.map((action, i) => ({
        id: i + 1,
        actorEmail: null,
        action,
        detail: {},
        createdAt: '',
        prevHash: '',
        hash: '',
      })),
    ),
    verify: vi.fn(),
  });

  test('computes progress from real data and links each open step', async () => {
    const onGoTo = vi.fn();
    render(
      <OnboardingChecklist
        orgId="org-1"
        team={fakeTeam('admin')}
        audit={audit([])}
        refreshKey={0}
        onGoTo={onGoTo}
      />,
    );
    expect(await screen.findByText('Get set up · 1 of 4')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open Team' }));
    expect(onGoTo).toHaveBeenCalledWith('team');
  });

  test('ticks approver, drill and verify when they happen', async () => {
    setFlag('verified', 'org-1');
    const team = fakeTeam('admin');
    await team.invite('ap@co.com', 'approver');
    render(
      <OnboardingChecklist
        orgId="org-1"
        team={team}
        audit={audit(['failover.requested', 'failover.approved'])}
        refreshKey={0}
        onGoTo={vi.fn()}
      />,
    );
    expect(await screen.findByText('Get set up · 4 of 4')).toBeInTheDocument();
    const list = screen.getByRole('list');
    expect(within(list).getAllByText(/Done:/)).toHaveLength(4);
  });

  test('can be dismissed, and stays dismissed for that organization', async () => {
    const { unmount } = render(
      <OnboardingChecklist
        orgId="org-1"
        team={fakeTeam('admin')}
        audit={audit([])}
        refreshKey={0}
        onGoTo={vi.fn()}
      />,
    );
    fireEvent.click(await screen.findByRole('button', { name: 'Hide setup checklist' }));
    expect(screen.queryByText(/Get set up/)).not.toBeInTheDocument();
    unmount();
    expect(readFlag('dismissed', 'org-1')).toBe(true);
    expect(readFlag('dismissed', 'org-2')).toBe(false);
  });

  test('blocked storage never breaks the page', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readFlag('verified', 'x')).toBe(false);
    spy.mockRestore();
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(() => setFlag('verified', 'x')).not.toThrow();
    set.mockRestore();
  });
});
