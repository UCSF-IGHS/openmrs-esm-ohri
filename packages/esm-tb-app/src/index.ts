import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { createOHRIDashboardLink } from '@ohri/openmrs-esm-ohri-commons-lib';
import { tbPatientChartMeta, tbClinicalViewDashboardMeta, tptPatientChartMeta } from './dashboard.meta';
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

export const moduleName = '@ohri/openmrs-esm-ohri-tb-app';

const options = {
  featureName: 'ohri-tb',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const tbPatientSummaryList = getSyncLifecycle(TBSummaryOverviewList, {
  featureName: 'hts-service-summary-list',
  moduleName,
});

export const tbProgramManagementDashboard = getSyncLifecycle(ProgramManagementSummary, {
  featureName: 'tb-program-management-summary',
  moduleName,
});

export const tbTreatmentFollowUpDashboard = getSyncLifecycle(TbTreatmentFollowUpList, {
  featureName: 'tb-treatment-follow-up-summary',
  moduleName,
});

export const tbContactListingDashboard = getSyncLifecycle(TbContactTracingList, {
  featureName: 'tb-contact-listing-summary',
  moduleName,
});

export const tptPatientSummaryDashboard = getSyncLifecycle(tptPatientSummary, {
  featureName: 'tpt-patient-summary',
  moduleName,
});

export const tptProgramManagementDashboard = getSyncLifecycle(tptProgramManagementSummary, {
  featureName: 'tpt-program-management-summary',
  moduleName,
});

// OHRI HOME
export const tbClinicalViewDashboardLink = getSyncLifecycle(
  createOHRIDashboardLink(tbClinicalViewDashboardMeta),
  options,
);

export const tbCasesDashboard = getSyncLifecycle(rootComponent, options);

export const tbPreventionDashboard = getSyncLifecycle(TptHomeComponent, options);
