#!/usr/bin/env bash
# Azure live test: a small test server in our own Azure subscription that stands in for a
# customer's server (no customer data), protected by Azure Site Recovery into a second region.
# The Azure counterpart of scripts/poc/source-server.sh. Infrastructure is Terraform
# (infra/poc/azure); this script is the entry point, the same commands as the AWS test.
# See docs/AZURE_LIVE_POC.md and docs/AZURE_BUILD_PROMPT.md.
#
# Usage: scripts/poc/azure-source.sh <command>
#   check               signed in, right subscription, providers, policies, budgets, quotas (read-only)
#   up                  plan the source server + networks; applies only with POC_APPROVE=yes
#   verify              PostgreSQL and the one-row-per-second writer, from inside the VM (Run Command)
#   enable-replication  plan Site Recovery protection into the target region; POC_APPROVE=yes applies
#   status              replication health, RPO, heartbeat and recent Site Recovery jobs
#   record              save raw API responses (protected items, jobs) to the private folder
#   drill               start a test failover into the isolated drill network (POC_APPROVE=yes)
#   verify-drill <iso>  on the drill VM: newest row written before the request -> data loss
#   drill-cleanup       clean up the test failover (deletes the drill VM)
#   last-row            newest row on the source server
#   jobs                recent Site Recovery jobs with start/end times (measured recovery time)
#   cost                running estimate at list prices (billing lags 8-24 h)
#   db-standby          plan the PostgreSQL streaming standby in the recovery region (experiment;
#                       POC_APPROVE=yes applies); db-status shows its lag; db-drill promotes it and
#                       measures; db-reseed rebuilds it from the primary after a drill
#   down                plan destroy of everything `up`/`enable-replication` made; POC_APPROVE=yes
#                       applies; then lists anything still tagged project=aethervault
#
# Guardrails: every apply/destroy/drill needs POC_APPROVE=yes (the founder's OK, asked first).
# No secrets: uses the founder's `az login` session. Subscription, resource IDs and raw
# responses stay in the private folder, never in the repo.
#
# Environment: AZURE_SUBSCRIPTION_ID (default: the signed-in subscription), POC_PRIVATE_DIR
# (default ~/Developer/AegisCoreLabs-private/azure-poc), POC_ALERT_EMAIL (auto-shutdown notice),
# POC_AUTO_SHUTDOWN (HHMM US Eastern, default 2300; "off" disables), ASR_API_VERSION.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
TF_DIR="$ROOT/infra/poc/azure"
PRIV="${POC_PRIVATE_DIR:-$HOME/Developer/AegisCoreLabs-private/azure-poc}"
API="${ASR_API_VERSION:-2026-11-01}"
KEY="$PRIV/azure-poc-key"
SHUTDOWN="${POC_AUTO_SHUTDOWN:-2300}"
[[ $SHUTDOWN == off ]] && SHUTDOWN=""

say() { printf '\n== %s\n' "$*"; }
die() { echo "error: $*" >&2; exit 1; }
need() { command -v "$1" >/dev/null || die "$1 is not installed"; }
now_iso() { python3 -c 'import datetime as d; print(d.datetime.now(d.timezone.utc).isoformat(timespec="milliseconds").replace("+00:00","Z"))'; }

sub_id() {
  if [[ -n ${AZURE_SUBSCRIPTION_ID:-} ]]; then echo "$AZURE_SUBSCRIPTION_ID"; return; fi
  az account show --query id -o tsv
}

approved() {
  [[ ${POC_APPROVE:-} == yes ]] || {
    echo "Planned only. Nothing was changed. Re-run with POC_APPROVE=yes after the founder approves."
    return 1
  }
}

# Teardown date inside the 31 free Site Recovery days; fixed at first `up`, kept privately.
expires() {
  mkdir -p "$PRIV"
  [[ -f $PRIV/expires ]] || python3 -c 'import datetime as d; print((d.date.today()+d.timedelta(days=21)).isoformat())' >"$PRIV/expires"
  cat "$PRIV/expires"
}

# Whether the database standby experiment is on; kept privately so other commands keep it.
db_standby_flag() { [[ -f $PRIV/db-standby ]] && cat "$PRIV/db-standby" || echo false; }

ensure_key() {
  mkdir -p "$PRIV" && chmod 700 "$PRIV"
  # Throwaway key: Azure requires one for Linux VMs. No inbound port is open; never used to log in.
  [[ -f $KEY ]] || ssh-keygen -q -t rsa -b 4096 -N "" -C "aethervault-azure-poc" -f "$KEY"
}

tf() { terraform -chdir="$TF_DIR" "$@"; }

