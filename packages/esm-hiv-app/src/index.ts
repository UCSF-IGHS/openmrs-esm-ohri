import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import ServiceSummaryOverviewList from './views/service-summary/encounter-list/service-summary-encounter-list.component';
import HTSSummaryTiles from './views/hts/home/summary-tiles/hts-summary-tiles.component';
import OHRIPatientTabs from './views/hts/home/patient-tabs/ohri-patient-tabs.component';
import CTSummaryTiles from './views/hts/care-and-treatment/summary-tiles/ct-summary-tiles.component';
import CTHomePatientTabs from './views/hts/patient-list-tabs/ct-patient-list-tabs.component';
import LabResultsSummaryTiles from './views/hts/lab-results/lab-results-summary-tiles.component';
import LabResultsSummary from './views/hts/lab-results/lab-results-summary.component';
import HTSPreventionSummary from './views/hiv-testing-services/hts-prevention-summary.component';
import ProgramManagementSummary from './views/program-management/program-management-summary.component';
import VisitsSummary from './views/visits/visits-summary.component';
import GeneralCounsellingSummary from './views/general-counselling/general-counselling-summary.component';
import PartnerNotificationServices from './views/partner-notification-services/partner-notification-services.component';
import {
  createOHRIDashboardLink,
  PatientStatusBannerTag,
  OHRIHome,
  OHRIWelcomeSection,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';

import {
  hivCareAndTreatmentFolderDashboardMeta,
  careAndTreatmentDashboardMeta,
  htsDashboardMeta,
  htsSummaryDashboardMeta,
  hivPreventionDashboardMeta,
  hivCareAndTreatmentDashboardDMeta,
  hivPatientSummaryDashboardMeta,
  programManagementDashboardMeta,
  clinicalVisitsDashboardMeta,
  generalCounsellingDashboardMeta,
  partnerNotificationServicesDashboardMeta,
  hivPreventionFolderDashboardMeta,
} from './dashboard.meta';

import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-hiv-app';

const options = {
  featureName: 'ohri-hiv',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const patientHIVStatusTag = getSyncLifecycle(PatientStatusBannerTag, options);

export const htsServiceSummaryList = getSyncLifecycle(ServiceSummaryOverviewList, {
  featureName: 'hts-service-summary-list',
  moduleName,
});

export const htsHomeHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'hts-home-header',
  moduleName,
});

export const htsHomeTiles = getSyncLifecycle(HTSSummaryTiles, {
  featureName: 'hts-home-tiles',
  moduleName,
});

export const htsHomeTabs = getSyncLifecycle(OHRIPatientTabs, {
  featureName: 'hts-home-tabs',
  moduleName,
});

export const ctHomeHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'ct-home-header',
  moduleName,
});

export const ctHomeTiles = getSyncLifecycle(CTSummaryTiles, {
  featureName: 'ct-home-tiles',
  moduleName,
});

export const ctHomeTabs = getSyncLifecycle(CTHomePatientTabs, {
  featureName: 'ct-home-tabs',
  moduleName,
});

export const hivCareAndTreatmentFolderLink = getSyncLifecycle(
  createOHRIDashboardLink(hivCareAndTreatmentFolderDashboardMeta),
  options,
);
export const hivCareAndTreatmentDashboardLink = getSyncLifecycle(
  createOHRIDashboardLink(careAndTreatmentDashboardMeta),
  options,
);
export const hivCareAndTreatmentDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'care and treatment dashboard',
  moduleName,
});

export const hivPreventionFolderLink = getSyncLifecycle(
  createOHRIDashboardLink(hivPreventionFolderDashboardMeta),
  options,
);
export const hivPreventionDashboardLink = getSyncLifecycle(createOHRIDashboardLink(htsDashboardMeta), options);
export const hivPreventionDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'hts dashboard',
  moduleName,
});

// Lab Results
export const labResultsHomeHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'lab-results-home-header',
  moduleName,
});

export const labResultsHomeTiles = getSyncLifecycle(LabResultsSummaryTiles, {
  featureName: 'lab-results-home-tiles',
  moduleName,
});

export const labResultsHomeTabs = getSyncLifecycle(LabResultsSummary, {
  featureName: 'lab-results-tabs',
  moduleName,
});

// Patient Chart
export const patientChartHIVPreventionDashboard = getSyncLifecycle(
  createDashboardGroup(hivPreventionDashboardMeta),
  options,
);

export const htsSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...htsSummaryDashboardMeta, moduleName }),
  options,
);

export const htsSummaryDashboard = getSyncLifecycle(HTSPreventionSummary, {
  featureName: 'hts-patient-encounters-list',
  moduleName,
});
export const patientChartHIVCareAndTreatmentDashboard = getSyncLifecycle(
  createDashboardGroup(hivCareAndTreatmentDashboardDMeta),
  options,
);
export const hivPatientSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...hivPatientSummaryDashboardMeta, moduleName }),
  options,
);
export const programManagementDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...programManagementDashboardMeta, moduleName }),
  options,
);

export const programManagementDashboard = getSyncLifecycle(ProgramManagementSummary, {
  featureName: 'program-management-summary',
  moduleName,
});
export const clinicalVisitsDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...clinicalVisitsDashboardMeta, moduleName }),
  options,
);

export const clinicalVisitsDashboard = getSyncLifecycle(VisitsSummary, {
  featureName: 'visits-summary',
  moduleName,
});

export const generalCounsellingDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...generalCounsellingDashboardMeta, moduleName }),
  options,
);

export const generalCounsellingDashboard = getSyncLifecycle(GeneralCounsellingSummary, {
  featureName: 'general-counselling-summary',
  moduleName,
});

export const partnerNotificationServicesDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...partnerNotificationServicesDashboardMeta, moduleName }),
  options,
);

export const partnerNotificationServicesDashboard = getSyncLifecycle(PartnerNotificationServices, {
  featureName: 'partner-notification-services',
  moduleName,
});
