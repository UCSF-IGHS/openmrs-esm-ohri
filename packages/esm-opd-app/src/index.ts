import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { opdFolderMeta, activeVisitDashboardMeta } from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-opd-app';

const options = {
  featureName: 'ohri-opd',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const opdPatientChartDashboard = getSyncLifecycle(createDashboardGroup(opdFolderMeta), options);

export const activeVisitDashboardLink = getSyncLifecycle(
  createDashboardLink({
    ...activeVisitDashboardMeta,
    moduleName,
  }),
  { featureName: 'active-visit', moduleName },
);
