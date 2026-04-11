import { expect, test } from '@playwright/test';

import { loginAsAdmin } from './helpers/auth';

const adminIndexRoutes = [
  '/admin/dashboard',
  '/admin/kois',
  '/admin/products',
  '/admin/orders',
  '/admin/payments',
  '/admin/clients',
  '/admin/messages',
  '/admin/newsletter',
];

test.describe('admin area', () => {
  test('@smoke redirects guests to the sign-in page', async ({ page }) => {
    await page.goto('/admin/dashboard');

    await expect(page).toHaveURL(/\/users\/sign_in$/);
    await expect(page.getByText('Administration')).toBeVisible();
  });

  test('@smoke loads the main admin index pages after login', async ({ page }) => {
    await loginAsAdmin(page);

    for (const path of adminIndexRoutes) {
      await page.goto(path);
      await expect(page).toHaveURL(new RegExp(`${path.replace(/\//g, '\\/')}$`));
      await expect(page.getByTestId('admin-topbar-title')).toContainText(/\S+/);
      await expect(page.getByTestId('admin-sidebar')).toBeVisible();
    }
  });

  test('opens the main admin creation forms', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/admin/kois/new');
    await expect(page).toHaveURL(/\/admin\/kois\/new$/);
    await expect(page.locator('#koi-form')).toBeVisible();

    await page.goto('/admin/products/new');
    await expect(page).toHaveURL(/\/admin\/products\/new$/);
    await expect(page.getByRole('button', { name: 'Enregistrer le produit' })).toBeVisible();
  });

  test('mobile sidebar opens and navigates to catalogue koi', async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes('Mobile'), 'Mobile check only');

    await loginAsAdmin(page);

    const menuButton = page.getByTestId('admin-menu-burger');
    const sidebar = page.getByTestId('admin-sidebar');

    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(sidebar).toBeVisible();

    await page.getByTestId('admin-nav-kois').dispatchEvent('click');
    await expect(page).toHaveURL(/\/admin\/kois$/);
    await expect(page.getByTestId('admin-topbar-title')).toContainText(/\S+/);
  });

  test('admin seeded data is visible on key pages', async ({ page }) => {
    await loginAsAdmin(page);

    await page.goto('/admin/products?q=Pompe+E2E');
    await expect(page.getByText('Pompe E2E')).toBeVisible();

    await page.goto('/admin/orders?q=Client+E2E');
    await expect(page.getByText('Client E2E')).toBeVisible();

    await page.goto('/admin/payments?q=Client+E2E&overdue=1');
    await expect(page.getByText(/En retard|Pending|En attente/i).first()).toBeVisible();

    await page.goto('/admin/messages?q=alice.e2e%40example.com');
    await expect(page.getByText('Alice E2E')).toBeVisible();
  });

  test('admin can create a product from the form', async ({ page }, testInfo) => {
    await loginAsAdmin(page);

    const reference = `PW-${testInfo.project.name.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}`;

    await page.goto('/admin/products/new');
    await page.getByLabel('Nom').fill('Produit Playwright');
    await page.getByLabel('Reference').fill(reference);
    await page.getByLabel('Categorie').selectOption('materiel');
    await page.getByLabel('Statut').selectOption('active');
    await page.getByLabel('Prix (€)').fill('99.90');
    await page.getByLabel('Stock').fill('6');
    await page.getByLabel('Description').fill('Produit cree automatiquement par Playwright.');
    await page.getByRole('button', { name: 'Enregistrer le produit' }).click();

    await expect(page).toHaveURL(/\/admin\/products$/);
    await expect(page.getByText('Product created successfully.')).toBeVisible();
    await expect(page.getByText(reference)).toBeVisible();
  });
});