tf_vars() {
  local repl="$1"
  ensure_key
  printf '%s\n' \
    "-var=subscription_id=$(sub_id)" \
    "-var=ssh_public_key=$(cat "$KEY.pub")" \
    "-var=enable_replication=$repl" \
    "-var=expires=$(expires)" \
    "-var=auto_shutdown_time=$SHUTDOWN" \
    "-var=alert_email=${POC_ALERT_EMAIL:-}" \
    "-var=enable_db_standby=$(db_standby_flag)"
}

plan_apply() {
  local repl="$1"; shift
  local -a extra=("$@")
  local -a vars=()
  local line
  # bash 3.2 (macOS) has no mapfile.
  while IFS= read -r line; do vars+=("$line"); done < <(tf_vars "$repl")
  [[ -f $PRIV/backend-poc.hcl ]] || die "missing $PRIV/backend-poc.hcl (remote state settings; see infra/README.md)"
  tf init -input=false -backend-config="$PRIV/backend-poc.hcl" >/dev/null
  # State lives in the private Azure storage account (Entra ID only), never in the repo.
  tf plan -input=false ${extra[@]+"${extra[@]}"} "${vars[@]}" -out=tfplan
  approved || return 0
  tf apply -input=false tfplan
  rm -f "$TF_DIR/tfplan"
}

out() { tf output -raw "$1" 2>/dev/null || true; }

run_on() { # run_on <resource-group> <vm> <script>
  az vm run-command invoke -g "$1" -n "$2" --command-id RunShellScript --scripts "$3" \
    --query 'value[0].message' -o tsv
}

source_rg() { out source_resource_group; }
target_rg() { out target_resource_group; }

# ARM path of the protected item. Walks fabric -> container -> item, the path Site Recovery
# Reader can read (it lacks the vault-level list).
item_url() {
  local vault fabric container item
  vault="$(out vault_name)"; fabric="$(out fabric_primary)"
  container="$(out container_primary)"; item="$(out protected_item)"
  [[ -n $item ]] || die "replication is not enabled (run enable-replication)"
  echo "/subscriptions/$(sub_id)/resourceGroups/$(target_rg)/providers/Microsoft.RecoveryServices/vaults/$vault/replicationFabrics/$fabric/replicationProtectionContainers/$container/replicationProtectedItems/$item"
}

vault_url() {
  echo "/subscriptions/$(sub_id)/resourceGroups/$(target_rg)/providers/Microsoft.RecoveryServices/vaults/$(out vault_name)"
}

cmd_check() {
  need az; need terraform; need python3
  say "Signed in"
  az account show --query '{subscription:name, state:state, user:user.name, tenantDefault:isDefault}' -o table
  local sid; sid="$(sub_id)"; echo "subscription id ends in ${sid: -4}"
  say "Resource providers (must be Registered)"
  for p in Microsoft.Compute Microsoft.Network Microsoft.Storage Microsoft.RecoveryServices Microsoft.DevTestLab; do
    printf '%-28s %s\n' "$p" "$(az provider show -n "$p" --query registrationState -o tsv 2>/dev/null || echo unknown)"
  done
  echo "(register a missing one with: az provider register -n <name>; free)"
  say "Guardrail policies (from infra/accounts/azure)"
  az policy assignment list --query "[?starts_with(name,'aethervault-')].[name,enforcementMode]" -o tsv || true
  say "Budgets"
  az consumption budget list --query '[].[name,amount,timeGrain]' -o tsv 2>/dev/null || echo "could not read budgets"
  say "Resource groups"
  az group list --query "[?tags.project=='aethervault'].[name,location]" -o tsv
  say "vCPU quota (source region)"
  az vm list-usage -l "$(az group show -n rg-aethervault-poc-source --query location -o tsv 2>/dev/null || echo northcentralus)" --query "[?contains(name.value,'BS') || contains(name.value,'Basv2') || name.value=='cores'].[name.localizedValue,currentValue,limit]" -o tsv 2>/dev/null || true
  say "Teardown date (inside the 31 free Site Recovery days): $(expires)"
}

cmd_verify() {
  run_on "$(source_rg)" "$(out source_vm_name)" \
    'systemctl is-active postgresql aethervault-heartbeat; sudo -u postgres psql -Atc "select count(*), max(id), max(written_at) from heartbeat"; date -u +%FT%T.%3NZ'
}

cmd_last_row() {
  run_on "$(source_rg)" "$(out source_vm_name)" \
    'sudo -u postgres psql -Atc "select max(id), max(written_at) from heartbeat"; date -u +%FT%T.%3NZ'
}

