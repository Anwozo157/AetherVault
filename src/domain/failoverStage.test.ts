import { describe, expect, test } from 'vitest';
import { SystemState } from './dr';
import { stageAfterApproval, stateFromServerStage } from './failoverStage';

describe('stageAfterApproval (mirrors SQL run_stage)', () => {
  test.each([
    [0, SystemState.REPLICATING],
    [1199, SystemState.REPLICATING],
    [1200, SystemState.FAILOVER_TRIGGERED],
    [3499, SystemState.FAILOVER_TRIGGERED],
    [3500, SystemState.REROUTING_TRAFFIC],
    [5499, SystemState.REROUTING_TRAFFIC],
    [5500, SystemState.SECURED],
    [60_000, SystemState.SECURED],
  ])('%i ms after approval -> %s', (ms, expected) => {
    expect(stageAfterApproval(ms)).toBe(expected);
  });
});

describe('stateFromServerStage', () => {
  test.each([
    ['PENDING_APPROVAL', SystemState.IDLE],
    ['ACTIVE_SYNC', SystemState.IDLE],
    ['QUIESCE_AND_SNAPSHOT', SystemState.REPLICATING],
    ['HYDRATING_TARGET', SystemState.FAILOVER_TRIGGERED],
    ['DNS_CUTOVER', SystemState.REROUTING_TRAFFIC],
    ['TARGET_SECURED', SystemState.SECURED],
  ])('%s -> %s', (stage, expected) => {
    expect(stateFromServerStage(stage)).toBe(expected);
  });
});
