import { test, expect } from '@playwright/test';
import { ApiRequest } from '../../utils/api.request';

test('Verification of product catalog integrity via API-UI hybrid check', async ({ page }) => {
  // In a real Authority OS, we fetch metadata before UI assertions
  await test.step('Fetch Catalog Metadata', async () => {
    // Using our custom wrapper to log API call in the report
    await ApiRequest.get('https://www.saucedemo.com/inventory.html');
  });

  await page.goto('/inventory.html');
  const items = page.locator('.inventory_item');
  
  // High-level business assertion
  await expect(items).toHaveCount(6);
});