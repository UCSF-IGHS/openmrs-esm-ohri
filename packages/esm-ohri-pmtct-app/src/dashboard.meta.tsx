import { PedestrianChild } from '@carbon/react/icons';

export const mchFolderMeta = {
  title: 'Maternal & Child Health',
  slotName: 'mch-slot',
  isExpanded: false,
};

export const mchSummaryDashboardMeta = {
  slot: 'mch-summary-slot',
  columns: 1,
  title: 'Client Summary',
  path: 'MNCH Summary',
  linkText: 'MNCH Summary',
};

export const maternalVisitsDashboardMeta = {
  slot: 'maternal-visits-summary-slot',
  columns: 1,
  title: 'Maternal Visits',
  path: 'Maternal Visits',
  patientExpression: 'calculateAge(patient.birthDate) > 10',
};

export const childVisitsDashboardMeta = {
  slot: 'child-visits-summary-slot',
  columns: 1,
  title: 'Child Visits',
  path: 'Child Visits',
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
