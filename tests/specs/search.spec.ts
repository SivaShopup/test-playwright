import { test, expect } from '@playwright/test';
import { getTestDataFromCSV } from '../utils/parsecsv';

test(`Search on FirstCry`, async ({ page }) => {
      const testData = getTestDataFromCSV('tests/test-data/searchdata.csv');
    for (const row of testData) {
    await page.goto('https://www.firstcry.com');
    await page.fill('#search_box', row.searchTerm);
    await page.press('#search_box', 'Enter');

    const results = page.locator('.search-list .product-box');
    await expect(results.first()).toBeVisible();
    }
  });
