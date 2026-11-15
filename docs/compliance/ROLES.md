# Roles and Responsibilities

**Last reviewed:** 2026-11-14 · Review whenever someone joins or leaves, and yearly.

## Organization

Aegis Core Labs is one person today: the founder holds every role below. When people join, this
table changes first.

| Role                       | Held by                  | Responsibilities                                                                                                          |
| -------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| CEO / leadership oversight | Founder                  | Sets direction; approves policies, budget, exceptions; quarterly security review (stands in for a board until one exists) |
| Security officer           | Founder                  | Owns the policies, risk register, incident response, vendor reviews and the SOC 2 program                                 |
| Engineering                | Founder (with AI agents) | Builds and tests changes per the change-management policy; keeps CI green                                                 |
| Operations / on-call       | Founder                  | Watches backups, alerts and vendor status; first responder for incidents                                                  |
| Access administrator       | Founder                  | Grants and removes access; runs quarterly access reviews                                                                  |
| Customer support           | Founder                  | support@getaethervault.com; security@getaethervault.com for security reports                                              |
| Privacy / data contact     | Founder                  | Data requests and deletion; privacy notice                                                                                |

## Separation of duties

One person can't separate duties from themselves, so the compensating controls are: required CI checks
on `main`, the append-only audit log, dated review records, and (in the product) the two-person rule
for failover. First hire or advisor with security experience: make them the reviewer of access reviews
and policy changes.

## AI agents

Agents (Claude Code, Google Antigravity) act as engineering assistants under `AGENTS.md`. They do not
hold any role above; every outward-facing or irreversible action needs the founder's approval.
