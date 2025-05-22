import { test, expect } from '@playwright/test';
import { FirstCryHomePage } from '../pages/firstcryhomepage.ts';

test.beforeEach(async ({ page }) => {
  const home = new FirstCryHomePage(page);
  await home.open();
});

test('Search for tshirts', async ({ page }) => {
  const home = new FirstCryHomePage(page);
  await home.main()
});