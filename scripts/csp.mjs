// Content-Security-Policy for production builds (injected as a <meta> tag by vite.config.js).
// GitHub Pages cannot send HTTP headers, so the policy ships in the page itself.
//
// What it allows, and why:
//   script-src  'self'              only scripts shipped with the site; no inline or eval
//   style-src   'self'              the built stylesheet only (React sets styles via the DOM API)
//   img-src     'self' data: blob:  logo, locally generated QR (data: URL)
//   connect-src 'self' [+ Supabase] version.json; the console's database (https + websocket)
//   object-src 'none', base-uri 'self', form-action 'self'
// frame-ancestors cannot be set from a <meta> tag; it needs an HTTP header (custom domain later).

/** @param {string | undefined} supabaseUrl  VITE_SUPABASE_URL at build time, if any */
export function buildCsp(supabaseUrl) {
  const connect = ["'self'"];
  if (supabaseUrl) {
    const u = new URL(supabaseUrl);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') {
      throw new Error(`VITE_SUPABASE_URL must be http(s), got ${u.protocol}`);
    }
    connect.push(u.origin, `${u.protocol === 'https:' ? 'wss' : 'ws'}://${u.host}`);
  }
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src ${connect.join(' ')}`,
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}
