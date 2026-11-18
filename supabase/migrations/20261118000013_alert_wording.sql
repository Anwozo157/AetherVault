-- AetherVault: clearer replication at-risk alert.
--
-- Found in the live alert test (2026-11-18): when the server is still connected but falling
-- behind, the alert read "Data-loss target at risk: 0 of 1 servers not replicating normally;
-- worst lag 101 s", which sounds like nothing is wrong. Now:
--   * a server problem (stalled, stopped, syncing): "N of M servers not replicating normally; ..."
--   * only lag over target: "replication is X s behind (target Y s); no server reports an error,
--     it is falling behind."
-- Only the replication.rpo_breached title changes; everything else is as in 20261110000009.

create or replace function public.alert_for(p_action text, p_detail jsonb, p_actor text)
returns jsonb
language plpgsql
immutable
set search_path = ''
as $$
declare
  v_run text := p_detail->>'run_id';
  v_result text := p_detail->>'result';
  v_sample text := case when p_detail->>'source' = 'fixture' then ' [SAMPLE DATA]' else '' end;
begin
  return case
    when p_action = 'failover.requested' then jsonb_build_object(
      'category', 'failover', 'severity', 'warning', 'pd_action', 'trigger', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover requested by %s: %s → %s. Needs a second approver.',
                      p_actor, p_detail->>'source', p_detail->>'target'))
    when p_action = 'failover.approved' then jsonb_build_object(
      'category', 'failover', 'severity', 'critical', 'pd_action', 'trigger', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover approved by %s. Executing now.', p_actor))
    when p_action = 'failover.aborted' and p_detail->>'stage' = 'PENDING_APPROVAL' then jsonb_build_object(
      'category', 'failover', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover request withdrawn by %s.', p_actor))
    when p_action = 'failover.aborted' then jsonb_build_object(
      'category', 'failover', 'severity', 'warning', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover aborted by %s at %s.', p_actor, lower(replace(p_detail->>'stage', '_', ' '))))
    when p_action = 'failover.reset' then jsonb_build_object(
      'category', 'failover', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'failover-' || v_run,
      'title', format('Failover reset by %s. Primary region active.', p_actor))
    when p_action = 'drill.completed' and v_result = 'failed' then jsonb_build_object(
      'category', 'drill_failed', 'severity', 'error', 'pd_action', 'trigger', 'dedup_key', 'drill-' || v_run,
      'title', format('Drill FAILED: recovery took %s s (simulated), target %s s.%s',
                      p_detail->>'recovery_seconds', p_detail->>'rto_target_seconds',
                      public.drill_rpo_note(p_detail)))
    when p_action = 'drill.completed' and v_result = 'aborted' then jsonb_build_object(
      'category', 'drill_failed', 'severity', 'warning', 'pd_action', null, 'dedup_key', 'drill-' || v_run,
      'title', 'Drill aborted before completion.')
    when p_action = 'drill.completed' and v_result = 'passed' then jsonb_build_object(
      'category', 'drill_passed', 'severity', 'info', 'pd_action', null, 'dedup_key', 'drill-' || v_run,
      'title', format('Drill passed: recovered in %s s (simulated), target %s s.%s',
                      p_detail->>'recovery_seconds', p_detail->>'rto_target_seconds',
                      public.drill_rpo_note(p_detail)))
    when p_action = 'replication.rpo_breached' then jsonb_build_object(
      'category', 'replication', 'severity', 'error', 'pd_action', 'trigger', 'dedup_key', 'replication-rpo',
      'title', case
        when coalesce((p_detail->>'problem_count')::int, 0) > 0 then
          format('Data-loss target at risk%s: %s of %s servers not replicating normally; worst lag %s s (target %s s).',
                 v_sample, p_detail->>'problem_count', p_detail->>'server_count',
                 coalesce(p_detail->>'max_lag_seconds', 'unknown'), p_detail->>'rpo_target_seconds')
        else
          format('Data-loss target at risk%s: replication is %s s behind (target %s s). No server reports an error; it is falling behind.',
                 v_sample, coalesce(p_detail->>'max_lag_seconds', 'unknown'), p_detail->>'rpo_target_seconds')
      end)
    when p_action = 'replication.rpo_recovered' then jsonb_build_object(
      'category', 'replication', 'severity', 'info', 'pd_action', 'resolve', 'dedup_key', 'replication-rpo',
      'title', format('Replication back within the data-loss target%s: worst lag %s s (target %s s).',
                      v_sample, p_detail->>'max_lag_seconds', p_detail->>'rpo_target_seconds'))
  end;
end
$$;

