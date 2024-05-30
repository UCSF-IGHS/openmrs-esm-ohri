import { Pills } from '@carbon/react/icons';

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

export const hivPreventionFolderDashboardMeta = {
  slot: 'ohri-hiv-prevention-dashboard-slot',
  isFolder: true,
  title: 'HIV Testing Services',
  name: 'hts',
  folderTitle: 'HIV Prevention',
  folderIcon: Pills,
};

export const htsDashboardMeta = {
  name: 'hts',
  slot: 'hts-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'hts', dashboardTitle: 'HTS Home Page' },
  title: 'HIV Testing Services',
};
