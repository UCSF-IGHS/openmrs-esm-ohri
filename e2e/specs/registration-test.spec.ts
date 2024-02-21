import { test } from '../core';
import { expect } from '@playwright/test';
import { HomePage } from '../pages';
import { type Patient, generateRandomPatient, startVisit } from '../commands';
import { Visit } from '@openmrs/esm-framework';

let patient: Patient; 
let visit: Visit;

test.beforeEach(async ({ api }) => {
  patient = await generateRandomPatient(api);
  visit = await startVisit(api, patient.uuid);
});

test('Go to homepage and register patient', async ({ page }) => {
  const homePage = new HomePage(page);

  await test.step('When I visit the home page', async () => {
    await homePage.gotoHome();
  });

  await test.step('Then should be at the home page', async () => {
    await expect(page).toHaveURL(`${process.env.E2E_BASE_URL}/spa/home`);
  });

  await page.getByLabel('Add Patient').click();
  await page.getByLabel('First Name').click();
  await page.getByLabel('First Name').fill('daisy');
  await page.getByLabel('Family Name').click();
  await page.getByLabel('Family Name').fill('test');
  await page.getByText('Female').click();
  await page.getByRole('tab', { name: 'No' }).nth(1).click();
  await page.getByLabel('Estimated age in years').click();
  await page.getByLabel('Estimated age in years').fill('20');

  // Click on register patient button
  
  await page.getByRole('button', { name: 'Register Patient' }).click();
  
});
