import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import InvestorPitchDeck from './InvestorPitchDeck';

describe('InvestorPitchDeck', () => {
  test('renders every slide without crashing', () => {
    render(<InvestorPitchDeck onLaunchDemo={vi.fn()} />);
    expect(screen.getByText('Slide 1 of 7')).toBeInTheDocument();

    const next = screen.getByRole('button', { name: 'Next slide' });
    for (let slide = 2; slide <= 7; slide++) {
      fireEvent.click(next);
      expect(screen.getByText(`Slide ${slide} of 7`)).toBeInTheDocument();
    }
  });

  test('cites sources for downtime statistics and flags unverified ones', () => {
    render(<InvestorPitchDeck onLaunchDemo={vi.fn()} />);
    expect(screen.getAllByText('[source needed]').length).toBeGreaterThan(0);
    expect(screen.queryByText(/Gartner reports/)).not.toBeInTheDocument();
  });
});
