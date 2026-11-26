# Multicloud research prompt: Google Cloud in full, Azure gaps, safe account setup

> Agent prompt, written 2026-11-26 at the founder's request. Paste it into a new session, or point
> the agent at this file. It runs **before** any Azure or Google Cloud account exists and before any
> code. Its outputs feed `docs/AZURE_BUILD_PROMPT.md` and `docs/GCP_BUILD_PROMPT.md`.
> Order of work: this prompt → founder opens accounts → Azure build → Google Cloud build.

---

You are researching how AetherVault adds **Google Cloud** and **Azure** next to AWS. AetherVault is a
disaster-recovery command center: live replication health, scheduled non-disruptive drills,
measured recovery time and data loss, two-person failover approval, a tamper-evident audit log and
drill evidence reports. AWS is built and tested live (AWS Elastic Disaster Recovery, DRS).

**Read first, in order:** `AGENTS.md` (rules), `docs/STATUS.md`, `docs/MULTICLOUD_DR.md` (Azure
research done 2026-11-10/17; Google Cloud blocked), `docs/PRODUCT_DECISIONS.md`,
`docs/AWS_DR_BEST_PRACTICES.md`, `collector/README.md`, `docs/TERRAFORM.md`, `docs/SECURITY.md`.

## Rules for this research

- **Vendor documentation only**, opened and read (a search snippet is not a source). Every fact gets
  a link and the date read. Anything you can't confirm is marked **unverified**. Nothing from memory.
- **First, check web access** to `docs.cloud.google.com` and `cloud.google.com`. It was refused on
  2026-11-10. If it's still refused, stop and tell the founder which Claude Code permission to allow;
  don't fill gaps from memory.
- **No accounts, no sign-ups, no spending, no CLI calls against any cloud.** Research only.
- Prices: quote the vendor's page and region; say what the page didn't show.
- Commit on a branch (`docs/multicloud-research`), `npm run verify` before each commit, update
  `CHANGELOG.md` and `docs/STATUS.md`. No push.

## Part A: Google Cloud, in full

Answer the deciding question first, then everything else:

1. **The deciding question.** Does Google Cloud offer **continuous block-level replication of a
   server (on-premises or another cloud) with launch in Google Cloud**, as AWS DRS and Azure Site
   Recovery do? Or only backup-and-restore (scheduled snapshots, so data loss equals the backup
   interval)? Check at least: Backup and DR Service, Persistent Disk Asynchronous Replication,
   Migrate to Virtual Machines (and whether Google allows it for DR), Compute Engine machine images
   and snapshot schedules, and any Marketplace partner Google recommends for DR. Give a verdict:
   **(A)** continuous replication exists, **(B)** backup-based only, or **(C)** both, for different
   sources (e.g. Compute Engine VM to another region vs on-premises server).
2. **For each viable service:** architecture (agents, appliances, ports), supported operating
   systems, recovery point frequency and retention, non-disruptive test (drill) and cleanup,
   failback, quotas, limits, and the regions it runs in.
