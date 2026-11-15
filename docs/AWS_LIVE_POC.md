# Live AWS proof of concept (before NewConnect)

Prove the whole chain with **real** AWS Elastic Disaster Recovery data, in our own AWS account,
before touching a customer: a server replicating, AetherVault showing LIVE lag, an alert, a drill
with measured data loss and a runbook in its evidence, and failback rehearsed.

## Status (2026-11-13)

Our AWS account (AWS's new-account "projects" setup; ID in the founder's private notes) is paid and
verified, but two **AWS-owned service control policies** (organization o-cgrskr3bdk) block us:

- `p-1m6ffy9a` denies **all of Elastic Disaster Recovery (`drs:*`) in every Region**. This is the real blocker.
- `p-w8q5iueo` denies most services outside **us-east-2 (Ohio)**.

"Activate advanced features" (which would let us remove them) and IAM Identity Center both fail
with "This account is not eligible for this operation". An AWS Support case is open (number in the founder's private notes).
`scripts/poc/source-server.sh check` shows the current state in one command.

**Tested 2026-11-14 (everything that doesn't need DRS):** source server up, heartbeat and web
page verified through SSM; collector deployed with Terraform (dummy token, no data sent to the live
console), runs on schedule and reaches DRS with its read-only role, blocked only by `p-1m6ffy9a`.
Found and fixed two Terraform problems that would have hit a new customer account (Lambda
concurrency reservation refused; automatic retries tripling failed runs). Both torn down afterwards.

**We only need the DRS block lifted.** DRS can recover an EC2 server into another Availability
Zone of the same Region, so the whole test can run in Ohio: source in `us-east-2a`, recovery into
another Ohio zone. Cross-Region failover is a later, optional test.

## Access

- The agent uses IAM user `aethervault-agent` (AdministratorAccess, tag `Project=aethervault-poc`)
  through `AWS_PROFILE=aegis`; its access key is in the macOS Keychain ("AWS agent key (Aegis Core
  Labs)") and read by `credential_process`, never written to disk. **Delete the key after the test.**
- Spend: the $20 project spend limit pauses the account; costs come out of the $120 credits. If the
  limit is ever removed, create budget alerts first (e.g. $5 / $10 / $20, email antonio@).

## Test source server

`scripts/poc/source-server.sh` (stands in for NewConnect's server; no customer data):
t3.micro Amazon Linux 2023 in `us-east-2a`, encrypted 8 GB disk, **no SSH key and no inbound
ports** (managed through SSM), IMDSv2 only. It serves a web page and appends a UTC timestamp to
`/var/lib/aethervault/heartbeat.log` every minute, so lag and data loss after a drill are visible.
The instance role allows SSM and `AWSElasticDisasterRecoveryEc2InstancePolicy`, so the DRS agent
installs without access keys.

```sh
scripts/poc/source-server.sh check          # free dry runs; creates nothing
scripts/poc/source-server.sh up             # ~$0.25/day from credits
scripts/poc/source-server.sh verify         # heartbeat + web page, via SSM
scripts/poc/source-server.sh install-agent  # once DRS is unblocked and initialized
scripts/poc/source-server.sh status
scripts/poc/source-server.sh down           # removes everything `up` created
```

Expected AWS cost for a 2-day test, all in Ohio: DRS $0.028/h per server (~$1.35), replication
server t3.small (~$1), disks and snapshots (under $1), source t3.micro (~$0.50), drill instances
(cents). **Under $5, inside the credits.**

**Closer to NewConnect (later):** NewConnect's server is a physical machine outside AWS. The same
agent runs on any Linux or Windows machine with outbound internet, so a VM on this Mac (Intel, so
an x86_64 VM works) or a $4–6/month cloud VM elsewhere (e.g. a DigitalOcean droplet; needs the
founder's spend approval) is a more realistic source. It does not get around the DRS block: the
AWS side (DRS, replication server, recovery) still runs in our account.

## Steps

1. ✅ Account, agent access key, AWS CLI 2.40 (2026-11-11/12). ⏳ AWS lifts `p-1m6ffy9a`.
2. `scripts/poc/source-server.sh check` shows "OK: DRS reachable". Then initialize DRS in
   us-east-2 (`aws drs initialize-service`) and set replication defaults: encrypted staging,
   t3.small replication server, 7-day point in time, staging subnet in `us-east-2b`.
3. `source-server.sh up`, wait ~3 minutes, `verify` (heartbeat lines growing).
4. `source-server.sh install-agent`; wait for initial sync (minutes for 8 GB). `status` shows
   `CONTINUOUS` and a lag of seconds.
5. Console: Connect your AWS account → create the token; agent deploys the collector with
   Terraform (`drs_region = "us-east-2"`). Expect **LIVE · AWS DRS** within a minute.
6. Add a Slack alert channel; stop the agent on the source for a few minutes → "Data-loss target
   at risk" alert → restart → "recovered".
7. Drill: Run drill now in AetherVault, launch the drill instance in DRS, tick the runbook, confirm
   the web page and the latest file on the drill instance, terminate it, open the evidence report.
8. Optional: full recovery + failback rehearsal (cross-Region, once the Region block is lifted).
9. Record real `DescribeSourceServers` responses (`--record`) to replace the hand-built fixtures
   and confirm the `lagDuration` format.
10. Tear down: `terraform destroy`, disconnect and delete the source server in DRS,
    `source-server.sh down`, delete leftover replication servers, volumes and snapshots, delete
    the agent access key; check the bill next day.

**Done when:** screenshots/PDF of LIVE status, an alert, and a drill evidence report with measured
data loss and runbook ticks, all from real AWS data. That's the demo for NewConnect.
