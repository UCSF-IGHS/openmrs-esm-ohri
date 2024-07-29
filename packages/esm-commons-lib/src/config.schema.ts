import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  obsConcepts: {
    _type: Type.Object,
    _description: 'List of observation concept UUIDs.',
    _default: {
      hivTestResultConceptUUID: '159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      positiveUUID: '138571AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      negativeUUID: '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
  },
  encounterTypes: {
    _type: Type.Object,
    _description: 'List of encounter type UUIDs',
    _default: {
      antenatalEncounterType: '677d1a80-dbbe-4399-be34-aa7f54f11405',
    },
  },
};

export interface ConfigObject {
  encounterTypes: Object;
  obsConcepts: object;
}
