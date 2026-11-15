# SOC 2 Status Letter (template)

> DRAFT for review by counsel. Template for the founder to sign and send during a customer's security
> review. Every bracketed item must be filled with something true; delete any sentence you can't stand
> behind. Never send it with a date you aren't confident of. Source of the plan:
> `docs/SOC2_PROGRAM_PROMPT.md` (phases A–G). Created 2026-11-15.
>
> Not a "bridge letter": that term means a letter covering the gap after an existing SOC 2 report ends.
> We have no report yet, so this is a status letter.

---

[Date]

To: [Customer name], [Security / procurement contact]

Re: AetherVault SOC 2 status

Aegis Core Labs, the company behind AetherVault, does **not yet have a SOC 2 report**. This letter sets
out where our program stands and what we commit to.

**Scope.** Our SOC 2 program covers the AetherVault service (web console, database, sign-in and audit
log) against the AICPA Trust Services Criteria for **Security** and **Availability**.

**Done.**

- Written security policies covering information security, acceptable use, access control, change
  management, incident response, vendor management, business continuity, data management, risk
  management and AI use[, approved on [date]].
- A risk register, vendor inventory, system description and a control calendar that we operate and
  record.
- Automated checks required on every change: unit, database-security and browser tests, static
  analysis, dependency auditing and secret scanning.

**Next.**

| Milestone                                             | Target date |
| ----------------------------------------------------- | ----------- |
| [Independent penetration test of the web app and API] | [date]      |
| [Engage a licensed CPA firm for the SOC 2 audit]      | [date]      |
| [SOC 2 Type I report issued]                          | [date]      |
| [SOC 2 Type II observation window starts]             | [date]      |
| [SOC 2 Type II report issued]                         | [date]      |

**Until then.** We will answer your security questionnaire in full, share our policies under NDA, and
walk your team through the architecture. Replication runs with AWS Elastic Disaster Recovery in your own
AWS account; disk data never passes through AetherVault and we hold no credentials in your account
(details attached: "What leaves your AWS account").

**Our commitment.** We will tell you promptly if any target date above moves, and share the report
under NDA once it is issued.

[Name]
[Title], Aegis Core Labs
[security@getaethervault.com]
