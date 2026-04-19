import { test, expect } from '@playwright/test';

test.describe('Inventory Dashboard', { tag: '@smoke' }, () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the protected page
    await page.goto('/inventory.html');
  });

  test('Should display product list', async ({ page }) => {
    // If global auth works, we are already here
    await expect(page).toHaveURL(/inventory.html/);
    const inventoryList = page.locator('.inventory_list');
    await expect(inventoryList).toBeVisible();
  });

  test('Should show at least 6 products', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
  });
});