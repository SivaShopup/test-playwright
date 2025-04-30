import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('products list', async ({ page }) => {
    await page.goto('https://www.firstcry.com'); // Replace with actual app URL
    await page.fill('#search-box', 'kurta');
    await page.click('#search-button');

    const results = await page.locator('.search-result-item').count();
    expect(results).toBeGreaterThan(0);
  });
});
