// Build identity (injected by vite.config.js) and the public demo URL.

export const APP_VERSION = __APP_VERSION__;
export const BUILD_DATE = __BUILD_DATE__;
export const LIVE_URL = 'https://anwozo157.github.io/AetherVault/';

/**
 * Link for sharing: the live site plus this build's version. GitHub Pages ignores the
 * query, but phones treat it as a new URL, so a scan never shows a stale cached copy.
 */
export function shareUrl(version: string = APP_VERSION): string {
  return version && version !== 'dev' ? `${LIVE_URL}?v=${encodeURIComponent(version)}` : LIVE_URL;
}

export interface LiveVersion {
  version: string;
  date: string;
}

/**
 * Asks the live site which build it is serving right now (version.json, never cached),
 * so the Share QR always points at the newest deploy even from a stale open page.
 * Returns null when offline or in dev.
 */
export async function fetchLiveVersion(
  fetchFn: typeof fetch = fetch,
  baseUrl: string = './',
): Promise<LiveVersion | null> {
  try {
    const res = await fetchFn(`${baseUrl}version.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const body = (await res.json()) as Partial<LiveVersion>;
    if (typeof body.version !== 'string' || !/^[0-9a-f]{7,40}$/.test(body.version)) return null;
    return { version: body.version, date: typeof body.date === 'string' ? body.date : '' };
  } catch {
    return null;
  }
}
