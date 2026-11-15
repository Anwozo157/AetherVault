# Acceptable Use Policy and Code of Conduct

**Owner:** Founder · **Version:** 1.0 draft · **Last reviewed:** 2026-11-14 · **Review:** yearly

## Code of conduct

- Act with integrity. Be honest with customers, investors, auditors and each other, including about
  what the product does not do yet.
- Treat customer data as theirs. Access it only to do the job they asked for.
- Report mistakes, suspected incidents and policy problems promptly. Reporting in good faith is
  never punished.
- Respect people. No harassment or discrimination.
- Avoid conflicts of interest; disclose any that arise to the founder.

## Company devices

Work is done on devices that meet this baseline (checked in the quarterly review):

- Full-disk encryption on (FileVault on macOS).
- Automatic OS and security updates on; OS kept on a supported, current release.
- Screen locks after at most 5 minutes idle and requires a password.
- Built-in firewall on; Gatekeeper and System Integrity Protection on.
- No sharing the device account with others.
- Lost or stolen device: report immediately (it's an incident), rotate credentials stored on it.

## Accounts and credentials

- Use company accounts for company work and personal accounts for personal life, as far as the
  tools allow. Company email at `getaethervault.com` for customer, vendor and auditor communication.
- Every account uses a unique password from the password manager and multi-factor authentication.
- Never paste secrets (passwords, keys, tokens, recovery codes) into chat tools, AI assistants,
  tickets, documents or git. If it happens, treat it as a leak: rotate.
- Never share accounts. Each person gets their own access.

## AI assistants and agents

- Agents work under `AGENTS.md` and the tool's permission prompts. They may read secrets only
  through the macOS Keychain or the hosting platform's secret store, never print them, and never
  store them in files.
- Do not give agents customer data beyond what a task needs.
- A human reviews and approves pushes, deploys, spending, account changes and deletions.

## Prohibited

- Disabling security controls (CI checks, branch protection, RLS, CSP, disk encryption) without a
  documented exception.
- Installing software from untrusted sources on work devices.
- Using customer data for anything other than providing the service.
- Testing security against systems we don't own without written permission.

## Acknowledgement

Read on joining and yearly; record it in `docs/policies/README.md`.
