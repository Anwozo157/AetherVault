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

  test('statistics carry citations and the misattributed Gartner claim is gone', async () => {
    render(<InvestorPitchDeck onLaunchDemo={vi.fn()} />);
    const next = screen.getByRole('button', { name: 'Next slide' });

    fireEvent.click(next); // slide 2: problem
    expect(await screen.findByText(/EMA 2024/)).toBeInTheDocument();
    expect(screen.getByText(/Uptime 2025/)).toBeInTheDocument();
    expect(screen.getByText(/Flexera 2026/)).toBeInTheDocument();
    expect(screen.queryByText(/Gartner/)).not.toBeInTheDocument();

    fireEvent.click(next);
    fireEvent.click(next); // slide 4: market
    expect(await screen.findByText(/MarketsandMarkets, Jan 2026/)).toBeInTheDocument();
  });
});
