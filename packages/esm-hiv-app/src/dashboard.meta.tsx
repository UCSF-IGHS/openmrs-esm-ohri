import { Home, Pills } from '@carbon/react/icons';
import { OhriDashboardLinkMeta, OhriDashboardMeta } from '@ohri/openmrs-esm-ohri-commons-lib';

// Patient Chart Dashboards
export const hivPreventionDashboardMeta = {
  title: 'HIV Prevention',
  slotName: 'ohri-hiv-prevention-slot',
  isExpanded: false,
};

export const htsSummaryDashboardMeta = {
  slot: 'hts-summary-dashboard-slot',
  columns: 1,
  title: 'HIV Testing Services',
  path: 'hiv-testing-services',
  layoutMode: 'anchored',
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
  layoutMode: 'anchored',
};

export const programManagementDashboardMeta = {
  slot: 'program-management-summary-slot',
  columns: 1,
  title: 'Program Management',
  path: 'program-management',
  layoutMode: 'anchored',
};

export const clinicalVisitsDashboardMeta = {
  slot: 'clinical-visits-summary-slot',
  columns: 1,
  title: 'Clinical Visits',
  path: 'clinical-visits',
  layoutMode: 'anchored',
};

export const generalCounsellingDashboardMeta = {
  slot: 'general-counselling-summary-slot',
  columns: 1,
  title: 'General Counselling',
  path: 'general-counselling',
  layoutMode: 'anchored',
};

export const partnerNotificationServicesDashboardMeta = {
  slot: 'partner-notification-services-slot',
  columns: 1,
  title: 'Partner Notification',
  path: 'partner-notification-services',
  layoutMode: 'anchored',
};

export const medicationsDashboardMeta = {
  slot: 'medications-summary-slot',
  columns: 1,
  title: 'Medications',
  path: 'medications',
  layoutMode: 'anchored',
};

export const appointmentsDashboardMeta = {
  slot: 'appointments-summary-slot',
  columns: 1,
  title: 'Appointments Summary',
  path: 'appointments-summary',
  layoutMode: 'anchored',
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

export const hivFolderDashboardMeta: OhriDashboardMeta = {
  slot: 'ohri-hiv-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Home },
  isFolder: true,
  menuTitle: 'HIV',
};

export const htsDashboardMeta: OhriDashboardLinkMeta = {
  name: 'hts',
  slot: 'hts-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'hts', dashboardTitle: 'HTS Home Page' },
  title: 'HIV Testing Services',
};

export const careAndTreatmentDashboardMeta: OhriDashboardLinkMeta = {
  name: 'care-and-treatment',
  slot: 'ct-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'ct', dashboardTitle: 'C&T Home Page' },
  title: 'Care and Treatment',
};

export const labResultsDashboardMeta: OhriDashboardLinkMeta = {
  name: 'lab-results',
  slot: 'lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'lab-results', dashboardTitle: 'Lab Results Home Page' },
  title: 'Lab Results',
};
