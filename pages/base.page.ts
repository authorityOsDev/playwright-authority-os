import { Page, Locator, test, FrameLocator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Enhanced click action with automatic logging for reporting
   * @param locator - Playwright locator for the element
   * @param name - Human-readable name of the element
   */
  protected async clickElement(locator: Locator, name: string) {
    await test.step(`Click on: "${name}"`, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.click();
    });
  }

  /**
   * Enhanced fill action with automatic logging for reporting
   * @param locator - Playwright locator for the element
   * @param value - Value to enter into the field
   * @param name - Human-readable name of the field
   */
  protected async fillField(locator: Locator, value: string, name: string) {
    await test.step(`Fill "${name}" with: "${value}"`, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.fill(value);
    });
  }

  /**
   * Waits for the page to reach a stable state (network and DOM)
   */
  async waitForPageStability() {
    await test.step('Waiting for page stability...', async () => {
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForLoadState('domcontentloaded');
    });
  }

  /**
   * Authority Wrapper: Click with Retry
   * Use this for stubborn elements that might not be ready for JS events
   * even if they are visible.
   */
  protected async clickWithRetry(locator: Locator, name: string, retries = 3) {
    await test.step(`Resilient click on: "${name}"`, async () => {
      for (let i = 0; i < retries; i++) {
        try {
          await locator.click({ timeout: 3000 });
          return;
        } catch (error) {
          if (i === retries - 1) throw error;
          console.log(`Retrying click on ${name}... (${i + 1})`);
        }
      }
    });
  }

  /**
   * iFrame Helper
   * Simplifies interaction with nested frames (e.g., Stripe, PayPal, Chatbots)
   */
  protected getFrame(selector: string): FrameLocator {
    return this.page.frameLocator(selector);
  }

  /**
   * Shadow DOM Input Wrapper
   * Playwright handles Shadow DOM automatically, but this ensures
   * we handle it with our standard logging and waiting.
   */
  protected async fillShadowField(selector: string, value: string, name: string) {
    await test.step(`Fill Shadow DOM field "${name}"`, async () => {
      const field = this.page.locator(selector);
      await field.fill(value);
    });
  }

  /**
   * Reliable Drag and Drop
   * Essential for modern dashboards and Kanban boards.
   */
  protected async dragTo(source: Locator, target: Locator, name: string) {
    await test.step(`Dragging element: "${name}"`, async () => {
      await source.dragTo(target);
    });
  }
}