cmd_status() {
  az rest --method get --url "https://management.azure.com$(item_url)?api-version=$API" --query '{
      health: properties.replicationHealth,
      protection: properties.protectionStateDescription,
      rpoSeconds: properties.providerSpecificDetails.rpoInSeconds,
      rpoCalculated: properties.providerSpecificDetails.lastRpoCalculatedTime,
      heartbeat: properties.providerSpecificDetails.lastHeartbeat,
      initialSyncPercent: properties.providerSpecificDetails.monitoringPercentageCompletion,
      testFailover: properties.testFailoverState,
      allowed: properties.allowedOperations,
      errors: properties.healthErrors[].errorCode}' -o json
  cmd_jobs
}

cmd_jobs() {
  az rest --method get --url "https://management.azure.com$(vault_url)/replicationJobs?api-version=$API" \
    --query 'value[0:10].{job:name, scenario:properties.scenarioName, state:properties.state, start:properties.startTime, end:properties.endTime, target:properties.targetObjectName}' -o table
}

cmd_record() {
  local dir; dir="$PRIV/recordings/$(date -u +%Y%m%dT%H%M%SZ)"; mkdir -p "$dir"
  az rest --method get --url "https://management.azure.com$(item_url)?api-version=$API" >"$dir/protected-item.json"
  az rest --method get --url "https://management.azure.com$(vault_url)/replicationJobs?api-version=$API" >"$dir/jobs.json"
  echo "Saved raw responses to $dir (private). Redact names and IDs before turning one into a fixture."
}

cmd_drill() {
  local body
  body="$(python3 -c 'import json,sys; print(json.dumps({"properties": {"failoverDirection": "PrimaryToRecovery", "networkType": "VmNetworkAsInput", "networkId": sys.argv[1], "providerSpecificDetails": {"instanceType": "A2A"}}}))' "$(out drill_network_id)")"
  echo "Test failover into the isolated drill network (latest processed recovery point)."
  echo "Request body: $body"
  approved || return 0
  echo "requested $(now_iso)"
  az rest --method post --url "https://management.azure.com$(item_url)/testFailover?api-version=$API" --body "$body" -o none
  echo "Started. Follow it with: $0 jobs   (then verify-drill <requested time>)"
}

cmd_verify_drill() {
  local requested="${1:-}" vm
  [[ -n $requested ]] || die "usage: verify-drill <request time as printed by drill>"
  vm="$(az rest --method get --url "https://management.azure.com$(item_url)?api-version=$API" --query 'properties.providerSpecificDetails.tfoAzureVMName' -o tsv)"
  [[ -n $vm && $vm != None ]] || die "no drill VM yet (check: $0 jobs)"
  echo "drill VM $vm; checked at $(now_iso)"
  run_on "$(target_rg)" "$vm" \
    "systemctl is-active postgresql; sudo -u postgres psql -Atc \"select max(id), max(written_at) from heartbeat where written_at < '$requested'::timestamptz\""
  echo "Data loss = $requested minus the newest written_at above."
}

cmd_drill_cleanup() {
  echo "Cleans up the test failover (deletes the drill VM and its disks)."
  approved || return 0
  az rest --method post --url "https://management.azure.com$(item_url)/testFailoverCleanup?api-version=$API" \
    --body '{"properties":{"comments":"AetherVault drill cleanup"}}' -o none
  echo "Cleanup started. Check: $0 jobs"
}

# Estimate at list prices (Azure Retail Prices API, eastus, 2026-11-26). The free account's 750
# B-series hours make the VM itself $0 there; credit still pays for disks, storage and transfer.
cmd_cost() {
  python3 - "$(source_rg)" "$(target_rg)" <<'PY'
import json, subprocess, sys, datetime as dt
src, tgt = sys.argv[1], sys.argv[2]
def az(*a):
    return json.loads(subprocess.check_output(["az", *a, "-o", "json"]))
VM_HOUR = {"Standard_B2ats_v2": 0.0094, "Standard_B1s": 0.0104}
ASR_MONTH, FREE_DAYS = 25.0, 31
now = dt.datetime.now(dt.timezone.utc)
def hours(t):
    return (now - dt.datetime.fromisoformat(t.replace("Z", "+00:00"))).total_seconds() / 3600
total, lines = 0.0, []
for rg in (src, tgt):
    for vm in az("vm", "list", "-g", rg):
        created = vm.get("timeCreated")
        h = hours(created) if created else 0.0
        c = h * VM_HOUR.get(vm["hardwareProfile"]["vmSize"], 0.05)
        total += c
        lines.append(f"{rg}  VM {vm['name']} {vm['hardwareProfile']['vmSize']}  {h:6.1f} h  ${c:.2f} (list; $0 within free B-series hours)")
    for d in az("disk", "list", "-g", rg):
        lines.append(f"{rg}  disk {d['name']} {d['diskSizeGB']} GiB {d['sku']['name']}  (small; check Cost Management)")
lines.append(f"Site Recovery: free for the first {FREE_DAYS} days per VM, then ${ASR_MONTH:.0f}/month: tear down before day {FREE_DAYS}")
print("\n".join(lines))
print(f"Estimated compute so far at list price: ${total:.2f}. Stop and ask the founder past $10.")
PY
  echo "Actual (lags 8-24 h): az consumption usage list --top 20 -o table"
}

