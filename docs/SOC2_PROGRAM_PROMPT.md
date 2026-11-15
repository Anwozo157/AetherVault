# SOC 2 Program Prompt

> Paste the prompt below into a new agent session (Claude Code, Antigravity, …) to continue the SOC 2
> program. It is also the plan of record: phases, exit criteria, budget and timeline.
> Created 2026-11-14. Update the phase table at the end of every session that moves the program.

---

## The prompt

```text
You are continuing the SOC 2 program for AetherVault (Aegis Core Labs), a disaster-recovery
command center. Goal: an independent CPA firm issues a SOC 2 Type I report, then a Type II report,
scoped to the Security (common criteria CC1–CC9) and Availability (A1) Trust Services Criteria.

Before doing anything, read in order:
  AGENTS.md → docs/STATUS.md → docs/SOC2_PROGRAM_PROMPT.md (this file: the phase table)
  → docs/SOC2_READINESS.md (the control checklist) → docs/compliance/CONTROL_CALENDAR.md
  → docs/policies/README.md.

Hard rules (on top of AGENTS.md):
1. Honesty. Never write or say that AetherVault is "SOC 2 compliant", "SOC 2 certified",
   "SOC 2 ready" or "in audit" until the matching report exists. Readiness is a self-assessment.
2. Evidence or it didn't happen. Every control marked ✅ in SOC2_READINESS.md links to evidence:
   a file, a dated record in docs/reviews/, a CI run, or a setting screenshot kept privately.
3. The repository is PUBLIC. Never commit account IDs, personal emails, secrets, open
   vulnerabilities, or which security settings are currently off. Record those findings
   privately (founder's password manager / private evidence store) and commit only a generic,
   dated note ("access review done; 3 founder actions open, tracked privately").
4. $0 until funded. Anything that costs money, creates an account, signs a contract, or changes
   a security setting on the founder's machine or accounts is a founder action: list it, do not
   do it.
5. Policies are approved by the founder, not by agents. Agents draft and update; the founder
   signs the approval table in docs/policies/README.md.

Each session:
1. Find the current phase in the table below and its first unfinished item.
2. Do the agent-doable items (drafting, records, scripts, CI checks, reviews of repo/CI state).
3. For recurring controls due now (CONTROL_CALENDAR.md), perform them and file a dated record
   in docs/reviews/ using the template there.
4. Update SOC2_READINESS.md statuses with links to the new evidence, the phase table here,
   CHANGELOG.md and docs/STATUS.md.
5. End with a short list for the founder: decisions, actions, and costs, each with a price range
   and a source.
```

---

## Phases and exit criteria

