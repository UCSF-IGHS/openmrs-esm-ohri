import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

import patientDashboardsConfig from './ohri-esm-and-dashboards-config.json';
import ohriDashboardsConfig from './ohri-core-config';
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
  createOHRIDashboardLink,
} from 'openmrs-esm-ohri-commons-lib';
import { homeDashboardMeta } from './dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = 'openmrs-esm-ohri-core-app';

  const options = {
    featureName: 'ohri-core',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  // Load configurations
  provide(patientDashboardsConfig);
  provide(ohriDashboardsConfig);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^dashboard/,
      },
    ],
    extensions: [
      {
        id: 'redirect-to-ohri-db-ext',
        slot: 'homepage-widgets-slot',
        load: getAsyncLifecycle(() => import('./components/redirect-dashboard/redirect-ohri-db.component'), {
          featureName: 'redirect-to-ohri-db',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'home-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(homeDashboardMeta), options),
        meta: homeDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-all-patients-list',
        slot: 'ohri-home-dashboard-slot',
        load: getAsyncLifecycle(() => import('./components/all-patients-list/patient-list.component'), {
          featureName: 'home',
          moduleName,
        }),
        meta: homeDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-nav-items-ext',
        slot: 'ohri-nav-items-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/side-menu/ohri-dashboard-side-nav.component'), {
          featureName: 'nav-items',
          moduleName,
        }),
        online: true,
        offline: true,
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
        id: 'clinical-views-divider',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta), options),
        meta: patientChartDivider_dashboardMeta,
        online: true,
        offline: true,
        order: 100,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
