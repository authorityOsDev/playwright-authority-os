# 📦 Authority OS — Deployment Guide

> Complete setup from zero to a running pipeline in 15 minutes.

---

## Prerequisites

| Requirement | Version | Check |
|---|---|---|
| Node.js | v20+ | `node --version` |
| npm | v9+ | `npm --version` |
| Git | any | `git --version` |
| GitHub account | — | for CI/CD |

---

## Part 1 — Local Setup (5 min)

### Step 1 — Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/playwright-authority-os.git
cd playwright-authority-os
npm install
npx playwright install
```

### Step 2 — Configure environment

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```bash
# Target application
BASE_URL=https://your-app.com

# Test account credentials
STANDARD_USER=your_test_username
PASSWORD=your_test_password

# Notion integration (see Part 3)
NOTION_TOKEN=ntn_your_token_here
NOTION_DATABASE_ID=your_database_id_here
```

### Step 3 — Run your first test

```bash
npm test                   # full suite (Chromium + Firefox + WebKit)
npm run test:smoke         # smoke tests only (~2 min)
npm run test:headed        # watch tests run in the browser
```

### Step 4 — View the report

```bash
npm run report:generate    # generates allure-report/
npm run report:open        # opens in browser
```

---

## Part 2 — GitHub Actions CI/CD (5 min)

### Step 1 — Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Add GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**

Add each of these:

| Secret name | Value | Where to get it |
|---|---|---|
| `BASE_URL` | Your app URL | your app |
| `STANDARD_USER` | Test account username | your app |
| `PASSWORD` | Test account password | your app |
| `NOTION_TOKEN` | Notion integration token | see Part 3 |
| `NOTION_DATABASE_ID` | CI Run History database ID | see Part 3 |
| `SURGE_TOKEN` | Surge.sh deploy token | see Part 4 |

### Step 3 — Trigger the pipeline

Push any change to `main` — the pipeline runs automatically:

```
quality-gate → test (3 browsers in parallel) → publish (Allure + Notion)
```

Watch it at: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`

---

## Part 3 — Notion Dashboard Setup (5 min)

### Step 1 — Create a Notion integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Name it `Authority OS Connector`
4. Copy the **Internal Integration Token** → this is your `NOTION_TOKEN`

### Step 2 — Create the CI Run History database

In Notion, create a new database with these exact columns:

| Column | Type | Notes |
|---|---|---|
| `Scenario` | Title | auto — already exists |
| `Status` | Select | options: `Passed`, `Failed` |
| `Total Tests` | Number | |
| `Passed` | Number | |
| `Success Rate` | Formula | `prop("Passed") / prop("Total Tests")` → format as Percent |
| `Duration (s)` | Number | |
| `Report Link` | URL | |
| `Run Date` | Date | |

### Step 3 — Connect the integration

Open the database as a full page → `...` top right → **Connections** → add **Authority OS Connector**

### Step 4 — Get the database ID

Open the database as a full page. Copy the URL:
```
https://www.notion.so/YOUR-WORKSPACE/347d9a6c570d80...?v=...
                                      ^^^^^^^^^^^^^^^^
                                      This is your NOTION_DATABASE_ID
```

### Step 5 — Update .env

```bash
NOTION_TOKEN=ntn_your_token_here
NOTION_DATABASE_ID=your_database_id_here
```

### Step 6 — Test the connection

```bash
npm run ship-it
```

A new row should appear in your CI Run History database.

---

## Part 4 — Live Allure Report on Surge.sh (2 min)

### Step 1 — Create a Surge account

```bash
npx surge login
# or create account at surge.sh
```

### Step 2 — Get your token

```bash
npx surge token
```

Copy the token → add it as `SURGE_TOKEN` in GitHub Secrets.

### Step 3 — Choose your domain

In `.github/workflows/playwright.yml`, find this line and set your domain:

```yaml
surge ./allure-report https://your-project-name.surge.sh --token ${{ secrets.SURGE_TOKEN }}
```

After your first CI run, your live report will be at `https://your-project-name.surge.sh`.

---

## Part 5 — Adapting to Your Application

Authority OS is pre-configured for [saucedemo.com](https://www.saucedemo.com) as a demo. To use it with your own application:

### 1. Update locators in Page Objects

Each Page Object in `/pages` uses Playwright's `getByTestId()`, `getByRole()`, and `getByText()`. Update these to match your application's elements.

```typescript
// pages/login.page.ts — update to your app's selectors
this.usernameInput = page.getByTestId('your-username-field');
this.passwordInput = page.getByTestId('your-password-field');
this.loginButton   = page.getByRole('button', { name: 'Sign In' });
```

### 2. Update testIdAttribute if needed

If your app uses `data-cy` (Cypress convention) or `data-qa` instead of `data-test`:

```typescript
// playwright.config.ts
use: {
  testIdAttribute: 'data-cy', // change to match your app
}
```

### 3. Update auth setup

Edit `tests/auth.setup.ts` to match your login flow and the URL you land on after login.

### 4. Use AI prompts to generate new Page Objects

```
.authority/prompts/page-object-creator.md
```

Paste your HTML, get a complete Page Object in seconds.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `getByTestId()` not finding elements | Check `testIdAttribute` in `playwright.config.ts` matches your app's attribute |
| Auth setup fails | Update `tests/auth.setup.ts` with your login URL and success assertion |
| Notion update fails | Verify `NOTION_TOKEN` and `NOTION_DATABASE_ID` are correct and integration has database access |
| Surge deploy fails | Check `SURGE_TOKEN` secret and that the domain name is available |
| Tests pass locally but fail in CI | Check all required secrets are added to GitHub |

---

## Quick Reference

```bash
npm test                    # run full suite
npm run test:smoke          # smoke tests only
npm run test:headed         # headed mode (visible browser)
npm run test:debug          # debug mode
npm run ship-it             # run tests + update Notion
npm run report:generate     # generate Allure report
npm run report:open         # open Allure report
npm run lint                # run ESLint
```

---

*Authority OS — Engineered for Reliability | [GitHub](https://github.com/authorityOsDev/playwright-authority-os)*
