const { test, expect } = require('@playwright/test');


test('locator test', async ({browser})=>{

    const context = await browser.newContext();
  const page = await context.newPage();



await page.goto('https://www.demoblaze.com/');

await page.click('#id="login2"')

await page.fill('#loginusername','naveen')

await page.fill('#loginpassword','test@12345')


await page.pause();


})
