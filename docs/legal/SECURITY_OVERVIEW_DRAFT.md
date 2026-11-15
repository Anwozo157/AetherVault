# AetherVault Security Overview (DRAFT for customers)

> DRAFT for review by counsel. Not legal advice. Not in effect. For customer security reviews; every
> statement must stay true (source: `docs/SECURITY.md`, `docs/compliance/SYSTEM_DESCRIPTION.md`).
> Deliberately leaves out internal details (credentials, open gaps, account settings).

## Architecture

- AetherVault is a web console backed by a managed PostgreSQL database (Supabase, US East). We run no
  servers of our own.
- Your servers replicate with **AWS Elastic Disaster Recovery in your own AWS account**. Disk data never
  passes through AetherVault, and we never hold your AWS credentials.
- The replication collector runs in your account with AWS's managed **read-only** DRS policy. It pushes
  status to us; we need no inbound access to your network.

## Access control

- Sign-in by one-time email link; no passwords stored by us.
- Roles per organization (admin, approver, operator, viewer), enforced in the database with row-level
  security and role-checked functions, not only in the browser.
- **Failover requires two different people**, enforced by a database constraint.

## Integrity and evidence

- Every action is written to an **append-only, SHA-256 hash-chained audit log**; any member can verify
  the chain, and edits are detected.
- Drill and failover evidence reports carry a SHA-256 fingerprint.

## Data protection

- Encrypted in transit (HTTPS) and at rest (provider-managed).
- Alert secrets (Slack webhook URLs, PagerDuty keys) are encrypted in a secrets vault and never sent to
  the browser.
- Collector tokens are stored only as SHA-256 hashes and can be revoked any time.
- Data inventory, retention and sub-processors: `DATA_INVENTORY.md`, `SUBPROCESSORS.md`.

## Secure development

- Every change runs automated checks: linting, type checking, unit and database tests, end-to-end
  browser tests, dependency audit, static analysis (CodeQL) and a secret scan of the full history.
- Strict Content-Security-Policy on the web app (no inline or third-party scripts).
- Changes are made on branches and merged only after checks pass.

## Incidents and reporting

- We notify affected customers without undue delay and within [72 hours] of confirming an incident that
  affects their data.
- Report vulnerabilities to security@getaethervault.com or through GitHub private vulnerability reporting.

## Compliance status

SOC 2 readiness work is under way. **We do not have a SOC 2 report yet** and will say so until one is
issued by an independent auditor.
