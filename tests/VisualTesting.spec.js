const { test, expect } = require('@playwright/test');

test('Visual test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();


  await page.goto('https://google.com',{waitUntil: 'domcontentloaded'});


  page.getByText('Store').waitFor({timeout: '10000'})

  expect(await page.screenshot()).toMatchSnapshot('landing.png');




});




