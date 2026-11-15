# Business Continuity and Disaster Recovery Plan (AetherVault itself)

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly,
and after every test or real event

A disaster-recovery company must be able to recover itself. This plan covers AetherVault's own
systems, not customers' servers.

## Components, targets and how we recover

| Component                                        | Runs on                            | If it fails                                                                                                                | Recovery time target (RTO) | Data loss target (RPO)                                                                                       |
| ------------------------------------------------ | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Website + console app (static files)             | GitHub Pages, `getaethervault.com` | Rebuild from git and publish to an alternate static host (e.g. Cloudflare Pages); point DNS there                          | 4 hours                    | None (everything is in git)                                                                                  |
| Database (auth, orgs, runs, audit log, settings) | Supabase (us-east-1)               | Restore the latest backup into a new Supabase project (`docs/BACKUPS.md`), update the app's database URL and key, redeploy | 8 hours                    | **7 days today** (weekly backup on the Free plan); **24 hours** after moving to Supabase Pro (daily backups) |
| Scheduled jobs (drills, alert sweeper)           | `pg_cron` in Supabase              | Restored with the database (`cron.sql` in each backup)                                                                     | With the database          | With the database                                                                                            |
| DNS and email routing                            | Cloudflare                         | Records are simple and documented (`docs/CUSTOM_DOMAIN.md`); re-create at another provider if needed                       | 24 hours                   | n/a                                                                                                          |
| Sign-in email                                    | Resend (SMTP)                      | Switch Supabase to another SMTP provider                                                                                   | 4 hours                    | n/a                                                                                                          |
| Source code and CI                               | GitHub                             | Full clones exist on the work Mac; push to another host; CI config is in the repo                                          | 1 business day             | Commits not yet pushed                                                                                       |
| Customer collectors                              | Customer's own AWS account         | Keep running on their schedule; reports resume when the console returns                                                    | n/a (customer-side)        | Status reports during the outage are not stored                                                              |

Targets are commitments to ourselves, not yet to customers. Customer-facing availability terms
come with the SLA (`docs/legal/`).

## Scenarios

- **Supabase outage or project paused:** check status.supabase.com; free projects pause after 7 idle
  days and are resumed from the dashboard. If unrecoverable, restore from backup into a new project.
  Moving to Supabase Pro removes pausing.
- **Data corrupted or deleted:** stop writes (take the console offline), restore the latest good
  backup into a new project, verify the audit chain, notify affected customers (incident policy).
- **GitHub account lost or locked:** recover with the offline recovery codes; meanwhile the site keeps
  serving and code exists locally.
- **Work Mac lost, stolen or dead:** FileVault protects the data; restore secrets from the password
  manager (iCloud Keychain), re-clone the repo. Note: local database backups live on this Mac, so
  until backups also go off-site, losing the Mac loses them; Supabase Pro's managed backups fix this.
- **Founder unavailable (illness, emergency):** emergency access instructions (below).
- **Cloudflare outage:** the domain stops resolving; the GitHub Pages address can serve the site in
  the meantime (the console's database is unaffected).

## Emergency access (single-person company)

The founder keeps a sealed, offline document naming a trusted person and how they reach the
password manager, recovery codes and vendor accounts if the founder is unavailable, and what they
may do (keep the service running, contact customers, nothing else). Review it yearly.
**Status: to be written by the founder (it contains secrets; never in this repository).**

## Testing

- **Restore test:** every quarter, restore the latest backup into an empty database and check row
  counts and the audit chain. First rehearsal: 2026-11-12 (`docs/BACKUPS.md`).
- **Recovery drill:** once a year, walk the full database-loss scenario end to end (new project,
  restore, redeploy) and time it against the RTO. Record it in `docs/reviews/`, using AetherVault's
  own drill evidence report where it fits.
- **Backup monitoring:** the weekly backup posts a macOS notification on failure; the log is checked
  monthly (`docs/compliance/CONTROL_CALENDAR.md`).
