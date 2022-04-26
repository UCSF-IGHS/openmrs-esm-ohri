import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  clearCareAndTreatmentSidenavRegistry,
  createCareAndTreatmentDashboardLink,
  serviceSummary_dashboardMeta,
  labResults_dashboardMeta,
  programManagement_dashboardMeta,
  visits_dashboardMeta,
  generalCounselling_dashboardMeta,
  adherenceCounselling_dashboardMeta,
  partnerNotificationServices_dashboardMeta,
  medications_dashboardMeta,
  appointments_dashboardMeta,
} from './care-and-treatment/dashboard.meta';

import {
  createOHRIDashboardLink,
  PatientStatusBannerTag,
  OHRIHome,
  OHRIWelcomeSection,
} from 'openmrs-esm-ohri-commons-lib';

import { addToBaseFormsRegistry } from 'openmrs-ohri-form-engine-lib';
import hivForms from './forms/forms-registry';

import {
  hivFolderDashboardMeta,
  careAndTreatmentDashboardMeta,
  htsDashboardMeta,
  clearHivPreventionSidenavRegistry,
  createHIVPreventionDashboardLink,
  hts_dashboardMeta,
  preExposureProphylaxis_dashboardMeta,
} from './dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = 'openmrs-esm-ohri-hiv-app';

  const options = {
    featureName: 'ohri-hiv',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  //Clear sidenav items to avoid duplicates
  clearCareAndTreatmentSidenavRegistry();
  clearHivPreventionSidenavRegistry();

  addToBaseFormsRegistry(hivForms);
  return {
    pages: [],
    extensions: [
      {
        id: 'hts-patient-encounters-list-ext',
        slot: 'hts-summary-dashboard-slot',
        load: getAsyncLifecycle(() => import('./views/hts/encounters-list/hts-overview-list.component'), {
          featureName: 'hts-patient-encounters-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-service-summary-list-ext',
        slot: 'hts-service-summary-dashboard-slot',
        load: getAsyncLifecycle(
          () => import('./views/service-summary/encounter-list/service-summary-encounter-list.component'),
          {
            featureName: 'hts-service-summary-list',
            moduleName,
          },
        ),
      },
      {
        id: 'hts-lab-results-list-ext',
        slot: 'hts-lab-results-dashboard-slot',
        load: getAsyncLifecycle(() => import('./views/lab-results/overview/lab-results-overview.component'), {
          featureName: 'hts-lab-results-list',
          moduleName,
        }),
        order: 7,
        meta: {
          columnSpan: 4,
        },
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
        id: 'ct-home-tabs-ext',
        slot: 'ct-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./views/hts/patient-list-tabs/ct-patient-list-tabs.component'), {
          featureName: 'ct-home-tabs',
          moduleName,
        }),
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
        id: 'care-and-treatment-dashboard-ext',
        slot: 'ohri-hiv-dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(careAndTreatmentDashboardMeta), options),
        meta: careAndTreatmentDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'care-and-treatment-dashboard',
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
        id: 'hts-dashboard-ext',
        slot: 'ohri-hiv-dashboard-slot',
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
        id: 'hts-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createHIVPreventionDashboardLink(hts_dashboardMeta), options),
        meta: hts_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'pre-exposure-prophylaxis',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createHIVPreventionDashboardLink(preExposureProphylaxis_dashboardMeta), options),
        meta: preExposureProphylaxis_dashboardMeta,
        online: true,
        offline: true,
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
        id: 'hts-service-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(serviceSummary_dashboardMeta), options),
        meta: serviceSummary_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'program-management-summary',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(programManagement_dashboardMeta), options),
        meta: programManagement_dashboardMeta,
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
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(visits_dashboardMeta), options),
        meta: visits_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'visits-summary-ext',
        slot: 'visits-summary-slot',
        load: getAsyncLifecycle(() => import('./views/visits/visits-summary.component'), {
          featureName: 'visits-summary',
          moduleName,
        }),
      },
      {
        id: 'general-counselling-summary',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(generalCounselling_dashboardMeta), options),
        meta: generalCounselling_dashboardMeta,
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
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(adherenceCounselling_dashboardMeta), options),
        meta: adherenceCounselling_dashboardMeta,
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
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(partnerNotificationServices_dashboardMeta), options),
        meta: partnerNotificationServices_dashboardMeta,
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
      {
        id: 'lab-results-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(labResults_dashboardMeta), options),
        meta: labResults_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'medications-summary',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(medications_dashboardMeta), options),
        meta: medications_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'medications-summary-ext',
        slot: 'medications-summary-slot',
        load: getAsyncLifecycle(() => import('./views/medications/medications.component'), {
          featureName: 'medications-summary',
          moduleName,
        }),
      },
      {
        id: 'appointments-summary',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCareAndTreatmentDashboardLink(appointments_dashboardMeta), options),
        meta: appointments_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'appointments-summary-ext',
        slot: 'appointments-summary-slot',
        load: getAsyncLifecycle(() => import('./views/appointments/appointments.component'), {
          featureName: 'appointments-summary',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
