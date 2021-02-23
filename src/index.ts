import { registerBreadcrumbs, defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS() {
  const moduleName = '@openmrs/esm-drugorder-app';

  const options = {
    featureName: 'drugorder',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  registerBreadcrumbs([
    {
      path: `${window.spaBase}/patient/:patient/chart/orders`,
      title: 'Orders',
      parent: `${window.spaBase}/patient/:patient/chart`,
    },
    {
      path: `${window.spaBase}/patient/:patient/drugorder/basket`,
      title: 'Order Basket',
      parent: `${window.spaBase}/patient/home`,
    },
  ]);

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
