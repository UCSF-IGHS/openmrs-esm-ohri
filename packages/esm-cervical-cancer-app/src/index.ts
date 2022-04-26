import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  CaCxAppointments_dashboardMeta,
  CaCxSummary_dashboardMeta,
  CaCxVisits_dashboardMeta,
  clearCervicalCancerSidenavRegistry,
  createCervicalCancerDashboardLink,
} from './dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = 'openmrs-esm-ohri-cervical-cancer-app';

  const options = {
    featureName: 'ohri-cervical-cancer',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  //Clear sidenav items to avoid duplicates
  clearCervicalCancerSidenavRegistry();

  return {
    pages: [],
    extensions: [
      {
        id: 'cacx-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCervicalCancerDashboardLink(CaCxSummary_dashboardMeta), options),
        meta: CaCxSummary_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'cacx-summary-ext',
        slot: 'cacx-summary-slot',
        load: getAsyncLifecycle(() => import('./views/cacx-summary/cacx-summary.component'), {
          featureName: 'cacx-summary',
          moduleName,
        }),
      },
      {
        id: 'cacx-visits-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCervicalCancerDashboardLink(CaCxVisits_dashboardMeta), options),
        meta: CaCxVisits_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'cacx-visits-ext',
        slot: 'cacx-visits-slot',
        load: getAsyncLifecycle(() => import('./views/cacx-visits/cacx-visits-services.component'), {
          featureName: 'cacx-visits',
          moduleName,
        }),
      },
      {
        id: 'cacx-appointments-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCervicalCancerDashboardLink(CaCxAppointments_dashboardMeta), options),
        meta: CaCxAppointments_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'cacx-appointments-ext',
        slot: 'cacx-appointments-slot',
        load: getAsyncLifecycle(() => import('./views/cacx-appointment/cacx-appointments.component'), {
          featureName: 'cacx-appointments',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
