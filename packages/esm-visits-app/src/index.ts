import { registerBreadcrumbs, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import * as PatientCommonLib from '@openmrs/esm-patient-common-lib';
import { esmPatientChartSchema } from './config-schema';
import { moduleName, spaBasePath } from './constants';
import { encountersDashboardMeta } from './dashboard.meta';
import { setupOfflineVisitsSync, setupCacheableRoutes } from './offline';
import patientChartPageComponent from './root.component';
import pastVisitsDetailOverviewComponent from './visit/past-visit-overview.component';

import visitActionsComponent from './visit/visits-widget/visit-actions.component';
import currentVisitOverviewComponent from './visit/visits-widget/visit-detail-overview.component';

// This allows @openmrs/esm-patient-common-lib to be accessed by modules that are not
// using webpack. This is used for ngx-formentry.
window['_openmrs_esm_patient_common_lib'] = PatientCommonLib;

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  setupOfflineVisitsSync();
  setupCacheableRoutes();

  defineConfigSchema(moduleName, esmPatientChartSchema);

  registerBreadcrumbs([
    {
      path: spaBasePath,
      title: () => Promise.resolve(window.i18next.t('patientBreadcrumb', { defaultValue: 'Patient', ns: moduleName })),
      parent: `${window.spaBase}/home`,
    },
    {
      path: `${spaBasePath}/:view`,
      title: ([_, key]) =>
        Promise.resolve(
          window.i18next.t(`${decodeURIComponent(key)} dashboard`, {
            ns: moduleName,
            defaultValue: `${decodeURIComponent(key)} dashboard`,
          }),
        ),
      parent: spaBasePath,
    },
  ]);
}

export const root = getSyncLifecycle(patientChartPageComponent, { featureName: 'patient-chart', moduleName });

export const encountersSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({
    ...encountersDashboardMeta,
    moduleName,
  }),
  { featureName: 'encounter', moduleName },
);

export const pastVisitsOverview = getSyncLifecycle(pastVisitsDetailOverviewComponent, {
  featureName: 'ohri-past-visits-overview',
  moduleName,
});

export const currentVisitsOverview = getSyncLifecycle(currentVisitOverviewComponent, {
  featureName: 'ohri-current-visit-overview',
  moduleName,
});

export const visitActions = getSyncLifecycle(visitActionsComponent, {
  featureName: 'ohri-visit-actions',
  moduleName,
});
