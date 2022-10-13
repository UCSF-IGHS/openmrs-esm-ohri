import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  CaCxAppointments_dashboardMeta,
  CaCxSummary_dashboardMeta,
  CaCxVisits_dashboardMeta,
  cervicalCancerFolderMeta,
} from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { addToBaseFormsRegistry } from '@ohri/openmrs-ohri-form-engine-lib';
import cacxForms from './forms/forms-registry';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-cervical-cancer-app';

function setupOpenMRS() {
  const options = {
    featureName: 'ohri-cervical-cancer',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  addToBaseFormsRegistry(cacxForms);

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
      },
      {
        id: 'cacx-summary-dashboard',
        slot: 'cervical-cancer-slot',
        load: getSyncLifecycle(createDashboardLink(CaCxSummary_dashboardMeta), options),
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
        slot: 'cervical-cancer-slot',
        load: getSyncLifecycle(createDashboardLink(CaCxVisits_dashboardMeta), options),
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
        slot: 'cervical-cancer-slot',
        load: getSyncLifecycle(createDashboardLink(CaCxAppointments_dashboardMeta), options),
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
