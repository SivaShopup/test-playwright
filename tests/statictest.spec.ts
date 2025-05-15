import { test, expect } from '@playwright/test';

test('static test for tshirts', async ({ page }) => {
  await page.goto('https://www.firstcry.com');

  // Search for a product
  await page.fill('#search_box', 'tshirts');
  await page.press('#search_box', 'Enter');

  // Click first product
  const product = page.locator('.search-list .product-box').first();
//   await expect(product).toBeVisible();
//   await product.click();

  // Verify product detail
  const title = page.locator('h1');
  await expect(title).toBeVisible();
});