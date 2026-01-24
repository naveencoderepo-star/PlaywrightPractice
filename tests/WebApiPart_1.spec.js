const { test, expect, request } = require('@playwright/test');

const loginPayLoad = {
  userEmail: "naveenqtest@gmail.com",
  userPassword: "Naveentest!1"
};

const createOrPayload = {
  orders: [
    { country: "India", productOrderedId: "6964a1cbc941646b7a91786b" }
  ]
};

const requestUrl = 'https://rahulshettyacademy.com/api/ecom/auth/login';

let token;
let orderId;

test.beforeAll(async () => {

  const apiContext = await request.newContext();

  // LOGIN
  const loginResponse = await apiContext.post(requestUrl, {
    headers: { 'Content-Type': 'application/json' },
    data: loginPayLoad
  });

  expect(loginResponse.status()).toBe(200);

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log("TOKEN:", token);

  // CREATE ORDER
  const orderResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      data: createOrPayload
    }
  );

  expect(orderResponse.status()).toBe(201);

  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];   // ✅ FIXED
  console.log("ORDER ID:", orderId);
});

test('@Webst App login', async ({ page }) => {

  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();

  const rows = page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderIdDetails).toContain(orderId);
});
