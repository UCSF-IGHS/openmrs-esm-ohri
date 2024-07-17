import { getSyncLifecycle } from '@openmrs/esm-framework';
import ptrackerdashboardPath from './ptracker-report-app-menu-link.component';
export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@ohri/openmrs-esm-ohri-ptracker-report-app';

const options = {
  featureName: 'ohri-ptracker-report',
  moduleName,
};

export function startupApp() {}

export const versionTwoNavLink = getSyncLifecycle(ptrackerdashboardPath, options);
