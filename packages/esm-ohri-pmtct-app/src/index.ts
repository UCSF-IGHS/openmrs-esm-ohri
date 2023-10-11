import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, Type } from '@openmrs/esm-framework';
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
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { generateInfantPTrackerId } from './utils/ptracker-forms-helpers';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-pmtct';

require('./root.scss');

const options = {
  featureName: 'ohri-pmtct',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, {
    identifiers: {
      _type: Type.Object,
      _description: 'Identifier sources',
      _default: {
        preferredIdentifierSource: '8549f706-7e85-4c1d-9424-217d50a2988b',
      },
    },
    encounterTypes: {
      _type: Type.Object,
      _description: 'List of PMTCT encounter type UUIDs',
      _default: {
        antenatal: '677d1a80-dbbe-4399-be34-aa7f54f11405',
        laborAndDelivery: '6dc5308d-27c9-4d49-b16f-2c5e3c759757',
        infantPostnatal: 'af1f1b24-d2e8-4282-b308-0bf79b365584',
        motherPostnatal: '269bcc7f-04f8-4ddc-883d-7a3a0d569aad',
      },
    },
  });

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
  registerExpressionHelper(
    "customGenerateInfantPTrackerId",
    generateInfantPTrackerId
  );
}

export const mchDashboard = getSyncLifecycle(createDashboardGroup(mchFolderMeta), options);
export const mchSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...mchSummaryDashboardMeta, moduleName }),
  options,
);
export const mchSummaryDashboard = getAsyncLifecycle(() => import('./views/mch-summary/mch-summary.component'), {
  featureName: 'mch-summary',
  moduleName,
});

export const maternalVisitsDashboardLink = getSyncLifecycle(
  createConditionalDashboardLink({ ...maternalVisitsDashboardMeta, moduleName }),
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
  createConditionalDashboardLink({ ...childVisitsDashboardMeta, moduleName }),
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
