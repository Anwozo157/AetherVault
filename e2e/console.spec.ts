import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, test, type Browser, type Page } from '@playwright/test';
import type { DescribeSourceServersResponse } from '@aws-sdk/client-drs';
import { collectSnapshot, pushSnapshot, recordedApi } from '../src/integrations/awsDrs/collect';

// Two real browser sessions against local Supabase: the Phase 3.4 "done when" check.
// Accounts come from supabase/seed.sql (local only).

const PASSWORD = 'aether-demo-local';
const ORG = 'Aegis Demo Org';

async function signIn(browser: Browser, email: string) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  // Any Content-Security-Policy violation (e.g. a blocked database or websocket call) fails the test.
  page.on('console', (m) => {
    if (/Content Security Policy|Refused to/i.test(m.text())) errors.push(m.text());
  });
  await page.goto('/#/console');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('banner').getByText(ORG)).toBeVisible();
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
  await page.goto('/#/demo');
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

test('drill evidence: a completed drill reports PASS, and the downloaded file matches its fingerprint', async ({
  browser,
}) => {
  const operator = await signIn(browser, 'operator@aethervault.local');
  const approver = await signIn(browser, 'approver@aethervault.local');
  await holdFailover(operator.page);
  await approver.page.getByRole('button', { name: 'Approve failover' }).click();
  await expect(operator.page.getByRole('button', { name: 'Reset to Standby' })).toBeVisible({
    timeout: 15_000,
  });
  await operator.page.getByRole('button', { name: 'Reset to Standby' }).click();

  await operator.page.getByRole('button', { name: 'Drills', exact: true }).click();
  await expect(operator.page.getByText(/· PASS/).first()).toBeVisible({ timeout: 10_000 });
  await operator.page
    .getByRole('button', { name: /Evidence report for failover/ })
    .first()
    .click();

  const report = operator.page.getByRole('dialog');
  await expect(report.getByText('PASS', { exact: true })).toBeVisible();
  await expect(report.getByText('operator@aethervault.local').first()).toBeVisible();
  await expect(report.getByText('approver@aethervault.local').first()).toBeVisible();
  await expect(report.getByText('Met (different requester and approver)')).toBeVisible();
  await expect(report.getByText(/Audit chain intact/)).toBeVisible();

  const shown = (await report.getByText(/Report fingerprint/).textContent())!.match(
    /[0-9a-f]{64}/,
  )![0];
  const [download] = await Promise.all([
    operator.page.waitForEvent('download'),
    report.getByRole('button', { name: /Download JSON/ }).click(),
  ]);
  const file = readFileSync((await download.path())!, 'utf8');
  const recomputed = createHash('sha256').update(file.trimEnd()).digest('hex');
  expect(recomputed).toBe(shown);
  expect(JSON.parse(file).results.rto_met).toBe(true);

  expect(operator.errors).toEqual([]);
  await operator.close();
  await approver.close();
});

