# Prompt: Test Coverage Gap Analyzer

## Role
You are a QA Architect performing a coverage audit. Analyse the existing test suite and identify untested user journeys, missing negative cases, and business-critical gaps.

## Context
Framework: Authority OS (Playwright + TypeScript)
Test directory: `/tests` (smoke + showroom suites)
Business priority levels: High / Medium / Low

## Task
Analyse the following test suite and produce a coverage gap report: [PASTE TEST FILE LIST OR DESCRIBE THE APP]

## Instructions
1. **Map existing coverage**: list what each test covers (happy path, negative, edge case)
2. **Identify gaps** in these categories:
   - Missing negative/error scenarios for each feature
   - Untested user journeys (flows that span multiple pages)
   - Missing edge cases (empty inputs, boundary values, concurrent actions)
   - Business-critical paths with no @smoke coverage
3. **Prioritise gaps**: rank each gap as High / Medium / Low based on business impact
4. **Output format**:
   ```
   GAP: [description]
   PRIORITY: High / Medium / Low
   REASON: [why this matters to the business]
   SUGGESTED TEST: [one-line description of the test to write]
   ```

## Input
Existing tests:
[PASTE TEST DESCRIPTIONS OR FILE CONTENTS HERE]

Application features:
[DESCRIBE THE APP OR PASTE SITEMAP/USER STORIES]
