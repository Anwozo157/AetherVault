// AWS Lambda entry: runs in the customer's account every minute (EventBridge schedule).
// Permissions: AWSElasticDisasterRecoveryReadOnlyAccess + basic Lambda logging. Nothing else.
import { collectSnapshot, pushSnapshot } from '../src/integrations/awsDrs/collect';
import { ingestTargetFromEnv, regionFromEnv } from './env';
import { sdkApi } from './sdkApi';

export async function handler() {
  const region = regionFromEnv();
  const target = ingestTargetFromEnv();
  const snapshot = await collectSnapshot(sdkApi(region), { region });
  const result = await pushSnapshot(target, snapshot);
  const summary = {
    servers: snapshot.servers.length,
    states: snapshot.servers.reduce<Record<string, number>>((acc, s) => {
      acc[s.state] = (acc[s.state] ?? 0) + 1;
      return acc;
    }, {}),
    maxLagSeconds: Math.max(0, ...snapshot.servers.map((s) => s.lag_seconds ?? 0)),
    result,
  };
  console.log(JSON.stringify(summary));
  return summary;
}
