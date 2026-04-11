import { expect, Page } from '@playwright/test';

const ADMIN_EMAIL = 'contact.koistory@gmail.com';
const ADMIN_PASSWORD = 'changeme';

export async function loginAsAdmin(page: Page) {
  await page.goto('/admin');

  await expect(page).toHaveURL(/\/users\/sign_in$/);
  await page.getByPlaceholder('Adresse email').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('Mot de passe').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL(/\/admin/, { timeout: 15_000 });
  await expect(page.getByTestId('admin-sidebar')).toBeVisible();
}
