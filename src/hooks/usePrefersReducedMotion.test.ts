import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

function mockMatchMedia(initial: boolean) {
  let listener: (() => void) | null = null;
  const media = {
    matches: initial,
    addEventListener: vi.fn((_: string, cb: () => void) => (listener = cb)),
    removeEventListener: vi.fn(),
  };
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => media),
  );
  return {
    media,
    change(next: boolean) {
      media.matches = next;
      act(() => listener?.());
    },
  };
}

describe('usePrefersReducedMotion', () => {
  afterEach(() => vi.unstubAllGlobals());

  test('reflects the OS setting and updates when it changes', () => {
    const mm = mockMatchMedia(false);
    const { result, unmount } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    mm.change(true);
    expect(result.current).toBe(true);

    unmount();
    expect(mm.media.removeEventListener).toHaveBeenCalled();
  });

  test('is false when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });
});
