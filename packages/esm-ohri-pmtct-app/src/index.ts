import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import {
  mchSummaryDashboardMeta,
  maternalVisitsDashboardMeta,
  childVisitsDashboardMeta,
  motherChildDashboardMeta,
  mchFolderMeta,
} from './dashboard.meta';
import { createDashboardGroup } from '@openmrs/esm-patient-common-lib';
import { registerPostSubmissionAction } from '@openmrs/openmrs-form-engine-lib';
import {
  createConditionalDashboardLink,
  createDashboardLinkWithCustomTitle,
  createOHRIDashboardLink,
  OHRIHome,
  OHRIWelcomeSection,
} from '@ohri/openmrs-esm-ohri-commons-lib';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-pmtct';

require('./root.scss');

const options = {
  featureName: 'ohri-pmtct',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {});
  registerPostSubmissionAction({
    id: 'MotherToChildLinkageSubmissionAction',
    load: () => import('./post-submission-actions/mother-child-linkage-action'),
  });
  registerPostSubmissionAction({
    id: 'PTrackerSubmissionAction',
    load: () => import('./post-submission-actions/current-ptracker-action'),
  });
  registerPostSubmissionAction({
    id: 'ArtSubmissionAction',
    load: () => import('./post-submission-actions/art-linkage-action'),
  });
}

export const mchDashboard = getSyncLifecycle(createDashboardGroup(mchFolderMeta), options);
export const mchSummaryDashboardLink = getSyncLifecycle(
  createDashboardLinkWithCustomTitle(mchSummaryDashboardMeta),
  options,
);
export const mchSummaryDashboard = getAsyncLifecycle(() => import('./views/mch-summary/mch-summary.component'), {
  featureName: 'mch-summary',
  moduleName,
});

export const maternalVisitsDashboardLink = getSyncLifecycle(
  createConditionalDashboardLink(maternalVisitsDashboardMeta),
  options,
);
export const maternalVisitsDashboard = getAsyncLifecycle(
  () => import('./views/maternal-health/maternal-health.component'),
  {
    featureName: 'maternal-visits',
    moduleName,
  },
);

export const childVisitsDashboardLink = getSyncLifecycle(
  createConditionalDashboardLink(childVisitsDashboardMeta),
  options,
);
export const childVisitsDashboard = getAsyncLifecycle(() => import('./views/child-health/child-health.component'), {
  featureName: 'child-visits',
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
export const pmtctDashboardTiles = getAsyncLifecycle(
  () => import('./views/summary-tabs/maternal-child-summary-tiles.component'),
  {
    featureName: 'pmtct-home-tiles',
    moduleName,
  },
);
export const pmtctDashboardTabs = getAsyncLifecycle(
  () => import('./views/summary-tabs/mother-child-summary-tabs.component'),
  {
    featureName: 'pmtct-home-tabs',
    moduleName,
  },
);
