import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ShareModal from './ShareModal';
import { APP_VERSION, BUILD_DATE, LIVE_URL, shareUrl } from '../config/build';

describe('ShareModal', () => {
  test('generates the QR locally for the versioned live link, and closes', async () => {
    const onClose = vi.fn();
    render(<ShareModal open onClose={onClose} />);

    expect(screen.getByRole('dialog', { name: 'Share With Shareholders' })).toBeInTheDocument();
    const qr = await screen.findByTestId('share-qr');
    // Generated in the browser: an inline SVG, never a third-party QR service.
    expect(qr.getAttribute('src')).toMatch(/^data:image\/svg\+xml/);
    expect(qr).toHaveAccessibleName(expect.stringContaining('anwozo157.github.io/AetherVault/'));
    expect(screen.getByText(`Build ${APP_VERSION} · ${BUILD_DATE}`)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close'));
    expect(onClose).toHaveBeenCalled();
  });

  test('Escape and a backdrop click close it', () => {
    const onClose = vi.fn();
    render(<ShareModal open onClose={onClose} />);
    fireEvent.keyDown(window, { key: 'Escape' });
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test('copy link writes the versioned URL to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<ShareModal open onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy link' }));
    expect(await screen.findByRole('button', { name: 'Link copied' })).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith(shareUrl());
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

describe('shareUrl', () => {
  test('adds the build version so phones fetch the newest deploy', () => {
    expect(shareUrl('abc1234')).toBe(`${LIVE_URL}?v=abc1234`);
  });
  test('dev builds share the plain live URL', () => {
    expect(shareUrl('dev')).toBe(LIVE_URL);
  });
});
