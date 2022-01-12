import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

import patientDashboardsConfig from './ohri-patient-dashboards-config.json';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS () {
  const moduleName = 'esm-forms-render-app';

  const options = {
    featureName: 'forms-render-app',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  // Load configurations
  provide(patientDashboardsConfig);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^forms/,
      },
    ],
    extensions: [],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
