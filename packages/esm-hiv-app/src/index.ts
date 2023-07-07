import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  createOHRIDashboardLink,
  PatientStatusBannerTag,
  OHRIHome,
  OHRIWelcomeSection,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';

import {
  hivFolderDashboardMeta,
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

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-hiv-app';

function setupOpenMRS() {
  const options = {
    featureName: 'ohri-hiv',
    moduleName,
  };
  defineConfigSchema(moduleName, {});

  return {
    pages: [],
    extensions: [
      {
        id: 'hts-patient-encounters-list-ext',
        slot: 'hts-summary-dashboard-slot',
        load: getAsyncLifecycle(() => import('./views/hiv-testing-services/hts-prevention-summary.component'), {
          featureName: 'hts-patient-encounters-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-service-summary-list-ext',
        slot: 'hiv-patient-summary-dashboard-slot',
        load: getAsyncLifecycle(
          () => import('./views/service-summary/encounter-list/service-summary-encounter-list.component'),
          {
            featureName: 'hts-service-summary-list',
            moduleName,
          },
        ),
      },
      {
        id: 'hts-home-header-ext',
        slot: 'hts-home-header-slot',
        load: getSyncLifecycle(OHRIWelcomeSection, {
          featureName: 'hts-home-header',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tile-ext',
        slot: 'hts-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./views/hts/home/summary-tiles/hts-summary-tiles.component'), {
          featureName: 'hts-home-tiles',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tabs-ext',
        slot: 'hts-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./views//hts/home/patient-tabs/ohri-patient-tabs.component'), {
          featureName: 'hts-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'ct-home-header-ext',
        slot: 'ct-home-header-slot',
        load: getSyncLifecycle(OHRIWelcomeSection, {
          featureName: 'ct-home-header',
          moduleName,
        }),
      },
      {
        id: 'ct-home-tile-ext',
        slot: 'ct-home-tiles-slot',
        load: getAsyncLifecycle(
          () => import('./views/hts/care-and-treatment/home/summary-tiles/ct-summary-tiles.component'),
          {
            featureName: 'ct-home-tiles',
            moduleName,
          },
        ),
      },
      {
        id: 'patient-hiv-status-tag',
        slot: 'patient-banner-tags-slot',
        load: getSyncLifecycle(PatientStatusBannerTag, options),
        online: true,
        offline: true,
      },
      {
        id: 'hiv-dashboard-items',
        slot: 'dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(hivFolderDashboardMeta), options),
        meta: hivFolderDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'hiv-prevention-dashboard-items',
        slot: 'dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(hivPreventionFolderDashboardMeta), options),
        meta: hivPreventionFolderDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'care-and-treatment-dashboard-ext',
        slot: 'ohri-hiv-dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(careAndTreatmentDashboardMeta), options),
        meta: careAndTreatmentDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-care-and-treatment-dashboard',
        slot: 'care-and-treatment-dashboard-slot',
        load: getSyncLifecycle(OHRIHome, {
          featureName: 'care and treatment dashboard',
          moduleName,
        }),
        meta: careAndTreatmentDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ct-home-tabs-ext',
        slot: 'ct-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./views/hts/patient-list-tabs/ct-patient-list-tabs.component'), {
          featureName: 'ct-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'hts-dashboard-ext',
        slot: 'ohri-hiv-prevention-dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(htsDashboardMeta), options),
        meta: htsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'hts-dashboard',
        slot: 'hts-dashboard-slot',
        load: getSyncLifecycle(OHRIHome, {
          featureName: 'hts dashboard',
          moduleName,
        }),
        meta: htsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'lab-results-home-header-ext',
        slot: 'lab-results-home-header-slot',
        load: getSyncLifecycle(OHRIWelcomeSection, {
          featureName: 'lab-results-home-header',
          moduleName,
        }),
      },
      {
        id: 'lab-results-home-tile-ext',
        slot: 'lab-results-home-tiles-slot',
        load: getAsyncLifecycle(
          () => import('./views/hts/care-and-treatment/lab-results/lab-results-summary-tiles.component'),
          {
            featureName: 'lab-results-home-tiles',
            moduleName,
          },
        ),
      },
      {
        id: 'lab-results-tabs-ext',
        slot: 'lab-results-home-tabs-slot',
        load: getAsyncLifecycle(
          () => import('./views/hts/care-and-treatment/lab-results/lab-results-summary.component'),
          {
            featureName: 'lab-results-tabs',
            moduleName,
          },
        ),
      },

      {
        id: 'ohri-hiv-prevention',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardGroup(hivPreventionDashboardDMeta), options),
        meta: hivPreventionDashboardDMeta,
        online: true,
        offline: true,
        order: 22,
      },
      {
        id: 'hts-summary-dashboard',
        slot: 'ohri-hiv-prevention-slot',
        load: getSyncLifecycle(createDashboardLink(htsSummaryDashboardMeta), options),
        meta: htsSummaryDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'pre-exposure-prophylaxis',
        slot: 'ohri-hiv-prevention-slot',
        load: getSyncLifecycle(createDashboardLink(preExposureProphylaxisDashboardMeta), options),
        meta: preExposureProphylaxisDashboardMeta,
        online: false,
        offline: false,
      },
      {
        id: 'pre-exposure-prophylaxis-ext',
        slot: 'pre-exposure-prophylaxis-dashboard-slot',
        load: getAsyncLifecycle(() => import('./views/pre-exposure-prophylaxis/pre-exposure-prophylaxis.component'), {
          featureName: 'pre-exposure-prophylaxis',
          moduleName,
        }),
      },
      {
        id: 'ohri-hiv-care-and-treatment',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardGroup(hivCareAndTreatmentDashboardDMeta), options),
        meta: hivCareAndTreatmentDashboardDMeta,
        online: true,
        offline: true,
        order: 21,
      },
      {
        id: 'hts-service-summary-dashboard',
        slot: 'ohri-hiv-care-and-treatment-slot',
        load: getSyncLifecycle(createDashboardLink(hivPatientSummaryDashboardMeta), options),
        meta: hivPatientSummaryDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'program-management-summary',
        slot: 'ohri-hiv-care-and-treatment-slot',
        load: getSyncLifecycle(createDashboardLink(programManagementDashboardMeta), options),
        meta: programManagementDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'program-management-summary-ext',
        slot: 'program-management-summary-slot',
        load: getAsyncLifecycle(() => import('./views/program-management/program-management-summary.component'), {
          featureName: 'program-management-summary',
          moduleName,
        }),
      },
      {
        id: 'visits-summary',
        slot: 'ohri-hiv-care-and-treatment-slot',
        load: getSyncLifecycle(createDashboardLink(clinicalVisitsDashboardMeta), options),
        meta: clinicalVisitsDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'visits-summary-ext',
        slot: 'clinical-visits-summary-slot',
        load: getAsyncLifecycle(() => import('./views/visits/visits-summary.component'), {
          featureName: 'visits-summary',
          moduleName,
        }),
      },
      {
        id: 'general-counselling-summary',
        slot: 'ohri-hiv-care-and-treatment-slot',
        load: getSyncLifecycle(createDashboardLink(generalCounsellingDashboardMeta), options),
        meta: generalCounsellingDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'general-counselling-summary-ext',
        slot: 'general-counselling-summary-slot',
        load: getAsyncLifecycle(() => import('./views/general-counselling/general-counselling-summary.component'), {
          featureName: 'general-counselling-summary',
          moduleName,
        }),
      },
      {
        id: 'adherence-counselling-summary',
        slot: 'ohri-hiv-care-and-treatment-slot',
        load: getSyncLifecycle(createDashboardLink(adherenceCounsellingDashboardMeta), options),
        meta: adherenceCounsellingDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'adherence-counselling-summary-ext',
        slot: 'adherence-counselling-summary-slot',
        load: getAsyncLifecycle(() => import('./views/adherence-counselling/adherence-counselling-summary.component'), {
          featureName: 'adherence-counselling-summary',
          moduleName,
        }),
      },
      {
        id: 'partner-notification-services',
        slot: 'ohri-hiv-care-and-treatment-slot',
        load: getSyncLifecycle(createDashboardLink(partnerNotificationServicesDashboardMeta), options),
        meta: partnerNotificationServicesDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'partner-notification-services-ext',
        slot: 'partner-notification-services-slot',
        load: getAsyncLifecycle(
          () => import('./views/partner-notification-services/partner-notification-services.component'),
          {
            featureName: 'partner-notification-services',
            moduleName,
          },
        ),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
