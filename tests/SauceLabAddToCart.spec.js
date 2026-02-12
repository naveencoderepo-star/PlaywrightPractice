const { test, expect } = require('@playwright/test');

test('Sauce lab add to cart', async ({ page }) => {

  // Navigate to SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // Verify page title
  const title = await page.title();
  console.log(`The title is: ${title}`);
  await expect(page).toHaveTitle('Swag Labs');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Get all products
  const products = page.locator('.inventory_item');
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const name = await products.nth(i).locator('.inventory_item_name').textContent();
    const price = await products.nth(i).locator('.inventory_item_price').textContent();

    console.log(`Product: ${name} | Price: ${price}`);
  }

  // Add specific product to cart
  await page.getByText('Sauce Labs Backpack').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();

  // Go to cart
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  // Checkout
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

  // Fill checkout details
  await page.getByPlaceholder('First Name').fill('Naveen');
  await page.getByPlaceholder('Last Name').fill('Kumar');
  await page.getByPlaceholder('Zip/Postal Code').fill('6000101');

  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

  // Finish order
  await page.getByRole('button', { name: 'Finish' }).click();
});
