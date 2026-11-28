# Live Azure proof of concept (Azure Site Recovery)

The Azure counterpart of `docs/AWS_LIVE_POC.md`: prove the whole chain with **real** Azure Site
Recovery data in our own subscription, before any customer. A server replicates from one Azure
region to another, we run non-disruptive drills, measure recovery time and data loss from the
database itself, and save Azure's real API responses so the collector is built on facts.

> **Status (2026-11-28 00:35 UTC):** protected (North Central US → West US 2) and three drills run.
> **Recovery: 3:55, 3:57, 3:56 (PASS, target 15 min). Data loss: 306.7 s, 243.9 s, 374.8 s
> (FAIL, target 60 s).** Replication left running (free until day 31; teardown by 2026-12-18).
> Next: 24 h lag record, spaced drills, the "Latest (lowest RPO)" question, failback rehearsal.

| Drill                          | Requested (UTC)  | Azure job | Working DB | Recovery | Data loss | Result      |
| ------------------------------ | ---------------- | --------- | ---------- | -------- | --------- | ----------- |
| Warm-up                        | 2026-11-27 23:46 | 3:10      | 3:55       | PASS     | 306.7 s   | PASS / FAIL |
| 2                              | 2026-11-28 00:05 | 3:19      | 3:57       | PASS     | 243.9 s   | PASS / FAIL |
| 3 (Latest, lowest RPO; portal) | 2026-11-28 00:27 | 3:15      | 3:56       | PASS     | 374.8 s   | PASS / FAIL |

Why data loss fails: test failover through the API uses the latest _processed_ recovery point, and
Azure creates crash-consistent points only every 5 minutes, so loss is roughly the RPO (~1–2 min)
plus up to 5 minutes. Drills 3 and 4 tried the portal's "Latest (lowest RPO)": both recovered from the ordinary 5-minute
point (job records), with high and with low lag, so on test failover it gives no gain.
**Server-level Azure Site Recovery is stuck at minutes of data loss.**

**Database-level tier (experiment B, `infra/poc/azure/db-standby.tf`):** a PostgreSQL streaming
standby in West US 2 next to Site Recovery. Two promote drills: **data loss 0.27 s and 0.17 s (no
rows lost), promote to writable 0.28 s and 0.30 s.** Caveats: async replication (a few hundred ms can
be lost); promote is manual here (no failure detection or app reconnect measured); the standby
is a second always-on VM (~$0.01/h list, inside the free B-series hours here).

## Setup

| Item       | Choice                                                                                                        | Why                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Account    | Azure free account, personal card, spending limit **on**                                                      | $200 credit; can't charge the card unless upgraded (founder: no upgrade)                                       |
| Regions    | Source **North Central US** → recovery **West US 2**                                                          | East US is closed to this free trial (`NotAvailableForSubscription`, 2026-11-27); still cross-country          |
| Server     | Ubuntu 24.04, `Standard_B2ats_v2`, 32 GiB Standard SSD, no inbound ports; kernel pinned to `6.8.0-1070-azure` | In the free account's 750 B-series hours; the pin keeps the kernel on the Site Recovery agent's supported list |
| Load       | PostgreSQL, one numbered, timestamped row per second (`heartbeat` table)                                      | Data loss measured from the database, as in the AWS scale test                                                 |
| Protection | Azure-to-Azure Site Recovery, crash-consistent points every 5 min (fixed), 1 day retention                    | Microsoft defaults                                                                                             |
| Drills     | Test failover into an **isolated** VNet (10.30/16, no peering), then cleanup                                  | Non-disruptive; replication keeps running                                                                      |
| Targets    | Recovery ≤ 15 min to a working database; data loss ≤ 60 s                                                     | Same bar as AWS                                                                                                |
| Budget     | Alerts at $10 and $25; agent stops and asks at $10; nothing runs without the founder's OK                     | Founder, 2026-11-26                                                                                            |
| Teardown   | Within 21 days of `up` (Site Recovery is free for 31 days per VM, then $25/month)                             | Stays inside the free period                                                                                   |
| Safety net | Daily auto-deallocate of the source VM at 23:00 US Eastern (Azure auto-shutdown)                              | Counterpart of the AWS 72-hour self-terminate                                                                  |

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

