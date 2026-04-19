import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import { EnvFactory } from './utils/env-factory';

dotenv.config();

// Authority Tip: Using absolute path ensures reliability in any environment (Local, Docker, Jenkins)
export const STORAGE_STATE = path.join(__dirname, '.auth/user.json');

export default defineConfig({
  // This is the global master switch - runs after EVERYTHING is finished
  globalTeardown: require.resolve('./global-teardown'),
  
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  
  reporter: [
    ['html'],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    baseURL: EnvFactory.baseUrl || 'https://www.saucedemo.com',
    // saucedemo uses data-test, not the Playwright default data-testid
    testIdAttribute: 'data-test',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },

  projects: [
    // 1. SETUP: Authenticates and saves the session
    { 
      name: 'setup', 
      testMatch: /.*\.setup\.ts/ 
    },

    // 2. MAIN TESTS: They wait for 'setup' and then run
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        storageState: STORAGE_STATE,
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: STORAGE_STATE
      },
      dependencies: ['setup'],
    },
  ],
});