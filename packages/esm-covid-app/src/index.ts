import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  covidAssessmentsDashboardMeta,
  covidLabTestsDashboardMeta,
  covidVaccinationsDashboardMeta,
  covidClinicalViewDashboardMeta,
  covid19CasesDashboardMeta,
  covidPatientChartMeta,
} from './dashboard.meta';
import { createOHRIDashboardLink, OHRIHome, OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-covid-app';

require('./root.scss');

const options = {
  featureName: 'ohri-covid',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {});
}

export const covidDashboard = getSyncLifecycle(createDashboardGroup(covidPatientChartMeta), options);
export const covidSummaryDashboardLink = getSyncLifecycle(
  createOHRIDashboardLink(covidClinicalViewDashboardMeta),
  options,
);
export const covidAssessmentDashboardLink = getSyncLifecycle(
  createDashboardLink(covidAssessmentsDashboardMeta),
  options,
);
export const covidVaccinationDashboardLink = getSyncLifecycle(
  createDashboardLink(covidVaccinationsDashboardMeta),
  options,
);
export const covidPatientChartDashboardLink = getSyncLifecycle(createOHRIDashboardLink(covidPatientChartMeta), options);
export const covidDashboardItemsLink = getSyncLifecycle(
  createOHRIDashboardLink(covidClinicalViewDashboardMeta),
  options,
);
export const covidLabResultsDashboardLink = getSyncLifecycle(createDashboardLink(covidLabTestsDashboardMeta), options);
export const covidDashboardHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'covid-home-header',
  moduleName,
});
export const covidDashboardTiles = getAsyncLifecycle(
  () => import('./views/dashboard/summary-tiles/covid-summary-tiles.component'),
  {
    featureName: 'covid-home-tiles',
    moduleName,
  },
);
export const covidDashboardTabs = getAsyncLifecycle(
  () => import('./views/dashboard/patient-list-tabs/covid-patient-list-tabs.component'),
  {
    featureName: 'covid-home-tabs',
    moduleName,
  },
);
export const covidAssessmentsDashboard = getAsyncLifecycle(() => import('./views/case-assessment.encounter-lists'), {
  featureName: 'covid-assessment',
  moduleName,
});
export const covidLabResultsDashboard = getAsyncLifecycle(() => import('./views/lab-results.encounter-list'), {
  featureName: 'covid-lab-results',
  moduleName,
});
export const covidVaccinationsDashboard = getAsyncLifecycle(() => import('./views/covid-vaccinations.encounter-list'), {
  featureName: 'covid-vaccinations',
  moduleName,
});
export const covidCasesDashboardLink = getSyncLifecycle(createOHRIDashboardLink(covid19CasesDashboardMeta), options);
export const covidCasesDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'covid cases dashboard',
  moduleName,
});
