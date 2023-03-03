import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';
import {
  mchSummary_dashboardMeta,
  mchFolderMeta,
  maternalVisits_dashboardMeta,
  childVisits_dashboardMeta,
  motherChildDashboardMeta,
} from './dashboard.meta';
import { createDashboardGroup, createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { addToBaseFormsRegistry, registerPostSubmissionAction } from '@ohri/openmrs-ohri-form-engine-lib';
import mchForms from './form-entry/forms/forms-registry';
import {
  createConditionalDashboardLink,
  createDashboardLinkWithCustomTitle,
  createOHRIDashboardLink,
  OHRIHome,
  OHRIWelcomeSection,
} from '@ohri/openmrs-esm-ohri-commons-lib';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

require('./root.scss');

export const moduleName = '@ohri/openmrs-esm-ohri-pmtct';

function setupOpenMRS() {
  const options = {
    featureName: 'ohri-pmtct',
    moduleName,
  };
  defineConfigSchema(moduleName, {});
  addToBaseFormsRegistry(mchForms);
  registerPostSubmissionAction({
    id: 'MotherToChildLinkageSubmissionAction',
    load: () => import('./form-entry/post-submission-actions/mother-child-linkage-action'),
  });
  registerPostSubmissionAction({
    id: 'PTrackerSubmissionAction',
    load: () => import('./form-entry/post-submission-actions/current-ptracker-action'),
  });
  registerPostSubmissionAction({
    id: 'ArtSubmissionAction',
    load: () => import('./form-entry/post-submission-actions/art-linkage-action'),
  });

  return {
    pages: [],
    extensions: [
      {
        id: 'mch',
        slot: 'patient-chart-dashboard-slot',
        load: getSyncLifecycle(createDashboardGroup(mchFolderMeta), options),
        meta: mchFolderMeta,
        online: true,
        offline: true,
      },
      {
        id: 'mch-summary-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(
          createDashboardLinkWithCustomTitle({
            linkText: 'MNCH Summary',
            title: 'Client Summary',
          }),
          options,
        ),
        meta: mchSummary_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'mch-summary-ext',
        slot: 'mch-summary-slot',
        load: getAsyncLifecycle(() => import('./views/mch-summary/mch-summary.component'), {
          featureName: 'mch-summary',
          moduleName,
        }),
      },
      {
        id: 'maternal-Health-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createConditionalDashboardLink(maternalVisits_dashboardMeta), options),
        meta: maternalVisits_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'maternal-visits-summary-ext',
        slot: 'maternal-visits-summary-slot',
        load: getAsyncLifecycle(() => import('./views/maternal-health/maternal-health.component'), {
          featureName: 'maternal-visits',
          moduleName,
        }),
      },
      {
        id: 'child-visits-dashboard',
        slot: 'mch-slot',
        load: getSyncLifecycle(createConditionalDashboardLink(childVisits_dashboardMeta), options),
        meta: childVisits_dashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'child-visits-summary-ext',
        slot: 'child-visits-summary-slot',
        load: getAsyncLifecycle(() => import('./views/child-health/child-health.component'), {
          featureName: 'child-visits',
          moduleName,
        }),
      },
      {
        id: 'mother-child-health-results-dashboard',
        slot: 'mother-child-health-dashboard-slot',
        load: getSyncLifecycle(OHRIHome, {
          featureName: 'mother child health results dashboard',
          moduleName,
        }),
        meta: motherChildDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'pmtct-home-header-slot',
        slot: 'pmtct-home-header-slot',
        title: 'Maternal Child Health',
        load: getSyncLifecycle(OHRIWelcomeSection, {
          featureName: 'pmtct-home-header',
          moduleName,
        }),
      },
      {
        id: 'pmtct-home-tabs-ext',
        slot: 'pmtct-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./views/summary-tabs/mother-child-summary-tabs.component'), {
          featureName: 'pmtct-home-tabs',
          moduleName,
        }),
      },
      {
        id: 'maternal-child-health-results-summary',
        slot: 'dashboard-slot',
        load: getSyncLifecycle(createOHRIDashboardLink(motherChildDashboardMeta), options),
        meta: motherChildDashboardMeta,
        online: true,
        offline: true,
      },
      {
        id: 'pmtct-home-tile-ext',
        slot: 'pmtct-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./views/summary-tabs/maternal-child-summary-tiles.component'), {
          featureName: 'pmtct-home-tiles',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
