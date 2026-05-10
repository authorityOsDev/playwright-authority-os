import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { STORAGE_STATE } from '../playwright.config'; // Import the path from config

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER!, process.env.PASSWORD!);

  // AUTHORITY RULE: Assert on specific elements that prove login is complete.
  // URL + visible sort container are the canonical proof of successful authentication.
  // Do NOT use waitForLoadState('networkidle') — it is unreliable on SPAs and pages
  // with background polling, and these two assertions already guarantee readiness.
  await expect(page).toHaveURL(/inventory\.html/, { timeout: 10000 });
  await expect(page.getByTestId('product-sort-container')).toBeVisible();

  // Save state to the EXACT path defined in config
  await page.context().storageState({ path: STORAGE_STATE });
  
  console.log('✅ Authority session saved successfully.');
});