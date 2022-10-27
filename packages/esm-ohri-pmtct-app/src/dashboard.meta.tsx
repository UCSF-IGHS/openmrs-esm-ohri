import { ParentChild } from '@carbon/react/icons';

export const mnchSummary_dashboardMeta = {
  slot: 'mnch-summary-slot',
  columns: 1,
  title: 'MNCH Summary',
};

export const maternalHealth_dashboardMeta = {
  slot: 'maternal-health-summary-slot',
  columns: 1,
  title: 'Maternal Health',
};

export const childHealth_dashboardMeta = {
  slot: 'child-health-summary-slot',
  columns: 1,
  title: 'Child Health',
};

export const medication_dashboardMeta = {
  slot: 'medication-summary-slot',
  columns: 1,
  title: 'Medication',
};

export const labs_dashboardMeta = {
  slot: 'labs-summary-slot',
  columns: 1,
  title: 'Labs',
};

export const mchFolderMeta = {
  title: 'Maternal & Child Health',
  slotName: 'mch-slot',
  isExpanded: false,
};

// Clinical Dashboards
// export const motherChildHealthFolderDashboardMeta = {
//   slot: 'ohri-mother-child-health-dashboard-slot',
//   config: { columns: 1, type: 'grid', icon: ParentChild },
//   isFolder: true,
//   title: 'Mother Child Health',
// };

export const motherChildDashboardMeta = {
  name: 'mother-child-health',
  slot: 'mother-child-health-dashboard-slot',
  config: {
    columns: 1,
    type: 'grid',
    programme: 'pmtct',
    icon: ParentChild,
    dashboardTitle: 'Mother Child Health Home Page',
  },
  title: 'Maternal & Child Health',
};
