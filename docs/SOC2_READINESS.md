# SOC 2 Readiness Checklist

> Self-assessment, **not an audit and not a certification**. Only an independent CPA firm can
> issue a SOC 2 report. Do not describe AetherVault as "SOC 2 compliant", "SOC 2 ready" or
> "in SOC 2 audit" in pitch or sales copy until a report exists.
> Started: 2026-11-09. Updated: 2026-11-14 (policy set and records). Review at every phase change and at least quarterly, with `docs/SECURITY.md`.

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

| Control                                                        | Status | Evidence / gap                                                                                             |
| -------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| Code of conduct / acceptable-use policy, acknowledged by staff | 🟡     | Drafted: `docs/policies/acceptable-use.md`; awaiting founder approval and acknowledgement                  |
| Defined roles and responsibilities                             | ✅     | `docs/compliance/ROLES.md` (one person holds every role; compensating controls listed)                     |
| Background checks for people with production access            | ❌ 👤  | Not applicable until a second person gets production access; required by `access-control.md`               |
| Security awareness training (onboarding + yearly)              | 🟡     | Plan and record table: `docs/compliance/TRAINING.md`; no completion recorded yet                           |
| Board / leadership oversight of security                       | 🟡     | Quarterly security review note scheduled (`docs/compliance/CONTROL_CALENDAR.md`); first one due 2027-02-14 |

## CC2: Communication and information

| Control                                                          | Status | Evidence / gap                                                                                                              |
| ---------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------- |
| Security policies documented                                     | 🟡     | Full policy set drafted 2026-11-14 (`docs/policies/`); awaiting founder approval                                            |
| System description (what the product is, data flows, boundaries) | ✅     | Draft `docs/compliance/SYSTEM_DESCRIPTION.md` (DC 200 structure) + `docs/ARCHITECTURE.md` + data flow in `docs/SECURITY.md` |
| External way to report security issues                           | ✅     | GitHub private vulnerability reporting; `SECURITY.md`                                                                       |
| Customer-facing commitments (terms, SLA, privacy notice)         | 🟡 💰  | Drafts in `docs/legal/` (privacy notice, SLA); terms and DPA need counsel                                                   |

## CC3: Risk assessment

| Control                                 | Status | Evidence / gap                                                                                           |
| --------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| Documented threat model / risk register | ✅     | `docs/compliance/RISK_REGISTER.md` (likelihood, impact, owner, due) + threat model in `docs/SECURITY.md` |
| Risk assessment at least yearly         | ✅     | Method `docs/policies/risk-management.md`; initial assessment 2026-11-14; quarterly reviews scheduled    |
| Fraud risk considered                   | ✅     | Two-person approval for failover; append-only, hash-chained audit log                                    |

## CC4: Monitoring of controls

| Control                               | Status | Evidence / gap                                                                                                                 |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Automated checks on every change      | ✅     | CI: lint, types, tests, coverage, `npm audit`, E2E, CSP, pgTAP, CodeQL, gitleaks                                               |
| Periodic control reviews with records | 🟡     | Calendar `docs/compliance/CONTROL_CALENDAR.md`; records in `docs/reviews/` (first 2026-11-14); needs a full quarter of records |
| Penetration test                      | ❌ 💰  | Usually expected before or during Type II                                                                                      |

## CC5: Control activities (policies that drive the controls)

| Control                                     | Status | Evidence / gap                                                                              |
| ------------------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| Information security policy                 | 🟡     | Drafted: `docs/policies/information-security.md`; awaiting founder approval                 |
| Change management policy                    | 🟡     | Drafted: `docs/policies/change-management.md` (matches practice); awaiting founder approval |
| Separation of duties for production changes | 🟡     | Enforced in the product; for code, one person writes and deploys (see CC8)                  |

## CC6: Logical and physical access

