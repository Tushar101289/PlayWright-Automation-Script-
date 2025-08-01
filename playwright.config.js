// @ts-check
import { defineConfig, devices } from '@playwright/test';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 10_000,
  reporter :'html',
  use: {

    browserName : 'chromium'
 

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
 
  }, 
});
module.exports = config

