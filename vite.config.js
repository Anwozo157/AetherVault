import { execSync } from 'node:child_process';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { buildCsp } from './scripts/csp.mjs';

/** Build stamp: short commit + UTC date. Shown in Share and used to bust phone caches. */
function buildVersion() {
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return 'dev';
  }
}

const VERSION = buildVersion();
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/** Emits version.json so open pages (and the Share QR) can find the newest live build. */
const versionFile = () => ({
  name: 'aethervault-version-file',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'version.json',
      source: JSON.stringify({ version: VERSION, date: BUILD_DATE }) + '\n',
    });
  },
});

/** Adds the Content-Security-Policy and referrer policy to the built page (not the dev server). */
const securityMeta = (supabaseUrl) => ({
  name: 'aethervault-security-meta',
  apply: 'build',
  transformIndexHtml() {
    return [
      {
        tag: 'meta',
        attrs: { 'http-equiv': 'Content-Security-Policy', content: buildCsp(supabaseUrl) },
        injectTo: 'head-prepend',
      },
      {
        tag: 'meta',
        attrs: { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        injectTo: 'head',
      },
    ];
  },
});

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env };
  return {
    base: './',
    define: {
      __APP_VERSION__: JSON.stringify(VERSION),
      __BUILD_DATE__: JSON.stringify(BUILD_DATE),
      // Build-time constant so production bundles drop local-only code (demo accounts,
      // local mail inbox) entirely; deploy-pages.sh refuses builds that mention a local URL.
      __LOCAL_BACKEND__: JSON.stringify(
        /^https?:\/\/(127\.0\.0\.1|localhost)(:|\/|$)/.test(env.VITE_SUPABASE_URL ?? ''),
      ),
    },
    plugins: [react(), versionFile(), securityMeta(env.VITE_SUPABASE_URL)],
    build: {
      // The lazily loaded 3D globe chunk bundles three.js (~930 kB). It is not on the
      // critical path, so warn only above that; the initial bundle is ~300 kB.
      chunkSizeWarningLimit: 1000,
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/setupTests.ts'],
      exclude: ['node_modules', 'dist', 'e2e/**'],
      coverage: {
        provider: 'v8',
        include: ['src/**/*.{ts,tsx}'],
        exclude: [
          'src/**/*.test.{ts,tsx}',
          'src/setupTests.ts',
          'src/main.tsx',
          // Composition root for #/console (auth + Supabase wiring); covered by e2e/console.spec.ts.
          'src/console/ConsoleRoot.tsx',
          'src/vite-env.d.ts',
          // Need WebGL / Web Audio, which jsdom lacks; covered by Playwright E2E instead.
          'src/features/topology/GlobalTopologyCanvas.tsx',
          'src/lib/audioEffects.ts',
        ],
        thresholds: {
          lines: 80,
          functions: 70,
          branches: 75,
          // Core failover logic must stay near-fully tested.
          'src/domain/**': { lines: 95, functions: 95, branches: 95 },
          'src/providers/**': { lines: 90, functions: 90, branches: 75 },
        },
      },
    },
  };
});
