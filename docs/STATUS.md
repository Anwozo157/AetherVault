# Project Status

> Living handoff document. **Every agent or contributor updates this at the end of a session.**
> Last updated: 2026-11-11 (site live on getaethervault.com, company email, AWS account pending verification) by Claude Code (Opus 5.5).

## Where we are

| Phase           | Scope                                                                         | Status                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 0. Foundation   | Strict TS, ESLint/Prettier, compiled Tailwind + brand tokens, docs            | ✅ Done (2026-11-08)                                                                                                             |
| 1. Architecture | `DrProvider` interface, feature folders, abort, lazy loading, simulated badge | ✅ Done (2026-11-08)                                                                                                             |
| 2. Quality bar  | Playwright E2E, WCAG 2.2 AA, Lighthouse 90+, GitHub Actions CI                | ✅ Done (2026-11-08)                                                                                                             |
| 3. Backend MVP  | Free-tier only until funded (see `AGENTS.md` rule 1)                          | 🚧 3.1–3.5, 3.7 done; 3.6 live on https://getaethervault.com; Resend SMTP connected                                              |
| 4. Productize   | Multi-tenant, DR drills, compliance reports                                   | 🚧 Team invites, 4.1 evidence, 4.2 drills, 4.3 alerts, 4.4 AWS DRS collector, 4.5 measured RPO, 4.6 runbooks, 4.7 AWS guide done |

Phase 3 milestones (`docs/PHASE_3_PLAN.md`):

| #   | Deliverable                                         | Status                                                                                                                                                                                                                                                                           |
| --- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3.1 | ADRs: platform, auth, audit                         | ✅ Accepted                                                                                                                                                                                                                                                                      |
| 3.2 | Local Supabase + schema + RLS + audit triggers      | ✅ pgTAP                                                                                                                                                                                                                                                                         |
| 3.3 | Server failover functions                           | ✅ pgTAP                                                                                                                                                                                                                                                                         |
| 3.4 | `SupabaseDrProvider` + sign-in + approval UI        | ✅ Two-browser E2E                                                                                                                                                                                                                                                               |
| 3.5 | Audit log UI + hash-chain verification              | ✅ Tamper E2E (a direct database edit is detected in the UI)                                                                                                                                                                                                                     |
| 3.6 | CI runs Supabase; hosted free project; GitHub OAuth | 🟡 CI done; hosted project `yvcejahygubzbbbooxas` (us-east-1, Free) live 2026-11-10: 10 migrations pushed, 235 pgTAP pass on it, cron jobs running, auth configured. Site live on getaethervault.com 2026-11-11. Resend SMTP connected 2026-11-11. Left: GitHub OAuth (optional) |
| 3.7 | `docs/SECURITY.md`, deck roadmap                    | ✅ Done                                                                                                                                                                                                                                                                          |

Details of every change: `CHANGELOG.md`. Full plan: `docs/CONTINUE_BUILD_PROMPT.md`.

## Health (verified 2026-11-09)

- CI on every PR, all green on `main`: lint, types, 160+ unit tests, coverage thresholds, build, bundle budget, production audit · Playwright desktop + mobile, including a Content-Security-Policy check · local Supabase: 235 pgTAP + 13 console E2E · CodeQL · gitleaks full-history secret scan.
- Live site deployed from `main`; `version.json` matches; CSP active; the Share QR always encodes the live version (verified by decoding it).
- GitHub: secret scanning + push protection, private vulnerability reporting, Dependabot alerts + automated security fixes are enabled.
- `npm audit`: 0 vulnerabilities. Toolchain: Vite 8, Vitest 5, React 18.
- Local machine is memory-starved (swap ~5–6 GB): public-demo E2E times out locally but passes on CI. Founder deferred Mac cleanup.

## Next steps (in order)

