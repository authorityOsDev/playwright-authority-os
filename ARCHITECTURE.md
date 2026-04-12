# 🏛️ Framework Architecture: Authority OS

## 1. Page Object Model (POM) Enhancement
Unlike standard POM, we use a **BasePage Wrapper** strategy. Every Page Object inherits from `BasePage`, which centralizes:
* **Enhanced Logging:** Every interaction is logged for easier debugging.
* **Smart Waiting:** Built-in resilience against asynchronous UI changes.

## 2. Authentication Strategy (One-Time Login)
To maximize speed, we utilize a **Global Setup** project:
* The `auth.setup.ts` runs once at the start of the suite.
* It saves the authentication state (cookies/session) into `.auth/user.json`.
* All subsequent test projects (Chromium, Firefox, Webkit) reuse this state, skipping the login UI and saving ~10-15 seconds per test.

## 3. Environment Factory
The framework uses a **Factory Pattern** for environment management:
* Decouples test logic from environment data.
* Controlled via `.env` files and `EnvFactory` utility.
* Supports seamless switching between `staging`, `production`, and `local` environments.

## 4. CI/CD Matrix Execution
Our GitHub Actions workflow uses a **Matrix Strategy** to run tests across three different browser engines (Chromium, Firefox, Webkit) in parallel, ensuring 100% cross-browser compatibility with zero added execution time.