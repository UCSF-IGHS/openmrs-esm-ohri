import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
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
} from './hiv/care-and-treatment/dashboard.meta';
import {
  clearCovidSidenavRegistry,
  createCovidDashboardLink,
  covidAssessments_dashboardMeta,
  covidLabResults_dashboardMeta,
  covidVaccinations_dashboardMeta,
} from './covid/dashboard.meta';

import patientDashboardsConfig from './ohri-patient-dashboards-config.json';
import {
  careAndTreatmentDashboardMeta,
  covid19CasesDashboardMeta,
  covidFolderDashboardMeta,
  createOHRIDashboardLink,
  hivFolderDashboardMeta,
  homeDashboardMeta,
  htsDashboardMeta,
} from './ohri-dashboard/ohri-dashboard.meta';
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
} from './components/patient-chart/ohri-patient-chart-sidenav.meta';
import {
  clearHivPreventionSidenavRegistry,
  createHIVPreventionDashboardLink,
  hts_dashboardMeta,
  preExposureProphylaxis_dashboardMeta,
} from './hiv/hiv-prevention/dashboard.meta';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-ohri-app';

  const options = {
    featureName: 'ohri',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  // Load configurations
  provide(patientDashboardsConfig);

  //Clear sidenav items to avoid duplicates
  clearCareAndTreatmentSidenavRegistry();
  clearCovidSidenavRegistry();
  clearHivPreventionSidenavRegistry();

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./pages/hiv/summary-page/hts-summary-page'), options),
        route: /^ohri\/.+\/hts/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^form-render-test/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^dashboard/,
      },
    ],
    extensions: [
      {
        id: 'hts-patient-encounters-list-ext',
        slot: 'hts-summary-dashboard-slot',
        load: getAsyncLifecycle(() => import('./pages/hiv/encounters-list/hts-overview-list.component'), {
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
          () => import('./pages/service-summary/encounter-list/service-summary-encounter-list.component'),
          {
            featureName: 'hts-service-summary-list',
            moduleName,
          },
        ),
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
        id: 'hts-home-header-ext',
        slot: 'hts-home-header-slot',
        load: getAsyncLifecycle(() => import('./pages/hiv/hts/welcome-section/hts-welcome-section.component'), {
          featureName: 'hts-home-header',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tile-ext',
        slot: 'hts-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./pages/hiv/hts/summary-tiles/hts-summary-tiles.component'), {
          featureName: 'hts-home-tiles',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tabs-ext',
        slot: 'hts-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./pages/hiv/hts/patient-tabs/ohri-patient-tabs.component'), {
          featureName: 'hts-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'ct-home-header-ext',
        slot: 'ct-home-header-slot',
        load: getAsyncLifecycle(() => import('./ohri-home/welcome-section/ohri-welcome-section.component'), {
          featureName: 'ct-home-header',
          moduleName,
        }),
      },
      {
        id: 'ct-home-tile-ext',
        slot: 'ct-home-tiles-slot',
        load: getAsyncLifecycle(
          () => import('./pages/hiv/care-and-treatment/home/summary-tiles/ct-summary-tiles.component'),
          {
            featureName: 'ct-home-tiles',
            moduleName,
          },
        ),
      },
      {
        id: 'ct-home-tabs-ext',
        slot: 'ct-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./pages/hiv/patient-list-tabs/ct-patient-list-tabs.component'), {
          featureName: 'ct-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'covid-home-header-ext',
        slot: 'covid-home-header-slot',
        load: getAsyncLifecycle(() => import('./ohri-home/welcome-section/ohri-welcome-section.component'), {
          featureName: 'covid-home-header',
          moduleName,
        }),
      },
      {
        id: 'covid-home-tile-ext',
        slot: 'covid-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./covid/home/summary-tiles/covid-summary-tiles.component'), {
          featureName: 'covid-home-tiles',
          moduleName,
        }),
      },
      {
        id: 'covid-home-tabs-ext',
        slot: 'covid-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./covid/home/patient-list-tabs/covid-patient-list-tabs.component'), {
          featureName: 'covid-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'hts-encounter-form-ext',
        load: getAsyncLifecycle(() => import('./pages/hiv/encounter-form/hts-encounter-form.component'), {
          featureName: 'hts-encounter-form',
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
        id: 'redirect-to-ohri-db-ext',
        slot: 'homepage-widgets-slot',
        load: getAsyncLifecycle(() => import('./components/redirect-dashboard/redirect-ohri-db.component'), {
          featureName: 'redirect-to-ohri-db',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'home-dashboard-ext',
        slot: 'dashboard-links-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(homeDashboardMeta), options),
        meta: homeDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'home-dashboard',
        slot: 'home-dashboard-slot',
        load: getAsyncLifecycle(() => import('./pages/hiv/patient-list/patient-list.component'), {
          featureName: 'home',
          moduleName,
        }),
        meta: homeDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'ohri-nav-items-ext',
        slot: 'ohri-nav-items-slot',
        load: getAsyncLifecycle(() => import('./ohri-dashboard/side-menu/ohri-dashboard-side-nav.component'), {
          featureName: 'nav-items',
          moduleName,
        }),
        online: true,
        offline: true,
      },
      {
        id: 'covid-dashboard-items',
        slot: 'dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(covidFolderDashboardMeta), options),
        meta: covidFolderDashboardMeta,
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
        id: 'covid-cases-dashboard-ext',
        slot: 'covid-dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(covid19CasesDashboardMeta), options),
        meta: covid19CasesDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-cases-dashboard',
        slot: 'covid-cases-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ohri-home/ohri-home-component'), {
          featureName: 'covid cases dashboard',
          moduleName,
        }),
        meta: covid19CasesDashboardMeta,
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
        load: getAsyncLifecycle(() => import('./ohri-home/ohri-home-component'), {
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
        load: getAsyncLifecycle(() => import('./ohri-home/ohri-home-component'), {
          featureName: 'hts dashboard',
          moduleName,
        }),
        meta: htsDashboardMeta,
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
        id: 'covid-Assessments-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(covidAssessments_dashboardMeta), options),
        meta: covidAssessments_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-lab-results',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(covidLabResults_dashboardMeta), options),
        meta: covidLabResults_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'covid-vaccinations-dashboard',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createCovidDashboardLink(covidVaccinations_dashboardMeta), options),
        meta: covidVaccinations_dashboardMeta,
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
        load: getAsyncLifecycle(() => import('./pages/pre-exposure-prophylaxis/pre-exposure-prophylaxis.component'), {
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
        load: getAsyncLifecycle(() => import('./pages/program-management/program-management-summary.component'), {
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
        load: getAsyncLifecycle(() => import('./pages/visits/visits-summary.component'), {
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
        load: getAsyncLifecycle(() => import('./pages/general-counselling/general-counselling-summary.component'), {
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
        load: getAsyncLifecycle(() => import('./pages/adherence-counselling/adherence-counselling-summary.component'), {
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
          () => import('./pages/partner-notification-services/partner-notification-services.component'),
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
        load: getAsyncLifecycle(() => import('./pages/medications/medications.component'), {
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
        load: getAsyncLifecycle(() => import('./pages/appointments/appointments.component'), {
          featureName: 'appointments-summary',
          moduleName,
        }),
      },
      {
        id: 'covid-assessments-ext',
        slot: 'covid-assessments-dashboard-slot',
        load: getAsyncLifecycle(() => import('./covid/pages/case-assessment.encounter-lists'), {
          featureName: 'covid-assessment',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'covid-Lab-results-ext',
        slot: 'covid-lab-dashboard-slot',
        load: getAsyncLifecycle(() => import('./covid/pages/lab-results.encounter-list'), {
          featureName: 'covid-lab-results',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        id: 'covid-vaccinations-ext',
        slot: 'covid-vaccinations-dashboard-slot',
        load: getAsyncLifecycle(() => import('./covid/pages/covid-vaccinations.encounter-list'), {
          featureName: 'covid-vaccinations',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      {
        name: 'form-render-link',
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./links/form-render-app-menu-link.component'), options),
        online: true,
        offline: true,
      },
      {
        id: 'clinical-views-divider',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta), options),
        meta: patientChartDivider_dashboardMeta,
        online: true,
        offline: true,
        order: 100,
      },
      {
        id: 'multiple-encounters-ext',
        slot: 'patient-chart-dashboard-slot',
        load: getAsyncLifecycle(() => import('./pages/multiple-encounters/multiple-encounter-summary.component'), {
          featureName: 'multiple-encounters-summary',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
