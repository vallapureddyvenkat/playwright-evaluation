import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('01.Successful login', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);
  const dashboardPage: DashboardPage = new DashboardPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');

  await expect(page).toHaveURL(/dashboard/);
});

test('02.Failed login', async ({ page }) => {
  const loginPage: LoginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('Admin', 'wrongpassword');

  const error: string = await loginPage.getErrorMessage();
  expect(error).toContain('Invalid');
});