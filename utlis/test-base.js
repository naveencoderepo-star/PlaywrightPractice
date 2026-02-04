const base = require('@playwright/test');

exports.customTest = base.test.extend({
  testDataForOrder: {
    email: "naveenqtest@gmail.com",
    password: "Naveentest!1",
    productName: "ZARA COAT 3"
  }
});
