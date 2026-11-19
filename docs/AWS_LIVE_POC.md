# Live AWS proof of concept (before the first customer pilot)

Prove the whole chain with **real** AWS Elastic Disaster Recovery data, in our own AWS account,
before touching a customer: a server replicating, AetherVault showing LIVE lag, an alert, a drill
with measured data loss and a runbook in its evidence, and failback rehearsed.

## Scale test, Phase A (started 2026-11-18)

Plan and prompt: `docs/AWS_SCALE_TEST_PLAN.md`, `docs/SCALE_TEST_PROMPT.md`. Cap $25 (founder).

| Time (UTC)     | Step                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 18 Nov 18:59   | Backups before launch: hosted database (verified), repo bundle, private folder committed                               |
| 19:06:05       | Source server launched: t3.medium, 100 GiB gp3, PostgreSQL 16 + one row/s + pgbench at 20 tps, 72 h self-terminate     |
| 19:09          | Verified: heartbeat and database rows writing (row 137 at 19:09:18)                                                    |
| 19:09–19:16:50 | DRS agent installed (source network created for the default VPC)                                                       |
| 19:17          | Drill launch settings: post-launch actions on; launch template v2 with a public IP (SSM reachability)                  |
| 19:18:30       | Collector redeployed in us-west-2 (Terraform: 9 added, plan reviewed); first report accepted (INITIATING)              |
| 21:54          | Initial sync done: 107.4 GB replicated, CONTINUOUS, lag 0 s; source still writing; cost so far ~$2.45                  |
| 21:58          | `--record` run: real response saved (private), redacted fixture added; lag format `P0D`                                |
| 22:00          | Collector memory 128 → 256 MB (was at 111 MB used); reports still accepted                                             |
| 21:47–21:51    | Collector: lag 641 → 881 s while CONTINUOUS (sync point frozen ~21:36), "at risk"; back to 0 s at 21:52. Cause TBD     |
| 19 Nov 13:25   | 1,087 readings, no gaps or errors; 0 s lag since 21:52; cost ~$4.21. Phases: sync 19:24–20:06, first snapshot to 21:41 |
| 19 Nov 19:30   | A2 done: 1,068 readings since 21:52, all 0 s lag, no gaps                                                              |
| 20:41:58.6     | **A3 warm-up drill** requested (`drsjob-5c7b7278ee5b49559`); last source row before request: 91006 at 20:41:44         |
| 20:45:16       | DRS: `USING_PREVIOUS_SNAPSHOT` (new snapshot not ready after ~3 min); conversion 20:45:17–20:51:42                     |
| 20:53:00.4     | Server launched: **11 min 2 s**                                                                                        |
| 20:56:59.3     | Database verified (web page 200): **15 min 0.7 s, FAIL by 0.7 s** (includes ~3.5 min waiting for SSM)                  |
| 20:57          | Newest recovered row 90787 at 20:38:03: **data loss 235.5 s, FAIL** (60 s target). Drill server terminated; ~$5.07     |

## Status (2026-11-18)

**Torn down** at 02:02 UTC by the agent user after the alert test (source server disconnected and
deleted in DRS, test instance terminated, collector destroyed). Only two 1 GB DRS base snapshots
remain in us-west-2. The failback rehearsal (step 8) and the `--record` run (step 9) need a rebuild
first; the founder wants the rehearsal done.

## Status (2026-11-17, evening)

**Two live drills done.** Drill 1: 17 min 14 s to a launched server (first-recovery setup),
no data loss. Drill 2: 9 min 58 s to a launched server, 12 min 29 s to a verified web page
(within the 15-minute target), about 8 s of data loss (within the 1-minute target).

## Status (2026-11-17)

