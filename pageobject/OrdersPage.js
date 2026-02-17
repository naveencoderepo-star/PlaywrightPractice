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
    
    // Extract clean ID if it contains pipes (common in this app's confirmation page)
    const cleanId = orderId.includes('|') ? orderId.split('|')[1].trim() : orderId.trim();
    
    // Use filter to find the specific row and click its View button
    // This auto-waits for the row to appear, unlike the previous manual loop
    const row = this.orderRows.filter({ hasText: cleanId });
    await row.locator("button").filter({ hasText: "View" }).click();
  }

  async verifyOrderDetails(orderId) {
    // Wait for the details element to be visible before reading text
    await this.orderDetailsId.waitFor({ state: 'visible' });
    const detailsId = await this.orderDetailsId.textContent();
    
    // Check if the IDs match (ignoring potential formatting differences)
    expect(orderId.includes(detailsId.trim())).toBeTruthy();
  }
}

module.exports = { OrdersPage };
