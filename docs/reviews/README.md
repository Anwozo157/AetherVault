# Review records

Dated evidence that recurring controls ran (`docs/compliance/CONTROL_CALENDAR.md`). One file per
review: `YYYY-MM-DD-what.md`, from [TEMPLATE.md](TEMPLATE.md).

This repository is public. Records here are **generic**: what was checked, how many findings, and that
they're tracked. Specifics (account names and IDs, personal emails, which settings were off, open
vulnerabilities) are kept in private storage and referenced, not copied.

| Date       | Review                                                                                     | Findings                                      |
| ---------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| 2026-11-12 | Restore rehearsal (`docs/BACKUPS.md`)                                                      | Passed                                        |
| 2026-11-14 | [Initial access, endpoint and vendor review](2026-11-14-initial-access-endpoint-review.md) | 7 founder actions open (private)              |
| 2026-11-14 | [Monthly control check](2026-11-14-monthly-check.md)                                       | 2 (private); next 2026-12-14                  |
| 2026-11-14 | [Recovery drill (database)](2026-11-14-recovery-drill.md)                                  | 1, fixed in the restore procedure             |
| 2026-11-15 | [MFA remediation](2026-11-15-mfa-remediation.md)                                           | MFA on 4 of 5 accounts; 1 blocked by provider |
