# Data Inventory (for counsel and customer security reviews)

> DRAFT for review by counsel. Not legal advice. Built from the code on 2026-11-14 (task T3 in
> `docs/LEGAL_PREP_PROMPT.md`). Source of truth: `supabase/migrations/*.sql`,
> `src/integrations/awsDrs/snapshot.ts`, `docs/policies/data-management.md`. Update when the schema changes.

## Where data lives

| Place                                   | What                                                                | Region              | Notes                                                                                            |
| --------------------------------------- | ------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------ |
| Supabase (production project)           | All customer data below, sign-in accounts (`auth` schema), Vault    | AWS us-east-1 (USA) | Encrypted at rest and in transit by Supabase. Free plan today: no managed backups, no uptime SLA |
| Supabase platform logs                  | API and auth request logs, including IP addresses and user agents   | USA                 | Kept by Supabase per plan; we don't export them                                                  |
| Resend                                  | Recipient email address and the sign-in email                       | USA (us-east-1)     | Sending only; Resend keeps delivery logs per its terms                                           |
| Founder's Mac (`~/Backups/AetherVault`) | Weekly full database dump, including `auth` (emails) and all tables | Founder's laptop    | FileVault-encrypted disk, owner-only file permissions, newest 8 kept (`docs/BACKUPS.md`)         |
| Customer's Slack / PagerDuty            | Alert messages the customer configured                              | Customer's choice   | Leaves our control once delivered                                                                |
| Customer's AWS account                  | Collector, its logs (14 days), DRS itself and the replicated disks  | Customer's choice   | Ours to design, theirs to run. **AetherVault never receives disk data or AWS credentials**       |
| Public website and simulated demo       | Nothing                                                             | GitHub Pages        | No analytics, no cookies, no forms that store data                                               |

## Data categories

"Personal" = identifies or relates to a person (likely personal data/information under privacy laws).

| Table / source               | Fields                                                                                                                                                                                                         | Personal?                                        | Kept                                     | Deleted by                                       |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------- | ------------------------------------------------ |
| `auth.users` (Supabase Auth) | Email, user ID, sign-in timestamps, auth metadata                                                                                                                                                              | **Yes**                                          | Until the account is deleted             | Supabase admin (no self-service delete today)    |
| `orgs`                       | Organization name                                                                                                                                                                                              | No (company data)                                | Life of the account                      | With the org                                     |
| `memberships`                | Org, user ID, role                                                                                                                                                                                             | **Yes** (linked to a user)                       | Until removed                            | Admin removes the member                         |
| `org_invites`                | **Invitee email**, role, who invited, timestamps                                                                                                                                                               | **Yes**                                          | Kept after acceptance/revocation         | With the org                                     |
| `audit_log`                  | Actor (user ID), action, detail, timestamps, hash chain. **Detail includes emails** for member invited/joined/removed events                                                                                   | **Yes**                                          | Append-only, cannot be edited            | Only by deleting the whole org (see question Q1) |
| `failover_runs`              | Regions, requester/approver/aborter user IDs, timestamps, replication and runbook snapshots at launch                                                                                                          | **Yes** (user IDs)                               | Life of the account                      | With the org                                     |
| `runbooks`, `runbook_checks` | Runbook steps, checklist notes (free text), who updated                                                                                                                                                        | Possibly (free-text notes, user IDs)             | Life of the account                      | With the org                                     |
| `drill_schedules`            | Cadence, regions, who updated                                                                                                                                                                                  | User ID only                                     | Life of the account                      | With the org                                     |
| `alert_channels`             | Kind (Slack/PagerDuty), name, Vault secret reference (webhook URL / routing key), hint, events                                                                                                                 | No (secrets encrypted in Vault)                  | Until removed                            | Admin deletes the channel                        |
| `alert_deliveries`           | Channel, event, title, status, HTTP result, error                                                                                                                                                              | No                                               | Life of the account                      | With the org                                     |
| `ingest_tokens`              | SHA-256 hash of the collector token, hint, who created, last used                                                                                                                                              | No                                               | Until revoked                            | Admin revokes                                    |
| `replication_snapshots`      | **Customer AWS account ID**, region, collector version, counts, lag, backlog, RPO result; per server: DRS server ID, **hostname** (or FQDN), state, lag, bytes, ETA, last seen, error code, last launch result | Hostnames can reveal names; mostly business data | **7 days** (pruned on each new snapshot) | Automatically                                    |
| `replication_state`          | Org, RPO met, changed at                                                                                                                                                                                       | No                                               | Life of the account                      | With the org                                     |

**Not collected:** passwords (sign-in is by emailed one-time link), payment data, IP addresses in our own
tables, disk contents, OS details, tags, AWS credentials, analytics or tracking data.

## Questions this raises for counsel

- **Q1. Deletion vs. tamper-evident audit log.** The audit log is append-only and hash-chained (that is a
  security feature customers buy). Member emails are written into it. A single person's deletion request
  can't be honored without breaking the chain; today only the whole org is deleted. Is that acceptable
  under the privacy laws and contracts that apply, and how should the privacy notice, DPA and terms
  describe it? (Engineering option: log user IDs only and resolve emails at display time, so erasing the
  user record removes the email; needs a migration.)
- **Q2. Backups.** Weekly full dumps on the founder's laptop include customer emails for 8 weeks. How
  should deletion requests and the retention promise cover backups?
- **Q3. Hostnames and AWS account IDs** from customers' servers: confidential customer information in
  the DPA/terms; any sector rules if a customer is a telecom provider?
- **Q4. Region.** All data is in the USA (Supabase us-east-1). What to say to non-US users or customers.
