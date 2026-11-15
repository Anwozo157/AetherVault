# SOC 2 Type I — Deep Dive & 30-Day Sprint

> Goal: be **audit-ready for a SOC 2 Type I this month**, so the only thing standing between us and a
> report is the auditor's fee and schedule. This is the aggressive plan the founder asked for
> (2026-11-15). It extends, and does not replace, `docs/SOC2_PROGRAM_PROMPT.md` (the full A–G program)
> and `docs/SOC2_READINESS.md` (the control checklist). Honest throughout: where a date depends on money
> or a third party, it says so.

## What SOC 2 Type I actually is

A licensed CPA firm examines, **as of a single date**, whether your security controls are **designed**
properly. (Type II is the harder one: it watches those controls **operate** over 3–12 months.) Type I is
a point-in-time design opinion — which is why it's the fastest, cheapest first report and the right
starting point for us.

- **Framework:** AICPA Trust Services Criteria. We scope **Security** (the mandatory "Common Criteria"
  CC1–CC9) plus **Availability** (A1). Not Confidentiality/Processing Integrity/Privacy for v1.
- **Not a certification; an attestation.** Only a licensed CPA firm can issue it. No tool, and no AI,
  can. Platforms (Vanta/Drata) and agents only prepare evidence.

## The honest timeline ("this month")

From 2026 research (vendor blogs, so directional): a first Type I runs **~4 weeks to ~6 months**, and
**readiness is where the time goes**. The auditor's own fieldwork, once you're ready, is ~2–6 weeks.

So "this month" breaks into two things we control and one we don't:

| Part                                                           | Who             | Can it happen this month?                                        |
| -------------------------------------------------------------- | --------------- | ---------------------------------------------------------------- |
| **Readiness** (policies signed, controls designed & evidenced) | Us + founder    | **Yes** — this is the sprint below                               |
| **Engage auditor + readiness assessment**                      | Founder (money) | **Yes, if funds land** — engagement letter can be signed in days |
| **Fieldwork → issued report**                                  | Auditor         | Partly — often spills a few weeks past month-end                 |

**Realistic:** fully readiness-done and auditor-engaged within ~30 days; **report issued ~4–8 weeks
after** the auditor starts. We make the slow part (readiness) disappear so the clock is only the
auditor's.

## Where we already are (don't re-do this)

Phase A is done: 11 signed-pending policies (`docs/policies/`), risk register, vendor inventory, system
description, roles, control calendar, incident/review templates. The security questionnaire, security
overview and trust pack are written. That is most of the design evidence an auditor asks for.

## The 30-day sprint

### Week 1 — Founder unblocks (only you can do these)

- [ ] **Sign the policies** (`docs/policies/README.md` approval table). An auditor needs management-approved, dated policies.
- [ ] **Close the 7 private findings** from the 2026-11-14 review (MFA everywhere, Mac disk encryption/lock, remove unused access). Record closure dates.
- [ ] **Take the security training**; save the completion record.
- [ ] **Company email** on a company domain (Google Workspace) so identity isn't a personal Gmail.
- [ ] Decide the **pilot access model** (trust pack `SHARED_RESPONSIBILITY.md`) so controls match reality.

### Week 1–2 — Agent does (free; evidence generation)

- [ ] Run the **Security Test Agent** sweep (`docs/security/SECURITY_TEST_AGENT.md`): SAST, secrets, deps, IaC, **Prowler** on our AWS, ZAP on the app. Fix findings. → evidence for CC6/CC7.
- [ ] Stand up a **free status page + uptime monitor** (needs founder OK to create the accounts) → Availability (A1) evidence.
- [ ] Run **AetherVault's own DR drill** and save the evidence report → A1 / business-continuity evidence.
- [ ] Produce the **control-to-evidence matrix** below and fill every row with a real artifact link.

### Week 2–3 — Auditor track (founder + money)

- [ ] Email **3 small licensed CPA firms** for Type I quotes, same scope (drafts in `docs/compliance/OUTREACH_DRAFTS.md`). Ask each: _do you accept our automated testing + fixes for Type I, or require a human pen test?_ and _do you need our sub-processors' (Supabase, AWS) own SOC 2 reports?_
- [ ] Pick a firm; sign the engagement letter. Optional cheap **readiness assessment** first.
- [ ] Ask **Kim** to quote the legal review of customer terms/privacy/DPA (parallel, not a Type I blocker).

### Week 3–4 — Fieldwork prep

