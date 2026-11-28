import { render, screen, within } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import LandingPage from './LandingPage';

// WebGL is not available in jsdom.
vi.mock('../topology/GlobalTopologyCanvas', () => ({
  default: ({ status }: { status: string }) => <div data-testid="globe">{status}</div>,
}));
vi.mock('./ReplicationScene3D', () => ({ default: () => <div data-testid="scene-3d" /> }));

describe('LandingPage', () => {
  test('one headline, and every demo link opens the demo route', () => {
    render(<LandingPage />);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: /Disaster recovery you can prove/ }),
    ).toBeInTheDocument();
    const demoLinks = screen.getAllByRole('link', { name: /live demo/i });
    expect(demoLinks.length).toBeGreaterThan(1);
    demoLinks.forEach((a) => expect(a).toHaveAttribute('href', '#/demo'));
  });

  test('honesty: visuals are labeled simulated or illustrative, SOC 2 is not claimed', () => {
    render(<LandingPage />);
    expect(screen.getByText('SIMULATED')).toBeInTheDocument();
    expect(screen.getAllByText('ILLUSTRATIVE').length).toBeGreaterThan(0);
    expect(screen.getByText(/simulated data/i)).toBeInTheDocument();
    expect(screen.getByText(/SOC 2 readiness under way; no report yet/)).toBeInTheDocument();
  });

  test('live AWS test results are real, dated, and show the miss', () => {
    render(<LandingPage />);
    const aws = screen.getByTestId('live-results-aws');
    expect(within(aws).getByText('Measured in a live AWS test')).toBeInTheDocument();
    expect(within(aws).getByText(/REAL DATA · 17–18 NOV 2026/)).toBeInTheDocument();
    expect(within(aws).getByText(/not a customer/)).toBeInTheDocument();
    expect(within(aws).getByText('12 min 29 s')).toBeInTheDocument();
    expect(within(aws).getByText('17 min 14 s')).toBeInTheDocument();
    expect(within(aws).getAllByText('FAIL')).toHaveLength(1);
  });

  test('live Azure test results are real, dated, and show every data-loss miss', () => {
    render(<LandingPage />);
    const azure = screen.getByTestId('live-results-azure');
    expect(within(azure).getByText('Measured in a live Azure test')).toBeInTheDocument();
    expect(within(azure).getByText(/REAL DATA · 27–28 NOV 2026/)).toBeInTheDocument();
    expect(within(azure).getByText(/not a customer/)).toBeInTheDocument();
    // Recovery times (docs/AZURE_LIVE_POC.md) and the data lost on each drill.
    for (const t of [
      '3 min 55 s',
      '3 min 57 s',
      '3 min 56 s',
      '5 min 7 s',
      '4 min 4 s',
      '6 min 15 s',
    ]) {
      expect(within(azure).getByText(t)).toBeInTheDocument();
    }
    // Every drill missed the 1-minute data-loss target, so none may be shown as a pass.
    expect(within(azure).getAllByText('FAIL')).toHaveLength(3);
    expect(within(azure).queryByText('PASS')).not.toBeInTheDocument();
  });

  test('no claim of Azure product support beyond the measured test', () => {
    render(<LandingPage />);
    expect(screen.queryByText(/supports? (AWS and )?Azure/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Azure integration/i)).not.toBeInTheDocument();
  });

  test('3D visuals load lazily (globe and replication scene)', async () => {
    render(<LandingPage />);
    expect(await screen.findByTestId('globe')).toHaveTextContent('ACTIVE_SYNC');
    expect(await screen.findByTestId('scene-3d')).toBeInTheDocument();
  });

  test('without a contact address, no mail buttons are shown', () => {
    render(<LandingPage contactEmail={null} />);
    expect(screen.queryByRole('link', { name: /pilot/i })).not.toBeInTheDocument();
    expect(screen.getByText(/Pilot requests open soon/)).toBeInTheDocument();
  });

  test('with a contact address, pilot buttons mail it', () => {
    render(<LandingPage contactEmail="hello@example.com" />);
    const pricing = document.getElementById('pricing')!;
    expect(within(pricing).getByRole('link', { name: /Ask about a pilot/ })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:hello@example\.com\?subject=/),
    );
  });

  test('sign-in link only when a backend is configured', () => {
    const { rerender } = render(<LandingPage />);
    expect(screen.queryByRole('link', { name: 'Sign in' })).not.toBeInTheDocument();
    rerender(<LandingPage showSignIn />);
    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '#/console');
  });
});
