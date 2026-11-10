// Builds one collector entry as a single Node ESM file.
//   COLLECTOR_ENTRY=cli    (default) local CLI; AWS SDK loaded from node_modules
//   COLLECTOR_ENTRY=lambda Lambda handler with the AWS SDK bundled in (self-contained zip)
import { defineConfig } from 'vite';

const entry = process.env.COLLECTOR_ENTRY === 'lambda' ? 'lambda' : 'cli';
const bundleSdk = entry === 'lambda';

export default defineConfig({
  publicDir: false,
  build: {
    ssr: `collector/${entry}.ts`,
    outDir: `dist-collector/${entry}`,
    emptyOutDir: true,
    target: 'node20',
    rollupOptions: {
      external: bundleSdk ? [/^node:/] : [/^node:/, /^@aws-sdk\//, /^@smithy\//],
      output: { format: 'es', entryFileNames: '[name].mjs', codeSplitting: false },
    },
  },
  ssr: bundleSdk ? { noExternal: true } : undefined,
});
