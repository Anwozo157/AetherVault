# Changelog

All notable changes to AetherVault are documented here.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [Unreleased]

### Docs: multicloud research and live AWS proof of concept (2026-11-10)

- `docs/MULTICLOUD_DR.md`: Azure Site Recovery for physical servers (architecture with the on-premises replication appliance, ports, recovery points, supported systems, test failover, monitoring fields, pricing model), sourced from Microsoft Learn, with unverified items marked. A side-by-side table compares it with AWS. Google Cloud research is blocked (docs domain not fetchable from this session), so that section lists the exact pages to read next. It also lists what adding a cloud to AetherVault takes.
- `docs/AWS_LIVE_POC.md`: a live test in our own AWS account before NewConnect: what's needed, cost (about $12–20 for a week), steps, done-when, teardown.

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
- **Docs:** `docs/AWS_DR_BEST_PRACTICES.md` (account and Region, network, agent install, replication and launch settings, drills, failback for physical servers, monitoring, cost; sourced from AWS documentation). `docs/TERRAFORM.md` (version pinning, plan/apply discipline, least-privilege deployer, secrets in tfvars and state, S3 remote state with native locking, day-2 operations). `docs/PILOT_DAY.md` (blockers, week-before, on-the-day steps, first drill, removal, troubleshooting, NewConnect questions). Collector README links them.
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
- Removed unverifiable overlay text ("Three.js 60FPS", "eBPF", "CoreSite").
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
