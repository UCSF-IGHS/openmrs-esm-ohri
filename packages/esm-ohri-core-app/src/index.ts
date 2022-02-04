import { defineConfigSchema, getAsyncLifecycle, getSyncLifecycle, provide } from '@openmrs/esm-framework';
import { backendDependencies } from './openmrs-backend-dependencies';

import patientDashboardsConfig from './ohri-patient-dashboards-config.json';

const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

function setupOpenMRS () {
  const moduleName = 'ohri-core-app';

  const options = {
    featureName: 'ohri-core',
    moduleName,
  };

  defineConfigSchema(moduleName, {});

  // Load configurations
  provide(patientDashboardsConfig);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^ohri-covid-home/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^ohri-hiv-home/,
      },
      {
        load: getAsyncLifecycle(() => import('./root'), options),
        route: /^ohri-ct-home/,
      },
    ],
    extensions: [
      {
        id: 'hiv-hts-programme-switcher',
        slot: 'top-nav-info-slot',
        load: getAsyncLifecycle(
          () => import('./components/programme-switcher/ohri-programme-switcher.component'),
          options,
        ),
        online: true,
        offline: true,
      },
      {
        id: 'patient-list-ext',
        slot: 'homepage-dashboard-slot',
        load: getAsyncLifecycle(() => import('./ui/patient-list/patient-list.component'), {
          featureName: 'patient-list',
          moduleName,
        }),
        meta: {
          columnSpan: 4,
        },
      },
      // HIV HTS Home components
      {
        id: 'hts-home-header-ext',
        slot: 'hts-home-header-slot',
        load: getAsyncLifecycle(() => import('./ui/hiv/home/welcome-section/hts-welcome-section.component'), {
          featureName: 'hts-home-header',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tile-ext',
        slot: 'hts-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./ui/hiv/home/summary-tiles/hts-summary-tiles.component'), {
          featureName: 'hts-home-tiles',
          moduleName,
        }),
      },
      {
        id: 'hts-home-tabs-ext',
        slot: 'hts-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./ui/hiv/home/patient-tabs/ohri-patient-tabs.component'), {
          featureName: 'hts-home-tabs',
          moduleName,
        }),
      },

      // Covid Home components
      {
        id: 'covid-home-header-ext',
        slot: 'covid-home-header-slot',
        load: getAsyncLifecycle(() => import('./ui/covid/home/welcome-section/ohri-welcome-section.component'), {
          featureName: 'covid-home-header',
          moduleName,
        }),
      },
      {
        id: 'covid-home-tile-ext',
        slot: 'covid-home-tiles-slot',
        load: getAsyncLifecycle(() => import('./ui/covid/home/summary-tiles/covid-summary-tiles.component'), {
          featureName: 'covid-home-tiles',
          moduleName,
        }),
      },
      {
        id: 'covid-home-tabs-ext',
        slot: 'covid-home-tabs-slot',
        load: getAsyncLifecycle(() => import('./ui/covid/home/patient-list-tabs/covid-patient-list-tabs.component'), {
          featureName: 'covid-home-tabs',
          moduleName,
        }),
      },
    ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
