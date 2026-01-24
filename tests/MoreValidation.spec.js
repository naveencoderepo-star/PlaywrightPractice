const { test, expect } = require('@playwright/test')

test('More validation test', async ({ page }) => {

  await page.goto(
    'https://rahulshettyacademy.com/AutomationPractice/',
    { waitUntil: 'domcontentloaded' }
  )

  await page.reload({ waitUntil: 'domcontentloaded' })
//   await page.goBack({ waitUntil: 'domcontentloaded' })

  await expect(page.locator('#displayed-text')).toBeVisible()
  await page.getByRole('button', { name: 'Hide' }).click()
  await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden()

  page.on('dialog', dialog => dialog.accept())
  await page.locator('#confirmbtn').click()

  await page.locator('#mousehover').hover()
  await page.getByRole('link', { name: 'Top' }).click()

  const childpage = page.frameLocator('#courses-iframe')

  await childpage.locator("a[href*='lifetime-access']").waitFor({ timeout: 15000 })
  await childpage.locator("a[href*='lifetime-access']").first().click()

  const fetchedText = await childpage.locator('.text h2').textContent()
  const subscriberCount = fetchedText.split(' ')[1]

  console.log(subscriberCount)

})