test("audit log: verify passes, then detects an entry altered behind the app's back", async ({
  browser,
}) => {
  const operator = await signIn(browser, 'operator@aethervault.local');
  // Generate real activity: request, then withdraw.
  await holdFailover(operator.page);
  await operator.page.getByRole('button', { name: 'Withdraw request' }).click();
  await expect(operator.page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeVisible();

  await operator.page.getByRole('button', { name: 'Audit Log' }).click();
  await expect(
    operator.page.getByRole('cell', { name: 'Failover aborted / withdrawn' }).first(),
  ).toBeVisible();
  await expect(
    operator.page.getByRole('cell', { name: 'Failover requested' }).first(),
  ).toBeVisible();

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

/** Requests a magic link from the page, then follows it from the local inbox (Mailpit). */
async function signInWithEmailLink(browser: Browser, email: string) {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/#/console');
  await page.getByLabel('Email').fill(email);
  await page.getByRole('button', { name: /Email me a sign-in link/ }).click();
  await expect(page.getByRole('status')).toContainText('local inbox');
  let link: string | undefined;
  await expect
    .poll(
      async () => {
        const list = await (await fetch('http://127.0.0.1:54324/api/v1/messages?limit=20')).json();
        const msg = list.messages.find(
          (m: { To: { Address: string }[] }) => m.To[0].Address === email,
        );
        if (!msg) return undefined;
        const full = await (await fetch(`http://127.0.0.1:54324/api/v1/message/${msg.ID}`)).json();
        link = (full.Text.match(/https?:\/\/\S+verify\?\S+/) || [])[0];
        return link;
      },
      { timeout: 20_000 },
    )
    .toBeTruthy();
  await page.goto(link!);
  return { page, errors, close: () => context.close() };
}

test('new customer: signs up, creates an organization, invites a teammate who joins as approver', async ({
  browser,
}) => {
  const stamp = Date.now();
  const founderEmail = `founder.${stamp}@aethervault.local`;
  const hireEmail = `new.hire.${stamp}@aethervault.local`;
  const orgName = `Founder Co ${stamp}`;

  // 1. A brand-new person signs up with an email link and creates their organization.
  const founder = await signInWithEmailLink(browser, founderEmail);
  await expect(founder.page.getByText('You are not in an organization yet')).toBeVisible({
    timeout: 20_000,
  });
  await founder.page.getByLabel('Organization name').fill(orgName);
  await founder.page.getByRole('button', { name: 'Create organization' }).click();
  await expect(founder.page.getByText(orgName).first()).toBeVisible();
  await expect(founder.page.getByText('Get set up · 1 of 4')).toBeVisible();

  // 2. They invite a teammate as approver; the checklist advances.
  await founder.page.getByRole('button', { name: 'Team', exact: true }).click();
  await founder.page.getByLabel('Teammate email').fill(hireEmail);
  await founder.page.getByLabel('Role', { exact: true }).selectOption('approver');
  await founder.page.getByRole('button', { name: 'Invite' }).click();
  await expect(founder.page.getByText(`Invited ${hireEmail} as approver`)).toBeVisible();
  await expect(
    founder.page.getByText(/Sign in with .* using "Email me a sign-in link"/),
  ).toBeVisible();
  await expect(founder.page.getByText('Get set up · 2 of 4')).toBeVisible({ timeout: 10_000 });

  // 3. The teammate signs in with that email and lands directly in the organization.
  const hire = await signInWithEmailLink(browser, hireEmail);
  await expect(hire.page.getByText(orgName)).toBeVisible({ timeout: 20_000 });
  await expect(hire.page.getByText('approver', { exact: true })).toBeVisible();
  await expect(hire.page.getByText(/Get set up/)).toHaveCount(0); // checklist is for admins

  // 4. The founder's team list updates live; the invite is no longer pending.
  await expect(founder.page.getByRole('cell', { name: hireEmail, exact: true })).toBeVisible({
    timeout: 15_000,
  });
  await expect(founder.page.getByText(`${hireEmail} · approver`)).toHaveCount(0);

  expect(founder.errors).toEqual([]);
  expect(hire.errors).toEqual([]);
  await founder.close();
  await hire.close();
});

test('drills: an operator runs an isolated drill without approval; it passes with evidence', async ({
  browser,
}) => {
  const admin = await signIn(browser, 'admin@aethervault.local');
  await admin.page.getByRole('button', { name: 'Drills', exact: true }).click();
  await expect(admin.page.getByTestId('schedule-status')).toHaveText('No drills scheduled.');
  await admin.page.getByLabel('Repeat').selectOption('weekly');
  await admin.page.getByRole('button', { name: 'Save schedule' }).click();
  await expect(admin.page.getByTestId('schedule-status')).toContainText(
    'Weekly to AWS us-west-2 (Oregon)',
  );

  const operator = await signIn(browser, 'operator@aethervault.local');
  await operator.page.getByRole('button', { name: 'Drills', exact: true }).click();
  await expect(operator.page.getByTestId('schedule-status')).toContainText('Weekly');
  await operator.page.getByRole('button', { name: 'Run drill now' }).click();
  const row = operator.page.locator('tr', { hasText: 'isolated · no approval needed' }).first();
  await expect(row.getByText(/· PASS/)).toBeVisible({ timeout: 15_000 });
  // A drill never becomes the live failover.
  await operator.page.getByRole('button', { name: '3D Global HUD' }).click();
  await expect(operator.page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeVisible();
  await operator.page.getByRole('button', { name: 'Drills', exact: true }).click();
  await operator.page
    .getByRole('button', { name: /Evidence report for drill/ })
    .first()
    .click();
  const report = operator.page.getByRole('dialog');
  await expect(report.getByText('PASS', { exact: true })).toBeVisible();
  await expect(report.getByText(/On-demand drill evidence/)).toBeVisible();
  await expect(report.getByText(/Not required: drills run in an isolated network/)).toBeVisible();

  expect(admin.errors).toEqual([]);
  expect(operator.errors).toEqual([]);
  await admin.close();
  await operator.close();
});

test('alerts: an admin adds a Slack channel (secret masked), viewers see it read-only, then it is removed', async ({
  browser,
}) => {
  // No failover or drill runs while the channel exists, so nothing is ever sent to Slack.
  const admin = await signIn(browser, 'admin@aethervault.local');
  await admin.page.getByRole('button', { name: 'Alerts', exact: true }).click();
  const form = admin.page.getByRole('form', { name: 'Add alert channel' });
  await form.getByLabel('Name').fill('#dr-alerts');
  await form.getByLabel('Slack webhook URL').fill('https://example.com/not-slack');
  await form.getByRole('button', { name: 'Add channel' }).click();
  await expect(admin.page.getByRole('alert')).toContainText('Slack webhook URL must look like');

  await form
    .getByLabel('Slack webhook URL')
    .fill('https://hooks.slack.com/services/T000/B000/e2eTESTxyz9');
  await form.getByRole('button', { name: 'Add channel' }).click();
  const row = admin.page.getByTestId('channel-#dr-alerts');
  await expect(row).toContainText('…xyz9');
  await expect(admin.page.getByText('e2eTEST')).toHaveCount(0);

  const viewer = await signIn(browser, 'viewer@aethervault.local');
  await viewer.page.getByRole('button', { name: 'Alerts', exact: true }).click();
  await expect(viewer.page.getByTestId('channel-#dr-alerts')).toContainText('…xyz9');
  await expect(viewer.page.getByRole('button', { name: /Remove alert channel/ })).toHaveCount(0);

  await admin.page.getByRole('button', { name: 'Remove alert channel #dr-alerts' }).click();
  await expect(row).toHaveCount(0);
  await expect(admin.page.getByText('No alert channels yet.')).toBeVisible();

  expect(admin.errors).toEqual([]);
  expect(viewer.errors).toEqual([]);
  await admin.close();
  await viewer.close();
});

test('replication: admin connects a collector; pushed AWS DRS status appears, labeled sample data', async ({
  browser,
}) => {
  const target = {
    url: process.env.VITE_SUPABASE_URL!,
    anonKey: process.env.VITE_SUPABASE_ANON_KEY!,
  };
  const admin = await signIn(browser, 'admin@aethervault.local');
  admin.page.on('dialog', (d) => void d.accept());
  await admin.page.getByRole('button', { name: 'AWS DRS & Telemetry' }).click();
  await expect(admin.page.getByText('No replication data received yet.')).toBeVisible();
  await admin.page.getByRole('button', { name: 'Create collector token' }).click();
  const token = (await admin.page.getByTestId('new-token').textContent())!.trim();
  expect(token).toMatch(/^avi_[0-9a-f]{48}$/);

  // The real collector code, fed recorded DescribeSourceServers pages, pushes to the database.
  const degraded = JSON.parse(
    readFileSync('src/integrations/awsDrs/fixtures/describe-source-servers.degraded.json', 'utf8'),
  ) as DescribeSourceServersResponse[];
  const snapshot = await collectSnapshot(recordedApi(degraded), {
    region: 'us-west-2',
    source: 'fixture',
  });
  await expect(
    pushSnapshot({ ...target, token: 'avi_' + '0'.repeat(48) }, snapshot),
  ).rejects.toThrow('invalid ingest token');
  await expect(pushSnapshot({ ...target, token }, snapshot)).resolves.toMatchObject({
    accepted: true,
    rpo_met: false,
    servers: 4,
  });

  await admin.page.getByRole('button', { name: 'Refresh replication status' }).click();
  await expect(admin.page.getByTestId('replication-badge')).toHaveText(
    'SAMPLE DATA · NOT A REAL ACCOUNT',
  );
  await expect(admin.page.getByText('At risk', { exact: true })).toBeVisible();
  await expect(admin.page.getByTestId('server-file-server-01')).toContainText('UNSTABLE_NETWORK');
  await expect(admin.page.getByTestId('server-db-server-01')).toContainText('2 min 10 s');
  await expect(admin.page.getByTestId('token-status')).toContainText('last used');

  // Revoking the token locks the collector out.
  await admin.page.getByRole('button', { name: 'Revoke' }).click();
  await expect(admin.page.getByTestId('token-status')).toHaveText('No collector token yet.');
  await expect(pushSnapshot({ ...target, token }, snapshot)).rejects.toThrow(
    'invalid ingest token',
  );

  expect(admin.errors).toEqual([]);
  await admin.close();
});

test('runbook: admin starts from the template; an operator ticks a step on a drill; evidence shows it', async ({
  browser,
}) => {
  // Earlier tests may leave a drill running until the per-minute scheduler records it.
  sqlAsOwner(`select public.run_drill_scheduler(now() + interval '10 seconds')`);

  const admin = await signIn(browser, 'admin@aethervault.local');
  await admin.page.getByRole('button', { name: 'Runbook', exact: true }).click();
  await admin.page.getByRole('button', { name: 'Start from template' }).click();
  await admin.page.getByLabel('Title of step 8').fill('Confirm field engineers can connect');
  await admin.page.getByRole('button', { name: 'Save runbook' }).click();
  await expect(admin.page.getByText(/^v1 · updated/)).toBeVisible();
  await expect(admin.page.getByText('Confirm field engineers can connect')).toBeVisible();

  const operator = await signIn(browser, 'operator@aethervault.local');
  await operator.page.getByRole('button', { name: 'Runbook', exact: true }).click();
  await expect(operator.page.getByRole('button', { name: 'Edit runbook' })).toHaveCount(0);
  await operator.page.getByRole('button', { name: 'Drills', exact: true }).click();
  await operator.page.getByRole('button', { name: 'Run drill now' }).click();
  await expect(
    operator.page
      .locator('tr', { hasText: 'isolated · no approval needed' })
      .first()
      .getByText(/· PASS/),
  ).toBeVisible({ timeout: 15_000 });

  await operator.page.getByRole('button', { name: 'Runbook', exact: true }).click();
  await expect(operator.page.getByText(/0 of 10 steps done · runbook v1/)).toBeVisible();
  await operator.page.getByLabel('Note for Check replication health').fill('worst lag 4 s');
  await operator.page.getByRole('button', { name: 'Mark done: Check replication health' }).click();
  await expect(operator.page.getByText(/1 of 10 steps done/)).toBeVisible();
  await expect(operator.page.getByText(/Done by operator@aethervault.local/)).toContainText(
    'worst lag 4 s',
  );

  await operator.page.getByRole('button', { name: 'Drills', exact: true }).click();
  await operator.page
    .getByRole('button', { name: /Evidence report for drill/ })
    .first()
    .click();
  const report = operator.page.getByRole('dialog');
  await expect(report.getByText('Runbook (v1): 1 of 10 steps done')).toBeVisible();
  await expect(report.getByText(/operator@aethervault.local · .* · worst lag 4 s/)).toBeVisible();

  expect(admin.errors).toEqual([]);
  expect(operator.errors).toEqual([]);
  await admin.close();
  await operator.close();
});
