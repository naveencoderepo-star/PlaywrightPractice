import { defineConfig, devices } from '@playwright/test';

const config= ({
  testDir: './tests',  // Directory containing the test files

  timeout: 30 * 1000,  // Timeout for each test (in ms)

  expect: {
    timeout: 5 * 1000,  // Timeout for each expect assertion
  },

  reporter: 'html',  // Use HTML reporter for test results

  use: {
    browserName: 'firefox',  // Browser configuration
    navigationTimeout: 60 * 1000,  // Timeout for page navigation
    headless: false,  // Run tests in headed mode
    viewport: null,  // to use the full available screen size by default setting viewport to null
  },
});


module.exports = config;
