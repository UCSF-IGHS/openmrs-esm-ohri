import { Coronavirus } from '@carbon/react/icons';

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
};

export const covidLabTestsDashboardMeta = {
  slot: 'covid-lab-dashboard-slot',
  columns: 1,
  title: 'Lab Test',
  path: 'lab-test',
};

export const covidVaccinationsDashboardMeta = {
  slot: 'covid-vaccinations-dashboard-slot',
  columns: 1,
  title: 'Covid Vaccinations',
  path: 'covid-vaccinations',
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
  config: { columns: 1, type: 'grid', programme: 'covid', icon: Coronavirus },
  title: 'COVID-19 Cases',
  dashboardIcon: Coronavirus,
};
