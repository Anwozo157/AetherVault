#!/usr/bin/env bash
# 24-hour Azure evidence run: hourly lag samples (Site Recovery RPO and the PostgreSQL standby's
# replay delay), Site Recovery test-failover drills and database promote drills spread through
# the day, then the nightly auto-shutdown is switched back on.
# Usage: POC_APPROVE=yes scripts/poc/azure-lag-record.sh [hours]   (founder approval required)
# Output: $POC_PRIVATE_DIR/lag-record-<UTC start>.log (private; resource names only, no IDs).
set -uo pipefail
[[ ${POC_APPROVE:-} == yes ]] || { echo "Needs POC_APPROVE=yes (founder's OK)."; exit 1; }
cd "$(dirname "$0")/../.."
S=scripts/poc/azure-source.sh
HOURS="${1:-24}"
PRIV="${POC_PRIVATE_DIR:-$HOME/Developer/AegisCoreLabs-private/azure-poc}"
LOG="$PRIV/lag-record-$(date -u +%Y%m%dT%H%MZ).log"
ASR_DRILLS=" 2 8 14 20 "   # hours after start
DB_DRILLS=" 5 17 "
now() { python3 -c 'import datetime as d;print(d.datetime.now(d.timezone.utc).isoformat(timespec="milliseconds").replace("+00:00","Z"))'; }
log() { printf '%s %s\n' "$(now)" "$*" | tee -a "$LOG"; }
clean() { grep -v -E '^\[|^$|Enable succeeded|Request body'; }

sample() {
  log "SAMPLE asr $($S status 2>/dev/null | python3 -c 'import json,sys; t=sys.stdin.read(); d=json.loads(t[:t.rindex("}")+1]); print("health=%s rpo=%ss calc=%s heartbeat=%s tfo=%s" % (d["health"], d["rpoSeconds"], d["rpoCalculated"], d["heartbeat"], d["testFailover"]))' 2>&1)"
  log "SAMPLE db $($S db-status 2>&1 | clean | tr '\n' ' ')"
}

asr_drill() {
  log "ASR DRILL start"
  local out req
  out=$($S drill 2>&1); req=$(echo "$out" | awk '/^requested /{print $2}')
  [[ -n $req ]] || { log "ASR DRILL failed to start: $(echo "$out" | tail -2 | tr '\n' ' ')"; return; }
  log "ASR DRILL requested $req"
  for _ in $(seq 1 90); do
    sleep 20
    v=$($S verify-drill "$req" 2>&1)
    if echo "$v" | grep -q '^active' && echo "$v" | grep -qE '^[0-9]+\|'; then
      log "ASR DRILL db-ready newest-row-before-request=$(echo "$v" | grep -E '^[0-9]+\|')"; break
    fi
  done
  log "ASR DRILL job $($S jobs 2>/dev/null | sed -n 3p)"
  $S record >/dev/null 2>&1
  $S drill-cleanup >/dev/null 2>&1; log "ASR DRILL cleanup requested"
}

db_drill() {
  log "DB DRILL $($S db-drill 2>&1 | clean | tr '\n' ' ')"
  $S db-reseed >/dev/null 2>&1 && log "DB RESEED done" || log "DB RESEED FAILED (check db-status)"
}

log "START ${HOURS}h record (auto-shutdown off)"
start=$(date +%s)
for h in $(seq 0 $((HOURS - 1))); do
  sample
  [[ $ASR_DRILLS == *" $h "* ]] && asr_drill
  [[ $DB_DRILLS == *" $h "* ]] && db_drill
  next=$((start + (h + 1) * 3600)); wait_s=$((next - $(date +%s)))
  (( wait_s > 0 )) && sleep "$wait_s"
done
sample
log "END: switching the nightly auto-shutdown back on"
POC_AUTO_SHUTDOWN=2300 $S enable-replication 2>&1 | grep -E "Apply complete|Error" | while read -r l; do log "$l"; done
log "DONE"
