# Scale test prompt (Phase A): a bigger server under load, repeated drills

> Agent prompt, written 2026-11-18 at the founder's request. Paste it into a new session, or point
> the agent at this file. Plan and verified costs: `docs/AWS_SCALE_TEST_PLAN.md`.

---

You are running Phase A of AetherVault's scale test. AetherVault is an AWS disaster-recovery command
center (multi-cloud later): live replication status, two-person approval, a tamper-evident audit
log, and drill evidence reports on top of AWS Elastic Disaster Recovery (DRS).

**Read first, in order:** `AGENTS.md` (rules), `docs/STATUS.md`, `docs/AWS_LIVE_POC.md` (the 17 Nov
test and its evidence format), `docs/AWS_SCALE_TEST_PLAN.md` (this test's plan and verified costs),
`docs/PRODUCT_DECISIONS.md`.

## Why this test

The 17 Nov test proved recovery once, on an idle 8 GiB server. Phase A proves it under realistic
conditions and **repeatedly**: a 100 GiB database server with a steady write load, four drills,
data loss measured from the database itself. If it succeeds, the results replace the single-drill
panel on getaethervault.com ("Measured in a live AWS test") and become the evidence for the pilot
customer, counsel and investors.

## Where we are (18 Nov 2026)

- Test account: the standard AWS account, CLI profile `aegis-dr` (never the old `aegis` profile).
  AWS CLI 2.40 in `~/aws-cli`. Quotas: 8 standard vCPUs per Region.
- 17 Nov results: drill 1 took 17 min 14 s (AWS job time; one-time first-recovery preparation, a
  FAIL against 15 min); drill 2 launched in 9 min 58 s and the app was verified at 12 min 29 s,
  with about 8 s of data lost. In drill 2, DRS started a new snapshot, then after about 3 minutes
  fell back to the previous point in time (`USING_PREVIOUS_SNAPSHOT`).
- Everything from that test was torn down on 18 Nov. Two 1 GB DRS base snapshots remain in
  us-west-2. Don't delete them without the founder's OK.
- DRS is initialized in us-west-2 (replication template: t3.small replication server, GP3 staging,
  point in time every 10 min / hourly / daily). The collector Terraform is in `collector/terraform`.

## Budget and guardrails (non-negotiable)

- **Founder-approved cap: $25 for all of Phase A. Never go over it without the founder's explicit OK.**
  Stop and ask if your estimate of the total passes **$15**.
- AWS billing lags up to a day, so you keep your own running estimate: run
  `scripts/poc/source-server.sh cost` at least every 12 hours and after every drill, and report it.
- Rate-limit the write load (`pgbench -R`, about 200 KB/s). Unthrottled, it can cost ~$17/day in
  cross-Region transfer alone. If the DRS backlog grows steadily, lower the rate; don't raise it.
- Safety net: the source server terminates itself after 72 hours. DRS and its servers keep billing
  until `drs-down`, so tear down yourself within 72 hours of launch, sooner if the drills are done.
- Ask before: launching anything, starting each drill series, deleting anything you didn't
  create, any change to account settings, budgets or quotas.

## Back up before and after

- Before launching: `bash scripts/backup-db.sh` (hosted database), check that all four files exist
  and decompress; a git bundle of the repo into `~/Developer/AegisCoreLabs-private/backups/`.
- After the test: the same again, and commit the private evidence folder
  (`~/Developer/AegisCoreLabs-private/evidence/<date>-scale-test/`: job logs, CloudTrail extracts,
  cost output). Never put the AWS account ID, case numbers or personal email in the public repo.

## Task

1. **Script** (free): extend `scripts/poc/source-server.sh` with instance type, disk size,
   PostgreSQL with one numbered, timestamped row committed per second, rate-limited pgbench, a
   72-hour self-termination, and `drill`, `last-row`, `cost` and `drs-down` commands. The server's
   setup must be safe to run twice: a recovered drill server can run it again on first boot. Tests or a
   dry run where possible; commit on a branch.
2. **Launch** (ask first): t3.medium, 100 GiB gp3, `POC_LOAD=postgres`; install the DRS agent;
   redeploy the collector so the console shows live data. Record install-to-continuous time.
3. **Lag under load**, about 24 h: worst lag and backlog, from the collector and DRS.
4. **Warm-up drill** (expected slow; it's the first recovery), then **drills 2–4** a few hours
   apart. For each: request time, DRS job stages, server launched, database ready, last row
   recovered vs last row written before the request (data loss = request time minus the newest
   recovered row written **before** the request; the drill server keeps writing new rows once it
   boots, so later rows don't count), PASS/FAIL against 15 min and
   60 s. Link each drill to its DRS job in the console.
5. **Snapshot experiment:** one drill from the last finished point in time instead of a new
   snapshot. Does it remove the ~3 min wait, and at what data-loss cost?
6. **Tear down** (`drs-down`, `down`, collector `terraform destroy`, leftover volumes and
   snapshots this test created) and check the bill the next day.

**Success:** every drill after the warm-up reaches a working database in ≤ 15 min with ≤ 60 s of
data loss. Report every drill, the median and the worst, including any miss.

## Evidence and reporting

- Same format as the 17 Nov record in `docs/AWS_LIVE_POC.md`: timestamps, per-stage timings,
  CloudTrail evidence. Add a "Scale test (Phase A)" section there; update `CHANGELOG.md` and
  `docs/STATUS.md`.
- Label estimates as estimates and simulated data as simulated.
- **The website changes only after the results are in, and exactly as measured, including any
  FAIL.** Propose the updated "Measured in a live AWS test" panel to the founder before deploying.
- When you finish: what changed, measured results, costs incurred (estimate and, next day, actual),
  and open questions.

Start by summarising your understanding and confirming the budget, then do step 1 only.
