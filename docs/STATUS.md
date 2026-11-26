# Project Status

> Living handoff document. **Every agent or contributor updates this at the end of a session.**
> Last updated: 2026-11-26 (multicloud prompts; AWS verification pending) by Claude Code (Opus 5.5).

## Finding what's done (read this first)

| Question                                 | Where to look                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| What changed, when, and why              | `CHANGELOG.md` (Unreleased, newest first; one entry per piece of work)                                              |
| Exact code of each change                | `git log --oneline` on `main` (Conventional Commits; every merge passed `npm run verify` + `npm run db:test`)       |
| Proof that checks passed on GitHub       | GitHub Actions tab: CI and CodeQL for each merge commit                                                             |
| AWS live test: what ran, what's blocked  | `docs/AWS_LIVE_POC.md` (status at the top)                                                                          |
| Legal prep for counsel (Kim Larsen)      | `docs/LEGAL_PREP_PROMPT.md` (task table with ✅ dates), drafts in `docs/legal/`                                     |
| SOC 2 program                            | `docs/SOC2_PROGRAM_PROMPT.md` (phase table), `docs/SOC2_READINESS.md`, dated records in `docs/reviews/`             |
| SOC 2 Type I 30-day sprint               | `docs/SOC2_TYPE_I_SPRINT.md` (deep dive, timeline, control→evidence matrix, costs)                                  |
| Security test agent ("Big Getty Star")   | `docs/security/SECURITY_TEST_AGENT.md` (prompt, toolchain, read-only creds per cloud)                               |
| Trust pack for customer security reviews | `docs/trust/README.md` (what to send at each stage, honest gap answers, founder to-do)                              |
| Private material (never in this repo)    | Founder's Mac: `~/Developer/AegisCoreLabs-private/` (local git, no remote): counsel prep, account IDs, case numbers |
| Secrets                                  | macOS Keychain only (item names in `docs/SECURITY.md`); never in files or chat                                      |

## Where we are

| Phase           | Scope                                                                         | Status                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 0. Foundation   | Strict TS, ESLint/Prettier, compiled Tailwind + brand tokens, docs            | ✅ Done (2026-11-08)                                                                                                             |
| 1. Architecture | `DrProvider` interface, feature folders, abort, lazy loading, simulated badge | ✅ Done (2026-11-08)                                                                                                             |
| 2. Quality bar  | Playwright E2E, WCAG 2.2 AA, Lighthouse 90+, GitHub Actions CI                | ✅ Done (2026-11-08)                                                                                                             |
| 3. Backend MVP  | Free-tier only until funded (see `AGENTS.md` rule 1)                          | 🚧 3.1–3.5, 3.7 done; 3.6 live on https://getaethervault.com; Resend SMTP connected                                              |
| 4. Productize   | Multi-tenant, DR drills, compliance reports                                   | 🚧 Team invites, 4.1 evidence, 4.2 drills, 4.3 alerts, 4.4 AWS DRS collector, 4.5 measured RPO, 4.6 runbooks, 4.7 AWS guide done |

Phase 3 milestones (`docs/PHASE_3_PLAN.md`):

| #   | Deliverable                                         | Status                                                                                                                                                                                                                                                                           |
| --- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | ADRs: platform, auth, audit                         | ✅ Accepted                                                                                                                                                                                                                                                                      |
| 3.2 | Local Supabase + schema + RLS + audit triggers      | ✅ pgTAP                                                                                                                                                                                                                                                                         |
| 3.3 | Server failover functions                           | ✅ pgTAP                                                                                                                                                                                                                                                                         |
| 3.4 | `SupabaseDrProvider` + sign-in + approval UI        | ✅ Two-browser E2E                                                                                                                                                                                                                                                               |
| 3.5 | Audit log UI + hash-chain verification              | ✅ Tamper E2E (a direct database edit is detected in the UI)                                                                                                                                                                                                                     |
| 3.6 | CI runs Supabase; hosted free project; GitHub OAuth | 🟡 CI done; hosted project `yvcejahygubzbbbooxas` (us-east-1, Free) live 2026-11-10: 10 migrations pushed, 235 pgTAP pass on it, cron jobs running, auth configured. Site live on getaethervault.com 2026-11-11. Resend SMTP connected 2026-11-11. Left: GitHub OAuth (optional) |
| 3.7 | `docs/SECURITY.md`, deck roadmap                    | ✅ Done                                                                                                                                                                                                                                                                          |