db_vm() { out db_standby_vm_name; }

cmd_db_standby() {
  echo true >"$PRIV/db-standby"
  say "Plan: PostgreSQL streaming standby in the recovery region (second small VM, VNet peering)"
  plan_apply true
}

cmd_db_status() {
  [[ -n $(db_vm) ]] || die "no standby (run db-standby)"
  say "Primary: replication connections"
  run_on "$(source_rg)" "$(out source_vm_name)" \
    'sudo -u postgres psql -Atc "select application_name, state, sync_state, coalesce(replay_lag::text, '"'"'0'"'"') from pg_stat_replication"'
  say "Standby: in recovery, replay delay, newest row"
  run_on "$(target_rg)" "$(db_vm)" \
    'sudo -u postgres psql -Atc "select pg_is_in_recovery(), now() - pg_last_xact_replay_timestamp(), max(written_at) from heartbeat"; date -u +%FT%T.%3NZ'
}

# A real failover of the database tier: promote the standby, then measure. The source keeps
# running; afterwards the standby has diverged and must be rebuilt with db-reseed.
cmd_db_drill() {
  [[ -n $(db_vm) ]] || die "no standby (run db-standby)"
  echo "Promotes the standby to a writable primary (it stops following the source; db-reseed rebuilds it)."
  approved || return 0
  local req; req="$(now_iso)"; echo "requested (this Mac) $req"
  # The "disaster" moment T is taken on the standby itself, immediately before promoting, so
  # rows that arrive during the Run Command start-up don't count in our favour. Data loss is
  # T minus the newest source row the standby had; Run Command overhead is reported separately.
  run_on "$(target_rg)" "$(db_vm)" '
    T=$(sudo -u postgres psql -Atc "select clock_timestamp()")
    sudo -u postgres psql -Atc "select pg_promote(true, 60)" >/dev/null
    W=$(sudo -u postgres psql -Atc "insert into heartbeat default values returning clock_timestamp()" | head -1)
    sudo -u postgres psql -Atc "select '"'"'T (failure)       '"'"' || '"'"'$T'"'"',
      '"'"'newest source row '"'"' || max(written_at) from heartbeat where written_at < '"'"'$T'"'"'::timestamptz and id < (select max(id) from heartbeat)" -F " "
    echo "writable at       $W"
    sudo -u postgres psql -Atc "select '"'"'data loss         '"'"' || round(extract(epoch from '"'"'$T'"'"'::timestamptz - max(written_at))::numeric, 3) || '"'"' s'"'"',
      '"'"'promote to write  '"'"' || round(extract(epoch from '"'"'$W'"'"'::timestamptz - '"'"'$T'"'"'::timestamptz)::numeric, 3) || '"'"' s'"'"'
      from heartbeat where written_at < '"'"'$T'"'"'::timestamptz and id < (select max(id) from heartbeat)" -F " | "'
  echo "finished (this Mac) $(now_iso)  (includes Azure Run Command start-up)"
}

cmd_db_reseed() {
  say "Plan: rebuild the standby from the primary (re-runs the seed Run Command)"
  plan_apply true "-replace=azurerm_virtual_machine_run_command.standby_seed[0]"
}

cmd_down() {
  say "Plan: destroy everything this test created (the resource groups stay; they belong to infra/accounts/azure)"
  plan_apply true -destroy
  rm -f "$PRIV/db-standby"
  say "Anything still tagged project=aethervault (resource groups are expected)"
  az resource list --tag project=aethervault --query '[].[type,name,resourceGroup]' -o tsv
}

main() {
  need az; need terraform
  local cmd="${1:-}"; shift || true
  case "$cmd" in
    check) cmd_check ;;
    up) plan_apply false ;;
    verify) cmd_verify ;;
    enable-replication) plan_apply true ;;
    status) cmd_status ;;
    record) cmd_record ;;
    drill) cmd_drill ;;
    verify-drill) cmd_verify_drill "$@" ;;
    drill-cleanup) cmd_drill_cleanup ;;
    last-row) cmd_last_row ;;
    db-standby) cmd_db_standby ;;
    db-status) cmd_db_status ;;
    db-drill) cmd_db_drill ;;
    db-reseed) cmd_db_reseed ;;
    jobs) cmd_jobs ;;
    cost) cmd_cost ;;
    down) cmd_down ;;
    *) sed -n '2,30p' "$0"; exit 1 ;;
  esac
}

main "$@"
