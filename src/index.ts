import {
  registerBreadcrumbs,
  defineConfigSchema,
  getAsyncLifecycle,
  provide,
  Config,
  getSyncLifecycle,
} from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import { createDashboardLink, dashboardMeta } from './dashboard.meta';
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
    ],
    extensions: [
      {
        id: 'hts-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(dashboardMeta), options),
        meta: dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'hts-summary-page-menu-item-ext',
        slot: 'patient-chart-nav-menu',
        load: getAsyncLifecycle(() => import('./menu-items/hts-summary-page-link'), {
          featureName: 'hts-summary-page-menu-item',
          moduleName,
        }),
      },
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
        id: 'hts-patient-linkage-list-ext',
        slot: 'hts-summary-dashboard-slot',
        load: getAsyncLifecycle(() => import('./hts/client-linkage/client-linkage-form-section.component'), {
          featureName: 'hts-patient-linkage-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'test-patient-list',
        slot: 'homepage-dashboard-slot',
        load: getAsyncLifecycle(() => import('./hts-home/patient-list.component'), {
          featureName: 'test-patient-list',
          moduleName,
        }),
      },
      {
        id: 'cohort-patient-list',
        slot: 'homepage-dashboard-slot',
        load: getAsyncLifecycle(() => import('./hts-home/patient-list-cohort.component'), {
          featureName: 'cohort-patient-list',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
