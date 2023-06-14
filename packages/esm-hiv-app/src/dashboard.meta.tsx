import { Home, Pills } from '@carbon/react/icons';

// Patient Chart Dashboards
export const hivPreventionDashboardDMeta = {
  title: 'HIV Prevention',
  slotName: 'ohri-hiv-prevention-slot',
  isExpanded: false,
};

export const htsSummaryDashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  columns: 1,
  title: 'HIV Testing Services',
  path: 'hts-summary',
};

export const preExposureProphylaxisDashboardMeta = {
  name: 'pre-exposure-prophylaxis',
  slot: 'pre-exposure-prophylaxis-dashboard-slot',
  columns: 1,
  title: 'Pre-exposure Prophylaxis',
  path: 'pre-exposure-prophylaxis',
};

export const hivCareAndTreatmentDashboardDMeta = {
  title: 'HIV Care and Treatment',
  slotName: 'ohri-hiv-care-and-treatment-slot',
  isExpanded: false,
};

export const hivPatientSummaryDashboardMeta = {
  slot: 'hiv-patient-summary-dashboard-slot',
  columns: 1,
  title: 'HIV Patient Summary',
  path: 'hiv-patient-summary',
};

export const programManagementDashboardMeta = {
  slot: 'program-management-summary-slot',
  columns: 1,
  title: 'Program Management',
  path: 'program-management',
};

export const clinicalVisitsDashboardMeta = {
  slot: 'clinical-visits-summary-slot',
  columns: 1,
  title: 'Clinical Visits',
  path: 'clinical-visits',
};

export const generalCounsellingDashboardMeta = {
  slot: 'general-counselling-summary-slot',
  columns: 1,
  title: 'General Counselling',
  path: 'general-counselling',
};

export const adherenceCounsellingDashboardMeta = {
  slot: 'adherence-counselling-summary-slot',
  columns: 1,
  title: 'Adherence Counselling',
  path: 'adherence-counselling',
};

export const partnerNotificationServicesDashboardMeta = {
  slot: 'partner-notification-services-slot',
  columns: 1,
  title: 'Partner Notification Services',
  path: 'partner-notification-services',
};

export const medicationsDashboardMeta = {
  slot: 'medications-summary-slot',
  columns: 1,
  title: 'Medications',
  path: 'medications',
};

export const appointmentsDashboardMeta = {
  slot: 'appointments-summary-slot',
  columns: 1,
  title: 'Appointments Summary',
  path: 'appointments-summary',
};

// Clinical Dashboards
export const hivFolderDashboardMeta = {
  slot: 'ohri-hiv-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Home },
  isFolder: true,
  title: 'HIV Care and Treatment',
};

export const hivPreventionFolderDashboardMeta = {
  slot: 'ohri-hiv-prevention-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Pills },
  isFolder: true,
  title: 'HIV Prevention',
};

export const htsDashboardMeta = {
  name: 'hts',
  slot: 'hts-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'hts', dashboardTitle: 'HTS Home Page' },
  title: 'HTS',
};

export const careAndTreatmentDashboardMeta = {
  name: 'care-and-treatment',
  slot: 'care-and-treatment-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'ct', dashboardTitle: 'C&T Home Page' },
  title: 'Care and Treatment',
};
