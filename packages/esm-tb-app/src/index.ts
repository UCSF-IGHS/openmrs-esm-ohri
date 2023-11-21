import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import {
  TbDashboardDMeta,
  tbContactListingDashboardMeta,
  tbPatientSummaryDashboardMeta,
  tbProgramManagementDashboardMeta,
  tbTreatmentFollowUpDashboardMeta,
} from './dashboard.meta';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-tb-app';

const options = {
  featureName: 'ohri-tb',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {});
}

export const patientChartTbDashboard = getSyncLifecycle(createDashboardGroup(TbDashboardDMeta), options);

export const tbPatientSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbPatientSummaryDashboardMeta, moduleName }),
  options,
);
export const tbPatientSummaryList = getAsyncLifecycle(
  () => import('./views/patient-summary/tb-patient-summary.component'),
  {
    featureName: 'hts-service-summary-list',
    moduleName,
  },
);

export const tbProgramManagementDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbProgramManagementDashboardMeta, moduleName }),
  options,
);
export const tbProgramManagementDashboard = getAsyncLifecycle(
  () => import('./views/program-management/maternal-health.component'),
  {
    featureName: 'tb-program-management-summary',
    moduleName,
  },
);

export const tbTreatmentFollowUpDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbTreatmentFollowUpDashboardMeta, moduleName }),
  options,
);
export const tbTreatmentFollowUpDashboard = getAsyncLifecycle(
  () => import('./views/treatment-and-follow-up/tb-treatment-follow-up.component'),
  {
    featureName: 'tb-treatment-follow-up-summary',
    moduleName,
  },
);

export const tbContactListingDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbContactListingDashboardMeta, moduleName }),
  options,
);
export const tbContactListingDashboard = getAsyncLifecycle(
  () => import('./views/tb-contact-listing/tb-contact-list.component'),
  {
    featureName: 'tb-contact-listing-summary',
    moduleName,
  },
);
