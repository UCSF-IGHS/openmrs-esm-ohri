import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  clearSidenavRegistry,
  createDashboardLink,
  hts_dashboardMeta,
  caretreament_dashboardMeta,
} from './dashboard.meta';
import {
  clearCovidSidenavRegistry,
  createCovidDashboardLink,
  caseReport_dashboardMeta,
  clinicalVisit_dashboardMeta,
} from './covid/dashboard.meta';

import patientDashboardsConfig from './ohri-patient-dashboards-config.json';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-ohri-app';

  const options = {
    featureName: 'ohri',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  // Load configurations
  provide(patientDashboardsConfig);

  //Clear sidenav items to avoid duplicates
  clearSidenavRegistry();
  clearCovidSidenavRegistry();

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./hts/summary-page/hts-summary-page'), options),
        route: /^ohri\/.+\/hts/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^ohri-home/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^form-render-test/,
      },
    ],
    extensions: [
      {
        id: 'hts-patient-encounters-list-ext',
        slot: 'hts-summary-dashboard-slot',
        load: getAsyncLifecycle(() => import('./hts/encounters-list/hts-overview-list.component'), {
          featureName: 'hts-patient-encounters-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-care-and-treatment-list-ext',
        slot: 'care-and-treatment-dashboard-slot',
        load: getAsyncLifecycle(() => import('./hts/care-and-treatment/care-and-treatment-list.component'), {
          featureName: 'hts-care-and-treatment-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-home-header-ext',
        slot: 'hts-home-header-slot',
        load: getAsyncLifecycle(() => import('./hts/home/welcome-section/hts-welcome-section.component'), {
          featureName: 'hts-home-header',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tile-ext',
        slot: 'hts-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./hts/home/summary-tiles/hts-summary-tiles.component'), {
          featureName: 'hts-home-tiles',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tabs-ext',
        slot: 'hts-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./hts/home/patient-tabs/ohri-patient-tabs.component'), {
          featureName: 'hts-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'hts-encounter-form-ext',
        load: getAsyncLifecycle(() => import('./hts/encounter-form/hts-encounter-form.component'), {
          featureName: 'hts-encounter-form',
          moduleName,
        }),
      },
      {
        id: 'ohri-forms-view-ext',
        load: getAsyncLifecycle(() => import('./hts/encounters-list/ohri-form-view.component'), {
          featureName: 'ohri-forms',
          moduleName,
        }),
      },
      {
        id: 'patient-hiv-status-tag',
        slot: 'patient-banner-tags-slot',
        load: getAsyncLifecycle(() => import('./components/banner-tags/patient-status-tag.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'patient-list-ext',
        slot: 'homepage-dashboard-slot',
        load: getAsyncLifecycle(() => import('./hts/patient-list/patient-list.component'), {
          featureName: 'patient-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'patient-list-modal',
        slot: 'patient-actions-slot',
        load: getAsyncLifecycle(() => import('./components/modals/patient-list/add-patient-to-list-modal.component'), {
          featureName: 'patient-list-modal',
          moduleName,
        }),
      },
      {
        id: 'hiv-hts-programme-switcher',
        slot: 'top-nav-info-slot',
        load: getAsyncLifecycle(() => import('./components/top-nav/hiv-top-nav.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'hts-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(hts_dashboardMeta), options),
        meta: hts_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'care-and-treatment-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(caretreament_dashboardMeta), options),
        meta: caretreament_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-case-report-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(caseReport_dashboardMeta), options),
        meta: caseReport_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-clinical-visit-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(clinicalVisit_dashboardMeta), options),
        meta: clinicalVisit_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-case-report-ext',
        slot: 'covid-dashboard-slot',
        load: getAsyncLifecycle(() => import('./covid/case-report/case-report.component'), {
          featureName: 'covid-case-report',
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
