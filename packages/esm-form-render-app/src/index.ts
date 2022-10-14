import { defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = 'openmrs-esm-ohri-form-render-app';

  const options = {
    featureName: 'ohri-form-render',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^form-render-test/,
      },
    ],
    extensions: [
      {
        name: 'form-render-link',
        slot: 'app-menu-slot',
        load: getAsyncLifecycle(() => import('./form-render-app-menu-link.component'), options),
        online: true,
        offline: true,
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