Details of every change: `CHANGELOG.md`. Full plan: `docs/CONTINUE_BUILD_PROMPT.md`.

## Health (verified 2026-11-09)

- CI on every PR, all green on `main`: lint, types, 160+ unit tests, coverage thresholds, build, bundle budget, production audit · Playwright desktop + mobile, including a Content-Security-Policy check · local Supabase: 235 pgTAP + 13 console E2E · CodeQL · gitleaks full-history secret scan.
- Live site deployed from `main`; `version.json` matches; CSP active; the Share QR always encodes the live version (verified by decoding it).
- GitHub: secret scanning + push protection, private vulnerability reporting, Dependabot alerts + automated security fixes are enabled.
- `npm audit`: 0 vulnerabilities. Toolchain: Vite 8, Vitest 5, React 18.
- Local machine is memory-starved (swap ~5–6 GB): public-demo E2E times out locally but passes on CI. Founder deferred Mac cleanup.

## Next steps (in order)

- **Multicloud (founder, 2026-11-26):** Azure and Google Cloud start now, the same way as AWS, all in
  infrastructure as code. **Research done 2026-11-26** (`docs/MULTICLOUD_DR.md`): Azure confirmed
  ($25/month per protected VM after 31 free days); Google verdict (C), continuous replication for
  Compute Engine VMs via Persistent Disk Asynchronous Replication, none first-party for on-premises.
  **Caps approved 2026-11-26: alerts $10 and $25 per cloud, agent stops and asks at $10; spend
  nothing until authorized.** **Founder next:** open accounts per `docs/MULTICLOUD_ACCOUNT_SETUP.md`
  (free trials, no upgrade) when ready. **Built 2026-11-26 (branch `feat/azure-asr`):** multi-cloud groundwork migration; Azure test
  environment in Terraform (`infra/accounts/azure`, `infra/poc/azure`) + `scripts/poc/azure-source.sh`;
  CI Terraform checks; `docs/AZURE_LIVE_POC.md`. Order switched: live test first, collector after.
  **Founder next:** Azure free account (personal card, spending limit on), MFA, `az login`.
  **Agent next:** `check`, then the live test with approval at each step.
- **AWS (2026-11-26, checked read-only):** verification documents submitted; no reply yet. The DR test
  account's key is still rejected. The first account reports ACTIVE but a new AWS policy
  (`p-w8q5iueo`) now blocks EC2, Lambda and DRS there; this month's bill is $0. **Don't open a third
  account while both are under review.** Founder: contact AWS Support about both.
  Earlier plan: If none by ~1 Dec, open a new
  account (personal card, real details; see the note above about both accounts) and rerun the scale test at 130 GiB (cap to be approved).

