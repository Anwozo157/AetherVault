// Narrow data-access layer for the signed-in console. SupabaseDrProvider depends on
// this interface (not on supabase-js directly) so it can be unit-tested with a fake.

import type { SupabaseClient } from '@supabase/supabase-js';
import type { MemberRole, Unsubscribe } from '../../domain/dr';

export interface ServerRun {
  id: string;
  source_region: string;
  target_region: string;
  requested_by: string;
  requested_by_email: string | null;
  requested_at: string;
  approved_by: string | null;
  approved_by_email: string | null;
  approved_at: string | null;
  stage: string;
}

export interface FailoverStatus {
  server_now: string;
  run: ServerRun | null;
}

export interface AuditEntry {
  id: number;
  actor_email: string | null;
  action: string;
  detail: Record<string, unknown>;
  created_at: string;
}

export interface Membership {
  orgId: string;
  orgName: string;
  role: MemberRole;
}

export interface ConsoleApi {
  getStatus(orgId: string): Promise<FailoverStatus>;
  getAuditFeed(orgId: string, limit?: number): Promise<AuditEntry[]>;
  requestFailover(orgId: string, source: string, target: string): Promise<string>;
  approveFailover(runId: string): Promise<void>;
  abortFailover(runId: string): Promise<void>;
  resetFailover(runId: string): Promise<void>;
  /** Calls back whenever runs or audit entries for the org change. */
  subscribe(orgId: string, onChange: () => void): Unsubscribe;
}

/** Awaits a supabase-js query and throws its error, so callers get plain promises. */
async function call<T>(
  query: PromiseLike<{ data: unknown; error: { message: string } | null }>,
): Promise<T> {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as T;
}

export function createSupabaseConsoleApi(client: SupabaseClient): ConsoleApi {
  return {
    getStatus: (orgId) => call<FailoverStatus>(client.rpc('get_failover_status', { p_org: orgId })),
    getAuditFeed: (orgId, limit = 50) =>
      call<AuditEntry[]>(client.rpc('org_audit_feed', { p_org: orgId, p_limit: limit })),
    requestFailover: (orgId, source, target) =>
      call<string>(
        client.rpc('request_failover', { p_org: orgId, p_source: source, p_target: target }),
      ),
    approveFailover: (runId) => call<void>(client.rpc('approve_failover', { p_run: runId })),
    abortFailover: (runId) => call<void>(client.rpc('abort_failover', { p_run: runId })),
    resetFailover: (runId) => call<void>(client.rpc('reset_failover', { p_run: runId })),
    subscribe(orgId, onChange) {
      const filter = `org_id=eq.${orgId}`;
      const channel = client
        .channel(`org-${orgId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'failover_runs', filter },
          onChange,
        )
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'audit_log', filter },
          onChange,
        )
        .subscribe();
      return () => {
        void client.removeChannel(channel);
      };
    },
  };
}

/** Organizations the signed-in user belongs to (RLS returns only their rows). */
export async function listMemberships(client: SupabaseClient, userId: string) {
  const rows = await call<Array<{ role: MemberRole; org: { id: string; name: string } | null }>>(
    client.from('memberships').select('role, org:orgs(id, name)').eq('user_id', userId),
  );
  return rows
    .filter((r) => r.org)
    .map((r): Membership => ({ orgId: r.org!.id, orgName: r.org!.name, role: r.role }));
}

export async function createOrg(client: SupabaseClient, name: string) {
  return call<string>(client.rpc('create_org', { p_name: name }));
}
