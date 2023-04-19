import { Coronavirus } from '@carbon/react/icons';
import { OhriDashboardLinkMeta, OhriDashboardMeta } from '@ohri/openmrs-esm-ohri-commons-lib';

// Patient Chart Dashboards
export const covidPatientChartMeta = {
  title: 'COVID',
  slotName: 'ohri-covid-patient-chart-slot',
  isExpanded: false,
};

export const covidAssessments_dashboardMeta = {
  slot: 'covid-assessments-dashboard-slot',
  columns: 1,
  title: 'Covid Assessments',
};

export const covidLabResults_dashboardMeta = {
  slot: 'covid-lab-dashboard-slot',
  columns: 1,
  title: 'Lab Test',
};

export const covidVaccinations_dashboardMeta = {
  slot: 'covid-vaccinations-dashboard-slot',
  columns: 1,
  title: 'Covid Vaccinations',
};

// Clinical Dashboards
export const covidClinicalViewDashboardMeta: OhriDashboardMeta = {
  menuTitle: 'COVID',
  slot: 'ohri-covid-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Coronavirus },
  isFolder: true,
};

export const covid19CasesDashboardMeta: OhriDashboardLinkMeta = {
  name: 'covid-cases',
  slot: 'covid-cases-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'covid', dashboardTitle: 'COVID-19 Home Page' },
  menuTitle: 'COVID-19 Cases',
};
