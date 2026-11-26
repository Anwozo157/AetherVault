# Google Cloud build prompt: collector, infrastructure as code, live test

> Agent prompt, written 2026-11-26 at the founder's request. **Run it only after
> `docs/MULTICLOUD_RESEARCH_PROMPT.md` is finished and the Google Cloud verdict is recorded in
> `docs/MULTICLOUD_DR.md`.** The planned order is Azure first (`docs/AZURE_BUILD_PROMPT.md`), then
> this. Paste it into a new session, or point the agent at this file.

---

You are adding **Google Cloud** to AetherVault **the same way we did AWS** (founder's direction,
2026-11-26), with everything automated and in infrastructure as code. AetherVault is a
disaster-recovery command center: live replication health, scheduled non-disruptive drills,
measured recovery time and data loss, two-person failover approval, a tamper-evident audit log and
drill evidence reports. On AWS it sits on top of Elastic Disaster Recovery (DRS).

**Read first, in order:** `AGENTS.md` (rules), `docs/STATUS.md`, `docs/MULTICLOUD_DR.md` (Google
verdict, service, APIs, roles, costs), `docs/MULTICLOUD_ACCOUNT_SETUP.md`,
`docs/PRODUCT_DECISIONS.md`, then the work you are mirroring: `docs/AWS_LIVE_POC.md`,
`collector/README.md`, `collector/terraform/main.tf`, `src/integrations/awsDrs/`,
`scripts/poc/source-server.sh`, `docs/TERRAFORM.md`, and the Azure version if it exists
(`src/integrations/azureAsr/`, `collector-azure/`, `docs/AZURE_LIVE_POC.md`).

## Step 0: check the verdict

The research gave Google Cloud a verdict. Confirm it with the founder before building:

- **(A) Continuous replication exists:** build it exactly like AWS and Azure (below).
- **(B) Backup-based only:** build it as a **backup-based tier**. Data loss can't be lower than the
  backup interval, and the console, evidence reports and website must say so. Its drills restore
  from the latest backup; the 60-second data-loss target does not apply, so propose a target that
  matches the interval.
- **(C) Don't build yet:** stop, and record the decision in `docs/PRODUCT_DECISIONS.md`.

Below, `<service>` means the Google service the research chose.

## Mirror AWS, piece by piece

