# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/inventory.spec.ts >> Inventory Dashboard >> Should display product list
- Location: tests/smoke/inventory.spec.ts:10:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /inventory.html/
Received string:  "https://www.saucedemo.com/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    9 × unexpected value "https://www.saucedemo.com/"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Inventory Dashboard', () => {
  4  |   
  5  |   test.beforeEach(async ({ page }) => {
  6  |   // Go to root. If session exists, SauceDemo redirects to /inventory.html
  7  |   await page.goto('/'); 
  8  | });
  9  | 
  10 |   test('Should display product list', async ({ page }) => {
  11 |   // If we are not redirected, this will fail and show us where we are
> 12 |   await expect(page).toHaveURL(/inventory.html/);
     |                      ^ Error: expect(page).toHaveURL(expected) failed
  13 |   await expect(page.locator('.inventory_list')).toBeVisible();
  14 | });
  15 | 
  16 |   test('Should show at least 6 products', async ({ page }) => {
  17 |     const items = page.locator('.inventory_item');
  18 |     await expect(items).toHaveCount(6);
  19 |   });
  20 | });
```