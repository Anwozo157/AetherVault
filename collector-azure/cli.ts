// Azure Site Recovery collector, command line (same flags as the AWS collector).
//   npm run collector:azure -- --fixture healthy --dry-run   print a snapshot from recorded data
//   npm run collector:azure -- --dry-run                     read the real vault (az login)
//   npm run collector:azure -- --record DIR --dry-run        save raw responses (private folder!)
//   npm run collector:azure -- --watch                       push every 60 s until stopped
// Env: AZURE_VAULT_ID, AZURE_VAULT_REGION; for pushing also AETHERVAULT_URL,
// AETHERVAULT_ANON_KEY, AETHERVAULT_INGEST_TOKEN (never logged).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { pushRecoveryJobs, pushSnapshot } from '../src/integrations/awsDrs/collect';
import {
  collectRecoveryJobs,
  collectSnapshot,
  recordedApi,
  type AsrReadApi,
} from '../src/integrations/azureAsr/collect';
import critical from '../src/integrations/azureAsr/fixtures/protected-items.critical.json';
import healthy from '../src/integrations/azureAsr/fixtures/protected-items.recorded-healthy.json';
import jobs from '../src/integrations/azureAsr/fixtures/replication-jobs.recorded.json';
import type { AsrPage } from '../src/integrations/azureAsr/snapshot';
import { ingestTargetFromEnv } from '../collector/env';
import { armApi, vaultFromEnv } from './arm';

const FIXTURES: Record<string, AsrPage<unknown>> = { healthy, critical };
const FIXTURE_VAULT =
  '/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-aethervault-poc-target/providers/Microsoft.RecoveryServices/vaults/rsv-aethervault-poc';

function fixtureApi(name: string): AsrReadApi {
  const fabric = `${FIXTURE_VAULT}/replicationFabrics/fabric-primary`;
  const container = `${fabric}/replicationProtectionContainers/container-primary`;
  return recordedApi({
    [`${FIXTURE_VAULT}/replicationFabrics`]: { value: [{ id: fabric }] },
    [`${fabric}/replicationProtectionContainers`]: { value: [{ id: container }] },
    [`${container}/replicationProtectedItems`]: FIXTURES[name],
    [`${FIXTURE_VAULT}/replicationJobs`]: jobs as AsrPage<unknown>,
  });
}

async function main() {
  const { values } = parseArgs({
    options: {
      fixture: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      record: { type: 'string' },
      watch: { type: 'boolean', default: false },
    },
  });
  const fixture = values.fixture;
  if (fixture && !(fixture in FIXTURES)) {
    throw new Error(`--fixture must be one of: ${Object.keys(FIXTURES).join(', ')}`);
  }
  if (fixture && values.record) throw new Error('--record needs a real vault, not --fixture');
  const { vaultId, region } = fixture
    ? { vaultId: FIXTURE_VAULT, region: 'westus2' }
    : vaultFromEnv();
  const recorded: Array<{ path: string; page: unknown }> = [];
  const api = fixture
    ? fixtureApi(fixture)
    : armApi({ onPage: (path, page) => recorded.push({ path, page }) });

  const once = async () => {
    recorded.length = 0;
    const snapshot = await collectSnapshot(api, {
      vaultId,
      region,
      source: fixture ? 'fixture' : 'azure-asr',
    });
    const recoveryJobs = await collectRecoveryJobs(api, vaultId);
    if (values.record) {
      mkdirSync(values.record, { recursive: true, mode: 0o700 });
      const file = join(
        values.record,
        `azure-asr-${new Date().toISOString().replace(/[:.]/g, '')}.json`,
      );
      writeFileSync(file, JSON.stringify(recorded, null, 2) + '\n', { mode: 0o600 });
      console.error(
        `Saved ${recorded.length} page(s) to ${file}. Raw: holds IDs; keep it private, redact before a fixture.`,
      );
    }
    if (values['dry-run']) {
      console.log(JSON.stringify({ ...snapshot, recovery_jobs: recoveryJobs }, null, 2));
      return;
    }
    const target = ingestTargetFromEnv();
    const result = await pushSnapshot(target, snapshot);
    console.log(
      `${new Date().toISOString()} pushed ${snapshot.servers.length} server(s) [${snapshot.source}]: ${JSON.stringify(result)}`,
    );
    if (!fixture) {
      const r = await pushRecoveryJobs(target, region, recoveryJobs, fetch, 'azure-asr');
      console.log(
        `${new Date().toISOString()} pushed ${recoveryJobs.length} recovery job(s): ${JSON.stringify(r)}`,
      );
    }
  };

  await once();
  if (values.watch)
    setInterval(() => void once().catch((e: unknown) => console.error(String(e))), 60_000);
}

main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
