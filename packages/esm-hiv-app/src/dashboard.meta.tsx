import { Home, Pills } from '@carbon/react/icons';

// Patient Chart Dashboards
export const hivPreventionDashboardMeta = {
  title: 'HIV Prevention',
  slotName: 'ohri-hiv-prevention-slot',
  isExpanded: false,
};

export const htsSummaryDashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  columns: 1,
  path: 'HIV Testing Services',
  title: 'HIV Testing Services',
};

export const preExposureProphylaxisDashboardMeta = {
  name: 'pre-exposure-prophylaxis',
  slot: 'pre-exposure-prophylaxis-dashboard-slot',
  columns: 1,
  title: 'Pre-exposure Prophylaxis',
  path: 'Pre-exposure Prophylaxis',
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
  path: 'HIV Patient Summary',
};

export const programManagementDashboardMeta = {
  slot: 'program-management-summary-slot',
  columns: 1,
  title: 'Program Management',
  path: 'Program Management',
};

export const clinicalVisitsDashboardMeta = {
  slot: 'clinical-visits-summary-slot',
  columns: 1,
  title: 'Clinical Visits',
  path: 'Clinical Visits',
};

export const generalCounsellingDashboardMeta = {
  slot: 'general-counselling-summary-slot',
  columns: 1,
  title: 'General Counselling',
  path: 'General Counselling',
};

export const adherenceCounsellingDashboardMeta = {
  slot: 'adherence-counselling-summary-slot',
  columns: 1,
  title: 'Adherence Counselling',
  path: 'Adherence Counselling',
};

export const partnerNotificationServicesDashboardMeta = {
  slot: 'partner-notification-services-slot',
  columns: 1,
  title: 'Partner Notification Services',
  path: 'Partner Notification Services',
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
  path: 'Appointments Summary',
};

// Clinical Dashboards
export const hivCareAndTreatmentFolderDashboardMeta = {
  slot: 'ohri-hiv-care-and-treatment-dashboard-slot',
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
  title: 'HIV Testing Services',
};

export const careAndTreatmentDashboardMeta = {
  name: 'care-and-treatment',
  slot: 'ct-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'ct', dashboardTitle: 'C&T Home Page' },
  title: 'Care and Treatment',
};
