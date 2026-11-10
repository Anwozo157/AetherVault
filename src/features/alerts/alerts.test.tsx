import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import type { AlertChannel, AlertDelivery, AlertsCapability } from '../../domain/dr';
import AlertsPanel from './AlertsPanel';

const channel: AlertChannel = {
  id: 'ch-1',
  kind: 'slack',
  name: '#dr-alerts',
  hint: 'ABCD',
  events: ['failover', 'drill_failed'],
  createdByEmail: 'admin@co.com',
  createdAt: '2026-11-10T00:00:00Z',
};
const deliveries: AlertDelivery[] = [
  {
    id: 2,
    channelName: 'On-call',
    kind: 'pagerduty',
    event: 'failover.requested',
    title: 'Failover requested by op@co.com',
    status: 'failed',
    httpStatus: 400,
    error: 'Invalid routing key',
    createdAt: '2026-11-10T00:00:02Z',
  },
  {
    id: 1,
    channelName: '#dr-alerts',
    kind: 'slack',
    event: 'failover.requested',
    title: 'Failover requested by op@co.com',
    status: 'sent',
    httpStatus: 200,
    error: null,
    createdAt: '2026-11-10T00:00:01Z',
  },
];

const fake = (over: Partial<AlertsCapability> = {}): AlertsCapability => ({
  listChannels: vi.fn(async () => [channel]),
  listDeliveries: vi.fn(async () => deliveries),
  addChannel: vi.fn(async () => {}),
  removeChannel: vi.fn(async () => {}),
  sendTest: vi.fn(async () => {}),
  ...over,
});

describe('AlertsPanel', () => {
  test('lists channels with only the last 4 characters, and delivery results', async () => {
    render(<AlertsPanel alerts={fake()} myRole="viewer" refreshKey={0} />);
    const row = await screen.findByTestId('channel-#dr-alerts');
    expect(row).toHaveTextContent('Slack · #dr-alerts …ABCD');
    expect(row).toHaveTextContent('Failovers · Failed drills · added by admin@co.com');
    expect(screen.getByText('Sent (200)')).toBeInTheDocument();
    expect(screen.getByText('Failed (400)')).toBeInTheDocument();
    expect(screen.getByText('Invalid routing key')).toBeInTheDocument();
    // Viewers: no add form, no test/remove buttons.
    expect(screen.queryByRole('form', { name: 'Add alert channel' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Send test alert/ })).not.toBeInTheDocument();
  });

  test('admins add a PagerDuty channel; events default per service and can be changed', async () => {
    const alerts = fake();
    render(<AlertsPanel alerts={alerts} myRole="admin" refreshKey={0} />);
    const form = await screen.findByRole('form', { name: 'Add alert channel' });
    fireEvent.change(within(form).getByLabelText('Service'), { target: { value: 'pagerduty' } });
    expect(within(form).getByLabelText('Passed drills')).not.toBeChecked();
    expect(within(form).getByLabelText('PagerDuty integration key')).toHaveAttribute(
      'type',
      'password',
    );
    fireEvent.change(within(form).getByLabelText('Name'), { target: { value: ' On-call ' } });
    fireEvent.change(within(form).getByLabelText('PagerDuty integration key'), {
      target: { value: ' ' + 'k'.repeat(32) + ' ' },
    });
    fireEvent.click(within(form).getByLabelText('Failed drills'));
    fireEvent.click(within(form).getByRole('button', { name: 'Add channel' }));
    await waitFor(() =>
      expect(alerts.addChannel).toHaveBeenCalledWith({
        kind: 'pagerduty',
        name: 'On-call',
        secret: 'k'.repeat(32),
        events: ['failover', 'replication'],
      }),
    );
    expect(await screen.findByText(/PagerDuty channel added/)).toBeInTheDocument();
    expect(within(form).getByLabelText('PagerDuty integration key')).toHaveValue('');
  });

  test('at least one event is required', async () => {
    const alerts = fake();
    render(<AlertsPanel alerts={alerts} myRole="admin" refreshKey={0} />);
    const form = await screen.findByRole('form', { name: 'Add alert channel' });
    for (const label of ['Failovers', 'Failed drills', 'Passed drills', 'Replication at risk'])
      fireEvent.click(within(form).getByLabelText(label));
    fireEvent.change(within(form).getByLabelText('Name'), { target: { value: 'x' } });
    fireEvent.change(within(form).getByLabelText('Slack webhook URL'), {
      target: { value: 'https://hooks.slack.com/services/a/b/c' },
    });
    fireEvent.click(within(form).getByRole('button', { name: 'Add channel' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Choose at least one event.');
    expect(alerts.addChannel).not.toHaveBeenCalled();
  });

  test('admins send a test and remove a channel; server errors are shown', async () => {
    const alerts = fake({
      removeChannel: vi.fn(async () => Promise.reject(new Error('admin role required'))),
    });
    render(<AlertsPanel alerts={alerts} myRole="admin" refreshKey={0} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Send test alert to #dr-alerts' }));
    await waitFor(() => expect(alerts.sendTest).toHaveBeenCalledWith('ch-1'));
    expect(await screen.findByText(/Test alert queued for #dr-alerts/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Remove alert channel #dr-alerts' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('admin role required');
  });

  test('empty states and refresh', async () => {
    const alerts = fake({
      listChannels: vi.fn(async () => []),
      listDeliveries: vi.fn(async () => []),
    });
    render(<AlertsPanel alerts={alerts} myRole="operator" refreshKey={0} />);
    expect(
      await screen.findByText(/No alert channels yet\. An admin can add one\./),
    ).toBeInTheDocument();
    expect(screen.getByText('No alerts sent yet.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }));
    await waitFor(() => expect(alerts.listDeliveries).toHaveBeenCalledTimes(2));
  });
});
