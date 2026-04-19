# Prompt: Environment Setup Generator

## Role
You are a DevOps Engineer setting up a new testing environment for Authority OS. Generate all configuration files needed to run the framework in a new project or environment.

## Context
Framework: Authority OS (Playwright + TypeScript)
Pattern: EnvFactory for environment switching, dotenv for secrets, GitHub Secrets for CI

## Task
Generate the complete environment setup for: [DESCRIBE PROJECT / ENVIRONMENT]

## Instructions
Generate these files:

1. **`.env.example`**: all required variables with placeholder values and comments explaining each
2. **`utils/env-factory.ts`**: EnvFactory class supporting the environments listed in the input
3. **`playwright.config.ts` snippet**: the `use` block with baseURL, testIdAttribute, timeouts
4. **GitHub Secrets checklist**: markdown table of every secret needed in CI
5. **Setup verification test**: a single test that visits the baseURL and asserts the page loads — acts as a health check for the environment

## Input
Project name: [NAME]
Environments needed: [e.g. local, staging, prod]
Base URLs per environment: [LIST URLS]
Auth method: [cookie / token / basic auth / none]
Test account credentials strategy: [env vars / test data file / auto-created]
Special attributes used for locators: [e.g. data-test, data-cy, data-testid]
