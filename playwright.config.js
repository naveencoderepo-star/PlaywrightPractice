import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30 * 1000,

  expect: {
    timeout: 5 * 1000,
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    navigationTimeout: 60 * 1000,
    headless: true, // ✅ REQUIRED for GitHub Actions
    viewport: null,
  },
});
