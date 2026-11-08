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
  },
});
