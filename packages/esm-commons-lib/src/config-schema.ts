import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  showReports: {
    _type: Type.Boolean,
    _description: 'Show mamba reports',
    _default: false,
  },
  reports: {
    _type: Type.Array,
    _description: 'Reports and their associated UUIDs.',
    _default: [
      { name: 'Covid-19 Report', uuid: 'ecabd559-14f6-4c65-87af-1254dfdf1304' },
      { name: 'HTS Report', uuid: '3ffa5a53-fc65-4a1e-a434-46dbcf1c2de2' },
      { name: 'ADX-HIV Report', uuid: '12f236b1-b0b5-4ecc-9037-681c23fb45bd' },
      { name: 'Mamba HTS Line List', uuid: '6a6ae4ce-8427-45a6-9835-bbd6ade7a670' },
      {
        name: 'Mother HIV Status Report',
        uuid: 'mother_hiv_status',
        ptrackerId: '12345A232567',
        personUuid: 'bd49d697-b1de-49b9-95c2-6031fb1375fd',
      },
    ],
  },
};

export interface ConfigObject {
  showReports: boolean;
}
