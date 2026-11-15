# Aegis Core Labs Security Policies

These policies govern how Aegis Core Labs builds and runs AetherVault. They are written to be
short and true: each one describes what we actually do, or names the gap and the date we'll close it.
They map to the AICPA Trust Services Criteria for **Security** and **Availability** (see
`docs/SOC2_READINESS.md`).

**Status: draft v1.0 (2026-11-14), awaiting founder approval.** A policy takes effect when the
founder signs the approval table below.

| Policy                                                              | Covers (SOC 2)                      | Owner   |
| ------------------------------------------------------------------- | ----------------------------------- | ------- |
| [Information security](information-security.md)                     | CC1, CC2, CC5 (the umbrella policy) | Founder |
| [Acceptable use and code of conduct](acceptable-use.md)             | CC1.1, CC1.4, CC6.8                 | Founder |
| [Access control](access-control.md)                                 | CC6.1–CC6.8                         | Founder |
| [Change management](change-management.md)                           | CC8.1, CC5.3                        | Founder |
| [Incident response](incident-response.md)                           | CC7.3–CC7.5, CC2.3                  | Founder |
| [Vendor management](vendor-management.md)                           | CC9.2                               | Founder |
| [Business continuity and disaster recovery](business-continuity.md) | CC9.1, A1.2, A1.3                   | Founder |
| [Data management](data-management.md)                               | CC6.1, CC6.5, CC6.7, C1.1, C1.2     | Founder |
| [Risk management](risk-management.md)                               | CC3.1–CC3.4, CC4.1, CC9.1           | Founder |
| [AI use](ai-use.md) (draft, added with the legal prep work)         | CC1.4, CC2.2, CC6.1, C1.1           | Founder |

## Rules for these policies

- **Review:** at least once a year, and whenever the company, product or vendors change materially.
  Record each review as a dated note in `docs/reviews/`.
- **Exceptions:** any deviation is approved by the founder in writing (a dated note in
  `docs/reviews/`, with the reason, the compensating control and an end date).
- **Acknowledgement:** everyone with access to company systems reads these policies on joining
  and yearly, and records it in the table below.
- **Violations** can lead to removal of access and, for staff or contractors, ending the engagement.
- **Agents:** AI agents follow `AGENTS.md`, which applies these policies to agent work. Agents may
  draft policy changes; only the founder approves them.

## Approval

Approved by the founder on **2026-11-15** (recorded by Claude Code in-session on the founder's
instruction). Each in-effect policy is true as written on that date. Two policies that assert a present
fact (MFA on all company accounts; FileVault on) are **held** until that fact is confirmed; one is held
for counsel. Update the status and date when a held policy takes effect.

| Policy                   | Version | Status        | Date       | Note                                                                                                      |
| ------------------------ | ------- | ------------- | ---------- | --------------------------------------------------------------------------------------------------------- |
| Information security     | 1.0     | **In effect** | 2026-11-15 |                                                                                                           |
| Acceptable use           | 1.0     | **Held**      | —          | Takes effect once MFA on all company accounts **and** FileVault are confirmed on (Nov-14 review findings) |
| Access control           | 1.0     | **Held**      | —          | Same precondition: MFA on every company account                                                           |
| Change management        | 1.0     | **In effect** | 2026-11-15 |                                                                                                           |
| Incident response        | 1.0     | **In effect** | 2026-11-15 |                                                                                                           |
| Vendor management        | 1.0     | **In effect** | 2026-11-15 |                                                                                                           |
| Business continuity & DR | 1.0     | **In effect** | 2026-11-15 | Backup RPO stated honestly for the Free plan; improves on Supabase Pro                                    |
| Data management          | 1.0     | **In effect** | 2026-11-15 |                                                                                                           |
| Risk management          | 1.0     | **In effect** | 2026-11-15 |                                                                                                           |
| AI use                   | 1.0     | **Held**      | —          | Pending counsel (Kim Larsen) review                                                                       |

## Acknowledgements

| Name | Role | Date read | Version |
| ---- | ---- | --------- | ------- |
|      |      |           |         |
