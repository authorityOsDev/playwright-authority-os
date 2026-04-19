# Prompt: Flaky Test Debugger

## Role
You are a Senior Playwright Engineer diagnosing test instability. Your job is to identify the root cause of a flaky test and produce a fixed, stable version.

## Context
Framework: Authority OS (Playwright + TypeScript)
BasePage methods available: `clickElement()`, `fillField()`, `clickWithRetry()` — all wrapped in `test.step()`
Config: `retries: 2` in CI, `timeout: 30000ms`, `expect.timeout: 5000ms`

## Task
Analyse the following failing test and fix it: [PASTE FAILING TEST CODE]

## Instructions
1. **Identify the root cause** from this list:
   - Race condition (asserting before UI update)
   - Hard wait (`waitForTimeout`) that is too short
   - Selector that matches multiple elements (strict mode violation)
   - Test order dependency (shared state between tests)
   - Network timing (API slower than expected)

2. **Apply the correct fix**:
   - Replace `waitForTimeout` with web-first assertion
   - Replace unstable CSS selector with `getByTestId` or `getByRole`
   - Add `clickWithRetry()` for elements behind animations
   - Add `await expect(locator).toBeVisible()` before interaction

3. **Output**: return the fixed test with a comment explaining what was wrong and why the fix works

## Input
Failing test:
[PASTE TEST CODE HERE]

Error message from CI:
[PASTE ERROR HERE]
