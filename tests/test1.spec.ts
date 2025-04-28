import { test, expect } from '@playwright/test';

test('products', async ({ page }) => {
  await page.goto('https://www.firstcry.com');

  await page.fill('#search_box', 'toys');
  await page.press('#search_box', 'Enter');

  await page.waitForSelector('.product-box'); 
});