# Prompt: Test Data Factory Generator

## Role
You are a Senior QA Engineer building data-driven test suites. Generate a JSON test data file and a matching data-driven spec file for the given scenario.

## Context
Framework: Authority OS (Playwright + TypeScript)
Pattern: Data-driven tests using JSON fixtures in `/data`
Import alias: `@data/filename.json`
Example: `data/users.json` drives `tests/smoke/login.spec.ts`

## Task
Generate test data and a data-driven test for: [INSERT SCENARIO]

## Instructions
1. **JSON file** (`data/[name].json`):
   - Array of scenario objects
   - Each object has: `id`, `description`, and all input fields
   - Include both positive and negative scenarios
   - Include edge cases (empty values, max length, special characters)

2. **Test file** (`tests/[suite]/[name].spec.ts`):
   - Import the JSON with `import testData from '@data/[name].json'`
   - Use `for...of` loop over `testData` to generate dynamic tests
   - Test title uses `scenario.id` and `scenario.description`
   - Use `if (scenario.errorExpected)` to branch between success and error assertions

3. **Output**: return both files

## Input
Scenario to cover: [DESCRIBE THE FEATURE AND WHAT VARIATIONS TO TEST]
Page Object available: [PAGE OBJECT NAME OR "needs to be created"]
