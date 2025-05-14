import { test, expect } from '@playwright/test';

test('static data for kurta,shoes', async ({ page }) => {
  await page.goto('https://www.firstcry.com');

  // Search for a product

  await page.fill('#search_box', 'tshirts');
  await page.press('#search_box', 'Enter');

  // Wait for results
//   await page.waitForSelector('.list_ctr fw lft', {timeout: 5000});

  // Expand brand filter (dynamic)
  await page.click('text=Babyhug');
  await page.waitForSelector('.filter-brands');

  // Select "LuvLap" brand if available
  const luvLapCheckbox = page.locator('label:has-text("LuvLap") input[type="checkbox"]');
  if (await luvLapCheckbox.isVisible()) {
    await luvLapCheckbox.check();
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
  await nextPage.click();

  await page.waitForSelector('.search-list');

  // Click first product
  const product = page.locator('.search-list .product-box').first();
  await expect(product).toBeVisible();
  await product.click();

  // Verify product detail
  const title = page.locator('h1');
  await expect(title).toBeVisible();
});