# Multicloud DR: Azure and Google Cloud research

> **2026-11-26:** multicloud work approved by the founder. Next: `docs/MULTICLOUD_RESEARCH_PROMPT.md`.

Goal: protect customer servers into **AWS, Azure or Google Cloud** with the same AetherVault
experience we built for AWS: a read-only collector for replication health, measured RPO in drill
evidence, scheduled drills, runbooks and alerts. AWS is done
([`AWS_DR_BEST_PRACTICES.md`](AWS_DR_BEST_PRACTICES.md)). This file collects what the cloud vendors'
own documentation says, read 2026-11-10. Anything not confirmed in vendor docs is marked
**unverified**; confirm it before building on it.

## Side by side

|                               | AWS Elastic Disaster Recovery                | Azure Site Recovery (ASR)                                                                                          | Google Cloud                                                                                    |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Agent on each server          | AWS Replication Agent                        | Mobility service                                                                                                   | Nothing on the VM (disk-level replication); **Compute Engine VMs only**                         |
| Extra on-prem component       | None                                         | **Replication appliance** (Windows Server 2022, 8 cores, 16 GB RAM, 2 disks)                                       | n/a: no first-party on-prem → Google replication (Google suggests a partner)                    |
| Ports from the server         | 443 (service), 1500 (data)                   | 443 (control), 9443 (data) to the appliance; appliance → Azure 443                                                 | n/a (Google's storage layer replicates)                                                         |
| Replication                   | Continuous, block level                      | Block level, near-continuous; crash-consistent points every 5 min (fixed)                                          | Persistent Disk **Asynchronous Replication**, 4 KB blocks, target RPO ~1 min (not configurable) |
| Point-in-time retention       | 7 days default                               | Default 1 day, up to 15 days                                                                                       | None: a live mirror, no recovery-point history (snapshots/Backup and DR for that)               |
| Non-disruptive drill          | Drill launch                                 | **Test failover** (isolated network, cleanup step)                                                                 | Clone the secondary disks (consistency group `bulkInsert`), boot a test VM, delete it           |
| Failback for physical servers | Failback Client ISO                          | Reprotect + planned failover back (needs a healthy appliance)                                                      | n/a; for VMs: new secondary in the old region, replicate back, fail over again                  |
| Read-only health source       | `DescribeSourceServers` (lag, state, errors) | Portal + **Log Analytics** `AzureSiteRecoveryReplicatedItems` (`replicationHealth_s`, `rpoInSeconds_d`)            | Cloud Monitoring `disk/async_replication/time_since_last_replication` + disk `resourceStatus`   |
| Price                         | $0.028/server-hour + EBS/EC2                 | **$25/month per protected VM** (Azure Retail Prices API, eastus, 2026-11-26); **first 31 days free**; plus storage | **Unverified** (Google's pricing pages didn't render)                                           |
| Vendor drill guidance         | "Perform drills regularly"                   | Test failover "at least once every six months"                                                                     | Consistency-group clones are "used for DR drills"                                               |

## Azure Site Recovery (physical / on-premises servers)

Sources: [support matrix](https://learn.microsoft.com/en-us/azure/site-recovery/vmware-physical-azure-support-matrix),
[modernized architecture](https://learn.microsoft.com/en-us/azure/site-recovery/vmware-azure-architecture-modernized),
[failover/failback](https://learn.microsoft.com/en-us/azure/site-recovery/failover-failback-overview-modernized),
[monitoring](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-monitor-and-troubleshoot),
[Log Analytics](https://learn.microsoft.com/en-us/azure/site-recovery/monitor-log-analytics),
[pricing](https://azure.microsoft.com/en-us/pricing/details/site-recovery/).

**Architecture.** Physical servers use the "modernized VMware/physical" experience: the
**Mobility service** on each server sends to an on-premises **ASR replication appliance**
(for physical servers set up manually with a PowerShell script), which encrypts and sends data to
Azure over 443. Data lands in a cache storage account, then managed disks. A **new Recovery
Services vault** is required for the appliance; the vault holds metadata, not customer data.

**What this means for a customer with one physical server:** Azure needs one extra Windows Server machine
on site (the appliance, 8 cores / 16 GB). AWS does not. That's a real difference in setup effort.

**Network.** Server → appliance: TCP 443 (control) and 9443 (data, changeable). Appliance → Azure:
443 outbound to `management.azure.com`, `*.blob.core.windows.net`, `*.servicebus.windows.net`,
`*.hypervrecoverymanager.windowsazure.com`, `*.vault.azure.net` and others. Replication over a
site-to-site VPN is "only supported when using private endpoints"; ExpressRoute with Microsoft
peering is an option.

**Recovery points.** Crash-consistent every 5 minutes (fixed); app-consistent (VSS) every
1–12 hours; retention up to 15 days.

**Supported (summary).** Windows Server 2016–2025 and client Windows (64-bit, LTSC); RHEL 5.2–10.1,
Ubuntu 14.04–24.04, Debian 7–12, SUSE 11 SP3–15 SP7, Oracle Linux 6.4–10.0, Rocky (64-bit). New
replications of older Windows (Server 2012 R2 and earlier, Windows 10 and earlier) are blocked from
**March 1, 2027**. Not supported on physical: Storage Spaces, shared cluster disks, encrypted disks,
BitLocker (must be off), 4K-native sectors, HP CCISS controllers. Peak churn 54 MB/s per machine.

**Drill.** Test failover creates a copy in a chosen isolated Azure network "with no impact on
ongoing replication", then **Cleanup test failover** deletes it.

**Monitoring we'd read.** Replicated items show health (Healthy / Warning / Critical) and current
RPO. In Log Analytics (`AzureDiagnostics`, `replicationProviderName_s == "InMageRcm"` for
physical): `replicationHealth_s`, `rpoInSeconds_d`, `protectionState_s`, `failoverHealth_s`,
`lastSuccessfulTestFailoverTime_t`; refreshed every 15 minutes. An AetherVault Azure collector
could read these, but 15-minute freshness is coarser than AWS's per-minute status.

**Confirmed 2026-11-17 (REST API and roles, Microsoft Learn):**

- **Replicated items:** `GET …/vaults/{vault}/replicationProtectedItems?api-version=2026-11-01`
  ([Replication Protected Items - List](https://learn.microsoft.com/en-us/rest/api/site-recovery/replication-protected-items/list)),
  paged with `nextLink`. Fields shown in Microsoft's sample: `replicationHealth`, `protectionState`,
  `testFailoverState`, `allowedOperations`, `currentScenario`,
  `providerSpecificDetails.instanceType`; for Azure-to-Azure (`A2A`) also `rpoInSeconds`,
  `lastRpoCalculatedTime` and `lastHeartbeat`. This is fresher than the 15-minute Log Analytics
  route, so the collector should use the REST API.
- **Jobs (measured recovery times):** `GET …/vaults/{vault}/replicationJobs`
  ([Replication Jobs - List](https://learn.microsoft.com/en-us/rest/api/site-recovery/replication-jobs/list)):
  `scenarioName`, `state` (NotStarted, InProgress, Succeeded, Failed, Cancelled, Suspended, Other),
  `startTime`, `endTime`, `targetObjectName`, `errors`, `tasks`. Same role as DRS `DescribeJobs` in
  our "Recoveries measured by AWS" table.
- **Read-only role:** built-in **Site Recovery Reader** has only read actions, including
  `vaults/replicationJobs/read` and
  `vaults/replicationFabrics/replicationProtectionContainers/replicationProtectedItems/read`
  ([built-in roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/management-and-governance)).
  **Site Recovery Operator** adds test failover, cleanup and failover; it can't enable
  replication or assign access (what AetherVault would need to start drills itself, later).
- **Drills cost no Site Recovery fee;** the test VM's compute and storage are billed until cleanup.
  First 31 days of protection per instance are free.

**Still unverified (check in the live test):** whether Site Recovery Reader allows the
vault-level list (the role names the nested path); the `scenarioName` values for test failover
and failover; the RPO field for physical servers (`InMageRcm`, reported as `lastRpoInSeconds` in a
summary, not seen verbatim); the per-instance price; Terraform `azurerm` resource names.

**Confirmed 2026-11-26 (Microsoft Learn, Azure Retail Prices API, HashiCorp provider docs):**

- **Vault-level list needs care:** Site Recovery Reader has
  `…/replicationFabrics/replicationProtectionContainers/replicationProtectedItems/read` and
  `vaults/replicationJobs/read`, but **not** `vaults/replicationProtectedItems/read`. The collector
  should walk fabrics → protection containers → protected items (all readable with Site Recovery
  Reader), or use a custom read-only role. Confirm in the live test.
  ([built-in roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/management-and-governance))
- **A2A fields** (`A2AReplicationDetails`, api-version `2026-11-01`): `rpoInSeconds`,
  `lastRpoCalculatedTime`, `lastHeartbeat`, `monitoringPercentageCompletion`, `vmProtectionState`,
  `tfoAzureVMName`; `replicationHealth` sample `Normal` (other values **unverified**)
  ([list](https://learn.microsoft.com/en-us/rest/api/site-recovery/replication-protected-items/list)).
- **Jobs:** fields `scenarioName`, `state`, `startTime`, `endTime`, `targetObjectName`, `errors`,
  `tasks`, `customDetails` (`TestFailoverJobDetails`). Scenario names for test failover and
  failover are still **unverified**; record them in the live test
  ([jobs](https://learn.microsoft.com/en-us/rest/api/site-recovery/replication-jobs/list)).
- **A2A:** any two Azure regions; cache storage account in the source region (no soft delete);
  Mobility extension installs automatically; crash-consistent points every 5 min (fixed); default
  retention 1 day; Ubuntu 22.04/24.04 supported
  ([support matrix](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-support-matrix),
  [architecture](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-architecture)).
- **Drill:** test failover into a non-production VNet, then "Cleanup test failover"
  ([DR drill](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-dr-drill)).
- **Price:** "VM Replicated to Azure" **$25.00/month** per instance (eastus), first 31 days free;
  B2ats v2 Linux VM $0.0094/hour, B1s $0.0104/hour; inter-region transfer in North America
  $0.02/GB (rows labeled "Rtn Preference: MGN"; confirm). Source: Azure Retail Prices API, 2026-11-26.
- **Collector runtime:** Flex Consumption is Microsoft's recommended serverless plan (free grant
  250,000 executions and 100,000 GB-s a month per subscription); Linux Consumption retires
  30 Sep 2028 ([Flex](https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan),
  [Consumption](https://learn.microsoft.com/en-us/azure/azure-functions/consumption-plan)).
  Terraform: `azurerm_function_app_flex_consumption`.
- **Terraform (azurerm) for A2A:** `azurerm_recovery_services_vault`, `azurerm_site_recovery_fabric`,
  `azurerm_site_recovery_protection_container`, `azurerm_site_recovery_replication_policy`
  (`recovery_point_retention_in_minutes`, `application_consistent_snapshot_frequency_in_minutes`),
  `azurerm_site_recovery_protection_container_mapping`, `azurerm_site_recovery_network_mapping`,
  `azurerm_site_recovery_replicated_vm` (`managed_disk`, `target_network_id`, `test_network_id`),
  `azurerm_site_recovery_replication_recovery_plan`.

### Azure build plan (proposed 2026-11-17, not started)

1. **Live test first, cheapest shape: Azure-to-Azure.** One small Azure VM replicating to a second
   Azure region (no on-premises appliance; the A2A fields above are the ones Microsoft documents
   verbatim). Record real API responses (as `--record` did for AWS), confirm the Reader role and
   job names, run a test failover and measure it. Estimate: under $10 for a 2-day test (VM, cache
   storage, test VM; Site Recovery fee free for 31 days). **Needs the founder's approval: an Azure
   account requires a card.**
2. **Database:** `replication_snapshots.source` and `recovery_jobs` gain the cloud (`azure-asr`);
   job IDs and Region patterns are AWS-shaped today and need per-cloud checks. Links from a run to
   a job (`link_recovery_job`) match `azure-<region>` targets the same way as `aws-<region>`.
3. **Collector:** an Azure Function (or the same CLI) with a managed identity holding Site
   Recovery Reader, mapping replicated items and jobs to the shapes the AWS collector already
   pushes. Terraform for the customer's subscription.
4. **Console:** "Connect your Azure subscription" guide; Azure regions become selectable in the
   signed-in console only after real data flows (until then they stay demo-only and simulated).
5. **Docs:** `AZURE_DR_BEST_PRACTICES.md` and an Azure pilot checklist. For a physical-server pilot
   the replication appliance (Windows Server, 8 cores, 16 GB) is the big extra; test it in a second
   live run before promising Azure to a customer with physical servers.

Rough effort: 1–2 weeks of build plus the live test.

## Google Cloud (researched 2026-11-26)

**Verdict: (C), it depends on the source.**

- **Compute Engine VM to another Google region: yes, continuous block replication.** Persistent
  Disk Asynchronous Replication is "block storage replication for cross-region active-passive
  disaster recovery (DR)", with "a target RPO of one minute, for up to 12.5 GB of compressed changed
  blocks per minute"; "RPO is not configurable"
  ([about](https://docs.cloud.google.com/compute/docs/disks/async-pd/about.md.txt)). Google's DR
  guide recommends it for low-RPO/RTO cross-region DR
  ([DR for applications](https://docs.cloud.google.com/architecture/dr-scenarios-for-applications.md.txt)).
- **On-premises or another cloud into Google: no first-party continuous replication found.** The DR
  guide's warm on-prem pattern says "One option is to use a partner solution" and names none.
  Migrate to Virtual Machines is documented as a migration tool, not DR.
- **Backup and DR Service is scheduled backup, not continuous:** rules run "hourly, daily, weekly,
  monthly, or yearly" ([concepts](https://docs.cloud.google.com/backup-disaster-recovery/docs/concepts/backup-dr.md.txt)).
  Useful later as a backup-based tier; data loss can't be lower than the interval.

**Recommendation:** build Google like AWS and Azure for **Compute Engine workloads** on
Asynchronous Replication (the same model as our AWS test, which replicated an EC2 server between
regions). Say plainly that on-premises servers aren't supported on Google. Backup and DR is a later,
separately labeled tier.

### Asynchronous Replication: how it works

Sources: [about](https://docs.cloud.google.com/compute/docs/disks/async-pd/about.md.txt),
[configure](https://docs.cloud.google.com/compute/docs/disks/async-pd/configure.md.txt),
[manage replication](https://docs.cloud.google.com/compute/docs/disks/async-pd/manage-replication.md.txt),
[consistency groups](https://docs.cloud.google.com/compute/docs/disks/async-pd/manage-consistency-groups.md.txt),
[clone secondary disks](https://docs.cloud.google.com/compute/docs/disks/async-pd/manage-async-disks.md.txt),
[failover/failback](https://docs.cloud.google.com/compute/docs/disks/async-pd/failover-failback.md.txt),
[performance](https://docs.cloud.google.com/compute/docs/disks/async-pd/performance.md.txt),
[disks REST](https://docs.cloud.google.com/compute/docs/reference/rest/v1/disks.md.txt). Read 2026-11-26.

- **Pairs:** any two regions on the same continent (North America included); samples use
  us-central1 → us-east1. Up to 1,000 disk pairs per project per region pair; disks up to 64 TiB.
- **Disk types:** Balanced PD, Performance (SSD) PD, Hyperdisk Balanced (+ HA), Hyperdisk Extreme.
  Not CSEK; CMEK on the primary needs CMEK on the secondary.
- **Setup:** create a blank secondary disk with `asyncPrimaryDisk` (`disks.insert`), then
  `disks.startAsyncReplication`. Terraform: `google_compute_disk` (`async_primary_disk`) and
  `google_compute_disk_async_replication`. Multi-disk servers use a consistency group
  (`google_compute_resource_policy` with `disk_consistency_group_policy`, up to 128 disks).
- **Drill (non-disruptive):** put the secondary disks in a consistency group in the secondary
  region, clone them with `disks.bulkInsert` (`sourceConsistencyGroupPolicy`), boot a test VM from
  the clones, then delete the VM and clones. The clone steps don't stop replication (inferred: no
  such step is listed; **confirm in the live test**).
- **Failover:** stop replication, attach the secondary disks to a VM in the secondary region.
  Google: "Asynchronous Replication doesn't offer outage monitoring" (that's our job).
  **Failback:** create a new secondary in the old region and replicate back. A stopped pair can't
  restart; a new secondary disk is needed.
- **Health:** Cloud Monitoring `disk/async_replication/time_since_last_replication` (seconds since
  the last replication, i.e. the RPO) and `disk/async_replication/sent_bytes_count`, by `disk_id`;
  the RPO metric appears once the initial copy finishes. The disk resource has
  `resourceStatus.asyncPrimaryDisk.state` / `asyncSecondaryDisks[].state` (only `STOPPED` seen in
  the docs; other values **unverified**). Full metric prefix (`compute.googleapis.com/…`)
  **unverified**.
- **No job history API** like DRS `DescribeJobs` or ASR `replicationJobs`: AetherVault measures
  drill and failover times from its own run (each step's Compute operation start and end).
- **Roles:** start/stop/clone are documented with `roles/compute.instanceAdmin.v1`
  (`compute.disks.startAsyncReplication`, `stopAsyncReplication`, `stopGroupAsyncReplication`,
  `compute.disks.create`, `compute.disks.useReadOnly`). A read-only collector would need
  `compute.disks.get`/`list` and `monitoring.timeSeries.list` (e.g. `roles/compute.viewer` +
  `roles/monitoring.viewer`): **unverified**, confirm in the live test.

### Backup and DR Service (for a later backup-based tier)

API `backupdr.googleapis.com` v1: `backupVaults.dataSources` carries `backupConfigInfo.lastBackupState`
(`FIRST_BACKUP_PENDING`, `SUCCEEDED`, `FAILED`, `PERMISSION_DENIED`) and
`lastSuccessfulBackupConsistencyTime`; backups carry `consistencyTime`
([dataSources](https://docs.cloud.google.com/backup-disaster-recovery/docs/reference/rest/v1/projects.locations.backupVaults.dataSources.md.txt),
[LastBackupState](https://docs.cloud.google.com/backup-disaster-recovery/docs/reference/rest/v1/LastBackupState.md.txt)).
Jobs are long-running operations. `roles/backupdr.*` names and pricing: **unverified**. Terraform:
`google_backup_dr_backup_vault`, `google_backup_dr_backup_plan`, `google_backup_dr_backup_plan_association`.
The legacy management console is deprecated as of 30 Sep 2026.

### Collector and account facts

- **Runtime:** Cloud Run (request-based free tier: 2 million requests, 360,000 GB-s, 180,000
  vCPU-s per month) or Cloud Run functions; Secret Manager free tier: 6 active secret versions, 10,000
  access operations a month ([free features](https://docs.cloud.google.com/free/docs/free-cloud-features)).
  Cloud Run **jobs** and Cloud Scheduler free allowances: **unverified** (pricing pages didn't
  render). Terraform: `google_cloud_run_v2_job`, `google_cloud_scheduler_job`,
  `google_secret_manager_secret`, `google_project_service`.
- **Prices:** Google's pricing pages render in the browser only; disk, replication, transfer and VM
  prices are **unverified**. Get them from the console's pricing calculator or the Cloud Billing
  Catalog API once the account exists, before any spend.
- Account and safety facts (trial, budgets, impersonation, org policies): `docs/MULTICLOUD_ACCOUNT_SETUP.md`.

## How AetherVault would add a cloud

The product already separates the UI from data sources (`DrProvider`, `ReplicationCapability`).
Each cloud needs:

1. A **read-only collector** for that cloud's replication health, mapped to our existing snapshot
   shape (server, state → health, lag/RPO, errors). The database, alerts, drills evidence and UI
   stay the same; `replication_snapshots.source` gains `azure-asr` / `gcp-…`.
2. **Recorded sample responses** for tests (hand-built from the docs until a real account exists).
3. A **setup guide** in the console (like Connect your AWS account) and a best-practices doc.
4. Its own **pilot checklist**: the Azure replication appliance is the big extra.

**Prompts (2026-11-26):** research `docs/MULTICLOUD_RESEARCH_PROMPT.md`, then
`docs/AZURE_BUILD_PROMPT.md`, then `docs/GCP_BUILD_PROMPT.md` (founder decision in
`docs/PRODUCT_DECISIONS.md` §4; the order below is superseded).

Recommended order (2026-11-10): finish proving AWS with live data first (one cloud working for real beats three
on paper), then Azure (closest model to AWS), then Google Cloud once its model is confirmed.
