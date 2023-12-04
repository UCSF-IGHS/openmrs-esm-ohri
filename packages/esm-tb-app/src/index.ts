import { Type, defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { createOHRIDashboardLink, OHRIHome, OHRIWelcomeSection } from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import {
  tbPatientChartMeta,
  tbContactListingDashboardMeta,
  tbPatientSummaryDashboardMeta,
  tbProgramManagementDashboardMeta,
  tbTreatmentFollowUpDashboardMeta,
  tbClinicalViewDashboardMeta,
  tbCasesDashboardMeta,
} from './dashboard.meta';
import { registerPostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-tb-app';

const options = {
  featureName: 'ohri-tb',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {
    programs: {
      _type: Type.Object,
      _description: 'Patient Programs',
      _default: {
        drugSensitiveTBProgram: '58005eb2-4560-4ada-b7bb-67a5cffa0a27',
        drugResistantTBProgram: '00f37871-0578-4ebc-af1d-e4b3ce75310d',
      },
    },
  });
  registerPostSubmissionAction({
    name: 'TBProgramEnrollmentSubmissionAction',
    load: () => import('./post-submission-actions/tb-program-enrollment-action'),
  });
}

export const patientChartTbDashboard = getSyncLifecycle(createDashboardGroup(tbPatientChartMeta), options);

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
export const tbDashboardHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'tb-home-header',
  moduleName,
});

export const tbDashboardTiles = getAsyncLifecycle(
  () => import('./views/dashboard/summary-tiles/tb-summary-tiles.component'),
  {
    featureName: 'tb-home-tiles',
    moduleName,
  },
);
export const tbDashboardTabs = getAsyncLifecycle(
  () => import('./views/dashboard/patient-list-tabs/tb-patient-list-tabs.component'),
  {
    featureName: 'tb-home-tabs',
    moduleName,
  },
);

// OHRI HOME
export const tbClinicalViewDashboardLink = getSyncLifecycle(
  createOHRIDashboardLink(tbClinicalViewDashboardMeta),
  options,
);
export const tbCasesDashboardLink = getSyncLifecycle(createOHRIDashboardLink(tbCasesDashboardMeta), options);
export const tbCasesDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'tb cases dashboard',
  moduleName,
});
