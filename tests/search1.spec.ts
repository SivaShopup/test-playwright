import { test } from '@playwright/test';

test('Search "kurta" on FirstCry and list first 3 products', async ({ page }) => {
  // Navigate to FirstCry.com
  await page.goto('https://www.firstcry.com');

  // Dismiss location popup if it appears
  const popup = page.locator('#lbl_popup_later');
  if (await popup.isVisible({ timeout: 3000 })) {
    await popup.click();
  }

  // Enter "kurta" in the search box and click search
  await page.fill('#search_box', 'kurta');
//   await page.locator('#searchButton');
  await page.press('#search_box', 'Enter');


  // Wait for search results to load
  await page.waitForSelector('.search-result-cont .list > li');

  // Locate the product items
  const products = page.locator('.search-result-cont .list > li');
  const count = await products.count();

  console.log('\nTop 3 products for "kurta":');
  for (let i = 0; i < Math.min(3, count); i++) {
    const name = await products.nth(i).locator('.prod_name').textContent();
    const price = await products.nth(i).locator('.prod_price').textContent();
    console.log(`- ${name?.trim()} | ${price?.trim()}`);
  }
});
