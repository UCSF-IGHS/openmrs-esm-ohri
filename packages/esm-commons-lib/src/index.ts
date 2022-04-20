import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
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
    pages: [],
    extensions: [
      {
        id: 'patient-list-modal',
        slot: 'patient-actions-slot',
        load: getAsyncLifecycle(() => import('./components/modals/patient-list/add-patient-to-list-modal.component'), {
          featureName: 'patient-list-modal',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
