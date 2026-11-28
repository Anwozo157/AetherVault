import type { MeasuredRecovery } from '../../domain/dr';
import { formatSeconds } from '../drills/evidence';

const KIND_LABEL: Record<MeasuredRecovery['kind'], string> = {
  drill: 'Drill',
  recovery: 'Recovery',
  failback: 'Failback',
};

/** Minutes and seconds for long durations ("19 min 47 s"); formatSeconds for short ones. */
export function formatDuration(seconds: number | null): string {
  if (seconds === null) return 'running';
  if (seconds < 120) return formatSeconds(seconds);
  // Round once, then split, so 599.9 s reads "10 min", never "9 min 60 s".
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total - m * 60;
  return s ? `${m} min ${s} s` : `${m} min`;
}

/**
 * Recovery launch jobs measured by AWS Elastic Disaster Recovery (real, not simulated).
 * The time is AWS's job time: from the recovery request until the servers are launched.
 */
export default function MeasuredRecoveries({
  recoveries,
  rtoTargetSeconds,
  cloud = 'aws',
}: {
  recoveries: MeasuredRecovery[];
  /** Which cloud measured the jobs (the replication source that reported them). */
  cloud?: 'aws' | 'azure';
  /** The organization's recovery time target, when known. */
  rtoTargetSeconds?: number;
}) {
  if (recoveries.length === 0) return null;
  const by = cloud === 'azure' ? 'Azure' : 'AWS';
  return (
    <div className="flex flex-col gap-2" data-testid="measured-recoveries">
      <div>
        <h3 className="text-[11px] font-mono uppercase tracking-widest text-white">
          {`Recoveries measured by ${by}`}
        </h3>
        <p className="text-[11px] font-mono text-zinc-400 mt-1 max-w-2xl">
          {cloud === 'azure'
            ? 'Real recovery times from Azure Site Recovery: from the test failover or failover request until the job finished with the VM created in the recovery region.'
            : 'Real recovery times from AWS Elastic Disaster Recovery: from the recovery request until the recovery servers launched.'}{' '}
          Checking that your applications work adds time on top.
        </p>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-left text-[11px] font-mono">
          <caption className="sr-only">Recovery jobs measured by {by}, newest first</caption>
          <thead className="text-zinc-500 uppercase tracking-widest text-[10px]">
            <tr>
              <th scope="col" className="px-3 py-2">
                Started
              </th>
              <th scope="col" className="px-3 py-2">
                Type
              </th>
              <th scope="col" className="px-3 py-2">
                Servers
              </th>
              <th scope="col" className="px-3 py-2">
                Recovery time
              </th>
            </tr>
          </thead>
          <tbody>
            {recoveries.map((r) => {
              const met =
                rtoTargetSeconds === undefined || r.durationSeconds === null
                  ? null
                  : r.durationSeconds <= rtoTargetSeconds;
              const allLaunched = r.launched === r.servers;
              return (
                <tr
                  key={r.jobId}
                  data-testid={`recovery-${r.jobId}`}
                  className="border-t border-white/5 text-zinc-300 align-top"
                >
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                    {new Date(r.startedAt).toLocaleString()}
                    <span className="block text-zinc-500">{r.jobId}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {KIND_LABEL[r.kind]}
                    <span className="block text-zinc-500">{r.awsRegion}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span
                      className={
                        r.status !== 'COMPLETED'
                          ? 'text-zinc-400'
                          : allLaunched
                            ? 'text-aether-green'
                            : 'text-red-300'
                      }
                    >
                      {r.launched} of {r.servers} launched
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap tabular-nums">
                    {r.status !== 'COMPLETED' ? (
                      <span className="text-aether-amber">in progress</span>
                    ) : (
                      <span
                        className={
                          met === null
                            ? 'text-zinc-200'
                            : met
                              ? 'text-aether-green'
                              : 'text-red-300'
                        }
                      >
                        {formatDuration(r.durationSeconds)}
                        {met === null ? '' : met ? ' · within target' : ' · over target'}
                      </span>
                    )}
                    <span className="block text-zinc-500">measured by {by}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
