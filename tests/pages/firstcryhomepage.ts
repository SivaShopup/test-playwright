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

  async verifyProductDetailVisible() {
    const title = this.page.locator('h1');
    await expect(title).toBeVisible();
  }

  async main()
  {
    const testData=getTestDataFromCSV("test-data/searchdata.csv");
    const count = await this.productList.count();

    for (const row of testData) {
      console.log(`Running test for: ${row.searchTerm}`);
      console.log(`Product count for '${row.searchTerm}'; ${await this.productList.count()}`);
    await this.searchFor(`${row.searchTerm}`);
    await this.page.waitForTimeout(2000);
    await this.verifyProductDetailVisible();
  }

}};
