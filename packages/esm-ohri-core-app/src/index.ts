import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import patientDashboardsConfig from './ohri-esm-and-dashboards-config.json';
import ohriDashboardsConfig from './ohri-core-config';
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
  createOHRIDashboardLink,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  appointmentsDashboardMeta,
  homeDashboardMeta,
  outpatientDashboardMeta,
  pharmacyDashboardMeta,
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
  provide(patientDashboardsConfig);
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
        id: 'ohri-home',
        slot: 'ohri-home-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/home/ohri-home.component'), {
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
        id: 'pharmacy-ohri-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(pharmacyDashboardMeta), options),
        meta: pharmacyDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-pharmacy-dashboard',
        slot: 'ohri-pharmacy-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/pharmacy/pharmacy-dashboard.component'), {
          featureName: 'pharmacy-dashboard',
          moduleName,
        }),
        meta: pharmacyDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'outpatient-ohri-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(outpatientDashboardMeta), options),
        meta: outpatientDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-outpatient-dashboard',
        slot: 'ohri-outpatient-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/outpatient/outpatient-dashboard.component'), {
          featureName: 'outpatient-dashboard',
          moduleName,
        }),
        meta: outpatientDashboardMeta,
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
        order: 100,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
