# Authority OS - Project Guide

## Build & Test Commands
- Install dependencies: `npm install`
- Run all tests: `npm test`
- Run smoke tests: `npm run test:smoke`
- Run specific test: `npx playwright test <file-path>`
- Run headed (visible browser): `npm run test:headed`
- Debug mode: `npm run test:debug`
- Generate Allure report: `npm run report:generate`
- Open Allure report: `npm run report:open`
- Lint: `npm run lint`

## Code Style & Architecture
- **Framework:** Playwright with TypeScript.
- **Pattern:** Strict Page Object Model (POM). Page objects must reside in `/pages` and tests in `/tests`.
- **Naming Conventions:**
  - Page Objects: `PascalCase` (e.g., `LoginPage.ts`).
  - Test files: `kebab-case.spec.ts` (e.g., `checkout-flow.spec.ts`).
- **Locators:** Prioritize Playwright's `getByRole`, `getByText`, and `getByTestId`. Avoid CSS selectors and XPaths.
- **Assertions:** Use web-first assertions (e.g., `await expect(locator).toBeVisible()`).

## Error Handling
- If tests fail, check `test-results/` for traces: `npx playwright show-trace test-results/**/trace.zip`
- For a full list of CLI commands, see `authority-tools.json` (command reference card).
- When fixing code, always verify that the fix doesn't break existing `auth.setup.ts` logic.

## AI Prompt Library
- Guidelines for generating code are located in `.authority/prompts/`.
- Use `page-object-creator.md` when adding new UI components.
- Use `test-generator.md` for implementing new test scenarios.