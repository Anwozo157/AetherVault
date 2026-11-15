#!/usr/bin/env node
// Summarize licenses of production dependencies from package-lock.json (no network, no extra packages).
// Usage: node scripts/license-report.mjs   → exits 1 if a copyleft or unknown license is found.
import { readFileSync, existsSync } from 'node:fs';

const lock = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const counts = {};
const flagged = [];
const RISKY = /GPL|MPL|EPL|CDDL|SSPL|BUSL|CC-BY-NC|UNLICENSED/i;

for (const [path, pkg] of Object.entries(lock.packages)) {
  if (!path || pkg.dev || pkg.devOptional) continue;
  let license = typeof pkg.license === 'object' ? pkg.license?.type : pkg.license;
  if (!license) {
    // Fall back to the package's LICENSE file when the lockfile has no license field.
    const file = ['LICENSE', 'LICENSE.md', 'LICENSE.txt']
      .map((f) => `${path}/${f}`)
      .find(existsSync);
    const text = file ? readFileSync(file, 'utf8') : '';
    license = /MIT License|Permission is hereby granted, free of charge/.test(text)
      ? 'MIT (from LICENSE file)'
      : 'UNKNOWN';
  }
  counts[license] = (counts[license] ?? 0) + 1;
  if (RISKY.test(license) || license === 'UNKNOWN')
    flagged.push(`${path.replace(/^.*node_modules\//, '')}@${pkg.version}: ${license}`);
}

const total = Object.values(counts).reduce((a, b) => a + b, 0);
console.log(`${total} production packages`);
for (const [license, n] of Object.entries(counts).sort((a, b) => b[1] - a[1]))
  console.log(`${String(n).padStart(4)}  ${license}`);
console.log(flagged.length ? `\nFlagged:\n  ${flagged.join('\n  ')}` : '\nFlagged: none');
process.exit(flagged.length ? 1 : 0);
