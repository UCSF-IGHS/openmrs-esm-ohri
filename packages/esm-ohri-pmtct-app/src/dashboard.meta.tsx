import { ParentChild, PedestrianChild } from '@carbon/react/icons';

export const mchFolderMeta = {
  title: 'Maternal & Child Health',
  slotName: 'mch-slot',
  isExpanded: false,
};

export const mnchSummary_dashboardMeta = {
  slot: 'mnch-summary-slot',
  columns: 1,
  title: 'Maternal, Newborn, and Child Health',
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

// Clinical Dashboard
export const motherChildDashboardMeta = {
  name: 'mother-child-health',
  slot: 'mother-child-health-dashboard-slot',
  config: {
    columns: 1,
    type: 'grid',
    programme: 'pmtct',
    dashboardTitle: 'Mother Child Health Home Page',
    icon: PedestrianChild,
  },
  isLink: true,
  title: 'Maternal & Child Health',
};
