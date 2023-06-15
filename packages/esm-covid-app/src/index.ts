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

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-covid-app';

require('./root.scss');

function setupOpenMRS() {
  const options = {
    featureName: 'ohri-covid',
    moduleName,
  };

  defineConfigSchema(moduleName, {});
  return {
    pages: [],
    extensions: [
      {
        id: 'covid-home-header-ext',
        slot: 'covid-home-header-slot',
        load: getSyncLifecycle(OHRIWelcomeSection, {
          featureName: 'covid-home-header',
          moduleName,
        }),
      },
      {
        id: 'covid-home-tile-ext',
        slot: 'covid-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./views/dashboard/summary-tiles/covid-summary-tiles.component'), {
          featureName: 'covid-home-tiles',
          moduleName,
        }),
      },
      {
        id: 'covid-home-tabs-ext',
        slot: 'covid-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./views/dashboard/patient-list-tabs/covid-patient-list-tabs.component'), {
          featureName: 'covid-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'covid-dashboard-items',
        slot: 'dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(covidClinicalViewDashboardMeta), options),
        meta: covidClinicalViewDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-cases-dashboard-ext',
        slot: 'ohri-covid-dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(covid19CasesDashboardMeta), options),
        meta: covid19CasesDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-cases-dashboard',
        slot: 'covid-cases-dashboard-slot',
        load: getSyncLifecycle(OHRIHome, {
          featureName: 'covid cases dashboard',
          moduleName,
        }),
        meta: covid19CasesDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-covid',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardGroup(covidPatientChartMeta), options),
        meta: covidPatientChartMeta,
        online: true,
        offline: true,
        order: 23,
      },
      {
        id: 'covid-assessments-dashboard',
        slot: 'ohri-covid-patient-chart-slot',
        load: getSyncLifecycle(createDashboardLink(covidAssessmentsDashboardMeta), options),
        meta: covidAssessmentsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-lab-results',
        slot: 'ohri-covid-patient-chart-slot',
        load: getSyncLifecycle(createDashboardLink(covidLabTestsDashboardMeta), options),
        meta: covidLabTestsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-vaccinations-dashboard',
        slot: 'ohri-covid-patient-chart-slot',
        load: getSyncLifecycle(createDashboardLink(covidVaccinationsDashboardMeta), options),
        meta: covidVaccinationsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-assessments-ext',
        slot: 'covid-assessments-dashboard-slot',
        load: getAsyncLifecycle(() => import('./views/case-assessment.encounter-lists'), {
          featureName: 'covid-assessment',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'covid-Lab-results-ext',
        slot: 'covid-lab-dashboard-slot',
        load: getAsyncLifecycle(() => import('./views/lab-results.encounter-list'), {
          featureName: 'covid-lab-results',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'covid-vaccinations-ext',
        slot: 'covid-vaccinations-dashboard-slot',
        load: getAsyncLifecycle(() => import('./views/covid-vaccinations.encounter-list'), {
          featureName: 'covid-vaccinations',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
