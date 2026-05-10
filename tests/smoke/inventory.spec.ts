import { test, expect } from '@fixtures/index';

test.describe('Inventory Dashboard', { tag: '@smoke' }, () => {

  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('Should display product list', async ({ page, inventoryPage }) => {
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.itemList).toBeVisible();
  });

  test('Should show at least 6 products', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(6);
  });
});
