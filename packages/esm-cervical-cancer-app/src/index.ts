import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { cervicalCancerFolderMeta, cacxSummaryDashboardMeta, cacxVisitDashboardMeta } from './dashboard.meta';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { createDashboardGroup } from '@ohri/openmrs-esm-ohri-commons-lib';
import CacxSummaryList from './cervical-cancer/cacx-summary/cacx-summary.component';
import CacxVisitServices from './cervical-cancer/cacx-visits/cacx-visits-services.component';
import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-cervical-cancer-app';

const options = {
  featureName: 'ohri-cervical-cancer',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const cacxSummaryDashboard = getSyncLifecycle(CacxSummaryList, {
  featureName: 'cacx-summary',
  moduleName,
});

export const cacxVisitsDashboard = getSyncLifecycle(CacxVisitServices, {
  featureName: 'cacx-visits',
  moduleName,
});

// conditional link
export const cervicalCancerSideNavGroup = getSyncLifecycle(createDashboardGroup(cervicalCancerFolderMeta), options);

// Views for Maternal and Child Health services like Antenatal Care, Postnatal Care, and Labour & Delivery
export const cacxVisitsLink = getSyncLifecycle(createDashboardLink(cacxVisitDashboardMeta), options);
export const cacxSummaryLink = getSyncLifecycle(createDashboardLink(cacxSummaryDashboardMeta), options);
