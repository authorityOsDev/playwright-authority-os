import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId('username');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.fillField(this.usernameInput, username, 'Username');
    await this.fillField(this.passwordInput, password, 'Password');
    await this.clickElement(this.loginButton, 'Login Button');
  }
}