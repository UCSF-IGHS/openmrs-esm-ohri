import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  patientUuid: {
    _description: 'The patient to use to render the form.',
    _type: Type.UUID,
    _default: 'b280078a-c0ce-443b-9997-3c66c63ec2f8',
  },

  dataTypeToRenderingMap: {
    _description: 'A map used to match concept datatypes to rendering types',
    _type: Type.Object,
    _default: {
      Numeric: ['number', 'fixed-value'],
      Coded: ['select', 'checkbox', 'radio', 'toggle', 'content-switcher', 'fixed-value'],
      Text: ['text', 'textarea', 'fixed-value'],
      Date: ['date', 'fixed-value'],
      Datetime: ['datetime', 'fixed-value'],
      Boolean: ['toggle', 'select', 'radio', 'content-switcher', 'fixed-value'],
      Rule: ['repeating', 'group'],
    },
  },
};

export interface ConfigObject {
  patientUuid: string;
}
