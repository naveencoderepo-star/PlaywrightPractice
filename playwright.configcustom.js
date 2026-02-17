import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  workers: 10,

  expect: {
    timeout: 5 * 1000,
  },

  reporter: [['html', { open: 'never' }]],

  projects:[


{

  name: 'Edge',
  use: {
    browserName: 'chromium',
    channel: 'msedge',
    headless: !!process.env.CI,
    viewport: null,
    navigationTimeout: 60 * 1000,
    video: 'only-on-failure',
    trace:'on',
    screenshot: 'only-on-failure',
  }




},

{

  name: 'Chrome',
  use: {
    browserName: 'chromium',
    channel: 'chrome',
    headless: !!process.env.CI,
    viewport: null,
    navigationTimeout: 60 * 1000,
    video: 'only-on-failure',
    trace:'on',
    screenshot: 'only-on-failure',
    // permissions: ['geolocation','notifications','camera','mic'],
    // ignoreHTTPSErrors: true,
    // ...devices['Pixel 7']
  }




},




{
  name: 'Safari',
  use: {
    browserName: 'webkit',
    headless: !!process.env.CI,
    // viewport: null,
    navigationTimeout: 60 * 1000,
    video: 'on-first-retry',
    trace:'on',
    viewport:{width: 390, height: 844 },
    screenshot: 'only-on-failure',
    // ...devices['iphone 12']
  }
},

{
  name: 'Firefox',
  use: {
    browserName: 'firefox',
    headless: !!process.env.CI,
    viewport: null,
    navigationTimeout: 60 * 1000,
    video: 'only-on-failure',
    trace:'on',
    screenshot: 'only-on-failure',
    permissions: ['geolocation','notifications','camera','mic'],
    ignoreHTTPSErrors: true,
  }
}



  ],


  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
})
