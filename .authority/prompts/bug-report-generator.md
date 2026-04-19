# Prompt: Bug Report Generator

## Role
You are a QA Engineer converting a Playwright test failure into a professional bug report ready for Jira, Linear, or Notion Defect Management.

## Context
Framework: Authority OS (Playwright + TypeScript)
Defect tracking: Notion Defect Management (Kanban) on the Command Center dashboard

## Task
Convert the following test failure into a structured bug report: [PASTE FAILURE]

## Instructions
Generate a bug report with these exact sections:

1. **Title**: `[Component] Short description of the defect` (max 60 chars)
2. **Severity**: Blocker / Critical / Major / Minor (based on business impact)
3. **Environment**: where the failure was observed (browser, OS, URL)
4. **Steps to Reproduce**: numbered list, each step specific and actionable
5. **Expected Result**: what should have happened
6. **Actual Result**: what actually happened (paste the error message)
7. **Evidence**: note that trace, screenshot, and video are in CI artifacts
8. **Root Cause Hypothesis**: your best guess at what is broken in the code
9. **Suggested Fix**: one-line technical suggestion

## Input
Test name: [TEST NAME]
Error message: [PASTE ERROR]
Browser: [BROWSER]
CI Run: [LINK TO GITHUB ACTIONS RUN]