1. **3.6 hosting:** ✅ Live at **https://getaethervault.com** (2026-11-11; GitHub Pages, HTTPS enforced, old github.io URL redirects). Founder signed in and created the organization. Domain at Cloudflare (DNS + Email Routing: antonio@/support@/security@/billing@ → founder inbox); steps and records in `docs/CUSTOM_DOMAIN.md`. Resend SMTP connected 2026-11-11 (B9 done; DMARC report-only). **Next:** founder rolls the Cloudflare API token (it was pasted in chat once).
   **AWS (live proof of concept, `docs/AWS_LIVE_POC.md`):** account created and upgraded; AWS is still verifying it (blocks Organizations, CloudShell, console access for IAM users). After verification: CloudShell `create-login-profile` for `antonio-admin`, MFA, `aws login --profile aegis`, then the test. AWS CLI 2.40.0 installed in `~/aws-cli` (old 2.6.2 in `/usr/local/aws-cli` needs `sudo rm` by the founder).
2. **Phase 4, free parts:** all free items done. Pilot day: follow `docs/PILOT_DAY.md` (blocker B1 is hosting, item 1 above); run `--record` to replace the hand-built sample responses. Possible next: AetherVault launching DRS drills itself (needs a write-capable role; design with the customer first), GCP/Azure providers, email alerts (needs a mail provider). ✅ Done 2026-11-10: 4.7 Connect-your-AWS-account guide + `docs/AWS_DR_BEST_PRACTICES.md`, `docs/TERRAFORM.md`, `docs/PILOT_DAY.md`; 4.6 DR runbooks (versioned runbook, AWS DRS template, per-run checklist in evidence); 4.5 measured RPO in drill/failover evidence (replication snapshot captured at launch; drills fail on a missed RPO); 4.4 AWS DRS collector (read-only Lambda, ingest token, live Replication panel, RPO-breach alerts); 4.3 Slack/PagerDuty alerts (Vault-encrypted secrets, delivery log); 4.2 scheduled, non-disruptive drills (`pg_cron`, weekly/monthly/quarterly, Run drill now, drill evidence). ✅ Done 2026-11-09: team invites/roles + onboarding checklist; 4.1 drill evidence reports (RTO/RPO targets, PASS/FAIL drill history, Print/Save as PDF, SHA-256-fingerprinted JSON; deployed as `89c4e1b`).
3. **Requires funding (founder approves):** AWS account + Elastic Disaster Recovery for real replication data (~$40–60/mo), Supabase Pro ($25/mo), custom domain ✅ bought 2026-11-11 ($11.17/yr; headers still need a host or proxy that sends them). Founder approved Supabase Pro ($25/mo), not yet upgraded.

4. **SOC 2 readiness (free):** checklist started in `docs/SOC2_READINESS.md`. Branch protection on `main` enabled 2026-11-09. Founder: FileVault/auto-updates/2FA check. Agent: write the core policy set, risk register, vendor inventory.

5. **Landing page** built (2026-11-09) on `feat/landing-page`: ✅ `CONTACT_EMAIL` set to antonio@getaethervault.com (2026-11-11); add real console screenshots and the NewConnect case study when available.

## Open decisions for the founder

- Approve funds (costs in `docs/PHASE_3_PLAN.md` and the investor market report).
- Pricing assumption in the market report ($3,000/month per customer): confirm, or choose a lower entry tier.
- Seed-round date; document the $4.2B SAM methodology.
- Mac cleanup (deferred).
- `.claude/launch.json` (untracked, port 5173 vs 5174): keep or remove? Old duplicate at `~/Documents/aethervault-command-center`: archive or delete?

## Known issues

- Repo lives at `~/Developer/AetherVault`. Do not move it back into iCloud.
- Local Supabase: analytics, Studio, storage and edge runtime are disabled in `supabase/config.toml` (analytics alone used ~4 CPU cores).
- `DEGRADED_STATE` exists in the state machine but is never entered; chaos mode only changes telemetry.
- Supabase CLI 3.0 is available (repo pins 2.122.0); upgrade as its own tested task.
- Deck cites "MarketsandMarkets, Jan 2026"; the verified press release is dated 14 May 2026 with the same figures. Confirm the report's own publication month.
