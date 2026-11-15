# Initial access, endpoint and vendor review: 2026-11-14

- **Control(s):** access review (CC6.2, CC6.3), MFA (CC6.1), endpoint baseline (CC6.8), vendor inventory (CC9.2)
- **Performed by:** Claude Code (Opus 5.5), read-only checks; to be signed off by the founder
- **Period covered:** state as of 2026-11-14

## What was checked

- **GitHub repository:** collaborators and their roles, deploy keys, Actions secrets, branch protection on
  `main` (`gh api`).
- **Supabase organization:** members, roles and MFA state; project status (Management API, read-only).
- **AWS proof-of-concept account:** IAM users and account MFA summary (`aws iam`, read-only).
- **Cloudflare:** API tokens in use and their scope (from the founder's records).
- **Work Mac:** disk encryption, automatic updates, OS version, screen lock, firewall, Gatekeeper,
  System Integrity Protection (local read-only commands; nothing changed).
- **Vendors:** inventory written (`docs/compliance/VENDORS.md`).

## Result

- **Good:** one GitHub collaborator (the founder, admin); no deploy keys; branch protection requires the
  5 CI/CodeQL checks and blocks force pushes and deletion; Supabase has one member (the founder, owner);
  disk encryption on; automatic macOS and security updates on; screen lock at 5 minutes; Gatekeeper and
  SIP on.
- **7 findings**, all founder actions (MFA gaps, device settings, leftover proof-of-concept access, a
  token to rotate). Specifics are tracked privately by the founder, not copied here.
- Admin bypass of branch protection remains on by design (single engineer; see change-management policy).

## Actions

| Action (generic)                                           | Owner   | Due        | Done |
| ---------------------------------------------------------- | ------- | ---------- | ---- |
| Close the MFA findings                                     | Founder | 2026-11-30 |      |
| Close the work-device findings                             | Founder | 2026-11-30 |      |
| Remove leftover proof-of-concept access when the test ends | Founder | POC end    |      |
| Rotate the token flagged for rotation                      | Founder | 2026-11-30 |      |
| Obtain vendor SOC 2 reports marked "Confirm" in VENDORS.md | Founder | 2027-01-31 |      |

## Sign-off

Reviewed by: [founder], [date]
