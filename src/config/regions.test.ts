import { describe, expect, test } from 'vitest';
import { CONNECTED_TARGET_REGIONS, TARGET_REGIONS, targetRegionsFor } from './regions';

describe('target regions', () => {
  test('the real console offers only connected (AWS) regions', () => {
    expect(CONNECTED_TARGET_REGIONS.map((r) => r.id)).toEqual(['aws-us-west-2']);
    expect(targetRegionsFor(false)).toBe(CONNECTED_TARGET_REGIONS);
  });

  test('the simulated demo keeps every region', () => {
    expect(targetRegionsFor(true)).toBe(TARGET_REGIONS);
    expect(TARGET_REGIONS.map((r) => r.cloud)).toEqual(['GCP', 'AWS', 'Azure']);
  });
});
