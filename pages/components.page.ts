/**
 * ComponentsPage — Authority OS Advanced Patterns Demo
 *
 * Demonstrates three BasePage helpers that handle challenging UI patterns:
 *   1. iFrame interaction  (e.g. Stripe, PayPal, embedded chat)
 *   2. Shadow DOM input    (e.g. custom web components)
 *   3. Drag and Drop       (e.g. Kanban boards, sortable lists)
 *
 * These are not tested against saucedemo (which has none of these elements).
 * They are ready-to-use patterns — copy, update the selectors, and go.
 */
import { Locator, Page, test } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ComponentsPage extends BasePage {

  // ── iFrame: Stripe payment widget ──────────────────────────────────────────
  private readonly stripeFrameSelector = 'iframe[name="stripe-card"]';

  // Locator inside the frame — resolved via BasePage.getFrame()
  readonly cardNumberInput: Locator;
  readonly cardExpiryInput: Locator;
  readonly cardCvcInput:    Locator;

  // ── Shadow DOM: custom search component ────────────────────────────────────
  private readonly shadowSearchSelector = 'custom-search-bar >>> input';

  // ── Drag and Drop: Kanban board ────────────────────────────────────────────
  readonly kanbanCard:   Locator;
  readonly kanbanTarget: Locator;

  constructor(page: Page) {
    super(page);

    const frame = this.getFrame(this.stripeFrameSelector);
    this.cardNumberInput = frame.locator('#card-number');
    this.cardExpiryInput = frame.locator('#card-expiry');
    this.cardCvcInput    = frame.locator('#card-cvc');

    this.kanbanCard   = page.getByTestId('kanban-card').first();
    this.kanbanTarget = page.getByTestId('kanban-column-done');
  }

  // ── iFrame methods ──────────────────────────────────────────────────────────

  async fillPaymentDetails(cardNumber: string, expiry: string, cvc: string) {
    await test.step('Fill Stripe payment details', async () => {
      await this.cardNumberInput.fill(cardNumber);
      await this.cardExpiryInput.fill(expiry);
      await this.cardCvcInput.fill(cvc);
    });
  }

  // ── Shadow DOM methods ──────────────────────────────────────────────────────

  async searchInShadowDom(query: string) {
    await this.fillShadowField(this.shadowSearchSelector, query, 'Shadow DOM search');
  }

  // ── Drag and Drop methods ───────────────────────────────────────────────────

  async moveCardToDone() {
    await this.dragTo(this.kanbanCard, this.kanbanTarget, 'Kanban card → Done column');
  }
}
