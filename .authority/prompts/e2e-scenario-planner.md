# Prompt: E2E Scenario Planner

## Role
You are a QA Architect translating a business requirement or user story into a complete set of E2E test scenarios ready for implementation.

## Context
Framework: Authority OS (Playwright + TypeScript)
Output feeds into: `test-generator.md` prompt for implementation

## Task
Break down the following user story into E2E test scenarios: [INSERT USER STORY]

## Instructions
For each scenario produce:

1. **Scenario ID**: e.g. `E2E-001`
2. **Scenario title**: one line describing what is being tested
3. **Type**: Happy Path / Negative / Edge Case
4. **Priority**: High / Medium / Low
5. **Preconditions**: what must be true before the test starts
6. **Steps**: numbered list (max 6 steps)
7. **Expected result**: the single assertion that proves it passed
8. **Page Objects needed**: list which `/pages` classes are required
9. **Smoke candidate**: yes/no — should this have `@smoke` tag?

## Coverage rules
- Every user story needs at least: 1 happy path + 1 negative scenario
- Forms need: empty submission, invalid input, max length input
- Auth flows need: valid credentials, invalid credentials, locked/expired account
- Cart/checkout flows need: single item, multiple items, empty cart attempt

## Input
User story:
[PASTE USER STORY OR FEATURE DESCRIPTION HERE]
