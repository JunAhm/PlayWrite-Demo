# Playwright Test Automation Project

This project is a test automation setup using Playwright for end-to-end testing. The tests are configured to run in parallel, and results are captured in HTML format for easy review.

## Prerequisites

- Node.js >= v22.14.0 (Recommended version)
- npm (Node Package Manager)

## Install dependencies: Make sure you're in the project directory, then run the following command:
npm install

## Running the Tests
npx playwright test

## Test Configuration
The tests are configured to run in headless mode by default, but you can change this to false in the playwright.config.ts file if you want to watch the tests in the browser UI.

Tests are set to run in parallel with 2 workers by default, but you can adjust the number of workers in the config file if needed.

## Viewing Test Results
After running the tests, Playwright will generate an HTML report with the results.

HTML Report Location: The HTML report will be saved in the test-results/ folder under the project root.

## How to view the report: Open the index.html file in your browser from the test-results/ folder:

open test-results/index.html