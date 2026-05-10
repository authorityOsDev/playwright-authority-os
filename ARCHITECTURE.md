# 🏛️ Authority OS — Architecture Guide

---

## 1. Core Design Principles

Authority OS is built on four principles:

| Principle | Implementation |
|---|---|
| **Isolation** | Each test is independent — no shared state between tests |
| **Resilience** | Web-first assertions, Playwright auto-waiting, session reuse |
| **Observability** | Every action logged via test.step(), Allure steps, Notion updates |
| **Separation of concerns** | UI logic in Page Objects, business logic in tests, config in factories |

---

## 2. Page Object Model (Enhanced)

Standard POM puts locators and methods in a class. Authority OS extends this with a **BasePage wrapper layer**:

```
Test File
   ↓ calls
Page Object (e.g. CheckoutPage)
   ↓ extends
BasePage
   ↓ wraps every action in
test.step() → logged in Allure + Playwright trace
```

**BasePage provides:**
- `clickElement(locator, label)` — click with step logging
- `fillField(locator, value, label)` — fill with step logging
- `waitForReady(stableLocator)` — wait for a known stable element before asserting
- `dragTo(source, target, label)` — drag and drop with logging
- `getFrame(selector)` — iframe access
- `fillShadowField(selector, value, label)` — shadow DOM support

Playwright's built-in auto-waiting handles element readiness — no manual retry loops or `waitForLoadState('networkidle')` needed.

This means every test automatically produces a structured Allure report with named steps — no extra annotation needed.

---

## 3. Fixtures

Authority OS uses Playwright's `test.extend()` to inject pre-instantiated Page Objects directly into test function signatures — eliminating the boilerplate of `new PageName(page)` in every test.

```typescript
// fixtures/index.ts
export const test = base.extend<PageFixtures>({
  inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
  cartPage:      async ({ page }, use) => { await use(new CartPage(page)); },
  // ...
});
```

Usage in tests:
```typescript
import { test, expect } from '@fixtures/index';

test('checkout flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
  await inventoryPage.goto();
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  // ...
});
```

Every test gets fresh, typed page objects. No setup boilerplate. No shared state between tests.

---

## 4. Authentication Strategy

Login is expensive. Authority OS runs it **once** per test suite execution:

```
┌─────────────────┐
│  auth.setup.ts  │  ← runs once before ALL tests
│  (setup project)│
└────────┬────────┘
         │ saves session to .auth/user.json
         ↓
┌─────────────────────────────────┐
│  chromium  │  firefox  │  webkit │  ← all reuse stored session
└─────────────────────────────────┘
         │
         ↓
┌─────────────────┐
│ global-teardown │  ← deletes .auth/user.json after run
└─────────────────┘
```

**Result:** Login UI is skipped for all 51 test executions (17 tests × 3 browsers). ~10 seconds saved per test = **~8.5 minutes saved per full run**.

---

## 5. Configuration: testIdAttribute

saucedemo uses `data-test` attributes, not Playwright's default `data-testid`. A single config line fixes all `getByTestId()` calls globally:

```typescript
// playwright.config.ts
use: {
  testIdAttribute: 'data-test',
}
```

This means `page.getByTestId('checkout')` maps to `[data-test="checkout"]` — no custom selectors needed anywhere.

---

## 6. CI/CD Pipeline Architecture

```
push to main
     ↓
┌────────────────┐
│  quality-gate  │  ESLint + npm audit
└───────┬────────┘
        │ passes
        ↓
┌────────────────────────────────────┐
│           test (matrix)            │
│  chromium  │  firefox  │  webkit   │  ← parallel
│  auth →    │  auth →   │  auth →   │
│  17 tests  │  17 tests │  17 tests │
└───────┬────────────────────────────┘
        │ all pass (fail-fast: false)
        ↓
┌────────────────┐
│    publish     │
│  merge allure  │
│  → surge.sh    │  ← live report published
│  → notion API  │  ← dashboard updated
└────────────────┘
```

**Key decisions:**
- `fail-fast: false` — all browsers run even if one fails, giving full picture
- `retries: 2` in CI — handles transient network issues without false failures
- Notion update runs in `publish` job — fires once with combined results, not 3 times
- Both Surge and Notion steps fail loudly (`exit 1`) if something goes wrong

---

## 7. Environment Factory

Tests never hardcode URLs or credentials:

```typescript
// utils/env-factory.ts
export class EnvFactory {
  static get baseUrl(): string {
    if (process.env.BASE_URL) return process.env.BASE_URL;
    switch ((process.env.ENV || 'staging').toLowerCase()) {
      case 'prod': return 'https://www.saucedemo.com';
      default:     return 'https://www.saucedemo.com';
    }
  }
}
```

Switch environments without touching test code:
```bash
ENV=prod npm test
ENV=staging npm run test:smoke
```

---

## 8. Notion Integration Bridge

After every CI run, `utils/notion-update.ts` reads `test-results/results.json` and writes to the Notion CI Run History database:

```
test-results/results.json
         ↓
notion-update.ts calculates:
  - totalTests = expected + unexpected + flaky
  - passedTests = expected
  - status = unexpected === 0 ? 'Passed' : 'Failed'
  - durationSec = duration / 1000
  - reportLink = process.env.ALLURE_REPORT_URL
         ↓
Notion API → pages.create() → CI Run History database
  - Scenario: "Build #42 — Passed"
  - Status: Passed
  - Total Tests: 12
  - Passed: 12
  - Success Rate: 100% (Notion formula: prop("Passed") / prop("Total Tests"))
  - Duration (s): 16
  - Report Link: https://your-project.surge.sh
  - Run Date: 2026-05-10T10:00:00Z
```

---

## 9. Reporter Stack

Each test run produces three outputs simultaneously:

| Reporter | Output | Purpose |
|---|---|---|
| `html` | `playwright-report/` | Local debug |
| `allure-playwright` | `allure-results/` | Rich visual report → Surge.sh |
| `json` | `test-results/results.json` | Machine-readable → Notion bridge |

---

## 10. Path Aliases

All imports use TypeScript path aliases — no relative path hell:

```typescript
import { test, expect }  from '@fixtures/index';
import { CheckoutPage }  from '@pages/checkout.page';
import { EnvFactory }    from '@utils/env-factory';
import testData          from '@data/users.json';
```

Configured in `tsconfig.json`:
```json
"paths": {
  "@fixtures/*": ["fixtures/*"],
  "@pages/*":    ["pages/*"],
  "@utils/*":    ["utils/*"],
  "@data/*":     ["data/*"]
}
```

---

## 11. AI Integration

`.authority/prompts/` contains 15 prompt templates organized by task:

| Category | Prompts |
|---|---|
| **Core** | `test-generator.md`, `page-object-creator.md` |
| **Debugging** | `debug-flaky-test.md`, `test-fixer.md` |
| **Planning** | `smoke-suite-planner.md`, `e2e-scenario-planner.md`, `coverage-gap-analyzer.md` |
| **API & Data** | `api-test-generator.md`, `test-data-factory.md` |
| **Advanced** | `accessibility-test-generator.md`, `ci-pipeline-generator.md` |
| **Reporting** | `bug-report-generator.md`, `notion-report-generator.md` |
| **Refactoring** | `test-refactor.md`, `environment-setup-generator.md` |

`CLAUDE.md` at the project root instructs Claude Code on architecture rules, naming conventions, and forbidden patterns — ensuring AI-generated code is always compliant with Authority OS standards.
