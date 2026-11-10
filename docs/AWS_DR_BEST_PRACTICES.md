# AWS Elastic Disaster Recovery: best practices

How we set up and run AWS Elastic Disaster Recovery (DRS) for a customer, and why. Written for
the engineers doing the work. Facts come from the AWS documentation listed at the end (checked
2026-11-10); where AWS doesn't state something, this guide says so instead of guessing.

Companion documents: [`TERRAFORM.md`](TERRAFORM.md) (collector deployment),
[`PILOT_DAY.md`](PILOT_DAY.md) (step-by-step checklist for a pilot),
[`../collector/README.md`](../collector/README.md) (what the collector sends).

## 1. How DRS works (one paragraph)

An **AWS Replication Agent** on each source server (physical, virtual or cloud) copies its disks
block by block to low-cost **replication servers** in a **staging-area subnet** in the recovery
Region. Data lands on EBS volumes, and DRS keeps **point-in-time (PIT) snapshots** (7-day retention
by default). Nothing big runs until you need it: a **drill** or **recovery** launches full-size
**recovery instances** from a chosen point in time. After the disaster, **failback** replicates
back to the original (or a new) server.

## 2. Account and Region

- **Use a dedicated AWS account for recovery** (or at least a dedicated VPC). A compromised or
  broken primary environment should not be able to delete its own recovery copies.
- **Initialize DRS in every Region you recover into.** This is required per Region. It creates
  the service roles (`AWSServiceRoleForElasticDisasterRecovery` and the agent, replication,
  conversion, recovery-instance and failback roles) and the default replication settings.
  Console: open DRS in that Region and follow first-time setup. CLI:
  `aws drs initialize-service --region <region>`. The DRS full-access console policy does not
  include the IAM permissions needed to initialize: an account administrator does this once.
- **Pick a recovery Region away from the source site** (different power grid, flood zone and
  network providers). For a server at a US data center, a US Region in another part of the
  country is the usual choice (e.g. source in Virginia → recover to `us-west-2`).
- **Turn on AWS CloudTrail** in the recovery account so every DRS and EC2 action is logged.

## 3. Network

Source servers need **outbound** access only:

| From               | To                                                                                               | Port     | Why                     |
| ------------------ | ------------------------------------------------------------------------------------------------ | -------- | ----------------------- |
| Source server      | `drs.<region>.amazonaws.com`                                                                     | TCP 443  | Agent control, status   |
| Source server      | DRS S3 buckets in the Region (`aws-elastic-disaster-recovery-<region>`, `aws-drs-*-<region>`, …) | TCP 443  | Agent download, updates |
| Source server      | Replication servers (staging-area subnet)                                                        | TCP 1500 | Replicated data         |
| Replication server | DRS endpoint and S3                                                                              | TCP 443  | Service communication   |

- **All traffic is TLS-encrypted** (TLS 1.2 from agent to replication server); replicated data is
  also compressed.
- **Prefer private routing** (Site-to-Site VPN or Direct Connect) and set the replication settings
  to **use a private IP** for data. Without it, replication servers get public IPs and data crosses
  the internet (still encrypted).
- **Dedicate a small subnet to the staging area.** Don't put workloads there.
- **Throttle bandwidth** in the replication settings if the source site's uplink is shared, then
  watch the backlog: a throttle that's too tight shows up as growing lag.
