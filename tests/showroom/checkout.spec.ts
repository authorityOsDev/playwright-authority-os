import { test, expect } from '@playwright/test';
import { EnvFactory } from '../../utils/env-factory';

test.describe('E2E: Purchase Workflow', () => {
  
  test('Should complete checkout from cart to finish', async ({ page }) => {
    // Navigate using dynamic EnvFactory
    await page.goto(EnvFactory.baseUrl);
    
    // Auth is handled via global setup, but we use POM for interactions
    await page.goto('/inventory.html');

    // 1. Add items to cart using resilient selectors
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('.shopping_cart_link').click();

    // 2. Proceed to checkout
    await page.locator('[data-test="checkout"]').click();

    // 3. Fill customer info
    await page.locator('[data-test="firstName"]').fill('John');
    await page.locator('[data-test="lastName"]').fill('Doe');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();

    // 4. Final verification
    await page.locator('[data-test="finish"]').click();
    const successHeader = page.locator('.complete-header');
    await expect(successHeader).toHaveText('Thank you for your order!');
  });
});