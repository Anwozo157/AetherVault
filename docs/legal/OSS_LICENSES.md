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

1. **License notices: fixed 2026-11-14 (T6b).** The minified build strips license comments, so
   `scripts/license-notices.mjs` (a build plugin, no dependencies) now emits `THIRD_PARTY_NOTICES.txt`
   with the license text of every package actually bundled: 29 in the website (linked from the site
   footer as "Open-source notices") and 20 AWS SDK packages (Apache-2.0, with NOTICE files) inside the
   collector's `lambda.zip`. Packages that ship no license file get the standard text with the author
   from `package.json`.
2. **Our own license vs. a public repository.** `LICENSE` says the software is "proprietary and
   confidential" with all rights reserved, and names "Aegis Core Labs / Antonio Nwozo", while the GitHub
   repository is public. Questions for counsel: (a) which owner should the notice name (ties to the IP
   assignment, matter L2); (b) can code we publish still be treated as confidential or a trade secret, and
   should the repository be private (a business decision with a small cost: GitHub Pages from a private
   repository needs a paid GitHub plan); (c) is the notice wording right for source that is visible but
   not licensed.
3. **Collector Lambda** (deployed in customers' AWS accounts) bundles the AWS SDK (Apache-2.0); its
   notices now ship inside `lambda.zip` (finding 1).
