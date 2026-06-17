import { Page, Locator } from '@playwright/test';

export class EmployeeListPage {
  private readonly page: Page;
  private readonly employeeSearchInput: Locator;
  private readonly searchButton: Locator;
  private readonly resultRows: Locator;
  private readonly nameCells: Locator;

  public constructor(page: Page) {
    this.page = page;
    this.employeeSearchInput = page.locator('input[placeholder="Type for hints..."]').first();
    this.searchButton = page.locator('button[type="submit"]');
    this.resultRows = page.locator('.oxd-table-body .oxd-table-card');
    this.nameCells = page.locator('.oxd-table-body .oxd-table-row div:nth-child(3)');
  }

  public async searchEmployee(name: string): Promise<void> {
    await this.employeeSearchInput.pressSequentially(name);
    await this.searchButton.click();
  }

  public async getRowCount(): Promise<number> {
    return await this.resultRows.count();
  }

  public async getAllNames(): Promise<string[]> {
    const names: string[] = [];
    const count: number = await this.nameCells.count();

    for (let i: number = 0; i < count; i++) {
      const text: string = (await this.nameCells.nth(i).textContent())?.trim() ?? '';
      names.push(text);
    }

    return names;
  }
}