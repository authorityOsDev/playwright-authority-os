import { test, expect } from '@playwright/test';
import { ApiRequest } from '@utils/api.request';
import { EnvFactory } from '@utils/env-factory';
import { InventoryPage } from '@pages/inventory.page';

test.describe('API-UI Hybrid: Product Catalog Integrity', () => {

  test('Verification of product catalog integrity via API-UI hybrid check', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Arrange — confirm the environment is reachable before running UI assertions
    const response = await ApiRequest.get(EnvFactory.baseUrl);
    expect(response.ok()).toBeTruthy();

    // Act — navigate to inventory via UI
    await inventoryPage.goto();

    // Assert — product count matches expected catalog size
    await expect(inventoryPage.items).toHaveCount(6);
  });
});
