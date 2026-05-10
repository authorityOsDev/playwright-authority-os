/**
 * Authority OS — Custom Fixtures
 *
 * Extends Playwright's base `test` with pre-instantiated Page Objects.
 * Import `{ test, expect }` from here instead of '@playwright/test'
 * to get typed page objects injected automatically into every test.
 *
 * Usage:
 *   import { test, expect } from '@fixtures/index';
 *
 *   test('example', async ({ inventoryPage }) => {
 *     await inventoryPage.goto();
 *   });
 *
 * Adding a new Page Object:
 *   1. Create pages/my-page.page.ts extending BasePage
 *   2. Add it to the PageFixtures type below
 *   3. Add the fixture definition in test.extend()
 *   4. Import { test } from '@fixtures/index' in your spec file
 */

import { test as base, expect } from '@playwright/test';
import { LoginPage }         from '@pages/login.page';
import { InventoryPage }     from '@pages/inventory.page';
import { CartPage }          from '@pages/cart.page';
import { CheckoutPage }      from '@pages/checkout.page';
import { ProductDetailPage } from '@pages/product-detail.page';
import { ComponentsPage }    from '@pages/components.page';

type PageFixtures = {
  loginPage:         LoginPage;
  inventoryPage:     InventoryPage;
  cartPage:          CartPage;
  checkoutPage:      CheckoutPage;
  productDetailPage: ProductDetailPage;
  /**
   * componentsPage — advanced patterns demo (iFrame, Shadow DOM, Drag & Drop).
   * Use this fixture in tests that interact with embedded payment widgets,
   * custom web components, or sortable/kanban UI.
   */
  componentsPage:    ComponentsPage;
};

export const test = base.extend<PageFixtures>({

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  componentsPage: async ({ page }, use) => {
    await use(new ComponentsPage(page));
  },

});

// Re-export expect so tests only need one import
export { expect };
