import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import {
  createOHRIPatientChartSideNavLink,
  patientChartDivider_dashboardMeta,
  PatientList,
  PatientTable,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import ProgramsHome from './ohri-dashboard/programs-home.component';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@ohri/openmrs-esm-ohri-core-app';

const options = {
  featureName: 'ohri-core',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {});
}

export const ohriNavItems = getAsyncLifecycle(
  () => import('./ohri-dashboard/side-menu/ohri-dashboard-side-nav.component'),
  {
    featureName: 'nav-items',
    moduleName,
  },
);

export const ohriClinicalViewsDivider = getSyncLifecycle(
  createOHRIPatientChartSideNavLink(patientChartDivider_dashboardMeta),
  options,
);

export const patientTable = getSyncLifecycle(PatientTable, options);

export const patientList = getSyncLifecycle(PatientList, {
  featureName: 'home',
  moduleName,
});

export const programsText = getSyncLifecycle(ProgramsHome ,options);