| AWS (exists)                                                    | Google Cloud (you build)                                                                                                                                                                         |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/integrations/awsDrs/` + `fixtures/`                        | `src/integrations/gcp<Service>/` + `fixtures/`                                                                                                                                                   |
| `collector/` (CLI `--fixture`, `--dry-run`, `--record`; Lambda) | `collector-gcp/` (same flags; Cloud Run job or Cloud Function, per the research)                                                                                                                 |
| `collector/terraform/` (read-only role, every minute)           | `collector-gcp/terraform/` (service account with the read-only role, Cloud Scheduler every minute)                                                                                               |
| Account setup by hand (MFA, budgets, agent key)                 | `infra/accounts/gcp/` Terraform (APIs, budgets, allowed regions, deployer service account, org policy blocking service-account keys, state bucket)                                               |
| `scripts/poc/source-server.sh`                                  | `scripts/poc/gcp-source.sh`, same commands (`check`, `up`, `verify`, `enable-replication`, `status`, `drill`, `verify-drill`, `last-row`, `cost`, `down`), calling Terraform in `infra/poc/gcp/` |
| `docs/AWS_LIVE_POC.md`                                          | `docs/GCP_LIVE_POC.md` (same timestamped evidence format)                                                                                                                                        |
| `docs/AWS_DR_BEST_PRACTICES.md`                                 | `docs/GCP_DR_BEST_PRACTICES.md`                                                                                                                                                                  |
| Console "Connect your AWS account"                              | "Connect your Google Cloud project"                                                                                                                                                              |
| `docs/PILOT_DAY.md`                                             | Google section in the same file                                                                                                                                                                  |

Shared code stays shared: the snapshot shape, ingest function, alerts, drills and evidence don't
fork per cloud. If the Azure build already added multi-cloud groundwork (source values, region
checks), extend it with `gcp-<service>` instead of adding a second mechanism.

## Safety (non-negotiable)

- **Ask before:** opening or changing any account or project, every `terraform apply` or `destroy`,
  launching anything, each drill, deleting anything you didn't create.
- **No keys.** The founder signs in with `gcloud auth login` (and
  `gcloud auth application-default login` for Terraform). You work through **service account
  impersonation** of the deployer account that `infra/accounts/gcp/` creates. No service-account key
  files anywhere; the org policy that blocks key creation stays on. The collector runs as an
  attached service account with the read-only role only. Its one secret, the AetherVault ingest
  token, lives in Secret Manager and the macOS Keychain, never in the repo.
- **Terraform state** holds the ingest token: a GCS bucket created by `infra/accounts/gcp/`
  (versioned, uniform access, not public), or local and gitignored. Never commit `*.tfstate` or
  `*.tfvars`.
- **Labels on everything:** `project=aethervault`, `env=poc`, `owner=agent`, `expires=<date>`.
- **Private details** (project number, billing account, support case numbers) go only in
  `~/Developer/AegisCoreLabs-private/`. The public repo uses placeholders.
- **Honesty:** Google regions stay demo-only and labeled simulated in the console until real Google
  data flows. Website changes only after results are measured, exactly as measured.

## Budget

Founder sets the caps before Phase 3. **Proposed** (not yet approved): budget alerts at $10 and $25,
stop and ask if your running estimate passes $10. If the research found a safe automated stop
(budget → Pub/Sub → function that stops the test VMs), build it in `infra/accounts/gcp/` and test it
before Phase 3. `gcp-source.sh cost` keeps your own estimate; run it every 12 hours and after every
drill.

## Phase 1: build with no account ($0)

On a branch (`feat/gcp-<service>`), small commits, `npm run verify` before each:

1. Multi-cloud groundwork for `gcp-<service>` (migration + pgTAP tests, `npm run db:test`).
2. `src/integrations/gcp<Service>/`: map the health and job APIs from the research to the existing
   snapshot and recovery-job shapes; fixtures hand-built from Google's documented samples and marked
   as such; tests for healthy, degraded, stalled and paged responses.
3. `collector-gcp/`: CLI (`--fixture`, `--dry-run`, `--record`) and the Cloud Run or Function entry
   point; package script.
4. Terraform, validated but not applied: `collector-gcp/terraform/`, `infra/accounts/gcp/`,
   `infra/poc/gcp/` (two regions; a small Linux VM with PostgreSQL writing one numbered, timestamped
   row per second, set up the same way as the AWS source server; `<service>` protection into the
   second region; an isolated network for drills). Self-terminate safety net like the AWS one.
5. `scripts/poc/gcp-source.sh` with the commands in the table, wrapping Terraform and `gcloud`.
6. CI: make sure the Terraform checks (`fmt`, `validate`, IaC scan) cover the new folders.
7. Docs: `docs/GCP_DR_BEST_PRACTICES.md`, the Google part of `docs/PILOT_DAY.md`,
   `docs/ARCHITECTURE.md`, `CHANGELOG.md`, `docs/STATUS.md`. Merge to `main` with `--no-ff` after
   verify and db:test pass. No push without the founder's OK.

## Phase 2: account (founder, with you guiding)

The founder follows `docs/MULTICLOUD_ACCOUNT_SETUP.md`: account, MFA, billing account with budget
alerts, a project for the test. Then, with approval, apply `infra/accounts/gcp/` and run
`gcp-source.sh check` (signed in, impersonation works, right project, allowed regions, quotas,
budget present, key creation blocked).

## Phase 3: live test, like the AWS test on 17 Nov

Ask before each step. Record every step in `docs/GCP_LIVE_POC.md` with UTC timestamps.

1. `up` → `verify` (rows writing) → `enable-replication`; record time to first protected point.
2. Console: collector token (founder), deploy `collector-gcp/terraform/` (plan reviewed), confirm
   **LIVE · Google Cloud** in the console.
3. `--record` real responses; replace hand-built fixtures with redacted recorded ones.
4. Alert test: break protection on purpose, confirm the Slack "at risk" and "recovered" alerts.
5. **Warm-up drill**, then drill 2, each started from AetherVault and linked to its Google job. Per
   drill: request time, job stages, VM up, database ready, last row recovered vs last row written
   before the request, recovery time and data loss, PASS/FAIL against the targets agreed in Step 0.
   Clean up each drill.
6. Optional with approval: failover and failback rehearsal.
7. Tear down (`down`, collector `terraform destroy`), list anything left by label, check the bill
   the next day.

Report every drill, including misses. A scale test is a separate plan for the founder to approve.

## Back up before and after

`bash scripts/backup-db.sh` before any hosted migration and before the live test, a git bundle into
`~/Developer/AegisCoreLabs-private/backups/`, and the private evidence folder
(`evidence/<date>-gcp-poc/`) committed after.

## When you finish each phase

Report what changed, test and verify results, costs (estimate, and actual the next day), and open
questions. Start with Step 0.