- ~~Site Recovery on free-account credit~~ Confirmed 2026-11-27: it works.
- ~~`scenarioName` values~~ Confirmed 2026-11-27: `EnableDr`, `PrimaryIrCompletion`, `SecondaryIrCompletion`, `TestFailover`, `TestFailoverCleanup`, `DisableDr`, `UpdateVmProperties`.
- `replicationHealth` values beyond `Normal`; A2A protection-state values.
- ~~The test-failover request body~~ Confirmed 2026-11-27 (null `recoveryPointId` = latest _processed_ point). Open: whether the API can do the portal's "Latest (lowest RPO)".
- (was) The test-failover request body the script sends (`failoverDirection`, `networkType`,
  `networkId`, `providerSpecificDetails.instanceType = A2A`).
- That Site Recovery Reader can read everything the collector needs through the
  fabric → container → item path.

## Findings

1. **Free trial regions (2026-11-27).** East US, East US 2, Central US, West US, West US 3, South
   Central US and Canada Central refuse every small VM size for this subscription
   (`NotAvailableForSubscription`, location-wide). North Central US, West Central US, Canada East
   and West US 2 (non-zonal) allow `Standard_B2ats_v2`. Source moved to North Central US.
2. **Kernel newer than the Site Recovery agent (2026-11-27).** Microsoft's current Ubuntu 24.04
   image boots `7.0.0-1020-azure`; the agent Azure installed (9.68.7978.1) supports up to
   `7.0.0-1017-azure`, so enabling protection failed with error **151141** after ~15 minutes and left
   an `EnablingFailed` item in the vault (removed with the `remove` operation). The next agent build
   (9.68.7991.1) already lists 7.0.0-1020. Fix: cloud-init pins `6.8.0-1070-azure` (on 9.68.7978.1's
   list) and holds kernel packages. **Product lesson:** a customer's routine kernel update can
   silently break protection; AetherVault should compare each protected VM's kernel with Microsoft's
   published list (`Azure/Azure-SiteRecovery`, `MobilityAgent/AzureToAzure/SupportedKernels`).

3. **Role assignment lost on a same-name re-create (2026-11-28).** Re-creating the state storage
   account under the same name (region move) left Terraform recording a new Storage Blob Data
   Contributor assignment that Azure no longer had (`RoleAssignmentNotFound`); likely the old
   account's asynchronous cleanup removed it. Found when the state migration got 403
   `AuthorizationPermissionMismatch`; re-created and imported. Lesson: after replacing a resource
   with the same name, re-check its role assignments.

## Evidence

_(Filled in during the test: timestamps in UTC, as in `docs/AWS_LIVE_POC.md`.)_

