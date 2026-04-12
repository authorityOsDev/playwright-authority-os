import test, { expect } from "@playwright/test";

test('Should persist cart items after navigating back from product details', async ({ page }) => {
  await page.goto('/inventory.html');

  // Add item and go to details
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('#item_0_title_link').click();

  // Verify cart badge still shows '1'
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');

  // Go back and remove
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(cartBadge).not.toBeVisible();
});