import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  private readonly page: Page;
  private readonly pimMenu: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.locator('//span[text()="PIM"]');
  }

  public async clickPIM(): Promise<void> {
    await this.pimMenu.click();
  }

  public async getURL(): Promise<string> {
    return this.page.url();
  }
}