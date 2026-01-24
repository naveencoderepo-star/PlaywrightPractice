const { test, expect } = require('@playwright/test')

test('Calendar test', async ({ browser }) => {
  const context = await browser.newContext()
  const page = await context.newPage()

  await page.goto(
    'https://rahulshettyacademy.com/seleniumPractise/#/offers',
    {
      waitUntil: 'domcontentloaded',
    }
  )

  const year = '2027'
  const monthNumber = '6'
  const date = '15'

  const expectedList = [monthNumber, date, year]

  await page.getByText('KART').waitFor()

  await page.click('.react-date-picker__inputGroup')
  await page.click('.react-calendar__navigation__label__labelText--from')
  await page.click('.react-calendar__navigation__label__labelText--from')
  await page.getByText(year).click()

  await page
    .locator('.react-calendar__year-view__months__month')
    .nth(Number(monthNumber) - 1)
    .click()

  await page.locator(`//abbr[text()='${date}']`).click()

  const inputs = page.locator('.react-date-picker__inputGroup__input')

  for (let i = 0; i < expectedList.length; i++) {
    const value = await inputs.nth(i).inputValue()
    expect(value).toEqual(expectedList[i])
  }
})
