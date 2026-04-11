import { expect, test } from '@playwright/test';

test.describe('public pages', () => {
  test('@smoke homepage CTA leads to the koi catalogue', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: /Des koïs d'exception, issus de la lignée Konishi/i }),
    ).toBeVisible();

    await page.getByRole('link', { name: 'Voir le catalogue' }).click();

    await expect(page).toHaveURL(/\/kois$/);
    await expect(page.getByRole('heading', { name: 'Nos Koïs' })).toBeVisible();
  });

  test('@smoke azukari page keeps only the appointment note', async ({ page }) => {
    await page.goto('/azukari');

    await expect(page.getByText('Sur rendez-vous uniquement')).toBeVisible();
    await expect(page.getByText('Réponse sous 24 h')).toHaveCount(0);
  });

  test('koi filter bar keeps a stable width while scrolling', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name.includes('Mobile'), 'Desktop filter bar check only');

    await page.goto('/kois');

    const filterBar = page.getByTestId('koi-filter-inner');

    await expect(filterBar).toBeVisible();

    const before = await filterBar.boundingBox();
    test.expect(before).not.toBeNull();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(200);

    const after = await filterBar.boundingBox();
    test.expect(after).not.toBeNull();
    expect(Math.abs((before?.width ?? 0) - (after?.width ?? 0))).toBeLessThanOrEqual(1);
  });

  test('public contact form submits successfully', async ({ page }) => {
    const uniqueEmail = `playwright-contact-${Date.now()}@example.com`;

    await page.goto('/#contact');

    await page.getByTestId('contact-name').fill('Contact Playwright');
    await page.getByTestId('contact-email').fill(uniqueEmail);
    await page.getByTestId('contact-body').fill('Bonjour, ceci est un message de verification Playwright.');

    const humanCheck = page.getByTestId('contact-human-check');
    if (await humanCheck.count()) {
      await humanCheck.check();
    }

    await page.getByTestId('contact-submit').click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(page.getByText(/Votre message a bien ete envoye/i)).toBeVisible();
  });
});
