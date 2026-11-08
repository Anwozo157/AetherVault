import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
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
});