0. **Legal prep (`docs/LEGAL_PREP_PROMPT.md`, counsel: Kim Larsen, Stinson LLP):** T1–T15 done 2026-11-14 (public drafts in `docs/legal/`, private files in `~/Developer/AegisCoreLabs-private/legal/`). **Founder:** answer `founder-questions.md` there (entity, employment/IP, pilot-customer relationship, budget), then send the drafted email to Kim. **2026-11-18: Kim asked for information; founder emailed him the site and a brief (Claude doc "AetherVault: Brief for Kim Larsen", exported to PDF).** Next: the call (scope and fees), and founder answers `founder-questions.md` before it. Agent next: T16 after the answers (T6b license notices done).
1. **3.6 hosting:** ✅ Live at **https://getaethervault.com** (2026-11-11; GitHub Pages, HTTPS enforced, old github.io URL redirects). Founder signed in and created the organization. Domain at Cloudflare (DNS + Email Routing: antonio@/support@/security@/billing@ → founder inbox); steps and records in `docs/CUSTOM_DOMAIN.md`. Resend SMTP connected 2026-11-11 (B9 done; DMARC report-only). **Next:** founder rolls the Cloudflare API token (it was pasted in chat once).
   **AWS 2026-11-14:** everything except DRS tested live in Ohio (source server via SSM; collector deployed with Terraform, runs on schedule, reaches DRS with its read-only role). Two Terraform fixes for new accounts merged. Torn down; only blocker is AWS SCP `p-1m6ffy9a` (support case number in the founder's private notes). The AWS "support-console IAM" Health notice is the same SCP, not our IAM; no action.
   **AWS 2026-11-17: unblocked.** The first account's DRS block can't be lifted (AWS-managed "projects" account), so the founder opened a standard AWS account (approved; test under $10). MFA, warn-only budgets ($10/$25) and agent access (profile `aegis-dr`) set up; `source-server.sh check` passes (DRS reachable in us-west-2; quotas 5 vCPUs / 5 Lambda per Region). The old account's agent key (profile `aegis`) can be deleted once the founder confirms we're done with it.
   **AWS 2026-11-17 live:** steps 2–5 and a first drill done (data loss none; recovery 19 min 47 s, target 15 min missed); the test server in us-east-1 replicates continuously into us-west-2 (zero lag) and the console shows LIVE · AWS DRS from the collector. Torn down 2026-11-18 (see below).
   **AWS 2026-11-17 evening:** the 10-minute wait was first-recovery preparation (CloudTrail). **Drill 2: server launched 9 min 58 s, web page verified at 12 min 29 s (target 15 min met), ~8 s data loss (target 1 min met).** Drill server terminated.
   **Deployed 2026-11-17 22:4x UTC (`39f61c6`, founder approved):** website, hosted migration `20261117000011`, collector Lambda redeployed (reports both live drills). CI + CodeQL green.
   **Built 2026-11-17 late (deployed 2026-11-18):** drill rows and evidence use AWS's measured recovery time once an operator links the drill to its DRS job (migration `20261117000012`, needs a hosted `db push` on deploy). Then, in the hosted console, link each live drill that has a console record (drill 1 was started there too: 17 min, so FAIL against 15 min, which is the honest result). Azure plan: `docs/MULTICLOUD_DR.md` (needs an Azure account, founder approval). Slack workspace "Aegis Core Labs" sign-up started; founder finishes the robot check and email code.
   **Alert test passed 2026-11-18 01:31–01:37 UTC:** Slack (#aethervault-alerts) got "at risk" 1 min 40 s after the agent stopped and "recovered" after the restart; wording fixed and merged to `main` 2026-11-17 night (alert now says how far behind replication is when only lag is over target), plus a one-time reload for tabs left open across a deploy. **Deployed 2026-11-18 ~03:00 UTC (`5d233f1`, founder approved):** hosted migration `20261118000013` (dry run first; 268 pgTAP pass on hosted), website. **Deployed 2026-11-18:** linked recovery times (hosted migration `20261117000012`, 266 pgTAP pass on hosted).
   **Scale test Phase A running (cap $25):** source launched 18 Nov 19:06 UTC (100 GiB disk, ~15 GB PostgreSQL under constant writes; self-terminates ~19:05 UTC 21 Nov; DRS replication server and disks need `drs-down` separately). 24 h lag record done (0 s after one 5-min spike at start-up). **Warm-up drill 19 Nov 20:41 UTC: FAIL** (verified 15 min 0.7 s; 235.5 s data lost). Likely cause: magnetic staging disk (DRS "Auto" under 125 GiB) — the recovered disk was ~4 min old while DRS showed 0 s lag. **Staging switched to GP3 2026-11-19 21:26 UTC (founder approved; no full resync).** **Drill 2 (20 Nov 00:29 UTC): 14 min 56 s PASS, 125.2 s data lost FAIL**; revised cause: serialized ~4–5 min DRS snapshots + fallback to the last finished point (see `docs/AWS_LIVE_POC.md`). **Drills done 20 Nov:** drill 3 FAIL/FAIL, A5 PASS/FAIL (9:40, 715 s), drill 4 PASS/PASS (14:17, 0 s); success bar not met (summary table in `docs/AWS_LIVE_**Failback blocked, then torn down (20 Nov ~22:50 UTC):** AWS put a hold on the account; DRS could not launch its us-east-1 replication server (`RunInstances`→`Client.Blocked`). Everything torn down and checked (no instances, volumes, snapshots, EIPs or DRS source servers in either region); ~$8.40 spent. **Left:** collector Lambda/role/log group/rule in us-west-2 (schedule disabled, ~$0); `terraform destroy`in`collector/terraform`once the hold is lifted (Lambda API refused under the hold). **Founder:** get the hold lifted via AWS support. **Then:** rebuild and rehearse failback (the plan's step 8). Findings:`docs/AWS_LIVE_POC.md`; Obsidian note `AetherVault_AWS_Scale_Test`.ale_Test`.
   **AWS torn down 2026-11-18 02:02 UTC** by the agent user (CloudTrail: `DisconnectSourceServer`, `DeleteSourceServer`, `TerminateInstances`), at the end of the alert-test session, but not recorded then. Checked 03:1x UTC: no instances, volumes, DRS source servers, source networks, collector Lambda or test-server role/security group remain. Left: two 1 GB DRS base snapshots in us-west-2 (~$0.10/month; delete once the founder OKs). The `--record` run found no servers to record, so the fixtures are still hand-built. **Product decisions (2026-11-18):** `docs/PRODUCT_DECISIONS.md` (recovery tiers, warm-up drill, Kubernetes path, AWS first). **Next AWS test:** `docs/AWS_SCALE_TEST_PLAN.md`; Phase A approved 2026-11-18 with a **$25 cap** (never exceed without the founder's OK); agent prompt `docs/SCALE_TEST_PROMPT.md`. **Backups 2026-11-18:** the 15 Nov weekly database backup had failed (connection dropped mid-dump); fresh backup taken and verified; repo bundle and private folder committed. **AWS next:** (1) failback rehearsal (founder wants it, 2026-11-18): needs a rebuild first (`source-server.sh up`, `install-agent`, initial sync, collector `terraform apply`), a few hours, ~$2–3/day while up; (2) ✅ 2026-11-18: real `DescribeSourceServers` response recorded during the scale test (private `aws-recordings/`; redacted fixture `recorded-continuous.json`; zero lag is `P0D`); record a non-zero-lag response under load when one appears; (3) tear down and check the bill.
   **Console honesty fixes (2026-11-17, deployed):** (a) drill rows label the modeled recovery time "simulated"; real AWS recovery times now show in the AWS DRS tab ("Recoveries measured by AWS", collector reads `drs:DescribeJobs`); (b) the signed-in console offers only AWS us-west-2; the public demo keeps all three, simulated. Delete the agent user and key after the test. AWS CLI 2.40.0 in `~/aws-cli` (old 2.6.2 in `/usr/local/aws-cli` needs `sudo rm` by the founder).
2. **Phase 4, free parts:** all free items done. Pilot day: follow `docs/PILOT_DAY.md` (blocker B1 is hosting, item 1 above); run `--record` to replace the hand-built sample responses. Possible next: AetherVault launching DRS drills itself (needs a write-capable role; design with the customer first), GCP/Azure providers, email alerts (needs a mail provider). ✅ Done 2026-11-10: 4.7 Connect-your-AWS-account guide + `docs/AWS_DR_BEST_PRACTICES.md`, `docs/TERRAFORM.md`, `docs/PILOT_DAY.md`; 4.6 DR runbooks (versioned runbook, AWS DRS template, per-run checklist in evidence); 4.5 measured RPO in drill/failover evidence (replication snapshot captured at launch; drills fail on a missed RPO); 4.4 AWS DRS collector (read-only Lambda, ingest token, live Replication panel, RPO-breach alerts); 4.3 Slack/PagerDuty alerts (Vault-encrypted secrets, delivery log); 4.2 scheduled, non-disruptive drills (`pg_cron`, weekly/monthly/quarterly, Run drill now, drill evidence). ✅ Done 2026-11-09: team invites/roles + onboarding checklist; 4.1 drill evidence reports (RTO/RPO targets, PASS/FAIL drill history, Print/Save as PDF, SHA-256-fingerprinted JSON; deployed as `89c4e1b`).
3. **Requires funding (founder approves):** AWS account + Elastic Disaster Recovery for real replication data (~$40–60/mo), Supabase Pro ($25/mo), custom domain ✅ bought 2026-11-11 ($11.17/yr; headers still need a host or proxy that sends them). Supabase Pro ($25/mo): upgrade when the pilot signs, before customer data goes in; weekly local backup meanwhile (`docs/BACKUPS.md`).

4. **SOC 2:** program and agent prompt in `docs/SOC2_PROGRAM_PROMPT.md` (2026-11-14). Phase A (free readiness: policies, risk register, vendors, system description, calendar, first review) done. **Next (founder):** approve and sign `docs/policies/README.md` (**7 of 10 approved 2026-11-15**; Acceptable use + Access control held until the last account has MFA (4 of 5 verified 2026-11-15, FileVault on); AI use held for counsel), close the 7 private findings from the 2026-11-14 review, take the training. Then run the control calendar for a quarter. Funded steps and costs are in the program doc.

5. **Landing page** shows the real AWS test results (2026-11-18, "Measured in a live AWS test"; pricing slide roadmap labels fixed the same day). Built (2026-11-09) on `feat/landing-page`: ✅ `CONTACT_EMAIL` set to antonio@getaethervault.com (2026-11-11); add real console screenshots and a pilot-customer case study when available.

## Open decisions for the founder

- **AWS, decided 2026-11-22: the standard DR test account is AetherVault's single AWS home.** Its hold became a suspension for identity verification (AWS fraud prevention); AWS closes the account and deletes its data if documents aren't received by **26 Nov 2026**. **Founder:** upload the full set through that account's Support Center (payment-method statement, government ID, business documents). Agent access is refused until it's restored. Then: re-check access, `terraform destroy` the collector leftovers, rebuild and rehearse failback. The first (AWS "projects") account can't run DRS without a paid support plan and an irreversible Advanced Features switch (AWS Support, 17 Nov), so it will be retired once the DR account is back (founder's OK before closing; its promotional credits are lost). AWS accounts can't be merged.

- **Back up the private folder** `~/Developer/AegisCoreLabs-private/`: it exists only on this Mac (no remote, on purpose). Use an encrypted backup (Time Machine to an encrypted disk, or an encrypted disk image in iCloud Drive).

- Approve funds (costs in `docs/PHASE_3_PLAN.md` and the investor market report).
- Pricing assumption in the market report ($3,000/month per customer): confirm, or choose a lower entry tier.
- Seed-round date; document the $4.2B SAM methodology.
- Mac cleanup (deferred).
- `.claude/launch.json` (untracked, port 5173 vs 5174): keep or remove? Old duplicate at `~/Documents/aethervault-command-center`: archive or delete?

## Known issues

- ~~Local-only E2E failure (2026-11-22)~~ **Fixed 2026-11-25:** timeouts, not a bug. The software-rendered globe stalls the page on this memory-starved Mac and delays the simulated failover; local runs now allow more time (CI unchanged). See CHANGELOG.

- Hosted console has a pending failover request from 2026-11-10 (to the GCP demo region) never approved or withdrawn; founder can withdraw it.
- Repo lives at `~/Developer/AetherVault`. Do not move it back into iCloud.
- Local Supabase: analytics, Studio, storage and edge runtime are disabled in `supabase/config.toml` (analytics alone used ~4 CPU cores).
- ~~`DEGRADED_STATE` never entered~~ **Fixed 2026-11-25:** chaos mode in the public demo now enters and leaves it (console unchanged).
- Supabase CLI 3.0 is available (repo pins 2.122.0); upgrade as its own tested task.
- Deck cites "MarketsandMarkets, Jan 2026"; the verified press release is dated 14 May 2026 with the same figures. Confirm the report's own publication month.
