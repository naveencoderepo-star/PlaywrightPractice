import { test, expect } from '@playwright/test';


test.describe.configure({mode:'serial'})

test('More validation test', async ({ page }) => {

  await page.goto(
    'https://rahulshettyacademy.com/AutomationPractice/',
    { waitUntil: 'domcontentloaded' }
  );

  // Hide / Show validation
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.getByRole('button', { name: 'Hide' }).click();
  await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

  // Alert handling
  page.on('dialog', dialog => dialog.accept());
  await page.locator('#confirmbtn').click();

  // Mouse hover
  await page.locator('#mousehover').hover();
  await page.getByRole('link', { name: 'Top' }).click();

  // Iframe handling
  const childpage = page.frameLocator('#courses-iframe');
  await childpage.getByRole('link', { name: 'All Access' }).click();

  const fetchedText = await childpage.locator('.text h2').textContent();
  const subscriberCount = fetchedText.split(' ')[1];

  console.log('Subscriber count:', subscriberCount);
});



test('Screenshot & Visual comparison test', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto(
    'https://rahulshettyacademy.com/AutomationPractice/',
    { waitUntil: 'domcontentloaded' }
  );

  const displayedText = page.locator('#displayed-text');

  // Wait for element to exist in DOM
  await displayedText.waitFor({ state: 'attached', timeout: 10000 });

  // Force visibility if needed
  if (!(await displayedText.isVisible())) {
    await page.getByRole('button', { name: 'Show' }).click();
  }

  await expect(displayedText).toBeVisible({ timeout: 10000 });

  // Take screenshot safely
  await displayedText.screenshot({ path: 'partialLocator.png' });
});
