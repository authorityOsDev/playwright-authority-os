import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { EnvFactory } from '@utils/env-factory';
import testData from '@data/users.json';

test.describe('Data-Driven Authentication Suite', { tag: '@smoke' }, () => {
  // Logic to iterate through all scenarios in the JSON file
  for (const scenario of testData) {
    
    test(`Scenario ${scenario.id}: ${scenario.description}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      
      // Navigate using our EnvFactory
      await page.goto(EnvFactory.baseUrl);
      
      // Perform login attempt
      await loginPage.login(
        scenario.username, 
        process.env.PASSWORD || 'secret_sauce'
      );

      // Assertions based on data-driven expectations
      if (scenario.errorExpected) {
        await expect(loginPage.errorMessage).toBeVisible();
      } else {
        await expect(page).toHaveURL(new RegExp(scenario.expectedPath));
      }
    });
  }
});