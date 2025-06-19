import { test, expect } from '@playwright/test';

test.describe('Filter Functionality on FirstCry', () => {
  const dismissPopupIfVisible = async (page) => {
    const popup = page.locator('#lbl_popup_later');
    if (await popup.isVisible()) {
      await popup.click();
    }
  };

  test('Search and apply brand filter, list first 3 filtered products', async ({ page }) => {
    await page.goto('https://www.firstcry.com');
    await dismissPopupIfVisible(page);

    // Search for "shoes"
    await page.fill('#search_box', 'shoes');
    await page.press('#search_box', 'Enter');
    // await page.waitForSelector('.search-result-cont');

    // Apply brand filter ("Babyhug")
    const brandFilter = page.locator('label[for*="Babyhug"]');
    if (await brandFilter.isVisible()) {
      await brandFilter.click();
      await page.waitForLoadState('networkidle');
    }

    // List first 3 filtered products
    const products = page.locator('.search-result-cont .list > li');
    const count = await products.count();

    console.log(`\nTop 3 filtered shoe products (e.g., brand = Babyhug):`);
    for (let i = 0; i < Math.min(3, count); i++) {
      const name = await products.nth(i).locator('.prod_name').textContent();
      const price = await products.nth(i).locator('.prod_price').textContent();
      console.log(`- ${name?.trim()} | ${price?.trim()}`);
    }
  });
});
