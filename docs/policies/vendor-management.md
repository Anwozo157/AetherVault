# Vendor Management Policy

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly

## Scope

Any third party that stores, processes or can affect AetherVault or customer data, including hosting,
email, DNS, source control, CI, AI coding assistants and software dependencies.

## Rules

1. **Inventory.** Every vendor is listed in `docs/compliance/VENDORS.md` with what it does, what
   data it touches, criticality, and its security assurance (SOC 2 report, ISO 27001, or equivalent).
2. **Before adding a vendor:** check it is needed (AGENTS.md rule 1: $0 until funded, founder
   approves any spend), what data it would see, its security reports, its terms/DPA, and how we'd
   leave. Prefer vendors with a SOC 2 Type II report for anything critical. Record the decision.
3. **Yearly review:** for each critical vendor, obtain or confirm its current SOC 2 report (or
   equivalent), read the "complementary user entity controls" section, and make sure we do our part.
   Record it in `docs/reviews/`.
4. **Least data.** Give vendors only the data and access they need; scoped API tokens with expiry.
5. **Offboarding.** When we stop using a vendor: delete our data there, revoke tokens and accounts,
   update the inventory.
6. **Dependencies.** Open-source packages are vendors too: lockfile committed, `npm audit` and
   Dependabot on, CodeQL scanning, new packages checked for maintenance and license before adding.

## Customer-configured destinations

Customers can send alerts to their own Slack or PagerDuty. Those are the customer's vendors, chosen
and configured by the customer; we store their webhook secrets encrypted (Supabase Vault).
