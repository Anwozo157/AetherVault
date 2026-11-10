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

**What this means for a customer like NewConnect:** Azure needs one extra Windows Server machine
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

**Unverified (to confirm before building):** the REST API for replication protected items and
its RPO fields; a built-in read-only RBAC role for Site Recovery; Terraform `azurerm` resource
names for Site Recovery; the per-instance price (not shown in the page text); conflicting
statements on excluding disks for physical machines.

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
