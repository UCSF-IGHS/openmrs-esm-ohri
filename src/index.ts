import './set-public-path';
import { backendDependencies } from './openmrs-backend-dependencies';
import { attach } from '@openmrs/esm-extension-manager';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  attach('patient-chart-dashboard-medications', 'drugorder-widget');

  return {
    lifecycle: () => {},
    activate: () => false,
    extensions: [
      {
        name: 'drugorder-widget',
        type: 'widget',
        load: () => import('./openmrs-esm-drugorder'),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
