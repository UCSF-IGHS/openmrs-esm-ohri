import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import {
  caCxAppointmentsDashboardMeta,
  caCxSummaryDashboardMeta,
  caCxVisitsDashboardMeta,
  cervicalCancerFolderMeta,
} from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-cervical-cancer-app';

const options = {
  featureName: 'ohri-cervical-cancer',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {});
}

export const cacxDashboard = getSyncLifecycle(createDashboardGroup(cervicalCancerFolderMeta), options);
export const cacxSummaryDashboardLink = getSyncLifecycle(createDashboardLink(caCxSummaryDashboardMeta), options);
export const cacxSummaryDashboard = getAsyncLifecycle(() => import('./views/cacx-summary/cacx-summary.component'), {
  featureName: 'cacx-summary',
  moduleName,
});
export const cacxVisitsDashboardLink = getSyncLifecycle(createDashboardLink(caCxVisitsDashboardMeta), options);
export const cervicalCancerVisitsDashboard = getAsyncLifecycle(
  () => import('./views/cacx-visits/cacx-visits-services.component'),
  {
    featureName: 'cacx-visits',
    moduleName,
  },
);
export const cervicalCancerDashboardLink = getSyncLifecycle(
  createDashboardLink(caCxAppointmentsDashboardMeta),
  options,
);
export const cacxAppointmentDashboard = getAsyncLifecycle(
  () => import('./views/cacx-appointment/cacx-appointments.component'),
  {
    featureName: 'cacx-appointments',
    moduleName,
  },
);
