import { describe, expect, test } from 'vitest';
import { ALLOWED_TRANSITIONS, SystemState, canTransition, isAbortable } from './dr';

describe('failover state machine rules', () => {
  test('every state has a transition entry', () => {
    for (const state of Object.values(SystemState)) {
      expect(ALLOWED_TRANSITIONS[state]).toBeDefined();
    }
  });

  test('happy path is allowed in order', () => {
    expect(canTransition(SystemState.IDLE, SystemState.REPLICATING)).toBe(true);
    expect(canTransition(SystemState.REPLICATING, SystemState.FAILOVER_TRIGGERED)).toBe(true);
    expect(canTransition(SystemState.FAILOVER_TRIGGERED, SystemState.REROUTING_TRAFFIC)).toBe(true);
    expect(canTransition(SystemState.REROUTING_TRAFFIC, SystemState.SECURED)).toBe(true);
    expect(canTransition(SystemState.SECURED, SystemState.IDLE)).toBe(true);
  });

  test('skipping stages is not allowed', () => {
    expect(canTransition(SystemState.IDLE, SystemState.SECURED)).toBe(false);
    expect(canTransition(SystemState.REPLICATING, SystemState.SECURED)).toBe(false);
  });

  test('abort is only possible before traffic cutover', () => {
    expect(isAbortable(SystemState.REPLICATING)).toBe(true);
    expect(isAbortable(SystemState.FAILOVER_TRIGGERED)).toBe(true);
    expect(isAbortable(SystemState.REROUTING_TRAFFIC)).toBe(false);
    expect(isAbortable(SystemState.SECURED)).toBe(false);
  });
});
