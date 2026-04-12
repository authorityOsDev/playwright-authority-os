# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke/inventory.spec.ts >> Inventory Dashboard >> Should display product list immediately
- Location: tests/smoke/inventory.spec.ts:10:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.inventory_list')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.inventory_list')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]
        - img [ref=e16]
      - 'heading "Epic sadface: You can only access ''/inventory.html'' when you are logged in." [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: You can only access '/inventory.html' when you are logged in."
      - button "Login" [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Inventory Dashboard', () => {
  4  |   
  5  |   test.beforeEach(async ({ page }) => {
  6  |     // We are already logged in thanks to Global Auth!
  7  |     await page.goto('/inventory.html');
  8  |   });
  9  | 
  10 |   test('Should display product list immediately', async ({ page }) => {
  11 |     const inventoryList = page.locator('.inventory_list');
  12 |     
  13 |     // This assertion passes instantly without re-logging
> 14 |     await expect(inventoryList).toBeVisible();
     |                                 ^ Error: expect(locator).toBeVisible() failed
  15 |     await expect(page).toHaveURL(/inventory.html/);
  16 |   });
  17 | 
  18 |   test('Should show at least 6 products', async ({ page }) => {
  19 |     const items = page.locator('.inventory_item');
  20 |     await expect(items).toHaveCount(6);
  21 |   });
  22 | });
```