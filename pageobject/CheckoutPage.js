const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.emailText = page.locator(".user__name [type='text']").first();
    this.submitButton = page.locator(".action__submit");
  }

  async selectCountry(countryCode) {
    await this.page.locator("[placeholder*='Country']")
      .pressSequentially(countryCode, { delay: 150 });

    const dropdown = this.page.locator(".ta-results");
    await dropdown.waitFor();

    const options = dropdown.locator("button");
    for (let i = 0; i < await options.count(); i++) {
      if ((await options.nth(i).textContent()) === " India") {
        await options.nth(i).click();
        break;
      }
    }
  }

  async verifyEmail(email) {
    await expect(this.emailText).toHaveText(email);
  }

  async placeOrder() {
    await this.submitButton.click();
    const orderId = await this.page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();
    return orderId;
  }
}

module.exports = { CheckoutPage };