| Time (UTC)             | Step | Result                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-27 ~21:2x      | 1    | Free account open; `az login`; offer `FreeTrial_2014-09-01`, spending limit On                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-11-27 21:3x       | 2    | `infra/accounts/azure` applied (budgets, 2 policies, 3 resource groups, state storage, providers registered); one provider fix (storage data plane); quotas 4 vCPUs per region, Basv2 4                                                                                                                                                                                                                                                             |
| 2026-11-27 22:1x       | –    | Region move: source North Central US (East US closed to the trial); account baseline re-applied                                                                                                                                                                                                                                                                                                                                                     |
| 2026-11-27 22:24       | 3    | `up`: VM created in 50 s; heartbeat writing at 22:25:21                                                                                                                                                                                                                                                                                                                                                                                             |
| 2026-11-27 22:35–22:41 | 4    | `EnableDr` **failed**: error 151141, kernel `7.0.0-1020-azure` not supported by agent 9.68.7978.1; failed item removed (`DisableDr` 22:49)                                                                                                                                                                                                                                                                                                          |
| 2026-11-27 22:52       | 3    | VM rebuilt with kernel pin; running `6.8.0-1070-azure`, heartbeat writing at 22:53                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-11-27 22:55–23:25 | 4    | `EnableDr` 22:55–23:05, initial sync done 23:23:40 (`SecondaryIrCompletion`); **Protected, health Normal, RPO 105 s** (23:22:43). Only health warning: 161011 "no test failover yet". Site Recovery works on the free trial                                                                                                                                                                                                                         |
| 2026-11-27 23:22–23:43 | 5    | RPO recalculated every ~10 min: 105 s, 111 s. Recovery points every 5 min at :x0:58 / :x5:58                                                                                                                                                                                                                                                                                                                                                        |
| 2026-11-27 23:46:05    | 7    | **Warm-up drill:** test failover requested; Azure job `TestFailover` 23:46:10–23:49:20 (3 min 10 s); drill VM answered with PostgreSQL active at 23:50:00. **Recovery 3 min 55 s: PASS.** Newest row 23:40:58.329 (the 23:40:58 point; the 23:45:59 point was 6 s old and not yet processed). **Data loss 306.7 s: FAIL**                                                                                                                           |
| 2026-11-27 23:50       | 7    | `TestFailoverCleanup` started; drill VM deleted. Billed so far $0.00; estimate $0.01                                                                                                                                                                                                                                                                                                                                                                |
| 2026-11-28 00:05:03    | 7    | **Drill 2** (1 h 19 min after drill 1, run early at the founder's OK): Azure job 00:05:09–00:08:28 (3 min 19 s); PostgreSQL ready 00:08:59. **Recovery 3 min 57 s: PASS.** Newest row 00:00:59.120 (the 00:00:59 point). **Data loss 243.9 s: FAIL.** Cleanup started 00:09; responses recorded. Billed $0.00; estimate $0.01                                                                                                                       |
| 2026-11-28 00:27:15    | 7    | **Drill 3, "Latest (lowest RPO)" from the portal** (founder asked): RPO had risen to 255 s (00:15). Azure job 00:27:22–00:30:37 (3 min 15 s); PostgreSQL ready 00:31:10. **Recovery 3 min 56 s: PASS.** Newest row 00:21:00.199, the same point "Latest processed" offered. **Data loss 374.8 s: FAIL.** "Latest" gained nothing: no newer data had reached Azure. Request time taken just after the click (overstates loss by ~1 s). Cleanup 00:31 |
| 2026-11-28 00:51:27    | 7    | **Drill 4, "Latest (lowest RPO)" with low lag** (RPO 74 s): job 00:51:34–00:54:11; DB ready 00:54:48. **Recovery 3 min 22 s: PASS.** Job record: recovery point 00:46:00, the ordinary 5-minute point. **Data loss 326.1 s: FAIL.** Conclusion: on test failover, "Latest" behaves like "Latest processed"                                                                                                                                          |
| 2026-11-28 00:54–00:57 | B    | **Database standby built** (`db-standby`): second B2ats_v2 VM in West US 2 (10.20.2.0/24), global VNet peering, PostgreSQL 16 async streaming replication with a slot. Replay lag 0.05 s; standby 0.2–1.0 s behind                                                                                                                                                                                                                                  |
| 2026-11-28 01:13       | B    | DB drill (first version): 0.14 s / 15 s, **discarded**: request time taken on the Mac ~15 s before the promote, so the standby kept receiving rows. Drill fixed to take the failure moment on the standby                                                                                                                                                                                                                                           |
| 2026-11-28 01:28:31    | B    | **DB drill 1:** failure moment 01:28:30.907 (on the standby), newest source row 01:28:30.634. **Data loss 0.272 s (no rows lost). Promote to writable 0.283 s.** Azure Run Command adds ~11 s to reach the VM (tooling, not the database)                                                                                                                                                                                                           |
| 2026-11-28 01:34:41    | B    | **DB drill 2:** **data loss 0.172 s, promote 0.297 s.** Standby re-seeded and streaming again (01:40)                                                                                                                                                                                                                                                                                                                                               |
