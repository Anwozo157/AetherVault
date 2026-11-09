// Pure globe geometry (no three.js), so it can be unit-tested in jsdom.
// Axes: +Y is north. Longitude FACING_LON maps to +Z, which faces the default camera,
// so North America is in view at rest; east is +X (to the right on screen).

import type { GeoPoint } from '../../config/regions';

export type Vec3 = [number, number, number];

const DEG = Math.PI / 180;

/** Longitude that faces the camera at rest (central North America). */
export const FACING_LON = -92;
/** Latitude tilt so the continental US sits near the center of the view. */
export const FACING_LAT = 38;

/** Lat/lon (degrees) to a point on a sphere of `radius`. */
export function latLonToVec3({ lat, lon }: GeoPoint, radius: number): Vec3 {
  const phi = lat * DEG;
  const theta = (lon - FACING_LON) * DEG;
  return [
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta),
  ];
}

export const length = (v: Vec3) => Math.hypot(v[0], v[1], v[2]);

const normalize = (v: Vec3): Vec3 => {
  const l = length(v);
  return [v[0] / l, v[1] / l, v[2] / l];
};

/** Central angle between two surface points, in radians. */
export function angleBetween(a: GeoPoint, b: GeoPoint): number {
  const va = latLonToVec3(a, 1);
  const vb = latLonToVec3(b, 1);
  const dot = va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2];
  return Math.acos(Math.min(1, Math.max(-1, dot)));
}

/**
 * Great-circle arc from `a` to `b`, lifted above the surface. Height grows with
 * distance but never drops below `minLift`, so even neighboring regions (us-east-1
 * and Azure East US 2 are ~270 km apart) get a visible arc, and wide arcs never
 * cut through the globe (the earlier bezier did for us-west-2).
 */
export function arcPoints(
  a: GeoPoint,
  b: GeoPoint,
  radius: number,
  segments = 64,
  minLift = 0.12,
): Vec3[] {
  const ua = normalize(latLonToVec3(a, 1));
  const ub = normalize(latLonToVec3(b, 1));
  const omega = angleBetween(a, b);
  const lift = Math.max(minLift, omega * 0.55);
  const points: Vec3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Spherical linear interpolation of the direction.
    let dir: Vec3;
    if (omega < 1e-6) {
      dir = ua;
    } else {
      const s = Math.sin(omega);
      const wa = Math.sin((1 - t) * omega) / s;
      const wb = Math.sin(t * omega) / s;
      dir = normalize([ua[0] * wa + ub[0] * wb, ua[1] * wa + ub[1] * wb, ua[2] * wa + ub[2] * wb]);
    }
    const r = radius + lift * Math.sin(Math.PI * t);
    points.push([dir[0] * r, dir[1] * r, dir[2] * r]);
  }
  return points;
}

/**
 * Evenly spread points on a sphere (Fibonacci lattice), returned as lat/lon.
 * Used to draw continents as a dot matrix.
 */
export function fibonacciLatLon(count: number): GeoPoint[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const out: GeoPoint[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const theta = golden * i;
    const lat = Math.asin(y) / DEG;
    let lon = ((theta / DEG) % 360) - 180;
    if (lon < -180) lon += 360;
    out.push({ lat, lon });
  }
  return out;
}
