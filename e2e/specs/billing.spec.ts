import { test } from '../core';
import { expect } from '@playwright/test';
import { BillingPage } from '../pages';

test('Navigating to the Billing page Dashboard from the Home page', async ({ page }) => {
  const homePage = new BillingPage(page);

  await test.step('When I visit the home page', async () => {
    await homePage.gotoHome();
  });
  await test.step('Then, the user should be capable of navigating to the billing page.', async () => {
    await page.getByRole('link', { name: 'Billing' }).click();
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/home/billing`);
  });

  await test.step('Then, it should be possible to observe Cumulative, Pending, and Paid bills.', async () => {
    await expect(page.getByRole('heading', { name: 'Cumulative Bills' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pending Bills' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Paid Bills' })).toBeVisible();
  });
});