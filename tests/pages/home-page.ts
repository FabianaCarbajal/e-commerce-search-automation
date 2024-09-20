import { expect, Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly resultsLegend: Locator;
  readonly secondPageButton: Locator;
  readonly seconItemShoppingCartButton: Locator;
  readonly stockModal: Locator;
  readonly stockInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search-words');
    this.resultsLegend = page.getByRole('heading', { name: 'Results for instax mini' })
    this.secondPageButton = page.getByRole('list').getByText('2');
    this.seconItemShoppingCartButton = this.page.locator('(//div[contains(@class,"multi--shopCart")])[2]');
    this.stockModal = page.locator('div.comet-v2-modal-body');
    this.stockInput = page.locator('input.comet-v2-input-number-input');
  }

  async navigateToHome() {
    await this.page.goto('https://www.aliexpress.us/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async closePopup() {
    const popup = this.page.getByText("Don't allow");
    if (await popup.isVisible()) {
      await popup.click();
    }
  }

  async searchProduct(product: string) {
    await this.page.mouse.move(200, 150);
    await this.searchInput.hover();
    await this.page.waitForTimeout(Math.random() * 1000 + 500);
    await this.searchInput.click();
    await this.page.keyboard.type(product, { delay: Math.random() * 100 + 100 });
    await this.page.waitForTimeout(Math.random() * 1000 + 500);
    await this.page.keyboard.press('Enter');
    await this.page.waitForURL(/instax-mini.html/, {waitUntil: "domcontentloaded"});
  }

  async navigateToSecondPage() {
    await this.secondPageButton.click();
    await this.page.waitForURL(/page=2/, {waitUntil: "domcontentloaded"});
  }

  //Assertions
  async checkSearchResultsLoaded() {
    await expect(this.page).toHaveTitle(/Instax Mini/);
    await expect(this.resultsLegend).toBeVisible();
  }

  async checkSecondItemStock() {
    await this.seconItemShoppingCartButton.click();
    await this.stockModal.waitFor();
    const stockQuantity = parseInt(await this.stockInput.getAttribute('value')|| '0');
    expect(stockQuantity, { message: 'There is at least one item in stock' }).toBeGreaterThanOrEqual(1);
  }
}
