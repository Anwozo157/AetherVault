import { expect, test, type Page } from '@playwright/test';

/** Collects uncaught page errors so every test can assert the app never crashed. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

test.describe('Mission Control', () => {
  test('loads with the simulated-data badge and the 3D globe', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await expect(page.getByText('SIMULATED DATA')).toBeVisible();
    await expect(page.locator('canvas')).toBeVisible();
    await expect(page.getByText('ACTIVE SYNC', { exact: true })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('press-and-hold starts a failover that can be aborted', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: /1-CLICK FAILOVER/ });
    await button.hover();
    await page.mouse.down();
    await page.waitForTimeout(1500);
    await page.mouse.up();

    await page.getByRole('button', { name: 'Abort Failover' }).click();
    await expect(page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeVisible();
  });

  test('a short click does not start a failover', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /1-CLICK FAILOVER/ }).click();
    await page.waitForTimeout(1500);
    await expect(page.getByRole('button', { name: 'Abort Failover' })).toHaveCount(0);
  });

  test('keyboard: holding Space runs the failover to completion', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /1-CLICK FAILOVER/ }).focus();
    await page.keyboard.down(' ');
    await page.waitForTimeout(1400);
    await page.keyboard.up(' ');

    await expect(page.getByText('TARGET SECURED', { exact: true }).last()).toBeVisible({
      timeout: 10_000,
    });
    await page.getByRole('button', { name: 'Reset to Standby' }).click();
    await expect(page.getByRole('button', { name: /1-CLICK FAILOVER/ })).toBeVisible();
  });

  test('chaos mode label stays inside its card', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Chaos/ }).click();
    const label = page.getByText('DEGRADED JITTER');
    await expect(label).toBeVisible();
    const fits = await label.evaluate((el) => {
      const card = el.parentElement!.getBoundingClientRect();
      return el.getBoundingClientRect().right <= card.right + 0.5;
    });
    expect(fits).toBe(true);
  });

  test('no horizontal page scroll', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('AWS DRS tab shows telemetry and the audit log', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /AWS DRS & Telemetry/ }).click();
    await expect(page.getByText('Live Replication & Audit Stream')).toBeVisible();
  });

  test('honors reduced motion', async ({ page }) => {
    const errors = trackErrors(page);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('canvas')).toBeVisible();
    expect(errors).toEqual([]);
  });
});

test.describe('Investor deck', () => {
  test('all 7 slides render without errors', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('/');
    await page.getByRole('button', { name: /Investor Deck/ }).click();
    for (let slide = 1; slide <= 7; slide++) {
      await expect(page.getByText(`Slide ${slide} of 7`)).toBeVisible();
      if (slide < 7) await page.getByRole('button', { name: 'Next slide' }).click();
    }
    expect(errors).toEqual([]);
  });

  test('cites sources on the problem and market slides', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Investor Deck/ }).click();
    await page.getByRole('button', { name: 'Go to slide 2' }).click();
    await expect(page.getByText(/EMA 2024/)).toBeVisible();
    await page.getByRole('button', { name: 'Go to slide 4' }).click();
    await expect(page.getByText(/MarketsandMarkets, Jan 2026/)).toBeVisible();
  });
});

test.describe('Security', () => {
  test('the Content-Security-Policy blocks nothing the app needs, on every screen', async ({
    page,
  }) => {
    const violations: string[] = [];
    page.on('console', (m) => {
      if (/Content Security Policy|Refused to/i.test(m.text())) violations.push(m.text());
    });
    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (e) => {
        console.error(`Refused to load (CSP): ${e.violatedDirective} ${e.blockedURI}`);
      });
    });
    await page.goto('/');
    await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveCount(1);
    await expect(page.locator('canvas')).toBeVisible();
    await page.getByRole('button', { name: /AWS DRS & Telemetry/ }).click();
    await expect(page.getByText('Live Replication & Audit Stream')).toBeVisible();
    await page.getByRole('button', { name: /Share on phone/i }).click();
    await expect(page.getByTestId('share-qr')).toBeVisible();
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: /Investor Deck/ }).click();
    for (let slide = 1; slide <= 7; slide++) {
      await expect(page.getByText(`Slide ${slide} of 7`)).toBeVisible();
      if (slide < 7) await page.getByRole('button', { name: 'Next slide' }).click();
    }
    expect(violations).toEqual([]);
  });
});
