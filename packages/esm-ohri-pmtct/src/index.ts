import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import { mnchSummary_dashboardMeta, mchFolderMeta } from './dashboard.meta';
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
        id: 'cacx-summary-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createDashboardLink(mnchSummary_dashboardMeta), options),
        meta: mnchSummary_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'cacx-summary-ext',
        slot: 'cacx-summary-slot',
        load: getAsyncLifecycle(() => import('./views/mnch-summary/mnch-summary.component'), {
          featureName: 'cacx-summary',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
