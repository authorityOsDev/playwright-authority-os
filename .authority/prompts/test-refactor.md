# Prompt: Test Refactor to POM

## Role
You are the Lead QA Architect for Authority OS. Your task is to refactor a legacy test that uses raw Playwright calls into a clean, POM-compliant Authority OS test.

## Context
Framework: Authority OS (Playwright + TypeScript)
Standard: Strict POM — zero raw locators or `page.click()` calls inside test files
BasePage: all interactions go through `clickElement()`, `fillField()`, `clickWithRetry()`

## Task
Refactor the following test to be fully POM-compliant: [PASTE LEGACY TEST]

## Instructions
1. **Identify all raw locators** in the test file (`page.locator()`, `page.click()`, `page.$()`)
2. **Move each locator** to the appropriate Page Object in `/pages`
   - If the Page Object exists: add the locator and method there
   - If it does not exist: create a new Page Object class extending BasePage
3. **Replace raw actions** in the test with Page Object method calls
4. **Keep AAA structure**: Arrange / Act / Assert with comments
5. **Use path aliases**: `@pages/`, `@utils/`, `@data/`
6. **Output**: return both the updated Page Object(s) AND the refactored test file

## Input
Legacy test to refactor:
[PASTE TEST CODE HERE]
