// AWS Lambda entry: runs in the customer's account every minute (EventBridge schedule).
// Permissions: AWSElasticDisasterRecoveryReadOnlyAccess + basic Lambda logging. Nothing else.
// Reads replication status (DescribeSourceServers) and recovery jobs (DescribeJobs).
import {
  collectRecoveryJobs,
  collectSnapshot,
  pushRecoveryJobs,
  pushSnapshot,
} from '../src/integrations/awsDrs/collect';
import { ingestTargetFromEnv, regionFromEnv } from './env';
import { sdkApi } from './sdkApi';

export async function handler() {
  const region = regionFromEnv();
  const target = ingestTargetFromEnv();
  const api = sdkApi(region);
  const snapshot = await collectSnapshot(api, { region });
  const result = await pushSnapshot(target, snapshot);
  // Recovery jobs are reported separately; a failure there never blocks replication status.
  let recoveries: unknown = null;
  try {
    const jobs = await collectRecoveryJobs(api);
    if (jobs) recoveries = await pushRecoveryJobs(target, region, jobs);
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
