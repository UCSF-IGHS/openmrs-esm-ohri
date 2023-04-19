import { Coronavirus } from '@carbon/react/icons';
import { OhriDashboardLinkMeta, OhriDashboardMeta } from '@ohri/openmrs-esm-ohri-commons-lib';

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
export const covidClinicalViewDashboardMeta: OhriDashboardMeta = {
  menuTitle: 'COVID',
  slot: 'ohri-covid-dashboard-slot',
  config: { columns: 1, type: 'grid', icon: Coronavirus },
  isFolder: true,
};

export const covid19CasesDashboardMeta: OhriDashboardLinkMeta = {
  name: 'covid-cases',
  slot: 'covid-cases-dashboard-slot',
  config: { columns: 1, type: 'grid', programme: 'covid', icon: Coronavirus },
  title: 'COVID-19 Cases',
};
