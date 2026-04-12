# 📦 Deployment Guide: Authority OS

This guide provides step-by-step instructions for integrating this framework into a corporate environment.

## 1. Prerequisites
* **Node.js:** v20 or higher.
* **GitHub Account:** For CI/CD execution via GitHub Actions.
* **Secrets Management:** Access to repository settings.

## 2. Fast-Track Setup (15 Minutes)

### Step A: Repository Setup
1. Clone the repository to your local machine or organization.
2. Run `npm install` to setup the environment.
3. Run `npx playwright install --with-deps` to download required browser engines.

### Step B: Secret Configuration (Crucial)
Navigate to **Settings > Secrets and variables > Actions** and add the following:
* `BASE_URL`: The target environment URL (e.g., https://staging.example.com).
* `STANDARD_USER`: Authorized test account username.
* `PASSWORD`: Authorized test account password.

## 3. CI/CD Pipeline
The framework is pre-configured with **GitHub Actions (Matrix Strategy)**.
* **Quality Gate:** Automated ESLint and Security Scan run on every Push.
* **Parallel Execution:** Tests run simultaneously on Chromium, Firefox, and Webkit.
* **Retention:** HTML reports are kept for 30 days as build artifacts.

## 4. Local Execution & Debugging
* **Run all tests:** `npx playwright test`
* **Debug Mode (UI):** `npx playwright test --ui`
* **Report View:** `npx playwright show-report`

---
*Authored by AuthorityOS Dev - Engineered for Reliability.*