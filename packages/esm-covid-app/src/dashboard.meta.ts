import { Coronavirus, VisualRecognition } from '@carbon/react/icons';

// Patient Chart Dashboards
export const covidPatientChartMeta = {
  title: 'COVID',
  slotName: 'ohri-covid-patient-chart-slot',
  isExpanded: false,
};

export const covidAssessmentsDashboardMeta = {
  slot: 'covid-assessments-dashboard-slot',
  columns: 1,
  title: 'Covid Assessments',
  path: 'covid-assessments',
  layoutMode: 'anchored',
};

export const covidLabTestsDashboardMeta = {
  slot: 'covid-lab-dashboard-slot',
  columns: 1,
  title: 'Lab Test',
  path: 'lab-test',
  layoutMode: 'anchored',
};

export const covidVaccinationsDashboardMeta = {
  slot: 'covid-vaccinations-dashboard-slot',
  columns: 1,
  title: 'Covid Vaccinations',
  path: 'covid-vaccinations',
  layoutMode: 'anchored',
};

// Clinical Dashboards
export const covidClinicalViewDashboardMeta = {
  slot: 'ohri-covid-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Coronavirus },
  isFolder: true,
  title: 'COVID',
};

export const covid19CasesDashboardMeta = {
  name: 'covid-cases',
  slot: 'covid-cases-dashboard-slot',
  title: 'COVID-19 Cases',
  isFolder: true,
  folderTitle: 'COVID',
  folderIcon: Coronavirus,
};

export const reportingDemoDashboardMeta = {
  name: 'covid-cases',
  icon: VisualRecognition,
  slot: 'covid-cases-dashboard-slot',
  title: 'Reporting Demo',
  isFolder: false,
  folderTitle: 'Reporting Demo',
  folderIcon: VisualRecognition,
};
