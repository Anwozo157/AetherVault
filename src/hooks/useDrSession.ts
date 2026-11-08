import { useEffect, useState } from 'react';
import type { BasicMetrics, DrTelemetry, LogEvent, SystemState } from '../domain/dr';
import { useDrProvider } from '../providers/DrProviderContext';

const MAX_LOGS = 50;

/** Live view of the active DR provider: state, metrics, telemetry and logs. */
export function useDrSession() {
  const provider = useDrProvider();
  const [state, setState] = useState<SystemState>(() => provider.getState());
  const [metrics, setMetrics] = useState<BasicMetrics>(() => provider.getMetrics());
  const [telemetry, setTelemetry] = useState<DrTelemetry>(() => provider.getTelemetry());
  const [logs, setLogs] = useState<LogEvent[]>(() => provider.getRecentLogs());

  useEffect(() => {
    const unsubscribers = [
      provider.onStateChange(setState),
      provider.onMetricsUpdate(setMetrics),
      provider.onDrTelemetryUpdate(setTelemetry),
      provider.onLogEvent((log) => setLogs((prev) => [...prev.slice(-(MAX_LOGS - 1)), log])),
    ];
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, [provider]);

  return { provider, state, metrics, telemetry, logs };
}
