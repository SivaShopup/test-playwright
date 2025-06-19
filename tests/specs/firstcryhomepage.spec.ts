import { test, expect } from '@playwright/test';
import { FirstCryHomePage } from '../pages/firstcryhomepage.ts';

test.beforeEach(async ({ page }) => {
  const home = new FirstCryHomePage(page);
  await home.open();
});

test('Parce csv for kids', async ({ page }) => {
  const home = new FirstCryHomePage(page);
  await home.main()
});