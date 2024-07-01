import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { caCxSummaryDashboardMeta, caCxVisitsDashboardMeta, cervicalCancerFolderMeta } from './dashboard.meta';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { createConditionalDashboardGroup } from '@ohri/openmrs-esm-ohri-commons-lib';
import CacxSummaryList from './cervical-cancer/cacx-summary/cacx-summary.component';
import CacxVisitServices from './cervical-cancer/cacx-visits/cacx-visits-services.component';
import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-cervical-cancer-app';

const options = {
  featureName: 'ohri-cervical-cancer',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const cacxPatientChartDashboard = getSyncLifecycle(
  createConditionalDashboardGroup(cervicalCancerFolderMeta),
  options,
);

export const cacxSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...caCxSummaryDashboardMeta, moduleName }),
  options,
);
export const cacxSummaryDashboard = getSyncLifecycle(CacxSummaryList, {
  featureName: 'cacx-summary',
  moduleName,
});

export const cacxVisitsDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...caCxVisitsDashboardMeta, moduleName }),
  options,
);
export const cacxVisitsDashboard = getSyncLifecycle(CacxVisitServices, {
  featureName: 'cacx-visits',
  moduleName,
});
