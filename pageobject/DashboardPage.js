class DashboardPage {
  constructor(page) {
    this.page = page
    this.products = page.locator('.card-body')
    this.cartButton = page.locator("[routerlink*='cart']")
  }

  async addProductToCart(productName) {
    await this.page.locator('.card-body b').first().waitFor()
    const count = await this.products.count()

    for (let i = 0; i < count; i++) {
      const text = await this.products.nth(i).locator('b').textContent()
      if (text?.trim() === productName) {
        await this.products
          .nth(i)
          .locator('text=Add To Cart')
          .click()
        break
      }
    }
  }

  async goToCart() {
    await this.cartButton.click()
  }
}

module.exports = { DashboardPage }
