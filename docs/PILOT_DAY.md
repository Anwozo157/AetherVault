# Pilot day: protecting a customer server with AWS DRS + AetherVault

Everything needed to go from "signed pilot" to "LIVE replication and a passed drill with evidence".
Written for the NewConnect pilot (one Dell PowerEdge server at CoreSite, reached by field engineers
through the Jump app) but generic. Background: [`AWS_DR_BEST_PRACTICES.md`](AWS_DR_BEST_PRACTICES.md),
[`TERRAFORM.md`](TERRAFORM.md).

## 0. Blockers: must be true before the day

| #   | Item                                                                                                                                                                                                             | Owner            | Status                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------- |
| B1  | **AetherVault console hosted** (Phase 3.6): Supabase project created, migrations pushed (`npx supabase db push`), console deployed with its URL and anon key. A collector in AWS cannot reach a laptop database. | Founder + agent  | ❌ Needs the founder's free Supabase account |
| B2  | Hosted database extensions on: `pg_cron` (drill scheduler, alert sweeper), `pg_net` (alerts), Vault (alert secrets). Check in the Supabase dashboard after pushing migrations.                                   | Agent            | After B1                                     |
| B3  | Customer's **AWS account** for recovery, with billing owned by the customer, and their approval of the DRS cost (≈ $45–65/month for one 500 GB server; see best practices §10).                                  | Customer         | Ask                                          |
| B4  | **Temporary deployment access**: an IAM role in their account we can assume (or their engineer runs the steps with us).                                                                                          | Customer         | Ask                                          |
| B5  | **Server facts**: OS and version, disk sizes, average daily change, whether it can reboot (agent install doesn't need one, but patching might).                                                                  | Customer         | Ask (NewConnect question list)               |
| B6  | **Network**: outbound TCP 443 and TCP 1500 from the server's CoreSite network to the recovery Region; VPN/Direct Connect if they have one.                                                                       | Customer network | Ask                                          |
| B7  | **Recovery access path**: how field engineers (Jump app → Nexus → switches and radios) will reach the _recovered_ server: DNS name, VPN into the recovery VPC, or IP change.                                     | Customer + us    | Design together; becomes runbook steps       |
| B8  | Founder approval for any AetherVault-side spend (AGENTS.md rule 1). The customer's AWS bill is theirs.                                                                                                           | Founder          | Pilot price agreed                           |

## 1. The week before

1. Agree the **RTO and RPO targets** with the customer and set them on the Drills tab (admin).
2. Invite their people to the console (Team tab): at least one **approver** besides the requester,
   so failovers meet the two-person rule.
3. Write their **runbook** (Runbook tab → Start from template). Make it theirs. For NewConnect, add:
   - "Confirm field engineers can reach the recovered server through Jump", with the exact path from B7.
   - "Confirm the Nexus and the switches and radios it manages are reachable from the recovered server".
   - Names and phone numbers of the incident lead and their network contact.
4. Add an **alert channel** (Alerts tab): their Slack or PagerDuty, with "Replication at risk" on.
5. Decide the **recovery Region** and the **staging subnet** CIDR with their network team.

## 2. On the day (about 2 hours of work, then initial sync)

Follow the console's **AWS DRS & Telemetry → Connect your AWS account** guide. It mirrors these
steps, fills in commands for the chosen Region, and checks off steps it can verify.

| Step | What                                                                                                                                                        | Check                                                                   |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1    | Initialize DRS in the recovery Region; set default replication settings: private IP data routing (if VPN), encrypted staging disks, staging subnet.         | DRS console shows the settings template                                 |
| 2    | Open the network path (443 + 1500 outbound).                                                                                                                | `curl -I https://drs.<region>.amazonaws.com` from the server            |
| 3    | Install the agent with temporary credentials (`AWSElasticDisasterRecoveryAgentInstallationPolicy`).                                                         | Server appears in DRS as _Initial sync_                                 |
| 4    | Console: create the collector token (shown once; store it in the password manager).                                                                         | Console shows "token …abcd"                                             |
| 5    | `npm run collector:package`; in `collector/terraform` write `terraform.tfvars` (the guide prints it), `terraform init`, `plan -out tfplan`, `apply tfplan`. | 8 resources created                                                     |
| 6    | Wait ≤ 1 minute.                                                                                                                                            | Badge **LIVE · AWS DRS**; server listed as _Initial sync_ with progress |

Optional: `npm run collector -- --record pages.json --dry-run` (with their read-only credentials)
saves real `DescribeSourceServers` responses. Redact hostnames and account IDs, then add them to
`src/integrations/awsDrs/fixtures/` to replace the hand-built samples and confirm the
`lagDuration` format.

## 3. After initial sync

1. Server shows **Replicating**, lag in seconds, data-loss target **Met**.
2. Check the alert path: the first breach/recovery will post to their channel. If they want
   proof now, use **Send test** on the Alerts tab.
3. Set launch settings in DRS (right-sizing, subnet, security groups, IP handling: best practices §6).

## 4. First drill (same day or next)

1. Drills tab → **Run drill now** (or let the schedule start it).
2. In DRS, launch the matching **drill** instance into the isolated drill subnet.
3. Work through the Runbook tab checklist for that drill, with notes (who, what was checked).
4. Validate, then **terminate the drill instances** in DRS (they bill while running).
5. Open the drill's **evidence report**: recovery time (simulated stage model until AetherVault
   drives DRS launches directly), **measured data loss at launch** from the live collector,
   runbook steps with who and when, the audit trail and the chain check. Print or save as PDF for
   the customer.

