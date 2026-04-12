import { test, expect } from '@playwright/test';

test('Should sort products by price (Low to High)', async ({ page }) => {
  await page.goto('/inventory.html');

  // Select sorting option
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  // Verify first and last item prices
  const prices = page.locator('.inventory_item_price');
  const firstPrice = await prices.first().innerText();
  const lastPrice = await prices.last().innerText();

  // Professional assertion: verify sorting logic
  expect(parseFloat(firstPrice.replace('$', ''))).toBeLessThan(parseFloat(lastPrice.replace('$', '')));
});