# Security Questionnaire: Standard Answers

> Honest, reusable answers to the questions pilot customers usually send (a short vendor security
> questionnaire). Copy answers into the customer's form; adjust only to make them more precise, never
> more favorable. Customer-facing summary: `docs/legal/SECURITY_OVERVIEW_DRAFT.md`.
> Last updated: 2026-11-14. Review with every policy change and before sending.

**Rules for answering:** say "no" or "in progress" when that's the truth; never claim SOC 2, ISO 27001
or any certification until the report exists; don't disclose internal details (account settings, open
findings, credentials) in a questionnaire. Offer a call instead.

## Company and compliance

| Question                                       | Answer                                                                                                                                                                           | Evidence                      |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Do you have a SOC 2 report?                    | **Not yet.** We run a SOC 2 program scoped to Security and Availability and are preparing for an independent audit. We can share our policies and a security overview under NDA. | `docs/SOC2_PROGRAM_PROMPT.md` |
| Other certifications (ISO 27001, HIPAA, etc.)? | No. AetherVault is not designed or offered for health data (HIPAA).                                                                                                              | n/a                           |
| Penetration test?                              | **Not yet**; a third-party test of the web app and database API is planned before general availability. Automated security testing runs on every change.                         | CI history                    |
| Written security policies?                     | Yes: information security, acceptable use, access control, change management, incident response, vendor management, business continuity/DR, data management, risk management.    | `docs/policies/`              |
| Who is responsible for security?               | The founder acts as security officer.                                                                                                                                            | `docs/compliance/ROLES.md`    |
| Cyber / E&O insurance?                         | [Answer once bound: carrier, limits, COI available on request.]                                                                                                                  | Certificate of insurance      |

## Data

| Question                                 | Answer                                                                                                                                                                                                                                                   | Evidence                           |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| What customer data do you store?         | Users' email addresses; what your team enters (organization, roles, recovery targets, runbooks, notes); an audit log of actions; replication status your collector sends (server identifiers, states, lag). No server contents, no backups of your data. | `docs/legal/DATA_INVENTORY.md`     |
| Where is it stored?                      | Supabase (PostgreSQL) in AWS us-east-1, United States.                                                                                                                                                                                                   | `docs/legal/SUBPROCESSORS.md`      |
| Encryption in transit?                   | Yes, TLS for all traffic (HTTPS enforced).                                                                                                                                                                                                               | `docs/SECURITY.md`                 |
| Encryption at rest?                      | Yes, AES-256 by our database provider, per-project keys in hardware security modules; alert secrets additionally encrypted in Supabase Vault.                                                                                                            | `docs/policies/data-management.md` |
| Sub-processors?                          | Supabase (database, sign-in), Resend (sign-in email), Cloudflare (domain, DNS, email forwarding). GitHub hosts the website (no customer data).                                                                                                           | `docs/legal/SUBPROCESSORS.md`      |
| Data retention and deletion?             | Kept while you're a customer; deleted within 30 days of a written request after the contract ends. Backups age out on the provider's schedule.                                                                                                           | `docs/policies/data-management.md` |
| Do you sell or use data for AI training? | No. No analytics, advertising or trackers.                                                                                                                                                                                                               | Privacy notice draft               |
| Do you access our AWS account?           | No. Your own read-only collector pushes status to us; we hold no credentials or roles in your account.                                                                                                                                                   | `docs/SECURITY.md` (threat model)  |

## Access control

| Question                       | Answer                                                                                                                   | Evidence                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| How do users sign in?          | Email one-time links (no passwords stored). SSO/SAML: not yet available.                                                 | `docs/ARCHITECTURE.md`            |
| Roles and least privilege?     | Viewer, operator, approver, admin, enforced in the database by row-level security; tested automatically on every change. | pgTAP tests in CI                 |
| Two-person control?            | Yes: a failover needs a requester and a different approver, enforced by a database constraint.                           | `docs/SECURITY.md`                |
| Audit logging?                 | Every action is written to an append-only, SHA-256 hash-chained audit log; any member can verify it; exportable.         | Audit Log tab                     |
| Staff access to customer data? | No standing access. Support access only at your request, time-limited and recorded.                                      | `docs/policies/access-control.md` |
| MFA for your staff?            | Required by policy on every company account; checked in quarterly access reviews.                                        | `docs/policies/access-control.md` |
| Access reviews / offboarding?  | Quarterly access reviews; same-day removal for leavers.                                                                  | `docs/reviews/`                   |

## Secure development and operations

| Question                  | Answer                                                                                                                                                                                              | Evidence                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Change management?        | All changes through git branches; required automated checks (unit, end-to-end, database security tests, static analysis, secret scanning, dependency audit) before merge; founder-approved deploys. | `docs/policies/change-management.md`   |
| Vulnerability management? | Dependabot, CodeQL and secret scanning with push protection; high/critical issues fixed within 30 days.                                                                                             | Monthly checks in `docs/reviews/`      |
| Browser-side protections? | Strict Content-Security-Policy (no inline scripts, connections only to our own origins).                                                                                                            | CSP test in CI                         |
| Backups and recovery?     | Database backups encrypted at rest; restores tested (latest drill 2026-11-14: about 2 minutes to a verified restore). Managed daily backups with a paid database plan [state once active].          | `docs/BACKUPS.md`                      |
| Business continuity / DR? | Written plan for our own systems with recovery time and data-loss targets per component, tested yearly.                                                                                             | `docs/policies/business-continuity.md` |
| Availability / SLA?       | [Only after the SLA is signed and uptime monitoring is live; until then: "no contractual SLA during the pilot".]                                                                                    | `docs/legal/SLA_DRAFT.md`              |
| Incident response?        | Written plan with severity levels; customers notified within 72 hours of confirming an incident affecting their data; yearly exercise.                                                              | `docs/policies/incident-response.md`   |
| Security contact?         | security@getaethervault.com; GitHub private vulnerability reporting. Acknowledged within 3 business days.                                                                                           | `docs/SECURITY.md`                     |

## Things to say plainly in a pilot

- Replication telemetry is real only when your collector is connected; anything simulated is labeled.
- AetherVault reads AWS Elastic Disaster Recovery status; launches happen in your AWS console.
- Recovery time in drill reports comes from a simulated stage model and is labeled as such.
