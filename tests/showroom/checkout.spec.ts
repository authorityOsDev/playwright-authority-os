import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/inventory.page';
import { CartPage } from '@pages/cart.page';
import { CheckoutPage } from '@pages/checkout.page';

test.describe('E2E: Purchase Workflow', () => {

  test('Should complete checkout from cart to finish', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Arrange — navigate to inventory (auth handled via global setup)
    await inventoryPage.goto();

    // Act — add item and open cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    // Act — complete the checkout flow
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(
      process.env.CHECKOUT_FIRST_NAME ?? 'John',
      process.env.CHECKOUT_LAST_NAME ?? 'Doe',
      process.env.CHECKOUT_ZIP ?? '12345'
    );
    await checkoutPage.finish();

    // Assert — success message is visible on the confirmation page
    await expect(checkoutPage.successHeader).toBeVisible();
    await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
  });
});