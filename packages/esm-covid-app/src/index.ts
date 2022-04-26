import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  clearCovidSidenavRegistry,
  createCovidDashboardLink,
  covidAssessments_dashboardMeta,
  covidLabResults_dashboardMeta,
  covidVaccinations_dashboardMeta,
  covidFolderDashboardMeta,
  covid19CasesDashboardMeta,
} from './dashboard.meta';
import { createOHRIDashboardLink, OHRIHome, OHRIWelcomeSection } from 'openmrs-esm-ohri-commons-lib';
import { addToBaseFormsRegistry } from 'openmrs-ohri-form-engine-lib';
import covidForms from './forms/forms-registry';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = 'openmrs-esm-ohri-covid-app';

  const options = {
    featureName: 'ohri-hiv',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  //Clear sidenav items to avoid duplicates
  clearCovidSidenavRegistry();

  addToBaseFormsRegistry(covidForms);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('../../esm-ohri-core-app/src/root'), options),
        route: /^dashboard/,
      },
    ],
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
        load: getSyncLifecycle(createOHRIDashboardLink(covidFolderDashboardMeta), options),
        meta: covidFolderDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-cases-dashboard-ext',
        slot: 'covid-dashboard-slot',
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
