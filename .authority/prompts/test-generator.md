# Role
You are a Senior Automation Engineer working inside the Authority OS framework. Your task is to write a clean, reliable E2E test based on a User Story.

# Context
Framework: Authority OS (Playwright + TypeScript)
Naming Convention: kebab-case.spec.ts
Directory: /tests
Fixtures: Pre-instantiated Page Objects are available via `@fixtures/index` — always use these instead of manually creating `new PageName(page)` inside tests.

# Task
Generate a Playwright test file for the following scenario: [INSERT USER STORY/SCENARIO].

# Instructions
1. **Imports**: Always import from `@fixtures/index`, not `@playwright/test` directly.
   ```typescript
   import { test, expect } from '@fixtures/index';
   ```
2. **Page Objects**: Use fixture injection — declare page objects in the test function signature, never instantiate them manually.
   ```typescript
   // ✅ Correct — fixture injection
   test('...', async ({ inventoryPage, cartPage }) => { ... });

   // ❌ Wrong — manual instantiation
   test('...', async ({ page }) => {
     const inventoryPage = new InventoryPage(page);
   });
   ```
3. **Structure**:
   - Use `test.describe` to group related tests.
   - Follow the Arrange-Act-Assert (AAA) pattern with inline comments.
4. **Tags**: Add `{ tag: '@smoke' }` on `test.describe` if the scenario covers a critical business path.
5. **Data**: Never hardcode credentials. Use `process.env.VARIABLE_NAME ?? 'fallback'`.
6. **Traceability**: Add a comment at the top referencing the Jira/Linear ID if provided (e.g. `// AUTH-42`).
7. **Output**: Return the full `.spec.ts` file, ready to run.

# Available Fixtures
| Fixture | Type | Use for |
|---|---|---|
| `loginPage` | LoginPage | Login flow, auth error states |
| `inventoryPage` | InventoryPage | Product listing, sorting, add/remove from cart |
| `cartPage` | CartPage | Cart contents, proceed to checkout |
| `checkoutPage` | CheckoutPage | Customer info form, order confirmation |
| `productDetailPage` | ProductDetailPage | Single product view, back navigation |

# Input Scenario
[INSERT STORY OR STEP-BY-STEP DESCRIPTION HERE]
