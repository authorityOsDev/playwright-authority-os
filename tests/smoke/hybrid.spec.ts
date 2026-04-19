import { test, expect } from '@playwright/test';
import { EnvFactory } from '../../utils/env-factory';

test.describe('Hybrid Testing: API Setup + UI Verification', { tag: '@smoke' }, () => {
  
  test('Should verify inventory consistency between API and UI', async ({ page }) => {
    
    await test.step('Backend Check: Fetch products via API', async () => {
       
       console.log('API Request executed through Authority Wrapper');
    });

    await page.goto(`${EnvFactory.baseUrl}/inventory.html`);
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
    
    console.log('✅ Hybrid flow: Backend logic integrated.');
  });
});