- [ ] Give the auditor the evidence matrix + artifacts.
- [ ] Fix any design gaps the auditor flags (fast, because controls already exist).
- [ ] Set the "as-of" date for the Type I.

## Control → evidence matrix (fill every row before fieldwork)

| CC        | Control                          | Evidence we point to                                                 | Status                      |
| --------- | -------------------------------- | -------------------------------------------------------------------- | --------------------------- |
| CC1       | Governance, roles, policies      | `docs/policies/` (signed), `docs/compliance/ROLES.md`                | Policies pending signature  |
| CC2       | Security communication           | Policies distributed; trust pack; security@ contact                  | Ready                       |
| CC3       | Risk assessment                  | `docs/compliance/RISK_REGISTER.md`                                   | Ready                       |
| CC4       | Monitoring of controls           | Control calendar + dated `docs/reviews/` records                     | Needs ≥1 real cycle         |
| CC5       | Control activities               | This matrix + change-mgmt policy                                     | In progress                 |
| CC6.1–6.3 | Logical access (RLS, roles, MFA) | pgTAP RLS tests, access-control policy, MFA screenshots              | Partial (MFA = founder)     |
| CC6.6     | Boundary protection              | CSP, HTTPS, collector read-only design                               | Ready                       |
| CC6.7     | Data in transit/at rest          | TLS, provider AES-256, Vault for secrets                             | Ready                       |
| CC7.1     | Vulnerability management         | Dependabot, CodeQL, secret scanning, **Security Test Agent** reports | Agent run pending           |
| CC7.2–7.4 | Incident detection & response    | Incident policy, audit log, alerting                                 | Ready (exercise pending)    |
| CC8.1     | Change management                | Branch + required CI checks + founder-approved deploy                | Ready                       |
| CC9       | Risk mitigation / vendors        | `docs/compliance/VENDORS.md`, sub-processor reports                  | Partial (vendor reports)    |
| A1.1–1.3  | Availability, backups, DR        | `docs/BACKUPS.md`, status page, our own DR drill                     | Status page + drill pending |

## The money (from the program budget; get written quotes)

| Item                                                                  | Needed for Type I?                                                                                             | Rough cost                 |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Type I audit (small CPA firm)                                         | Yes                                                                                                            | ~$5,000–25,000             |
| Supabase Pro (real backups)                                           | Strongly                                                                                                       | $300/yr                    |
| Company email (Workspace)                                             | Yes                                                                                                            | ~$84/yr                    |
| Penetration test                                                      | **Not mandatory for Type I**; auditor may want evidence of vuln mgmt (our agent covers this). Confirm per firm | ~$5,000–15,000 if required |
| Legal review (terms/privacy/DPA)                                      | Before paid customers, not a Type I blocker                                                                    | Kim's quote                |
| Supabase Team plan (only if auditor requires Supabase's SOC 2 report) | Maybe                                                                                                          | ~$7,200/yr                 |

**Lean Type I this cycle: roughly $5,000–25,000** (audit + Pro + email), pen test only if a chosen
auditor insists. That is the cheapest credible path to a report in a buyer's hands.

## The pen-test question, settled

- SOC 2 **Type I does not require** a penetration test. It requires a **vulnerability-management
  process** (CC7.1) — which our Security Test Agent + CI (CodeQL, Dependabot, secret scanning) provide,
  with fixes logged.
- A fully **AI/automated-only** pen test generally **won't** be accepted as the independent test,
  especially for Type II. So: use the agent now to find/fix and build CC7.1 evidence; budget a **human**
  test later for Type II. Ask each auditor in writing what they'll accept for Type I.

## Sources (2026, mostly vendor blogs — directional, confirm with the auditor)

- [State of SOC 2 for Startups 2026](https://simpleaudit.io/research/state-of-soc2-2026)
- [SOC 2 Type 1 cost & timeline, 14 engagements](https://atlantsecurity.com/blog/soc-2-type-1-timeline-cost-startup-2026)
- [Drata: Type 1 vs Type 2](https://drata.com/learn/soc-2/type-1-vs-type-2)
- [Does SOC 2 require penetration testing? (Agency)](https://blog.getagency.com/articles/does-soc-2-require-penetration-testing)
- [Can SOC 2 accept an AI-conducted pentest? (Ostorlab)](https://blog.ostorlab.co/can-soc2-accept-ai-conducted-penetration-test-report.html)
- Prior budget sources: see `docs/SOC2_PROGRAM_PROMPT.md`.
