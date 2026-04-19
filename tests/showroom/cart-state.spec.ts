import { test, expect } from '@playwright/test';
import { InventoryPage } from '@pages/inventory.page';
import { ProductDetailPage } from '@pages/product-detail.page';

test.describe('Cart State Persistence', () => {

  test('Should persist cart items after navigating back from product details', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);

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
