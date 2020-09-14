import './set-public-path';
import { backendDependencies } from './openmrs-backend-dependencies';
import { attach } from '@openmrs/esm-extension-manager';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const extensions = [
  {
    name: 'drugorderWidget',
    type: 'patientChartWidget',
    load: () => import('./openmrs-esm-drugorder'),
  },
];

function setupOpenMRS() {
  attach('patientChartWidgets', 'drugorderWidget');

  if (process.env.NODE_ENV !== 'production') {
    return {
      lifecycle: () => import('./dev-extension-slot'),
      activate: 'drugorder',
      extensions,
    };
  }

  return {
    lifecycle: () => {},
    activate: () => false,
    extensions,
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
