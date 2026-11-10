import type { IngestTarget } from '../src/integrations/awsDrs/collect';

/** Reads the push target from the environment; never logs the token. */
export function ingestTargetFromEnv(env: NodeJS.ProcessEnv = process.env): IngestTarget {
  const url = env.AETHERVAULT_URL;
  const anonKey = env.AETHERVAULT_ANON_KEY;
  const token = env.AETHERVAULT_INGEST_TOKEN;
  const missing = [
    !url && 'AETHERVAULT_URL',
    !anonKey && 'AETHERVAULT_ANON_KEY',
    !token && 'AETHERVAULT_INGEST_TOKEN',
  ].filter(Boolean);
  if (missing.length) throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  if (!/^avi_[0-9a-f]{48}$/.test(token!)) {
    throw new Error('AETHERVAULT_INGEST_TOKEN does not look like an ingest token (avi_...)');
  }
  return { url: url!, anonKey: anonKey!, token: token! };
}

export function regionFromEnv(env: NodeJS.ProcessEnv = process.env): string {
  const region = env.DRS_REGION || env.AWS_REGION || env.AWS_DEFAULT_REGION;
  if (!region) throw new Error('Set DRS_REGION (or AWS_REGION) to the region DRS replicates into');
  return region;
}
