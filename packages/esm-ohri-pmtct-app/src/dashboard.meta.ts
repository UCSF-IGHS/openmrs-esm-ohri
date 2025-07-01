import { PedestrianChild } from '@carbon/react/icons';
import { moduleName } from '.';

export const mchFolderMeta = {
  title: 'Maternal & Child Health',
  slotName: 'mch-slot',
  isExpanded: false,
  patientExpression: 'calculateAge(patient.birthDate) <= 10 || patient.gender === "female"',
  moduleName: moduleName,
};

export const mchSummaryDashboardMeta = {
  name: 'mch-summary',
  slot: 'mch-summary-slot',
  columns: 1,
  title: 'MNCH Summary',
  path: 'mnch-summary',
  layoutMode: 'anchored',
  icon: '',
  moduleName: moduleName,
};

export const maternalVisitsDashboardMeta = {
  slot: 'maternal-visits-summary-slot',
  columns: 1,
  title: 'Maternal Visits',
  path: 'maternal-visits',
  layoutMode: 'anchored',
  patientExpression: 'calculateAge(patient.birthDate) > 10',
  moduleName: moduleName,
};

export const childVisitsDashboardMeta = {
  slot: 'child-visits-summary-slot',
  columns: 1,
  title: 'Child Visits',
  path: 'child-visits',
  layoutMode: 'anchored',
  patientExpression: 'calculateAge(patient.birthDate) <= 10',
  moduleName: moduleName,
};

// Clinical Dashboard
export const motherChildDashboardMeta = {
  name: 'mother-child-health',
  slot: 'mother-child-health-dashboard-slot',
  title: 'Maternal & Child Health',
  icon: PedestrianChild,
  moduleName: moduleName,
};
