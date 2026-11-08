// Failover stage derived from the approval timestamp (ADR 0003).
// MUST match public.run_stage() in supabase/migrations/20261108000001_core_schema.sql
// and the MockDrProvider timings: snapshot 0–1.2s, hydrate 1.2–3.5s, DNS cutover 3.5–5.5s.

import { SystemState } from './dr';

/** Milliseconds after approval at which each stage ends. */
export const STAGE_ENDS_MS = {
  [SystemState.REPLICATING]: 1200,
  [SystemState.FAILOVER_TRIGGERED]: 3500,
  [SystemState.REROUTING_TRAFFIC]: 5500,
} as const;

/** Stage of an approved run `elapsedMs` after approval. */
export function stageAfterApproval(elapsedMs: number): SystemState {
  if (elapsedMs < STAGE_ENDS_MS[SystemState.REPLICATING]) return SystemState.REPLICATING;
  if (elapsedMs < STAGE_ENDS_MS[SystemState.FAILOVER_TRIGGERED])
    return SystemState.FAILOVER_TRIGGERED;
  if (elapsedMs < STAGE_ENDS_MS[SystemState.REROUTING_TRAFFIC])
    return SystemState.REROUTING_TRAFFIC;
  return SystemState.SECURED;
}

/** Server stage names (run_stage) mapped to UI states. PENDING_APPROVAL shows as IDLE. */
export function stateFromServerStage(stage: string): SystemState {
  switch (stage) {
    case 'QUIESCE_AND_SNAPSHOT':
      return SystemState.REPLICATING;
    case 'HYDRATING_TARGET':
      return SystemState.FAILOVER_TRIGGERED;
    case 'DNS_CUTOVER':
      return SystemState.REROUTING_TRAFFIC;
    case 'TARGET_SECURED':
      return SystemState.SECURED;
    default:
      return SystemState.IDLE;
  }
}