Honesty note for the customer: AetherVault _reads_ DRS status today; it does not launch DRS
recovery instances itself. Launches happen in the DRS console (step 4.2). The recovery time in the
report is AetherVault's simulated stage model and is labeled as such.

## 5. Removing everything (if the pilot ends)

1. `terraform destroy` in `collector/terraform` (removes the collector).
2. Console → revoke the collector token.
3. In DRS: disconnect and delete the source server (stops replication and its charges), terminate
   any recovery or drill instances, then delete leftover staging volumes and snapshots if DRS
   didn't.
4. Uninstall the agent on the server.

## 6. Troubleshooting

| Symptom                                    | Likely cause                                               | Fix                                                                                            |
| ------------------------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Console never shows data                   | Collector can't reach AetherVault, or wrong token          | CloudWatch `/aws/lambda/aethervault-drs-collector`; `invalid ingest token` → new token + apply |
| Badge **STALE**                            | Lambda failing or disabled                                 | Logs; check the EventBridge rule is enabled                                                    |
| Server **Stalled**, `UNSTABLE_NETWORK`     | Port 1500 blocked or link saturated                        | Firewall rules; bandwidth throttle; VPN health                                                 |
| Server **Disconnected** / `AGENT_NOT_SEEN` | Agent stopped (reboot, patch, antivirus)                   | Restart the agent service; exclude it from AV                                                  |
| Lag keeps growing                          | Write rate above what replication can send                 | Raise throttle, faster staging disk (`gp3`), larger replication server                         |
| Initial sync very slow                     | Large disks over a small uplink                            | Expected; let it run; schedule off-peak                                                        |
| "lag unknown"                              | `lagDuration` in a format we don't parse yet               | Run `--record`, send the sample to us; we add the format                                       |
| `terraform apply` AccessDenied             | Deployment role missing IAM/Lambda/Events/Logs permissions | See TERRAFORM.md rule 3                                                                        |

## 7. Questions to settle with NewConnect

- Server OS, disks and change rate (B5).
- Network path from CoreSite and whether a VPN to AWS exists (B6).
- How Jump reaches the server today (public IP? VPN? DNS name?) and how it should reach the
  recovered one (B7).
- Who approves a real failover on their side (second person for the two-person rule).
- Target RTO/RPO, and how often they want drills (monthly is a good start).
