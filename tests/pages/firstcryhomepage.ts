import { Page, Locator, expect } from '@playwright/test';
import { getTestDataFromCSV } from '../utils/parsecsv';

export class FirstCryHomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly productList: Locator;

  constructor(page: Page) {
    if (!page) {
      throw new Error('Page is required');
  }
    this.page = page;
    this.searchBox = page.locator('#search_box');
    this.productList = page.locator('.search-list .product-box');
  }

  async open() {
    await this.page.goto('https://www.firstcry.com');
  }

  async searchFor(term: string) {
    await this.searchBox.fill(term);
    await this.searchBox.press('Enter');
  }

  async main()
  {
    const testData=getTestDataFromCSV("test-data/searchdata.csv");    

    for (const row of testData) {
      console.log(`Running test for: ${row.searchTerm}`);
      console.log(`Product count: ${row.count}`);

      await this.searchFor(`${row.searchTerm}`);
      await this.page.waitForTimeout(2000);

    const count = await this.productList.count();
    console.log(`Total products : ${count}'; ${await this.productList.count()}`);
      // console.log(`Found ${count} products`);

    for (let i = 0; i < Math.min(3, count); i++) {
      const name = await this.productList.nth(i).locator('.prod_name').textContent();
      console.log(`- ${name?.trim()}`);  

    
    await expect(this.productList).toHaveCount(0);
    
  }}
}}; 