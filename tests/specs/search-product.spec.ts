import { test } from '@playwright/test';
import { HomePage } from '../pages/home-page'; 

test('Search for a product and check stock', async ({ page }) => {
  const homePage = new HomePage(page);

  // Navigate to the Aliexpress homepage and close any popup
  await homePage.navigateToHome();
  await homePage.closePopup();

  // Search for 'instax mini'
  await homePage.searchProduct('instax mini');

  // Check if search results for 'instax mini' have loaded
  await homePage.checkSearchResultsLoaded();

  // Navigate to the second results page
  await homePage.navigateToSecondPage();

  // Check the stock availability of the second item in the list
  await homePage.checkSecondItemStock();

  // Close the page after the test
  await page.close();
});