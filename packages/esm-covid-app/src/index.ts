import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import CovidVaccinations from './covid/patient-chart/covid-vaccinations.component';
import CovidLabResults from './covid/patient-chart/lab-results.component';
import CovidAssessment from './covid/patient-chart/case-assessment.component';
import {
  covidAssessmentsDashboardMeta,
  covidLabTestsDashboardMeta,
  covidVaccinationsDashboardMeta,
  covidClinicalViewDashboardMeta,
  covid19CasesDashboardMeta,
  covidPatientChartMeta,
  reportingDemoDashboardMeta,
} from './dashboard.meta';
import { createOHRIDashboardLink, createOHRIGroupedLink } from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { configSchema } from './config-schema';
import Root from './root.component';
import ReportRoot from './report-root';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-covid-app';

require('./root.scss');

const options = {
  featureName: 'ohri-covid',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
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
export const covidCasesDashboard = getSyncLifecycle(Root, options);

export const reportingDemoDashboardLink = getSyncLifecycle(createOHRIGroupedLink(reportingDemoDashboardMeta), options);
export const reportingDemoDashboard = getSyncLifecycle(ReportRoot, options);
