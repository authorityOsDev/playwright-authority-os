import { test, expect } from '@fixtures/index';

test.describe('Product Detail Page', () => {

  test('Should display correct product name and price', async ({ inventoryPage, productDetailPage }) => {

    // Arrange — navigate to inventory and open a product
    await inventoryPage.goto();
    await inventoryPage.openProductDetail('Sauce Labs Backpack');

    // Assert — page loaded and core data is visible
    await productDetailPage.verifyLoaded();
    const name  = await productDetailPage.getName();
    const price = await productDetailPage.getPrice();

    expect(name).toBe('Sauce Labs Backpack');
    expect(price).toBeGreaterThan(0);
  });

  test('Should add and remove product directly from detail page', async ({ inventoryPage, productDetailPage }) => {

    // Arrange
    await inventoryPage.goto();
    await inventoryPage.openProductDetail('Sauce Labs Bike Light');
    await productDetailPage.verifyLoaded();

    // Act — add to cart from detail page
    await productDetailPage.addProductToCart();

    // Assert — cart badge appears
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Act — remove from cart
    await productDetailPage.removeProductFromCart();

    // Assert — badge disappears
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

});
