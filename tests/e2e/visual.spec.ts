import { expect, test } from '@playwright/test';

import { loginAsAdmin } from './helpers/auth';

test.describe('@visual visual checks', () => {
  test('homepage navigation desktop snapshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Desktop visual baseline kept on chromium only');

    await page.goto('/');
    await expect(page.locator('#site-header')).toHaveScreenshot('public-home-header-desktop.png');
  });

  test('homepage navigation mobile snapshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Mobile Chrome', 'Mobile visual baseline kept on Mobile Chrome only');

    await page.goto('/');
    await page.getByTestId('nav-burger').click();
    await expect(page.locator('#site-header')).toHaveScreenshot('public-home-header-mobile.png');
  });

  test('koi catalogue top snapshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Desktop visual baseline kept on chromium only');

    await page.goto('/kois');
    await expect(page.locator('.filter-bar')).toHaveScreenshot('public-kois-filter-desktop.png');
  });

  test('azukari hero snapshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'Desktop visual baseline kept on chromium only');

    await page.goto('/azukari');
    await expect(page.locator('.hero-compact')).toHaveScreenshot('public-azukari-hero-desktop.png');
  });

  test('admin dashboard mobile snapshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'Mobile Chrome', 'Mobile visual baseline kept on Mobile Chrome only');

    await loginAsAdmin(page);
    await expect(page.locator('.content')).toHaveScreenshot('admin-dashboard-mobile.png', {
      animations: 'disabled',
    });
  });
});
