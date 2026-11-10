# Terraform: deploying the collector safely

The collector's infrastructure lives in [`collector/terraform`](../collector/terraform): one IAM
role (read-only DRS + Lambda logs), one Lambda, one EventBridge schedule (every minute), one log
group (14 days). It is deployed **in the customer's AWS account**, usually by us with temporary
access they grant, or by their own team.

## Rules we follow

1. **Pin versions.** The module requires Terraform `>= 1.5` and the AWS provider `~> 5.0`.
   Keep the `.terraform.lock.hcl` that `terraform init` creates with the customer's deployment, so
   every apply uses the same provider build. (It is gitignored here because this module is generic.) Use Terraform 1.10 or later if you want S3 native state locking.
2. **Always plan, review, then apply the saved plan.**
   ```sh
   terraform plan -out tfplan    # read it: expect 8 resources to add on first deploy
   terraform apply tfplan
   ```
   Never `apply -auto-approve` in a customer account.
3. **Least-privilege deployer.** Whoever runs Terraform needs to create one IAM role (and attach
   AWS managed policies to it), a Lambda function, an EventBridge rule and target, and a CloudWatch
   log group. Use a temporary role for the deployment, not an admin user's long-lived keys.
4. **Secrets stay out of git and chat.** `terraform.tfvars` holds the ingest token. It is
   gitignored in `collector/terraform/.gitignore`. Pass it through a password manager, never
   email or Slack. The variable is marked `sensitive`, so Terraform doesn't print it.
5. **State contains the token.** Terraform state stores the Lambda's environment, including the
   ingest token. Treat state as a secret (see Remote state). If state or the token leaks, rotate
   the token in the console (the old one stops working immediately) and re-apply.
6. **One state per customer account and Region.** Never share state across customers.
7. **Tag everything.** The module tags resources `ManagedBy=AetherVault`; add the customer's own
   tags through the `tags` variable.
8. **Format and validate before committing** module changes: `terraform fmt -check` and
   `terraform validate` (CI-ready; both pass today).

## Remote state (recommended for anything beyond a one-person pilot)

Local state (`terraform.tfstate` on the deploying laptop) is fine for a first pilot if the laptop
has FileVault/BitLocker on and the file is backed up. For a shared or long-lived deployment, keep
state in an **S3 bucket in the customer's account** with versioning, encryption and native locking:

Copy `backend.tf.example` to `backend.tf` (gitignored) and fill it in:

```hcl
# collector/terraform/backend.tf
terraform {
  backend "s3" {
    bucket       = "customer-terraform-state"
    key          = "aethervault/drs-collector/us-west-2.tfstate"
    region       = "us-west-2"
    encrypt      = true      # server-side encryption of state and lock files
    use_lockfile = true      # S3 native locking (Terraform 1.10+); no DynamoDB table needed
    # kms_key_id = "arn:aws:kms:..."  # optional customer-managed key
  }
}
```

- Turn on **bucket versioning** (recover a bad state) and **block public access**.
- Restrict the bucket to the deployment role.
- **Don't use DynamoDB locking for new setups.** HashiCorp has deprecated it in the S3 backend in
  favor of `use_lockfile`.
- With `use_lockfile`, the deployer needs `s3:GetObject`, `s3:PutObject` and `s3:DeleteObject` on
  the `<key>.tflock` object as well as the state object.

## Day-2 operations

| Task                 | How                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| Rotate the token     | Console → Connect your AWS account → Create a new token; update `terraform.tfvars`; plan and apply           |
| Update the collector | Pull the new AetherVault version, `npm run collector:package`, plan (only the Lambda code changes) and apply |
| Change the schedule  | `schedule = "rate(5 minutes)"` in tfvars; plan and apply                                                     |
| Check it's running   | CloudWatch logs `/aws/lambda/aethervault-drs-collector`; console badge shows LIVE                            |
| Detect drift         | `terraform plan` should show no changes; anything else was changed by hand                                   |
| Remove it            | `terraform destroy`, then revoke the token in the console                                                    |

## Why the module is shaped this way

- **Reserved concurrency 1:** never two collectors pushing at once; the database also rejects
  reports less than 20 s apart.
- **AWS managed policies only:** `AWSElasticDisasterRecoveryReadOnlyAccess` and
  `AWSLambdaBasicExecutionRole`. A customer's security team can review them by name. AWS maintains
  them; no custom policy to audit.
- **No VPC attachment:** the Lambda only calls the DRS API and AetherVault over HTTPS, so it needs
  no network inside the customer's VPC and no NAT gateway (which would cost money).
- **14-day logs:** enough to debug, cheap to keep.

## Sources

- S3 backend (locking, encryption, deprecations): <https://developer.hashicorp.com/terraform/language/backend/s3>
