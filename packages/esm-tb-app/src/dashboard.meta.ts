import { PillsAdd } from '@carbon/react/icons';

export const tbPatientChartMeta = {
  title: 'TB Program',
  slotName: 'ohri-tb-slot',
  isExpanded: false,
};

// Clinical Dashboards
export const tbClinicalViewDashboardMeta = {
  slot: 'tb-clinical-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: PillsAdd },
  isFolder: true,
  title: 'Tuberculosis',
};

export const tptPatientChartMeta = {
  title: 'TPT Program',
  slotName: 'ohri-tpt-slot',
  isExpanded: false,
};
