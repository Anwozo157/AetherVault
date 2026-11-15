# Access Control Policy

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly

## Principles

- **Least privilege:** people and machines get only the access their job needs, for as long as
  they need it.
- **Unique identities:** no shared accounts; every action traces to a person or a named machine
  identity.
- **Strong authentication:** multi-factor authentication (MFA) on every company account that
  supports it. Hardware keys or authenticator apps preferred over SMS.

## Company systems (who can get in)

| System                                  | Who has access                                             | How it's granted / removed                            |
| --------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| GitHub repository                       | Founder (admin)                                            | Repository collaborators; branch protection on `main` |
| Supabase organization and project       | Founder (owner)                                            | Organization members                                  |
| Cloudflare (domain, DNS, email routing) | Founder                                                    | Account members; scoped API tokens with expiry        |
| AWS account                             | Founder; scoped automation users for proof-of-concept work | IAM / identity center; keys deleted after use         |
| Resend (sign-in email)                  | Founder                                                    | Account members                                       |
| Work Mac                                | Founder                                                    | Local account, FileVault                              |

The live list, with each account's MFA state, is checked in every quarterly access review.

## Product access (customers)

- Roles `viewer` < `operator` < `approver` < `admin`, enforced by row-level security and
  role-checked database functions (tested by pgTAP on every change).
- Customers manage their own users. Invites match the exact verified email; every join, role change
  and removal is written to the hash-chained audit log.
- Failover needs two different people (requester and approver), enforced by a database constraint.
- Aegis Core Labs staff have no standing access to customer organizations. Support access happens
  only at the customer's request, is time-limited, and is recorded.

## Joiners, movers, leavers

- **Joiner:** background check (once anyone besides the founder gets production access), policies
  read and acknowledged, training done, then accounts created with the minimum role. Record it.
- **Mover:** access changed to match the new role in the same week; old access removed.
- **Leaver:** all access removed on the last day (same day for involuntary exits): GitHub, Supabase,
  Cloudflare, AWS, Resend, email, password manager shares. Rotate any shared secret they could
  have seen. Record it.

## Machine identities and keys

- Secrets live in the macOS Keychain (local) or the platform's secret store (Supabase Vault,
  GitHub Actions secrets), never in git or plain files.
- API tokens are scoped to what they need and given an expiry where the platform allows.
- Automation users and keys created for a task are deleted when the task ends.
- Rotate on suspicion of exposure, when someone with access leaves, and as listed in
  `docs/SECURITY.md`.

## Reviews

**Quarterly access review** (`docs/compliance/CONTROL_CALENDAR.md`): list every account on every
system above, confirm each is still needed and has MFA, remove what isn't, and file a dated record in
`docs/reviews/`. Sensitive specifics (account IDs, personal emails, settings that are off) are kept
privately; the repository gets the generic record.

## Physical

No offices or servers. Physical security of hosting is inherited from our vendors (their SOC 2
reports; see `docs/compliance/VENDORS.md`). Work devices follow `acceptable-use.md`.
