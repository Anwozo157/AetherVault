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
