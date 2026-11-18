# Multicloud DR: Azure and Google Cloud research

Goal: protect customer servers into **AWS, Azure or Google Cloud** with the same AetherVault
experience we built for AWS: a read-only collector for replication health, measured RPO in drill
evidence, scheduled drills, runbooks and alerts. AWS is done
([`AWS_DR_BEST_PRACTICES.md`](AWS_DR_BEST_PRACTICES.md)). This file collects what the cloud vendors'
own documentation says, read 2026-11-10. Anything not confirmed in vendor docs is marked
**unverified**; confirm it before building on it.

## Side by side

|                               | AWS Elastic Disaster Recovery                | Azure Site Recovery (ASR)                                                                               | Google Cloud                     |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------- |
| Agent on each server          | AWS Replication Agent                        | Mobility service                                                                                        | **Research blocked** (see below) |
| Extra on-prem component       | None                                         | **Replication appliance** (Windows Server 2022, 8 cores, 16 GB RAM, 2 disks)                            |                                  |
| Ports from the server         | 443 (service), 1500 (data)                   | 443 (control), 9443 (data) to the appliance; appliance → Azure 443                                      |                                  |
| Replication                   | Continuous, block level                      | Block level, near-continuous; crash-consistent points every 5 min (fixed)                               |                                  |
| Point-in-time retention       | 7 days default                               | Default 1 day, up to 15 days                                                                            |                                  |
| Non-disruptive drill          | Drill launch                                 | **Test failover** (isolated network, cleanup step)                                                      |                                  |
| Failback for physical servers | Failback Client ISO                          | Reprotect + planned failover back (needs a healthy appliance)                                           |                                  |
| Read-only health source       | `DescribeSourceServers` (lag, state, errors) | Portal + **Log Analytics** `AzureSiteRecoveryReplicatedItems` (`replicationHealth_s`, `rpoInSeconds_d`) |                                  |
| Price                         | $0.028/server-hour + EBS/EC2                 | Per protected instance (amount not rendered on the page); **first 31 days free**; plus storage          |                                  |
| Vendor drill guidance         | "Perform drills regularly"                   | Test failover "at least once every six months"                                                          |                                  |

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

## Google Cloud

**Research blocked on 2026-11-10:** Google's documentation moved to `docs.cloud.google.com`, and
this session's web access to that domain was denied. Nothing here is filled in from memory. To
finish: allow fetching `docs.cloud.google.com` (Claude Code permission settings) and rerun.
Pages to read:

- Backup and DR Service: <https://docs.cloud.google.com/backup-disaster-recovery/docs>
- DR planning guide: <https://docs.cloud.google.com/architecture/dr-scenarios-planning-guide>
- DR scenarios for applications: <https://docs.cloud.google.com/architecture/dr-scenarios-for-applications>
- Persistent Disk asynchronous replication: <https://docs.cloud.google.com/compute/docs/disks/async-pd-about>

Key question to answer first: does Google Cloud offer **continuous replication of an on-premises
physical server with launch in the cloud** (the AWS DRS / Azure ASR model), or only
backup-and-restore style protection? That decides whether a Google Cloud option can promise the
same RPO.

## How AetherVault would add a cloud

The product already separates the UI from data sources (`DrProvider`, `ReplicationCapability`).
Each cloud needs:

1. A **read-only collector** for that cloud's replication health, mapped to our existing snapshot
   shape (server, state → health, lag/RPO, errors). The database, alerts, drills evidence and UI
   stay the same; `replication_snapshots.source` gains `azure-asr` / `gcp-…`.
2. **Recorded sample responses** for tests (hand-built from the docs until a real account exists).
3. A **setup guide** in the console (like Connect your AWS account) and a best-practices doc.
4. Its own **pilot checklist**: the Azure replication appliance is the big extra.

Recommended order: finish proving AWS with live data first (one cloud working for real beats three
on paper), then Azure (closest model to AWS), then Google Cloud once its model is confirmed.
