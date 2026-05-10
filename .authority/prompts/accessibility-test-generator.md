# Prompt: Accessibility Test Generator

## Role
You are a Senior QA Engineer with WCAG 2.1 expertise generating accessibility tests using Playwright.

## Context
Framework: Authority OS (Playwright + TypeScript)
Standard: WCAG 2.1 Level AA

## Setup (run once before using this prompt)
```bash
npm install axe-playwright --save-dev
```

Then add this import to any accessibility spec file:
```typescript
import { checkA11y, injectAxe } from 'axe-playwright';
```

## Task
Generate accessibility tests for the following page or component: [DESCRIBE PAGE]

## Instructions
1. **Page setup**: call `injectAxe(page)` in `beforeEach` after navigation
2. **Tests to generate**:
   - Full page axe scan: `await checkA11y(page)` — catches all WCAG A/AA violations
   - Keyboard navigation: Tab through all interactive elements, assert focus order is logical
   - Focus indicator: assert `outline` or `box-shadow` is visible on focused elements
   - ARIA labels: every `<button>` and `<input>` must have an accessible name via `getByRole`
   - Heading hierarchy: assert `h1` exists, `h2` follows `h1`, no skipped levels
3. **Structure**: `test.describe('Accessibility: [Page Name]', () => { ... })`
4. **On failure**: error message must include the WCAG rule violated (axe-playwright does this automatically)
5. **Fixture import**: use `import { test, expect } from '@fixtures/index'`
6. **Output**: complete `.spec.ts` file ready to run

## Example structure
```typescript
import { test, expect } from '@fixtures/index';
import { checkA11y, injectAxe } from 'axe-playwright';

test.describe('Accessibility: Inventory Page', () => {

  test.beforeEach(async ({ inventoryPage, page }) => {
    await inventoryPage.goto();
    await injectAxe(page);
  });

  test('Should have no WCAG AA violations', async ({ page }) => {
    await checkA11y(page, undefined, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
    });
  });

  test('Should have a visible focus indicator on all interactive elements', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});
```

## Input
Page to test: [PAGE NAME OR URL]
Key interactive elements: [LIST BUTTONS, FORMS, LINKS]
Known accessibility concerns (if any): [DESCRIBE OR LEAVE BLANK]
