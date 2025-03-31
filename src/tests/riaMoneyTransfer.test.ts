import { test, expect, chromium, Browser, Page } from '@playwright/test';
import { RiaMoneyTransferPage } from '../pages/RiaMoneyTransferPage';

// Test data for India and United States
const indiaTestCase = { country: 'India', transferAmount: '100' };
const usaTestCase = { country: 'United States', transferAmount: '100' };

// India Test Case
test('Verify Ria Money Transfer functionality for India', async ({ page }) => {
  test.setTimeout(120000);  // Set timeout for this specific test case (2 minutes)

  const riaPage = new RiaMoneyTransferPage(page);

  // Navigate to the page and verify title
  await riaPage.navigateAndVerifyTitle();

  // Wait for calculator element to appear
  await riaPage.waitForCalculator();

  // Select country and enter the amount
  await riaPage.selectCountry(indiaTestCase.country);
  await riaPage.enterAmount(indiaTestCase.transferAmount);

  // Retrieve and verify promo rate for India
  const promoRate = await riaPage.getPromoRate();
  if (isNaN(promoRate)) {
    throw new Error("Failed to retrieve promo exchange rate.");
  }

  // Calculate expected recipient amount based on promo rate
  const expectedRecipientAmount = (parseFloat(indiaTestCase.transferAmount) * promoRate).toFixed(2);
  const displayedRecipientAmount = await riaPage.getRecipientAmount();

  // Verify the recipient amount
  expect(displayedRecipientAmount).toBeCloseTo(parseFloat(expectedRecipientAmount), 2);
  console.log(`Verification successful for India: Expected = ${expectedRecipientAmount}, Displayed = ${displayedRecipientAmount}`);
});


test('Verify Ria Money Transfer functionality for United States', async ({ page }) => {
  test.setTimeout(120000);  // Set timeout for this specific test case (2 minutes)

  const riaPage = new RiaMoneyTransferPage(page);

  // Navigate to the page and verify title
  await riaPage.navigateAndVerifyTitle();

  // Wait for calculator element to appear
  await riaPage.waitForCalculator();

  // Select country and enter the amount
  await riaPage.selectCountry(usaTestCase.country);
  await riaPage.enterAmount(usaTestCase.transferAmount);

  // Since no promo rate is required for the United States, just verify the recipient amount
  const expectedRecipientAmount = usaTestCase.transferAmount;
  const displayedRecipientAmount = await riaPage.getRecipientAmount();

  // Verify the recipient amount
  expect(displayedRecipientAmount).toBe(parseFloat(expectedRecipientAmount));
  console.log(`Verification successful for United States: Expected = ${expectedRecipientAmount}, Displayed = ${displayedRecipientAmount}`);
});
