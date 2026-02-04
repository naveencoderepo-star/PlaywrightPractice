const { test } = require('@playwright/test')

const {customTest} = require('../utlis/test-base')

const { LoginPage } = require('../pageobject/LoginPage')
const { DashboardPage } = require('../pageobject/DashboardPage')
const { CartPage } = require('../pageobject/CartPage')
const { CheckoutPage } = require('../pageobject/CheckoutPage')
const { OrdersPage } = require('../pageobject/OrdersPage')

const dataset = require('../utlis/placeOrderTestData.json')

test.describe('Place Order – Data Driven', () => {
  for (const data of dataset) {

    test(`@Webst Client App ${data.productName}`, async ({ page }) => {

      const loginPage = new LoginPage(page)
      const dashboardPage = new DashboardPage(page)
      const cartPage = new CartPage(page)
      const checkoutPage = new CheckoutPage(page)
      const ordersPage = new OrdersPage(page)

      await loginPage.goTo()
      await loginPage.validLogin(data.email, data.password)

      await dashboardPage.addProductToCart(data.productName)
      await dashboardPage.goToCart()

      await cartPage.verifyProductInCart(data.productName)
      await cartPage.checkout()

      await checkoutPage.selectCountry('ind')
      await checkoutPage.verifyEmail(data.email)

      const orderId = await checkoutPage.placeOrder()
      console.log('Order ID:', orderId)

      await ordersPage.openOrder(orderId)
      await ordersPage.verifyOrderDetails(orderId)
    })






  }

  customTest.only('@Webst Client App Fixture', async ({ page, testDataForOrder }) => {
    const loginPage = new LoginPage(page)
    const dashboardPage = new DashboardPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const ordersPage = new OrdersPage(page)

    await loginPage.goTo()
    await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password)

    await dashboardPage.addProductToCart(testDataForOrder.productName)
    await dashboardPage.goToCart()
  })
})
