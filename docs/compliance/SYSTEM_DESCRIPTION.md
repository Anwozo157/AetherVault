# System Description (draft)

> Draft of management's description of the system, the part of a SOC 2 report the company writes
> (AICPA description criteria DC 200). The auditor tests our controls against it. Keep it accurate;
> update it when the product or vendors change. Last updated: 2026-11-14.

## 1. Company and services

Aegis Core Labs builds **AetherVault**, a disaster-recovery (DR) command center. Customers use it to:

- request and approve failovers with a **two-person rule**;
- keep a **tamper-evident audit log** of every action (append-only, SHA-256 hash-chained);
- set recovery objectives (RTO/RPO), run scheduled **DR drills** and produce **evidence reports**;
- keep a versioned **DR runbook** with per-run checklists;
- see **live replication status** from AWS Elastic Disaster Recovery, pushed by a read-only collector
  the customer runs in their own AWS account;
- receive **alerts** in their Slack or PagerDuty.

AetherVault does not itself launch recovery instances in a customer's cloud today; launches happen in
the customer's AWS console. Recovery time in drill reports comes from a simulated stage model and is
labeled as such.

## 2. Service commitments and system requirements

To customers (to be formalized in the terms and SLA, `docs/legal/`):

- Customer data is accessible only to members of the customer's organization, according to their roles.
- Dangerous actions (failover) require two different people.
- Every action is recorded in an audit log that cannot be silently altered.
- Customer data is encrypted in transit and at rest.
- Security incidents affecting customer data are reported to the customer within 72 hours of
  confirmation.
- Availability target and support terms: defined in the SLA (draft).

## 3. System components

**Infrastructure** (all managed services; no company-owned servers or offices):

| Component                             | Provider                                                            | Region / notes                              |
| ------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| Static web app (site + console)       | GitHub Pages                                                        | `getaethervault.com`, HTTPS enforced        |
| Database, auth, realtime, cron, Vault | Supabase                                                            | AWS us-east-1                               |
| DNS, registrar, email routing         | Cloudflare                                                          |                                             |
| Sign-in email                         | Resend (SMTP)                                                       | sender `no-reply@getaethervault.com`        |
| Replication collector                 | Customer's AWS account (Lambda + EventBridge, read-only DRS policy) | Deployed by the customer with our Terraform |

**Software:** React/TypeScript single-page app; PostgreSQL schema with row-level security and
role-checked `SECURITY DEFINER` functions (all schema changes are versioned migrations); collector
Lambda (TypeScript). Source: this repository. Architecture: `docs/ARCHITECTURE.md`.

**People:** the founder (all company roles today; see `ROLES.md`). AI coding agents assist under
`AGENTS.md`.

**Procedures:** the policies in `docs/policies/` and the schedule in `CONTROL_CALENDAR.md`.

**Data:** see `docs/policies/data-management.md`: users' emails, organization settings, failover runs,
audit log, runbooks and checklists, drill evidence, replication snapshots, alert settings (secrets
in Vault), alert delivery log.

## 4. Boundaries

**In scope:** the AetherVault web app and console, the production Supabase project, the collector code
and Terraform we provide, DNS/email for `getaethervault.com`, the source repository and CI, and the
company processes and people that operate them.

**Out of scope:** the customer's own servers, AWS accounts, DRS configuration, network, and the
collector once deployed in their account; the customer's Slack/PagerDuty; the public simulated demo
(no customer data).

## 5. Subservice organizations (carved out)

| Organization | Service                          | Controls we expect from them (CSOCs)                                                                                                                    |
| ------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supabase     | Database hosting, auth           | Physical and environmental security; encryption at rest; infrastructure patching; backups (Pro plan); restricting their staff's access to customer data |
| GitHub       | Code hosting, CI, static hosting | Physical security; availability of Pages; integrity of Actions runners; access control to repositories                                                  |
| Cloudflare   | DNS, registrar, email routing    | DNS availability and integrity; physical security                                                                                                       |

## 6. Complementary user entity controls (what customers must do)

Customers are responsible for:

- inviting only the right people and removing leavers promptly; assigning at least two people who can
  approve failovers;
- protecting their own email accounts (sign-in links go there), ideally with MFA;
- securing their AWS account, the collector deployment and the collector token (store it in a
  password manager; revoke it if exposed);
- configuring DRS correctly and running the recovery launches themselves;
- reviewing drill evidence and audit logs, and reporting suspected issues to security@getaethervault.com;
- keeping their Slack/PagerDuty alert destinations secure.

## 7. Changes during the period / incidents

None yet. Record significant changes and any security incidents here for each report period.
