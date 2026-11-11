# Custom domain: getaethervault.com

The site moves from `https://anwozo157.github.io/AetherVault/` to `https://getaethervault.com/`.
Domain registered 2026-11-11 at Cloudflare Registrar (DNS on Cloudflare). Hosting stays on GitHub
Pages (free). The old URL keeps working: GitHub redirects it to the custom domain.

## Order matters

Ship the code (`public/CNAME`, `LIVE_URL`) **only after** the DNS records below resolve. If the CNAME
file goes live first, GitHub redirects visitors to a domain that doesn't answer yet.

## 1. Verify the domain with GitHub (prevents takeover)

GitHub → profile → **Settings → Pages → Add a domain** → `getaethervault.com`. GitHub shows a TXT
record (`_github-pages-challenge-anwozo157` = a code). Add it in Cloudflare DNS, then **Verify**.

## 2. DNS records in Cloudflare (all **DNS only**, grey cloud)

GitHub must see its own IPs to issue the HTTPS certificate, so the Cloudflare proxy stays off.

| Type  | Name  | Value                  |
| ----- | ----- | ---------------------- |
| A     | `@`   | `185.199.108.153`      |
| A     | `@`   | `185.199.109.153`      |
| A     | `@`   | `185.199.110.153`      |
| A     | `@`   | `185.199.111.153`      |
| AAAA  | `@`   | `2606:50c0:8000::153`  |
| AAAA  | `@`   | `2606:50c0:8001::153`  |
| AAAA  | `@`   | `2606:50c0:8002::153`  |
| AAAA  | `@`   | `2606:50c0:8003::153`  |
| CNAME | `www` | `anwozo157.github.io`  |

Check: `dig +short getaethervault.com A` returns the four IPs.

Email records (Cloudflare Email Routing MX/TXT, and later Resend's records on a `send` subdomain)
live alongside these and don't conflict.

## 3. Ship

1. Merge `feat/custom-domain` (adds `public/CNAME`, sets `LIVE_URL`), then `npm run deploy`
   (founder OK).
2. GitHub repo → **Settings → Pages**: custom domain shows `getaethervault.com`; wait for the
   certificate, then tick **Enforce HTTPS**.

## 4. Point sign-in at the new address (Supabase auth)

Magic links must return to the new domain. Via the Management API (`PATCH
/v1/projects/yvcejahygubzbbbooxas/config/auth`):

- `site_url`: `https://getaethervault.com/`
- `uri_allow_list`: add `https://getaethervault.com/**` and `https://getaethervault.com/?console`;
  keep the github.io entries until the redirect is confirmed.

## 5. Check

- `https://getaethervault.com/` loads with a valid certificate; `www.` redirects to it.
- `https://anwozo157.github.io/AetherVault/` redirects to it.
- No CSP errors in the browser console; sign in with a magic link end to end.
- Desktop and ~390px phone width.
