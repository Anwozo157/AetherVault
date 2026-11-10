// Narrow data-access layer for the signed-in console. SupabaseDrProvider depends on
// this interface (not on supabase-js directly) so it can be unit-tested with a fake.

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  AlertChannelKind,
  AlertEvent,
  DrillCadence,
  DrillEvidence,
  DrillTrigger,
  MemberRole,
  RunKind,
  RunOutcome,
  RunbookStep,
  RunbookStepDraft,
  ServerHealth,
  Unsubscribe,
} from '../../domain/dr';

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

export interface AuditPageRow extends AuditEntry {
  prev_hash: string;
  hash: string;
}

export interface ChainReportRow {
  ok: boolean;
  broken_id: number | null;
  checked: number;
  head_hash: string | null;
  verified_at: string;
}

export interface MemberRow {
  user_id: string;
  email: string;
  role: MemberRole;
  joined_at: string;
}

export interface InviteRow {
  id: string;
  email: string;
  role: MemberRole;
  invited_by_email: string | null;
  created_at: string;
}

export interface RunRow {
  id: string;
  kind: RunKind;
  trigger: DrillTrigger | null;
  source_region: string;
  target_region: string;
  requested_by_email: string | null;
  requested_at: string;
  approved_by_email: string | null;
  approved_at: string | null;
  aborted_at: string | null;
  reset_at: string | null;
  outcome: RunOutcome;
  recovery_seconds: number | null;
  rto_target_seconds: number;
  /** Replication captured at launch (null: none within 5 min, so RPO not measured). */
  rpo_met: boolean | null;
  rpo_seconds: number | string | null;
  rpo_target_seconds: number | null;
  replication_source: 'aws-drs' | 'fixture' | null;
}

export interface RunbookRow {
  version: number;
  steps: RunbookStep[];
  updated_by: string | null;
  updated_at: string;
}

export interface ChecklistRow {
  run_id: string;
  version: number;
  open: boolean;
  steps: Array<
    RunbookStep & {
      done: boolean;
      checked_by: string | null;
      checked_at: string | null;
      note: string | null;
    }
  >;
}

export interface ScheduleRow {
  cadence: DrillCadence;
  next_run_at: string;
  last_run_at: string | null;
  source_region: string;
  target_region: string;
  enabled: boolean;
}

export interface AlertChannelRow {
  id: string;
  kind: AlertChannelKind;
  name: string;
  hint: string;
  events: AlertEvent[];
  created_by_email: string | null;
  created_at: string;
}

export interface AlertDeliveryRow {
  id: number;
  channel_name: string;
  kind: AlertChannelKind;
  event: string;
  title: string;
  status: 'queued' | 'sent' | 'failed';
  http_status: number | null;
  error: string | null;
  created_at: string;
}

export interface ReplicationServerRow {
  id: string;
  hostname: string;
  state: string;
  health: ServerHealth;
  lag_seconds: number | null;
  lag_raw: string | null;
  backlog_bytes: number;
  total_bytes: number;
  replicated_bytes: number;
  eta_at: string | null;
  last_seen_at: string | null;
  error: string | null;
  last_launch_result: string | null;
}

export interface ReplicationSnapshotRow {
  source: 'aws-drs' | 'fixture';
  collected_at: string;
  received_at: string;
  server_now: string;
  aws_account_id: string | null;
  aws_region: string;
  collector_version: string | null;
  server_count: number;
  healthy_count: number;
  problem_count: number;
  max_lag_seconds: number | null;
  backlog_bytes: number;
  rpo_target_seconds: number;
  rpo_met: boolean | null;
  servers: ReplicationServerRow[];
}

export interface LagHistoryRow {
  collected_at: string;
  /** Postgres numeric: may arrive as a string. */
  max_lag_seconds: number | string | null;
  rpo_met: boolean | null;
}

