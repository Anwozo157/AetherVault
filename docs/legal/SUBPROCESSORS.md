# Sub-processors (customer-facing list)

> DRAFT for review by counsel. Not legal advice. Not in effect. Checked 2026-11-14 (task T4 in
> `docs/LEGAL_PREP_PROMPT.md`). Internal vendor details and assurance status: `docs/compliance/VENDORS.md`.
> Data categories: `DATA_INVENTORY.md`. Once published, the DPA should promise notice before changes.

Companies that process customer personal data on our behalf to run AetherVault:

| Sub-processor    | Purpose                                              | Data                                                            | Location            | Their DPA                                                                                     | Their sub-processors                                                                                  | Public assurance                                                                           |
| ---------------- | ---------------------------------------------------- | --------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Supabase, Inc.   | Database, sign-in, scheduled jobs, encrypted secrets | All customer data in `DATA_INVENTORY.md`                        | USA (AWS us-east-1) | [supabase.com/legal/dpa](https://supabase.com/legal/dpa): part of its Terms of Service        | [supabase.com/legal/subprocessors](https://supabase.com/legal/subprocessors)                          | SOC 2 Type 2 ([security](https://supabase.com/security)); report for Team/Enterprise plans |
| Resend           | Sending sign-in emails                               | Recipient email address, sign-in link                           | USA                 | [resend.com/legal/dpa](https://resend.com/legal/dpa): pre-signed, applies to every plan       | [resend.com/legal/subprocessors](https://resend.com/legal/subprocessors) (14 days' notice of changes) | SOC 2 Type II ([security](https://resend.com/security))                                    |
| Cloudflare, Inc. | Domain, DNS and forwarding of email to our addresses | Email sent to @getaethervault.com addresses (support, security) | Global network      | [cloudflare.com/cloudflare-customer-dpa](https://www.cloudflare.com/cloudflare-customer-dpa/) | [Cloudflare sub-processors](https://www.cloudflare.com/gdpr/subprocessors/cloudflare-services/)       | Confirm (see note)                                                                         |

**Not sub-processors for customer data:** GitHub (hosts the static website and our source code; it
serves the app but stores no customer data), the customer's own AWS account, Slack and PagerDuty (the
customer chooses and controls those destinations).

Confirm each vendor's legal entity name against its DPA before publishing.

## Notes for counsel (verified 2026-11-14)

- **Supabase:** DPA v1 (Aug 1, 2026) "supplements and forms part of the Supabase Terms of Service"; no
  separate signature step stated. Uptime SLA only on Enterprise ([SLA](https://supabase.com/docs/guides/platform/sla));
  Free projects pause after 1 week of inactivity ([pricing](https://supabase.com/pricing)).
- **Resend:** "Our standard DPA applies to every account on any plan." Free plan keeps email and log
  data 30 days.
- **Cloudflare:** DPA v6.4 (Apr 3, 2026) takes effect from when the customer "signed or the parties
  otherwise agreed"; whether a self-serve account has accepted it is unconfirmed. SOC 2 claim not yet
  read verbatim. **To do: confirm both.**
- **GitHub:** its DPA covers services under "a written and executed agreement"; unclear for a free
  personal account. Relevant only if GitHub is treated as a sub-processor. GitHub Pages' limits say it is
  not to be used "to run your online business", including commercial SaaS
  ([limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)).
  We serve the console from it: **question for counsel and a hosting decision** (matter L9).
