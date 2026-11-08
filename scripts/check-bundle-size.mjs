// Fails if the initial JS bundle (what every visitor downloads first) exceeds the budget.
// Lazy chunks (3D globe, deck, AWS tab) are excluded: they load on demand.
import { readFileSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const BUDGET_GZIP_KB = 120;
const html = readFileSync('dist/index.html', 'utf8');
const entry = html.match(/assets\/(index-[\w-]+\.js)/)?.[1];
if (!entry) {
  console.error('Could not find entry script in dist/index.html');
  process.exit(1);
}
const sizeKb = gzipSync(readFileSync(`dist/assets/${entry}`)).length / 1024;
const lazy = readdirSync('dist/assets').filter((f) => f.endsWith('.js') && f !== entry);

console.log(`Initial JS ${entry}: ${sizeKb.toFixed(1)} kB gzip (budget ${BUDGET_GZIP_KB} kB)`);
console.log(`Lazy chunks: ${lazy.length}`);
if (sizeKb > BUDGET_GZIP_KB) {
  console.error('Bundle budget exceeded. Lazy-load the new code or raise the budget deliberately.');
  process.exit(1);
}
