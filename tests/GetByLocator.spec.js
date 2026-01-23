const { test, expect } = require('@playwright/test');


test("getBy locator types", async ({browser}) => {

 const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/angularpractice/')
await page.pause();

await page.getByLabel('Check me out if you Love IceCreams!').click();
await page.getByLabel('Employed').click();
await page.getByLabel('Gender').selectOption('Female');
await page.getByPlaceHolder('Password').fill('Test@12345')






});





//=====================================

//npx playwright test tests/UIControlTest.spec.js
// npx playwright test --ui
//=====================================