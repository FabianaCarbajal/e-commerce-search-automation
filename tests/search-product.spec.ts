import { test, expect } from '@playwright/test';

test('Search for a product and check stock', async ({ page }) => {
    //Navigate to Aliexpress 
    await page.goto('https://www.aliexpress.us/');
    await page.waitForLoadState('domcontentloaded');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/AliExpress/);

    //Close suscription popup if is visible
    if (await page.getByText("Don't allow").isVisible()) {
        await page.getByText("Don't allow").click();
    }

    // Search for 'instax mini' - simulating human behavior to avoid Captcha
    await page.mouse.move(200, 150);
    await page.locator('#search-words').hover();
    await page.waitForTimeout(Math.random() * 1000 + 500);
    await page.locator('#search-words').click();
    await page.keyboard.type('instax mini', { delay: Math.random() * 100 + 100 });
    await page.waitForTimeout(Math.random() * 1000 + 500);
    await page.keyboard.press('Enter');
    await page.waitForURL(/instax-mini.html/);
    await page.waitForLoadState('domcontentloaded');

    //Check results for instax mini are loaded
    await expect(page).toHaveTitle(/Instax Mini/);
    await expect(page.getByRole('heading', { name: 'Results for instax mini' })).toBeVisible();

    //Navigate to second results pages
    await page.getByRole('list').getByText('2').click();
    await page.waitForURL(/page=2/);

    //Check second item availability
    await page.locator('(//div[contains(@class,"multi--shopCart")])[2]').click();
    await page.locator('div.comet-v2-modal-body').waitFor();
    const stockText = await page.locator('input.comet-v2-input-number-input').getAttribute('value');
    console.log('stock: '+stockText);

    // Check if stockText is null
    if (stockText !== null) {
        // Extract the number from the string using a regular expression
        const stockNumber =  parseInt(stockText || '0');

        // Assert that the number is greater than or equal to 1
        expect(stockNumber).toBeGreaterThanOrEqual(1);
    } else {
        throw new Error('Stock information element not found or text is null');
    }
    await page.close();

});