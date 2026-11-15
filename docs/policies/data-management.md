# Data Management Policy (classification, retention, encryption)

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly

## Classification

| Class            | Examples                                                                                                                          | Handling                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Secret**       | Passwords, API keys, database password, `service_role` key, collector tokens, webhook URLs, recovery codes                        | Password manager / Keychain / platform secret store only. Never in git, chat, docs or logs.                                       |
| **Confidential** | Customer data: user emails, org names, failover runs, audit log, runbooks, drill evidence, replication status (server names, lag) | Stored only in the production database (encrypted at rest); access per `access-control.md`; backups readable only by the founder. |
| **Internal**     | Business plans, pricing, unpublished findings, vendor contracts, access review specifics                                          | Company accounts and private storage; not in this public repository.                                                              |
| **Public**       | Website, public demo, this repository, the Supabase anon key                                                                      | No restrictions; still accurate and honest.                                                                                       |

## Collection

We collect only what the service needs: users' email addresses (sign-in), what customers enter
(org names, runbooks, targets), actions (audit log), and replication status pushed by the customer's
own collector (server identifiers, states, lag). No analytics, trackers or advertising.

## Encryption

- **In transit:** HTTPS/TLS everywhere (GitHub Pages enforces HTTPS; Supabase over TLS; collector
  posts over HTTPS).
- **At rest:** Supabase encrypts database data and backups with AES-256, with per-project keys in
  FIPS 140-2 hardware security modules (per Supabase's security documentation). Alert secrets are
  additionally encrypted in Supabase Vault. Local backups sit on a FileVault-encrypted disk in a
  folder readable only by the founder.

## Retention and deletion

| Data                         | Kept                                        | Deleted                                                                                                                            |
| ---------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Customer org data, audit log | For the life of the customer's subscription | Within 30 days of a written request after the contract ends; the audit log is append-only, so the org's data is removed as a whole |
| Local database backups       | Newest 8 weekly copies                      | Older copies deleted automatically by the backup script                                                                            |
| Supabase managed backups     | Per plan (7 days on Pro)                    | By Supabase                                                                                                                        |
| Alert delivery log           | As long as the org exists                   | With the org                                                                                                                       |
| Incident and review records  | At least 7 years (audit evidence)           | After 7 years                                                                                                                      |

Deleting a Supabase project destroys its encryption keys, which makes its data unreadable.

## Customer data in development

Development and tests use seeded fake data and local databases. Real customer data is never copied
to a laptop except in the encrypted, access-restricted backups described above.
