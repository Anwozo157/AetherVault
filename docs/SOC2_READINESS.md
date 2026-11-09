# SOC 2 Readiness Checklist

> Self-assessment, **not an audit and not a certification**. Only an independent CPA firm can
> issue a SOC 2 report. Do not describe AetherVault as "SOC 2 compliant", "SOC 2 ready" or
> "in SOC 2 audit" in pitch or sales copy until a report exists.
> Started: 2026-11-09. Review at every phase change and at least quarterly, with `docs/SECURITY.md`.

## What SOC 2 is, in short

- An auditor's report on how well a company's controls meet the AICPA **Trust Services Criteria**.
  **Security** (the "common criteria", CC1–CC9) is required; Availability, Confidentiality,
  Processing Integrity and Privacy are optional. For a disaster-recovery product, **Security +
  Availability** is the expected scope.
- **Type I:** controls are designed properly at one point in time. **Type II:** controls actually
  operated over an observation window (typically 3–12 months). Enterprise buyers usually ask for
  Type II.
- It covers the **company**, not only the code: people, policies, vendors, onboarding and
  offboarding, risk reviews. Much of it is evidence that things happen on a schedule.

## Legend

✅ in place, with evidence in the repo or on GitHub · 🟡 partly in place · ❌ not started ·
💰 needs funding · 👤 founder action

## CC1: Control environment (governance, people)

| Control                                                        | Status | Evidence / gap                                                                               |
| -------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| Code of conduct / acceptable-use policy, acknowledged by staff | ❌     | Write a short policy; each person signs on joining and yearly                                |
| Defined roles and responsibilities                             | 🟡     | Product roles defined (admin/approver/operator/viewer); company org chart and duties are not |
| Background checks for people with production access            | ❌ 👤  | Needed once anyone besides the founder has access                                            |
| Security awareness training (onboarding + yearly)              | ❌     | Free options exist; keep completion records                                                  |
| Board / leadership oversight of security                       | ❌ 👤  | A quarterly security review note is enough at this stage                                     |

## CC2: Communication and information

| Control                                                          | Status | Evidence / gap                                                                  |
| ---------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| Security policies documented                                     | 🟡     | `docs/SECURITY.md` (threat model, controls, runbooks); no formal policy set yet |
| System description (what the product is, data flows, boundaries) | 🟡     | `docs/ARCHITECTURE.md` + data-flow diagram in `docs/SECURITY.md`                |
| External way to report security issues                           | ✅     | GitHub private vulnerability reporting; `SECURITY.md`                           |
| Customer-facing commitments (terms, SLA, privacy notice)         | ❌     | Needed before the first paying customer                                         |

## CC3: Risk assessment

| Control                                 | Status | Evidence / gap                                                          |
| --------------------------------------- | ------ | ----------------------------------------------------------------------- |
| Documented threat model / risk register | 🟡     | Threat model in `docs/SECURITY.md`; add likelihood, impact, owner, date |
| Risk assessment at least yearly         | 🟡     | "Review quarterly" is written down; no dated review records yet         |
| Fraud risk considered                   | ✅     | Two-person approval for failover; append-only, hash-chained audit log   |

## CC4: Monitoring of controls

| Control                               | Status | Evidence / gap                                                                   |
| ------------------------------------- | ------ | -------------------------------------------------------------------------------- |
| Automated checks on every change      | ✅     | CI: lint, types, tests, coverage, `npm audit`, E2E, CSP, pgTAP, CodeQL, gitleaks |
| Periodic control reviews with records | ❌     | Quarterly review checklist + dated notes (e.g. `docs/reviews/`)                  |
| Penetration test                      | ❌ 💰  | Usually expected before or during Type II                                        |

## CC5: Control activities (policies that drive the controls)

| Control                                     | Status | Evidence / gap                                                                  |
| ------------------------------------------- | ------ | ------------------------------------------------------------------------------- |
| Information security policy                 | ❌     | Turn `docs/SECURITY.md` principles into a formal, approved policy               |
| Change management policy                    | 🟡     | Practice exists (`AGENTS.md`: branches, verify before commit, CI); not a policy |
| Separation of duties for production changes | 🟡     | Enforced in the product; for code, one person writes and deploys (see CC8)      |

## CC6: Logical and physical access

