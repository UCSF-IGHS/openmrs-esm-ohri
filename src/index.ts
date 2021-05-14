import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-ohri-app';

  const options = {
    featureName: 'ohri',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./hts/summary-page/hts-summary-page'), options),
        route: /^ohri\/.+\/hts/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^ohri-forms/,
      },
    ],
    extensions: [
      {
        id: 'hts-summary-page-menu-item-ext',
        slot: 'patient-chart-nav-menu',
        load: getAsyncLifecycle(() => import('./menu-items/hts-summary-page-link'), {
          featureName: 'hts-summary-page-menu-item',
          moduleName,
        }),
      },
      {
        id: 'hts-patient-encounters-list-ext',
        slot: 'conditions-overview-widget',
        load: getAsyncLifecycle(() => import('./hts/encounters-list/hts-overview-list.component'), {
          featureName: 'hts-patient-encounters-list',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