| Phase                       | What                                                                                                                                                                                                                                                               | Who                | Exit criteria                                                                                | Status                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------ |
| **A. Free readiness**       | Policy set, risk register, vendor inventory, system description, roles, training plan, control calendar, incident and review templates, first access and endpoint review                                                                                           | Agent              | All drafted and committed                                                                    | ✅ Done 2026-11-14                   |
| **B. Founder basics**       | Approve and sign policies; fix private findings from the first review (MFA, Mac settings, unused access); take the security training; set up company email                                                                                                         | Founder            | Approval table signed; review findings closed; training recorded                             | ⏳ Next                              |
| **C. Operate the controls** | Run the control calendar for real: weekly backup checks, monthly triage, quarterly access/risk/restore reviews, yearly tabletop. Free status page + uptime monitor (needs the founder's OK to create the accounts/repo). AetherVault's own DR drill, with evidence | Agent + founder    | At least one full quarter of dated records in `docs/reviews/`                                | 🟡 Started (first review 2026-11-14) |
| **D. Funded prerequisites** | Supabase Pro (backups, no pausing); Supabase's own SOC 2 report (see budget); legal review of terms, privacy notice, DPA; penetration test with a retest of findings                                                                                               | Founder (money)    | Pro active, restore tested on it; signed customer terms; pen test report with findings fixed | ❌ Needs funding                     |
| **E. Type I audit**         | Pick a licensed CPA firm (get 3 quotes for the same scope); optional readiness assessment; auditor tests control design on one date                                                                                                                                | Founder + auditor  | SOC 2 Type I report issued                                                                   | ❌                                   |
| **F. Type II audit**        | Observation window (3 months minimum for a first report, often 6–12); keep every recurring control on schedule; auditor samples evidence across the window                                                                                                         | Everyone + auditor | SOC 2 Type II report issued                                                                  | ❌                                   |
| **G. Maintain**             | Yearly Type II renewal, yearly pen test, yearly policy review                                                                                                                                                                                                      | Everyone           | Continuous                                                                                   | ❌                                   |

**Realistic timeline from today (2026-11-14), if funded promptly:** B in 1–2 weeks → D in 2–6 weeks →
Type I report about 2–3 months out → Type II report about 6–9 months out (3-month window) or later
with a longer window. Enterprise buyers usually ask for Type II; a Type I plus a bridge letter or
security questionnaire often carries a first pilot.

## Budget (founder decisions)

Ranges from vendor and consultancy sources (they have a stake in the answer); get written quotes.

| Item                                                       | Needed?                                                            | Range                                                                                                                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supabase Pro                                               | **Yes** (backups, no idle pausing)                                 | $25/month = $300/yr                                                                                                                                                         |
| Supabase's SOC 2 report (subservice organization evidence) | **Likely**: auditors ask for each key vendor's report              | Supabase shares it with **Team and Enterprise** plans only; ask Supabase first whether Pro customers can get it under NDA. Team was ~$599/month when last checked (confirm) |
| Company email (Google Workspace Business Starter)          | **Yes**: company-managed identity for the founder and future staff | ~$84/yr per user                                                                                                                                                            |
| Penetration test (web app + API + cloud)                   | **Yes** in practice; auditors and buyers expect it                 | ~$5,000–15,000 (cheap scan-only reports won't satisfy an auditor)                                                                                                           |
| Legal review: customer terms, privacy notice, DPA, SLA     | **Yes** before paying customers                                    | Get quotes; drafts in `docs/legal/` reduce the work                                                                                                                         |
| SOC 2 Type I audit (small licensed CPA firm)               | **Yes**                                                            | ~$5,000–25,000                                                                                                                                                              |
| SOC 2 Type II audit (small licensed CPA firm)              | **Yes** (what buyers want)                                         | ~$7,000–50,000; renewals often 60–80% of year one                                                                                                                           |
| Compliance platform (Vanta, Drata, Secureframe, …)         | Optional; saves time, many auditors partner with them              | ~$5,000–12,000/yr at startup tiers                                                                                                                                          |
| Background checks                                          | When anyone else gets production access                            | Small per-person fee                                                                                                                                                        |

**Lean path (no platform, small firm):** about **$12,000–25,000** in year one (Pro, pen test, Type I,
legal review), then the Type II fee. **Typical path (with a platform):** about **$25,000–60,000** for
the first Type I + Type II cycle.

Sources: [Scrut: SOC 2 cost 2026](https://www.scrut.io/soc-2/cost-of-soc-2-audit) ·
[Drata: SOC 2 audit cost](https://drata.com/blog/soc-2-audit-cost) ·
[Agency: SOC 2 audit cost for startups](https://blog.getagency.com/articles/soc-2-audit-cost-for-startups) ·
[UnderDefense: compliance automation pricing](https://underdefense.com/blog/compliance-automation-pricing/) ·
[SecurityWall: SOC 2 pen test cost](https://securitywall.co/blog/soc-2-penetration-testing-cost-what-to-budget-and-what-affects-pricing) ·
[Supabase security page](https://supabase.com/security).

## Where things live

| What                                          | File                                                       |
| --------------------------------------------- | ---------------------------------------------------------- |
| Control checklist (self-assessment)           | `docs/SOC2_READINESS.md`                                   |
| Policies + approval table                     | `docs/policies/`                                           |
| Risk register                                 | `docs/compliance/RISK_REGISTER.md`                         |
| Vendors and their reports                     | `docs/compliance/VENDORS.md`                               |
| System description (the auditor's Section 3)  | `docs/compliance/SYSTEM_DESCRIPTION.md`                    |
| Roles and responsibilities                    | `docs/compliance/ROLES.md`                                 |
| Training plan and records                     | `docs/compliance/TRAINING.md`                              |
| What runs when                                | `docs/compliance/CONTROL_CALENDAR.md`                      |
| Dated review records                          | `docs/reviews/`                                            |
| Incidents                                     | `docs/incidents/`                                          |
| Customer-facing drafts (need legal review)    | `docs/legal/`                                              |
| Threat model, credentials, technical controls | `docs/SECURITY.md`; backups and restore: `docs/BACKUPS.md` |

**Recommendation:** once there's a second person or an auditor, move sensitive evidence
(screenshots, access lists, findings) to a **private** repository or the compliance platform. This
repository is public.
