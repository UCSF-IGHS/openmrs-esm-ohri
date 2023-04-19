import { Home } from '@carbon/react/icons';
import { OhriDashboardLinkMeta, OhriDashboardMeta } from '@ohri/openmrs-esm-ohri-commons-lib';

// Patient Chart Dashboards
export const hivPreventionDashboardDMeta = {
  title: 'HIV Prevention',
  slotName: 'ohri-hiv-prevention-slot',
  isExpanded: false,
};

export const hts_dashboardMeta = {
  name: 'hts-summary',
  slot: 'hts-summary-dashboard-slot',
  columns: 1,
  title: 'HIV Testing Services (HTS)',
};

export const preExposureProphylaxis_dashboardMeta = {
  name: 'pre-exposure-prophylaxis',
  slot: 'pre-exposure-prophylaxis-dashboard-slot',
  columns: 1,
  title: 'Pre-exposure Prophylaxis',
};

export const hivCareAndTreatmentDashboardDMeta = {
  title: 'HIV Care and Treatment',
  slotName: 'ohri-hiv-care-and-treatment-slot',
  isExpanded: false,
};

export const serviceSummary_dashboardMeta = {
  slot: 'hts-service-summary-dashboard-slot',
  columns: 1,
  title: 'HIV Patient Summary',
};

export const labResults_dashboardMeta = {
  slot: 'hts-lab-results-dashboard-slot',
  columns: 1,
  title: 'Labs',
};

export const programManagement_dashboardMeta = {
  slot: 'program-management-summary-slot',
  columns: 1,
  title: 'Program Management',
};

export const visits_dashboardMeta = {
  slot: 'visits-summary-slot',
  columns: 1,
  title: 'Clinical Visits',
};

export const generalCounselling_dashboardMeta = {
  slot: 'general-counselling-summary-slot',
  columns: 1,
  title: 'General Counselling',
};

export const adherenceCounselling_dashboardMeta = {
  slot: 'adherence-counselling-summary-slot',
  columns: 1,
  title: 'Adherence Counselling',
};

export const partnerNotificationServices_dashboardMeta = {
  slot: 'partner-notification-services-slot',
  columns: 1,
  title: 'Partner Notification Services',
};

export const medications_dashboardMeta = {
  slot: 'medications-summary-slot',
  columns: 1,
  title: 'Medications',
};

export const appointments_dashboardMeta = {
  slot: 'appointments-summary-slot',
  columns: 1,
  title: 'Appointments Summary',
};

// Clinical Dashboards
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
  menuTitle: 'HTS',
};

export const careAndTreatmentDashboardMeta: OhriDashboardLinkMeta = {
  name: 'care-and-treatment',
  slot: 'care-and-treatment-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'ct', dashboardTitle: 'C&T Home Page' },
  menuTitle: 'Care and Treatment',
};
export const labResultsDashboardMeta: OhriDashboardLinkMeta = {
  name: 'lab-results',
  slot: 'lab-results-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'lab-results', dashboardTitle: 'Lab Results Home Page' },
  menuTitle: 'Lab Results',
};
