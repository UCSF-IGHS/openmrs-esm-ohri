import { config } from 'rxjs';

export const cervicalCancerFolderMeta = {
  title: 'Cervical Cancer',
  slotName: 'cervical-cancer-patient-chart-slot',
  isExpanded: false,
  showWhenExpression: 'patient.age >= 25 && patient.gender === "female"',
};

export const cacxSummaryDashboardMeta = {
  slot: 'patient-chart-cacx-summary-dashboard-slot',
  columns: 1,
  title: 'CaCx Summary',
  path: 'cacx-summary',
  moduleName: '@ohri/openmrs-esm-ohri-cervical-cancer-app',
  config: {},
  icon: '',
};

export const cacxVisitDashboardMeta = {
  slot: 'patient-chart-cacx-visits-dashboard-slot',
  columns: 1,
  title: 'CaCx Visits',
  path: 'cacx-visits',
  moduleName: '@ohri/openmrs-esm-ohri-cervical-cancer-app',
  config: {},
  layoutMode: 'anchored',
  icon: '',
};
