import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  patientUuid: {
    _description:
      'The patient to use to render the form.',
    _type: Type.UUID,
    _default: 'b280078a-c0ce-443b-9997-3c66c63ec2f8'
  },
  
};

export interface ConfigObject {
  patientUuid: string;
}
