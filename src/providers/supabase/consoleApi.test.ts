import type { SupabaseClient } from '@supabase/supabase-js';
import { describe, expect, test, vi } from 'vitest';
import { createOrg, createSupabaseConsoleApi, listMemberships } from './consoleApi';

function fakeClient(result: { data: unknown; error: { message: string } | null }) {
  const channel = { on: vi.fn(), subscribe: vi.fn() };
  channel.on.mockReturnValue(channel);
  channel.subscribe.mockReturnValue(channel);
  const query = { select: vi.fn(), eq: vi.fn() };
  query.select.mockReturnValue(query);
  query.eq.mockResolvedValue(result);
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
    expect(raw.rpc.mock.calls).toEqual([
      ['get_failover_status', { p_org: 'o' }],
      ['org_audit_feed', { p_org: 'o', p_limit: 50 }],
      ['request_failover', { p_org: 'o', p_source: 'us-east-1', p_target: 'aws-us-west-2' }],
      ['approve_failover', { p_run: 'r' }],
      ['abort_failover', { p_run: 'r' }],
      ['reset_failover', { p_run: 'r' }],
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
