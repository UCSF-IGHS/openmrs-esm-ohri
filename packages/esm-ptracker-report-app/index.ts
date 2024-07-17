import { getAsyncLifecycle } from '@openmrs/esm-framework';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@ohri/openmrs-esm-ohri-ptracker-report-app';

const options = {
  featureName: 'ohri-ptracker-report',
  moduleName,
};

export function startupApp() {}

export const PtrackerReport = getAsyncLifecycle(() => import('./root'), options);

export const PtrackerReportLink = getAsyncLifecycle(() => import('./app-menu-navigation.component'), options);
