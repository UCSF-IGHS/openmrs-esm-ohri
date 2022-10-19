import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  mnchSummary_dashboardMeta,
  mchFolderMeta,
  maternalHealth_dashboardMeta,
  childHealth_dashboardMeta,
  labs_dashboardMeta,
  medication_dashboardMeta,
} from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { addToBaseFormsRegistry } from '@ohri/openmrs-ohri-form-engine-lib';
import mchForms from './forms/forms-registry';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-pmtct';

function setupOpenMRS() {
  const options = {
    featureName: 'ohri-pmtct',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  addToBaseFormsRegistry(mchForms);

  return {
    pages: [],
    extensions: [
      {
        id: 'mch',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardGroup(mchFolderMeta), options),
        meta: mchFolderMeta,
        online: true,
        offline: true,
      },
      {
        id: 'mnch-summary-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createDashboardLink(mnchSummary_dashboardMeta), options),
        meta: mnchSummary_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'maternal-summary-ext',
        slot: 'mnch-summary-slot',
        load: getAsyncLifecycle(() => import('./views/mnch-summary/maternal-summary.component'), {
          featureName: 'maternal-summary',
          moduleName,
        }),
      },
      {
        id: 'infant-summary-ext',
        slot: 'mnch-summary-slot',
        load: getAsyncLifecycle(() => import('./views/mnch-summary/infants-summary.component'), {
          featureName: 'infant-summary',
          moduleName,
        }),
      },
      {
        id: 'family-linkage-ext',
        slot: 'mnch-summary-slot',
        load: getAsyncLifecycle(() => import('./views/mnch-summary/family-linkage.component'), {
          featureName: 'family-linkage',
          moduleName,
        }),
      },
      {
        id: 'maternal-Health-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createDashboardLink(maternalHealth_dashboardMeta), options),
        meta: maternalHealth_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'maternal-health-summary-ext',
        slot: 'maternal-health-summary-slot',
        load: getAsyncLifecycle(() => import('./views/maternal-health/maternal-health.component'), {
          featureName: 'maternal-health',
          moduleName,
        }),
      },
      {
        id: 'child-Health-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createDashboardLink(childHealth_dashboardMeta), options),
        meta: childHealth_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'child-health-summary-ext',
        slot: 'child-health-summary-slot',
        load: getAsyncLifecycle(() => import('./views/child-health/child-health.component'), {
          featureName: 'child-health',
          moduleName,
        }),
      },
      {
        id: 'labs-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createDashboardLink(labs_dashboardMeta), options),
        meta: labs_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'labs-summary-ext',
        slot: 'labs-summary-slot',
        load: getAsyncLifecycle(() => import('./views/labs/labs.component'), {
          featureName: 'labs',
          moduleName,
        }),
      },
      {
        id: 'mediction-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createDashboardLink(medication_dashboardMeta), options),
        meta: medication_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'medication-summary-ext',
        slot: 'medication-summary-slot',
        load: getAsyncLifecycle(() => import('./views/medications/medications.components'), {
          featureName: 'medication',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
