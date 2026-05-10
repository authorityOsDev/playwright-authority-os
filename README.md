# ⚡ Authority OS — AI-Native QA Framework

> **From Code to Board. Engineers see GitHub. Managers see Notion. AI keeps both in sync.**

Authority OS is a production-grade Playwright framework that combines automated E2E testing, cross-browser CI/CD, live reporting, and a business intelligence dashboard — all wired together in a single system.

---

## 🔴 Live Dashboard

| Resource | Link |
|---|---|
| 📊 Live Allure Report | [authority-os-report.surge.sh](https://authority-os-report.surge.sh) |
| 🧠 Notion Command Center | [Authority OS — Command Center](https://sleepy-frown-fd6.notion.site/Authority-OS-Command-Center-347d9a6c570d8026a9bad41013357a68) |
| 📋 Notion Template | [Duplicate to your workspace →](https://sleepy-frown-fd6.notion.site/Authority-OS-Command-Center-347d9a6c570d8026a9bad41013357a68?source=copy_link) |
| ⚙️ CI/CD Pipeline | [GitHub Actions](https://github.com/authorityOsDev/playwright-authority-os/actions) |

---

## 🏗️ The Dashboard Ecosystem

Authority OS operates across three connected layers:

```
┌─────────────────────────────────────────────────────────┐
│                    AUTHORITY OS BRIDGE                  │
├──────────────┬──────────────────────┬───────────────────┤
│   GITHUB     │     GITHUB ACTIONS   │      NOTION       │
│   (Code)     │     (CI Pipeline)    │  (Business View)  │
│              │                      │                   │
│  Tests run   │  Matrix: 3 browsers  │  CI Run History   │
│  POM arch.   │  Quality gate        │  ROI Calculator   │
│  TypeScript  │  Allure → Surge.sh   │  Test Inventory   │
│              │  Notion API update   │  System Status    │
└──────────────┴──────────────────────┴───────────────────┘
                          ↑
                    AI (Claude Code)
              Reads code, generates tests,
              updates docs, maintains sync
```

**What this means in practice:**
- Every push triggers the full pipeline automatically
- Test results appear in Notion within minutes — no manual work
- Managers see `Build #42 — Passed | 37/37 | 100% | 16s` without opening GitHub
- The live Allure report is publicly accessible at all times

---

## 🚀 Key Features

| Feature | Detail |
|---|---|
| **Cross-browser** | Chromium, Firefox, WebKit in parallel |
| **Auth strategy** | One-time login, session reuse across all tests |
| **POM architecture** | BasePage with built-in logging, retry, and step tracking |
| **Data-driven tests** | JSON-driven authentication scenarios |
| **API-UI hybrid** | Validates backend and frontend consistency |
| **Allure reporting** | Rich visual reports with steps, screenshots, traces |
| **Notion integration** | Auto-updates dashboard after every CI run |
| **ROI tracking** | Calculates monthly savings vs manual testing |
| **AI prompt library** | Ready-made prompts for generating tests and page objects |

---

## 📁 Project Structure

```
playwright-authority-os/
├── .authority/prompts/          # AI prompt library (test & POM generators)
├── .github/workflows/           # CI/CD pipeline (quality gate + matrix + publish)
├── pages/                       # Page Objects (strict POM)
│   ├── base.page.ts             # BasePage — shared methods for all POs
│   ├── login.page.ts
│   ├── inventory.page.ts
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   └── product-detail.page.ts
├── tests/
│   ├── auth.setup.ts            # Global auth — runs once, reused by all browsers
│   ├── smoke/                   # Critical path tests (@smoke tag)
│   └── showroom/                # Full feature coverage
├── utils/
│   ├── env-factory.ts           # Environment switching (staging/prod/local)
│   ├── api.request.ts           # Logged API request wrapper
│   ├── notion-update.ts         # CI → Notion bridge (runs after every build)
│   └── notion-seed.ts           # One-time database seeder
├── data/
│   └── users.json               # Data-driven test scenarios
├── playwright.config.ts         # Config: browsers, auth, reporters, testIdAttribute
├── global-teardown.ts           # Auto-cleanup of auth session after run
├── ARCHITECTURE.md              # Engineering deep-dive
└── .env.example                 # Environment template
```

---

## 🛠️ Quick Start

```bash
# 1. Clone and install
git clone https://github.com/authorityOsDev/playwright-authority-os.git
cd playwright-authority-os
npm install

# 2. Configure environment
cp .env.example .env
# Fill in BASE_URL, STANDARD_USER, PASSWORD, NOTION_TOKEN, NOTION_DATABASE_ID, ALLURE_REPORT_URL
# Notion dashboard template: https://sleepy-frown-fd6.notion.site/Authority-OS-Command-Center-347d9a6c570d8026a9bad41013357a68?source=copy_link

# 3. Install browsers
npx playwright install

# 4. Run tests
npm test                    # full suite (all browsers)
npm run test:smoke          # smoke tests only
npm run test:headed         # visible browser

# 5. Generate and open report
npm run report:generate
npm run report:open

# 6. Ship: run tests + update Notion dashboard
npm run ship-it
```

---

## 📊 Test Coverage

| Suite | Tests | Tag | Business Value |
|---|---|---|---|
| Authentication | 3 | @smoke | High |
| Inventory | 2 | @smoke | High / Medium |
| Hybrid API-UI | 1 | @smoke | High |
| API Layer Health | 3 | @smoke | High |
| Filters | 1 | — | Medium |
| Cart Persistence | 1 | — | High |
| Checkout (single) | 1 | — | High |
| Checkout (multi-item) | 1 | @smoke | High |
| Validation | 1 | — | Medium |
| **Total** | **15 scenarios / 45 runs** | | **8 High, 5 Medium** |

---

## 🤖 AI Prompt Library

15 ready-made prompts in `.authority/prompts/`. Paste any into Claude, ChatGPT, or your AI of choice:

| Prompt | Use |
|---|---|
| `test-generator.md` | Generate a complete test file from a scenario description |
| `page-object-creator.md` | Generate a Page Object + fixture registration from HTML |
| `debug-flaky-test.md` | Diagnose and fix intermittently failing tests |
| `test-fixer.md` | Fix broken tests from error messages |
| `smoke-suite-planner.md` | Design a smoke suite for any web application |
| `e2e-scenario-planner.md` | Plan full E2E coverage from user stories |
| `coverage-gap-analyzer.md` | Find untested critical paths |
| `api-test-generator.md` | Generate API layer tests |
| `test-data-factory.md` | Generate test data with edge cases |
| `accessibility-test-generator.md` | Generate WCAG 2.1 AA accessibility tests |
| `ci-pipeline-generator.md` | Generate GitHub Actions pipeline config |
| `bug-report-generator.md` | Turn a bug report into a regression test |
| `notion-report-generator.md` | Generate stakeholder-ready test reports |
| `test-refactor.md` | Refactor legacy tests to Authority OS patterns |
| `environment-setup-generator.md` | Generate full environment config for a new project |

---

## 📖 Documentation

- [Architecture Guide](ARCHITECTURE.md) — engineering principles, patterns, decisions
- [Deployment Guide](DEPLOYMENT.md) — CI/CD setup, GitHub Secrets, Surge, Notion
- [Notion Command Center](https://sleepy-frown-fd6.notion.site/Authority-OS-Command-Center-347d9a6c570d8026a9bad41013357a68) — live business dashboard
- [Notion Template](https://sleepy-frown-fd6.notion.site/Authority-OS-Command-Center-347d9a6c570d8026a9bad41013357a68?source=copy_link) — duplicate to your workspace in one click

---

## 💰 ROI

```
Manual testing:  300 min/cycle × 20 runs/month × €50/hr = €5,000/month
Automated:        15 min/cycle × 20 runs/month × €50/hr =   €250/month
─────────────────────────────────────────────────────────────────────
Monthly savings: €4,750 | Annual savings: €57,000
```

---

## 📄 License

ISC — Authority OS Dev
