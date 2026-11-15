// Vite/Rollup plugin: emits THIRD_PARTY_NOTICES.txt listing every open-source package that is
// actually bundled into the output, with its license text. MIT, ISC, BSD and Apache-2.0 ask that
// the copyright and license notice travel with copies of the code; minification strips the
// comments, so this file carries them instead. No dependencies, no network.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const NM = '/node_modules/';

/** node_modules package root for a module id, or null for our own code. */
export function packageRoot(id) {
  const clean = id.replace(/^\0/, '').split('?')[0].replace(/\\/g, '/');
  const at = clean.lastIndexOf(NM);
  if (at < 0) return null;
  const rest = clean.slice(at + NM.length).split('/');
  const nameParts = rest[0].startsWith('@') ? rest.slice(0, 2) : rest.slice(0, 1);
  if (nameParts.length === 0 || !nameParts[nameParts.length - 1]) return null;
  return clean.slice(0, at + NM.length) + nameParts.join('/');
}

function readText(dir, pattern) {
  try {
    const file = readdirSync(dir).find((f) => pattern.test(f));
    return file ? readFileSync(join(dir, file), 'utf8').trim() : '';
  } catch {
    return '';
  }
}

/** One notice entry: name, version, license id and full license (+ NOTICE) text. */
export function describePackage(root) {
  const pkgFile = join(root, 'package.json');
  if (!existsSync(pkgFile)) return null;
  const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'));
  const license =
    (typeof pkg.license === 'object' ? pkg.license?.type : pkg.license) ?? 'see license text';
  const author = typeof pkg.author === 'object' ? pkg.author?.name : pkg.author;
  return {
    name: pkg.name ?? root.split(NM).pop(),
    author: author ?? '',
    version: pkg.version ?? '',
    license,
    text: readText(root, /^(LICEN[CS]E|COPYING)(\.|$|-)/i),
    notice: readText(root, /^NOTICE(\.|$)/i),
  };
}

const MIT_TEXT = `Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES
OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;

/** Package ships no license file: standard text for MIT, otherwise a pointer to the license id. */
function fallbackText(e) {
  const owner = e.author ? `Copyright (c) ${e.author}` : `Copyright (c) the ${e.name} authors`;
  if (e.license === 'MIT')
    return `${owner}\n\n${MIT_TEXT}\n\n(Standard MIT text; the package ships no license file.)`;
  return `${owner}\nLicense: ${e.license} (the package ships no license file; see https://spdx.org/licenses/${e.license}.html)`;
}

export function renderNotices(entries, product) {
  const header = [
    `${product}: third-party software notices`,
    '',
    `This product includes the open-source software listed below. Each package is the property of`,
    `its authors and is used under the license shown. ${entries.length} packages.`,
    '',
  ];
  const body = entries.map((e) =>
    [
      '='.repeat(78),
      `${e.name}@${e.version}  (${e.license})`,
      '='.repeat(78),
      e.text || fallbackText(e),
      e.notice ? `\n--- NOTICE ---\n${e.notice}` : '',
      '',
    ].join('\n'),
  );
  return header.join('\n') + '\n' + body.join('\n');
}

export function licenseNotices({
  product = 'AetherVault',
  fileName = 'THIRD_PARTY_NOTICES.txt',
} = {}) {
  return {
    name: 'aethervault-license-notices',
    apply: 'build',
    generateBundle(_options, bundle) {
      const roots = new Set();
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue;
        for (const id of Object.keys(chunk.modules)) {
          const root = packageRoot(id);
          if (root) roots.add(root);
        }
      }
      const byKey = new Map();
      for (const entry of [...roots].map(describePackage).filter(Boolean)) {
        byKey.set(`${entry.name}@${entry.version}`, entry); // nested duplicate copies count once
      }
      const entries = [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name));
      this.emitFile({ type: 'asset', fileName, source: renderNotices(entries, product) });
    },
  };
}
