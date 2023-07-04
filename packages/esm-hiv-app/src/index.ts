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
  hivPreventionDashboardDMeta,
  preExposureProphylaxisDashboardMeta,
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

export const htsPatientEncountersList = getAsyncLifecycle(
  () => import('./views/hiv-testing-services/hts-prevention-summary.component'),
  {
    featureName: 'hts-patient-encounters-list',
    moduleName,
  },
);

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

// return {
//   extensions: [
//     {
//       id: 'ohri-hiv-prevention',
//       slot: 'patient-chart-dashboard-slot',
//       load: getSyncLifecycle(createDashboardGroup(hivPreventionDashboardDMeta), options),
//       meta: hivPreventionDashboardDMeta,
//       online: true,
//       offline: true,
//       order: 22,
//     },
//     {
//       id: 'hts-summary-dashboard',
//       slot: 'ohri-hiv-prevention-slot',
//       load: getSyncLifecycle(createDashboardLink(htsSummaryDashboardMeta), options),
//       meta: htsSummaryDashboardMeta,
//       online: true,
//       offline: true,
//     },
//     {
//       id: 'pre-exposure-prophylaxis',
//       slot: 'ohri-hiv-prevention-slot',
//       load: getSyncLifecycle(createDashboardLink(preExposureProphylaxisDashboardMeta), options),
//       meta: preExposureProphylaxisDashboardMeta,
//       online: false,
//       offline: false,
//     },
//     {
//       id: 'pre-exposure-prophylaxis-ext',
//       slot: 'pre-exposure-prophylaxis-dashboard-slot',
//       load: getAsyncLifecycle(() => import('./views/pre-exposure-prophylaxis/pre-exposure-prophylaxis.component'), {
//         featureName: 'pre-exposure-prophylaxis',
//         moduleName,
//       }),
//     },
//     {
//       id: 'ohri-hiv-care-and-treatment',
//       slot: 'patient-chart-dashboard-slot',
//       load: getSyncLifecycle(createDashboardGroup(hivCareAndTreatmentDashboardDMeta), options),
//       meta: hivCareAndTreatmentDashboardDMeta,
//       online: true,
//       offline: true,
//       order: 21,
//     },
//     {
//       id: 'hts-service-summary-dashboard',
//       slot: 'ohri-hiv-care-and-treatment-slot',
//       load: getSyncLifecycle(createDashboardLink(hivPatientSummaryDashboardMeta), options),
//       meta: hivPatientSummaryDashboardMeta,
//       online: true,
//       offline: true,
//     },
//     {
//       id: 'program-management-summary',
//       slot: 'ohri-hiv-care-and-treatment-slot',
//       load: getSyncLifecycle(createDashboardLink(programManagementDashboardMeta), options),
//       meta: programManagementDashboardMeta,
//       online: true,
//       offline: true,
//     },
//     {
//       id: 'program-management-summary-ext',
//       slot: 'program-management-summary-slot',
//       load: getAsyncLifecycle(() => import('./views/program-management/program-management-summary.component'), {
//         featureName: 'program-management-summary',
//         moduleName,
//       }),
//     },
//     {
//       id: 'visits-summary',
//       slot: 'ohri-hiv-care-and-treatment-slot',
//       load: getSyncLifecycle(createDashboardLink(clinicalVisitsDashboardMeta), options),
//       meta: clinicalVisitsDashboardMeta,
//       online: true,
//       offline: true,
//     },
//     {
//       id: 'visits-summary-ext',
//       slot: 'clinical-visits-summary-slot',
//       load: getAsyncLifecycle(() => import('./views/visits/visits-summary.component'), {
//         featureName: 'visits-summary',
//         moduleName,
//       }),
//     },
//     {
//       id: 'general-counselling-summary',
//       slot: 'ohri-hiv-care-and-treatment-slot',
//       load: getSyncLifecycle(createDashboardLink(generalCounsellingDashboardMeta), options),
//       meta: generalCounsellingDashboardMeta,
//       online: true,
//       offline: true,
//     },
//     {
//       id: 'general-counselling-summary-ext',
//       slot: 'general-counselling-summary-slot',
//       load: getAsyncLifecycle(() => import('./views/general-counselling/general-counselling-summary.component'), {
//         featureName: 'general-counselling-summary',
//         moduleName,
//       }),
//     },
//     {
//       id: 'adherence-counselling-summary',
//       slot: 'ohri-hiv-care-and-treatment-slot',
//       load: getSyncLifecycle(createDashboardLink(adherenceCounsellingDashboardMeta), options),
//       meta: adherenceCounsellingDashboardMeta,
//       online: true,
//       offline: true,
//     },
//     {
//       id: 'adherence-counselling-summary-ext',
//       slot: 'adherence-counselling-summary-slot',
//       load: getAsyncLifecycle(() => import('./views/adherence-counselling/adherence-counselling-summary.component'), {
//         featureName: 'adherence-counselling-summary',
//         moduleName,
//       }),
//     },
//     {
//       id: 'partner-notification-services',
//       slot: 'ohri-hiv-care-and-treatment-slot',
//       load: getSyncLifecycle(createDashboardLink(partnerNotificationServicesDashboardMeta), options),
//       meta: partnerNotificationServicesDashboardMeta,
//       online: true,
//       offline: true,
//     },
//     {
//       id: 'partner-notification-services-ext',
//       slot: 'partner-notification-services-slot',
//       load: getAsyncLifecycle(
//         () => import('./views/partner-notification-services/partner-notification-services.component'),
//         {
//           featureName: 'partner-notification-services',
//           moduleName,
//         },
//       ),
//     },
//   ],
// };
