import { describe, expect, test, vi } from 'vitest';
import { handlePreloadError, installStaleChunkReload } from './staleChunkReload';

const memory = () => {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
};

describe('stale chunk reload', () => {
  test('reloads once on a failed chunk, then lets the error show if it happens again soon', () => {
    const storage = memory();
    const reload = vi.fn();
    let now = 1_000_000;
    const env = { storage, now: () => now, reload };

    const first = new Event('vite:preloadError', { cancelable: true });
    expect(handlePreloadError(first, env)).toBe(true);
    expect(first.defaultPrevented).toBe(true);
    expect(reload).toHaveBeenCalledTimes(1);

    now += 5_000; // the reloaded page fails again: no loop
    const second = new Event('vite:preloadError', { cancelable: true });
    expect(handlePreloadError(second, env)).toBe(false);
    expect(second.defaultPrevented).toBe(false);
    expect(reload).toHaveBeenCalledTimes(1);

    now += 120_000; // a later deploy: reload again
    expect(handlePreloadError(new Event('vite:preloadError', { cancelable: true }), env)).toBe(
      true,
    );
    expect(reload).toHaveBeenCalledTimes(2);
  });

  test('never reloads when storage is unavailable (cannot detect a loop)', () => {
    const reload = vi.fn();
    const throwing = {
      getItem: () => null,
      setItem: () => {
        throw new Error('blocked');
      },
    };
    expect(handlePreloadError(new Event('x'), { storage: throwing, now: () => 1e6, reload })).toBe(
      false,
    );
    expect(handlePreloadError(new Event('x'), { storage: null, now: () => 1e6, reload })).toBe(
      false,
    );
    expect(reload).not.toHaveBeenCalled();
  });

  test('installs a listener for vite:preloadError', () => {
    const target = new EventTarget();
    const reload = vi.fn();
    installStaleChunkReload({
      addEventListener: (type, l) => target.addEventListener(type, l),
      storage: memory(),
      now: () => 1e6,
      reload,
    });
    target.dispatchEvent(new Event('vite:preloadError', { cancelable: true }));
    expect(reload).toHaveBeenCalledTimes(1);
  });
});
