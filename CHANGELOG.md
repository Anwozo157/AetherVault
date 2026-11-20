# Changelog

All notable changes to AetherVault are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Scale test: failback blocked by an AWS account hold; torn down (2026-11-20)

- Failback stalled: DRS could not launch its us-east-1 replication server; CloudTrail shows `RunInstances`
  refused with `Client.Blocked` (AWS put a hold on the account). Not a product or setup fault.
- Torn down on the founder's OK: all instances, DRS source servers, disks and snapshots in both regions;
  source role and security group. Collector Lambda could not be destroyed (Lambda API refused under the
  hold); its schedule is disabled so it no longer runs. Spend ~$8.40 of the $25 cap.

### Scale test: drills 3, A5 and 4; failback started (2026-11-20)

- Drill 3: 16 min 10.5 s (FAIL; from the drill server's log), 110.0 s lost (FAIL). A5 (newest finished
  point on purpose): 9 min 40.3 s (PASS), 715.4 s lost (FAIL). Drill 4: 14 min 17.5 s (PASS), 0.0 s lost
  (PASS; fresh snapshot finished before DRS's wait ran out). Success bar not met: 2 of 3 normal drills
  within 15 min, 1 of 3 within 60 s. Summary table in `docs/AWS_LIVE_POC.md`.
- Failback rehearsal started: DRS initialized in us-east-1, reverse replication from the drill 4 server.

### Scale test: drill 2 on GP3 (2026-11-20)

- Drill 2: database verified at 14 min 56.2 s (PASS), 125.2 s of data lost (FAIL). Revised cause:
  DRS snapshots run one at a time and take ~4–5 min under this load, so a drill falls back to the last
  finished point; data loss depends on when that point started. Magnetic staging probably not the
  main cause. Details in `docs/AWS_LIVE_POC.md`.

### Scale test: staging disk switched to GP3 (2026-11-19)

- Founder-approved change to test the warm-up finding: the source server's DRS staging disk moved
  from "Auto" (magnetic) to GP3. Replication was continuous again within ~1 minute (no full re-copy);
  recovery points were slow for the first hour while the new volume loaded. Logged in
  `docs/AWS_LIVE_POC.md`.

### Scale test: warm-up drill investigated; readiness measured on the server (2026-11-19)

- `source-server.sh verify-drill` also reports the drill server's boot time and PostgreSQL's start
  time from its own log, so the Systems Manager wait is visible (the verified time stays official).
- Findings in `docs/AWS_LIVE_POC.md`: the recovered disk was ~4 min older than DRS's 0 s lag
  suggested; likely cause is DRS's magnetic staging disk ("Auto" picks magnetic under 125 GiB).

### Scale test: warm-up drill (2026-11-19)

- A3 warm-up drill on the 100 GiB server under load: launched in 11 min 2 s, database verified at
  15 min 0.7 s (FAIL by 0.7 s), 235.5 s of data lost (FAIL; DRS fell back to the previous point in
  time after ~3 min). Recorded in `docs/AWS_LIVE_POC.md`.

### Fix: drill request time on macOS (2026-11-19)

- `source-server.sh drill` printed `...T20:41:57.3NZ` on macOS (BSD `date` has no `%N`); it now
  prints milliseconds via Python on both macOS and Linux. Measurements were unaffected: drills use
  AWS's job creation time as the request time.

### Real DRS response recorded; collector memory raised (2026-11-18)

- First recorded `DescribeSourceServers` response from a real AWS account (the scale-test server,
  `CONTINUOUS`), redacted with example IDs, as fixture
  `src/integrations/awsDrs/fixtures/describe-source-servers.recorded-continuous.json`, with a test.
  Confirms the undocumented `lagDuration` format at zero lag: `P0D` (already parsed as 0). The
  unredacted original stays in the private folder.
- Collector Lambda memory 128 → 256 MB (`collector/terraform/main.tf`): runs used 111 of 128 MB.
  Applied live during the scale test (plan showed only this change); still well inside Lambda's
  free tier.

### Scale test, step 1: test script (2026-11-18)

- `scripts/poc/source-server.sh`: instance type and disk size (`POC_INSTANCE_TYPE`, `POC_DISK_GB`),
  `POC_LOAD=postgres` (PostgreSQL 16, one numbered row committed per second, rate-limited `pgbench`
  at `POC_PGBENCH_TPS`, default 20), a cost safety net (the source server terminates itself after
  `POC_MAX_HOURS`, default 72), and new commands: `drill [snapshot]`, `last-row`, `cost` (running
  estimate at verified list prices) and `drs-down`. `verify-drill <request time>` measures data
  loss from the database, counting only rows written before the request. Setup is safe to run twice
  (a recovered drill server can re-run it). Tested: rendered scripts parse; the data-loss query
  returns 8.0 s on a sample and ignores rows written after the request; `cost` and the pre-flight
  `check` (EC2 dry run, quotas 8 vCPUs, DRS reachable) pass. Nothing launched.
- Fix found at launch: the disk size was inside single quotes in `--block-device-mappings`, so it
  never expanded (`invalid literal for int()`; nothing was created). Phase A launched 19:06 UTC;
  timeline in `docs/AWS_LIVE_POC.md`.
- `docs/SCALE_TEST_PROMPT.md`: two fixes from review (data loss counts only rows from before the
  request; setup must be safe to re-run).

### Scale test prompt; backups (2026-11-18)

- `docs/SCALE_TEST_PROMPT.md`: agent prompt for Phase A (100 GiB database server under load,
  four drills, snapshot experiment), with the founder's $25 cap, a stop-and-ask at $15, backups
  before and after, and the rule that the website changes only after results are in.
- The weekly database backup of 15 Nov had failed (`SSL SYSCALL error: EOF` during the schema
  dump); a fresh backup was taken and verified on 18 Nov. The backup now runs **daily** (was weekly),
  keeps 14, and retries each dump 3 times, 1 minute apart (`scripts/backup-db.sh`, launchd plist).

### Landing page shows the real AWS test results (2026-11-18)

- Evidence section: new "Measured in a live AWS test" panel (REAL DATA, 17–18 Nov 2026, our own
  test account, not a customer): drill 2 PASS (app verified 12 min 29 s, ~8 s data lost), drill 1
  FAIL (17 min 14 s against 15 min, one-time first-recovery setup), alert test PASS (Slack warning
  1 min 40 s after replication stopped). Figures from `docs/AWS_LIVE_POC.md`.
- The sample evidence card is now labeled "illustrative"; two stale lines updated (data loss is
  measured from real replication data; the console reads live DRS status once an account is
  connected).

### Pricing slide: honest feature labels (2026-11-18)

- Investor deck, slide 5: "Contractual RTO SLA" and "Dedicated VPC & Air-Gapped Nodes" are now
  marked "(roadmap)" (no SLA is offered yet; no dedicated deployment exists). Foundation lists the
  built AWS DRS live status, alerts and drill reports instead of "AWS DRS Staging Integration
  (roadmap)". Enterprise Pro adds the built two-person approval and tamper-evident audit log.
  Prices unchanged (founder decision pending). `docs/legal/CLAIMS_AUDIT.md` updated.

### Product decisions and scale test plan (2026-11-18)

- `docs/PRODUCT_DECISIONS.md`: founder's decisions: onboarding warm-up drill, three recovery tiers
  (Pilot Light, Warm Standby, Active-Active; times are estimates), Kubernetes recovery path
  (Terraform + GitOps + Velero/AWS Backup), AWS first (no Azure/GCP work until AWS is proven).
- `docs/AWS_SCALE_TEST_PLAN.md`: plan (not run) for a 100 GiB database server under load with
  four drills (~$13–15 estimated), then a three-server app recovered in dependency order (needs a
  vCPU quota increase).

### Deployed; AWS test found already torn down (2026-11-18)

- Deployed `5d233f1` (alert wording, stale-tab reload) with hosted migration `20261118000013`;
  268 pgTAP pass on the hosted database.
- The live AWS test had already been torn down at 02:02 UTC (CloudTrail), but STATUS still said it
  was running. Only two 1 GB DRS snapshots remain. Failback rehearsal needs a rebuild.

### Fixes from the 2026-11-18 deploy and alert test

- A console tab left open across a deploy now reloads once instead of showing "… panel failed to
  load" (`src/lib/staleChunkReload.ts`, on Vite's `vite:preloadError`; at most one reload a
  minute, none without session storage, so it cannot loop).
