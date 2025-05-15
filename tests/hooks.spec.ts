import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.firstcry.com');
  });
  
  // Run after each test (takes screenshot on failure)
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`,
        fullPage: true
      });
    }
  });

test('static and dynamic for tshirts', async ({ page }) => {
  await page.goto('https://www.firstcry.com');

  // Search for a product

  await page.fill('#search_box', 'tshirts');
  await page.press('#search_box', 'Enter');

  // Select "LuvLap" brand if available
  const BabyhugCheckbox = page.locator('label:has-text("babyhug") input[type="checkbox"]');
  if (await BabyhugCheckbox.isVisible()) {
    await BabyhugCheckbox.check();
  } else {
        console.log('Babyhug brand filter not found or not visible.');
      }

  await page.waitForTimeout(2000); // Adjust if filters reload asynchronously

  // Sorting dropdown (if applicable)
  const sortDropdown = page.locator('#sort_dropdown');
  if (await sortDropdown.isVisible()) {
    await sortDropdown.click();
    await page.click('li:has-text("Price: Low to High")');
  }

  // Pagination: go to page 2
  const nextPage = page.locator('.pagination .page-link', { hasText: '2' });
//   await nextPage.click();

//   await page.waitForSelector('.search-list');

  // Click first product
  const product = page.locator('.search-list .product-box').first();
//   await expect(product).toBeVisible();
//   await product.click();

  // Verify product detail
  const title = page.locator('h1');
  await expect(title).toBeVisible();
});