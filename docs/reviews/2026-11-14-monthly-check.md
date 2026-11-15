# Monthly control check: 2026-11-14

- **Control(s):** monthly checks in `docs/compliance/CONTROL_CALENDAR.md`: backups (A1.2, CC9.1),
  vulnerability triage (CC7.1), vendor status (CC9.2), service health (A1.1), CI health (CC8.1)
- **Performed by:** Claude Code (Opus 5.5), read-only; to be signed off by the founder
- **Period covered:** 2026-10-15 to 2026-11-14 (first month of the program)

## What was checked

- **Backups:** weekly job loaded in launchd; backup log shows every run succeeded (latest 2026-11-12);
  first scheduled Sunday run due 2026-11-15. Restore rehearsed 2026-11-12 (`docs/BACKUPS.md`).
- **Dependabot:** open alerts by severity and open update PRs (`gh api`, `gh pr list`).
- **Code scanning (CodeQL) and secret scanning:** open alerts (`gh api`).
- **Repository security settings:** Dependabot security updates, secret scanning, push protection.
- **CI on `main`:** latest runs of CI and CodeQL.
- **Production database:** project status via the Supabase Management API (read-only).
- **Vendor status pages:** Supabase, GitHub, Cloudflare; site reachability.

## Result

- Backups: OK. Dependabot: 0 open alerts, 0 open PRs. Secret scanning: 0 open alerts. Security
  updates, secret scanning and push protection: on.
- CI on `main`: latest CI and CodeQL runs green; one earlier failed run (2026-11-12) was fixed by
  later changes.
- Production database: healthy. Site: reachable. Supabase and GitHub: operational. Cloudflare reported
  a partial degradation elsewhere; our site was unaffected.
- **2 findings**, tracked privately: one open code-scanning alert to fix within the 30-day window
  (assessed low real-world risk), and two optional secret-scanning settings for the founder to
  consider turning on.

## Actions

| Action (generic)                                                | Owner                   | Due        | Done |
| --------------------------------------------------------------- | ----------------------- | ---------- | ---- |
| Fix the open code-scanning alert (own branch, browser-verified) | Agent, founder approves | 2026-12-10 |      |
| Decide on the optional secret-scanning settings                 | Founder                 | 2026-11-30 |      |
| Confirm the first scheduled Sunday backup ran                   | Agent (next check)      | 2026-11-16 |      |

Next monthly check: **2026-12-14**.

## Sign-off

Reviewed by: [founder], [date]
