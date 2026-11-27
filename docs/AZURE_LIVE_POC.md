# Live Azure proof of concept (Azure Site Recovery)

The Azure counterpart of `docs/AWS_LIVE_POC.md`: prove the whole chain with **real** Azure Site
Recovery data in our own subscription, before any customer. A server replicates from one Azure
region to another, we run non-disruptive drills, measure recovery time and data loss from the
database itself, and save Azure's real API responses so the collector is built on facts.

> **Status (2026-11-27):** account open (Free Trial, spending limit on); step 2 done (guardrails
> applied, `check` passes). Next: step 3, `up`, with the founder's approval. Order changed by the founder on 2026-11-26: live
> test first, collector and console after (built on the recorded responses).

## Setup

| Item       | Choice                                                                                     | Why                                                                           |
| ---------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Account    | Azure free account, personal card, spending limit **on**                                   | $200 credit; can't charge the card unless upgraded (founder: no upgrade)      |
| Regions    | Source **East US** → recovery **West US 2**                                                | Same shape as the AWS test (Virginia → Oregon)                                |
| Server     | Ubuntu 24.04, `Standard_B2ats_v2`, 32 GiB Standard SSD, no inbound ports                   | In the free account's 750 B-series hours; Site Recovery supports Ubuntu 24.04 |
| Load       | PostgreSQL, one numbered, timestamped row per second (`heartbeat` table)                   | Data loss measured from the database, as in the AWS scale test                |
| Protection | Azure-to-Azure Site Recovery, crash-consistent points every 5 min (fixed), 1 day retention | Microsoft defaults                                                            |
| Drills     | Test failover into an **isolated** VNet (10.30/16, no peering), then cleanup               | Non-disruptive; replication keeps running                                     |
| Targets    | Recovery ≤ 15 min to a working database; data loss ≤ 60 s                                  | Same bar as AWS                                                               |
| Budget     | Alerts at $10 and $25; agent stops and asks at $10; nothing runs without the founder's OK  | Founder, 2026-11-26                                                           |
| Teardown   | Within 21 days of `up` (Site Recovery is free for 31 days per VM, then $25/month)          | Stays inside the free period                                                  |
| Safety net | Daily auto-deallocate of the source VM at 23:00 US Eastern (Azure auto-shutdown)           | Counterpart of the AWS 72-hour self-terminate                                 |

Infrastructure: `infra/accounts/azure` (once: budgets, region and VM-size policies, resource
groups, state storage) and `infra/poc/azure` (the test). Entry point: `scripts/poc/azure-source.sh`.

## Steps

1. **Founder:** open the Azure free account (`docs/MULTICLOUD_ACCOUNT_SETUP.md`, Azure section),
   MFA, `brew install azure-cli`, `az login`.
2. `azure-source.sh check`, then with approval apply `infra/accounts/azure` (budgets, policies,
   resource groups). `check` again: budgets and policies present, providers registered.
3. `up` (plan, then approval), `verify`: PostgreSQL active, rows growing.
4. `enable-replication` (plan, then approval). Record: time to protected, initial sync %, first
   RPO value. **Confirm** the trial accepts Site Recovery; if not, stop and report.
5. Lag record: `status` every few hours for ~24 h (RPO seconds, health, heartbeat); turn off the
   daily auto-shutdown for this window only with approval (`POC_AUTO_SHUTDOWN=off`).
6. `record`: save real protected-item and job responses (private). Confirm the open items below.
7. **Warm-up drill:** `drill` → `jobs` until done → `verify-drill <requested>` → measure →
   `drill-cleanup`. Then **drill 2** the same way, a few hours later.
8. Optional (approval): failover + reprotect + failback rehearsal.
9. `down` (plan, then approval). Next day: check Cost Management for the real cost.

Each drill records: request time, job start/end (Azure's measured time), drill VM running,
PostgreSQL ready, newest row before the request, data loss, PASS/FAIL against 15 min and 60 s.

## Open items the live test must confirm

From the research (`docs/MULTICLOUD_DR.md`), not yet confirmed by Microsoft's docs:

- Site Recovery on free-account credit.
- `scenarioName` values for test failover, cleanup and failover (jobs list).
- `replicationHealth` values beyond `Normal`; A2A protection-state values.
- The test-failover request body the script sends (`failoverDirection`, `networkType`,
  `networkId`, `providerSpecificDetails.instanceType = A2A`).
- That Site Recovery Reader can read everything the collector needs through the
  fabric → container → item path.

## Evidence

_(Filled in during the test: timestamps in UTC, as in `docs/AWS_LIVE_POC.md`.)_

| Time (UTC)        | Step | Result                                                                                                                                                                                  |
| ----------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-27 ~21:2x | 1    | Free account open; `az login`; offer `FreeTrial_2014-09-01`, spending limit On                                                                                                          |
| 2026-11-27 21:3x  | 2    | `infra/accounts/azure` applied (budgets, 2 policies, 3 resource groups, state storage, providers registered); one provider fix (storage data plane); quotas 4 vCPUs per region, Basv2 4 |
