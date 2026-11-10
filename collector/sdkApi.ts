// The only AWS call the collector makes: drs:DescribeSourceServers (read-only).
import { DescribeSourceServersCommand, DrsClient } from '@aws-sdk/client-drs';
import type { DrsReadApi } from '../src/integrations/awsDrs/collect';

export function sdkApi(region: string, onPage?: (page: unknown) => void): DrsReadApi {
  const client = new DrsClient({ region });
  return {
    async describeSourceServers(nextToken) {
      const page = await client.send(new DescribeSourceServersCommand({ filters: {}, nextToken }));
      onPage?.(page);
      return page;
    },
  };
}
