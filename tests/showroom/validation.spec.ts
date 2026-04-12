import test, { expect } from "@playwright/test";

test('Should show error when checkout info is missing', async ({ page }) => {
  await page.goto('/cart.html');
  await page.locator('[data-test="checkout"]').click();
  
  // Click continue without filling data
  await page.locator('[data-test="continue"]').click();

  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText('Error: First Name is required');
});