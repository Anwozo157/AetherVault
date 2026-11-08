import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MockDrProvider } from '../../providers/MockDrProvider';
import AwsDrsHud from './AwsDrsHud';

describe('AwsDrsHud', () => {
  const provider = new MockDrProvider();
  provider.dispose();
  const telemetry = provider.getTelemetry();
  const logs = provider.getRecentLogs();

  test('renders agent health and the audit log', () => {
    render(<AwsDrsHud telemetry={telemetry} logs={logs} chaosActive={false} />);
    expect(screen.getByText('HEALTHY')).toBeInTheDocument();
    expect(screen.getByText('AetherVault ready for failover')).toBeInTheDocument();
  });

  test('renders degraded telemetry in chaos mode', () => {
    render(
      <AwsDrsHud
        telemetry={{ ...telemetry, drsAgentStatus: 'SYNCHRONIZING', cloudWatchAlarmsTriggered: 2 }}
        logs={logs}
        chaosActive
      />,
    );
    expect(screen.getByText('SYNCHRONIZING')).toBeInTheDocument();
  });
});
