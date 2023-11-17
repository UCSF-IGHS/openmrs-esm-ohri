import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
  createOHRIDashboardLink,
  PatientList,
  PatientTable,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import {
  appointmentsDashboardMeta,
  homeDashboardMeta,
  dispensingDashboardMeta,
  serviceQueuesDashboardMeta,
} from './dashboard.meta';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@ohri/openmrs-esm-ohri-core-app';

const options = {
  featureName: 'ohri-core',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {});
}

export const dashboard = getAsyncLifecycle(() => import('./root'), options);

export const homeDashboard = getSyncLifecycle(createOHRIDashboardLink(homeDashboardMeta), options);

export const patientList = getSyncLifecycle(PatientList, {
  featureName: 'home',
  moduleName,
});

export const appointmentsLink = getSyncLifecycle(createOHRIDashboardLink(appointmentsDashboardMeta), options);
export const appointmentsDashboard = getAsyncLifecycle(
  () => import('./ohri-dashboard/appointments/appointments-dashboard.component'),
  {
    featureName: 'appointments-dashboard',
    moduleName,
  },
);

export const dispensingLink = getSyncLifecycle(createOHRIDashboardLink(dispensingDashboardMeta), options);
export const dispensingDashboard = getAsyncLifecycle(
  () => import('./ohri-dashboard/dispensing/dispensing-dashboard.component'),
  {
    featureName: 'dispensing-dashboard',
    moduleName,
  },
);

export const serviceQueuesLink = getSyncLifecycle(createOHRIDashboardLink(serviceQueuesDashboardMeta), options);
export const serviceQueuesDashboard = getAsyncLifecycle(
  () => import('./ohri-dashboard/service-queues/service-queues-dashboard.component'),
  {
    featureName: 'service-queues-dashboard',
    moduleName,
  },
);

export const ohriNavItems = getAsyncLifecycle(
  () => import('./ohri-dashboard/side-menu/ohri-dashboard-side-nav.component'),
  {
    featureName: 'nav-items',
    moduleName,
  },
);

export const ohriClinicalViewsDivider = getSyncLifecycle(
  createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta),
  options,
);

export const patientTable = getSyncLifecycle(PatientTable, options);
