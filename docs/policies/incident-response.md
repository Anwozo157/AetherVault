# Incident Response Policy

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly,
with a tabletop exercise

## What counts as an incident

Any event that harms or could harm the confidentiality, integrity or availability of AetherVault or
customer data: a leaked secret, an account takeover, unauthorized access, data loss or corruption, a
lost work device, malware, an outage of the console, or a vulnerability being exploited.

## Severity

| Level    | Meaning                                                                                         | Examples                                                                                           | Response                                |
| -------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **SEV1** | Customer data exposed or altered, or the console unavailable during a customer's failover/drill | Database breach; audit chain broken by an attacker; console down in an outage                      | Immediately, all hands, until contained |
| **SEV2** | Real risk to customer data or service, not yet realized                                         | Secret leaked but unused; admin account phished and locked; console down outside customer activity | Same business day                       |
| **SEV3** | Limited or internal                                                                             | Secret pasted into a chat tool; lost device with FileVault on; failed backup                       | Within 2 business days                  |

## Roles

- **Incident lead:** the founder (until there are more people). Decides severity, coordinates,
  communicates.
- **Contacts:** security@getaethervault.com (monitored by the founder); vendors' support channels
  (Supabase, GitHub, Cloudflare, AWS) listed in `docs/compliance/VENDORS.md`.
- **Backup lead:** none yet (single-person company; see the risk register). The emergency access
  instructions in `business-continuity.md` say how a trusted person reaches the founder's accounts.

## Steps

1. **Detect and log.** Open `docs/incidents/YYYY-MM-DD-short-name.md` from the template and keep a
   timeline as you go (times in UTC).
2. **Contain.** Stop the damage: rotate secrets, revoke sessions and tokens, disable accounts, pause
   the collector token, take the console offline if needed. Runbooks: `docs/SECURITY.md`.
3. **Assess.** What was affected, since when, which customers. Use the audit log ("Verify chain"),
   Supabase logs, GitHub security log, Cloudflare and AWS CloudTrail logs.
4. **Eradicate and recover.** Fix the cause; restore from backup if data was lost (`docs/BACKUPS.md`);
   verify the audit chain.
5. **Notify.** If customer data may be affected, tell affected customers without undue delay and
   within **72 hours** of confirming it, with what we know, what we're doing and what they should do.
   Follow any stricter contract terms and applicable breach-notification laws (they vary by state and
   country; get legal advice for any real breach).
6. **Learn.** Within 5 business days of closing a SEV1/SEV2: write what happened, why, and what
   changes so it doesn't recur. Track follow-ups to done. Update the risk register.

## Testing

A tabletop exercise at least once a year (walk through a scenario such as "the database password
leaked" or "Supabase is down during a customer drill"), recorded in `docs/reviews/`.

## Vulnerability reports

Accepted at security@getaethervault.com and via GitHub private vulnerability reporting.
Acknowledged within 3 business days; triaged as incidents if exploited or exploitable.
