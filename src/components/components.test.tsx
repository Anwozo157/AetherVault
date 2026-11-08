import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ShareModal from './ShareModal';

describe('ShareModal', () => {
  test('shows the live link and QR code when open, and closes', () => {
    const onClose = vi.fn();
    render(<ShareModal open onClose={onClose} />);

    expect(screen.getByRole('dialog', { name: 'Share With Shareholders' })).toBeInTheDocument();
    expect(screen.getByAltText('AetherVault Live Mobile QR Code')).toHaveAttribute(
      'src',
      expect.stringContaining('anwozo157.github.io/AetherVault'),
    );
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  test('renders nothing when closed', () => {
    render(<ShareModal open={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('ErrorBoundary', () => {
  test('shows the fallback when a child throws', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const Boom = () => {
      throw new Error('no WebGL');
    };
    render(
      <ErrorBoundary fallback={<p>3D unavailable</p>}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText('3D unavailable')).toBeInTheDocument();
    spy.mockRestore();
  });
});
