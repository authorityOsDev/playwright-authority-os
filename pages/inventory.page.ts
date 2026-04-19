import { Locator, Page, test } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class InventoryPage extends BasePage {
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly itemList: Locator;
  readonly items: Locator;

  constructor(page: Page) {
    super(page);
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    // The sort dropdown is present on every inventory load — confirmed data-test attribute
    this.itemList = page.getByTestId('product-sort-container');
    // One "Add to cart" button per product — reliable item counter
    this.items = page.getByRole('button', { name: 'Add to cart' });
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addItemToCart(itemName: string) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    await this.clickElement(this.page.getByTestId(`add-to-cart-${slug}`), `Add "${itemName}" to cart`);
  }

  async removeItemFromCart(itemName: string) {
    const slug = itemName.toLowerCase().replace(/\s+/g, '-');
    await this.clickElement(this.page.getByTestId(`remove-${slug}`), `Remove "${itemName}" from cart`);
  }

  async openProductDetail(itemName: string) {
    // Filter by visible text to target the title link — the image link shares the same accessible name
    const titleLink = this.page.getByRole('link', { name: itemName }).filter({ hasText: itemName });
    await this.clickElement(titleLink, `Open product detail: "${itemName}"`);
  }

  async sortBy(option: string) {
    await test.step(`Sort products by: "${option}"`, async () => {
      await this.page.getByTestId('product-sort-container').selectOption(option);
    });
  }

  async getItemPrices(): Promise<number[]> {
    const texts = await this.page.getByTestId('inventory-item-price').allInnerTexts();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async openCart() {
    await this.clickElement(this.cartLink, 'Shopping Cart');
  }
}
