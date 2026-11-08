// Failover regions offered in the UI. Single source of truth for the target
// selector, the 3D globe, and any provider that needs region metadata.

export const SOURCE_REGION = 'us-east-1';

export interface TargetRegion {
  id: string;
  label: string;
  cloud: 'AWS' | 'GCP' | 'Azure';
}

export const TARGET_REGIONS: readonly TargetRegion[] = [
  { id: 'gcp-us-central1', label: 'GCP us-central1 (Iowa)', cloud: 'GCP' },
  { id: 'aws-us-west-2', label: 'AWS us-west-2 (Oregon)', cloud: 'AWS' },
  { id: 'azure-eastus2', label: 'Azure East US 2 (Virginia)', cloud: 'Azure' },
];

export const DEFAULT_TARGET_REGION = TARGET_REGIONS[0].id;
