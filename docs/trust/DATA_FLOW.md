# What Leaves Your AWS Account

> Customer-facing. DRAFT for review by counsel. Source of truth: `collector/README.md`,
> `collector/terraform/main.tf`, `src/integrations/awsDrs/`. Update this page whenever the collector's
> fields or permissions change. Last checked against the code: 2026-11-15.

## In one sentence

Your servers replicate with **AWS Elastic Disaster Recovery (DRS) inside your own AWS account**. A small,
read-only function that you deploy sends AetherVault a **status summary** once a minute. Your disk data,
credentials and network never reach us.

```
 YOUR AWS ACCOUNT                                                      AETHERVAULT
 ┌──────────────────────────────────────────────────────────┐         ┌────────────────────────┐
 │ Source servers ──(block replication, AWS-managed)──▶ DRS │         │                        │
 │                                                          │         │ Console, alerts,       │
 │ Collector (Lambda, every minute)                         │  HTTPS  │ audit log, evidence    │
 │  · calls drs:DescribeSourceServers only                  ├────────▶│ reports                │
 │  · AWS managed read-only DRS policy                      │  push   │                        │
 │  · you can delete it at any time                         │  only   │ No access back into    │
 └──────────────────────────────────────────────────────────┘         │ your account           │
                                                                      └────────────────────────┘
```

## Exactly what is sent

With each update: your **AWS account ID** and **Region**, the collection time, and the collector version.

Per server:

| Sent                                                               | Never sent                                          |
| ------------------------------------------------------------------ | --------------------------------------------------- |
| DRS source server ID and hostname (or fully qualified domain name) | Disk contents or snapshots                          |
| Replication state (e.g. continuous, backlog, stalled)              | IP addresses, OS details, tags                      |
| Replication lag, backlog bytes, total and replicated bytes, ETA    | AWS access keys, role credentials or session tokens |
| Last-seen time                                                     | Raw error messages                                  |
| DRS error code (code only) and last launch result                  | Anything from servers not registered in DRS         |

Hostnames and account IDs can reveal internal naming; how they are protected is set by the
confidentiality terms of your agreement [counsel to confirm wording; `DATA_INVENTORY.md` Q3].
Servers replicating back to you during failback are not reported. Health and the data-loss target (RPO)
are computed by AetherVault's database from these fields; the
collector's own judgement is not trusted.

## Permissions

- The collector's role has the AWS managed policy `AWSElasticDisasterRecoveryReadOnlyAccess` plus basic
  Lambda logging. It **cannot** launch, stop, change or delete anything.
- AetherVault needs **no IAM role, user or credentials in your account** for monitoring, and no inbound
  network path.
- The collector authenticates to AetherVault with an ingest token you create in the console. We store
  only a SHA-256 hash of it; you can revoke or rotate it at any time.

## You stay in control

- **Inspect it:** the collector source and Terraform are available for review before you deploy.
- **Turn it off:** `terraform destroy` (or delete the Lambda) stops all data flow immediately; revoking
  the token stops it from our side.
- **Recovery actions** (drills and failovers) are launched in your DRS console. AetherVault schedules,
  tracks and records them, and requires a requester and a different approver.
- **Cost:** about 43,200 Lambda runs a month, which fits in the Lambda free tier; logs are kept 14 days.

## What AetherVault itself stores

Users' email addresses, what your team enters (organization, roles, recovery targets, runbooks, notes),
the audit log, and the status summaries above. Details, retention and sub-processors:
[data inventory](../legal/DATA_INVENTORY.md), [sub-processors](../legal/SUBPROCESSORS.md).
