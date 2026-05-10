import { test, expect } from '@fixtures/index';
import { EnvFactory } from '@utils/env-factory';
import testData from '@data/users.json';

test.describe('Data-Driven Authentication Suite', { tag: '@smoke' }, () => {

  for (const scenario of testData) {
    test(`Scenario ${scenario.id}: ${scenario.description}`, async ({ loginPage, page }) => {

      await page.goto(EnvFactory.baseUrl);
      await loginPage.login(scenario.username, process.env.PASSWORD || 'secret_sauce');

      if (scenario.errorExpected) {
        await expect(loginPage.errorMessage).toBeVisible();
      } else {
        await expect(page).toHaveURL(new RegExp(scenario.expectedPath));
      }
    });
  }
});
