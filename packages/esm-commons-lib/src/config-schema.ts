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
      {
        name: 'Mother HIV Status Report',
        uuid: 'mother_hiv_status',
        parameters: [
          {
            name: 'ptrackerId',
            type: 'text',
            label: 'PTracker ID',
            defaultValue: '',
          },
          {
            name: 'personUuid',
            type: 'text',
            label: 'Person UUID',
            defaultValue: '',
          },
        ],
      },
      {
        name: 'Mamba HTS Report',
        uuid: 'hts_linelist',
        parameters: [
          {
            name: 'startDate',
            type: 'date',
            label: 'Start Date',
            defaultValue: '',
          },
          {
            name: 'EndDate',
            type: 'date',
            label: 'End Date',
            defaultValue: '',
          },
        ],
      },
      {
        name: 'Insurance Billing report',
        uuid: 'insurance_bill',
        parameters: [
          {
            name: 'startDate',
            type: 'date',
            label: 'Start Date',
            defaultValue: '',
          },
          {
            name: 'EndDate',
            type: 'date',
            label: 'End Date',
            defaultValue: '',
          },
          {
            name: 'insurance',
            type: 'dropdown',
            label: 'Insurance',
            defaultValue: '',
            dropdownOptions: [
              { value: '3', label: 'Mutuelle' },
              { value: '4', label: 'ARAMA' },
            ],
          },
        ],
      },
    ],
  },
};

export interface ConfigObject {
  showReports: boolean;
  reports: Array<{
    name: string;
    uuid: string;
    parameters: Array<{
      name: string;
      type: string;
      label: string;
      defaultValue: string;
      dropdownOptions?: Array<{ value: string; label: string }>;
    }>;
  }>;
}