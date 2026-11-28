// Builds one Azure collector entry as a single Node ESM file.
//   COLLECTOR_ENTRY=cli       (default) local CLI (uses `az login` for tokens)
//   COLLECTOR_ENTRY=function  Azure Functions app, @azure/functions bundled in
import { defineConfig } from 'vite';
// @ts-expect-error -- plain ESM helper without type declarations
import { licenseNotices } from '../scripts/license-notices.mjs';

const entry = process.env.COLLECTOR_ENTRY === 'function' ? 'function' : 'cli';

export default defineConfig({
  publicDir: false,
  plugins: [licenseNotices({ product: 'AetherVault Azure Site Recovery collector' })],
  build: {
    ssr: `collector-azure/${entry}.ts`,
    outDir: `dist-collector-azure/${entry}`,
    emptyOutDir: true,
    target: 'node20',
    rollupOptions: {
      // @azure/functions-core is injected by the Functions host at runtime.
      external: [/^node:/, '@azure/functions-core'],
      output: { format: 'es', entryFileNames: '[name].mjs', codeSplitting: false },
    },
  },
  ssr: { noExternal: true },
});
