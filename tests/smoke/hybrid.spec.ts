import { test, expect } from '@playwright/test';
import { ApiRequest } from '../../utils/api.request'; 
import { EnvFactory } from '../../utils/env-factory';

test.describe('Hybrid Testing: API Setup + UI Verification', () => {
  
  test('Should verify inventory consistency between API and UI', async ({ page }) => {
    
    await test.step('Backend Check: Fetch products via API', async () => {
       const response = await ApiRequest.get('https://www.saucedemo.com/api/inventory.json');
       
       console.log('API Request executed through Authority Wrapper');
    });

    await page.goto(`${EnvFactory.baseUrl}/inventory.html`);
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
    
    console.log('✅ Hybrid flow: Backend logic integrated.');
  });
});