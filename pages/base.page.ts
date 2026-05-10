import { Page, Locator, test, FrameLocator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Click with automatic Allure step logging.
   * Playwright's built-in auto-waiting handles readiness — no manual waits needed.
   */
  protected async clickElement(locator: Locator, name: string) {
    await test.step(`Click on: "${name}"`, async () => {
      await locator.click();
    });
  }

  /**
   * Fill a field with automatic Allure step logging.
   */
  protected async fillField(locator: Locator, value: string, name: string) {
    await test.step(`Fill "${name}" with: "${value}"`, async () => {
      await locator.fill(value);
    });
  }

  /**
   * Wait for the page to finish navigating by asserting a known stable locator.
   * Prefer passing a locator that is always present on the destination page
   * (e.g. a heading or nav element) over using networkidle, which is unreliable
   * on SPAs and pages with background polling.
   *
   * Usage: await this.waitForReady(this.page.getByTestId('product-sort-container'));
   */
  protected async waitForReady(stableLocator: Locator) {
    await test.step('Waiting for page to be ready...', async () => {
      await stableLocator.waitFor({ state: 'visible' });
    });
  }

  /**
   * iFrame Helper — simplifies interaction with nested frames (Stripe, PayPal, chatbots).
   */
  protected getFrame(selector: string): FrameLocator {
    return this.page.frameLocator(selector);
  }

  /**
   * Shadow DOM Input Wrapper — Playwright handles Shadow DOM automatically.
   * This wrapper adds consistent Allure step logging.
   */
  protected async fillShadowField(selector: string, value: string, name: string) {
    await test.step(`Fill Shadow DOM field "${name}"`, async () => {
      await this.page.locator(selector).fill(value);
    });
  }

  /**
   * Reliable Drag and Drop — essential for Kanban boards and sortable lists.
   */
  protected async dragTo(source: Locator, target: Locator, name: string) {
    await test.step(`Dragging element: "${name}"`, async () => {
      await source.dragTo(target);
    });
  }
}
