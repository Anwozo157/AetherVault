import type { SupabaseClient } from '@supabase/supabase-js';
import { describe, expect, test, vi } from 'vitest';
import {
  acceptPendingInvites,
  createOrg,
  createSupabaseConsoleApi,
  listMemberships,
} from './consoleApi';

function fakeClient(result: { data: unknown; error: { message: string } | null }) {
  const channel = { on: vi.fn(), subscribe: vi.fn() };
  channel.on.mockReturnValue(channel);
  channel.subscribe.mockReturnValue(channel);
  const query = { select: vi.fn(), eq: vi.fn(), single: vi.fn(), maybeSingle: vi.fn() };
  query.select.mockReturnValue(query);
  // eq() is awaited directly (memberships) or followed by single() (objectives).
  const eqResult = Object.assign(Promise.resolve(result), {
    single: query.single,
    maybeSingle: query.maybeSingle,
  });
  query.eq.mockReturnValue(eqResult);
  query.single.mockResolvedValue(result);
  query.maybeSingle.mockResolvedValue(result);
  const client = {
    rpc: vi.fn().mockResolvedValue(result),
    from: vi.fn().mockReturnValue(query),
    channel: vi.fn().mockReturnValue(channel),
    removeChannel: vi.fn().mockResolvedValue('ok'),
  };
  return { client: client as unknown as SupabaseClient, raw: client, channel, query };
}

describe('createSupabaseConsoleApi', () => {
  test('maps each method to its RPC with named parameters', async () => {
    const { client, raw } = fakeClient({ data: 'run-1', error: null });
    const api = createSupabaseConsoleApi(client);
    await api.getStatus('o');
    await api.getAuditFeed('o');
    await expect(api.requestFailover('o', 'us-east-1', 'aws-us-west-2')).resolves.toBe('run-1');
    await api.approveFailover('r');
    await api.abortFailover('r');
    await api.resetFailover('r');
    await api.getAuditPage('o', 25, 90);
    await api.verifyAuditChain('o');
    await api.listMembers('o');
    await api.listInvites('o');
    await api.inviteMember('o', 'a@b.co', 'approver');
    await api.revokeInvite('i');
    await api.setMemberRole('o', 'u', 'viewer');
    await api.removeMember('o', 'u');
    await api.setObjectives('o', 300, 30);
    await api.listRuns('o');
    await api.drillEvidence('r');
    await api.setDrillSchedule(
      'o',
      'monthly',
      '2026-12-01T09:00:00.000Z',
      'us-east-1',
      'aws-us-west-2',
    );
    await api.disableDrillSchedule('o');
    await api.startDrill('o', 'us-east-1', 'gcp-us-central1');
    await api.listAlertChannels('o');
    await api.listAlertDeliveries('o');
    await api.addAlertChannel('o', 'slack', 'Ops', 'https://hooks.slack.com/services/a/b/c', [
      'failover',
    ]);
    await api.removeAlertChannel('c');
    await api.sendTestAlert('c');
    await api.latestReplication('o');
    await api.replicationHistory('o');
    await api.ingestTokenStatus('o');
    await api.createIngestToken('o');
    await api.revokeIngestToken('o');
    expect(raw.rpc.mock.calls).toEqual([
      ['get_failover_status', { p_org: 'o' }],
      ['org_audit_feed', { p_org: 'o', p_limit: 50 }],
      ['request_failover', { p_org: 'o', p_source: 'us-east-1', p_target: 'aws-us-west-2' }],
      ['approve_failover', { p_run: 'r' }],
      ['abort_failover', { p_run: 'r' }],
      ['reset_failover', { p_run: 'r' }],
      ['audit_log_page', { p_org: 'o', p_limit: 25, p_before: 90 }],
      ['verify_audit_chain_report', { p_org: 'o' }],
      ['list_org_members', { p_org: 'o' }],
      ['list_org_invites', { p_org: 'o' }],
      ['invite_member', { p_org: 'o', p_email: 'a@b.co', p_role: 'approver' }],
      ['revoke_invite', { p_invite: 'i' }],
      ['set_member_role', { p_org: 'o', p_user: 'u', p_role: 'viewer' }],
      ['remove_member', { p_org: 'o', p_user: 'u' }],
      ['set_recovery_objectives', { p_org: 'o', p_rto: 300, p_rpo: 30 }],
      ['list_failover_runs', { p_org: 'o', p_limit: 50 }],
      ['drill_evidence', { p_run: 'r' }],
      [
        'set_drill_schedule',
        {
          p_org: 'o',
          p_cadence: 'monthly',
          p_first_run: '2026-12-01T09:00:00.000Z',
          p_source: 'us-east-1',
          p_target: 'aws-us-west-2',
        },
      ],
      ['disable_drill_schedule', { p_org: 'o' }],
      ['start_drill', { p_org: 'o', p_source: 'us-east-1', p_target: 'gcp-us-central1' }],
      ['list_alert_channels', { p_org: 'o' }],
      ['list_alert_deliveries', { p_org: 'o', p_limit: 30 }],
      [
        'add_alert_channel',
        {
          p_org: 'o',
          p_kind: 'slack',
          p_name: 'Ops',
          p_secret: 'https://hooks.slack.com/services/a/b/c',
          p_events: ['failover'],
        },
      ],
      ['remove_alert_channel', { p_channel: 'c' }],
      ['send_test_alert', { p_channel: 'c' }],
      ['latest_replication_snapshot', { p_org: 'o' }],
      ['replication_lag_history', { p_org: 'o', p_limit: 60 }],
      ['ingest_token_status', { p_org: 'o' }],
      ['create_ingest_token', { p_org: 'o' }],
      ['revoke_ingest_token', { p_org: 'o' }],
    ]);
  });

  test('turns Supabase errors into rejected promises', async () => {
    const { client } = fakeClient({ data: null, error: { message: 'operator role required' } });
    await expect(createSupabaseConsoleApi(client).approveFailover('r')).rejects.toThrow(
      'operator role required',
    );
  });

  test('subscribes to run and audit changes for one org, and unsubscribes', () => {
    const { client, raw, channel } = fakeClient({ data: null, error: null });
    const off = createSupabaseConsoleApi(client).subscribe('o', vi.fn());
    expect(raw.channel).toHaveBeenCalledWith('org-o');
    expect(channel.on.mock.calls.map((c) => c[1])).toEqual([
      { event: '*', schema: 'public', table: 'failover_runs', filter: 'org_id=eq.o' },
      { event: '*', schema: 'public', table: 'drill_schedules', filter: 'org_id=eq.o' },
      { event: 'INSERT', schema: 'public', table: 'audit_log', filter: 'org_id=eq.o' },
    ]);
    off();
    expect(raw.removeChannel).toHaveBeenCalledWith(channel);
  });
});

