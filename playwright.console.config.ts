import { defineConfig, devices } from '@playwright/test';

// Signed-in console E2E against LOCAL Supabase. Run with: npm run e2e:console
// (scripts/e2e-console.sh resets the database and passes the local URL and anon key).

const isCI = !!process.env.CI;
const url = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !anonKey) {
  throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (use npm run e2e:console).');
}

export default defineConfig({
  testDir: './e2e',
  testMatch: /console\.spec\.ts$/,
  fullyParallel: false,
  // Two sign-ins plus a full ~6s failover and realtime round-trips.
  timeout: 90_000,
  workers: 1,
  forbidOnly: isCI,
  retries: 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4174',
    trace: 'retain-on-failure',
    ...(isCI ? {} : { channel: 'chrome' }),
    // The 3D globe isn't under test here, and two software-rendered WebGL pages starve the CPU.
    // Without WebGL the app shows its normal "3D view unavailable" placeholder.
    launchOptions: { args: ['--disable-3d-apis'] },
  },
  projects: [{ name: 'desktop', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command:
      'npx vite build --outDir dist-console && npx vite preview --outDir dist-console --port 4174 --strictPort',
    url: 'http://localhost:4174',
    reuseExistingServer: false,
    timeout: 120_000,
    env: { VITE_SUPABASE_URL: url, VITE_SUPABASE_ANON_KEY: anonKey },
  },
});
