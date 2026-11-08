// Backend configuration from build-time env (see .env.example). The public GitHub Pages
// build sets nothing, so it stays the simulated demo with no sign-in link.

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';
export const hasBackend = SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';
/** Local Docker database: safe to show the seeded demo accounts. */
export const isLocalBackend = /^https?:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(SUPABASE_URL);

export const CONSOLE_HASH = '#/console';

/** True when the URL points at the signed-in console (hash route or magic-link return). */
export function isConsoleRoute(loc: Pick<Location, 'hash' | 'search'>): boolean {
  return loc.hash.startsWith(CONSOLE_HASH) || new URLSearchParams(loc.search).has('console');
}
