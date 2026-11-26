# Azure and Google Cloud account setup (founder checklist)

> Written 2026-11-26 from the vendors' docs (links below). **Don't start until the founder
> authorizes it** (`AGENTS.md` rule 1: spend nothing until authorized). Budget caps approved by the
> founder on 2026-11-26: **alerts at $10 and $25 per cloud; the agent stops and asks at $10.**
> Tenant, subscription, project and billing IDs go only in `~/Developer/AegisCoreLabs-private/`.

## Why start on the free trials

Both clouds offer a trial that **does not bill your card unless you choose to upgrade**. That keeps
the live tests at $0 out of pocket, as long as each test fits inside the trial.

|                  | Azure free account                                                                                                                                                                                                                                                                                   | Google Cloud Free Trial                                                                                         |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Credit           | $200 for 30 days                                                                                                                                                                                                                                                                                     | $300 for 90 days                                                                                                |
| Card             | Required (non-prepaid); temporary authorization hold only                                                                                                                                                                                                                                            | Required; hold of $0–1, not a charge                                                                            |
| When credit ends | Spending limit: services disabled, VMs stopped and deallocated, storage read-only. Billing starts only if you upgrade to pay-as-you-go.                                                                                                                                                              | Billing disabled, resources stopped; 30-day grace, then deleted. No automatic upgrade.                          |
| Limits           | Quota increases need an upgrade; Site Recovery on trial credit **not confirmed**                                                                                                                                                                                                                     | No quota increases, no Windows Server images, no GPUs, no Marketplace; async disk replication **not confirmed** |
| Sources          | [terms](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0044p/), [spending limit](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/spending-limit), [avoid charges](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/avoid-charges-free-account) | [free features](https://docs.cloud.google.com/free/docs/free-cloud-features)                                    |

**What upgrading means:** an upgraded Azure subscription (pay-as-you-go) has **no spending limit**,
and a Google budget **never caps spend**. Both only alert. Upgrading needs a separate OK from the
founder, and the agent stops before it.

**If a service is refused on the trial**, the agent stops and reports it. It doesn't work around it.

## Before either account: shared steps

1. Pay with your **personal card** (Aegis Core Labs has no business bank account yet). Sign up
   with your real name, address and phone, matching that card. The company email
   (antonio@ / billing@ on getaethervault.com) is fine for the sign-in.
2. Use a password from the password manager, plus a **passkey or security key** for MFA. Store
   recovery codes in the Keychain plus an offline copy (`docs/SECURITY.md`). Never paste them in chat.
3. Write the new account in the `docs/SECURITY.md` credential table (item names only).

## Azure

1. **Sign up** for the free account. Microsoft turns on security defaults for new tenants ("being
   rolled out to all new tenants at creation", 24-hour grace), and mandatory MFA covers the portal
   and, since 1 Oct 2025, create/update/delete through the CLI and IaC
   ([security defaults](https://learn.microsoft.com/en-us/entra/fundamentals/security-defaults),
   [mandatory MFA](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mandatory-multifactor-authentication)).
   Register MFA right away.
2. **Leave the spending limit on.** Don't upgrade.
3. **Budget alerts before anything else:** $10 and $25 on the subscription, sent to billing@. Cost
   data arrives 8–24 hours late and budgets are evaluated every 24 hours, so alerts can be a day
   late ([budgets](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets)).
   The agent's own running estimate is the real-time guard.
4. **Sign in the CLI on the Mac:** `az login` (browser, MFA). The agent works in that session; no
   service principal, no secret. Terraform reads the same session (azurerm "Authenticating via the
   Azure CLI"; from provider 4.0 set `ARM_SUBSCRIPTION_ID`).
5. **The agent applies `infra/accounts/azure/`** with your OK. It creates the test resource group,
   the budgets as code, the built-in policies **Allowed locations** (`e56962a6-4747-49cd-b67b-bf8b01975c4c`,
   the two test regions) and **Allowed virtual machine size SKUs** (`cccc23c7-8427-4f53-ad12-b6a63eb452b3`,
   small B-series only), and a Terraform state storage account
   ([built-in policies](https://learn.microsoft.com/en-us/azure/governance/policy/samples/built-in-policies)).
6. **Optional automatic stop:** budget → action group → runbook that stops the test VMs. This is
   Microsoft's documented pattern
   ([scenario](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/cost-management-budget-scenario)),
   but the cost data lag makes it late. On the trial, the spending limit is the stronger guard.

**Cost of the Azure live test (estimate):**

- Site Recovery is $25/month per protected VM after the **first 31 free days**, so the agent tears
  down within 31 days.
- A B2ats v2 Linux VM is $0.0094/hour, about $0.70 for 3 days. A small disk, cache storage, and
  transfer at $0.02/GB add a few dollars.
- Expected under $10, and paid from the trial credit.
- Source: Azure Retail Prices API, eastus, 2026-11-26.

## Google Cloud

1. **Sign up for the Free Trial** with the company email. Turn on 2-Step Verification with a
   passkey or security key.
2. **Organization:** Google creates one automatically only for a domain (Cloud Identity or
   Workspace). Organizations created on or after 3 May 2024 enforce the security baseline by
   default, including **blocking service-account key creation**
   (`iam.managed.disableServiceAccountKeyCreation`)
   ([secure by default](https://docs.cloud.google.com/resource-manager/docs/secure-by-default-organizations)).
   - Whether these policies apply to a project with no organization is **not confirmed**.
   - Recommendation: set up free Cloud Identity on getaethervault.com so an organization exists.
     The agent confirms the steps before you start.
3. **Budget alerts before anything else:** $10 and $25 on the billing account. They alert only and
   never cap ("doesn't automatically cap ... usage or spending")
   ([budgets](https://docs.cloud.google.com/billing/docs/how-to/budgets)).
4. **Sign in on the Mac:** `gcloud auth login` and `gcloud auth application-default login`.
5. **The agent applies `infra/accounts/gcp/`** with your OK. It enables the needed APIs, sets up
   the budgets as code, and sets **resource locations** limited to the two test regions
   (`gcp.resourceLocations`, e.g. `in:us-central1-locations`)
   ([locations](https://docs.cloud.google.com/resource-manager/docs/organization-policy/defining-locations)).
   It also creates a **deployer service account** you can impersonate
   (`roles/iam.serviceAccountTokenCreator` on that account only, Service Account Credentials API on)
   and a versioned state bucket.
6. **After that, the agent works only through impersonation:** `gcloud config set
auth/impersonate_service_account <deployer>`, and Terraform's `impersonate_service_account`. No
   key files ([impersonation](https://docs.cloud.google.com/docs/authentication/use-service-account-impersonation)).
7. **Optional automatic stop:** Google documents budget → Pub/Sub → function that **removes
   billing from the project**. It warns this "shut[s] down all resources" and "resources might be
   irretrievably deleted"
   ([disable billing](https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications)).
   Not recommended. A function that only **stops the tagged test VMs** is safer. On the trial,
   Google already stops billing when the credit ends.

**Cost of the Google live test:** Google's pricing pages didn't render for the research, so prices
are **unverified**. The agent gets them from the pricing calculator or the Cloud Billing Catalog API
after sign-up and before any spend. One e2-micro VM a month is free in us-west1, us-central1 or
us-east1, but the test needs disks Asynchronous Replication supports (Balanced PD or better).

## After setup

Tell the agent which accounts are ready. It runs `azure-source.sh check` / `gcp-source.sh check`
(signed in, right subscription or project, allowed regions, budgets present, keys blocked) before
anything else.
