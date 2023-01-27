import { ParentChild, PedestrianChild } from '@carbon/react/icons';

export const mchFolderMeta = {
  title: 'Maternal & Child Health',
  slotName: 'mch-slot',
  isExpanded: false,
};

export const mchSummary_dashboardMeta = {
  slot: 'mch-summary-slot',
  columns: 1,
  title: 'Client Summary',
};

export const maternalVisits_dashboardMeta = {
  slot: 'maternal-visits-summary-slot',
  columns: 1,
  title: 'Maternal Visits',
  patientExpression: 'calculateAge(patient.birthDate) > 10',
};

export const childVisits_dashboardMeta = {
  slot: 'child-visits-summary-slot',
  columns: 1,
  title: 'Child Visits',
  patientExpression: 'calculateAge(patient.birthDate) <= 10',
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
