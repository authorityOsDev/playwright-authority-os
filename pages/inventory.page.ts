import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addItemToCart(itemName: string) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    const button = this.page.locator(`[data-test="add-to-cart-${slug}"]`);
    await this.clickElement(button, `Add "${itemName}" to cart`);
  }

  async openCart() {
    await this.clickElement(this.cartLink, 'Shopping Cart');
  }
}
