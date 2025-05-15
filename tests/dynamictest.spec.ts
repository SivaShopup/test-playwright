import { test, expect } from '@playwright/test';

const searchTerm = process.env.SEARCH_TERM || 'tshirts';
const filterBrand = process.env.FILTER_BRAND || 'babyhug';

test('Dynamic test for tshirts', async ({ page }) => {
  await page.goto('https://www.firstcry.com');

  // Search for a product

  await page.fill('#search_box', searchTerm);
  await page.press('#search_box', 'Enter');

  // Select "Babyhug" brand if available
  const brandCheckbox = page.locator('label:has-text("${filterBrand}") input[type="checkbox"]');
  if (await brandCheckbox.isVisible()) {
    await brandCheckbox.check();
  } else {
        console.log('Babyhug brand filter not found or not visible.');
      }

  await page.waitForTimeout(2000); // Adjust if filters reload asynchronously

//   await page.waitForSelector('.search-list');

  // Click first product
  const product = page.locator('.search-list .product-box').first();
//   await expect(product).toBeVisible();
  // await product.click();

  // Verify product detail
  const title = page.locator('h1');
  await expect(title).toBeVisible();
});
