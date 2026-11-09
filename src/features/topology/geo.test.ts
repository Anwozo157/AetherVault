import { describe, expect, test } from 'vitest';
import { SOURCE, TARGET_REGIONS, findTargetRegion } from '../../config/regions';
import { FACING_LON, angleBetween, arcPoints, fibonacciLatLon, latLonToVec3, length } from './geo';

const R = 2;

describe('latLonToVec3', () => {
  test('places points on the sphere surface', () => {
    for (const r of [SOURCE, ...TARGET_REGIONS]) {
      expect(length(latLonToVec3(r, R))).toBeCloseTo(R, 10);
    }
  });

  test('north pole is +Y; the facing meridian at the equator points at the camera (+Z)', () => {
    const [x, y, z] = latLonToVec3({ lat: 90, lon: 0 }, 1);
    expect([x, y, z].map((n) => +n.toFixed(6) + 0)).toEqual([0, 1, 0]);
    expect(latLonToVec3({ lat: 0, lon: FACING_LON }, 1).map((n) => +n.toFixed(6) + 0)).toEqual([
      0, 0, 1,
    ]);
  });

  test('every region is on the camera-facing hemisphere (all are in the continental US)', () => {
    for (const r of [SOURCE, ...TARGET_REGIONS]) {
      expect(latLonToVec3(r, R)[2]).toBeGreaterThan(0);
    }
  });

  test('west is to the left: Oregon has a smaller x than Virginia', () => {
    const oregon = latLonToVec3(findTargetRegion('aws-us-west-2'), R);
    const virginia = latLonToVec3(SOURCE, R);
    expect(oregon[0]).toBeLessThan(virginia[0]);
  });
});

describe('arcPoints', () => {
  test.each(TARGET_REGIONS.map((r) => [r.id, r] as const))(
    'us-east-1 → %s stays above the surface the whole way',
    (_id, target) => {
      const points = arcPoints(SOURCE, target, R);
      // Endpoints sit on the markers; every interior point is lifted clear of the globe.
      expect(length(points[0])).toBeCloseTo(R, 6);
      expect(length(points[points.length - 1])).toBeCloseTo(R, 6);
      for (const p of points.slice(1, -1)) expect(length(p)).toBeGreaterThan(R);
    },
  );

  test('longer routes arc higher (Oregon above Iowa)', () => {
    const peak = (id: string) =>
      Math.max(...arcPoints(SOURCE, findTargetRegion(id), R).map(length));
    expect(peak('aws-us-west-2')).toBeGreaterThan(peak('gcp-us-central1'));
  });

  test('neighboring regions (~270 km apart) still get a visible arc', () => {
    const points = arcPoints(SOURCE, findTargetRegion('azure-eastus2'), R);
    expect(Math.max(...points.map(length)) - R).toBeGreaterThanOrEqual(0.12 - 1e-9);
  });

  test('distances are geographically sensible', () => {
    const km = (id: string) => angleBetween(SOURCE, findTargetRegion(id)) * 6371;
    expect(km('azure-eastus2')).toBeGreaterThan(200);
    expect(km('azure-eastus2')).toBeLessThan(400);
    expect(km('gcp-us-central1')).toBeGreaterThan(1400);
    expect(km('gcp-us-central1')).toBeLessThan(1700);
    expect(km('aws-us-west-2')).toBeGreaterThan(3500);
    expect(km('aws-us-west-2')).toBeLessThan(3900);
  });

  test('identical endpoints do not divide by zero', () => {
    const points = arcPoints(SOURCE, SOURCE, R, 8);
    expect(points.every((p) => p.every(Number.isFinite))).toBe(true);
  });
});

describe('fibonacciLatLon', () => {
  test('returns valid, well-spread coordinates', () => {
    const pts = fibonacciLatLon(2000);
    expect(pts).toHaveLength(2000);
    expect(pts.every((p) => p.lat >= -90 && p.lat <= 90 && p.lon >= -180 && p.lon < 180)).toBe(
      true,
    );
    const north = pts.filter((p) => p.lat > 0).length;
    expect(Math.abs(north - 1000)).toBeLessThan(20);
  });
});

describe('findTargetRegion', () => {
  test('falls back to the default for an unknown id', () => {
    expect(findTargetRegion('nope').id).toBe(TARGET_REGIONS[0].id);
  });
});
