import { test, expect } from '@playwright/test';

test('registration', async ({ page }) => {
  // Accessing E2E_BASE_URL from environment variables
  const baseUrl = process.env.E2E_BASE_URL;

  // Navigating to the specified base URL
  await page.goto(`${baseUrl}/spa/login`);

  // Filling in username and clicking continue
  await page.getByLabel('Username').fill('admin');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Password').press('CapsLock');
  await page.getByLabel('Password').fill('Admin123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByRole('button', { name: 'Add Patient' }).click();
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').press('CapsLock');
  await page.getByLabel('First Name').fill('Lilian');
  await page.getByLabel('First Name').press('Tab');
  await page.getByLabel('Middle Name (optional)').press('CapsLock');
  await page.getByLabel('Middle Name (optional)').fill('M');
  await page.getByLabel('Middle Name (optional)').press('Tab');
  await page.getByLabel('Family Name').fill('');
  await page.getByLabel('Family Name').press('CapsLock');
  await page.getByLabel('Family Name').fill('Lee');
  await page.getByText('Female').click();
  await page.getByPlaceholder('dd/mm/YYYY').click();
  await page.getByPlaceholder('dd/mm/YYYY').fill('01/01/1988');
  await page.getByPlaceholder('dd/mm/YYYY').press('Tab');
  await page.getByLabel('Country (optional)').click();
  await page.getByLabel('Country (optional)').click();
  await page.getByLabel('Country (optional)').fill('');
  await page.getByLabel('Country (optional)').press('CapsLock');
  await page.getByLabel('Country (optional)').fill('Kenya');
  await page.getByRole('button', { name: 'Register Patient' }).click();
  await page.locator('[id="single-spa-application\\:\\@openmrs\\/esm-patient-chart-app-page-0"]').getByLabel('OpenMRS').locator('div').filter({ hasText: 'Close' }).click();
  await page.locator('[id="single-spa-application\\:\\@openmrs\\/esm-patient-chart-app-page-0"]').getByRole('link', { name: 'Logo' }).click();
  await page.getByTestId('searchPatientIcon').click();
  await page.getByTestId('patientSearchBar').press('CapsLock');
  await page.getByTestId('patientSearchBar').fill('Lilian');
});
