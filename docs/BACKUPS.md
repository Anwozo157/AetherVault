# Database backups

The hosted Supabase project is on the **Free plan**, which has no backups we can restore ourselves.
Until it moves to Pro (daily managed backups, kept 7 days), a daily job copies the database to the
founder's Mac (weekly until 2026-11-18). **Upgrade to Supabase Pro before a customer's real data goes in** (pilot checklist).

## What runs

- `scripts/backup-db.sh`, scheduled by launchd (`~/Library/LaunchAgents/com.aegiscorelabs.aethervault-backup.plist`,
  a copy of `scripts/com.aegiscorelabs.aethervault-backup.plist`): **daily at 10:00 local**; if the
  Mac is asleep then, it runs at the next wake.
- Output: `~/Backups/AetherVault/<UTC time>/roles.sql.gz, schema.sql.gz, data.sql.gz, cron.sql.gz`. The folder is
  readable only by the founder's account (700/600), outside iCloud-synced folders. The newest 14 are
  kept. Each dump is tried 3 times, 1 minute apart (the 2026-11-15 weekly run failed on a dropped
  connection). Before dumping, it waits up to 10 minutes for the database host to resolve, because
  right after the Mac wakes the network may not be back (runs on 2026-11-21 and 2026-11-22 failed that
  way). Log: `~/Backups/AetherVault/backup.log`. A failure shows a macOS notification.
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

**Recovery drill 2026-11-14** (backup `2026-11-12T135558Z` into a throwaway, empty local stack;
record in `docs/reviews/2026-11-14-recovery-drill.md`): about 2 minutes from empty stack to verified
restore; row counts identical to the backup; audit chain intact; both scheduled jobs present; 13
tables with row-level security, 6 policies, 59 functions, 5 triggers. **New lesson, now step 4:**
a new Supabase project's default privileges give `anon` and `authenticated` full rights on every
table and function, and restoring the dump doesn't remove them. After a restore, signed-out users
could run all 59 functions (production: 1) and signed-in users had insert/update/delete/truncate on
all 13 tables (production: select on 6). Row-level security and the functions' own role checks still
protected the data, but the restored system did not match production until step 4 re-applied the
exact grants.

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
# 4. permissions: drop the new project's default grants, re-apply production's exact ones from the dump.
{ echo 'BEGIN;'
  echo 'REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon, authenticated;'
  echo 'REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;'
  echo 'REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM PUBLIC, anon, authenticated;'
  grep -E '^(GRANT|REVOKE) ' /tmp/r/schema.sql | grep -E ' ON (TABLE|SEQUENCE|FUNCTION) "public"\.'
  echo 'COMMIT;'; } > /tmp/r/regrant.sql
docker run --rm -v /tmp/r:/b postgres:17 psql "<same connection string>" -v ON_ERROR_STOP=1 --file /b/regrant.sql
rm -rf /tmp/r
```

No `postgres:17` image? Run `psql` inside the stack's own database container instead
(`docker cp` the files in, then `docker exec <db container> psql "postgresql://postgres:postgres@127.0.0.1:5432/postgres" …`),
as the 2026-11-14 drill did.

Then check: row counts and `verify_audit_chain` (as a member) match the backup; `select * from cron.job`
lists both jobs and `cron.job_run_details` shows successes; **grants match production**: `authenticated`
has SELECT on exactly the tables the dump grants, `anon` can execute only the collector ingest function. Point `.env.production` at the new project,
redeploy, and set the auth settings again (`docs/CUSTOM_DOMAIN.md`: site URL, redirects, SMTP).
