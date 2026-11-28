// Azure Functions entry (Node v4 model, Flex Consumption): runs every minute in the customer's
// subscription. Its managed identity holds only "Site Recovery Reader" on one vault, so it can
// read replication status and jobs and nothing else. Mirrors collector/lambda.ts.
import { app } from '@azure/functions';
import { pushRecoveryJobs, pushSnapshot } from '../src/integrations/awsDrs/collect';
import { collectRecoveryJobs, collectSnapshot } from '../src/integrations/azureAsr/collect';
import { ingestTargetFromEnv } from '../collector/env';
import { armApi, vaultFromEnv } from './arm';

export async function collect() {
  const { vaultId, region } = vaultFromEnv();
  const target = ingestTargetFromEnv();
  const api = armApi();
  const snapshot = await collectSnapshot(api, { vaultId, region });
  const result = await pushSnapshot(target, snapshot);
  // Jobs are reported separately; a failure there never blocks replication status.
  let recoveries: unknown = null;
  try {
    recoveries = await pushRecoveryJobs(
      target,
      region,
      await collectRecoveryJobs(api, vaultId),
      fetch,
      'azure-asr',
    );
  } catch (e) {
    recoveries = { error: e instanceof Error ? e.message : String(e) };
  }
  const summary = {
    servers: snapshot.servers.length,
    states: snapshot.servers.reduce<Record<string, number>>((acc, s) => {
      acc[s.state] = (acc[s.state] ?? 0) + 1;
      return acc;
    }, {}),
    maxLagSeconds: Math.max(0, ...snapshot.servers.map((s) => s.lag_seconds ?? 0)),
    result,
    recoveries,
  };
  console.log(JSON.stringify(summary));
  return summary;
}

app.timer('collect', {
  schedule: '0 * * * * *',
  runOnStartup: false,
  handler: async () => void (await collect()),
});
