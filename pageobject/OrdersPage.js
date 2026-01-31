const { expect } = require('@playwright/test');

class OrdersPage {
  constructor(page) {
    this.page = page;
    this.ordersButton = page.locator("button[routerlink*='myorders']");
    this.orderRows = page.locator("tbody tr");
    this.orderDetailsId = page.locator(".col-text");
  }

  async openOrder(orderId) {
    await this.ordersButton.click();
    await this.page.locator("tbody").waitFor();

    for (let i = 0; i < await this.orderRows.count(); i++) {
      const rowOrderId = await this.orderRows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
        await this.orderRows.nth(i).locator("button").first().click();
        break;
      }
    }
  }

  async verifyOrderDetails(orderId) {
    const detailsId = await this.orderDetailsId.textContent();
    expect(orderId.includes(detailsId)).toBeTruthy();
  }
}

module.exports = { OrdersPage };
