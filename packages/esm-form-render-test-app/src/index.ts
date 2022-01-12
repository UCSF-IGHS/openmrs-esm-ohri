import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS () {
  const moduleName = 'esm-forms-render-test-app';

  const options = {
    featureName: 'forms-render-test-app',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /form-render-test/,
      },
    ],
    extensions: [],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
