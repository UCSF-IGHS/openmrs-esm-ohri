import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import ohriDashboardsConfig from './ohri-core-config';
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
  createOHRIDashboardLink,
  PatientListTable,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  appointmentsDashboardMeta,
  homeDashboardMeta,
  dispensingDashboardMeta,
  serviceQueuesDashboardMeta,
} from './dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@ohri/openmrs-esm-ohri-core-app';

  const options = {
    featureName: 'ohri-core',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  // Load configurations
  provide(ohriDashboardsConfig);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^dashboard/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^home/,
      },
    ],
    extensions: [
      {
        id: 'home-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(homeDashboardMeta), options),
        meta: homeDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-patient-list',
        slot: 'ohri-home-dashboard-slot',
        load: getSyncLifecycle(PatientListTable, {
          featureName: 'home',
          moduleName,
        }),
        meta: homeDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'appointments-ohri-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(appointmentsDashboardMeta), options),
        meta: appointmentsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-appointments-dashboard',
        slot: 'ohri-appointments-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/appointments/appointments-dashboard.component'), {
          featureName: 'appointments-dashboard',
          moduleName,
        }),
        meta: appointmentsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'dispensing-ohri-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(dispensingDashboardMeta), options),
        meta: dispensingDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-dispensing-dashboard',
        slot: 'ohri-dispensing-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/dispensing/dispensing-dashboard.component'), {
          featureName: 'dispensing-dashboard',
          moduleName,
        }),
        meta: dispensingDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'service-queues-ohri-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(serviceQueuesDashboardMeta), options),
        meta: serviceQueuesDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-service-queues-dashboard',
        slot: 'ohri-service-queues-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/service-queues/service-queues-dashboard.component'), {
          featureName: 'service-queues-dashboard',
          moduleName,
        }),
        meta: serviceQueuesDashboardMeta,
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
        id: 'clinical-views-divider',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta), options),
        meta: patientChartDivider_dashboardMeta,
        online: true,
        offline: true,
        order: 20,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
