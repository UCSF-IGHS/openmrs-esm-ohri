import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  showReports: {
    _type: Type.Boolean,
    _description: 'Show mamba reports',
    _default: false,
  },
};

export interface ConfigObject {
  showReports: boolean;
}
