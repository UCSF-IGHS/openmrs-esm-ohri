import { defineConfigSchema, getAsyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const moduleName = '@ohri/openmrs-esm-ohri-form-render-app';

const options = {
  featureName: 'ohri-form-render',
  moduleName,
};

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const FormRenderTest = getAsyncLifecycle(() => import('./root'), options);

export const FormRenderLink = getAsyncLifecycle(() => import('./form-render-app-menu-link.component'), options);
