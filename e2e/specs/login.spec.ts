import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ohri-working.globalhealthapp.net/openmrs/spa/login');
  await page.getByLabel('Username').fill('admin');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Password').press('CapsLock');
  await page.getByLabel('Password').fill('A');
  await page.getByLabel('Password').press('CapsLock');
  await page.getByLabel('Password').fill('Admin123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByText('Community Outreach').click();
  await page.getByRole('button', { name: 'Confirm' }).click();
});