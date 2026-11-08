import { Activity, CloudLightning, Server } from 'lucide-react';
import type { BasicMetrics, DrTelemetry, SystemState } from '../../domain/dr';
import MetricCard from './MetricCard';
import TelemetrySparkline from './TelemetrySparkline';

interface MetricsOverviewProps {
  state: SystemState;
  metrics: BasicMetrics;
  telemetry: DrTelemetry;
  chaosActive: boolean;
}

/** RPO / state / sync cards plus live sparklines. */
export default function MetricsOverview({
  state,
  metrics,
  telemetry,
  chaosActive,
}: MetricsOverviewProps) {
  return (
    <>
      <MetricCard
        icon={<Activity className="w-5 h-5 text-gray-400" />}
        label="RPO (Lag)"
        value={metrics.rpo}
        color={
          chaosActive
            ? 'text-aether-red'
            : metrics.sync === 100
              ? 'text-aether-green'
              : 'text-aether-amber'
        }
      />
      <MetricCard
        icon={<Server className="w-5 h-5 text-gray-400" />}
        label="System State"
        value={chaosActive ? 'DEGRADED JITTER' : state.replace(/_/g, ' ')}
        color={chaosActive ? 'text-aether-red' : 'text-white'}
      />
      <MetricCard
        icon={<CloudLightning className="w-5 h-5 text-gray-400" />}
        label="Data Sync"
        value={`${metrics.sync}%`}
        color={chaosActive ? 'text-aether-orange' : 'text-aether-cyan'}
      />

      <div className="col-span-1 md:col-span-3 flex flex-wrap gap-3 pt-2">
        <TelemetrySparkline
          data={telemetry.historyRpoMs}
          color={chaosActive ? '#FF3B30' : '#00FF9D'}
          fillId="rpoGrad"
          label="Continuous RPO Latency Stream"
          currentValue={`${telemetry.replicationLagMs}`}
          unit="ms lag"
        />
        <TelemetrySparkline
          data={telemetry.historyThroughput}
          color="#00F0FF"
          fillId="tputGrad"
          label="eBPF Encrypted Ingress Throughput"
          currentValue={`${telemetry.ingressThroughputGbps}`}
          unit="Gbps"
        />
      </div>
    </>
  );
}
