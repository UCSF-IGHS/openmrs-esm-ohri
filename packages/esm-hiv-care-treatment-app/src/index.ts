import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import ServiceSummaryOverviewList from './hct/patient-chart/service-summary/service-summary-encounter-list.component';
import ProgramManagementSummary from './hct/patient-chart/program-management/program-management-summary.component';
import VisitsSummary from './hct/patient-chart/visits/visits-summary.component';
import GeneralCounsellingSummary from './hct/patient-chart/general-counselling/general-counselling-summary.component';
import PartnerNotificationServices from './hct/patient-chart/partner-notification-services/partner-notification-services.component';
import {
  createOHRIDashboardLink,
  PatientStatusBannerTag,
  createOHRIGroupedLink,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';

import {
  hivCareAndTreatmentFolderDashboardMeta,
  hivCareAndTreatmentDashboardDMeta,
  hivPatientSummaryDashboardMeta,
  programManagementDashboardMeta,
  clinicalVisitsDashboardMeta,
  generalCounsellingDashboardMeta,
  partnerNotificationServicesDashboardMeta,
} from './dashboard.meta';

import careAndTreatmentRootComponent from './hiv-treatment-root.component';

import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-hiv-care-treatment-app';

const options = {
  featureName: 'ohri-hiv-care-treatment',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const patientHIVStatusTag = getSyncLifecycle(PatientStatusBannerTag, options);

export const hivCareAndTreatmentFolderLink = getSyncLifecycle(
  createOHRIDashboardLink(hivCareAndTreatmentFolderDashboardMeta),
  options,
);
export const hivCareAndTreatmentDashboardLink = getSyncLifecycle(
  createOHRIGroupedLink(hivCareAndTreatmentFolderDashboardMeta),
  options,
);
export const hivCareAndTreatmentDashboard = getSyncLifecycle(careAndTreatmentRootComponent, options);

// Patient chart

export const hivServiceSummaryList = getSyncLifecycle(ServiceSummaryOverviewList, {
  featureName: 'hiv-service-summary-list',
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
