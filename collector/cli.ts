// Command-line collector.
//   npm run collector -- --fixture degraded --dry-run     print a sample snapshot
//   npm run collector -- --fixture healthy                push sample data (labeled SAMPLE)
//   npm run collector -- --dry-run                        read the real account (AWS creds)
//   npm run collector -- --record pages.json --dry-run    save real API responses as fixtures
//   npm run collector -- --watch                          push every 60 s until stopped
import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import type { DescribeSourceServersResponse } from '@aws-sdk/client-drs';
import {
  collectSnapshot,
  pushSnapshot,
  recordedApi,
  type DrsReadApi,
} from '../src/integrations/awsDrs/collect';
import degraded from '../src/integrations/awsDrs/fixtures/describe-source-servers.degraded.json';
import healthy from '../src/integrations/awsDrs/fixtures/describe-source-servers.healthy.json';
import { rebaseSampleTimes } from '../src/integrations/awsDrs/snapshot';
import { ingestTargetFromEnv, regionFromEnv } from './env';
import { sdkApi } from './sdkApi';

const FIXTURES: Record<string, unknown> = { healthy, degraded };

async function main() {
  const { values } = parseArgs({
    options: {
      fixture: { type: 'string' },
      region: { type: 'string' },
      'dry-run': { type: 'boolean', default: false },
      record: { type: 'string' },
      watch: { type: 'boolean', default: false },
    },
  });
  const fixture = values.fixture;
  if (fixture && !(fixture in FIXTURES)) {
    throw new Error(`--fixture must be one of: ${Object.keys(FIXTURES).join(', ')}`);
  }
  if (fixture && values.record) throw new Error('--record needs a real AWS account, not --fixture');
  const region = values.region ?? (fixture ? 'us-west-2' : regionFromEnv());
  const pages: unknown[] = [];
  const api: DrsReadApi = fixture
    ? recordedApi(FIXTURES[fixture] as DescribeSourceServersResponse[])
    : sdkApi(region, (p) => pages.push(p));

  const once = async () => {
    pages.length = 0;
    const collected = await collectSnapshot(api, {
      region,
      source: fixture ? 'fixture' : 'aws-drs',
    });
    // Sample data: make "last seen" and ETAs relative to now, as a live account would read.
    const snapshot = fixture ? rebaseSampleTimes(collected) : collected;
    if (values.record) {
      // Strip SDK response metadata; keep the API shape.
      const clean = pages.map((p) => {
        const { $metadata: _m, ...rest } = p as { $metadata?: unknown };
        void _m;
        return rest;
      });
      writeFileSync(values.record, JSON.stringify(clean, null, 2) + '\n');
      console.error(
        `Saved ${clean.length} page(s) to ${values.record}. Review and redact hostnames before committing.`,
      );
    }
    if (values['dry-run']) {
      console.log(JSON.stringify(snapshot, null, 2));
      return;
    }
    const result = await pushSnapshot(ingestTargetFromEnv(), snapshot);
    console.log(
      `${new Date().toISOString()} pushed ${snapshot.servers.length} server(s) [${snapshot.source}]: ${JSON.stringify(result)}`,
    );
  };

  await once();
  if (values.watch) {
    setInterval(() => void once().catch((e: unknown) => console.error(String(e))), 60_000);
  }
}

main().catch((e: unknown) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
