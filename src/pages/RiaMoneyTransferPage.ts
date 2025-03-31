// pages/RiaMoneyTransferPage.ts
import { Page, expect } from '@playwright/test';

export class RiaMoneyTransferPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the Ria Money Transfer page and verify the title
  async navigateAndVerifyTitle() {
    await this.page.goto('https://www.riamoneytransfer.com/en-us/');
    // Verify the page title
    await expect(this.page).toHaveTitle(/Ria Money Transfer/);
    console.log("Page title verified successfully.");
  }

  // Wait for the calculator (calc-heading) element to appear
  async waitForCalculator() {
    await this.page.waitForSelector('.calc-heading', { timeout: 120000, state: 'attached' });
    console.log("The 'calc-heading' element is now attached.");
  }

  // Select the country from the dropdown
  async selectCountry(country: string) {
    await this.page.waitForSelector('div.truncate.dropdown-selected', { timeout: 60000 });
    await this.page.locator('div.truncate.dropdown-selected', { hasText: 'Send to' }).click();
    console.log("Clicked country dropdown");
    await this.page.waitForSelector('.dropdown-list', { timeout: 60000 });
    await this.page.locator('.dropdown-list >> text=' + country).click();
    console.log(`Selected '${country}' from dropdown`);
  }

  // Enter the transfer amount
  async enterAmount(amount: string) {
    await this.page.waitForSelector('input[placeholder="0"]', { timeout: 60000, state: 'visible' });
    await this.page.waitForSelector('.loading', { state: 'detached', timeout: 60000 });
    console.log("Loading completed.");
    await this.page.locator('div:has-text("You send") input[placeholder="0"]').first().click();
    await this.page.keyboard.press('Control+A');
    await this.page.keyboard.press('Backspace');
    console.log("Cleared the input field");
    await this.page.keyboard.type(amount);
    await this.page.keyboard.press('Enter');
  }

  // Retrieve the promo rate
  async getPromoRate(): Promise<number> {
    await this.page.waitForSelector('span.text-promo-rate', { visible: true, timeout: 120000 });
    const promoRateText = await this.page.locator('.text-promo-rate').innerText();
    const promoRate = parseFloat(promoRateText);
    if (isNaN(promoRate)) {
      throw new Error("Failed to retrieve promo exchange rate.");
    }
    console.log(`Promo rate: ${promoRate}`);
    return promoRate;
  }

  // Get the recipient amount displayed on the page
  async getRecipientAmount(): Promise<number> {
    const recipientAmountText = await this.page.locator('input[placeholder="0"]').nth(1).inputValue();
    console.log(`Recipient Amount Text: ${recipientAmountText}`);
    return parseFloat(recipientAmountText.replace(/,/g, ''));
  }
}
