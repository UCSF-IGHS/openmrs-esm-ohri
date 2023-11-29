import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { caCxSummaryDashboardMeta, caCxVisitsDashboardMeta, cervicalCancerFolderMeta } from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import CacxSummaryList from './views/cacx-summary/cacx-summary.component';
import CacxVisitServices from './views/cacx-visits/cacx-visits-services.component';

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

export const cacxPatientChartDashboard = getSyncLifecycle(createDashboardGroup(cervicalCancerFolderMeta), options);

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
