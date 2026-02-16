import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  retries: 1,

  expect: {
    timeout: 5 * 1000,
  },

  reporter: [['html', { open: 'always' }]],

  use: {
    browserName: 'chromium',
    headless: false,
    viewport: null,
    navigationTimeout: 60 * 1000,

    // screenshot: 'only-on-failure',
    video: 'on',
    // trace: 'on-first-retry',
    trace:'on',
    screenshot: 'on',
  },

  retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 1 : undefined,
})