**Unblocked.** The test now runs in a **standard AWS account** (opened 2026-11-17; ID in the
founder's private notes), with the source server in **us-east-1** and DRS replicating and
recovering into **us-west-2**, the same cross-Region shape a customer would use.

Pre-flight (`scripts/poc/source-server.sh check`, 2026-11-17): EC2 launch dry run OK in us-east-1,
DRS reachable in us-west-2 (not initialized yet). New-account quotas: **5 standard vCPUs and 5
concurrent Lambda runs per Region**. That fits the test (replication server t3.small + one drill
instance ≈ 4 vCPUs in us-west-2; the collector needs 1 Lambda run), but request a vCPU increase
before anything larger.

Account setup done first: root MFA (passkey), no root access keys, budget alerts at $10 and $25 a
month (email at 85%, 100% and forecast; warn only, never pause), AWS's free Cost Anomaly Detection.

**History.** The first account was created through AWS's new "projects" sign-up. That puts the
account in an AWS-managed organization whose service control policies denied DRS in every Region
and most services outside us-east-2, and its root console has no way to change them; AWS Support
confirmed it cannot detach them either. Everything except DRS was tested there on 2026-11-14
(source server, collector deployed with Terraform, two Terraform fixes for new accounts), then
torn down. **Lesson for customers:** a DR account must be a standard account ("Sign up for AWS
(advanced)"), not a projects account, and must not have a spend limit that pauses it.

## Access

- The agent uses IAM user `aethervault-agent` (AdministratorAccess, attached by the founder)
  through `AWS_PROFILE=aegis-dr`. Its access key is in the macOS Keychain ("AWS agent key (Aegis
  Core Labs DR)") and read by `credential_process`, never written to disk. **Delete the user and
  key after the test.**
- Spend: paid account with a card on file, no credits. Founder approved a test under $10; ask
  again before anything that keeps running.

## Test source server

`scripts/poc/source-server.sh` (stands in for the pilot customer's server; no customer data):
t3.micro Amazon Linux 2023 in `us-east-1a`, encrypted 8 GB disk, **no SSH key and no inbound
ports** (managed through SSM), IMDSv2 only. It serves a web page and appends a UTC timestamp to
`/var/lib/aethervault/heartbeat.log` every minute, so lag and data loss after a drill are visible.
The instance role allows SSM and `AWSElasticDisasterRecoveryEc2InstancePolicy`, so the DRS agent
installs without access keys.

```sh
scripts/poc/source-server.sh check          # free dry runs and quotas; creates nothing
scripts/poc/source-server.sh init-drs       # one-time DRS setup in us-west-2
scripts/poc/source-server.sh up             # source server in us-east-1 (~$0.25/day)
scripts/poc/source-server.sh verify         # heartbeat + web page, via SSM
scripts/poc/source-server.sh install-agent  # agent replicates into us-west-2
scripts/poc/source-server.sh verify-drill   # on the drill server: web page + last heartbeats
scripts/poc/source-server.sh status
scripts/poc/source-server.sh down           # removes everything `up` created
```

Regions come from `POC_SOURCE_REGION` (default us-east-1) and `POC_DRS_REGION` (default us-west-2);
`POC_REGION=us-east-2` runs the old single-Region test.

`init-drs` creates the DRS service roles and replication defaults: staging area in the default
subnet of `us-west-2a`, t3.small shared replication server, encrypted GP3 staging disks, public IP
data routing (the source is in another Region), point in time every 10 minutes for 1 hour, hourly
for 24 hours, daily for 7 days. See `docs/AWS_DR_BEST_PRACTICES.md`.

Expected AWS cost for a 2-day test: DRS $0.028/h per server (~$1.35), replication server t3.small
(~$1), staging disks and snapshots (under $1), source t3.micro (~$0.50), cross-Region transfer of
the 8 GB disk plus changes (~$0.20), drill instances (cents). **About $5; budget alert at $10.**

**Closer to the pilot (later):** the pilot customer's server is a physical machine outside AWS. The
same agent runs on any Linux or Windows machine with outbound internet, so a VM on this Mac or a
small cloud VM elsewhere (needs the founder's spend approval) is a more realistic source.

## Steps

1. ✅ Standard account, MFA, budgets, agent access key (2026-11-17). ✅ `check` passes.
2. ✅ `source-server.sh init-drs` (us-west-2, 2026-11-17; needed the service roles created first).
3. ✅ `source-server.sh up`, wait ~3 minutes, `verify` (heartbeat lines growing).
4. ✅ `source-server.sh install-agent`; initial sync. **2026-11-17: agent installed 17:08 UTC,
   first byte 17:13, `CONTINUOUS` at 17:30 with lag `P0D` and 0 bytes backlogged (8 GiB disk, ~23
   minutes end to end).** Took four script fixes (single-line SSM command, 1 GB swap on the
   t3.micro, `TMPDIR=/var/tmp`, real exit status); see `docs/AWS_DR_BEST_PRACTICES.md` §2 and §4.
5. ✅ Console: Connect your AWS account → create the token (founder; stored in the Keychain as
   "AetherVault ingest token (live DRS test)"); collector deployed with Terraform in us-west-2
   (`drs_region = "us-west-2"`, plan reviewed then applied, local state gitignored). **2026-11-17
   18:03 UTC: first report accepted (1 server, CONTINUOUS, lag 0 s, data-loss target met); the
   console shows LIVE · AWS DRS.**
6. ✅ Alert test (2026-11-18 UTC). Slack workspace "Aegis Core Labs", channel `#aethervault-alerts`,
   Slack app "AetherVault Alerts" (incoming-webhook scope only); the founder pasted the webhook into
   the console (encrypted; only its last 4 characters are shown). Test alert: Sent (200). Agent
   stopped on the source at 01:31:12 → **"Data-loss target at risk… worst lag 101 s (target 60 s)"
   at 01:32:52** (1 min 40 s). DRS itself kept reporting `CONTINUOUS` until 01:35 (`STALLED`), so
   the lag check, not the state, caught it first. Agent restarted at 01:35:34; DRS rescanned the
   disk; collector saw `CONTINUOUS`, lag 0 on its 01:36:52 run → **"Replication back within the
   data-loss target"** (Sent (200)), about 1 min 20 s after the restart. Found: the at-risk text reads "0 of 1 servers
   not replicating normally" when only the lag is over target (wording fix pending).
7. ✅ Drill (2026-11-17): Run drill now in AetherVault and `aws drs start-recovery --is-drill` at
   18:09:24 UTC; recovery point 18:09:33. Before launching: DRS post-launch enabled (attaches the
   role with SSM) and the DRS launch template given a public IP so the drill server can reach SSM
   (outbound only; the default security group admits nothing from the internet). **Measured data
   loss: none** (every heartbeat through 18:08:49 recovered; 1-minute resolution). **Recovery time:
   19 min 47 s to a verified web page (server up at 17 min 16 s), missing the 15-minute target.**
   Job log: conversion 18:10:21–18:15:31, then an unexplained wait to launch start 18:25:22. Drill
   server terminated afterwards. The console's drill row showed a modeled 5.5 s recovery
   (simulated timer) next to the real 0 s data loss; now labeled "simulated" (fix/console-honesty).
   **Cause of the wait (found the same day):** one-time preparation on a server's first recovery.
   CloudTrail shows DRS creating the base snapshots by 18:16:52, then idle until the launch at
   18:25:22; the second drill launched 2 s after conversion.
   ✅ **Drill 2 (2026-11-17, `start-recovery --is-drill` at 21:04:58 UTC):** DRS took a new snapshot,
   then after ~3 minutes used the previous point in time instead (`USING_PREVIOUS_SNAPSHOT`;
   recovery point 21:04:50, 8 s before the request; a scheduled snapshot had completed 8 s before
   the drill). Conversion 21:08:11–21:13:37, launch 21:13:39–21:14:57. **Server launched 9 min
   58 s after the request; web page verified (HTTP 200) at 12 min 29 s: within the 15-minute
   target.** Data loss: heartbeats through 21:03:51 recovered; the 21:04:51 heartbeat (written
   7 s before the request, 0.6 s after the recovery point) was not, so about 8 s of writes lost,
   within the 1-minute target. Checked with `source-server.sh verify-drill`. Drill server
   terminated. Both drills appear in the console's new "Recoveries measured by AWS" table
   (collector CLI → local database; the hosted console needs the new migration first).
8. Optional: full recovery + failback rehearsal back to us-east-1.
9. Record real `DescribeSourceServers` responses (`--record`) to replace the hand-built fixtures
   and confirm the `lagDuration` format.
10. Tear down: `terraform destroy`, disconnect and delete the source server in DRS,
    `source-server.sh down`, delete the DRS source network the agent created for the source VPC,
    delete leftover replication servers, volumes and snapshots in us-west-2, delete the agent
    user and key; check the bill next day.

**Done when:** screenshots/PDF of LIVE status, an alert, and a drill evidence report with measured
data loss and runbook ticks, all from real AWS data. That's the demo for the first pilot customer.
