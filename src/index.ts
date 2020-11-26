import { getAsyncLifecycle } from '@openmrs/esm-react-utils';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const options = {
  featureName: 'drugorder',
  moduleName: '@openmrs/esm-drugorder-app',
};

function setupOpenMRS() {
  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root-order-basket'), options),
        route: /^patient\/.+\/drugorder\/basket/,
      },
    ],
    extensions: [
      {
        id: 'drugorder-widget',
        slot: 'patient-chart-dashboard-medications',
        load: getAsyncLifecycle(() => import('./root-medication-summary'), options),
      },
      {
        id: 'order-basket-workspace',
        slot: '/patient/:patientUuid/drugorder/basket',
        load: getAsyncLifecycle(() => import('./root-order-basket'), options),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
