# Live AWS proof of concept (before NewConnect)

Prove the whole chain with **real** AWS Elastic Disaster Recovery data, in our own AWS account,
before touching a customer: a server replicating, AetherVault showing LIVE lag, an alert, a drill
with measured data loss and a runbook in its evidence, and failback rehearsed.

## What we need

| Item                                                                   | Who             | Cost                                                            |
| ---------------------------------------------------------------------- | --------------- | --------------------------------------------------------------- |
| AWS account (Aegis Core Labs), root MFA, budget alert at $25           | Founder         | Needs a card: **founder must approve spend (AGENTS.md rule 1)** |
| Admin access via IAM Identity Center (no root use, no long-lived keys) | Founder + agent | $0                                                              |
| AWS CLI on this Mac                                                    | Agent           | $0                                                              |
| Hosted console (done 2026-11-10) and founder signed in once            | Founder         | $0                                                              |
| A **test source server** (see options)                                 | Agent           | see below                                                       |

### Test source server options

1. **Recommended: small EC2 instance in `us-east-1` replicating to `us-west-2`.** Fastest (an hour),
   cleanest network, behaves like a real server. Cost for a week-long test: DRS $0.028/h (~$4.70),
   replication server t3.small (~$3.50), a 20 GB disk and its staging copy (~$2), snapshots (cents),
   source instance (t3.micro ~$1.75), drill instances while running (cents to a few dollars).
   **About $12–20 for a week; under $5 for a two-day test.** Tear everything down after.
2. **A Linux VM on this Mac (UTM), as a stand-in for an on-premises server.** Closest to NewConnect's
   physical server (agent over the internet from "on-premises"). This Mac is Apple silicon (arm64);
   DRS has a Linux arm64 agent, but recovering an arm64 source to EC2 needs confirming first.
   Same AWS costs; more setup; the Mac must stay on.

## Steps (option 1)

1. Founder: create the AWS account, enable MFA, create a **Budgets alert** ($25), set up IAM
   Identity Center with an admin user; then `aws sso login` on this Mac.
2. Agent: initialize DRS in `us-west-2`; default replication settings (encrypted staging,
   t3.small, 7-day point in time).
3. Agent: launch a t3.micro Amazon Linux source in `us-east-1` with a small web page and a file
   that changes every minute (so lag and data loss are visible).
4. Agent: install the replication agent with temporary credentials; wait for initial sync.
5. Console: Connect your AWS account → create the token; agent deploys the collector with
   Terraform. Expect **LIVE · AWS DRS** within a minute.
6. Add a Slack alert channel; stop the agent on the source for a few minutes → "Data-loss target
   at risk" alert → restart → "recovered".
7. Drill: Run drill now in AetherVault, launch the drill instance in DRS, tick the runbook, confirm
   the web page and the latest file on the drill instance, terminate it, open the evidence report.
8. Optional: full recovery + failback rehearsal (cross-region AWS→AWS failback).
9. Record real `DescribeSourceServers` responses (`--record`) to replace the hand-built fixtures
   and confirm the `lagDuration` format.
10. Tear down: `terraform destroy`, disconnect the source server in DRS, terminate instances, delete
    leftover volumes and snapshots; check the bill next day.

**Done when:** screenshots/PDF of LIVE status, an alert, and a drill evidence report with measured
data loss and runbook ticks, all from real AWS data. That's the demo for NewConnect.
