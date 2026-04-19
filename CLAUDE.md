# Authority OS - Project Guide

## Build & Test Commands
- Install dependencies: `npm install`
- Run all tests: `npx playwright test`
- Run specific test: `npx playwright test <file-path>`
- Run smoke tests: `npx playwright test --grep @smoke`
- Generate report: `npx allure generate ./allure-results --clean`
- View report: `npx allure open`

## Code Style & Architecture
- **Framework:** Playwright with TypeScript.
- **Pattern:** Strict Page Object Model (POM). Page objects must reside in `/pages` and tests in `/tests`.
- **Naming Conventions:**
  - Page Objects: `PascalCase` (e.g., `LoginPage.ts`).
  - Test files: `kebab-case.spec.ts` (e.g., `checkout-flow.spec.ts`).
- **Locators:** Prioritize Playwright's `getByRole`, `getByText`, and `getByTestId`. Avoid CSS selectors and XPaths.
- **Assertions:** Use web-first assertions (e.g., `await expect(locator).toBeVisible()`).

## Error Handling
- If tests fail, check `test-results/` for traces.
- Use `analyze_logs` tool (as defined in mcp-authority.json) to parse terminal output.
- When fixing code, always verify that the fix doesn't break existing `auth.setup.ts` logic.