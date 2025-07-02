import { Home } from '@carbon/react/icons';

// Patient Chart Dashboards
export const hivCareAndTreatmentDashboardDMeta = {
  title: 'HIV Care and Treatment',
  slotName: 'ohri-hiv-care-and-treatment-slot',
  isExpanded: false,
};

export const programManagementDashboardMeta = {
  slot: 'program-management-summary-slot',
  columns: 1,
  title: 'Program Management',
  path: 'hiv-program-management',
  layoutMode: 'anchored',
  icon: '',
};

export const clinicalVisitsDashboardMeta = {
  slot: 'clinical-visits-summary-slot',
  columns: 1,
  title: 'Clinical Visits',
  path: 'hiv-clinical-visits',
  layoutMode: 'anchored',
  icon: '',
};

export const generalCounsellingDashboardMeta = {
  slot: 'general-counselling-summary-slot',
  columns: 1,
  title: 'General Counselling',
  path: 'hiv-general-counselling',
  layoutMode: 'anchored',
  icon: '',
};

export const partnerNotificationServicesDashboardMeta = {
  slot: 'partner-notification-services-slot',
  columns: 1,
  title: 'Partner Notification',
  path: 'hiv-partner-notification',
  layoutMode: 'anchored',
  icon: '',
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
