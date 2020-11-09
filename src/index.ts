import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  return {
    pages: [
      {
        load: () => import('./spa-order-basket-app'),
        route: /^patient\/.+\/drugorder\/basket/,
      },
    ],
    extensions: [
      {
        id: 'drugorder-widget',
        slot: 'patient-chart-dashboard-medications',
        load: () => import('./spa-medication-summary-extension'),
      },
      {
        id: 'order-basket-workspace',
        slot: '/patient/:patientUuid/drugorder/basket',
        load: () => import('./spa-order-basket-extension'),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
