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
