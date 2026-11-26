# Azure build prompt: collector, infrastructure as code, live test

> Agent prompt, written 2026-11-26 at the founder's request. Research finished
> 2026-11-26 (`docs/MULTICLOUD_DR.md`, `docs/MULTICLOUD_ACCOUNT_SETUP.md`); Phase 1 needs no account. Paste it into
> a new session, or point the agent at this file. Google Cloud has its own prompt:
> `docs/GCP_BUILD_PROMPT.md`.

---

You are adding **Azure** to AetherVault **the same way we did AWS** (founder's direction,
2026-11-26), with everything automated and in infrastructure as code. AetherVault is a
disaster-recovery command center: live replication health, scheduled non-disruptive drills,
measured recovery time and data loss, two-person failover approval, a tamper-evident audit log and
drill evidence reports. On AWS it sits on top of Elastic Disaster Recovery (DRS); on Azure it sits
on top of **Azure Site Recovery (ASR)**.

**Read first, in order:** `AGENTS.md` (rules), `docs/STATUS.md`, `docs/MULTICLOUD_DR.md` (Azure
research and the AWS-to-Azure layout table), `docs/MULTICLOUD_ACCOUNT_SETUP.md`,
`docs/PRODUCT_DECISIONS.md`, then the AWS work you are mirroring: `docs/AWS_LIVE_POC.md`,
`docs/AWS_DR_BEST_PRACTICES.md`, `collector/README.md`, `collector/terraform/main.tf`,
`src/integrations/awsDrs/`, `scripts/poc/source-server.sh`, `docs/TERRAFORM.md`, `docs/PILOT_DAY.md`.

## Mirror AWS, piece by piece

Every AWS piece gets an Azure counterpart with the same shape, so the two read alike:

