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
- **No secrets** in variables, files or state: Azure uses the signed-in CLI session; collectors
  use managed identities. Real IDs go in `*.tfvars` (gitignored) or the private folder.
- **State is never committed** (`.gitignore`); provider lock files are, so provider versions and
  checksums are pinned.
- **Everything is tagged** `project=aethervault`, `env`, `owner`, `expires`, so teardown checks find it.
- CI runs `terraform fmt -check`, `terraform validate` and a Checkov scan on every folder.

Validate locally (no cloud access needed):

```sh
terraform -chdir=infra/poc/azure init -backend=false && terraform -chdir=infra/poc/azure validate
```
