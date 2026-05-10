import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ProductDetailPage extends BasePage {
  readonly productName:  Locator;
  readonly productPrice: Locator;
  readonly productDesc:  Locator;
  readonly addToCart:    Locator;
  readonly removeButton: Locator;
  readonly backButton:   Locator;

  constructor(page: Page) {
    super(page);
    this.productName  = page.getByTestId('inventory-item-name');
    this.productPrice = page.getByTestId('inventory-item-price');
    this.productDesc  = page.getByTestId('inventory-item-desc');
    this.addToCart    = page.getByTestId('add-to-cart');
    this.removeButton = page.getByTestId('remove');
    this.backButton   = page.getByTestId('back-to-products');
  }

  async verifyLoaded() {
    await this.waitForReady(this.productName);
  }

  async getName(): Promise<string> {
    return this.productName.innerText();
  }

  async getPrice(): Promise<number> {
    const text = await this.productPrice.innerText();
    return parseFloat(text.replace('$', ''));
  }

  async addProductToCart() {
    await this.clickElement(this.addToCart, 'Add to Cart');
  }

  async removeProductFromCart() {
    await this.clickElement(this.removeButton, 'Remove from Cart');
  }

  async goBackToProducts() {
    await this.clickElement(this.backButton, 'Back to Products');
  }
}
