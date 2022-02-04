import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  clearCovidSidenavRegistry,
  createCovidDashboardLink,
  covidAssessments_dashboardMeta,
  covidOutcomes_dashboardMeta,
  covidLabResults_dashboardMeta,
  covidVaccinations_dashboardMeta,
} from './dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS () {
  const moduleName = 'esm-covid-app';

  const options = {
    featureName: 'ohri-covid',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  //Clear sidenav items to avoid duplicates
  clearCovidSidenavRegistry();

  return {
    extensions: [
      {
        id: 'covid-Assessments-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(covidAssessments_dashboardMeta), options),
        meta: covidAssessments_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-lab-results',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(covidLabResults_dashboardMeta), options),
        meta: covidLabResults_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-vaccinations-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(covidVaccinations_dashboardMeta), options),
        meta: covidVaccinations_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-outcomes-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(covidOutcomes_dashboardMeta), options),
        meta: covidOutcomes_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-assessments-ext',
        slot: 'covid-assessments-dashboard-slot',
        load: getAsyncLifecycle(() => import('./pages/case-assessment.encounter-lists'), {
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
        load: getAsyncLifecycle(() => import('./pages/lab-results.encounter-list'), {
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
        load: getAsyncLifecycle(() => import('./pages/covid-vaccinations.encounter-list'), {
          featureName: 'covid-vaccinations',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'covid-outcomes-ext',
        slot: 'covid-outcomes-dashboard-slot',
        load: getAsyncLifecycle(() => import('./pages/covid-outcomes.encounter-list'), {
          featureName: 'covid-outcomes',
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
