# Database backups

The hosted Supabase project is on the **Free plan**, which has no backups we can restore ourselves.
Until it moves to Pro (daily managed backups, kept 7 days), a weekly job copies the database to the
founder's Mac. **Upgrade to Supabase Pro before a customer's real data goes in** (pilot checklist).

## What runs

- `scripts/backup-db.sh`, scheduled by launchd (`~/Library/LaunchAgents/com.aegiscorelabs.aethervault-backup.plist`,
  a copy of `scripts/com.aegiscorelabs.aethervault-backup.plist`): **Sundays 10:00 local**; if the
  Mac is asleep then, it runs at the next wake.
- Output: `~/Backups/AetherVault/<UTC time>/roles.sql.gz, schema.sql.gz, data.sql.gz, cron.sql.gz`. The folder is
  readable only by the founder's account (700/600), outside iCloud-synced folders. The newest 8 are
  kept. Log: `~/Backups/AetherVault/backup.log`. A failure shows a macOS notification.
- Uses `supabase db dump` (needs Docker; the script starts Docker if needed and quits it after) with
  the database password from the Keychain. The data dump includes `auth` (users, sessions) and every
  `public` table; the script fails if `auth.users`, `orgs` or `audit_log` is missing. `supabase db dump`
  skips pg_cron's tables, so `cron.sql` saves the scheduled jobs (drill scheduler, alert sweeper) as
  `cron.schedule()` calls, read through the Management API with the CLI token from the Keychain.
- Contents are sensitive (emails, session tokens, audit trail). Vault secrets (alert webhooks) stay
  encrypted with Supabase's key and can't be read from the backup. Keep FileVault on.

Run by hand: `bash scripts/backup-db.sh`. Check the schedule:
`launchctl print gui/$(id -u)/com.aegiscorelabs.aethervault-backup | grep -E "state|last exit"`.
Remove it: `launchctl bootout gui/$(id -u)/com.aegiscorelabs.aethervault-backup` and delete the plist.

## Restore (into a new, empty Supabase project)

**Rehearsed 2026-11-12** (backup `2026-11-11T180600Z` into an empty local Supabase): restored with no
errors; users, organizations, memberships, failover runs and audit log identical to production (row
fingerprints matched); audit hash chain intact; 13 tables with row-level security, 6 policies, 59
functions and 5 triggers all present. Lessons, now built in:

- **Scheduled jobs were missing** from the dump, so drills and alerts would silently stop. Fixed:
  backups now include `cron.sql`; run it after the data (step 3).
- `roles.sql` contains `GRANT SET ON PARAMETER "log_min_messages" TO "supabase_realtime_admin"`,
  which only the platform admin may run. If it fails with "permission denied", delete that line
  and rerun (the whole restore is one transaction, so a failure leaves nothing half-applied).
- Hosted projects have Storage; a local stack with storage disabled needs the `storage.*` COPY
  blocks removed (we store no files).

```bash
B=~/Backups/AetherVault/<time>; mkdir -p /tmp/r && chmod 700 /tmp/r
for f in roles schema data cron; do gunzip -c "$B/$f.sql.gz" > /tmp/r/$f.sql; done
# psql isn't installed on this Mac (Homebrew no longer ships Intel builds); run it from Docker.
# 1-2. roles, schema and data in one transaction:
docker run --rm -v /tmp/r:/b postgres:17 psql "<new project's session-pooler connection string>" \
  --single-transaction --variable ON_ERROR_STOP=1 \
  --file /b/roles.sql --file /b/schema.sql \
  --command 'SET session_replication_role = replica' --file /b/data.sql
# 3. scheduled jobs:
docker run --rm -v /tmp/r:/b postgres:17 psql "<same connection string>" -v ON_ERROR_STOP=1 --file /b/cron.sql
rm -rf /tmp/r
```

Then check: row counts and `verify_audit_chain` (as a member) match the backup; `select * from cron.job`
lists both jobs and `cron.job_run_details` shows successes. Point `.env.production` at the new project,
redeploy, and set the auth settings again (`docs/CUSTOM_DOMAIN.md`: site URL, redirects, SMTP).
