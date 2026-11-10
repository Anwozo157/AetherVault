import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';
import ShareModal from './ShareModal';
import { APP_VERSION, BUILD_DATE, LIVE_URL, fetchLiveVersion, shareUrl } from '../config/build';

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

describe('live version (Share QR always points at the newest deploy)', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('a newer live build replaces the QR target and offers a reload', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ version: 'fedcba9', date: '2026-12-01' }),
      }),
    );
    render(<ShareModal open onClose={vi.fn()} />);
    expect(await screen.findByText(/A newer version is live/)).toBeInTheDocument();
    expect(await screen.findByText('Build fedcba9 · 2026-12-01 · live')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByTestId('share-qr')).toHaveAccessibleName(
        expect.stringContaining('?v=fedcba9'),
      ),
    );
  });

  test('fetchLiveVersion bypasses caches and rejects bad payloads', async () => {
    const ok = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ version: 'abc1234', date: 'd' }) });
    await expect(fetchLiveVersion(ok, '/')).resolves.toEqual({ version: 'abc1234', date: 'd' });
    expect(ok.mock.calls[0][0]).toMatch(/^\/version\.json\?t=\d+$/);
    expect(ok.mock.calls[0][1]).toEqual({ cache: 'no-store' });

    const evil = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ version: '<script>' }) });
    await expect(fetchLiveVersion(evil)).resolves.toBeNull();
    const down = vi.fn().mockRejectedValue(new Error('offline'));
    await expect(fetchLiveVersion(down)).resolves.toBeNull();
    const missing = vi.fn().mockResolvedValue({ ok: false });
    await expect(fetchLiveVersion(missing)).resolves.toBeNull();
  });
});

describe('shareUrl', () => {
  test('adds the build version so phones fetch the newest deploy', () => {
    expect(shareUrl('abc1234')).toBe(`${LIVE_URL}?v=abc1234#/demo`);
  });
  test('dev builds share the plain live demo URL', () => {
    expect(shareUrl('dev')).toBe(`${LIVE_URL}#/demo`);
  });
});
