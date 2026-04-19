import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class CartPage extends BasePage {
  // Count items via their Remove buttons — one per item, data-test prefixed with "remove-"
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('[data-test^="remove-"]');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async goto() {
    await this.page.goto('/cart.html');
  }

  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton, 'Checkout Button');
  }
}
