const { test, expect } = require('@playwright/test');


test("getBy locator types", async ({browser}) => {

 const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/angularpractice/')
// await page.pause();


await page.fill('input[name="name"]','Test user')
await page.fill('input[name="email"]','testuser123@gmail.com')
await page.getByPlaceholder('Password').fill('Test@12345')
await page.getByLabel('Check me out if you Love IceCreams!').click()
await page.getByLabel('Gender').selectOption('Female')
await page.getByLabel('Employed').click();
await page.getByRole('button',{name:'Submit'}).click()
await page.getByRole('link',{name:'Shop'}).click()
await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click()


});





//=====================================

//npx playwright test tests/UIControlTest.spec.js
// npx playwright test --ui
//=====================================