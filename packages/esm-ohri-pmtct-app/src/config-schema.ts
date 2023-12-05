import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  identifiers: {
    _type: Type.Object,
    _description: 'Identifier sources',
    _default: {
      preferredIdentifierSource: '8549f706-7e85-4c1d-9424-217d50a2988b',
    },
  },
  encounterTypes: {
    _type: Type.Object,
    _description: 'List of PMTCT encounter type UUIDs',
    _default: {
      antenatal: '677d1a80-dbbe-4399-be34-aa7f54f11405',
      laborAndDelivery: '6dc5308d-27c9-4d49-b16f-2c5e3c759757',
      infantPostnatal: 'af1f1b24-d2e8-4282-b308-0bf79b365584',
      motherPostnatal: '269bcc7f-04f8-4ddc-883d-7a3a0d569aad',
    },
  },
};

export interface ConfigObject {
  identifiers: Object;
  encounterTypes: Object;
}
