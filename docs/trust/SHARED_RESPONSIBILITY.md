# Shared Responsibility

> Customer-facing. DRAFT for review by counsel. Who does what when AetherVault runs disaster recovery on
> AWS Elastic Disaster Recovery (DRS) in your account. Last updated 2026-11-15. The pilot agreement must
> match this table (matter L4 in `docs/LEGAL_PREP_PROMPT.md`).

AWS operates DRS and the infrastructure under it; AetherVault plans, monitors, controls and records
recovery; you own your AWS account, servers and the final decision to fail over.

| Area                                                      | You (customer)                                           | AetherVault                                                                            | AWS                          |
| --------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------- |
| AWS account, billing, root and IAM users                  | **Owns**                                                 | Never holds your credentials                                                           | Provides                     |
| DRS replication agent on source servers                   | Installs (or approves install) and keeps servers patched | Provides steps and checks (`docs/PILOT_DAY.md`)                                        | Builds and updates the agent |
| Replication itself (block-level copy, staging area)       | Pays for the AWS resources                               | Monitors lag and health; alerts when the data-loss target is at risk                   | **Operates**                 |
| Collector (read-only status function)                     | Deploys it in your account; can remove it any time       | Builds, documents and supports it; stores only a hash of its token                     | Runs Lambda                  |
| Recovery targets (RPO/RTO), runbooks, contacts            | Sets targets and approves runbooks                       | Stores targets and versioned runbooks; measures replication lag against the RPO target |                              |
| Recovery drills                                           | Approves each drill; launches in DRS (or authorizes us)  | Schedules, tracks and records evidence; requires a requester and a different approver  |                              |
| Failover decision                                         | **Decides**                                              | Enforces two-person approval; records every step in the audit log                      | Launches recovery instances  |
| Network, security groups, DNS cut-over in recovery Region | Owns and approves                                        | Documents the steps in runbooks                                                        |                              |
| AetherVault console, database, sign-in, audit log         | Manages your users and roles                             | **Operates and secures**                                                               | (via our sub-processors)     |
| Incidents                                                 | Tells us about suspected issues                          | Notifies you per the incident policy                                                   | Notifies per AWS terms       |

## Pilot access model (founder decides before the first pilot)

- **Option A (default, no access):** your engineer runs the deployment and launch steps with us on a call.
  AetherVault has no role or credentials in your account.
- **Option B (temporary role):** you create an IAM role AetherVault can assume for set-up only, with an
  expiry date, logged in your CloudTrail, removed at the end of set-up.

If Option B is used, the questionnaire answer "Do you access our AWS account?" must change from "No" to
describe the role, its permissions and its expiry.
