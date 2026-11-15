# Outreach Drafts (SOC 2 program)

> Drafts for the founder to send from company email. **Not sent.** Fill the [brackets]; send each to
> at least three firms for the audit and pen test so quotes are comparable. Record replies and quotes
> in the Key decisions table of `docs/SOC2_PROGRAM_PROMPT.md`.

---

## 1. Supabase: access to their SOC 2 report

**To:** Supabase support (dashboard → Support) or sales · **Subject:** SOC 2 Type 2 report access for a Pro-plan customer

> Hello,
>
> We run AetherVault (project ref [ref], organization "Aegis Core Labs") on Supabase and are preparing
> for our own SOC 2 audit, where Supabase is a carved-out subservice organization. Our auditor will
> need Supabase's current SOC 2 Type 2 report (and a bridge letter if the period has ended).
>
> 1. Can a customer on the **Pro** plan obtain the report under NDA, or is it limited to Team and
>    Enterprise?
> 2. If Team is required, can the plan be upgraded temporarily, only for the audit period?
> 3. Is your ISO 27001 certificate or a SOC 3 summary available to Pro customers?
>
> Thank you,
> [Name], Founder, Aegis Core Labs · [phone]

---

## 2. SOC 2 auditor: request for quote

**To:** [3 licensed CPA firms with startup SOC 2 practices] · **Subject:** Request for quote: SOC 2 (Security + Availability) for an early-stage SaaS

> Hello,
>
> Aegis Core Labs is looking for a licensed CPA firm for a SOC 2 examination of AetherVault, a
> disaster-recovery command center (web app + managed PostgreSQL). Scope and facts:
>
> - **Trust Services Criteria:** Security and Availability.
> - **Report:** [Type II with a 3-month window starting about [month]] / [Type I as of [date], then Type II].
> - **Company:** one founder; no offices or owned servers; AI-assisted development.
> - **System:** static web app on GitHub Pages; Supabase (database, auth) in AWS us-east-1;
>   Cloudflare (DNS); Resend (email). Carve-out of Supabase, GitHub and Cloudflare.
> - **Controls in place:** written policy set, risk register, quarterly access reviews, CI with
>   security tests on every change, tested restores, incident response plan.
> - **Evidence:** in a git repository plus a private evidence repository; no compliance platform yet.
>
> Please include: fixed fee and what it covers, readiness assessment (if offered, separately), timeline
> to report, whether you work with or without a compliance platform, your AICPA peer review status,
> and renewal pricing.
>
> Thank you,
> [Name], Founder, Aegis Core Labs · [phone]

---

## 3. Penetration test: request for quote

**To:** [3 pen test firms] · **Subject:** Request for quote: web application + API penetration test (SOC 2)

> Hello,
>
> We need a penetration test of AetherVault for SOC 2 and customer due diligence.
>
> - **In scope:** web app at getaethervault.com (single-page app, signed-in console); its Supabase
>   API (PostgREST, Auth, Realtime) with row-level security and role-checked functions; the collector
>   ingest endpoint. Authenticated testing with accounts in each role (viewer, operator, approver,
>   admin) across two organizations (tenant isolation).
> - **Out of scope:** customers' AWS accounts; denial-of-service; social engineering.
> - **Environment:** [staging project with seeded data] or production during an agreed window.
> - **Deliverables:** report an auditor will accept (methodology, findings with severity, evidence),
>   executive summary, and **one retest** of fixed findings.
>
> Please include fixed price, dates, tester qualifications, and a sample report.
>
> Thank you,
> [Name], Founder, Aegis Core Labs · [phone]
