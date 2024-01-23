import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
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
  tptProgramManagementDashboardMeta,
  tptPatientChartMeta,
  tptPatientSummaryMeta,
} from './dashboard.meta';
import { configSchema } from './config-schema';
import TBSummaryOverviewList from './views/patient-summary/tb-patient-summary.component';
import ProgramManagementSummary from './views/program-management/maternal-health.component';
import TbTreatmentFollowUpList from './views/treatment-and-follow-up/tb-treatment-follow-up.component';
import TbContactTracingList from './views/tb-contact-listing/tb-contact-list.component';
import TbSummaryTiles from './views/dashboard/summary-tiles/tb-summary-tiles.component';
import TbHomePatientTabs from './views/dashboard/patient-list-tabs/tb-patient-list-tabs.component';
import tptProgramManagementSummary from './views/tpt/program-management/tpt-program-management';
import tptPatientSummary from './views/tpt/patient-summary/patient-summary.component';

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
export const tbDashboardHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'tb-home-header',
  moduleName,
});

export const tbDashboardTiles = getSyncLifecycle(TbSummaryTiles, {
  featureName: 'tb-home-tiles',
  moduleName,
});
export const tbDashboardTabs = getSyncLifecycle(TbHomePatientTabs, {
  featureName: 'tb-home-tabs',
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
export const tbCasesDashboardLink = getSyncLifecycle(createOHRIDashboardLink(tbCasesDashboardMeta), options);
export const tbCasesDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'tb cases dashboard',
  moduleName,
});
