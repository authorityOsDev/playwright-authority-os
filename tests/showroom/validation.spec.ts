import { test, expect } from '@playwright/test';
import { CartPage } from '@pages/cart.page';
import { CheckoutPage } from '@pages/checkout.page';

test.describe('Checkout Validation', () => {

  test('Should show error when checkout info is missing', async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Arrange — navigate to cart and proceed to checkout step
    await cartPage.goto();
    await cartPage.proceedToCheckout();

    // Act — attempt to continue without filling any customer info
    await checkoutPage.submitWithoutData();

    // Assert — validation error is displayed
    await expect(checkoutPage.errorMessage).toBeVisible();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });
});
