# 🏛️ Authority OS — Architecture Guide

---

## 1. Core Design Principles

Authority OS is built on four principles:

| Principle | Implementation |
|---|---|
| **Isolation** | Each test is independent — no shared state between tests |
| **Resilience** | Web-first assertions, smart retries, session reuse |
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
- `clickWithRetry(locator, label)` — retry on failure
- `dragTo(source, target)` — drag and drop with logging
- `getFrame(name)` — iframe access
- `fillShadowField(selector, value)` — shadow DOM support

This means every test automatically produces a structured Allure report with named steps — no extra annotation needed.

---

## 3. Authentication Strategy

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

**Result:** Login UI is skipped for all 37 test executions. ~10-15 seconds saved per test = ~6 minutes per full run.

---

## 4. Configuration: testIdAttribute

saucedemo uses `data-test` attributes, not Playwright's default `data-testid`. A single config line fixes all `getByTestId()` calls globally:

```typescript
// playwright.config.ts
use: {
  testIdAttribute: 'data-test',
}
```

This means `page.getByTestId('checkout')` maps to `[data-test="checkout"]` — no custom selectors needed anywhere.

---

## 5. CI/CD Pipeline Architecture

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
│  37 tests  │  37 tests │  37 tests │
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

---

## 6. Environment Factory

Tests never hardcode URLs or credentials:

```typescript
// utils/env-factory.ts
export class EnvFactory {
  static get baseUrl(): string {
    const env = process.env.ENV || 'staging';
    const urls = {
      staging: process.env.BASE_URL || 'https://www.saucedemo.com',
      prod:    process.env.PROD_URL  || 'https://www.saucedemo.com',
    };
    return urls[env] ?? urls.staging;
  }
}
```

Switch environments without touching test code:
```bash
ENV=prod npm test
ENV=staging npm run test:smoke
```

---

## 7. Notion Integration Bridge

After every CI run, `utils/notion-update.ts` reads `test-results/results.json` and writes to the Notion CI Run History database:

```
test-results/results.json
         ↓
notion-update.ts calculates:
  - totalTests = expected + unexpected + flaky
  - passedTests = expected
  - status = unexpected === 0 ? 'Passed' : 'Failed'
  - durationSec = duration / 1000
         ↓
Notion API → pages.create() → CI Run History database
  - Scenario: "Build #42 — Passed"
  - Status: Passed
  - Total Tests: 37
  - Passed: 37
  - Success Rate: 100% (Notion formula)
  - Duration (s): 16
  - Report Link: https://authority-os-report.surge.sh
  - Run Date: 2026-04-19T20:10:00Z
```

---

## 8. Reporter Stack

Each test run produces three outputs simultaneously:

| Reporter | Output | Purpose |
|---|---|---|
| `html` | `playwright-report/` | Local debug |
| `allure-playwright` | `allure-results/` | Rich visual report → Surge.sh |
| `json` | `test-results/results.json` | Machine-readable → Notion bridge |

---

## 9. Path Aliases

All imports use TypeScript path aliases — no relative path hell:

```typescript
import { CheckoutPage } from '@pages/checkout.page';
import { EnvFactory }   from '@utils/env-factory';
import testData         from '@data/users.json';
```

Configured in `tsconfig.json`:
```json
"paths": {
  "@pages/*": ["pages/*"],
  "@utils/*": ["utils/*"],
  "@data/*":  ["data/*"]
}
```

---

## 10. AI Integration

`.authority/prompts/` contains two prompt templates:

- **`page-object-creator.md`** — provide a URL and element descriptions, get a complete Page Object
- **`test-generator.md`** — provide a scenario description, get a complete spec file following AAA pattern

`CLAUDE.md` at the project root instructs Claude Code on architecture rules, naming conventions, and forbidden patterns — ensuring AI-generated code is always compliant with Authority OS standards.
