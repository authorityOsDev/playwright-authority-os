import { test, expect } from '@fixtures/index';

test.describe('Inventory Sorting', () => {

  test('Should sort products by price (Low to High)', async ({ inventoryPage }) => {

    // Arrange
    await inventoryPage.goto();

    // Act
    await inventoryPage.sortBy('lohi');

    // Assert — first price is numerically lower than last price
    const prices = await inventoryPage.getItemPrices();
    expect(prices.at(0)).toBeLessThan(prices.at(-1)!);
  });
});
