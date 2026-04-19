// Scenario: Multi-item Checkout — adds two products and completes the full purchase flow
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/inventory.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';

test.describe('E2E: Multi-item Checkout', { tag: '@smoke' }, () => {

  test('Should complete checkout after adding Backpack and Bike Light to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Arrange — navigate to inventory (auth handled via global setup)
    await inventoryPage.goto();

    // Act — add both items and open cart
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.openCart();

    // Assert — both items present before proceeding
    await expect(cartPage.cartItems).toHaveCount(2);

    // Act — complete the checkout flow
    await cartPage.proceedToCheckout();
    await checkoutPage.fillCustomerInfo(
      process.env.CHECKOUT_FIRST_NAME ?? 'Jane',
      process.env.CHECKOUT_LAST_NAME ?? 'Doe',
      process.env.CHECKOUT_ZIP ?? '10001'
    );
    await checkoutPage.finish();

    // Assert — success message is visible on the confirmation page
    await expect(checkoutPage.successHeader).toBeVisible();
    await expect(checkoutPage.successHeader).toHaveText('Thank you for your order!');
  });
});
