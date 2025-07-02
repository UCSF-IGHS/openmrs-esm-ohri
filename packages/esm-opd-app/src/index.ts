import { defineConfigSchema } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export const moduleName = '@ohri/openmrs-esm-ohri-opd-app';

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}
