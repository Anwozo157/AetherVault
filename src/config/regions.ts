// Failover regions offered in the UI. Single source of truth for the target
// selector, the 3D globe, and any provider that needs region metadata.
//
// Coordinates are the approximate public locations of each cloud region's data
// centers (city level), used only to place markers on the globe.

export interface GeoPoint {
  /** Degrees north (negative = south). */
  lat: number;
  /** Degrees east (negative = west). */
  lon: number;
}

export interface Region extends GeoPoint {
  id: string;
  label: string;
  /** Short city/state shown on the globe. */
  city: string;
  cloud: 'AWS' | 'GCP' | 'Azure';
}

export const SOURCE_REGION = 'us-east-1';

export const SOURCE: Region = {
  id: SOURCE_REGION,
  label: 'AWS us-east-1 (N. Virginia)',
  city: 'Ashburn, VA',
  cloud: 'AWS',
  lat: 39.04,
  lon: -77.49,
};

export type TargetRegion = Region;

export const TARGET_REGIONS: readonly TargetRegion[] = [
  {
    id: 'gcp-us-central1',
    label: 'GCP us-central1 (Iowa)',
    city: 'Council Bluffs, IA',
    cloud: 'GCP',
    lat: 41.26,
    lon: -95.86,
  },
  {
    id: 'aws-us-west-2',
    label: 'AWS us-west-2 (Oregon)',
    city: 'Boardman, OR',
    cloud: 'AWS',
    lat: 45.84,
    lon: -119.7,
  },
  {
    id: 'azure-eastus2',
    label: 'Azure East US 2 (Virginia)',
    city: 'Boydton, VA',
    cloud: 'Azure',
    lat: 36.67,
    lon: -78.39,
  },
];

export const DEFAULT_TARGET_REGION = TARGET_REGIONS[0].id;

export function findTargetRegion(id: string): TargetRegion {
  return TARGET_REGIONS.find((r) => r.id === id) ?? TARGET_REGIONS[0];
}
