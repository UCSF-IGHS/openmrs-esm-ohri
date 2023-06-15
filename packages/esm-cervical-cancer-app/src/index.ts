import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  caCxAppointmentsDashboardMeta,
  caCxSummaryDashboardMeta,
  caCxVisitsDashboardMeta,
  cervicalCancerFolderMeta,
} from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-cervical-cancer-app';

function setupOpenMRS() {
  const options = {
    featureName: 'ohri-cervical-cancer',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  return {
    pages: [],
    extensions: [
      {
        id: 'cervical-cancer',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardGroup(cervicalCancerFolderMeta), options),
        meta: cervicalCancerFolderMeta,
        online: true,
        offline: true,
        order: 24,
      },
      {
        id: 'cacx-summary-dashboard',
        slot: 'cervical-cancer-slot',
        load: getSyncLifecycle(createDashboardLink(caCxSummaryDashboardMeta), options),
        meta: caCxSummaryDashboardMeta,
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
        slot: 'cervical-cancer-slot',
        load: getSyncLifecycle(createDashboardLink(caCxVisitsDashboardMeta), options),
        meta: caCxVisitsDashboardMeta,
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
        slot: 'cervical-cancer-slot',
        load: getSyncLifecycle(createDashboardLink(caCxAppointmentsDashboardMeta), options),
        meta: caCxAppointmentsDashboardMeta,
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
