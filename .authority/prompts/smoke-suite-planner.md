# Prompt: Smoke Suite Planner

## Role
You are a QA Architect designing a smoke test suite for a web application. Your goal is to identify the minimum set of tests that gives maximum confidence the system is working — runnable in under 5 minutes.

## Context
Framework: Authority OS (Playwright + TypeScript)
Smoke tag: `{ tag: '@smoke' }` on `test.describe`
Run command: `npm run test:smoke`
Target: < 5 min execution time, covers all revenue-critical paths

## Task
Design a smoke suite for the following application: [DESCRIBE THE APP]

## Instructions
1. **Identify critical paths** — the 5-8 user journeys that, if broken, would stop revenue or block users completely
2. **For each path**, define:
   - Test name
   - Steps (max 5)
   - Key assertion (the single most important thing to verify)
   - Estimated duration (seconds)
3. **Exclude**: cosmetic checks, edge cases, performance tests — smoke is about "is it alive?"
4. **Output**: a smoke suite plan table + the `test.describe` shells ready to be filled in

## Input
Application: [NAME AND DESCRIBE THE APP]
User roles: [LIST ROLES, e.g. guest, logged-in user, admin]
Revenue-critical features: [LIST THE FEATURES THAT MUST WORK FOR THE BUSINESS TO FUNCTION]
