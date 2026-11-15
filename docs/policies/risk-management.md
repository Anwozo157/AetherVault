# Risk Management Policy

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly

## Method

1. **Identify** risks to customers, the service and the company: security threats (`docs/SECURITY.md`
   threat model), availability, vendors, people, legal, fraud and money.
2. **Rate** each risk before controls (inherent) and after (residual) on two 1–5 scales:
   **likelihood** (1 rare … 5 almost certain within a year) and **impact** (1 negligible … 5 severe:
   customer data exposed, extended outage, or company-ending). **Score = likelihood × impact.**
3. **Treat:** reduce (add a control), transfer (insurance, contracts), avoid (stop doing it), or accept.
   Residual scores of **12 or more** need a treatment plan with an owner and a date; accepting them
   needs the founder's written sign-off.
4. **Record** everything in `docs/compliance/RISK_REGISTER.md`.

## When

- **Quarterly:** review the register (scores, overdue treatments, new risks) and file a dated note.
- **Yearly:** full risk assessment, including fraud risk and changes in the business, vendors and
  threats.
- **On change:** new product feature with security impact, new vendor, new market, a real incident.

## Monitoring of controls

Automated checks run on every change (CI). Manual controls run on the schedule in
`docs/compliance/CONTROL_CALENDAR.md`; missed or failed controls are logged as findings in the next
review and tracked to closure.
