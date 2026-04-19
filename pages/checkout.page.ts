import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successHeader = page.locator('.complete-header');
  }

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fillField(this.firstNameInput, firstName, 'First Name');
    await this.fillField(this.lastNameInput, lastName, 'Last Name');
    await this.fillField(this.postalCodeInput, postalCode, 'Postal Code');
    await this.clickElement(this.continueButton, 'Continue Button');
  }

  async finish() {
    await this.clickElement(this.finishButton, 'Finish Button');
  }
}
