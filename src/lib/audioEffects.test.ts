import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// In-memory storage so the test does not depend on the Node/jsdom localStorage
// implementation (Node 25+ ships its own global that shadows jsdom's).
function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (i) => [...data.keys()][i] ?? null,
    removeItem: (key) => void data.delete(key),
    setItem: (key, value) => void data.set(key, String(value)),
  };
}

describe('sound preference', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', memoryStorage());
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('sound is off by default', async () => {
    const { sound } = await import('./audioEffects');
    expect(sound.isMuted).toBe(true);
  });

  test('a saved preference to enable sound is remembered', async () => {
    const first = await import('./audioEffects');
    first.saveSoundEnabled(true);
    vi.resetModules();

    const { sound } = await import('./audioEffects');
    expect(sound.isMuted).toBe(false);
  });

  test('works when storage is unavailable', async () => {
    vi.stubGlobal('localStorage', undefined);
    const { sound, saveSoundEnabled } = await import('./audioEffects');
    expect(sound.isMuted).toBe(true);
    expect(() => saveSoundEnabled(true)).not.toThrow();
  });
});
