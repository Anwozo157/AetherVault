# Azure Site Recovery collector

Sends **replication status** and **drill/failover jobs** from one Azure Recovery Services vault
(Azure-to-Azure replication) to AetherVault every minute. Same shape as the AWS collector in
[`collector/`](../collector/README.md); the mapping lives in
[`src/integrations/azureAsr/`](../src/integrations/azureAsr/).

```
Customer Azure subscription                                    AetherVault
┌────────────────────────────────────────────────┐            ┌───────────────────────────┐
│ Function app (timer, every minute)             │  HTTPS     │ ingest_replication_       │
│   managed identity: Site Recovery Reader,      ├──────────▶│   snapshot / recovery_jobs │
│   scoped to one vault; GETs only               │  push only │ → console, audit, alerts  │
└────────────────────────────────────────────────┘            └───────────────────────────┘
```

- **Read-only.** GETs on the vault's fabrics → protection containers → protected items, and
  its replication jobs. The identity holds only the built-in **Site Recovery Reader** role on
  that vault. It cannot fail over, stop or change anything.
- **Status only.** Per VM: name, state, RPO (`rpoInSeconds`), pending data, disk size, last
  heartbeat, first error-level health error. No subscription ID (the database rejects one for
  Azure), no IPs, no disk data.
- **State mapping.** Protected + Normal/Warning → `CONTINUOUS`; Protected + Critical or a
  `…Failed` state → `STALLED`; initial replication → `INITIAL_SYNC`; unprotected/disabling →
  `STOPPED`; anything not yet seen in a recording → `UNKNOWN`. Warnings such as 161011 ("no
  test failover yet") are not failures.
- **Jobs.** `TestFailover` → drill, `UnplannedFailover`/`PlannedFailover` → recovery, with
  Azure's own start and end times. Setup and cleanup jobs are dropped.

## Commands

```sh
npm run collector:azure -- --fixture healthy --dry-run   # recorded sample, prints the snapshot
export AZURE_VAULT_ID=/subscriptions/…/vaults/<vault> AZURE_VAULT_REGION=westus2
npm run collector:azure -- --dry-run                     # real vault via `az login`, prints only
npm run collector:azure -- --record ~/…/private/recordings --dry-run   # raw responses, private
npm run collector:azure:package                          # → dist-collector-azure/function/function.zip
```

Pushing (no `--dry-run`) also needs `AETHERVAULT_URL`, `AETHERVAULT_ANON_KEY` and
`AETHERVAULT_INGEST_TOKEN` (created in the console; never logged). `--record` files hold real
resource IDs: keep them in the private folder and redact before turning one into a fixture.

Deploying the Function (Flex Consumption, managed identity, timer) is in
[`terraform/`](terraform/), **validated, not applied** until the founder approves it.
