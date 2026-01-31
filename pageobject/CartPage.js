const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;

    // locators (nouns)
    this.cartProducts = page.locator("div li").first();
    this.checkoutButton = page.locator("text=Checkout");
  }

  // actions (verbs)
  async verifyProductInCart(productName) {
    await this.cartProducts.waitFor();
    const visible = await this.getProductLocator(productName).isVisible();
    expect(visible).toBeTruthy();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  getProductLocator(productName) {
    return this.page.locator(`h3:has-text("${productName}")`);
  }
}

module.exports = { CartPage };
