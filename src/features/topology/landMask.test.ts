import { describe, expect, test } from 'vitest';
import { isLand } from './landMask';

describe('land mask (Natural Earth 1:110m, 1° cells)', () => {
  test.each([
    ['Kansas', 38.5, -98.0],
    ['Sahara', 23.0, 13.0],
    ['Central Australia', -25.0, 134.0],
    ['Siberia', 62.0, 100.0],
    ['Amazon', -5.0, -60.0],
    ['every AetherVault region city: Ashburn, VA', 39.04, -77.49],
    ['Council Bluffs, IA', 41.26, -95.86],
    ['Boardman, OR', 45.84, -119.7],
    ['Boydton, VA', 36.67, -78.39],
  ])('%s is land', (_name, lat, lon) => {
    expect(isLand(lat, lon)).toBe(true);
  });

  test.each([
    ['mid-Pacific', 0.0, -150.0],
    ['mid-Atlantic', 30.0, -40.0],
    ['Indian Ocean', -30.0, 80.0],
    ['Gulf of Mexico', 25.0, -90.0],
  ])('%s is water', (_name, lat, lon) => {
    expect(isLand(lat, lon)).toBe(false);
  });

  test('wraps longitude and clamps latitude', () => {
    expect(isLand(38.5, -98.0 + 360)).toBe(true);
    expect(() => isLand(95, 0)).not.toThrow();
    expect(() => isLand(-95, 0)).not.toThrow();
  });
});
