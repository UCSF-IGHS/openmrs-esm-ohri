import { FormEngine } from '@openmrs/openmrs-form-engine-lib';
import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { createNewOHRIDashboardLink } from '@ohri/openmrs-esm-ohri-commons-lib';
import { reportsDashboardMeta } from './dashboard.meta';
import reportsRoot from './components/reports/reports-root.component';
import { configSchema } from './config-schema';

export * from './constants';
export * from './api.resource';
export * from './types';
export * from './components/banner-tags/patient-status-tag.component';
export * from './components/banner-tags/patientHivStatus';
export * from './components/data-table/o-table.component';
export * from './components/empty-state/empty-data-illustration.component';
export * from './components/empty-state/empty-state-comingsoon.component';
export * from './components/empty-state/empty-state.component';
export * from './components/empty-state/table-empty-state.component';
export * from './components/encounter-list/encounter-list.component';
export * from './components/encounter-list/multiple-encounter-list.component';
export * from './components/error-state/error-state.component';
export * from './components/identifier-generator/identifier-generator.component';
export * from './components/loading/loading.component';
export * from './components/modals/add-patient-to-list-modal.component';
export * from './components/ohri-form-launcher/ohri-form-empty-launcher.component';
export * from './components/ohri-home/ohri-home-component';
export * from './components/ohri-home/welcome-section/ohri-welcome-section.component';
export * from './components/patient-banner/patient-banner.component';
export * from './components/patient-chart/ohri-patient-chart-sidenav.meta';
export * from './components/patient-list-tabs/ohri-patient-list-tabs.component';
export * from './components/cohort-patient-list/cohort-patient-list.component';
export * from './components/patient-lists/patient-list.component';
export * from './components/tile/ohri-programme-summary-tiles.component';
export * from './components/tile/ohri-summary-tile-tablet.component';
export * from './components/tile/ohri-summary-tile.component';
export * from './utils/compare';
export * from './utils/createOHRIDashboardLink';
export * from './utils/createNewOHRIDashboardLink';
export * from './utils/createOHRIGroupedLink';
export * from './utils/events';
export * from './utils/get-dosage';
export * from './utils/helpers';
export * from './utils/ohri-forms-commons';
export * from './utils/ohri-sidebar';
export * from './utils/pagination';
export * from './utils/sidenav-links';
export * from './utils/encounter-list-utils';
export * from './workspace/ohri-workspace-utils';
export * from './workspace/patient-list-workspace';
export * from './dashboards/createDashboard';
export * from './types';
export * from './components/encounter-tile/encounter-tile.component';
export * from './components/card-summary/summary-card.component';
export * from './components/expandable-list-widget/expandable-list.component';
export * from './components/extension-conditional-renderer/patient-based-extension-renderer';
export * from './components/patient-table/patient-table.component';
export * from './hooks/useLastEncounter';
export * from './utils/encounter-list-config-builder';
export * from './utils/summary-card-config-builder';
export * from './utils/encounter-tile-config-builder';
export * from './utils/cohort-list-config-builder';
export * from './utils/patient-list-tabs-config-builder';
export * from './components/encounter-list-tabs/encounter-list-tabs.component';
// Workspace registration moved to the index.ts and routes.json

const moduleName = '@ohri/openmrs-esm-ohri-commons-lib';

const options = {
  featureName: 'ohri-forms-workspace-item',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
// t('ohriForms', "OHRI Forms")
export const ohriFormsWorkspace = getSyncLifecycle(FormEngine, options);

// t('mambaReports', "Mamba Reports")
export const reportsDashboardLink = getSyncLifecycle(
  createNewOHRIDashboardLink({ ...reportsDashboardMeta, configKey: 'showReports' }),
  options,
);

export const reportsDashboard = getSyncLifecycle(reportsRoot, options);
