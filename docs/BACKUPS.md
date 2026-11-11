# Database backups

The hosted Supabase project is on the **Free plan**, which has no backups we can restore ourselves.
Until it moves to Pro (daily managed backups, kept 7 days), a weekly job copies the database to the
founder's Mac. **Upgrade to Supabase Pro before a customer's real data goes in** (pilot checklist).

## What runs

- `scripts/backup-db.sh`, scheduled by launchd (`~/Library/LaunchAgents/com.aegiscorelabs.aethervault-backup.plist`,
  a copy of `scripts/com.aegiscorelabs.aethervault-backup.plist`): **Sundays 10:00 local**; if the
  Mac is asleep then, it runs at the next wake.
- Output: `~/Backups/AetherVault/<UTC time>/roles.sql.gz, schema.sql.gz, data.sql.gz`. The folder is
  readable only by the founder's account (700/600), outside iCloud-synced folders. The newest 8 are
  kept. Log: `~/Backups/AetherVault/backup.log`. A failure shows a macOS notification.
- Uses `supabase db dump` (needs Docker; the script starts Docker if needed and quits it after) with
  the database password from the Keychain. The data dump includes `auth` (users, sessions) and every
  `public` table; the script fails if `auth.users`, `orgs` or `audit_log` is missing.
- Contents are sensitive (emails, session tokens, audit trail). Vault secrets (alert webhooks) stay
  encrypted with Supabase's key and can't be read from the backup. Keep FileVault on.

Run by hand: `bash scripts/backup-db.sh`. Check the schedule:
`launchctl print gui/$(id -u)/com.aegiscorelabs.aethervault-backup | grep -E "state|last exit"`.
Remove it: `launchctl bootout gui/$(id -u)/com.aegiscorelabs.aethervault-backup` and delete the plist.

## Restore (into a new, empty Supabase project)

Not yet rehearsed. Do a practice restore into a throwaway project before relying on it.

```bash
gunzip -k ~/Backups/AetherVault/<time>/*.gz
# psql isn't installed on this Mac (Homebrew no longer ships Intel builds); run it from Docker:
docker run --rm -it -v ~/Backups/AetherVault/<time>:/b postgres:17 \
  psql "<new project's session-pooler connection string>" \
    --single-transaction --variable ON_ERROR_STOP=1 \
    --file /b/roles.sql --file /b/schema.sql \
    --command 'SET session_replication_role = replica' \
    --file /b/data.sql
```

Then point `.env.production` at the new project, redeploy, and set the auth settings again
(`docs/CUSTOM_DOMAIN.md`: site URL, redirects, SMTP).
