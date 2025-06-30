import { Coronavirus } from '@carbon/react/icons';

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
