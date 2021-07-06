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
        route: /^ohri-forms/,
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
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
