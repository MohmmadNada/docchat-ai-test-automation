import { test as setup } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USER_NAME!, process.env.USER_PASSWORD!);
  await page.waitForURL('/');
  await page.context().storageState({ path: 'storageState.json' });
});
