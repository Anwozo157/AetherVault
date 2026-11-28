# Infrastructure as code

Everything AetherVault runs in a cloud account is Terraform, so any test or environment can be
rebuilt in minutes in another account (for example, the business accounts replacing the
personal test accounts).

| Folder                    | What                                                                                                 | Applied by                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `accounts/azure/`         | One-time subscription baseline: budgets, region and VM-size policies, resource groups, state storage | Founder's `az login` session, once   |
| `poc/azure/`              | Azure Site Recovery live test (`docs/AZURE_LIVE_POC.md`)                                             | `scripts/poc/azure-source.sh` only   |
| `../collector/terraform/` | AWS DRS collector, deployed in a customer's AWS account                                              | Customer (see `collector/README.md`) |

Rules:

- **Nothing is applied without the founder's OK.** Scripts plan first and apply only with
  `POC_APPROVE=yes`.
- **No secrets** in variables or files: Azure uses the signed-in CLI session; collectors use
  managed identities. Real IDs go in `*.tfvars` (gitignored) or the private folder.
- **State does hold secrets:** the azurerm provider records storage account keys and connection
  strings in state (found 2026-11-28). That is why state lives only in the private, Entra-only state
  account; never copy it into git (local backups stay as files, gitignored).
- **State is never committed** (`.gitignore`); provider lock files are, so provider versions and
  checksums are pinned.
- **Azure state is remote** (since 2026-11-28): both Azure folders keep state in the private storage
  account that `accounts/azure` creates (Entra ID only, no account keys, versioned, 30-day soft
  delete), keys `accounts-azure.tfstate` and `poc-azure.tfstate`. Backend settings live outside the
  repo in `~/Developer/AegisCoreLabs-private/azure-poc/backend-{accounts,poc}.hcl`:

  ```sh
  terraform -chdir=infra/accounts/azure init -backend-config=$HOME/Developer/AegisCoreLabs-private/azure-poc/backend-accounts.hcl
  ```

  `scripts/poc/azure-source.sh` passes `backend-poc.hcl` itself. Access needs the **Storage Blob
  Data Contributor** role on that account (Owner alone is not enough for blob data).

- **Everything is tagged** `project=aethervault`, `env`, `owner`, `expires`, so teardown checks find it.
- CI runs `terraform fmt -check`, `terraform validate` and a Checkov scan on every folder.

Validate locally (no cloud access needed):

```sh
terraform -chdir=infra/poc/azure init -backend=false && terraform -chdir=infra/poc/azure validate
```
