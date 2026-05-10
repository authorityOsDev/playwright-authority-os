import { test, expect } from '@fixtures/index';
import { ApiRequest }   from '@utils/api.request';
import { EnvFactory }   from '@utils/env-factory';

test.describe('Hybrid Testing: API Setup + UI Verification', { tag: '@smoke' }, () => {

  test('Should verify inventory consistency between API and UI', async ({ inventoryPage }) => {

    // Arrange — API pre-check: confirm the target environment is reachable
    const response = await ApiRequest.get(EnvFactory.baseUrl);
    expect(response.ok()).toBeTruthy();

    // Act — navigate to inventory via UI
    await inventoryPage.goto();

    // Assert — UI product count matches expected catalog size
    await expect(inventoryPage.items).toHaveCount(6);
  });
});
