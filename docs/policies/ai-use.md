# AI Use Policy

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly and
whenever a tool or its terms change. DRAFT: not in effect until the founder approves it (and counsel has
reviewed the questions in `docs/legal/AI_TOOLS.md`).

## Approved tools

Only tools listed in `docs/legal/AI_TOOLS.md`, used under the plan recorded there. Adding a tool or
changing plans means updating that register first.

## Never put into an AI tool

- **Customer data:** anything from a customer's organization (emails, runbooks, audit entries,
  hostnames, AWS account IDs), production database contents or backups.
- **Secrets:** passwords, API keys, tokens, recovery codes, private keys. Agents read secrets from the
  macOS Keychain inside commands and never print them (`AGENTS.md` rule 7).
- **Counsel's advice** or anything marked privileged, unless the founder has confirmed with counsel that
  it's acceptable.
- **Confidential third-party material** (a customer's contract, NDA-covered documents) unless the
  agreement allows it.

## Allowed

- Source code, tests and documentation in the AetherVault repository.
- Synthetic or seeded test data, and the simulated demo.
- Public information.

## How AI work is controlled

- Agents follow `AGENTS.md`: work on branches, small reviewed commits, `npm run verify` before every
  commit, no push or deploy without the founder's OK, no deleting what they didn't create.
- The founder directs and reviews AI work and is accountable for what ships.
- AI-written commits carry a `Co-Authored-By:` trailer naming the tool, so AI involvement is traceable.
- Training opt-out: on any consumer plan, model training on our inputs is turned off in the tool's
  settings (founder confirms, T12).
