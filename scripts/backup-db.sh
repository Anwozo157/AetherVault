#!/usr/bin/env bash
# Weekly backup of the hosted Supabase database to this Mac (free; until Supabase Pro adds
# managed daily backups). Run by launchd (scripts/com.aegiscorelabs.aethervault-backup.plist)
# or by hand: bash scripts/backup-db.sh
#
# Writes ~/Backups/AetherVault/<UTC timestamp>/{roles,schema,data}.sql.gz (folder 700, files 600),
# keeps the newest KEEP backups, and logs to ~/Backups/AetherVault/backup.log.
# Uses `supabase db dump`, which needs Docker: starts Docker if needed and quits it afterwards.
# The database password comes from the macOS Keychain; it is never written to disk.
# Restore: docs/BACKUPS.md.
set -euo pipefail

export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin:$HOME/.local/bin"
REPO="$HOME/Developer/AetherVault"
DEST_ROOT="$HOME/Backups/AetherVault"
KEEP="${KEEP:-8}"
STAMP="$(date -u +%Y-%m-%dT%H%M%SZ)"
DEST="$DEST_ROOT/$STAMP"
LOG="$DEST_ROOT/backup.log"

mkdir -p "$DEST_ROOT"
chmod 700 "$DEST_ROOT"
umask 077
exec >>"$LOG" 2>&1
echo "=== $STAMP backup start"

notify() { osascript -e "display notification \"$1\" with title \"AetherVault backup\"" >/dev/null 2>&1 || true; }
started_docker=0
cleanup() {
  if [[ $started_docker == 1 ]]; then osascript -e 'quit app "Docker"' >/dev/null 2>&1 || true; fi
}
fail() {
  echo "FAILED: $1"
  rm -rf "$DEST"
  notify "Backup FAILED: $1. See ~/Backups/AetherVault/backup.log"
  exit 1
}
trap cleanup EXIT
trap 'echo "FAILED at line $LINENO"; notify "Backup FAILED. See ~/Backups/AetherVault/backup.log"' ERR

if ! docker info >/dev/null 2>&1; then
  open -ga Docker || fail "could not start Docker"
  started_docker=1
  for _ in $(seq 1 60); do docker info >/dev/null 2>&1 && break; sleep 5; done
  docker info >/dev/null 2>&1 || fail "Docker did not start within 5 minutes"
fi

SUPABASE_DB_PASSWORD="$(security find-generic-password -s 'Supabase DB password (aethervault)' -a aethervault -w)" ||
  fail "database password not found in Keychain"
export SUPABASE_DB_PASSWORD

mkdir -p "$DEST"
cd "$REPO"
npx --no-install supabase db dump --linked --role-only -f "$DEST/roles.sql" || fail "roles dump"
npx --no-install supabase db dump --linked -f "$DEST/schema.sql" || fail "schema dump"
npx --no-install supabase db dump --linked --data-only --use-copy -f "$DEST/data.sql" || fail "data dump"

# Sanity check: the data dump must contain the core tables.
for t in '"auth"."users"' '"public"."orgs"' '"public"."audit_log"'; do
  grep -q "^COPY $t" "$DEST/data.sql" || fail "data dump is missing $t"
done
gzip -9f "$DEST"/*.sql
chmod 600 "$DEST"/*.gz

# Keep the newest $KEEP backups.
i=0
for old in $(ls -1d "$DEST_ROOT"/20*Z 2>/dev/null | sort -r); do
  i=$((i + 1))
  if ((i > KEEP)); then
    rm -rf "$old"
    echo "removed old backup $old"
  fi
done

echo "OK: $DEST ($(du -sh "$DEST" | cut -f1))"
