import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  clearSidenavRegistry,
  createDashboardLink,
  hts_dashboardMeta,
  serviceEnrolment_dashboardMeta,
  serviceSummary_dashboardMeta,
  clinicalVisit_dashboardMeta,
  labResults_dashboardMeta,
  drugOrders_dashboardMeta,
} from './dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS () {
  const moduleName = 'esm-hiv-app';

  const options = {
    featureName: 'hiv',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  //Clear sidenav items to avoid duplicates
  clearSidenavRegistry();

  return {
    extensions: [
      {
        id: 'hts-patient-encounters-list-ext',
        slot: 'hts-summary-dashboard-slot',
        load: getAsyncLifecycle(() => import('./pages/hts/encounters-list/hts-overview-list.component'), {
          featureName: 'hts-patient-encounters-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-clinical-visit-list-ext',
        slot: 'hts-clinical-visit-dashboard-slot',
        load: getAsyncLifecycle(
          () => import('./pages/clinical-visit/encounter-list/clinical-visit-encounter-list.component'),
          {
            featureName: 'hts-clinical-visit-list',
            moduleName,
          },
        ),
        order: 2,
        meta: {
          columnSpan: 4,
        },
      },
      ,
      {
        id: 'hts-service-summary-list-ext',
        slot: 'hts-service-summary-dashboard-slot',
        load: getAsyncLifecycle(
          () => import('./pages/service-summary/encounter-list/service-summary-encounter-list.component'),
          {
            featureName: 'hts-service-summary-list',
            moduleName,
          },
        ),
      },
      {
        id: 'hts-service-enrolment-list-ext',
        slot: 'hts-service-enrolment-dashboard-slot',
        load: getAsyncLifecycle(
          () => import('./pages/service-enrolment/encounter-list/service-enrolment-encounter-list.component'),
          {
            featureName: 'hts-service-enrolment-list',
            moduleName,
          },
        ),
        order: 3,
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-lab-results-list-ext',
        slot: 'hts-lab-results-dashboard-slot',
        load: getAsyncLifecycle(() => import('./pages/lab-results/overview/lab-results-overview.component'), {
          featureName: 'hts-lab-results-list',
          moduleName,
        }),
        order: 7,
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-drug-orders-list-ext',
        slot: 'hts-drug-orders-dashboard-slot',
        load: getAsyncLifecycle(
          () => import('./pages/drug-orders/encounter-list/drug-orders-encounter-list.component'),
          {
            featureName: 'hts-drug-orders-list',
            moduleName,
          },
        ),
        order: 5,
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'hts-encounter-form-ext',
        load: getAsyncLifecycle(() => import('./pages/hts/encounter-form/hts-encounter-form.component'), {
          featureName: 'hts-encounter-form',
          moduleName,
        }),
      },
      {
        id: 'ohri-forms-view-ext',
        load: getAsyncLifecycle(() => import('./pages/hts/encounters-list/ohri-form-view.component'), {
          featureName: 'ohri-forms',
          moduleName,
        }),
      },
      {
        id: 'patient-hiv-status-tag',
        slot: 'patient-banner-tags-slot',
        load: getAsyncLifecycle(() => import('./components/banner-tags/patient-status-tag.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'patient-list-modal',
        slot: 'patient-actions-slot',
        load: getAsyncLifecycle(() => import('./components/modals/patient-list/add-patient-to-list-modal.component'), {
          featureName: 'patient-list-modal',
          moduleName,
        }),
      },
      {
        id: 'hts-service-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(serviceSummary_dashboardMeta), options),
        meta: serviceSummary_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'hts-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(hts_dashboardMeta), options),
        meta: hts_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'service-enrolment-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(serviceEnrolment_dashboardMeta), options),
        meta: serviceEnrolment_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'clinical-visit-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(clinicalVisit_dashboardMeta), options),
        meta: clinicalVisit_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'lab-results-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(labResults_dashboardMeta), options),
        meta: labResults_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'drug-orders-summary-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardLink(drugOrders_dashboardMeta), options),
        meta: drugOrders_dashboardMeta,
        online: true,
        offline: true,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
