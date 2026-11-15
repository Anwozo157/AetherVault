# AI Tools Register

> DRAFT for review by counsel. Not legal advice. Checked 2026-11-14 (task T5 in
> `docs/LEGAL_PREP_PROMPT.md`). Internal rules: `docs/policies/ai-use.md` (draft). Matter L3.

Most of AetherVault's code, tests and documents were written by AI coding agents working under
`AGENTS.md`, reviewed and directed by the founder. Buyers, auditors and investors will ask who owns that
work and what data the tools see. What the tools' terms say:

| Tool                                                   | Used for                                  | Terms that apply                                                                                | Who owns outputs                                                                     | Trains on our inputs?                                                                                             | Confidentiality                                                                  |
| ------------------------------------------------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Claude Code** (Anthropic), on a consumer plan        | Writing code, tests, docs; running checks | [Consumer Terms](https://www.anthropic.com/legal/consumer-terms) (effective Oct 8, 2025)        | Anthropic "assign[s] to you all of our right, title, and interest—if any—in Outputs" | **Yes, unless opted out** in account privacy settings ([privacy policy](https://www.anthropic.com/legal/privacy)) | No confidentiality clause found in the Consumer Terms                            |
| Claude Code on a commercial plan (API/Team/Enterprise) | Not used today (alternative)              | [Commercial Terms](https://www.anthropic.com/legal/commercial-terms) (effective Jun 17, 2025)   | Assigned to the customer                                                             | **No:** "Anthropic may not train models on Customer Content"                                                      | "Customer Content is Customer's Confidential Information"                        |
| **Google Antigravity** (named in `AGENTS.md`)          | Coding assistant                          | [Antigravity terms](https://antigravity.google/terms) (no date shown) + Google Terms of Service | Not addressed in the Antigravity terms                                               | Interactions used to improve Google products and ML; preference in settings                                       | "Google employees and contractors may access, view, review and use Interactions" |

Which plan each tool runs on today is a founder fact to confirm (T12). The table quotes the terms; it
doesn't say what they mean legally.

## Questions for counsel

1. **Ownership of AI-assisted code.** The tools assign whatever rights they have, "if any". How much of
   the codebase is protectable by copyright when an AI wrote it under human direction, and what does
   that mean for investors' IP representations and for protecting the product (trade secret,
   contracts, a private repository)?
2. **Consumer vs. commercial terms.** Should the company move to commercial plans (no training on inputs,
   confidentiality) before customer data or confidential customer details could reach the tools? Cost
   is a founder decision.
3. **Customer contracts.** Do customers need to be told, or to consent, that AI tools are used in
   development and support, and what may never be shared with them (customer data, credentials,
   counsel's advice)?
4. **Antigravity:** keep, or remove from `AGENTS.md` if unused, given its human-review clause.
