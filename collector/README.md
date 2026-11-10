# AWS DRS collector

Sends **replication status** from AWS Elastic Disaster Recovery to AetherVault every minute,
so the console shows real lag, backlog and stalled servers, and alerts when the data-loss
target (RPO) is at risk.

```
Customer AWS account                                           AetherVault
┌────────────────────────────────────────────────┐            ┌───────────────────────────┐
│ EventBridge (every minute) → Lambda collector  │  HTTPS     │ ingest_replication_       │
│   role: AWSElasticDisasterRecoveryReadOnlyAccess├──────────▶│   snapshot(token, status) │
│   calls drs:DescribeSourceServers only         │  push only │ → console, audit, alerts  │
└────────────────────────────────────────────────┘            └───────────────────────────┘
```

- **Read-only.** The only AWS call is `DescribeSourceServers`. The role has the AWS managed
  policy `AWSElasticDisasterRecoveryReadOnlyAccess` and basic Lambda logging. It cannot
  launch, stop or change anything.
- **Status only.** Per server: ID, hostname, replication state, lag, backlog/total/replicated
  bytes, ETA, last-seen time, error code, last launch result. No disk data, no IPs, no OS
  details, no tags, no raw error text, no AWS credentials.
- **Push, not pull.** AetherVault needs no access to the customer's account and no inbound
  network path.
- **Token.** The collector holds the public anon key plus a per-organization ingest token
  (192 random bits, stored only as a SHA-256 hash). Revoke or rotate it in the console.
- **Cost.** ~43,200 Lambda runs a month at 128 MB / ~1 s: inside the Lambda free tier. Logs
  are kept 14 days. `DescribeSourceServers` has no per-call charge.

## Pilot day: deploy

Full checklist (blockers, network, agent, first drill, removal, troubleshooting):
[`docs/PILOT_DAY.md`](../docs/PILOT_DAY.md). Background: [`docs/AWS_DR_BEST_PRACTICES.md`](../docs/AWS_DR_BEST_PRACTICES.md),
[`docs/TERRAFORM.md`](../docs/TERRAFORM.md) (remote state, secrets, day-2 operations). The console's
**Connect your AWS account** guide walks through the same steps with your Region filled in.

1. Console → **AWS DRS & Telemetry** → **Create collector token** (admin). Copy it.
2. Build the Lambda package (SDK bundled, single file):
   ```sh
   npm run collector:package          # → dist-collector/lambda/lambda.zip
   ```
3. Deploy with Terraform in the customer's account (`collector/terraform`):
   ```sh
   cd collector/terraform
   cp terraform.tfvars.example terraform.tfvars   # fill in; never commit it
   terraform init
   terraform plan -out tfplan    # review: 8 resources on first deploy
   terraform apply tfplan
   ```
4. Within a minute the console shows **LIVE · AWS DRS**. If nothing arrives, check the
   Lambda's CloudWatch logs (`/aws/lambda/aethervault-drs-collector`).

## Try it without AWS

```sh
# Print a snapshot built from the sample DescribeSourceServers responses
npm run collector -- --fixture degraded --dry-run

# Push sample data to a console (shown as SAMPLE DATA, never as real)
AETHERVAULT_URL=http://127.0.0.1:54321 AETHERVAULT_ANON_KEY=... AETHERVAULT_INGEST_TOKEN=avi_... \
  npm run collector -- --fixture healthy
```

## With AWS credentials (CLI)

```sh
AWS_PROFILE=customer DRS_REGION=us-west-2 npm run collector -- --dry-run
# Save the real API responses as new test fixtures (review and redact hostnames first)
AWS_PROFILE=customer DRS_REGION=us-west-2 npm run collector -- --record pages.json --dry-run
# Push every 60 s from a laptop or server instead of Lambda
AWS_PROFILE=customer DRS_REGION=us-west-2 AETHERVAULT_URL=... AETHERVAULT_ANON_KEY=... \
  AETHERVAULT_INGEST_TOKEN=... npm run collector -- --watch
```

## How health and RPO are decided

Computed by the database (not trusted from the collector), from the DRS
`dataReplicationState`:

| State                                                 | Shown as     |
| ----------------------------------------------------- | ------------ |
| `CONTINUOUS`, `CREATING_SNAPSHOT`                     | Replicating  |
| `BACKLOG`                                             | Catching up  |
| `INITIATING`, `INITIAL_SYNC`, `RESCAN`                | Initial sync |
| `STALLED`, `DISCONNECTED`, any `dataReplicationError` | Stalled      |
| `STOPPED`, `PAUSED`                                   | Stopped      |
| anything else                                         | Unknown      |

The data-loss target is **met** when every server is replicating or catching up and the
worst lag is within the organization's RPO target; **at risk** otherwise; **unknown** when
no lag is reported. A change between met and at risk is written to the audit log and sent to
alert channels subscribed to "Replication at risk" (PagerDuty resolves on recovery).

## Known unknowns (confirm on the first real account)

- AWS does not document the format of `lagDuration`. The collector reads ISO 8601 durations
  (`PT2S`) and plain seconds and shows anything else as "lag unknown". Run `--record` on day
  one and add the real responses to `src/integrations/awsDrs/fixtures/`.
- The sample responses in that folder are hand-built from the API reference, not recorded.
