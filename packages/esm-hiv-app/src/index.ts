import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import ServiceSummaryOverviewList from './views/service-summary/encounter-list/service-summary-encounter-list.component';
import HTSPreventionSummary from './views/hiv-testing-services/hts-prevention-summary.component';
import ProgramManagementSummary from './views/program-management/program-management-summary.component';
import VisitsSummary from './views/visits/visits-summary.component';
import GeneralCounsellingSummary from './views/general-counselling/general-counselling-summary.component';
import PartnerNotificationServices from './views/partner-notification-services/partner-notification-services.component';
import {
  createOHRIDashboardLink,
  PatientStatusBannerTag,
  createOHRIGroupedLink,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';

import {
  hivCareAndTreatmentFolderDashboardMeta,
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
import htsRootComponent from './hts-root.component';
import careAndTreatmentRootComponent from './hiv-treatment-root.component';

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

export const hivCareAndTreatmentFolderLink = getSyncLifecycle(
  createOHRIDashboardLink(hivCareAndTreatmentFolderDashboardMeta),
  options,
);
export const hivCareAndTreatmentDashboardLink = getSyncLifecycle(
  createOHRIGroupedLink(hivCareAndTreatmentFolderDashboardMeta),
  options,
);
export const hivCareAndTreatmentDashboard = getSyncLifecycle(careAndTreatmentRootComponent, options);

export const hivPreventionFolderLink = getSyncLifecycle(
  createOHRIDashboardLink(hivPreventionFolderDashboardMeta),
  options,
);
export const hivPreventionDashboardLink = getSyncLifecycle(
  createOHRIGroupedLink(hivPreventionFolderDashboardMeta),
  options,
);
export const hivPreventionDashboard = getSyncLifecycle(htsRootComponent, options);

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
