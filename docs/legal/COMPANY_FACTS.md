# Company Fact Sheet (public facts for counsel)

> DRAFT for review by counsel. Not legal advice. 2026-11-14 (task T2 in `docs/LEGAL_PREP_PROMPT.md`).
> Only facts that are already public or harmless. Ownership, entity, accounts and personal details are
> in the founder's private workspace.

## Business

- **Company name used:** Aegis Core Labs. **Product:** AetherVault. **Website:** https://getaethervault.com.
  Legal entity status: founder to confirm (private).
- **What we sell:** a disaster-recovery command center for servers protected by AWS Elastic Disaster
  Recovery (DRS) in the customer's own AWS account: two-person approval for failover, tamper-evident audit
  log, scheduled drills with evidence reports, runbooks, live replication status, Slack/PagerDuty alerts.
  Planned delivery is a managed service: we help set up DRS in the customer's account (`docs/PILOT_DAY.md`).
- **Stage:** pre-revenue. First customer pilot planned (one physical server; `docs/PILOT_DAY.md`).
  Seed round planned. Pricing not final (deck tiers $2,500 / $7,500 / $25,000+ per month; see
  `CLAIMS_AUDIT.md`).
- **People:** the founder; AI coding agents do most of the implementation under `AGENTS.md` (`AI_TOOLS.md`).

## What is real today vs. simulated

| Real                                                                                  | Simulated or not yet built                                                                                          |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Sign-in, organizations, roles, invites                                                | The public demo's replication telemetry and failover (labeled simulated)                                            |
| Two-person failover approval (records the decision; doesn't execute a cloud failover) | Recovery time (RTO) in drill reports: a stage model, labeled                                                        |
| Append-only, hash-chained audit log with verification                                 | Cross-cloud (GCP, Azure) failover                                                                                   |
| Drill scheduling and evidence reports with measured data loss (RPO)                   | Live AWS replication data: collector built and deployed in a test, waiting on AWS to enable DRS in our test account |
| Runbooks, Slack/PagerDuty alerts                                                      | AetherVault launching recovery instances itself (customer launches in DRS)                                          |
| Read-only AWS DRS collector the customer deploys with our Terraform                   |                                                                                                                     |

## Where the details are

| Topic                                         | File                                                       |
| --------------------------------------------- | ---------------------------------------------------------- |
| System, boundaries, customer responsibilities | `docs/compliance/SYSTEM_DESCRIPTION.md`                    |
| Personal and customer data, retention         | `DATA_INVENTORY.md`                                        |
| Sub-processors and their terms                | `SUBPROCESSORS.md`; internal: `docs/compliance/VENDORS.md` |
| AI tools and their terms                      | `AI_TOOLS.md`                                              |
| Open-source licenses, our own LICENSE         | `OSS_LICENSES.md`                                          |
| Public claims                                 | `CLAIMS_AUDIT.md`                                          |
| Security controls                             | `docs/SECURITY.md`, `docs/policies/`                       |
| Customer-facing drafts                        | `PRIVACY_NOTICE_DRAFT.md`, `SLA_DRAFT.md`                  |
