# Trust Pack

> What we send a prospective customer's security team, and when. Every document here must stay true
> (AGENTS.md rule 2): say "not yet" where that is the answer, and never claim a certification, report,
> insurance policy or SLA before it exists. Started 2026-11-15. Review before every send and whenever a
> policy, sub-processor or architecture detail changes.

## Why this exists

Enterprise buyers usually ask for a SOC 2 report. We don't have one yet (see the
[SOC 2 program](../SOC2_PROGRAM_PROMPT.md)). Until we do, a first pilot is carried by four things:

1. **A small trust surface.** Replication runs in the customer's own AWS account; disk data never reaches
   us, and we hold no AWS credentials ([what leaves your account](DATA_FLOW.md)).
2. **Clear responsibilities** between the customer, AWS and us ([shared responsibility](SHARED_RESPONSIBILITY.md)).
3. **Honest, documented answers** to the standard security questionnaire.
4. **A dated plan** for the independent audit ([SOC 2 status letter](SOC2_STATUS_LETTER.md)).

## What to send, by stage

| Stage                      | Send                                                                                                                                                                                                                             | Notes                                                           |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| First call (no NDA needed) | [Security overview](../legal/SECURITY_OVERVIEW_DRAFT.md), [What leaves your AWS account](DATA_FLOW.md), [Shared responsibility](SHARED_RESPONSIBILITY.md)                                                                        | Public-safe: no internal details                                |
| Security review            | [Questionnaire answers](../compliance/SECURITY_QUESTIONNAIRE.md), [SOC 2 status letter](SOC2_STATUS_LETTER.md) (signed, dates filled), [sub-processors](../legal/SUBPROCESSORS.md), [data inventory](../legal/DATA_INVENTORY.md) | Copy answers into their form; never make them more favorable    |
| Under NDA, on request      | [Policies](../policies/README.md) (once signed), [system description](../compliance/SYSTEM_DESCRIPTION.md), collector source and Terraform (`collector/`)                                                                        | Policies only after founder approval; send PDFs, not repo links |
| Contract                   | Pilot agreement, DPA, privacy notice, SLA ([legal drafts](../legal/README.md))                                                                                                                                                   | Counsel reviews first (`docs/LEGAL_PREP_PROMPT.md`)             |
| Never send                 | Account IDs, credentials, open review findings, risk register details, private-folder material                                                                                                                                   | Offer a call instead of putting an internal gap in writing      |

All of these files are currently drafts marked "DRAFT for review by counsel" where applicable. Export to
PDF with the date in the filename (e.g. `AetherVault-Security-Overview-2026-11-15.pdf`) and log what was
sent to whom in the private folder.

## Gaps that will come up, and the honest answer today

| They ask                 | Today                                                                    | What closes it                                    |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------- |
| SOC 2 report             | Not yet; program under way; status letter with dates                     | Phases B–E of the SOC 2 program (needs funding)   |
| Penetration test         | Not yet; automated security testing on every change                      | Third-party test (phase D, needs funding)         |
| Cyber / E&O insurance    | Not yet                                                                  | Quote and bind (founder; ask counsel what limits) |
| SSO / SAML               | Not yet; one-time email links                                            | Roadmap item                                      |
| Contractual SLA          | No contractual SLA during the pilot                                      | `docs/legal/SLA_DRAFT.md` + uptime monitoring     |
| Managed database backups | Restores tested on the free plan; managed daily backups need a paid plan | Supabase Pro (phase D, needs funding)             |

## Founder to-do before the first send

- [ ] Choose the pilot access model in [shared responsibility](SHARED_RESPONSIBILITY.md) (customer runs
      the steps, or a temporary role for us); keep the questionnaire answer "Do you access our AWS
      account?" consistent with it.
- [ ] Fill in and sign the [SOC 2 status letter](SOC2_STATUS_LETTER.md) (dates must be ones you can keep).
- [ ] Approve and sign the policies (`docs/policies/README.md`).
- [ ] Have counsel review the security overview and status letter wording.
