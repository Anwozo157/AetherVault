// After a deploy, a tab that loaded the previous version asks for lazy chunks whose file names
// (content hashes) no longer exist, and the panel shows "failed to load". Vite reports this as a
// `vite:preloadError` event. Reload once to pick up the new version; never loop: if the reload
// happened less than a minute ago, let the normal error UI show instead.

const KEY = 'aethervault:stale-chunk-reload';
const WINDOW_MS = 60_000;

interface ReloadEnv {
  addEventListener(type: 'vite:preloadError', listener: (event: Event) => void): void;
  storage: Pick<Storage, 'getItem' | 'setItem'> | null;
  now(): number;
  reload(): void;
}

/** Returns true when it reloaded (and suppressed the error). */
export function handlePreloadError(
  event: Event,
  env: Omit<ReloadEnv, 'addEventListener'>,
): boolean {
  // Without working storage we can't detect a reload loop, so don't risk one.
  if (!env.storage) return false;
  try {
    const last = Number(env.storage.getItem(KEY) ?? 0) || 0;
    if (env.now() - last < WINDOW_MS) return false;
    env.storage.setItem(KEY, String(env.now()));
  } catch {
    return false;
  }
  event.preventDefault();
  env.reload();
  return true;
}

export function installStaleChunkReload(env: ReloadEnv): void {
  env.addEventListener('vite:preloadError', (event) => {
    handlePreloadError(event, env);
  });
}
