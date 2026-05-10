import { test, expect } from '@fixtures/index';

test.describe('Cart State Persistence', () => {

  test('Should persist cart items after navigating back from product details', async ({ inventoryPage, productDetailPage }) => {

    // Arrange
    await inventoryPage.goto();

    // Act — add item then navigate into product detail
    await inventoryPage.addItemToCart('Sauce Labs Bike Light');
    await inventoryPage.openProductDetail('Sauce Labs Bike Light');

    // Assert — cart badge persists across page navigation
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Act — return to inventory and remove the item
    await productDetailPage.goBackToProducts();
    await inventoryPage.removeItemFromCart('Sauce Labs Bike Light');

    // Assert — badge disappears when cart is empty
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });
});
