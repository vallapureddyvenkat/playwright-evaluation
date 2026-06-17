import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test('01.Employee search and validation', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  const dashboardPage: DashboardPage = new DashboardPage(page);
  const employeeListPage: EmployeeListPage = new EmployeeListPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  await dashboardPage.clickPIM();

  await employeeListPage.searchEmployee('a');
  await page.waitForTimeout(2000);
  const count: number = await employeeListPage.getRowCount();
  expect(count).toBeGreaterThan(0);

  const names: string[] = await employeeListPage.getAllNames();

  for (const name of names) {
    expect(name).not.toBe('');
  }
});