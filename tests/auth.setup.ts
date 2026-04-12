import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { STORAGE_STATE } from '../playwright.config'; // Import the path from config

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(process.env.STANDARD_USER!, process.env.PASSWORD!);

  // AUTHORITY RULE: Wait for a specific element that proves login is finished
  const inventoryList = page.locator('.inventory_list');
  await expect(inventoryList).toBeVisible({ timeout: 10000 });

  // Wait for network to be completely quiet
  await page.waitForLoadState('networkidle');

  // Save state to the EXACT path defined in config
  await page.context().storageState({ path: STORAGE_STATE });
  
  console.log('✅ Authority session saved successfully.');
});