import { Injectable } from '@nestjs/common';
import * as Puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getProductPriceFromBackmarket(productName): Promise<void> {
    const browser = await this.startBrowser();
    await this.scraper(browser, productName);
  }

  async startBrowser() {
    let browser;
    try {
      console.log('Opening the browser......');
      browser = await Puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--disable-setuid-sandbox'],
      });
    } catch (err) {
      console.log('Could not create a browser instance => : ', err);
    }
    return browser;
  }

  async scraper(browser, productName) {
    // Selectors List
    const SEARCH_SELECTOR = 'input[placeholder=Rechercher]';
    const SORT_SELECTOR = 'select[name=sort]';
    const SORT_OPTION_VALUE = 'Prix croissant-1';
    const PRODUCT_GRADE_0_SELECTOR = '[data-qa=price-grade-0]';
    const PRODUCT_GRADE_1_SELECTOR = '[data-qa=price-grade-1]';
    const PRODUCT_GRADE_2_SELECTOR = '[data-qa=price-grade-2]';
    const PRODUCT_GRADE_3_SELECTOR = '[data-qa=price-grade-3]';
    const PRODUCT_GRADE_4_SELECTOR = '[data-qa=price-grade-4]';

    // Init Browser Page
    const page = await browser.newPage();

    // Launch a research in BM for a product
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('https://www.backmarket.fr/');
    await page.click(SEARCH_SELECTOR);
    await page.waitForTimeout(500);
    await page.keyboard.type(productName);
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2500);
    await page.select(SORT_SELECTOR, SORT_OPTION_VALUE);
    await page.waitForTimeout(500);
    const productsSerp = await page.$$(
      'div[data-test=product-thumb-container]',
    );
    await page.waitForTimeout(500);
    await productsSerp[0].click();

    // Get product price for Grade 0
    await page.waitForTimeout(1500);
    const productGrade0 = await page.$(PRODUCT_GRADE_0_SELECTOR);
    const productGrade0Infos = await productGrade0.getProperty('innerText');
    const productGrade0Price = await productGrade0Infos.jsonValue();
    console.log(productGrade0Price);

    // Get product price for Grade 1
    await page.waitForTimeout(1500);
    const productGrade1 = await page.$(PRODUCT_GRADE_1_SELECTOR);
    const productGrade1Infos = await productGrade1.getProperty('innerText');
    const productGrade1Price = await productGrade1Infos.jsonValue();
    console.log(productGrade1Price);

    // Get product price for Grade 2
    await page.waitForTimeout(1500);
    const productGrade2 = await page.$(PRODUCT_GRADE_2_SELECTOR);
    const productGrade2Infos = await productGrade2.getProperty('innerText');
    const productGrade2Price = await productGrade2Infos.jsonValue();
    console.log(productGrade2Price);

    // Get product price for Grade 3
    await page.waitForTimeout(1500);
    const productGrade3 = await page.$(PRODUCT_GRADE_3_SELECTOR);
    const productGrade3Infos = await productGrade3.getProperty('innerText');
    const productGrade3Price = await productGrade3Infos.jsonValue();
    console.log(productGrade3Price);

    // Get product price for Grade 4
    await page.waitForTimeout(1500);
    const productGrade4 = await page.$(PRODUCT_GRADE_4_SELECTOR);
    const productGrade4Infos = await productGrade4.getProperty('innerText');
    const productGrade4Price = await productGrade4Infos.jsonValue();
    console.log(productGrade4Price);
  }
}