| AWS (exists)                                                    | Azure (you build)                                                                                                                                                                                    |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/integrations/awsDrs/` + `fixtures/`                        | `src/integrations/azureAsr/` + `fixtures/`                                                                                                                                                           |
| `collector/` (CLI `--fixture`, `--dry-run`, `--record`; Lambda) | `collector-azure/` (same flags; Azure Function on Flex Consumption)                                                                                                                                  |
| `collector/terraform/` (read-only role, every minute)           | `collector-azure/terraform/` (managed identity with Site Recovery Reader, timer every minute)                                                                                                        |
| Account setup by hand (MFA, budgets, agent key)                 | `infra/accounts/azure/` Terraform (budgets, allowed regions, resource group, deployer role, state storage)                                                                                           |
| `scripts/poc/source-server.sh`                                  | `scripts/poc/azure-source.sh`, same commands (`check`, `up`, `verify`, `enable-replication`, `status`, `drill`, `verify-drill`, `last-row`, `cost`, `down`), calling Terraform in `infra/poc/azure/` |
| `docs/AWS_LIVE_POC.md`                                          | `docs/AZURE_LIVE_POC.md` (same timestamped evidence format)                                                                                                                                          |
| `docs/AWS_DR_BEST_PRACTICES.md`                                 | `docs/AZURE_DR_BEST_PRACTICES.md`                                                                                                                                                                    |
| Console "Connect your AWS account"                              | "Connect your Azure subscription"                                                                                                                                                                    |
| `docs/PILOT_DAY.md`                                             | Azure section in the same file                                                                                                                                                                       |

Shared code stays shared: the snapshot shape, ingest function, alerts, drills and evidence don't
fork per cloud. Map Azure's data into the shapes AWS already uses.

## Safety (non-negotiable)

- **Ask before:** opening or changing any account, every `terraform apply` or `destroy`, launching
  anything, each drill, deleting anything you didn't create.
- **No stored secrets.** The founder signs in with `az login` (MFA is mandatory for create, update
  and delete through the CLI and IaC); you work in that session. No client
  secrets or keys in files, chat, Terraform variables or state. The collector uses a **managed
  identity**; its only secret is the AetherVault ingest token, kept in Key Vault (or an app setting
  marked sensitive) and in the macOS Keychain, never in the repo.
- **Least privilege:** the collector gets **Site Recovery Reader** only, scoped to the vault's
  resource group. That role lacks the vault-level `vaults/replicationProtectedItems/read`, so the
  collector walks fabrics → protection containers → protected items (all readable with it). Only if
  that fails in the live test, propose a custom read-only role to the founder. Write roles (Site Recovery Operator) are for the live test's operator, never the
  collector.
- **Terraform state** holds the ingest token: remote state in an encrypted, versioned storage
  account created by `infra/accounts/azure/`, or local and gitignored (as `collector/terraform/` is
  today). Never commit `*.tfstate` or `*.tfvars`.
- **Tags on everything:** `project=aethervault`, `env=poc`, `owner=agent`, `expires=<date>`, so the
  teardown check can find every resource.
- **Private details** (tenant, subscription and resource IDs, billing and support case numbers) go
  only in `~/Developer/AegisCoreLabs-private/`. The public repo uses placeholders.
- **Honesty:** Azure regions stay demo-only and labeled simulated in the console until real Azure
  data flows. The website changes only after results are measured, exactly as measured, including
  any FAIL.

## Budget

**Approved by the founder 2026-11-26:** budget alerts at $10 and $25; **stop and ask if your
running estimate passes $10.** Spend nothing until the founder authorizes each step. Start on the
**free account with its spending limit on**; never upgrade to pay-as-you-go without the founder's
explicit OK. Billing lags 8–24 hours, so `azure-source.sh cost` keeps your own estimate; run it
every 12 hours and after every drill. Site Recovery is free for the first 31 days per VM, then
$25/month: **tear down within 31 days.** VM, disk, cache storage and transfer still use credit.
If the trial refuses Site Recovery, stop and report; don't work around it.

## Phase 1: build with no account ($0)

On a branch (`feat/azure-asr`), small commits, `npm run verify` before each:

1. **Multi-cloud groundwork** (shared with Google; skip any part already done): migration allowing
   `replication_snapshots.source` and `recovery_jobs` to carry `azure-asr`; per-cloud checks for job
   IDs and region names (`link_recovery_job` matches `azure-<region>` as it does `aws-<region>`);
   pgTAP tests (`npm run db:test`) for every change.
2. `src/integrations/azureAsr/`: map **Replication Protected Items** and **Replication Jobs** (REST,
   api-version from the research) to the existing snapshot and recovery-job shapes. Fixtures
   hand-built from Microsoft's documented samples, marked as such in `fixtures/README.md`; tests for
   healthy, degraded, stalled and paged (`nextLink`) responses.
3. `collector-azure/`: CLI with `--fixture`, `--dry-run`, `--record` (saves real responses to the
   private folder, writes a redacted fixture), and the Azure Function entry point. Package script
   like `npm run collector:package`.
4. Terraform, validated but not applied: `collector-azure/terraform/`, `infra/accounts/azure/`,
   `infra/poc/azure/` (two regions; a small Linux VM with PostgreSQL writing one numbered,
   timestamped row per second, set up the same way as the AWS source server; Recovery Services
   vault; replication policy; network mapping; isolated test-failover network). Self-terminate
   safety net equivalent to the AWS 72-hour one.
5. `scripts/poc/azure-source.sh` with the commands in the table, wrapping Terraform and `az`.
6. **CI:** add `terraform fmt -check`, `terraform validate` and free IaC scanning (`checkov` or
   `tflint`) for every Terraform folder, AWS included. No cloud credentials in CI.
7. Docs: `docs/AZURE_DR_BEST_PRACTICES.md`, the Azure part of `docs/PILOT_DAY.md`,
   `docs/ARCHITECTURE.md` (new folders), `CHANGELOG.md`, `docs/STATUS.md`. Merge to `main` with
   `--no-ff` after verify and db:test pass. No push without the founder's OK.

## Phase 2: account (founder, with you guiding)

The founder follows `docs/MULTICLOUD_ACCOUNT_SETUP.md`: open the account, MFA on the owner sign-in,
budget alerts before anything else. Then, with approval, apply `infra/accounts/azure/` and check it
(`azure-source.sh check`: signed in, right subscription, allowed regions, quotas, budget present).

## Phase 3: live test, like the AWS test on 17 Nov

Ask before each step. Record every step in `docs/AZURE_LIVE_POC.md` with UTC timestamps.

1. `up` → `verify` (rows writing) → `enable-replication`; record time to initial sync.
2. Console: create a collector token (founder), deploy `collector-azure/terraform/` (plan reviewed),
   confirm **LIVE · Azure Site Recovery** in the console.
3. `--record` real responses; replace hand-built fixtures with redacted recorded ones.
4. Alert test: stop replication health on purpose, confirm the Slack "at risk" and "recovered"
   alerts.
5. **Warm-up drill** (test failover), then drill 2, each started from AetherVault and linked to its
   Azure job. Per drill: request time, job stages, VM up, database ready, last row recovered vs
   last row written before the request, recovery time and data loss, PASS/FAIL against 15 min and
   60 s. Clean up each test failover.
6. Optional with approval: failover and failback rehearsal.
7. Tear down (`down`, collector `terraform destroy`), list anything left by tag, check the bill the
   next day.

**Success:** a working database after each drill in ≤ 15 min with ≤ 60 s of data loss; the console
showing live Azure health; alerts firing. Report every drill, including misses. A bigger scale test
(like `docs/AWS_SCALE_TEST_PLAN.md`) is a separate plan for the founder to approve afterwards.

## Back up before and after

Same as the AWS tests: `bash scripts/backup-db.sh` before any hosted migration and before the live
test, a git bundle into `~/Developer/AegisCoreLabs-private/backups/`, and the private evidence
folder (`evidence/<date>-azure-poc/`) committed after.

## When you finish each phase

Report what changed, test and verify results, costs (estimate, and actual the next day), and open
questions. Start by summarising your understanding and the research findings that affect this
plan, then do Phase 1, step 1 only.
