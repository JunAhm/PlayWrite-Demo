import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000, // Global timeout for tests
  retries: 1, // Retry failed tests once
  workers: 2, // Adjust workers for parallel execution
  reporter: [
    ['html', { outputFolder: 'test-results', open: 'never' }], // HTML report generation
    ['line'], // Line-based reporting (optional)
  ],
  projects: [
    {
      name: 'chrome', // Project name
      use: {
        browserName: 'chromium', // Use Chromium browser
        headless: false, // Set to false if you want to see the browser UI
        launchOptions: {
          args: ['--no-sandbox', '--disable-setuid-sandbox'], // Additional launch options for Chromium
        },
      },
    },
  ],
});
