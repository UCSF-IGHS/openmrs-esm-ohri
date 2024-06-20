import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle } from '@openmrs/esm-framework';
import MaternalHealthList from './pmtct/maternal-health/maternal-health.component';
import ChildHealthList from './pmtct/child-health/child-health.component';
import {
  mchSummaryDashboardMeta,
  maternalVisitsDashboardMeta,
  childVisitsDashboardMeta,
  motherChildDashboardMeta,
  mchFolderMeta,
} from './dashboard.meta';
import { registerPostSubmissionAction, registerExpressionHelper } from '@openmrs/openmrs-form-engine-lib';
import {
  createConditionalDashboardLink,
  createNewOHRIDashboardLink,
  OHRIHome,
  createConditionalDashboardGroup,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { configSchema } from './config-schema';
import rootComponent from './root.component';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-pmtct-app';

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

  import('./utils/pmtct-helpers').then(({ generateInfantPTrackerId }) => {
    registerExpressionHelper('customGenerateInfantPTrackerId', generateInfantPTrackerId);
  });
}

export const root = getSyncLifecycle(rootComponent, options);

export const maternalChildDashboardLink = getSyncLifecycle(
  createNewOHRIDashboardLink(motherChildDashboardMeta),
  options,
);

export const mchDashboard = getSyncLifecycle(createConditionalDashboardGroup(mchFolderMeta), options);
export const mchSummaryDashboardLink = getSyncLifecycle(
  createDashboardLink({ ...mchSummaryDashboardMeta, moduleName }),
  options,
);

export const mchSummaryDashboard = getAsyncLifecycle(() => import('./pmtct/mch-summary/mch-summary.component'), {
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
export const maternalChildDashboard = getSyncLifecycle(OHRIHome, {
  featureName: 'mother child health results dashboard',
  moduleName,
});
