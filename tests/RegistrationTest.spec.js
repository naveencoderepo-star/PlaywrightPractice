const { test, expect } = require('@playwright/test');

test('Registration flow', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  
    const email = "fsfs@gmail.com";
   const productName = 'zara coat 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Tester12345!");
   await page.locator("[value='Login']").click();
   await page.locator('.card-body b').first().waitFor();
   const titles = await page.locator(".card-body b").last().textContent();
   console.log(titles); 


});
