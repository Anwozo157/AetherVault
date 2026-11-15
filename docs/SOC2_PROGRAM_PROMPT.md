# SOC 2 Program Prompt

> Paste the prompt below into a new agent session (Claude Code, Antigravity, …) to continue the SOC 2
> program. It is also the plan of record: phases, exit criteria, budget and timeline.
> Created 2026-11-14 · v2 2026-11-14 (lessons learned, key decisions, current state).
> Update "Current state" and the phase table at the end of every session that moves the program.

## Current state (update every session)

- **Phase:** A done; **B** (founder basics) and **C** (operate the controls) in progress.
- **Checklist:** 17 controls in place, 21 partly, 5 not started (`docs/SOC2_READINESS.md`).
- **Waiting on the founder:** sign the policies; close the 7 private findings from the 2026-11-14
  review; training; emergency-access note; OK to create a status page/uptime monitor and a private
  evidence repository; funding decisions below.
- **Last session:** 2026-11-14 (prompt v2, first monthly control check).

---

## The prompt

```text
You are continuing the SOC 2 program for AetherVault (Aegis Core Labs), a disaster-recovery
command center. Goal: an independent, licensed CPA firm issues a SOC 2 report scoped to the
Security (common criteria CC1–CC9) and Availability (A1) Trust Services Criteria: Type I first
unless the founder decides to go straight to Type II (see "Key decisions").

Before doing anything, read in order:
  AGENTS.md → docs/STATUS.md → docs/SOC2_PROGRAM_PROMPT.md (current state, phases, decisions)
  → docs/SOC2_READINESS.md (control checklist) → docs/compliance/CONTROL_CALENDAR.md
  → docs/reviews/README.md (what ran last, what's due) → docs/policies/README.md.
Then ask the founder for the status of anything tracked privately (open findings, emergency-access
note, signed policies) before marking it done. You cannot see private evidence; never assume.

Hard rules (on top of AGENTS.md):
1. Honesty. Never write or say AetherVault is "SOC 2 compliant", "certified", "ready" or "in audit"
   until the matching report exists. Readiness is a self-assessment.
2. Evidence or it didn't happen. Every ✅ in SOC2_READINESS.md links to evidence: a file, a dated
   record in docs/reviews/, a CI run, or privately kept proof the founder confirms exists.
3. The repository is PUBLIC. Never commit account IDs, personal emails, secrets, unfixed
   vulnerabilities, or which security settings are off. Keep specifics private; commit a generic,
   dated note ("access review done; 3 founder actions open, tracked privately").
4. $0 until funded. Anything that costs money, creates an account or repository, signs a contract,
   deletes access, or changes a security setting on the founder's machine or accounts is a
   founder action: list it with steps, do not do it.
5. Policies are approved by the founder, not by agents. Agents draft; the founder signs the
   approval table in docs/policies/README.md. Changing an approved policy bumps its version and
   needs re-approval.
6. Read-only checks only. Gather evidence with read-only commands and APIs (gh api, Supabase
   Management API GET, aws ... list/get/describe, local `defaults read`, `fdesetup status`).
   Never print secrets; read tokens from the macOS Keychain inside the command.
7. Git hygiene (lessons learned): work on a branch; create any git worktree OUTSIDE the
   repository folder (e.g. ~/Developer/.worktrees/), because the test runner scans nested
   folders and fails; run `npm run verify` (plus `npm run db:test` for database changes)
   immediately before every commit, merge and push; never push or deploy without the
   founder's OK.

Each session:
1. Update "Current state" above if it is stale; find the first unfinished item in the phase table.
2. Do the agent-doable items (drafting, records, scripts, CI checks, read-only reviews).
3. Perform every recurring control due now (CONTROL_CALENDAR.md) and file a dated record in
   docs/reviews/ from the template. A missed control is a finding: record it, don't backfill dates.
4. Update SOC2_READINESS.md (statuses + evidence links), the phase table and "Current state",
   CHANGELOG.md and docs/STATUS.md.
5. End with a short list for the founder: decisions, actions (with steps), and costs (range +
   source). Never claim a founder action is done without their confirmation.
```

## Key decisions (record the founder's choice and date)

