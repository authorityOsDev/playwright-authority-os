import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/inventory.page';

test.describe('Inventory Dashboard', { tag: '@smoke' }, () => {

  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.goto();
  });

  test('Should display product list', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.itemList).toBeVisible();
  });

  test('Should show at least 6 products', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.items).toHaveCount(6);
  });
});
