import { backendDependencies } from './openmrs-backend-dependencies';
import { attach } from '@openmrs/esm-extensions';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  attach('patient-chart-dashboard-medications', 'drugorder-widget');

  return {
    lifecycle: () => import('./openmrs-esm-drugorder'),
    activate: /^patient\/.+\/drugorder/,
    extensions: [
      {
        name: 'drugorder-widget',
        type: 'widget',
        load: () => import('./openmrs-esm-drugorder-extension'),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
