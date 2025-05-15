import { test, expect } from '@playwright/test';

test.describe('Search Tests on FirstCry', () => {
  // Utility function to dismiss location popup if it appears
  const dismissPopupIfVisible = async (page) => {
    const popup = page.locator('#lbl_popup_later');
    if (await popup.isVisible()) {
      await popup.click();
    }
  };

  // Utility function to search and list products
  const searchAndListProducts = async (page, keyword: string, limit: number) => {
    await page.goto('https://www.firstcry.com');
    await dismissPopupIfVisible(page);

    // Dismiss location popup
  // const popup = page.locator('#lbl_popup_later');
  // if (await popup.isVisible({ timeout: 3000 })) {
  //   await popup.click();
  // }

    await page.fill('#search_box', keyword);
    await page.press('#search_box', 'Enter');

    await page.waitForSelector('.search-result-cont .list > li');

    const products = page.locator('.search-result-cont .list > li');
    const count = await products.count();

    console.log(`\nTop ${limit} products for "${keyword}":`);
    for (let i = 0; i < Math.min(limit, count); i++) {
      const name = await products.nth(i).locator('.prod_name').textContent();
      const price = await products.nth(i).locator('.prod_price').textContent();
      console.log(`- ${name?.trim()} | ${price?.trim()}`);
    }
  };

  test('Search for "kurta" and list first 3 products', async ({ page }) => {
    await searchAndListProducts(page, 'kurta', 3);
  });

  test('Search for "shoes" and list first 5 products', async ({ page }) => {
    await searchAndListProducts(page, 'shoes', 5);
  });
});
