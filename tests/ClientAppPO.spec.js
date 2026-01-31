const { test } = require('@playwright/test')
const { LoginPage } = require('../pageobject/LoginPage')
const { DashboardPage } = require('../pageobject/DashboardPage')
const { CartPage } = require('../pageobject/CartPage')
const { CheckoutPage } = require('../pageobject/CheckoutPage')
const { OrdersPage } = require('../pageobject/OrdersPage')

test('@Webst Client App – place order flow', async ({ page }) => {
  const email = 'anshika@gmail.com'
  const password = 'Iamking@000'
  const productName = 'ZARA COAT 3'

  const loginPage = new LoginPage(page)
  const dashboardPage = new DashboardPage(page)
  const cartPage = new CartPage(page)
  const checkoutPage = new CheckoutPage(page)
  const ordersPage = new OrdersPage(page)

  await loginPage.goTo()
  await loginPage.validLogin(email, password)

  await dashboardPage.addProductToCart(productName)
  await dashboardPage.goToCart()

  await cartPage.verifyProductInCart(productName)
  await cartPage.checkout()

  await checkoutPage.selectCountry('ind')
  await checkoutPage.verifyEmail(email)
  const orderId = await checkoutPage.placeOrder()

  console.log('Order ID:', orderId)

  await ordersPage.openOrder(orderId)
  await ordersPage.verifyOrderDetails(orderId)
})
