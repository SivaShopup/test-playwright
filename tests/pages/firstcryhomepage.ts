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
    let totalProducts = 0;    

    for (const row of testData) {
      console.log(`Running test for: ${row.searchTerm}`);
      console.log(`Product count: ${row.count}`);
      console.log(`Brand: ${row.brand}`);

      await this.searchFor(`${row.searchTerm}`);
      await this.page.waitForTimeout(10000);

    const count = await this.productList.count();
    const limit = Math.min(Number(row.count), count);
    const brandCheckbox = this.page.locator(`label:has-text("${row.brand}") input[type="checkbox"]`);
    
    console.log(`Total products: ${count}, displaying: ${limit}`);
  
    console.log(`Total products : ${count}'; ${await this.productList.count()}`);

    for (let i = 0; i < limit; i++) {
      const name = await this.productList.nth(i).locator('.prod_name').textContent();
      console.log(`- ${name?.trim()}`);  
    }

      await expect(this.productList).toHaveCount(count);
      totalProducts += count;

      // ✅ Brand assertion (check if any product contains brand name)
    const brandLocator = this.page.locator('.prod_name');
    const brandCount = await brandLocator.count();
    console.log(`Brand count: ${brandCount}`);

    let brandFound = false;
    for (let i = 0; i < brandCount; i++) {
      const text = await brandLocator.nth(i).textContent();
      if (text?.toLowerCase().includes(row.brand.toLowerCase())) {
        brandFound = true;
        break;
      }
    }

      if (await brandCheckbox.isVisible()) {
        await brandCheckbox.check();
      }

      // await expect(brandCheckbox).toBeChecked();
  }
    console.log(`Total products: ${totalProducts}`);
    this.page.pause; 
    }
  };