3. **Read-only health source:** the exact API (REST method and fields) for replication or backup
   health, lag or last-good recovery point, and job history with start/end times (our "Recoveries
   measured by the cloud" table). Record sample responses from the docs.
4. **Least-privilege IAM:** the predefined read-only role(s) a collector needs, and the role an
   operator needs to start a drill. List the exact permissions.
5. **Collector runtime:** Cloud Run job vs Cloud Functions (2nd gen) + Cloud Scheduler, running as
   an attached service account with **no key file**. Free-tier limits for a once-a-minute run, and
   outbound HTTPS to Supabase.
6. **Terraform (`google` provider):** exact resource names for everything above, plus budgets,
   APIs to enable (`google_project_service`), and org policies.
7. **Cheapest honest live test:** the smallest setup that exercises replication and a drill (e.g.
   one small VM protected into a second region). Itemized cost estimate from Google's pricing pages,
   and how long it runs.

Write the results into the Google Cloud section of `docs/MULTICLOUD_DR.md` (replace "Research
blocked"), add a Google column to the side-by-side table, and give your recommendation: build,
build as a backup-based tier (labeled as such, with its real data-loss limits), or don't build yet.

## Part B: Azure, the open items

From `docs/MULTICLOUD_DR.md` "Still unverified", confirm what the docs can confirm (the rest stays for
the live test): whether **Site Recovery Reader** can list replicated items at vault level;
`scenarioName` values for test failover and failover; RPO fields for Azure-to-Azure; the
per-instance price; the `azurerm` Terraform resource names for a Recovery Services vault,
replication policy, fabrics, protection containers, network mapping and a replicated VM; and whether
an Azure Function (Flex Consumption or Consumption) with a **managed identity** fits a once-a-minute
collector within the free grant.

## Part C: safe account setup for both clouds (the founder does these steps)

Write `docs/MULTICLOUD_ACCOUNT_SETUP.md`: a step-by-step, verified checklist for the founder, one
section per cloud, from the vendors' docs:

- **Free trial or credit terms**, and exactly what triggers billing. Does Azure's free account allow
  Site Recovery? Does a spending limit exist and what happens when it's hit? Does Google's free trial
  stop billing automatically, and which services are excluded?
- **Hardening first:** MFA on the owner sign-in (passkey or security key), no long-lived keys,
  billing alerts before any resource exists, allowed regions limited to the two test regions.
- **Agent access without stored secrets** (we never handle keys in chat or files):
  - Google: the founder signs in with `gcloud auth login`; the agent works through **service account
    impersonation** of a scoped deployer account; org policy blocks service-account key creation.
  - Azure: the founder signs in with `az login`; the agent uses that session or a scoped role on one
    resource group; no client secrets on disk.
    Confirm each step in the docs and note what the founder must click versus what Terraform can do.
- **Budgets and a hard stop:** budget alerts at the founder's caps. Research whether a safe
  automated stop exists (e.g. Google budget → Pub/Sub → function that stops the test VMs; Azure
  spending limit or budget action group). Prefer stopping test resources over disabling billing,
  and explain the risks of each.
- **Where IDs live:** subscription, tenant and project IDs, billing account numbers and support case
  numbers go only in `~/Developer/AegisCoreLabs-private/`. Keychain item names go in
  `docs/SECURITY.md`. Never the public repo.

## Part D: infrastructure as code plan

**Founder's direction (2026-11-26): do it the same way we did AWS**, everything automated and in
infrastructure as code. Each AWS piece gets a counterpart with the same shape and command names;
where AWS used a CLI script for the test server, the script stays the entry point but calls
Terraform underneath. Propose (don't build) this layout and say which pieces Terraform can own and
which need a click in the vendor's console:

| AWS piece (exists)                                                              | Azure counterpart                                  | Google Cloud counterpart                       |
| ------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------------------------------------- |
| Research: `docs/MULTICLOUD_DR.md`                                               | same file, Azure section                           | same file, Google section                      |
| `docs/AWS_DR_BEST_PRACTICES.md`                                                 | `docs/AZURE_DR_BEST_PRACTICES.md`                  | `docs/GCP_DR_BEST_PRACTICES.md`                |
| `src/integrations/awsDrs/` (mapping, fixtures, tests)                           | `src/integrations/azureAsr/`                       | `src/integrations/gcp<Service>/`               |
| `collector/` + `collector/terraform/` (Lambda, read-only)                       | `collector-azure/` + `terraform/`                  | `collector-gcp/` + `terraform/`                |
| Account setup (MFA, budgets, agent key in Keychain)                             | `infra/accounts/azure/` (Terraform)                | `infra/accounts/gcp/` (Terraform)              |
| `scripts/poc/source-server.sh` (check, up, verify, drill, last-row, cost, down) | `scripts/poc/azure-source.sh` + `infra/poc/azure/` | `scripts/poc/gcp-source.sh` + `infra/poc/gcp/` |
| `docs/AWS_LIVE_POC.md` (timestamped evidence)                                   | `docs/AZURE_LIVE_POC.md`                           | `docs/GCP_LIVE_POC.md`                         |
| `docs/AWS_SCALE_TEST_PLAN.md` + `docs/SCALE_TEST_PROMPT.md`                     | Azure scale test plan (after the POC)              | Google scale test plan (after the POC)         |
| Console "Connect your AWS account", `docs/PILOT_DAY.md`                         | "Connect your Azure subscription"                  | "Connect your Google Cloud project"            |

Also recommend: Terraform state backend per cloud (encrypted, versioned, locked; state holds the
ingest token), free IaC checks for CI (`terraform fmt -check`, `terraform validate`, `tflint`,
`checkov`), and tagging/labels so every test resource can be found and deleted.

## When you finish

Report: the Google verdict (A/B/C) with sources; anything that changes the Azure plan; the account
setup checklist's location; costs for each live test; open questions for the founder; and the
exact edits to `docs/AZURE_BUILD_PROMPT.md` and `docs/GCP_BUILD_PROMPT.md` your findings require
(make them, in the same branch).

Start by checking web access to Google's docs, then summarise your plan.