| Decision                             | Options                                                                                                                                                             | Recommendation                                                                                                                                                       | Choice |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Scope                                | Security only · Security + Availability · add Confidentiality                                                                                                       | **Security + Availability**: buyers of a DR product will ask about uptime. Add Confidentiality later if a customer requires it                                       |        |
| Type I first, or straight to Type II | Type I now, then Type II · skip Type I and start the Type II window once controls run                                                                               | Type I only if a buyer is waiting for a report; otherwise skip it and save its fee, start a 3-month Type II window when Phase C is solid                             |        |
| Supabase's SOC 2 report              | Ask Supabase whether a Pro customer can get it (NDA) · upgrade to Team ($599/month) · ask the auditor whether Supabase's public assurance is enough for a carve-out | Ask Supabase and the auditor first; Team only if both say it's required                                                                                              |        |
| Compliance platform                  | None (repo-based evidence) · Vanta / Drata / Secureframe / others                                                                                                   | Start without; reconsider when a second person joins or the auditor prefers one                                                                                      |        |
| Auditor                              | 3 written quotes for the same scope                                                                                                                                 | Licensed CPA firm with a clean AICPA peer review and startup SOC 2 experience; fixed fee; **not** the same firm that does readiness consulting for us (independence) |        |
| Private evidence store               | Private GitHub repository (free) · compliance platform · encrypted folder                                                                                           | Private GitHub repository `aethervault-evidence`, founder-owned, 2FA; needs the founder's OK to create                                                               |        |

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

| Item                                                       | Needed?                                                            | Range                                                                                                                                 |
| ---------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Supabase Pro                                               | **Yes** (backups, no idle pausing)                                 | $25/month = $300/yr                                                                                                                   |
| Supabase's SOC 2 report (subservice organization evidence) | **Likely**: auditors ask for each key vendor's report              | Supabase lists SOC 2 with the **Team** plan ($599/month + usage = ~$7,200/yr); ask Supabase and the auditor first (see Key decisions) |
| Company email (Google Workspace Business Starter)          | **Yes**: company-managed identity for the founder and future staff | ~$84/yr per user                                                                                                                      |
| Penetration test (web app + API + cloud)                   | **Yes** in practice; auditors and buyers expect it                 | ~$5,000–15,000 (cheap scan-only reports won't satisfy an auditor)                                                                     |
| Legal review: customer terms, privacy notice, DPA, SLA     | **Yes** before paying customers                                    | Get quotes; drafts in `docs/legal/` reduce the work                                                                                   |
| SOC 2 Type I audit (small licensed CPA firm)               | **Yes**                                                            | ~$5,000–25,000                                                                                                                        |
| SOC 2 Type II audit (small licensed CPA firm)              | **Yes** (what buyers want)                                         | ~$7,000–50,000; renewals often 60–80% of year one                                                                                     |
| Compliance platform (Vanta, Drata, Secureframe, …)         | Optional; saves time, many auditors partner with them              | ~$5,000–12,000/yr at startup tiers                                                                                                    |
| Background checks                                          | When anyone else gets production access                            | Small per-person fee                                                                                                                  |

**Lean path (no platform, small firm):** about **$12,000–25,000** in year one (Pro, pen test, Type I,
legal review), then the Type II fee. Add **~$7,200/yr** if Supabase's report requires the Team plan;
subtract the Type I fee if you go straight to Type II. **Typical path (with a platform):** about **$25,000–60,000** for
the first Type I + Type II cycle.

Sources: [Scrut: SOC 2 cost 2026](https://www.scrut.io/soc-2/cost-of-soc-2-audit) ·
[Drata: SOC 2 audit cost](https://drata.com/blog/soc-2-audit-cost) ·
[Agency: SOC 2 audit cost for startups](https://blog.getagency.com/articles/soc-2-audit-cost-for-startups) ·
[UnderDefense: compliance automation pricing](https://underdefense.com/blog/compliance-automation-pricing/) ·
[SecurityWall: SOC 2 pen test cost](https://securitywall.co/blog/soc-2-penetration-testing-cost-what-to-budget-and-what-affects-pricing) ·
[Supabase security page](https://supabase.com/security) ·
[Supabase pricing (Jetadmin, 2026)](https://www.jetadmin.io/blog/supabase-pricing-2026-guide-to-plans-limits-and-real-world-costs/).

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
