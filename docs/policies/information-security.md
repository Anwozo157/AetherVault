# Information Security Policy

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly

## Purpose

Protect the confidentiality, integrity and availability of AetherVault and of the data customers
trust us with, and show that protection with evidence.

## Scope

All Aegis Core Labs people (founder, future staff, contractors), AI agents working in our
repositories, company accounts, the work computer(s), the AetherVault product (website, console,
database, collector), and the vendors that run parts of it.

## Commitments

1. **Leadership.** The founder is accountable for security and acts as security officer until a
   dedicated person is hired. Security is reviewed every quarter (`docs/compliance/CONTROL_CALENDAR.md`).
2. **Principles.** We follow the principles in `docs/SECURITY.md`: no secrets in code; enforce in
   the database, not the UI; assume history will be attacked; two people for dangerous actions;
   least privilege, least data.
3. **Policies.** This policy is supported by the policies listed in `docs/policies/README.md`.
   Each is approved by the founder, read by everyone with access, and reviewed yearly.
4. **Risk-based.** We keep a risk register (`docs/compliance/RISK_REGISTER.md`) and review it
   quarterly. New products, vendors and major changes get a risk check before launch.
5. **Honesty.** We describe our security accurately. Simulated data is labeled as simulated. We do
   not claim certifications, audits or controls we do not have.
6. **Evidence.** Controls produce records: CI runs, git history, audit log entries, and dated
   reviews in `docs/reviews/`.
7. **Competence.** Everyone with access completes security awareness training on joining and
   yearly (`docs/compliance/TRAINING.md`).
8. **Reporting.** Anyone can report a security issue to security@getaethervault.com or through
   GitHub private vulnerability reporting. We acknowledge within 3 business days.

## Roles

See `docs/compliance/ROLES.md`. Today one person (the founder) holds every company role; the
product itself separates duties (requester vs approver for failover).

## Related

All policies in `docs/policies/`; `docs/SECURITY.md`; `docs/SOC2_READINESS.md`.
