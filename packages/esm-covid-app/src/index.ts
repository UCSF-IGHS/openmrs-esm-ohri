import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import CovidVaccinations from './views/covid-vaccinations.encounter-list';
import CovidLabResults from './views/lab-results.encounter-list';
import CovidAssessment from './views/case-assessment.encounter-lists';
import CovidHomePatientTabs from './views/dashboard/patient-list-tabs/covid-patient-list-tabs.component';
import CovidSummaryTiles from './views/dashboard/summary-tiles/covid-summary-tiles.component';
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

export const covidPatientChartDashboard = getSyncLifecycle(createDashboardGroup(covidPatientChartMeta), options);

export const covidAssessmentDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...covidAssessmentsDashboardMeta, moduleName }),
  options,
);
export const covidVaccinationDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...covidVaccinationsDashboardMeta, moduleName }),
  options,
);
export const covidPatientChartDashboardLink = getSyncLifecycle(createOHRIDashboardLink(covidPatientChartMeta), options);
export const covidDashboardItemsLink = getSyncLifecycle(
  createOHRIDashboardLink(covidClinicalViewDashboardMeta),
  options,
);
export const covidLabResultsDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...covidLabTestsDashboardMeta, moduleName }),
  options,
);
export const covidDashboardHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'covid-home-header',
  moduleName,
});
export const covidDashboardTiles = getSyncLifecycle(CovidSummaryTiles, {
  featureName: 'covid-home-tiles',
  moduleName,
});
export const covidDashboardTabs = getSyncLifecycle(CovidHomePatientTabs, {
  featureName: 'covid-home-tabs',
  moduleName,
});
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
export const covidCasesDashboardLink = getSyncLifecycle(createOHRIDashboardLink(covid19CasesDashboardMeta), options);
export const covidCasesDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'covid cases dashboard',
  moduleName,
});
