import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
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
  adherenceCounsellingDashboardMeta,
  partnerNotificationServicesDashboardMeta,
  hivPreventionFolderDashboardMeta,
} from './dashboard.meta';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-hiv-app';

const options = {
  featureName: 'ohri-hiv',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {});
}

export const patientHIVStatusTag = getSyncLifecycle(PatientStatusBannerTag, options);

export const htsServiceSummaryList = getAsyncLifecycle(
  () => import('./views/service-summary/encounter-list/service-summary-encounter-list.component'),
  {
    featureName: 'hts-service-summary-list',
    moduleName,
  },
);

export const htsHomeHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'hts-home-header',
  moduleName,
});

export const htsHomeTiles = getAsyncLifecycle(
  () => import('./views/hts/home/summary-tiles/hts-summary-tiles.component'),
  {
    featureName: 'hts-home-tiles',
    moduleName,
  },
);

export const htsHomeTabs = getAsyncLifecycle(
  () => import('./views/hts/home/patient-tabs/ohri-patient-tabs.component'),
  {
    featureName: 'hts-home-tabs',
    moduleName,
  },
);

export const ctHomeHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'ct-home-header',
  moduleName,
});

export const ctHomeTiles = getAsyncLifecycle(
  () => import('./views/hts/care-and-treatment/home/summary-tiles/ct-summary-tiles.component'),
  {
    featureName: 'ct-home-tiles',
    moduleName,
  },
);

export const ctHomeTabs = getAsyncLifecycle(
  () => import('./views/hts/patient-list-tabs/ct-patient-list-tabs.component'),
  {
    featureName: 'ct-home-tabs',
    moduleName,
  },
);

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
export const labResultsHomeTiles = getAsyncLifecycle(
  () => import('./views/hts/care-and-treatment/lab-results/lab-results-summary-tiles.component'),
  {
    featureName: 'lab-results-home-tiles',
    moduleName,
  },
);
export const labResultsHomeTabs = getAsyncLifecycle(
  () => import('./views/hts/care-and-treatment/lab-results/lab-results-summary.component'),
  {
    featureName: 'lab-results-tabs',
    moduleName,
  },
);

// Patient Chart
export const patientChartHIVPreventionDashboard = getSyncLifecycle(
  createDashboardGroup(hivPreventionDashboardMeta),
  options,
);

export const htsSummaryDashboardLink = getSyncLifecycle(createDashboardLink(htsSummaryDashboardMeta), options);
export const htsSummaryDashboard = getAsyncLifecycle(
  () => import('./views/hiv-testing-services/hts-prevention-summary.component'),
  {
    featureName: 'hts-patient-encounters-list',
    moduleName,
  },
);

export const patientChartHIVCareAndTreatmentDashboard = getSyncLifecycle(
  createDashboardGroup(hivCareAndTreatmentDashboardDMeta),
  options,
);
export const hivPatientSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink(hivPatientSummaryDashboardMeta),
  options,
);
export const programManagementDashboardLink = getSyncLifecycle(
  createDashboardLink(programManagementDashboardMeta),
  options,
);
export const programManagementDashboard = getAsyncLifecycle(
  () => import('./views/program-management/program-management-summary.component'),
  {
    featureName: 'program-management-summary',
    moduleName,
  },
);

export const clinicalVisitsDashboardLink = getSyncLifecycle(createDashboardLink(clinicalVisitsDashboardMeta), options);
export const clinicalVisitsDashboard = getAsyncLifecycle(() => import('./views/visits/visits-summary.component'), {
  featureName: 'visits-summary',
  moduleName,
});

export const generalCounsellingDashboardLink = getSyncLifecycle(
  createDashboardLink(generalCounsellingDashboardMeta),
  options,
);
export const generalCounsellingDashboard = getAsyncLifecycle(
  () => import('./views/general-counselling/general-counselling-summary.component'),
  {
    featureName: 'general-counselling-summary',
    moduleName,
  },
);

export const adherenceCounsellingDashboardLink = getSyncLifecycle(
  createDashboardLink(adherenceCounsellingDashboardMeta),
  options,
);
export const adherenceCounsellingDashboard = getAsyncLifecycle(
  () => import('./views/adherence-counselling/adherence-counselling-summary.component'),
  {
    featureName: 'adherence-counselling-summary',
    moduleName,
  },
);

export const partnerNotificationServicesDashboardLink = getSyncLifecycle(
  createDashboardLink(partnerNotificationServicesDashboardMeta),
  options,
);
export const partnerNotificationServicesDashboard = getAsyncLifecycle(
  () => import('./views/partner-notification-services/partner-notification-services.component'),
  {
    featureName: 'partner-notification-services',
    moduleName,
  },
);
