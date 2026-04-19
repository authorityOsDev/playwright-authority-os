import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ComponentsPage extends BasePage {
  // Let's imagine a page with a nested iFrame for payments
  readonly creditCardFrame = 'iframe[name="stripe-card"]';
  readonly cardNumberInput: Locator;

  constructor(page: Page) {
    super(page);
    // Accessing elements inside the frame is now a one-liner
    this.cardNumberInput = this.getFrame(this.creditCardFrame).locator('#card-number');
  }

  async enterPaymentDetails(number: string) {
      await this.cardNumberInput.fill(number);
    }
  }
