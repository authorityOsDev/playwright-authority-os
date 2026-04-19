import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successHeader: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.successHeader = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.errorMessage = page.getByTestId('error');
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

  async submitWithoutData() {
    await this.clickElement(this.continueButton, 'Continue (without customer info)');
  }
}