describe('memberships and org creation', () => {
  test('listMemberships flattens rows and drops orgs RLS hid', async () => {
    const { client, query } = fakeClient({
      data: [
        { role: 'operator', org: { id: 'o1', name: 'Acme' } },
        { role: 'viewer', org: null },
      ],
      error: null,
    });
    await expect(listMemberships(client, 'u1')).resolves.toEqual([
      { orgId: 'o1', orgName: 'Acme', role: 'operator' },
    ]);
    expect(query.eq).toHaveBeenCalledWith('user_id', 'u1');
  });

  test('createOrg calls the create_org RPC', async () => {
    const { client, raw } = fakeClient({ data: 'o2', error: null });
    await expect(createOrg(client, 'NewCo')).resolves.toBe('o2');
    expect(raw.rpc).toHaveBeenCalledWith('create_org', { p_name: 'NewCo' });
  });
});

describe('acceptPendingInvites', () => {
  test('calls the accept RPC and returns how many organizations were joined', async () => {
    const { client, raw } = fakeClient({ data: 2, error: null });
    await expect(acceptPendingInvites(client)).resolves.toBe(2);
    expect(raw.rpc).toHaveBeenCalledWith('accept_pending_invites');
  });
});

describe('drill schedule read', () => {
  test('reads the schedule row, or null when none exists', async () => {
    const row = {
      cadence: 'weekly',
      next_run_at: '2026-11-16T09:00:00Z',
      last_run_at: null,
      source_region: 'us-east-1',
      target_region: 'aws-us-west-2',
      enabled: true,
    };
    const { client, raw, query } = fakeClient({ data: row, error: null });
    await expect(createSupabaseConsoleApi(client).getDrillSchedule('o')).resolves.toEqual(row);
    expect(raw.from).toHaveBeenCalledWith('drill_schedules');
    expect(query.eq).toHaveBeenCalledWith('org_id', 'o');
    expect(query.maybeSingle).toHaveBeenCalled();
  });
});

describe('objectives read', () => {
  test('reads the org row', async () => {
    const { client, raw, query } = fakeClient({
      data: { rto_target_seconds: 300, rpo_target_seconds: 30 },
      error: null,
    });
    await expect(createSupabaseConsoleApi(client).getObjectives('o')).resolves.toEqual({
      rto_target_seconds: 300,
      rpo_target_seconds: 30,
    });
    expect(raw.from).toHaveBeenCalledWith('orgs');
    expect(query.eq).toHaveBeenCalledWith('id', 'o');
  });
});