| Control                                                   | Status | Evidence / gap                                                                                                                                                    |
| --------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Role-based access in the product                          | ✅     | Row-level security, role-checked database functions, pgTAP tests                                                                                                  |
| Least privilege for customer data                         | ✅     | RLS per organization; `service_role` key never in the browser                                                                                                     |
| MFA on every company account                              | 🟡 👤  | Checked 2026-11-14 (`docs/reviews/`); findings open, tracked privately                                                                                            |
| Joiner / leaver process (grant and remove access)         | 🟡     | Written in `docs/policies/access-control.md`; first use when someone joins                                                                                        |
| Quarterly access reviews                                  | 🟡     | First review 2026-11-14 (`docs/reviews/2026-11-14-initial-access-endpoint-review.md`); next 2027-02-14                                                            |
| Encryption in transit                                     | ✅     | HTTPS on GitHub Pages; TLS to Supabase                                                                                                                            |
| Encryption at rest                                        | ✅     | Inherited: Supabase AES-256 with per-project keys in FIPS 140-2 HSMs ([supabase.com/security](https://supabase.com/security)); confirm in Supabase's SOC 2 report |
| Endpoint security (disk encryption, screen lock, updates) | 🟡 👤  | Baseline in `acceptable-use.md`; checked 2026-11-14 (FileVault, updates, screen lock on); remaining findings tracked privately                                    |
| Physical security                                         | ✅     | No offices or servers; inherited from GitHub/Supabase/AWS (their SOC 2 reports)                                                                                   |

## CC7: System operations (detection and response)

| Control                             | Status | Evidence / gap                                                                                                                                           |
| ----------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vulnerability management            | ✅     | Dependabot, `npm audit`, CodeQL, GitHub secret scanning with push protection                                                                             |
| Logging of security-relevant events | ✅     | Product audit log (hash-chained, tamper detection tested end-to-end)                                                                                     |
| Monitoring and alerting             | 🟡     | Customer-facing Slack/PagerDuty alerts for failovers and drills (Phase 4.3), with a delivery log; uptime/error alerts for AetherVault itself once hosted |
| Incident response plan              | 🟡     | `docs/policies/incident-response.md` (severity, roles, steps, 72-hour notice); yearly tabletop not yet done                                              |
| Incident records                    | ✅     | `docs/incidents/` with template (no incidents so far)                                                                                                    |

## CC8: Change management

| Control                                                | Status | Evidence / gap                                                                                                                                                                                                   |
| ------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changes tracked and tested before release              | ✅     | Git history, Conventional Commits, CI on every push and PR, `CHANGELOG.md`                                                                                                                                       |
| Database changes versioned                             | ✅     | `supabase/migrations/` only; pgTAP tests in CI                                                                                                                                                                   |
| Protected main branch (required checks, no force push) | 🟡     | Enabled 2026-11-09: the 5 CI/CodeQL checks are required, force pushes and deletion blocked. Admins can still bypass (needed while one person merges locally); enforce for admins once there is a second engineer |
| Independent review of changes                          | ❌     | Hard with one engineer; auditors accept documented compensating controls for now                                                                                                                                 |
| Production deploy authorization                        | 🟡     | Founder-approved deploys (`AGENTS.md` rule 6); not technically enforced                                                                                                                                          |

## CC9: Risk mitigation (vendors, business disruption)

| Control                                                             | Status | Evidence / gap                                                                                                          |
| ------------------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| Vendor inventory with their SOC 2 reports                           | 🟡     | `docs/compliance/VENDORS.md`; vendor reports not yet obtained (Supabase's needs a Team plan or a request)               |
| Business continuity / disaster recovery plan for AetherVault itself | 🟡     | `docs/policies/business-continuity.md` (RTO/RPO per component, scenarios); full recovery drill not yet done             |
| Backups, tested restores                                            | 🟡 💰  | Weekly encrypted local backup; restore rehearsed 2026-11-12 (`docs/BACKUPS.md`); Supabase Pro for managed daily backups |

## A1: Availability (recommended scope for a DR product)

| Control                                | Status | Evidence / gap                                                                               |
| -------------------------------------- | ------ | -------------------------------------------------------------------------------------------- |
| Capacity and uptime commitments        | ❌     | Free Supabase projects pause after 7 idle days, which conflicts with any SLA                 |
| Recovery objectives defined and tested | 🟡     | Targets defined for AetherVault's own systems (`business-continuity.md`); full drill pending |
| Status page                            | ❌     | Free options exist; on the Phase 4 list                                                      |

## Free next steps (in order)

The full program (phases, exit criteria, budget, timeline) and a reusable agent prompt:
**`docs/SOC2_PROGRAM_PROMPT.md`**.

1. ✅ Branch protection on `main` (2026-11-09).
2. ✅ Policy set, risk register, vendor inventory, system description, roles, training plan, control
   calendar, incident and review templates, legal drafts, first access/endpoint review (2026-11-14).
3. 👤 Founder: approve and sign the policies (`docs/policies/README.md`); close the private findings from
   the 2026-11-14 review; take the training; write the sealed emergency-access document.
4. Run the control calendar for a full quarter (monthly checks, quarterly reviews, restore test).
5. With the founder's OK: free status page and uptime monitor; HTTP security headers via Cloudflare.
6. AetherVault's own recovery drill, kept as evidence.

## Needs funding (founder approves)

- Supabase Pro (backups, no pausing): see `docs/PHASE_3_PLAN.md`.
- Compliance automation platform (e.g. Vanta, Drata): collects evidence and gives auditor access.
- Penetration test.
- The audit itself: Type I first, then Type II after the observation window.

Pricing for these varies widely by vendor, company size and scope; get written quotes before deciding.
