/* eslint-disable prettier/prettier */
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


export const tbPreventionCasesDashboardMeta = {
  name: 'tb-prevention-cases',
  slot: 'tb-prevention-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'tpt', dashboardTitle: 'TB Prevention' },
  title: 'TB Prevention',
};
