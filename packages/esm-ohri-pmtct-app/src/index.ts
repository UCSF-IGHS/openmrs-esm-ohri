import { defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import MaternalSummary from './views/mch-summary/mch-summary.component';
import MaternalHealthList from './views/maternal-health/maternal-health.component';
import ChildHealthList from './views/child-health/child-health.component';
import MaternalChildSummaryTiles from './views/summary-tabs/maternal-child-summary-tiles.component';
import LabResultsSummary from './views/summary-tabs/mother-child-summary-tabs.component';
import {
  mchSummaryDashboardMeta,
  maternalVisitsDashboardMeta,
  childVisitsDashboardMeta,
  motherChildDashboardMeta,
  mchFolderMeta,
} from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { registerPostSubmissionAction, registerExpressionHelper } from '@openmrs/openmrs-form-engine-lib';
import {
  createConditionalDashboardLink,
  createOHRIDashboardLink,
  OHRIHome,
  OHRIWelcomeSection,
  createConditionalDashboardGroup,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { generateInfantPTrackerId } from './utils/pmtct-helpers';
import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-pmtct';

require('./root.scss');

const options = {
  featureName: 'ohri-pmtct',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);

  registerPostSubmissionAction({
    name: 'MotherToChildLinkageSubmissionAction',
    load: () => import('./post-submission-actions/mother-child-linkage-action'),
  });
  registerPostSubmissionAction({
    name: 'PTrackerSubmissionAction',
    load: () => import('./post-submission-actions/current-ptracker-action'),
  });
  registerPostSubmissionAction({
    name: 'ArtSubmissionAction',
    load: () => import('./post-submission-actions/art-linkage-action'),
  });
  registerExpressionHelper('customGenerateInfantPTrackerId', generateInfantPTrackerId);
}

export const mchDashboard = getSyncLifecycle(createConditionalDashboardGroup(mchFolderMeta), options);
export const mchSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...mchSummaryDashboardMeta, moduleName }),
  options,
);

export const mchSummaryDashboard = getSyncLifecycle(MaternalSummary, {
  featureName: 'mch-summary',
  moduleName,
});

export const maternalVisitsDashboardLink = getSyncLifecycle(
  createConditionalDashboardLink({ ...maternalVisitsDashboardMeta, moduleName }),
  options,
);

export const maternalVisitsDashboard = getSyncLifecycle(MaternalHealthList, {
  featureName: 'maternal-visits',
  moduleName,
});

export const childVisitsDashboardLink = getSyncLifecycle(
  createConditionalDashboardLink({ ...childVisitsDashboardMeta, moduleName }),
  options,
);

export const childVisitsDashboard = getSyncLifecycle(ChildHealthList, {
  featureName: 'maternal-visits',
  moduleName,
});
export const maternalChildDashboardLink = getSyncLifecycle(createOHRIDashboardLink(motherChildDashboardMeta), options);
export const maternalChildDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'mother child health results dashboard',
  moduleName,
});
export const pmtctDashboardHeader = getSyncLifecycle(OHRIWelcomeSection, {
  featureName: 'pmtct-home-header',
  moduleName,
});

export const pmtctDashboardTiles = getSyncLifecycle(MaternalChildSummaryTiles, {
  featureName: 'pmtct-home-tiles',
  moduleName,
});

export const pmtctDashboardTabs = getSyncLifecycle(LabResultsSummary, {
  featureName: 'pmtct-home-tabs',
  moduleName,
});
