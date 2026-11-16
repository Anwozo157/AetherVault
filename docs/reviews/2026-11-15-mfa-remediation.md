# MFA remediation: 2026-11-15

- **Control(s):** MFA on company accounts (CC6.1), endpoint baseline (CC6.8); follow-up to the
  [2026-11-14 initial access review](2026-11-14-initial-access-endpoint-review.md)
- **Performed by:** founder, with Claude Code checking each setting in the founder's browser
- **Period covered:** 2026-11-15

## What was checked

- Code host: two-factor settings page (authenticator/passkey methods present).
- Email and identity provider: 2-Step Verification page shows "on"; authenticator app added.
- DNS/CDN provider: two-factor page shows mobile (TOTP) authentication active.
- Database provider: account security page lists an authenticator factor and recovery codes.
- Work Mac: `fdesetup status` reports disk encryption on.

## Result

- 5 company accounts in scope; **MFA verified on 4** (code host, email/identity, DNS/CDN, database).
- **1 remaining:** blocked by a provider-side restriction on the account; raised with that
  provider's support. Specifics tracked privately, not copied here.
- Disk encryption (FileVault) verified on.
- Recovery codes for each account are stored by the founder in a password manager (not in this repo).

## Actions

| Action (generic)                                       | Owner   | Due          | Done       |
| ------------------------------------------------------ | ------- | ------------ | ---------- |
| Enable MFA on code host, email, DNS/CDN, database      | Founder | 2026-11-30   | 2026-11-15 |
| Enable MFA on the remaining account once unblocked     | Founder | 2026-11-30   |            |
| Put Acceptable use + Access control policies in effect | Founder | on the above |            |

## Sign-off

Reviewed by: founder, 2026-11-15