- Let DRS **manage its default security group** (AWS's stated best practice) instead of
  hand-written rules for the replication servers.

## 4. Installing the agent

- Use **short-lived credentials**: an IAM role with the AWS managed policy
  `AWSElasticDisasterRecoveryAgentInstallationPolicy`, assumed through STS. Never create long-lived
  access keys for installation, and never paste credentials into tickets or chat.
- Installer locations (replace `<region>`):
  - Linux x86_64: `https://aws-elastic-disaster-recovery-<region>.s3.<region>.amazonaws.com/latest/linux/aws-replication-installer-init`
  - Linux arm64: `…/latest/linux_arm64/aws-replication-installer-init`
  - Windows: `…/latest/windows/AwsReplicationWindowsInstaller.exe`
- Unattended install: Linux `sudo -E ./aws-replication-installer-init --region <region> --no-prompt`
  (with `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN` exported); Windows (as
  Administrator) `.\AwsReplicationWindowsInstaller.exe --region <region> --no-prompt`. The console's
  **Connect your AWS account** guide prints these with your Region filled in.
- **Plan for initial sync.** Every disk is copied once before continuous replication starts. It can
  take hours for large disks; schedule it outside peak hours if bandwidth is tight.
- Windows sources need at least **2 GB free disk space** to launch a recovery instance.

## 5. Replication settings

- **Instance type:** the default replication servers are low-cost `t3.small`; only move up if a
  server's write rate keeps the backlog growing.
- **Staging disks:** a lower-cost EBS type (e.g. `sc1`/`st1`) is usually enough for staging; use
  `gp3` for servers with high write rates. Watch lag after changing it.
- **Encryption:** encrypt staging volumes and snapshots with a KMS key in the recovery account.
- **Point-in-time retention:** keep the 7-day default unless a regulation or ransomware plan needs
  longer (more snapshots cost more). Being able to recover from _before_ an attack is the point.
- **Tags:** tag replication resources (`Customer`, `Purpose=dr`) so costs are visible.

## 6. Launch settings (what a recovery looks like)

Set these **before** you need them, per server:

- **Right-sizing:** let DRS match the instance type to the source hardware, or set it explicitly
  in the launch template.
- **Subnet and security groups** for recovery instances in the recovery VPC, separate from the
  staging area.
- **IP addressing:** copy the private IP if applications depend on it; otherwise plan DNS changes.
- **Licenses:** confirm how Windows/SQL Server licensing carries over (bring-your-own vs AWS-provided).
- **Post-launch actions** (e.g. AWS Systems Manager documents) for steps you'd otherwise do by hand
  after every recovery.

## 7. Drills

- **Drill regularly.** AWS: "It is a best practice to perform drills regularly", and drill before
  you ever need a real recovery. AetherVault's scheduled drills record each one with evidence.
- A drill launches recovery instances from a point in time **without stopping replication** and
  without touching the source. Launch drills into an **isolated network** so recovered servers
  can't collide with production (duplicate hostnames, IPs, outbound jobs).
- **Terminate drill instances after validation.** They're full-size EC2 instances billed while
  they run.
- **Measure, don't assume.** Record recovery time and the data-loss window at launch. AetherVault
  captures the replication lag at launch in every drill's evidence report.
- **Follow the runbook during drills** (Runbook tab) so the real recovery is practiced, not just
  the button.

## 8. Recovery and failback

- Recover from the **latest point in time** for an outage; choose an **earlier** one for
  ransomware or corruption.
- **Failback for on-premises (physical) servers:** boot the **DRS Failback Client** ISO
  (`…/latest/failback_livecd/aws-failback-livecd-64bit.iso`, x86_64 only) on the original or
  replacement server, with temporary credentials from a role with
  `AWSElasticDisasterRecoveryFailbackInstallationPolicy` (default session 1 hour). Requirements
  include TCP 1500 inbound and 443 outbound on the recovery instance, at least 4 GB RAM on the
  failback server, Secure Boot off, and the hardware clock set to UTC. The client pairs with the
  recovery instance and replicates back; you complete failback from the DRS console.
- **Test failback during a drill** at least once. It's the step teams skip and then struggle with.

## 9. Monitoring

- Watch **replication state and lag** per server. AetherVault's collector reads them every minute
  (`DescribeSourceServers`, read-only) and alerts Slack/PagerDuty when the data-loss target is at
  risk (a stalled server, or lag above target).
- **Stalled** or **disconnected** usually means network (port 1500/443), an agent stopped by a
  reboot or patch, or the source disk changed size. Fix it fast: the longer it stalls, the bigger
  the data-loss window.
- For production, AWS recommends **Business or Enterprise Support**.

## 10. Cost

Pricing as published by AWS (US East examples; check the pricing page for your Region):

| Item                            | Price                                  | Notes                                 |
| ------------------------------- | -------------------------------------- | ------------------------------------- |
| Per replicating source server   | $0.028 / hour (≈ $20 / month)          | No upfront cost or minimum            |
| Replication server (`t3.small`) | $0.0208 / hour (≈ $15 / month)         | Can be shared by several source disks |
| Staging EBS                     | `sc1` $0.015, `gp3` $0.08 per GB-month | One volume per source disk, same size |
| PIT snapshots                   | $0.05 per GB-month (changed data)      | Grows with change rate and retention  |
| Drill / recovery instances      | EC2 + EBS while running                | Terminate drills when done            |
| Conversion servers              | Usually < $0.05 per launch             |                                       |

**Example, one server with 500 GB of disk:** source server ≈ $20, replication server ≈ $15,
staging on `sc1` ≈ $7.50, snapshots depend on change rate (often $5–20). Roughly **$45–65/month**
before drills. No free trial is listed on the pricing page.

The AetherVault collector Lambda runs ~43,200 times a month and fits the Lambda free tier.

## Sources (AWS documentation, read 2026-11-10)

- Network requirements: <https://docs.aws.amazon.com/drs/latest/userguide/Network-Requirements.html>
- Initializing: <https://docs.aws.amazon.com/drs/latest/userguide/getting-started-initializing.html>
- Linux agent: <https://docs.aws.amazon.com/drs/latest/userguide/linux-agent.html>
- Windows agent: <https://docs.aws.amazon.com/drs/latest/userguide/windows-agent.html>
- Default replication settings: <https://docs.aws.amazon.com/drs/latest/userguide/default-replication-settings.html>
- Quick start (drills, security group, right-sizing): <https://docs.aws.amazon.com/drs/latest/userguide/quick-start-guide-gs.html>
- Failback: <https://docs.aws.amazon.com/drs/latest/userguide/failback-performing.html>
- Pricing: <https://aws.amazon.com/disaster-recovery/pricing/>

Not stated in the pages we read (confirm in the console before relying on it): the default
staging EBS volume type, the default data-routing choice (private vs public IP) and default EBS
encryption.
