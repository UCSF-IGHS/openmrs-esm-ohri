import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  clearCovidSidenavRegistry,
  createCovidDashboardLink,
  covidAssessments_dashboardMeta,
  covidLabResults_dashboardMeta,
  covidVaccinations_dashboardMeta,
} from './dashboard.meta';

import {
  covid19CasesDashboardMeta,
  covidFolderDashboardMeta,
  createOHRIDashboardLink,
} from '../../esm-ohri-core-app/src/ui/ohri-dashboard/ohri-dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-ohri-covid';

  const options = {
    featureName: 'ohri',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  // Load configurations
  //provide(patientDashboardsConfig);

  //Clear sidenav items to avoid duplicates
  clearCovidSidenavRegistry();

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
        load: getAsyncLifecycle(
          () => import('../../esm-ohri-core-app/src/ohri-home/welcome-section/ohri-welcome-section.component'),
          {
            featureName: 'covid-home-header',
            moduleName,
          },
        ),
      },
      {
        id: 'covid-home-tile-ext',
        slot: 'covid-home-tiles-slot',
        load: getAsyncLifecycle(
          () => import('../../esm-ohri-core-app/src/ui/covid/home/summary-tiles/covid-summary-tiles.component'),
          {
            featureName: 'covid-home-tiles',
            moduleName,
          },
        ),
      },
      {
        id: 'covid-home-tabs-ext',
        slot: 'covid-home-tabs-slot',
        load: getAsyncLifecycle(
          () => import('../../esm-ohri-core-app/src/ui/covid/home/patient-list-tabs/covid-patient-list-tabs.component'),
          {
            featureName: 'covid-home-tabs',
            moduleName,
          },
        ),
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
        load: getAsyncLifecycle(() => import('../../esm-ohri-core-app/src/ohri-home/ohri-home-component'), {
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
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
