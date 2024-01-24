import { PillsAdd } from '@carbon/react/icons';

export const tbPatientChartMeta = {
  title: 'TB Program',
  slotName: 'ohri-tb-slot',
  isExpanded: false,
};

export const tbPatientSummaryDashboardMeta = {
  slot: 'tb-patient-summary-dashboard-slot',
  columns: 1,
  title: 'TB Patient Summary',
  path: 'tb-patient-summary',
  layoutMode: 'anchored',
};

export const tbProgramManagementDashboardMeta = {
  slot: 'tb-program-management-summary-slot',
  columns: 1,
  title: 'Program Management',
  path: 'tb-program-management',
  layoutMode: 'anchored',
};

export const tbTreatmentFollowUpDashboardMeta = {
  slot: 'tb-treatment-follow-up-summary-slot',
  columns: 1,
  title: 'Treatment and Follow-up',
  path: 'tb-treatment-follow-up',
  layoutMode: 'anchored',
};

export const tbContactListingDashboardMeta = {
  slot: 'tb-contact-listing-summary-slot',
  columns: 1,
  title: 'TB Contact Listing',
  path: 'tb-contact-listing',
  layoutMode: 'anchored',
};
// Clinical Dashboards
export const tbClinicalViewDashboardMeta = {
  slot: 'tb-clinical-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: PillsAdd },
  isFolder: true,
  title: 'Tuberculosis',
};

export const tbCasesDashboardMeta = {
  name: 'tb-cases',
  slot: 'tb-cases-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'tb', dashboardTitle: 'TB Treatment' },
  title: 'TB Treatment',
};

export const tbPreventionDashboardMeta = {
  name: 'tpt-prevention-cases',
  slot: 'tpt-cases-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'tpt', dashboardTitle: 'TB Prevention'},
  title: 'TB Prevention',
};

export const tptPatientChartMeta = {
  title: 'TPT Program',
  slotName: 'ohri-tpt-slot',
  isExpanded: false,
};

export const tptPatientSummaryMeta = {
  slot: 'tpt-patient-summary-slot',
  columns: 1,
  title: 'Patient Summary',
  path: 'tpt-patient-summary',
  layoutMode: 'anchored',
};

export const tptProgramManagementDashboardMeta = {
  slot: 'tpt-program-management-summary-slot',
  columns: 1,
  title: 'Program Management',
  path: 'tpt-program-management',
  layoutMode: 'anchored',
};
