import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import HTSPreventionSummary from './hts/hiv-testing-services/hts-prevention-summary.component';
import {
  createOHRIDashboardLink,
  PatientStatusBannerTag,
  createOHRIGroupedLink,
} from '@ohri/openmrs-esm-ohri-commons-lib';

import { hivPreventionFolderDashboardMeta } from './dashboard.meta';
import htsRootComponent from './hts-root.component';

import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-hiv-prevention-app';

const options = {
  featureName: 'ohri-hiv-prevention',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const patientHIVStatusTag = getSyncLifecycle(PatientStatusBannerTag, options);

export const hivPreventionFolderLink = getSyncLifecycle(
  createOHRIDashboardLink(hivPreventionFolderDashboardMeta),
  options,
);
export const hivPreventionDashboardLink = getSyncLifecycle(
  createOHRIGroupedLink(hivPreventionFolderDashboardMeta),
  options,
);
export const hivPreventionDashboard = getSyncLifecycle(htsRootComponent, options);

// Patient Chart

export const htsSummaryDashboard = getSyncLifecycle(HTSPreventionSummary, {
  featureName: 'hts-patient-encounters-list',
  moduleName,
});
