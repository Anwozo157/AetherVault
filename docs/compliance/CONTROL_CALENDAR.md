# Control Calendar

What runs when, who does it and where the evidence goes. For SOC 2 Type II, the auditor samples these
across the observation window, so **missing a beat is a finding**. File each manual check as a dated
record in `docs/reviews/` (template there). Sensitive specifics go to private storage.

## Continuous (automated)

| Control                                                                                           | Evidence                           |
| ------------------------------------------------------------------------------------------------- | ---------------------------------- |
| CI on every push/PR: lint, types, tests, coverage, E2E, CSP, pgTAP, `npm audit`, CodeQL, gitleaks | GitHub Actions history             |
| Branch protection on `main` (required checks, no force push or deletion)                          | GitHub settings                    |
| Dependabot alerts and security updates; secret scanning with push protection                      | GitHub security tab                |
| Product audit log with hash chain; failover two-person rule                                       | Database; pgTAP tests              |
| Weekly database backup with failure notification (Sundays)                                        | `~/Backups/AetherVault/backup.log` |

## Monthly (founder or agent, ~30 minutes)

- Check the backup log: every weekly run succeeded.
- Triage Dependabot PRs and alerts; nothing high/critical left open more than 30 days.
- Check vendor status/incident history for anything that affected us.
- Check cloud bills for surprises (AWS, Supabase).
- Supabase project health (and, on the Free plan, that it isn't about to pause).

## Quarterly (next: 2027-02-14)

- **Access review** (`docs/policies/access-control.md`): every account on GitHub, Supabase, Cloudflare,
  AWS, Resend, email; MFA on each; remove what isn't needed.
- **Endpoint check:** each work device meets the baseline in `acceptable-use.md`.
- **Risk register review**; update scores and treatments.
- **Restore test** of the latest backup (`docs/policies/business-continuity.md`).
- **Security review note** by leadership (the founder): incidents, findings, open actions.
- Review AI agent permissions and stored tokens; rotate tokens past their expiry.

## Yearly (next: by 2027-11-14)

- Policy review and re-approval; acknowledgements re-signed.
- Security awareness training for everyone.
- Full risk assessment, including fraud.
- Incident response tabletop exercise.
- Full recovery drill of AetherVault's own systems against the RTO/RPO.
- Vendor review: obtain each critical vendor's current SOC 2 report.
- Penetration test (once funded) and retest of findings.
- Review the system description and the emergency-access document.

## Event-driven

- Joiners, movers, leavers: access-control policy checklist, same day for leavers.
- Incidents: `docs/incidents/` within the policy timelines.
- New vendor: vendor-management policy check before use.
- Policy exceptions: dated, approved note in `docs/reviews/`.