| Control                                                   | Status | Evidence / gap                                                                       |
| --------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| Role-based access in the product                          | ✅     | Row-level security, role-checked database functions, pgTAP tests                     |
| Least privilege for customer data                         | ✅     | RLS per organization; `service_role` key never in the browser                        |
| MFA on every company account                              | 🟡 👤  | GitHub 2FA on; verify every account in the `docs/SECURITY.md` inventory              |
| Joiner / leaver process (grant and remove access)         | 🟡     | In-product invites, role changes, removals are audited; no company-level process yet |
| Quarterly access reviews                                  | ❌     | Review GitHub, Supabase and (later) AWS access; keep a dated record                  |
| Encryption in transit                                     | ✅     | HTTPS on GitHub Pages; TLS to Supabase                                               |
| Encryption at rest                                        | ⏳     | Provided by hosted Supabase; confirm when the project exists (Phase 3.6)             |
| Endpoint security (disk encryption, screen lock, updates) | ❌ 👤  | Turn on FileVault, auto-updates and screen lock; record it                           |
| Physical security                                         | ✅     | No offices or servers; inherited from GitHub/Supabase/AWS (their SOC 2 reports)      |

## CC7: System operations (detection and response)

| Control                             | Status | Evidence / gap                                                                    |
| ----------------------------------- | ------ | --------------------------------------------------------------------------------- |
| Vulnerability management            | ✅     | Dependabot, `npm audit`, CodeQL, GitHub secret scanning with push protection      |
| Logging of security-relevant events | ✅     | Product audit log (hash-chained, tamper detection tested end-to-end)              |
| Monitoring and alerting             | ❌     | Uptime/error alerts once hosted; Slack/PagerDuty webhooks are on the Phase 4 list |
| Incident response plan              | 🟡     | Runbook in `docs/SECURITY.md`; needs severity levels, contacts and a yearly test  |
| Incident records                    | 🟡     | `docs/incidents/` named in the runbook; folder not created (no incidents so far)  |

## CC8: Change management

| Control                                                | Status | Evidence / gap                                                                      |
| ------------------------------------------------------ | ------ | ----------------------------------------------------------------------------------- |
| Changes tracked and tested before release              | ✅     | Git history, Conventional Commits, CI on every push and PR, `CHANGELOG.md`          |
| Database changes versioned                             | ✅     | `supabase/migrations/` only; pgTAP tests in CI                                      |
| Protected main branch (required checks, no force push) | ❌     | **`main` has no branch protection or ruleset (checked 2026-11-09).** Free to enable |
| Independent review of changes                          | ❌     | Hard with one engineer; auditors accept documented compensating controls for now    |
| Production deploy authorization                        | 🟡     | Founder-approved deploys (`AGENTS.md` rule 6); not technically enforced             |

## CC9: Risk mitigation (vendors, business disruption)

| Control                                                             | Status | Evidence / gap                                                                     |
| ------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------- |
| Vendor inventory with their SOC 2 reports                           | ❌     | List GitHub, Supabase, AWS (later); download each one's SOC 2 report yearly        |
| Business continuity / disaster recovery plan for AetherVault itself | ❌     | A DR company must show its own DR plan, tested (our drill reports can be evidence) |
| Backups, tested restores                                            | ❌ 💰  | Supabase free tier has no daily backups; Pro does                                  |

## A1: Availability (recommended scope for a DR product)

| Control                                | Status | Evidence / gap                                                                                    |
| -------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| Capacity and uptime commitments        | ❌     | Free Supabase projects pause after 7 idle days, which conflicts with any SLA                      |
| Recovery objectives defined and tested | 🟡     | Product supports RTO/RPO targets and drill evidence; not yet applied to AetherVault's own systems |
| Status page                            | ❌     | Free options exist; on the Phase 4 list                                                           |

## Free next steps (in order)

1. 👤 Enable branch protection on `main`: require CI and CodeQL to pass, block force pushes and deletion.
2. 👤 Turn on FileVault, auto-updates and screen lock on the work Mac; confirm 2FA on every account in the `docs/SECURITY.md` inventory.
3. Write the core policy set (short, plain language): information security, acceptable use, access control, change management, incident response, vendor management, business continuity.
4. Add a risk register (likelihood, impact, owner, review date) and a quarterly review checklist with dated records.
5. Vendor inventory, with a link to each vendor's SOC 2 report.
6. AetherVault's own DR plan, tested with a drill and kept as evidence.

## Needs funding (founder approves)

- Supabase Pro (backups, no pausing): see `docs/PHASE_3_PLAN.md`.
- Compliance automation platform (e.g. Vanta, Drata): collects evidence and gives auditor access.
- Penetration test.
- The audit itself: Type I first, then Type II after the observation window.

Pricing for these varies widely by vendor, company size and scope; get written quotes before deciding.
