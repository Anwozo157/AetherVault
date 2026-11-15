# Open-Source License Report

> DRAFT for review by counsel. Not legal advice. Generated 2026-11-14 (task T6 in
> `docs/LEGAL_PREP_PROMPT.md`). Re-run any time: `node scripts/license-report.mjs` (reads
> `package-lock.json`, no network; exits 1 if a copyleft or unknown license appears).

## Production dependencies (what ships in the website and console)

| License      | Packages | Type                                                        |
| ------------ | -------- | ----------------------------------------------------------- |
| MIT          | 108      | Permissive (keep copyright + notice)                        |
| ISC          | 11       | Permissive (keep copyright + notice)                        |
| 0BSD         | 6        | Permissive (no notice required)                             |
| Apache-2.0   | 5        | Permissive (keep notice; NOTICE files; patent grant)        |
| BSD-3-Clause | 1        | Permissive (keep notice; no endorsement)                    |
| **Total**    | **131**  | **No copyleft (GPL/AGPL/LGPL/MPL) and no unknown licenses** |

Apache-2.0 packages: `@dimforge/rapier3d-compat`, `@mediapipe/tasks-vision`, `draco3d`, `hls.js`,
`promise-worker-transferable`. One package (`webgl-constants`) has no license field in the lockfile; its
LICENSE file is MIT. Development-only tools (test, lint, build) don't ship and aren't counted.

## Findings

1. **License notices are not shipped.** The production build strips all license comments (0 of 24 JS
   files contain one). MIT, ISC, BSD and Apache-2.0 ask that the copyright and license notice accompany
   copies, and the website sends the bundled code to every visitor. Common fix: generate a
   `THIRD_PARTY_NOTICES.txt` at build time and link it from the site footer. Engineering task, free
   (tracked as T6b in `docs/LEGAL_PREP_PROMPT.md`).
2. **Our own license vs. a public repository.** `LICENSE` says the software is "proprietary and
   confidential" with all rights reserved, and names "Aegis Core Labs / Antonio Nwozo", while the GitHub
   repository is public. Questions for counsel: (a) which owner should the notice name (ties to the IP
   assignment, matter L2); (b) can code we publish still be treated as confidential or a trade secret, and
   should the repository be private (a business decision with a small cost: GitHub Pages from a private
   repository needs a paid GitHub plan); (c) is the notice wording right for source that is visible but
   not licensed.
3. **Collector Lambda** (deployed in customers' AWS accounts) bundles the AWS SDK (Apache-2.0); the
   customer receives a copy, so the notices finding applies to `dist-collector/` too.