- Replication at-risk alert: when only the lag is over target it now says "replication is 101 s
  behind (target 60 s). No server reports an error; it is falling behind." instead of "0 of 1
  servers not replicating normally". Same in the console's audit feed. Migration
  `20261118000013_alert_wording.sql`; pgTAP 2 new tests.

### Live alert test passed (2026-11-18)

- Slack alerts proven end to end with real AWS data: stopping the DRS agent on the test server
  produced "Data-loss target at risk" in Slack 1 min 40 s later (before DRS itself reported
  `STALLED`), and "Replication back within the data-loss target" after the restart. Details in
  `docs/AWS_LIVE_POC.md` step 6. Known: the at-risk wording says "0 of 1 servers not replicating
  normally" when only the lag is over target; fix pending.

### Drill records use AWS's measured recovery time (2026-11-17)

- An operator links a drill (or failover) to the AWS DRS job that carried it out; from then on the
  drills table and the evidence report show AWS's measured time ("measured by AWS") instead of
  the simulated 5.5 s, and PASS/FAIL uses it. The console suggests the matching job ("Use AWS time
  (10 min)") and asks for confirmation. Links are permanent, audited (`run.recovery_measured`),
  and copy the job's facts onto the run, so evidence survives the job's 400-day retention.
- Migration `20261117000012_linked_recovery_times.sql`: `failover_runs.recovery_measured`,
  `link_recovery_job(run, job)` (operators; same kind, completed with every server launched, same
  Region, started 30 min before to 6 h after the request, one job per run),
  `run_recovery_seconds()`, `list_failover_runs` returns `recovery_job_id`, evidence report v5
  (`recovery_measured`, `recovery_simulated: false` when linked). pgTAP: 17 new tests.
- Unlinked runs still show "recovery time simulated", unchanged.
- `docs/MULTICLOUD_DR.md`: Azure Site Recovery REST API, jobs and read-only role confirmed from
  Microsoft Learn; proposed Azure build plan (live test first, needs founder approval for an
  Azure account).

### Collector Terraform pins its Region (2026-11-17)

- `collector/terraform/main.tf` sets the AWS provider Region to `drs_region`. Before, it used the
  shell's default Region: redeploying the live collector from a us-east-1 profile planned a
  second collector in us-east-1 (caught in plan review, not applied). Live collector redeployed
  in us-west-2 with the recovery-jobs reader (1 change, plan reviewed first); migration
  `20261117000011_recovery_jobs.sql` applied to the hosted database (dry run first; pgTAP passes
  against it).

### Second live drill: within the 15-minute target (2026-11-17)

- Drill 2: server launched 9 min 58 s after the request, web page verified at 12 min 29 s
  (target 15 min); about 8 s of data loss (target 1 min). Drill 1's extra ~10 minutes was
  one-time preparation on a server's first recovery (CloudTrail), not a repeating delay.
- `scripts/poc/source-server.sh verify-drill`: waits for the drill server in Systems Manager,
  then checks its web page and last heartbeats. `run_remote` can target another instance/Region.
- Best practices §7: run the first drill right after initial sync; plan targets from a second
  drill.
- Fix: measured recovery times round before splitting minutes ("10 min", never "9 min 60 s").

### Real recovery times measured by AWS DRS (2026-11-17)

- The collector also calls `drs:DescribeJobs` (already allowed by
  `AWSElasticDisasterRecoveryReadOnlyAccess`; no new permissions) and pushes the last 30 days of
  drill, recovery and failback launch jobs to the new `ingest_recovery_jobs` RPC (same ingest
  token). Only job metadata is stored: job ID, kind, status, start/end time, servers launched.
  A failure there never blocks the replication status push.
- New migration `20261117000011_recovery_jobs.sql`: `recovery_jobs` table (no direct client
  access), `ingest_recovery_jobs` (token-checked, at most 100 jobs, a completed job never goes
  back to running, 400-day retention) and `list_recovery_jobs` for members.
- The AWS DRS tab shows "Recoveries measured by AWS": type, servers launched and the AWS job
  time against the recovery time target. A backend without the migration hides the section.
- Verified with real data: the collector CLI read both live drills from AWS into the local
  database (drill 1: 17 min 14 s AWS job time).
- Tests: 14 new pgTAP tests, collector mapping/paging/push tests, provider mapping and panel tests.

### Console honesty: real targets only, simulated recovery labeled (2026-11-17)

- The signed-in console offers only recovery targets AetherVault really integrates with (AWS
  us-west-2, via AWS Elastic Disaster Recovery) in the failover selector, the drill region
  selector and on the globe; it defaulted to GCP before. The public demo keeps GCP, AWS and Azure
  (all simulated). An older drill schedule naming a demo-only region falls back to AWS.
  `CONNECTED_TARGET_REGIONS` / `targetRegionsFor()` in `src/config/regions.ts`.
- Drill rows say "recovery time simulated" under the modeled recovery time, and the pass summary
  says recovery times are simulated until AetherVault runs recoveries in the customer's cloud. The
  evidence report already said so. Found during the first live AWS drill, where the console showed
  5.5 s while the real DRS recovery took 19 min 47 s.
- Tests: region filtering unit tests; drills tests check the label and the AWS-only selector.
  Checked in Chrome (desktop) and headless Chrome at 390 px.

### Live AWS test moved to a standard account, cross-Region (2026-11-17)

- The DRS block on the first AWS account (a "projects" account whose AWS-managed policies deny DRS) could not be lifted by us or by AWS Support, so the founder opened a standard AWS account (approved, card on file, test budget under $10). Set up first: root MFA (passkey), no root keys, warn-only budget alerts at $10 and $25, agent IAM user with its key in the Keychain (profile `aegis-dr`). DRS is reachable there.
- `scripts/poc/source-server.sh`: source server and DRS Region are now separate (`POC_SOURCE_REGION`, default us-east-1; `POC_DRS_REGION`, default us-west-2; `POC_REGION` still sets both). New `init-drs` command initializes DRS and creates the replication defaults (encrypted GP3 staging, t3.small replication server, 10-minute/hourly/daily points in time for 7 days). `check` now reports EC2 vCPU and Lambda concurrency quotas in both Regions and treats "not initialized" as reachable.
- **Live replication (2026-11-17):** DRS initialized in us-west-2, test server up in us-east-1, agent installed; continuous replication reached at 17:30 UTC with zero lag, ~23 minutes after install. Fixes found on the way: `init-drs` now creates the six DRS service roles that `initialize-service` needs from the CLI (and no longer hides its errors); `run_remote` polls until the SSM command ends and returns its real status; the agent install adds a 1 GB swap file (the t3.micro's installer was OOM-killed) and runs with `TMPDIR=/var/tmp` (AL2023's tmpfs `/tmp` ran out of space). Lessons added to `docs/AWS_DR_BEST_PRACTICES.md` (standard account, CLI init roles, quotas, Linux installer memory and temp space).
- **Console live (2026-11-17):** collector deployed in us-west-2 with Terraform (reviewed plan, read-only DRS role, one run a minute); its first report was accepted and the console shows LIVE · AWS DRS with the test server replicating, lag 0 s, data-loss target met.
- **First live drill (2026-11-17):** DRS drill into us-west-2 from a recovery point 9 s after the request. Measured data loss none (heartbeat file, 1-minute resolution); recovery time 19 min 47 s to a verified web page, missing the 15-minute target (about 10 minutes is an unexplained wait inside the DRS job). Found two console honesty gaps to fix next: the drill row shows a modeled 5.5 s recovery even with live AWS data, and the signed-in console offers GCP and Azure targets we don't integrate with. Guide: how to verify a drill server through SSM.
- `docs/AWS_LIVE_POC.md` rewritten for the new account and us-east-1 → us-west-2: status, pre-flight results (quotas 5 vCPUs / 5 Lambda runs per Region), costs (~$5), steps, and the lesson that a customer DR account must be a standard account without a pausing spend limit.

### Public status page (2026-11-16)

- Hosted setting: GitHub Pages turned on for `aethervault-status` (founder approved), so the uptime page is public at https://anwozo157.github.io/aethervault-status/. It shows only up/down and response times for the website, sign-in service and database API (the anon key it uses is already public in the site's code).

### Status monitor fixed (2026-11-16)

- Hosted setting: `aethervault-status` repo, Actions workflow permissions changed from read to **read and write** (founder approved) so the uptime monitor can commit its results. It had never completed a run since it was created on 2026-11-15; the checks themselves always reported the site, sign-in and database up. Chosen over a personal access token: the built-in token is short-lived and limited to that repo. All 6 monitor workflows re-run green.

### MFA remediation recorded (2026-11-15)

- New `docs/reviews/2026-11-15-mfa-remediation.md`: MFA verified on 4 of 5 company accounts and FileVault on; the last account is blocked by a provider-side restriction (tracked privately). Review index and policy approval notes updated.

### Security policies approved (7 of 10) (2026-11-15)

- `docs/policies/README.md`: recorded founder approval of 7 policies now true as written (information security, change management, incident response, vendor management, business continuity/DR, data management, risk management). Acceptable use and access control are **held** until MFA on all company accounts and FileVault are confirmed; AI use is held for counsel. Product controls behind the policies verified in code (two-person DB constraint, hash-chained append-only audit log, RLS, roles, Supabase Vault for alert secrets, CSP, passwordless sign-in).
- Pre-push review (Opus 5.5): every claim in the 7 in-effect policies re-checked against the repo and live settings (FileVault on, Dependabot alerts on, branch protection requires CI + gitleaks + CodeQL, deploy script blocks local-DB builds, CSP enforced by E2E). Fixed the README header that still said "awaiting approval"; the two held policies now wait only on MFA.

### Security test agent + SOC 2 Type I sprint (2026-11-15)

- New `docs/security/SECURITY_TEST_AGENT.md`: a paste-in prompt turning a coding agent ("The Big Getty Star") into an in-house multi-cloud security/pen-test engineer, with hard authorization guardrails, an OWASP/NIST methodology, a free open-source toolchain (semgrep, gitleaks/trufflehog, Prowler, ScoutSuite, OWASP ZAP, checkov/tfsec), the AetherVault-specific attack surface (RLS multi-tenancy, two-person approval, hash-chained audit log, collector token), and the read-only credentials each cloud needs (AWS SecurityAudit+ViewOnlyAccess, GCP Security Reviewer, Azure Reader+Graph). Explicitly not a replacement for the independent human pen test.
- New `docs/SOC2_TYPE_I_SPRINT.md`: deep dive on SOC 2 Type I, an aggressive 30-day readiness sprint (founder vs agent tasks), a control→evidence matrix (CC1–CC9, A1), lean-path costs, and the settled pen-test question (Type I does not mandate a pen test; AI-only won't satisfy an auditor as the independent test).

### Trust pack for customer security reviews (2026-11-15)

- New `docs/trust/`: an index of what to send a customer's security team at each stage and the honest answer to each gap (SOC 2, pen test, insurance, SSO, SLA, backups); "What leaves your AWS account" (every field the collector sends, checked against `src/integrations/awsDrs/snapshot.ts`); a shared-responsibility table (customer / AetherVault / AWS) with the two pilot access options; and a SOC 2 status letter template with dates for the founder to fill. All drafts for counsel; no new claims.
- Security questionnaire links to the trust pack.

### AWS: project renamed, activation retried (2026-11-15)

- AWS project renamed to AetherVault. Activating advanced features (the documented route to DRS on AWS's simplified account type) still returns "not eligible"; next step is the AWS support case. Recorded in `docs/AWS_LIVE_POC.md`.

### Consistent AetherVault naming (2026-11-15)

- npm package renamed `aethervault-command-center` → `aethervault`. GitHub repository now has a description and links to https://getaethervault.com. Audit: the product is named "AetherVault" consistently across code, docs, site, email sender, Supabase project and the other AetherVault repositories; "command center" and "Mission Control" remain only as descriptions of screens. The AWS account is still named "Moonshot Mode" (AWS's default); renaming it is blocked by the same AWS policy as DRS and is a founder step in AWS Settings.

### Customer name removed from the repository (2026-11-15)

- All mentions of the first pilot customer's company name, and details that identify it (its data center, field app and network equipment), replaced with neutral wording ("the pilot customer") across docs, the CHANGELOG and the POC script. Keeps the public repository free of other companies' names ahead of trademark work. Customer specifics live in the founder's private notes. Earlier git history still contains the old wording.

### SOC 2 founder steps: secret-scanning extras not available (2026-11-14)

- `docs/SOC2_PROGRAM_PROMPT.md`: the "non-provider patterns" and "validity checks" secret-scanning settings could not be turned on. GitHub leaves them off for this personal account on the free plan, so they appear to need paid Secret Protection. Removed as a founder step; secret scanning, push protection, Dependabot and gitleaks stay in place.

### Records and security housekeeping (2026-11-15)

- `docs/STATUS.md`: new "Finding what's done" guide (where each kind of record lives), refreshed header and AWS next steps, and a founder to-do to back up the private folder.
- `docs/SECURITY.md`: credential inventory brought up to date (AWS agent key, Supabase CLI token and DB password, Resend key, Cloudflare token, with Keychain item names and rotation dates; no values).
- AWS account ID and support case number removed from public docs (kept in the founder's private notes), per the public-repo rule. They remain in earlier git history; AWS doesn't treat account IDs as secrets.

### SOC 2 session 3: recovery drill, questionnaire, evidence and status repositories (2026-11-14)

- Recovery drill of AetherVault's own database (`docs/reviews/2026-11-14-recovery-drill.md`): latest backup restored into an empty stack in about 2 minutes; row counts, audit chain, scheduled jobs and security objects match. Finding: a restored project kept Supabase's default grants (signed-out users could run all 59 functions; production allows 1). `docs/BACKUPS.md` step 4 now revokes them and re-applies production's exact grants; verified.
- `docs/compliance/SECURITY_QUESTIONNAIRE.md` (standard answers for pilots) and `docs/compliance/OUTREACH_DRAFTS.md` (Supabase report access, auditor and pen test quote requests; not sent).
- New repositories: `Anwozo157/aethervault-evidence` (private; holds the specifics behind public review records) and `Anwozo157/aethervault-status` (Upptime monitor and status page; starts once the founder adds its token).
- Program doc: key decisions recorded (Security + Availability; skip Type I unless a buyer asks; no platform yet), founder steps (status page token, Cloudflare security headers, secret scanning extras), current state.

### Fix: AWS setup guide only accepts known regions (2026-11-14)

- The Connect-your-AWS guide remembered the recovery region in browser storage and used it as-is in the "Open Elastic Disaster Recovery" link and in the copyable agent and `aws drs` commands. A tampered stored value could have put arbitrary text into a command someone pastes into a terminal. The region is now checked against the offered list (`isDrsRegion`) on load and on change, falls back to `us-west-2`, and is URL-encoded in the link. Closes the CodeQL `js/xss-through-dom` alert. Tests cover tampered storage; verified in a browser at desktop and 390px.

### Open-source license notices now ship (2026-11-14)

- New build plugin `scripts/license-notices.mjs` (no dependencies): every build emits `THIRD_PARTY_NOTICES.txt` with the license text of each open-source package actually bundled (29 in the website, 20 AWS SDK packages in the collector's `lambda.zip`). The site footer links to it ("Open-source notices"). Fixes the finding in `docs/legal/OSS_LICENSES.md`; unit-tested.

### Fix: worktrees inside the repo no longer break verify (2026-11-14)

- Vitest, ESLint and Prettier ignore `.claude/` (agent worktrees and settings) and nested `node_modules`; Prettier also ignores `supabase/.temp`. A git worktree under `.claude/worktrees/` made `npm run verify` from the main checkout run every test twice and fail on its linked `node_modules`.

### Legal prep prompt for working with counsel (2026-11-14)

- Legal prep tasks T1–T15 done. New in `docs/legal/`: company fact sheet, data inventory (from the schema; flags that member emails sit in the append-only audit log and in laptop backups), customer-facing sub-processor list with verified vendor terms, AI tools register (+ draft `docs/policies/ai-use.md`), open-source license report (`scripts/license-report.mjs`: 131 production packages, no copyleft; finding: the build ships no license notices), claims audit, security overview and website terms drafts; privacy notice and SLA drafts updated (technical logs, 7-day status retention, US storage; Supabase uptime SLA is Enterprise-only). README now labels the multi-cloud target selection as simulated. Privileged material is in the founder's private workspace.
- `docs/LEGAL_PREP_PROMPT.md`: an agent prompt, a matter map (15 areas where AetherVault may need counsel, matched to Kim Larsen's public practice areas at Stinson LLP, ordered by urgency: engagement, company foundation and IP, the first pilot agreement, DPA and incident duties, hosting terms, AI-built code) and a 17-step task list that runs until the founder must step in. Privileged material, negotiation positions and fees stay in a private local folder, never in this public repo.

### SOC 2 program: prompt v2 and first monthly check (2026-11-14)

- `docs/SOC2_PROGRAM_PROMPT.md` v2: "Current state" block, key decisions table (scope, Type I vs straight to Type II, Supabase report, platform, auditor criteria, private evidence store), read-only evidence rule, git lessons (worktrees outside the repo; verify right before every commit, merge and push), Supabase Team price confirmed ($599/month).
- First monthly control check (`docs/reviews/2026-11-14-monthly-check.md`): backups, Dependabot, code and secret scanning, CI, database health, vendor status. 2 findings tracked privately.

### SOC 2 program: policies, records and plan (2026-11-14)

- `docs/SOC2_PROGRAM_PROMPT.md`: reusable agent prompt plus the plan of record (phases A–G with exit criteria, budget ranges with sources, timeline to Type I and Type II).
- `docs/policies/`: nine policies (information security, acceptable use and code of conduct, access control, change management, incident response, vendor management, business continuity/DR for AetherVault itself, data management, risk management) with an approval and acknowledgement table. Draft v1.0, awaiting founder approval.
- `docs/compliance/`: risk register (18 risks), vendor inventory, system description draft (DC 200 structure, subservice organizations, customer responsibilities), roles, training plan, control calendar.
- `docs/reviews/` (template + first access, endpoint and vendor review, read-only), `docs/incidents/` (template), `docs/legal/` (privacy notice and SLA drafts for legal review).
- `docs/SOC2_READINESS.md`: 17 controls in place, 21 partly, 5 not started (was 11 / 15 / 16, plus one unchecked); `docs/SECURITY.md` links the program and states encryption at rest.

### AWS live test: collector deployed for real, two Terraform fixes (2026-11-14)

- Deployed the collector with Terraform in our own AWS account (Ohio) and ran the test source server. Everything except DRS works: the Lambda runs on its EventBridge schedule (~100 ms, ~110 MB), calls `DescribeSourceServers` with its read-only role, and logs to CloudWatch; the only error is AWS's DRS block. The source server's heartbeat and web page check out through SSM (no open ports).
- Fix: reserved concurrency is now optional (`reserved_concurrency`, default off). New AWS accounts allow only 10 concurrent Lambda runs, and AWS refused the reservation of 1, so `terraform apply` failed. The database already rejects reports less than 20 s apart.
- Fix: no automatic retries (`aws_lambda_function_event_invoke_config`, 0 retries). AWS retried every failed scheduled run twice, so a failing collector ran 3 times a minute. First deploy now creates 9 resources.

### AWS live test: Ohio-only plan and test source server (2026-11-13)

- `scripts/poc/source-server.sh`: creates, checks and removes a small test server in our own AWS account (stands in for the pilot customer's server; no SSH, no inbound ports, encrypted disk, managed through SSM; heartbeat file every minute so lag and data loss are visible). `check` runs free dry runs: EC2 launches are allowed in us-east-2; Elastic Disaster Recovery is still denied by an AWS-owned service control policy.
- `docs/AWS_LIVE_POC.md` rewritten for the actual situation: the agent access-key route, the two AWS-owned blocks, and an Ohio-only test (same-Region recovery into another Availability Zone), so only the DRS block has to be lifted.

### Backup restore rehearsed; scheduled jobs now backed up (2026-11-12)

- Practice restore of the weekly backup into an empty local Supabase: data identical to production (fingerprints matched), audit chain intact, all security policies, functions and triggers present.
- Found: the dump skipped the two pg_cron jobs (drill scheduler, alert sweeper), so a restore would have silently stopped drills and alerts. `scripts/backup-db.sh` now also saves them as `cron.sql`; restoring it brought both jobs back and they ran. `docs/BACKUPS.md` has the tested steps and lessons.

### Weekly database backup (2026-11-11)

- `scripts/backup-db.sh` + a launchd schedule (Sundays 10:00): `supabase db dump` of roles, schema and data (including `auth` and every `public` table) to `~/Backups/AetherVault` on the founder's Mac, owner-only permissions, newest 8 kept, failure notification. Free stand-in until Supabase Pro's managed backups; `docs/BACKUPS.md` has the restore steps (not yet rehearsed).

### Customer sign-in email via Resend (2026-11-11)

- Supabase Auth now sends through Resend (free plan) as `AetherVault <no-reply@getaethervault.com>`, so magic links reach customer addresses (pilot blocker B9 done). DKIM, sending and DMARC (report-only) records added on Cloudflare; details in `docs/CUSTOM_DOMAIN.md`.

### Company email on the site (2026-11-11)

- Landing page: `CONTACT_EMAIL` set to `antonio@getaethervault.com`, so the "Ask about a pilot" button appears (it was hidden until a professional address existed).
- Security policy (`SECURITY.md`, `docs/SECURITY.md`): reports can also go to `security@getaethervault.com`. Known gaps updated (custom domain live but GitHub Pages still can't send `frame-ancestors`; hosted backend exists).
- README cost line now mentions the domain (~$11/year). `docs/PILOT_DAY.md` B1 done, B9 half done; `docs/AWS_LIVE_POC.md` records the AWS account status and the IAM-user + `aws login` route; `docs/CUSTOM_DOMAIN.md` marked live, with the email and Resend next steps.

### Custom domain: getaethervault.com (2026-11-11)

- Domain `getaethervault.com` registered at Cloudflare and verified with GitHub Pages. DNS: GitHub Pages A/AAAA records and `www` CNAME (DNS only). Email Routing forwards antonio@, support@, security@ and billing@ to the founder's inbox (MX, SPF, DKIM by Cloudflare).
- `public/CNAME` and `LIVE_URL` (share links and QR) now point at it; README and the deploy message too. Supabase auth redirects updated to the new address (old address kept during the move).
- `docs/CUSTOM_DOMAIN.md`: go-live order (DNS first, then deploy), GitHub domain verification, the GitHub Pages DNS records (DNS only), Supabase auth redirect update, and checks.

### Docs: multicloud research and live AWS proof of concept (2026-11-10)

- `docs/MULTICLOUD_DR.md`: Azure Site Recovery for physical servers (architecture with the on-premises replication appliance, ports, recovery points, supported systems, test failover, monitoring fields, pricing model), sourced from Microsoft Learn, with unverified items marked. A side-by-side table compares it with AWS. Google Cloud research is blocked (docs domain not fetchable from this session), so that section lists the exact pages to read next. It also lists what adding a cloud to AetherVault takes.
- `docs/AWS_LIVE_POC.md`: a live test in our own AWS account before the first customer pilot: what's needed, cost (about $12–20 for a week), steps, done-when, teardown.

### Phase 3.6: Hosted Supabase project (2026-11-10)

- **Hosted backend:** Supabase project `aethervault` (us-east-1, Free plan) linked; all 10 migrations pushed (no seed data, so no demo accounts exist in production). All 235 pgTAP tests pass against it; `pg_cron` jobs (drill scheduler, alert sweeper) are running; `pg_net`, Vault and pgcrypto are installed; row-level security is on for every public table.
- **Auth:** site URL and the only allowed redirect are the GitHub Pages address; the hosted console signs in by magic link only; email confirmation stays on (invites match by email, so unverified addresses must never sign in); 12-character minimum with letters and digits.
- **Production build** reads `.env.production` (project URL + public anon key; committed, public by design). The Content-Security-Policy now allows exactly that project (HTTPS + WSS). `.gitleaks.toml` allowlists only that exact key; a test confirms any other JWT, such as a service key, is still flagged.
- Checked in a browser against a local production build: the hosted API answered with no CSP errors, and the collector endpoint rejected a fake token (401).
- **Fix:** "local database" is now a build-time constant (`__LOCAL_BACKEND__`). Production bundles no longer contain the local mail-inbox URL or the demo-account list, and the deploy guard against local URLs passes. The local console E2E still signs in with the demo accounts.
- The database password was reset to a generated value kept only in the macOS Keychain.
- Not yet: Supabase's built-in email reaches only the Supabase organization's team members, so customer sign-ins need custom SMTP.

### Phase 4.7: Connect-your-AWS-account guide and DR documentation (2026-11-10)

- **Connect your AWS account** (AWS DRS & Telemetry tab): a six-step guide. (1) Choose the recovery Region and initialize Elastic Disaster Recovery. (2) Open the network path (TCP 443 and 1500). (3) Install the replication agent: Linux and Windows commands for the chosen Region, using short-lived credentials. (4) Create the collector token. (5) Deploy the collector: `terraform.tfvars` filled in with this console's URL, anon key and the new token, plus plan/apply commands. (6) Confirm live data. The token, connection and live-data steps are checked against the server; the admin ticks the rest, and progress is remembered per organization in the browser. Sample data never counts as connected. The guide warns when the console runs on a local database a collector in AWS can't reach. It is open until the account is connected, then folds away.
- **Docs:** `docs/AWS_DR_BEST_PRACTICES.md` (account and Region, network, agent install, replication and launch settings, drills, failback for physical servers, monitoring, cost; sourced from AWS documentation). `docs/TERRAFORM.md` (version pinning, plan/apply discipline, least-privilege deployer, secrets in tfvars and state, S3 remote state with native locking, day-2 operations). `docs/PILOT_DAY.md` (blockers, week-before, on-the-day steps, first drill, removal, troubleshooting, pilot-customer questions). Collector README links them.
- **Terraform:** `collector/terraform/backend.tf.example` (encrypted S3 state with `use_lockfile`); `backend.tf` and `tfplan` are gitignored.
- Tests: guide unit tests (helpers, remembered progress, token into tfvars shown once, replace confirmation, live/sample/stale states, read-only for non-admins, local-database warning) and a browser check.

### Phase 4.6: DR runbooks (2026-11-10)

- **Runbook tab** (console): each organization keeps one versioned runbook of steps for before, during and after recovery. Admins edit it (add, reorder, remove; up to 50 steps) or start from a generic AWS Elastic Disaster Recovery template; everyone else reads it.
- **Per-run checklist:** every drill and failover copies the runbook version in force when it starts, so later edits never rewrite history. Operators and above tick steps off with an optional note for 7 days after the run. Ticks are permanent and audited (who, when, note).
- **Evidence report v4** adds the checklist: "Runbook (v1): 7 of 10 steps done", with who did each step and when. Activity log and audit log describe runbook edits and ticks; drill results in the audit log now include the measured data loss.
- Tests: 28 pgTAP (admin-only edits, validation, ids kept, versioning, copy at launch, tick rules, closed after 7 days, no direct table access, evidence), panel and provider tests, and a console E2E (template → drill → tick → evidence).

### Phase 4.5: Measured data loss (RPO) in drill and failover evidence (2026-11-10)

- **Measured RPO:** when a drill launches or a failover is approved, the latest replication snapshot received in the 5 minutes before is copied onto the run. Its worst replication lag is the measured data-loss window. The copy lives on the run, so evidence outlives the 7-day snapshot retention. No snapshot in the window means "not measured", as before.
- **Verdict:** a drill now passes only if recovery met the RTO **and** the measured RPO (when there is one) was not missed. The scheduler's drill result, alerts, Drills table, evidence report and activity log all use the same rule.
- **Evidence report v3:** the RPO line says met or MISSED, the worst lag vs target, how many servers were replicating, and where the number came from (AWS DRS region, last 4 digits of the account, collection time). Sample data is labeled `SAMPLE DATA (not a real account)`. Recovery time is labeled simulated. Older reports keep their original wording.
- **Alerts:** drill messages add the data-loss result ("Data-loss target MISSED: worst lag 130 s (target 60 s, measured from AWS DRS)") or say it was not measured.
- Tests: 22 pgTAP (capture at launch/approval only, stale data ignored, pass/fail rule, list and evidence fields, alert wording, sample-data label, clients cannot write or call the capture), unit tests for the verdict and the RPO sentence, and a browser check of a drill against sample data.

### Phase 4.4: Real replication status from AWS Elastic Disaster Recovery (2026-11-10)

- **Collector** (`collector/`, core in `src/integrations/awsDrs/`): a read-only Lambda for the customer's AWS account calls `drs:DescribeSourceServers` every minute and pushes replication status only (state, lag, backlog/total/replicated bytes, ETA, last seen, error code). AWS managed policy `AWSElasticDisasterRecoveryReadOnlyAccess`; push model, so AetherVault needs no access to the customer's account. Terraform module (`collector/terraform`, validated), single-file Lambda package (`npm run collector:package`), CLI with `--fixture`, `--dry-run`, `--record` and `--watch`.
- **Ingest:** per-organization ingest token (192 bits, SHA-256 stored, shown once, rotate/revoke, audited); `ingest_replication_snapshot()` validates and sanitizes input, computes server health and RPO met/at risk itself, rate-limits to one snapshot per 20 s, keeps 7 days.
- **Console:** AWS DRS & Telemetry tab gains a Replication panel: LIVE / STALE (no update for 5 min) / SAMPLE DATA badge, data-loss target met or at risk with worst lag vs target, servers replicating, backlog, lag sparkline, per-server status (state, error code, initial-sync progress and ETA, lag, backlog, last seen), and the Connect AWS token flow. The simulated HUD below stays labeled simulated.
- **Alerts:** new "Replication at risk" event: RPO breaches page and recoveries resolve (PagerDuty), with sample data marked `[SAMPLE DATA]`.
- **Fix:** a WebGL failure on the 3D tab no longer makes other tabs show "failed to load" (each panel's error boundary is keyed).
- **Sample responses** are hand-built from the AWS API reference (no AWS account yet), not recorded; `lagDuration`'s format is undocumented, so unparseable values show as "lag unknown". Record real responses on pilot day with `--record`.
- Tests: 29 pgTAP (tokens, validation, health mapping, breach/recovery transitions, alert queued), 25 collector unit tests against the sample responses (pagination, parsing, status-only payload, push errors), panel and provider tests, and a console E2E running the real collector code into the local database. Lambda package checked in isolation (reaches the AWS API with placeholder credentials and is rejected, as expected).

### Phase 4.3: Slack and PagerDuty alerts (2026-11-10)

- **Alerts tab** (console): admins add Slack (incoming webhook) or PagerDuty (Events API v2) channels and choose events: failovers, failed drills, passed drills. Everyone in the organization sees the channels and recent deliveries; admins can send a test or remove a channel.
- **What is sent:** failover requested (needs a second approver), approved, withdrawn, aborted, reset; drill passed, failed or aborted. Drill messages say the telemetry is simulated. PagerDuty incidents are keyed per run, so withdrawing, aborting or resetting a failover resolves its incident; passed drills never page anyone.
- **Security:** secrets are encrypted with Supabase Vault, never returned to the browser (last 4 characters only) and never written to the audit log. Only Slack webhook URLs and the fixed PagerDuty endpoint are accepted, so the database cannot be pointed at other hosts. Adding, removing and testing channels is audited.
- **Reliability:** an audit-log trigger queues alerts with `pg_net` (sent after commit). Any alerting error is caught and logged as a failed delivery; it can never block or undo a failover. A `pg_cron` job records each HTTP result (sent / failed with status and reason) every minute.
- Not yet: replication-lag alerts (telemetry is simulated until AWS is connected) and email (needs a mail provider).
- Tests: 29 pgTAP tests (validation, look-alike hosts rejected, secrets in Vault only, routing per event, PagerDuty trigger/resolve and dedup keys, simulated labels, sweep results, broken channel never blocks a failover, secret deleted on removal), unit tests for the panel and provider, and a console E2E (masked secret, viewer read-only, removal) that never sends anything.

### Phase 4.2: Scheduled drills (2026-11-10)

- **Non-disruptive drills:** a drill launches recovery in an isolated network and never cuts production over (the AWS Elastic Disaster Recovery drill model), so it runs without a second approver. Drills never show as the live failover and never block a real one; one drill runs at a time per organization.
- **Drill schedule** (Drills tab): admins choose weekly, monthly or quarterly, the first drill time and the recovery region; operators and above can **Run drill now**. Monthly and quarterly drills are anchored to the first date, so they don't drift. The panel shows the next drill and warns if a schedule is overdue (scheduler not running).
- **Scheduler:** `run_drill_scheduler()` runs every minute through `pg_cron` (free, included in Supabase). It records finished drills as `drill.completed` (passed / failed against the recovery-time target, or aborted) and launches due drills as the system (no actor). Telemetry is still simulated and labeled so.
- **Evidence reports v2:** add the run type and trigger; drill reports show who or what started the drill, state that the two-person rule is not required, use drill stage names (no DNS cutover) and omit time-to-approval. The runs table gains a Type column.
- Audit log and live log describe drill events in plain words.
- Tests: 31 pgTAP tests (cadence maths, permissions, one drill at a time, drills invisible to live status, pass/fail, system actor, evidence), unit tests for the schedule UI and provider mapping, and a console E2E (admin schedules, operator runs a drill that passes, evidence report).

### Landing page (2026-11-09)

- **New front page** at the site root for buyers and engineers: what AetherVault does, how it works (replicate, drill, prove), evidence reports, console controls, security model and founding-customer pilots.
- **Hero:** the real 3D globe plays a simulated failover on loop (active sync, quiesce + snapshot, hydrate, DNS cutover, target secured) with a synced stage tracker; labeled SIMULATED.
- **3D replication scene** (three.js): a legacy server rack streams data blocks into a glass vault (your AWS account) and a recovery server materializes on demand; labeled ILLUSTRATIVE, loads only near the viewport and animates only while visible. Reduced-motion users get still frames.
- **Honesty:** every visual is labeled simulated or illustrative; RPO/RTO wording follows AWS's documented ranges; SOC 2 stated as not yet. Contact buttons stay hidden until `CONTACT_EMAIL` (`src/config/site.ts`) is set.
- **Routes:** the demo moved to `#/demo`; the Share QR now opens `#/demo` directly; console "back" links point to the demo.
- **Performance:** the demo and all 3D code are lazy-loaded, so the first JavaScript download fell from 102.3 kB to 51.6 kB gzip.
- Tests: landing unit tests (headline, demo links, honesty labels, lazy 3D, contact and sign-in visibility), route tests, landing E2E (no errors, demo link, anchors, no horizontal scroll) and the CSP check now covers the landing page and its 3D scene.

### SOC 2 readiness checklist (2026-11-09)

- `docs/SOC2_READINESS.md`: self-assessment against the Trust Services Criteria (Security CC1–CC9 + Availability), with evidence and gaps per control, free next steps and items that need funding. Explicitly not an audit or certification.
- GitHub branch protection on `main` (founder-approved): the 5 CI and CodeQL checks are required, force pushes and deletion are blocked, review conversations must be resolved. Admins can bypass so the founder's local merge-then-push workflow still works.

### Status update (2026-11-09)

- `docs/STATUS.md`: Phase 4.1 drill evidence reports marked done (Phase 4 in progress); health counts updated (160+ unit, 96 pgTAP, 10 console E2E).

### Phase 4.1: Drill evidence reports + recovery objectives (2026-11-09)

- **Drills tab** (console): recovery-time and data-loss targets (admins edit; changes audited), a table of every drill with outcome and recovery time vs target (PASS/FAIL), and a summary ("N of M completed drills met the target").
- **Evidence report** per drill: result, people (requester, approver, two-person rule), stage timeline, related audit entries with hashes, audit-chain status at generation time, generator and time. **Print / Save as PDF** (clean one-page layout) and **Download JSON**; a SHA-256 **fingerprint** of the canonical JSON is printed on the report so a saved copy can be checked later.
- Honest by design: the data-loss (RPO) result says "not measured" until real replication data is connected.
- Aligned with AWS Well-Architected REL13-BP01 (define RTO/RPO) and REL13-BP03 (test DR, verify objectives are met).
- Database (`20261109000005_drill_evidence.sql`): `orgs.rto_target_seconds`/`rpo_target_seconds`, `set_recovery_objectives`, `run_outcome`, `list_failover_runs`, `drill_evidence`. 16 new pgTAP tests (96 total).
- E2E: a two-person drill shows PASS; the downloaded JSON's SHA-256, recomputed independently, matches the fingerprint on the report.

### Team invites and onboarding (2026-11-09)

- **Team tab** (console): admins invite by email with a role (with a plain explanation of each role), get a ready-to-send invite message (copy button), change roles, remove members (with confirmation) and revoke pending invites. Non-admins see the team read-only.
- **Joining:** after sign-in, `accept_pending_invites()` adds the person to every organization that invited their **verified** email, with the invited role. Users in several organizations get an organization switcher in the header.
- **Onboarding checklist** for admins: create organization, invite an approver, run a first drill, verify the audit chain; computed from real data, dismissible per organization.
- **Database** (`20261109000004_team_invites.sql`): `org_invites` with RLS; `invite_member`, `revoke_invite`, `accept_pending_invites`, `remove_member`, `list_org_members`, `list_org_invites`. Admins cannot remove or demote themselves; unverified emails never join; every change is audited (`member.invited/joined/removed/invite_revoked`). 20 new pgTAP tests (80 total).
- **E2E:** a brand-new founder signs up by email link, creates an organization, invites a teammate; the teammate signs in and lands in that organization as approver; the founder's team list updates live.
- **Fixes:** panels now refresh on every new activity (the activity list is capped at 50, so its length stopped changing); screen-reader-only labels inside scrolling tables no longer widen the page on phones (Team and Audit tables).
- Invite emails are not sent automatically yet (needs an email service with hosting); the admin sends the generated message.

### Deck roadmap, GitHub protections, status (2026-11-09)

- Deck roadmap slide: Phase 2 now describes the built approval and audit backend (runs locally; telemetry still simulated) instead of only simulated telemetry; Phase 1 mentions the real-geography globe.
- GitHub repository: enabled secret scanning with push protection, private vulnerability reporting, Dependabot alerts and automated security fixes.
- `docs/STATUS.md` rewritten: 3.5 and 3.7 done, 3.6 CI done (hosting waits on the founder's free Supabase account); next steps split into founder actions, free Phase 4 work, and items requiring funding.

### Security hardening (2026-11-09)

- **Content-Security-Policy** in every production build: scripts only from the site itself (no inline, no eval), network calls only to the site and its configured database (https + websocket), no plugins; plus a strict referrer policy. Tested on every screen in CI, public demo and console.
- **Secret scanning:** gitleaks scans the full git history in CI (70 commits scanned locally: no leaks).
- **Password policy:** minimum 12 characters with letters and digits (local config; carried to the hosted project in 3.6).
- **`docs/SECURITY.md`:** threat model, data flow, what is encrypted where (and why browser code is not), controls, credential inventory with backup/rotation runbook, incident runbook. Root `SECURITY.md` for private vulnerability reports.

### Phase 3.5: Audit log screen + tamper check (2026-11-09)

- New **Audit Log** tab in the signed-in console (hidden in the public demo):
  - newest-first table with person, plain-language action, details and fingerprint
  - filter by action or person; older entries load in pages
  - **Verify chain** recomputes the SHA-256 chain on the server: "Chain intact: N entries verified", or "Tampering detected: entry #N was altered" with that row highlighted
  - **Export CSV** for auditors, carrying the chain status; spreadsheet-formula injection neutralized
- Database: `audit_log_page()` (keyset pages with hashes) and `verify_audit_chain_report()`; 10 new pgTAP tests (60 total), including tamper detection.
- End-to-end proof: a browser test alters a past entry directly in the database, bypassing the app, and the screen flags that exact entry.
- Tests: 137 unit tests; console E2E 7/7.

### Always-current Share QR; deck accuracy (2026-11-09)

- Each build publishes `version.json`. Opening Share checks it (no cache) and builds the QR from the newest live version, so even a stale cached page hands out the current build; a stale page offers a reload. Version strings are validated (hex only) before use.
- Pitch deck: replaced "85% of human-error outages stem from procedures (Uptime 2025)", which could not be verified on any public page, with the verifiable figure: 80% of operators say better management and processes would have prevented their most recent outage (Uptime 2025).
- Investor market report written (Claude Doc, sourced; backup in Obsidian).

### Globe rebuilt on real geography; local QR codes (2026-11-09)

- **Fixed:** AWS us-west-2 (Oregon) was placed by hand-picked coordinates ~120° around the globe, and its bezier arc dipped below the surface, so the route vanished inside the globe. Regions now use real data-center coordinates (`config/regions.ts`) and great-circle arcs that are tested to stay above the surface for every route.
- **Globe upgrade:**
  - Continents drawn as a dot matrix from Natural Earth (public domain; generated once by `scripts/generate-land-mask.mjs`, no runtime fetch), plus an atmosphere glow and a faint graticule
  - Labeled region markers with pulse rings; standby regions shown dimmed
  - Comet-trail packets; replication reverses toward the former primary after failover
  - North America framed at rest with a gentle sway; real great-circle distance shown
- Removed unverifiable overlay text ("Three.js 60FPS", "eBPF", a data-center name).
- **Share on Phone:**
  - QR generated in the browser (MIT `qrcode`, loaded on open) instead of the third-party api.qrserver.com service
  - Links carry the build version (`?v=<commit>`) so phones never show a stale cached deploy
  - Build stamp, copy-link button, Escape/backdrop to close
  - Verified by decoding the rendered QR with an independent reader; zero external requests
- Tests: geometry (arcs above surface, distances), land-mask accuracy, share URL/QR (126 unit tests total).

### Local sign-in fixes (2026-11-08)

- Sign-in form (local mode): "Email me a sign-in link" now says no real email is sent and points to the local inbox (Mailpit, http://127.0.0.1:54324), instead of claiming the email was sent.
- Console dev env file renamed to `.env.development.local` (dev server only). A `.env.local` would also be read by `vite build`, which could have published a site pointing at a local database.
- `npm run deploy` refuses to publish a build that references a local Supabase URL (verified against a deliberately bad build).

### Phase 3.4: Signed-in console with two-person approval (2026-11-08)

- `SupabaseDrProvider`: second `DrProvider` implementation. Failover workflow, approvals and audit log are real and shared live across browsers (Realtime + 5 s poll fallback); stage derived from server time with clock-skew correction. Telemetry stays simulated; header shows **SIMULATED TELEMETRY**.
- Console at `#/console`: email + password or magic-link sign-in, org bootstrap (create org), approval panel (approve / withdraw / reject), view-only notice for viewers, org + role + sign-out in the header. Loaded lazily; public demo bundle unchanged.
- Database: `get_failover_status()` and `org_audit_feed()` RPCs (11 new pgTAP tests, 50 total); local-only `seed.sql` demo org with one user per role.
- Tests: `SupabaseDrProvider` unit tests against a fake server; `npm run e2e:console` runs two real browsers through request → approve → secured → reset against local Supabase.
- Security: `.env.*` git-ignored (only `.env.example` tracked); only the public anon key is used in the browser.

### Toolchain upgrade (2026-11-08)

- Vite 5 → 8, Vitest 2 → 5, @vitejs/plugin-react 4 → 6, framer-motion 11 → 14, jest-dom 6 → 7, plus minor/patch updates; GitHub Actions checkout/setup-node/upload-artifact v7, codeql-action v4. Supersedes Dependabot PRs #1–#9.
- `npm audit`: 0 vulnerabilities (minimatch override for typescript-estree, GHSA-g3hv-75wg-m249). Clears the Vite 5 / Vitest 2 dev-server advisories.
- New provider tests keep coverage thresholds under Vitest 5's stricter counting.

### Phase 3.2–3.3: Database schema verified (2026-11-08)

- Ran the pgTAP suite against local Supabase (Postgres 17): all 39 tests pass with no schema changes. Covers each role's allowed and denied actions, signed-out and non-member access, the two-person rule, one open run per org, abort refused from DNS cutover on, reset only after the target is secured, append-only audit log, and hash-chain tamper detection.
- `docs/ARCHITECTURE.md`: new Database section.

### Housekeeping (2026-11-08)

- Repo moved to `~/Developer/AetherVault` via fresh clone; old iCloud-synced copy (with " 2" conflict duplicates, including inside `.git`) moved to Trash.
- Phase 3 plan and ADRs 0001–0003 accepted by the founder.

### Phase 3 planning (2026-11-08)

- `docs/PHASE_3_PLAN.md`: backend MVP on Supabase free tier (auth, roles, server-side failover, two-person approval, tamper-evident audit log), plus funded-cost estimates (~$65–90/mo to start).
- ADRs 0001–0003 (`docs/adr/`): platform, auth/RBAC, failover + audit design. Status: Proposed.

### Founder slide from Cloud Architect resume (2026-11-08)

- Bio now leads with the founder's hybrid-cloud DR design (AWS Elastic Disaster Recovery, Direct Connect, private BGP; modeled sub-15-minute RTO; projected DR cost $3,000+/mo → $436/mo), per `Antonio_Nwozo_Cloud_Architect_Resume.pdf`. Worded as designed/modeled, matching the resume.
- UFC event described as the UFC event at the White House marking America's 250th (resume's "UFC 250" label refers to a different 2020 event).
- Inauguration year kept as 2025 (inaugurations occur in January after the election; both resumes say 2025).
- Chips: Core Expertise "DevOps Engineer", Cloud DR Design "AWS DRS • Direct Connect • BGP", Track Record "100+ Deployments".

### Phase 2c: Continuous integration (2026-11-08)

#### Added

- GitHub Actions CI (`.github/workflows/ci.yml`) on every push to `main` and every pull request: lint, typecheck, unit tests with coverage thresholds, build, bundle budget, production dependency audit, and the Playwright suite (desktop + mobile). Failure uploads the Playwright report.
- CodeQL security scanning on pushes, PRs, and weekly.
- Dependabot weekly updates for npm (minor/patch grouped) and GitHub Actions.
- Bundle budget (`scripts/check-bundle-size.mjs`): initial JS must stay ≤ 120 kB gzip (currently 93 kB); part of `npm run verify`.
- `.npmrc` with `legacy-peer-deps=true` so `npm ci` works identically locally and in CI.

#### Changed

- Security: Playwright → 1.64.1 (pinned; fixes high-severity advisory), PostCSS → 8.5.32. Production dependencies: 0 known vulnerabilities.
- ESLint/Prettier ignore generated `coverage/` and Playwright output.

#### Known

- Remaining `npm audit` findings are dev-only (Vite 5, Vitest 2) and need major upgrades (Vite 8, Vitest 5); tracked as a separate task.

### Founder slide (2026-11-08)

- Core Expertise set to "DevOps Engineer" (founder request).

### Phase 2b: Test depth (2026-11-08)

#### Added

- Coverage reporting (`npm run coverage`, V8) with enforced thresholds: 80% lines overall, 95% for `src/domain`, 90% for `src/providers`. Current: 97% lines.
- Playwright end-to-end suite (`npm run e2e`), 10 scenarios × desktop + mobile (Pixel 7) = 20 tests: load + simulated badge + globe, hold/abort, short-click guard, keyboard Space hold to completion and reset, chaos label fit, no horizontal scroll, AWS DRS tab, reduced motion, all 7 deck slides without errors, deck citations.
- Unit tests for ShareModal, ErrorBoundary, AwsDrsHud, `usePrefersReducedMotion` (40 unit tests total).

#### Changed

- 3D globe caps device pixel ratio at 1.5x, reducing GPU work on high-density phones by up to 4x.

### Phase 2a: Accessibility (2026-11-08)

#### Added

- Keyboard-operable failover: hold Space or Enter for 1.2s; releasing early or moving focus away cancels.
- Reduced-motion support: honors the OS setting (Framer Motion `MotionConfig`, CSS animations, globe auto-rotation and packet animation).
- `usePrefersReducedMotion` hook.
- 8 new tests (33 total): keyboard hold/cancel/blur, sound default and persistence, storage unavailable.

#### Changed

- Sound is **off by default**; turning it on is remembered per browser.
- Hold-to-confirm is timed independently of the progress animation, so the guard can't be shortened by reduced-motion settings.
- Touch-cancel also cancels a hold.

#### Fixed

- React "not wrapped in act(...)" test warning (tests now wait for the lazily loaded globe).

### Pitch deck sources, founder bio, roadmap date (2026-11-08)

#### Changed

- Market slide: replaced unverified "$15.8B by 2028 / 22.4% CAGR" with MarketsandMarkets (Jan 2026): global DRaaS $16.1B in 2025 → $46.1B by 2032, 16.2% CAGR. SAM ($4.2B) labeled as an internal estimate.
- Problem slide: "60% idle waste" replaced with Flexera 2026 State of the Cloud: organizations estimate 29% of cloud spend is wasted.
- Founder slide rewritten from the founder's master resume: 100+ high-capacity deployments, 2025 Presidential Inauguration broadcast connectivity, UFC 250 at the White House, 6-mile ~4 Gbps backhaul. Removed claims not on the resume (data lake architectures, BGP, AWS DRS specialization). Subtitle now singular ("an engineer").
- Roadmap: design-partner pilots targeted for March 2027.
- All "[source needed]" markers resolved; marker component removed. Test now asserts citations are present.

### Deploy tooling (2026-11-08)

- `npm run deploy` publishes to GitHub Pages after `npm run verify`; `DRY_RUN=1` does everything except push.
- Fixed: first version failed copying the build (`cp: ././.git: Not a directory`). Cause: an earlier manual deploy left a git repository inside `dist/` (Vite preserves `.git` when rebuilding). The copy now excludes `.git` and uses explicit paths. Nothing was published by the failed runs.

### Pitch deck accuracy pass (2026-11-08)

#### Changed

- Slide 2 statistics replaced with verified, cited figures: $14,056/min average unplanned downtime (EMA, Feb 2024, 415 IT leaders); over 90% of mid-size/large enterprises lose >$300K per hour (ITIC 2024); 85% of human-error outages tied to procedures (Uptime Institute, May 2025). Removed the misattributed "Gartner $9,000/min" claim.
- Unbuilt capabilities reworded as planned/targets/roadmap (AWS DRS integration, cross-cloud failover, chaos testing, carrier connect, BGP peering). RPO target stated as "seconds", idle cost as "storage-only".
- "Zero-Downtime" → "Near-Zero-Downtime"; "Apple-Grade" → "Consumer-Grade"; "live engine" → "interactive demo (simulated data)"; "99.999% RTO Guarantee" → "Contractual RTO SLA"; pricing labeled as proposed.
- Roadmap slide: stale Q3/Q4 2026 dates replaced with [date TBD]; telemetry milestone labeled simulated.
- Unverified market figures ($15.8B TAM, 22.4% CAGR, $4.2B SAM, 60% idle waste) marked **[source needed]**; SOM labeled as an assumption.
- README: removed sub-second RPO / eBPF claims; states the demo is simulated.

#### Added

- Deck regression test that renders all 7 slides (guards the earlier black-screen crash).

### Globe visibility (2026-11-08)

#### Changed

- 3D globe wireframe now uses the brand cyan (22% opacity) instead of near-black, over a dark solid core that hides the back half so the grid reads cleanly.
- Region markers are placed on the globe surface so the core never hides them.

### Multi-agent handoff (2026-11-08)

#### Added

- `AGENTS.md`: single source of project rules for all AI agents (Google Antigravity reads it natively); `CLAUDE.md` now imports it.
- `docs/STATUS.md`: living handoff doc covering phase status, health, next steps, open decisions, known issues.
- Rules for branches, secrets, browser verification, and asking before deletes.

### Phase 1 — Architecture (2026-11-08)

#### Added

- `DrProvider` interface (`src/domain/dr.ts`) so real cloud providers can replace the simulator without UI changes. The simulator is now `MockDrProvider`.
- Explicit failover transition rules (`ALLOWED_TRANSITIONS`); invalid transitions are rejected.
- **Abort Failover** button, available until traffic cutover begins.
- **SIMULATED DATA** badge in the header whenever the active provider is simulated.
- Error boundaries around lazy panels (e.g. a WebGL failure shows a placeholder).
- Browser tab icon (fixes a favicon 404).
- 15 new tests (25 total): transition rules, abort windows, log buffer, UI abort/badge/lazy load.

#### Changed

- Split the 550-line `App.tsx` into `domain/`, `providers/`, `hooks/`, `config/`, `features/`, `components/`, `lib/`.
- Code-split the 3D globe, AWS DRS tab, and pitch deck: initial JS 1,250 kB → 293 kB (348 → 95 kB gzip).
- Target regions defined once in `config/regions.ts`.
- Log stream history now lives in the provider, so it survives tab switches.
- Removed the unverifiable "Zero data loss" claim from the simulated completion log.
- Accessibility: ARIA labels on icon buttons, `aria-pressed` on toggles, dialog semantics on the share modal, live region announcing failover status.

### Phase 0 — Foundation (2026-11-08)

#### Added

- Strict TypeScript config and `npm run typecheck`.
- ESLint (typescript-eslint, react-hooks) and Prettier with `lint`, `format`, `format:check` scripts.
- Compiled Tailwind v3 via PostCSS with `aether-*` brand color tokens.
- `DisasterRecoveryBackend.dispose()` to stop background telemetry timers.
- Project docs: `CLAUDE.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `LICENSE`, `.editorconfig`, `.nvmrc`.
- `docs/CONTINUE_BUILD_PROMPT.md` — phased roadmap, including the $0-until-funded rule.

#### Fixed

- Chaos mode "System State" value (`DEGRADED_JITTER`) overflowed its card into the neighboring card. Now shows `DEGRADED JITTER`, and metric cards wrap long values instead of overflowing (verified at 800px and 390px widths).
- Investor pitch deck slide crashed due to missing `Activity` / `Clock` icon imports.

#### Changed

- Removed Tailwind CDN script; styles now ship in the bundle (25.8 kB, 5.3 kB gzip).
- Replaced 110 hard-coded hex color classes with brand tokens.
- Failover log now includes the source region.
- Codebase formatted with Prettier; unused imports removed.

## [0.2.0] — 2026-11-08

### Added

- "Reset to Standby" button so failover drills can be re-run in demos.
- Vitest + Testing Library test suite (9 tests) for the failover flow and mock backend.

## [0.1.0] — 2026-11-07

### Added

- Initial command center: 3D topology globe, hold-to-confirm failover, chaos simulation mode, simulated AWS DRS / CloudWatch telemetry HUD, investor pitch deck, GitHub Pages deployment.