export interface IngestTokenRow {
  hint: string;
  created_at: string;
  last_used_at: string | null;
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
  getAuditPage(orgId: string, limit: number, before?: number): Promise<AuditPageRow[]>;
  verifyAuditChain(orgId: string): Promise<ChainReportRow>;
  listMembers(orgId: string): Promise<MemberRow[]>;
  listInvites(orgId: string): Promise<InviteRow[]>;
  inviteMember(orgId: string, email: string, role: MemberRole): Promise<void>;
  revokeInvite(inviteId: string): Promise<void>;
  setMemberRole(orgId: string, userId: string, role: MemberRole): Promise<void>;
  removeMember(orgId: string, userId: string): Promise<void>;
  getObjectives(orgId: string): Promise<{ rto_target_seconds: number; rpo_target_seconds: number }>;
  setObjectives(orgId: string, rtoSeconds: number, rpoSeconds: number): Promise<void>;
  listRuns(orgId: string): Promise<RunRow[]>;
  drillEvidence(runId: string): Promise<DrillEvidence>;
  getDrillSchedule(orgId: string): Promise<ScheduleRow | null>;
  setDrillSchedule(
    orgId: string,
    cadence: DrillCadence,
    firstRunAt: string,
    source: string,
    target: string,
  ): Promise<string>;
  disableDrillSchedule(orgId: string): Promise<void>;
  startDrill(orgId: string, source: string, target: string): Promise<string>;
  listAlertChannels(orgId: string): Promise<AlertChannelRow[]>;
  listAlertDeliveries(orgId: string): Promise<AlertDeliveryRow[]>;
  addAlertChannel(
    orgId: string,
    kind: AlertChannelKind,
    name: string,
    secret: string,
    events: AlertEvent[],
  ): Promise<string>;
  removeAlertChannel(channelId: string): Promise<void>;
  sendTestAlert(channelId: string): Promise<void>;
  latestReplication(orgId: string): Promise<ReplicationSnapshotRow | null>;
  replicationHistory(orgId: string): Promise<LagHistoryRow[]>;
  ingestTokenStatus(orgId: string): Promise<IngestTokenRow | null>;
  createIngestToken(orgId: string): Promise<string>;
  revokeIngestToken(orgId: string): Promise<void>;
  getRunbook(orgId: string): Promise<RunbookRow | null>;
  setRunbook(orgId: string, steps: RunbookStepDraft[]): Promise<number>;
  runChecklist(runId: string): Promise<ChecklistRow | null>;
  checkRunbookStep(runId: string, stepId: string, note: string | null): Promise<void>;
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
    getAuditPage: (orgId, limit, before) =>
      call<AuditPageRow[]>(
        client.rpc('audit_log_page', { p_org: orgId, p_limit: limit, p_before: before ?? null }),
      ),
    verifyAuditChain: (orgId) =>
      call<ChainReportRow>(client.rpc('verify_audit_chain_report', { p_org: orgId })),
    listMembers: (orgId) => call<MemberRow[]>(client.rpc('list_org_members', { p_org: orgId })),
    listInvites: (orgId) => call<InviteRow[]>(client.rpc('list_org_invites', { p_org: orgId })),
    inviteMember: async (orgId, email, role) => {
      await call<string>(
        client.rpc('invite_member', { p_org: orgId, p_email: email, p_role: role }),
      );
    },
    revokeInvite: (inviteId) => call<void>(client.rpc('revoke_invite', { p_invite: inviteId })),
    setMemberRole: (orgId, userId, role) =>
      call<void>(client.rpc('set_member_role', { p_org: orgId, p_user: userId, p_role: role })),
    removeMember: (orgId, userId) =>
      call<void>(client.rpc('remove_member', { p_org: orgId, p_user: userId })),
    getObjectives: (orgId) =>
      call<{ rto_target_seconds: number; rpo_target_seconds: number }>(
        client
          .from('orgs')
          .select('rto_target_seconds, rpo_target_seconds')
          .eq('id', orgId)
          .single(),
      ),
    setObjectives: (orgId, rto, rpo) =>
      call<void>(client.rpc('set_recovery_objectives', { p_org: orgId, p_rto: rto, p_rpo: rpo })),
    listRuns: (orgId) =>
      call<RunRow[]>(client.rpc('list_failover_runs', { p_org: orgId, p_limit: 50 })),
    drillEvidence: (runId) => call<DrillEvidence>(client.rpc('drill_evidence', { p_run: runId })),
    getDrillSchedule: (orgId) =>
      call<ScheduleRow | null>(
        client
          .from('drill_schedules')
          .select('cadence, next_run_at, last_run_at, source_region, target_region, enabled')
          .eq('org_id', orgId)
          .maybeSingle(),
      ),
    setDrillSchedule: (orgId, cadence, firstRunAt, source, target) =>
      call<string>(
        client.rpc('set_drill_schedule', {
          p_org: orgId,
          p_cadence: cadence,
          p_first_run: firstRunAt,
          p_source: source,
          p_target: target,
        }),
      ),
    disableDrillSchedule: (orgId) =>
      call<void>(client.rpc('disable_drill_schedule', { p_org: orgId })),
    startDrill: (orgId, source, target) =>
      call<string>(client.rpc('start_drill', { p_org: orgId, p_source: source, p_target: target })),
    listAlertChannels: (orgId) =>
      call<AlertChannelRow[]>(client.rpc('list_alert_channels', { p_org: orgId })),
    listAlertDeliveries: (orgId) =>
      call<AlertDeliveryRow[]>(client.rpc('list_alert_deliveries', { p_org: orgId, p_limit: 30 })),
    addAlertChannel: (orgId, kind, name, secret, events) =>
      call<string>(
        client.rpc('add_alert_channel', {
          p_org: orgId,
          p_kind: kind,
          p_name: name,
          p_secret: secret,
          p_events: events,
        }),
      ),
    removeAlertChannel: (channelId) =>
      call<void>(client.rpc('remove_alert_channel', { p_channel: channelId })),
    sendTestAlert: (channelId) =>
      call<void>(client.rpc('send_test_alert', { p_channel: channelId })),
    latestReplication: (orgId) =>
      call<ReplicationSnapshotRow | null>(
        client.rpc('latest_replication_snapshot', { p_org: orgId }),
      ),
    replicationHistory: (orgId) =>
      call<LagHistoryRow[]>(client.rpc('replication_lag_history', { p_org: orgId, p_limit: 60 })),
    ingestTokenStatus: (orgId) =>
      call<IngestTokenRow | null>(client.rpc('ingest_token_status', { p_org: orgId })),
    createIngestToken: (orgId) => call<string>(client.rpc('create_ingest_token', { p_org: orgId })),
    revokeIngestToken: (orgId) => call<void>(client.rpc('revoke_ingest_token', { p_org: orgId })),
    getRunbook: (orgId) => call<RunbookRow | null>(client.rpc('get_runbook', { p_org: orgId })),
    setRunbook: (orgId, steps) =>
      call<number>(client.rpc('set_runbook', { p_org: orgId, p_steps: steps })),
    runChecklist: (runId) =>
      call<ChecklistRow | null>(client.rpc('run_checklist', { p_run: runId })),
    checkRunbookStep: (runId, stepId, note) =>
      call<void>(client.rpc('check_runbook_step', { p_run: runId, p_step: stepId, p_note: note })),
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
          { event: '*', schema: 'public', table: 'drill_schedules', filter },
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

/** Joins every organization that invited the signed-in user's verified email. */
export async function acceptPendingInvites(client: SupabaseClient) {
  return call<number>(client.rpc('accept_pending_invites'));
}
