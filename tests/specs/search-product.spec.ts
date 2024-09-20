import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page';

test('Search for a product and check stock', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('Navigate to the Aliexpress homepage and close any popup', async () => {
    await homePage.navigateToHome();
    await homePage.closePopup();
  });

  await test.step('Search for "instax mini"', async () => {
    await homePage.searchProduct('instax mini');
  });

  await test.step('Check if search results for "instax mini" have loaded', async () => {
    await homePage.checkSearchResultsLoaded();
  });

  await test.step('Navigate to the second results page', async () => {
    await homePage.navigateToSecondPage();
  });

  await test.step('Check the stock availability of the second item in the list', async () => {
    await homePage.checkSecondItemStock();
  });

  await page.close();
});