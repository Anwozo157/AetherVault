// Backend configuration from build-time env (see .env.example). The public GitHub Pages
// build sets nothing, so it stays the simulated demo with no sign-in link.

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';
export const hasBackend = SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';
/** Local Docker database: safe to show the seeded demo accounts. Fixed at build time
 *  (vite.config.js) so production bundles contain no local-only code. */
export const isLocalBackend: boolean = __LOCAL_BACKEND__;

export const CONSOLE_HASH = '#/console';
/** The public simulated demo (3D command center + investor deck). The site root is the landing page. */
export const DEMO_HASH = '#/demo';

export type SiteRoute = 'landing' | 'demo' | 'console';

/** Which top-level screen a URL shows. Unknown hashes (e.g. in-page anchors) stay on the landing page. */
export function routeFor(loc: Pick<Location, 'hash' | 'search'>): SiteRoute {
  if (isConsoleRoute(loc)) return 'console';
  if (loc.hash.startsWith(DEMO_HASH)) return 'demo';
  return 'landing';
}

/** True when the URL points at the signed-in console (hash route or magic-link return). */
export function isConsoleRoute(loc: Pick<Location, 'hash' | 'search'>): boolean {
  return loc.hash.startsWith(CONSOLE_HASH) || new URLSearchParams(loc.search).has('console');
}
