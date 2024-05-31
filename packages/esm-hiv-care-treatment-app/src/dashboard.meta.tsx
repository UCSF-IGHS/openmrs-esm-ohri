import { Home } from '@carbon/react/icons';

// Patient Chart Dashboards
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

// Clinical Dashboards
export const hivCareAndTreatmentFolderDashboardMeta = {
  slot: 'ohri-hiv-care-and-treatment-dashboard-slot',
  isFolder: true,
  title: 'HIV Care and Treatment',
  name: 'care-and-treatment',
  folderTitle: 'Care and Treatment',
  folderIcon: Home,
};

export const careAndTreatmentDashboardMeta = {
  name: 'care-and-treatment',
  slot: 'ct-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'ct', dashboardTitle: 'C&T Home Page' },
  title: 'Care and Treatment',
};
