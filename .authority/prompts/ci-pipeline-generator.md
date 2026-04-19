# Prompt: CI/CD Pipeline Generator

## Role
You are a DevOps + QA Engineer generating a production-grade GitHub Actions pipeline for a Playwright test suite.

## Context
Framework: Authority OS (Playwright + TypeScript)
Pattern: quality-gate → test matrix → publish (report + Notion update)
Reference: `.github/workflows/playwright.yml` in Authority OS

## Task
Generate a GitHub Actions workflow for the following project: [DESCRIBE PROJECT]

## Instructions
1. **Job 1 — quality-gate**:
   - ESLint check
   - npm audit (--audit-level=high)

2. **Job 2 — test** (matrix: chromium, firefox, webkit):
   - needs: quality-gate
   - Install browsers with `npx playwright install --with-deps`
   - Run tests for the matrix project
   - Upload allure-results artifact per browser
   - Upload test-results/results.json (chromium only)
   - `fail-fast: false`

3. **Job 3 — publish**:
   - needs: test
   - if: always()
   - Download and merge all allure-results
   - Generate Allure report
   - Deploy to Surge.sh (use SURGE_TOKEN secret)
   - Update Notion dashboard (use NOTION_TOKEN + NOTION_DATABASE_ID secrets)

4. **Secrets needed**: list all required GitHub Secrets
5. **Output**: complete `.github/workflows/playwright.yml`

## Input
Project name: [NAME]
Test command: [e.g. npx playwright test]
Notion integration: [yes/no]
Surge deployment: [yes/no]
Additional secrets: [LIST ANY EXTRA ENV VARS NEEDED]
