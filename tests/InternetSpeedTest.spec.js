const { test, expect } = require('@playwright/test');


test('Internet speed test', async ({ page }) => {
    test.setTimeout(180000);

    await page.goto('https://fast.com', { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    // Wait for the 'Show more info' link to be visible, indicating the test is complete
    const showMoreDetails = page.locator('#show-more-details-link');
    await showMoreDetails.waitFor({ state: 'visible' });

    const speed = await page.locator('#speed-value').textContent();
    const unit = await page.locator('#speed-units').textContent();
    console.log(`Internet speed is: ${speed} ${unit}`);
    // await page.close();
});

test('Sauce lab add to cart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // 1. Get the title correctly
    const title = await page.title();
    console.log(`The title is: ${title}`);

    // 2. Proper assertion (This will pass if title is 'Swag Labs')
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce'); 
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify login was successful by checking the URL or a header
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


const products = page.locator('.inventory_item');
const count = await products.count();

for (let i = 0; i < count; i++) {
    const name = await page.locator('.inventory_item_name').nth(i).textContent();
    const price = await page.locator('.inventory_item_price').nth(i).textContent();

    console.log(`Product: ${name} | Price: ${price}`);
}


await page.getByText('Sauce Labs Backpack').click();

await page.getByRole('button',{name: 'Add to cart'}).click();


await page.click('.shopping_cart_link');


await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

await page.getByRole('button',{name: 'Checkout'}).click();

await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');


await page.getByPlaceholder("First Name").fill("Naveen");

await page.getByPlaceholder("Last Name").fill("Kumar");

await page.getByPlaceholder("Zip/Postal Code").fill("6000101");

await page.getByRole('button',{name:'Continue'}).click();

await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');


await page.getByRole('button',{name:'Finish'}).click();








// expect

});
