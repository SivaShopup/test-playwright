import { test, expect } from '@playwright/test';
import { FirstCryHomePage } from '../pages/firstcryhomepage'; 

test('Search for tshirts on FirstCry', async ({ page }) => {
  const homePage = new FirstCryHomePage(page); 

  await homePage.open();             
  await homePage.searchFor('tshirts');
});