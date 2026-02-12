const { test, expect } = require('@playwright/test');

test('Browser Context playwright test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

 const username = page.locator('#username');
  const password = page.locator("[type='password']");
  const signInBtn = page.locator('#signInBtn');
  const blockAlert = page.locator("[style*='block']");
  const cardTitles = page.locator('.card-title');


  await page.goto('https://rahulshettyacademy.com/loginpagePractise/',{waitUntil:'domcontentloaded'});

 
  await username.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');


// await page.locator('.customradio').nth(1).click();
//   const dropdown =  page.locator('select.form-control');
//     await dropdown.selectOption('consult');
//   await page.locator('#okayBtn').click();

await page.locator('.customradio').nth(1).click();
  await expect(page.locator('.customradio').nth(1)).toBeChecked();
// console.log( await page.locator('.customradio').nth(1).isChecked());





    //   await signInBtn.click();


//    await  page.pause();  // it will open e playwright inspector


});


// npx playwright test

// Blinking text verification 

test('blinking verification test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  
 const username = page.locator('#username');
  const password = page.locator("[type='password']");
 const blinkingText = page.locator("[href*='documents-request']");

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/',{waitUntil:'domcontentloaded'});

 
  await username.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');

  await expect(blinkingText).toHaveAttribute("class", "blinkingText");





});



test("Child window handling", async ({
	browser
}) => {
	test.setTimeout(100000);
	const context = await browser.newContext();
	const page = await context.newPage();
	const username = page.locator('#username');
	const password = page.locator("[type='password']");
	const signInBtn = page.locator('#signInBtn');
	const documentLink = page.locator("[href*='documents-request']");


	await page.goto("https://rahulshettyacademy.com/loginpagePractise/",{waitUntil:'domcontentloaded'});

	const [newPage] = await Promise.all([
		context.waitForEvent('page'),
		documentLink.click()
	])

	const fullLengthText = await newPage.locator(".red").textContent();
	const arrtext = fullLengthText.split("@");
	const domainName = arrtext[1].split(" ")[0];

	const domainNameWithoutDot = domainName.split(".")[0];

	console.log(domainNameWithoutDot);
	await username.fill(domainNameWithoutDot);
	await password.fill("Learning@830$3mK2");

  const printUsername = await username.inputValue();
  console.log(printUsername);

  const printPassword = await password.inputValue();
  console.log(printPassword);

	await signInBtn.click();
  	// await page.pause();




});






test("Child  handling", async ({browser}) => {

 const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/angularpractice/',{waitUntil:'domcontentloaded'});
// await page.pause();

await page.getByLabel('Check me out if you Love IceCreams!').click();
await page.getByLabel('Employed').click();
await page.getByLabel('Gender').selectOption('Female');






});





//=====================================

//npx playwright test tests/UIControlTest.spec.js
//=====================================