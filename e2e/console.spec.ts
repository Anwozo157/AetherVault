import { execFileSync } from 'node:child_process';
import { expect, test, type Browser, type Page } from '@playwright/test';

// Two real browser sessions against local Supabase: the Phase 3.4 "done when" check.
// Accounts come from supabase/seed.sql (local only).

const PASSWORD = 'aether-demo-local';
const ORG = 'Aegis Demo Org';

async function signIn(browser: Browser, email: string) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/#/console');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByText(ORG)).toBeVisible();
  return { page, errors, close: () => context.close() };
}

async function holdFailover(page: Page) {
  const button = page.getByRole('button', { name: /1-CLICK FAILOVER/ });
  await button.hover();
  await page.mouse.down();
  await page.waitForTimeout(1500);
  await page.mouse.up();
}

test.describe.configure({ mode: 'serial' });

test('the public demo route still shows the simulated demo, with a sign-in link', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByText('SIMULATED DATA')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign in' })).toHaveAttribute('href', '#/console');
});

test('wrong password is rejected with a clear message', async ({ page }) => {
  await page.goto('/#/console');
  await page.getByLabel('Email').fill('operator@aethervault.local');
  await page.getByLabel('Password').fill('not-the-password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText(/invalid/i);
});

test('two users complete an approved failover live', async ({ browser }) => {
  const operator = await signIn(browser, 'operator@aethervault.local');
  const approver = await signIn(browser, 'approver@aethervault.local');

  for (const { page } of [operator, approver]) {
    await expect(page.getByText('SIMULATED TELEMETRY')).toBeVisible();
    await expect(page.getByText('SIMULATED DATA')).toHaveCount(0);
  }

  // Operator requests; nothing executes yet.
  await holdFailover(operator.page);
  await expect(operator.page.getByText('Awaiting second-person approval')).toBeVisible();
  await expect(operator.page.getByRole('button', { name: 'Approve failover' })).toHaveCount(0);
  await expect(operator.page.getByRole('button', { name: 'Withdraw request' })).toBeVisible();

  // Approver sees the request appear live (Realtime) and approves.
  await expect(
    approver.page.getByText(/operator@aethervault\.local requested failover/),
  ).toBeVisible();
  await approver.page.getByRole('button', { name: 'Approve failover' }).click();

  // Both watch the same run reach the secured state.
  for (const { page } of [operator, approver]) {
    await expect(page.getByRole('button', { name: 'Reset to Standby' })).toBeVisible({
      timeout: 15_000,
    });
  }

  // The audit stream names both people.
  await operator.page.getByRole('button', { name: /AWS DRS & Telemetry/ }).click();
  await expect(operator.page.getByText(/requested by operator@aethervault\.local/)).toBeVisible();
  await expect(operator.page.getByText(/approved by approver@aethervault\.local/)).toBeVisible();
  await operator.page.getByRole('button', { name: /3D Global HUD/ }).click();

  // Reset returns everyone to standby.
  await approver.page.getByRole('button', { name: 'Reset to Standby' }).click();
  for (const { page } of [operator, approver]) {
    await expect(page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeVisible({
      timeout: 10_000,
    });
  }

  expect(operator.errors).toEqual([]);
  expect(approver.errors).toEqual([]);
  await operator.close();
  await approver.close();
});

test('a pending request can be withdrawn and the approver sees it disappear', async ({
  browser,
}) => {
  const operator = await signIn(browser, 'operator@aethervault.local');
  const approver = await signIn(browser, 'approver@aethervault.local');

  await holdFailover(operator.page);
  await expect(approver.page.getByRole('button', { name: 'Approve failover' })).toBeVisible();
  await operator.page.getByRole('button', { name: 'Withdraw request' }).click();
  await expect(approver.page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeVisible();

  await operator.close();
  await approver.close();
});

test('viewers are read-only', async ({ browser }) => {
  const viewer = await signIn(browser, 'viewer@aethervault.local');
  await expect(viewer.page.getByText(/View-only access \(viewer\)/)).toBeVisible();
  await expect(viewer.page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toHaveCount(0);
  await viewer.close();
});

test('signing out returns to the sign-in form', async ({ browser }) => {
  const operator = await signIn(browser, 'operator@aethervault.local');
  await operator.page.getByRole('button', { name: 'Sign out' }).click();
  await expect(operator.page.getByRole('form', { name: 'Sign in' })).toBeVisible();
  await operator.close();
});

/** Runs SQL as the database owner inside the local Supabase container (test setup only). */
function sqlAsOwner(sql: string) {
  return execFileSync(
    'docker',
    ['exec', 'supabase_db_AetherVault', 'psql', '-U', 'postgres', '-tAc', sql],
    { encoding: 'utf8' },
  ).trim();
}

test("audit log: verify passes, then detects an entry altered behind the app's back", async ({
  browser,
}) => {
  const operator = await signIn(browser, 'operator@aethervault.local');
  // Generate real activity: request, then withdraw.
  await holdFailover(operator.page);
  await operator.page.getByRole('button', { name: 'Withdraw request' }).click();
  await expect(operator.page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeVisible();

  await operator.page.getByRole('button', { name: 'Audit Log' }).click();
  await expect(operator.page.getByRole('cell', { name: 'Failover aborted / withdrawn' }).first()).toBeVisible();
  await expect(operator.page.getByRole('cell', { name: 'Failover requested' }).first()).toBeVisible();

  await operator.page.getByRole('button', { name: 'Verify chain' }).click();
  await expect(operator.page.getByRole('status')).toContainText('Chain intact');

  // An attacker with database access edits history: change where a past failover went.
  const victim = sqlAsOwner("select min(id) from audit_log where action = 'failover.requested'");
  sqlAsOwner(
    `alter table audit_log disable trigger audit_log_no_update_delete; ` +
      `update audit_log set detail = jsonb_set(detail, '{target}', '"attacker-region"') where id = ${victim}; ` +
      `alter table audit_log enable trigger audit_log_no_update_delete;`,
  );

  await operator.page.getByRole('button', { name: 'Verify chain' }).click();
  await expect(operator.page.getByRole('status')).toContainText(
    `Tampering detected: entry #${victim} was altered`,
  );
  await expect(
    operator.page.getByTestId(`audit-row-${victim}`).getByText('Altered entry:'),
  ).toBeAttached();
  expect(operator.errors).toEqual([]);
  await operator.close();
});
