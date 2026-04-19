import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ProductDetailPage extends BasePage {
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.backButton = page.getByTestId('back-to-products');
  }

  async goBackToProducts() {
    await this.clickElement(this.backButton, 'Back to Products');
  }
}
