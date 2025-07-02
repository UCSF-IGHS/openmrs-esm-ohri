import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import CovidVaccinations from './covid/patient-chart/covid-vaccinations.component';
import CovidLabResults from './covid/patient-chart/lab-results.component';
import CovidAssessment from './covid/patient-chart/case-assessment.component';
import { covidClinicalViewDashboardMeta, covid19CasesDashboardMeta } from './dashboard.meta';
import { createOHRIDashboardLink, createOHRIGroupedLink } from '@ohri/openmrs-esm-ohri-commons-lib';
import { configSchema } from './config-schema';
import rootComponent from './root.component';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-covid-app';

const options = {
  featureName: 'ohri-covid',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const covidDashboardItemsLink = getSyncLifecycle(
  createOHRIDashboardLink(covidClinicalViewDashboardMeta),
  options,
);

export const covidAssessmentsDashboard = getSyncLifecycle(CovidAssessment, {
  featureName: 'covid-assessment',
  moduleName,
});
export const covidLabResultsDashboard = getSyncLifecycle(CovidLabResults, {
  featureName: 'covid-lab-results',
  moduleName,
});
export const covidVaccinationsDashboard = getSyncLifecycle(CovidVaccinations, {
  featureName: 'covid-vaccinations',
  moduleName,
});

// OHRI HOME
export const covidClinicalViewDashboardLink = getSyncLifecycle(
  createOHRIDashboardLink(covidClinicalViewDashboardMeta),
  options,
);
export const covidCasesDashboardLink = getSyncLifecycle(createOHRIGroupedLink(covid19CasesDashboardMeta), options);
export const covidCasesDashboard = getSyncLifecycle(rootComponent, options);
