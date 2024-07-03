import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { createOHRIDashboardLink, createOHRIGroupedLink } from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import {
  tbPatientChartMeta,
  tbContactListingDashboardMeta,
  tbPatientSummaryDashboardMeta,
  tbProgramManagementDashboardMeta,
  tbTreatmentFollowUpDashboardMeta,
  tbClinicalViewDashboardMeta,
  tbCasesDashboardMeta,
  tptProgramManagementDashboardMeta,
  tptPatientChartMeta,
  tptPatientSummaryMeta,
  tbPreventionDashboardMeta,
} from './dashboard.meta';
import { configSchema } from './config-schema';
import TBSummaryOverviewList from './tb/patient-summary/tb-patient-summary.component';
import ProgramManagementSummary from './tb/program-management/tb-program-management';
import TbTreatmentFollowUpList from './tb/treatment-and-follow-up/tb-treatment-follow-up.component';
import TbContactTracingList from './tb/tb-contact-listing/tb-contact-list.component';
import tptProgramManagementSummary from './tb/tpt/program-management/tpt-program-management';
import tptPatientSummary from './tb/tpt/patient-summary/patient-summary.component';
import rootComponent from './root.component';
import TptHomeComponent from './tpt-home.component';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-tb-app';

const options = {
  featureName: 'ohri-tb',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const patientChartTbDashboard = getSyncLifecycle(createDashboardGroup(tbPatientChartMeta), options);

export const patientChartTptDashboard = getSyncLifecycle(createDashboardGroup(tptPatientChartMeta), options);

export const tbPatientSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbPatientSummaryDashboardMeta, moduleName }),
  options,
);
export const tbPatientSummaryList = getSyncLifecycle(TBSummaryOverviewList, {
  featureName: 'hts-service-summary-list',
  moduleName,
});

export const tbProgramManagementDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbProgramManagementDashboardMeta, moduleName }),
  options,
);
export const tbProgramManagementDashboard = getSyncLifecycle(ProgramManagementSummary, {
  featureName: 'tb-program-management-summary',
  moduleName,
});

export const tbTreatmentFollowUpDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbTreatmentFollowUpDashboardMeta, moduleName }),
  options,
);
export const tbTreatmentFollowUpDashboard = getSyncLifecycle(TbTreatmentFollowUpList, {
  featureName: 'tb-treatment-follow-up-summary',
  moduleName,
});

export const tbContactListingDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tbContactListingDashboardMeta, moduleName }),
  options,
);
export const tbContactListingDashboard = getSyncLifecycle(TbContactTracingList, {
  featureName: 'tb-contact-listing-summary',
  moduleName,
});

export const tptPatientSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tptPatientSummaryMeta, moduleName }),
  options,
);
export const tptPatientSummaryDashboard = getSyncLifecycle(tptPatientSummary, {
  featureName: 'tpt-patient-summary',
  moduleName,
});

export const tptProgramManagementDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...tptProgramManagementDashboardMeta, moduleName }),
  options,
);
export const tptProgramManagementDashboard = getSyncLifecycle(tptProgramManagementSummary, {
  featureName: 'tpt-program-management-summary',
  moduleName,
});

// OHRI HOME
export const tbClinicalViewDashboardLink = getSyncLifecycle(
  createOHRIDashboardLink(tbClinicalViewDashboardMeta),
  options,
);

export const tbCasesDashboardLink = getSyncLifecycle(createOHRIGroupedLink(tbCasesDashboardMeta), options);
export const tbCasesDashboard = getSyncLifecycle(rootComponent, options);

export const tbPreventionDashboardLink = getSyncLifecycle(createOHRIGroupedLink(tbPreventionDashboardMeta), options);
export const tbPreventionDashboard = getSyncLifecycle(TptHomeComponent, options);
