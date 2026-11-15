# Recovery drill (AetherVault's own database): 2026-11-14

- **Control(s):** backups and tested restores (CC9.1, A1.2), recovery objectives tested (A1.3),
  business continuity plan test (`docs/policies/business-continuity.md`)
- **Performed by:** Claude Code (Opus 5.5); to be signed off by the founder
- **Scenario:** production database lost; restore the latest backup into a brand-new, empty project

## What was done

1. Started a throwaway, empty local Supabase stack (separate project, separate data volumes): 36 s.
2. Restored backup `2026-11-12T135558Z` (roles, schema, data in one transaction; then scheduled jobs)
   following `docs/BACKUPS.md`: no errors.
3. Checked the result against the backup: row counts for every table, audit hash chain (as an
   organization member), scheduled jobs, row-level security, policies, functions, triggers, grants.
4. Deleted the stack, its data volumes and every decrypted copy of the backup.

Only counts and pass/fail results were printed; no customer data was displayed.

## Result

| Check                                                     | Result                                                |
| --------------------------------------------------------- | ----------------------------------------------------- |
| Time, empty stack to verified restore                     | **About 2 minutes** (database RTO target: 8 hours)    |
| Row counts (users, orgs, memberships, runs, audit log, …) | Identical to the backup                               |
| Audit hash chain                                          | Intact                                                |
| Scheduled jobs (drill scheduler, alert sweeper)           | Both present                                          |
| Row-level security / policies / functions / triggers      | 13 / 6 / 59 / 5, as in production                     |
| **Grants (who may do what)**                              | **Did not match production until fixed**; see finding |

**Finding (fixed in the procedure the same day):** a new project's default privileges gave signed-out
and signed-in users far broader table and function rights than production has, and restoring the dump
didn't remove them. Data stayed protected by row-level security and the functions' own role checks,
but the restored system was not identical. `docs/BACKUPS.md` now has step 4, which revokes the
defaults and re-applies production's exact grants; re-running the checks after step 4 matched
production (signed-in: read on 6 tables, 42 functions; signed-out: 1 function).

**Not covered by this drill** (do in the yearly full drill): creating a new hosted project, pointing the
app at it, redeploying, and re-entering the auth settings. That's most of the 8-hour RTO budget.

## Actions

| Action                                                     | Owner           | Due        | Done       |
| ---------------------------------------------------------- | --------------- | ---------- | ---------- |
| Add the grants step to the restore procedure               | Agent           | 2026-11-14 | 2026-11-14 |
| Full hosted recovery drill (new project + redeploy), timed | Founder + agent | 2027-02-14 |            |

## Sign-off

Reviewed by: [founder], [date]
