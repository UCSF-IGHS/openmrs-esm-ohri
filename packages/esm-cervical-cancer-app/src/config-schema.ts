import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  encounterTypes: {
    _type: Type.Object,
    _description: 'Encounter type UUIDs for Cacx.',
    _default: {
      cacxRegistrationEncounterType_UUID: '3eb24129-9f7d-4372-a14e-c2cf577e5db1',
      cacxTreatmentEncounterType_UUID: '60c80941-c3dc-45c6-9b78-c150e0470cbd',
    },
  },
  obsConcepts: {
    _type: Type.Object,
    _description: 'List of observation concept UUIDs related to Cacx.',
    _default: {
      cervicalCancerScreeningDateConcept: '2f256b46-395b-40f8-b93e-3ea68e5531bc',
      previouslyScreenedConcept: '7cf4c96a-3e68-4ca5-9b49-9148adc6263d',
      eligibleForScreeningConcept: 'b77ef6d3-4895-4e88-8b17-fa4aff6eba59',
      cacxEncounterDateConcept: '163137AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      screeningMethodConcept: '53ff5cd0-0f37-4190-87b1-9eb439a15e94',
      cacxTreatmentConcept: '3a8bb4b4-7496-415d-a327-57ae3711d4eb',
      colopsyResultsConcept: '9096a18e-c009-4f4c-b0ba-0605e0f16578',
      humanPapilomaVirusResultsConcept: '159859AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      papanicolaouSmearResultsConcept: '28bab50e-7ff7-4216-81be-3f7ad05c6547',
      VIAProcedureResultsConcept: 'cc647244-0826-4d8e-8c5a-d7a371267bf4',
    },
  },
  formNames: {
    _type: Type.Object,
    _description: 'List of forms related to Cacx.',
    _default: {
      screeningAndCancerTreatmentForm: 'Screening and Cancer Treatment Form',
      cervicalCancerRegistrationForm: 'Cervical Cancer Registration Form',
    },
  },
  formUuids: {
    _type: Type.Object,
    _description: 'List of uuids of forms related to Cacx.',
    _default: {
      screeningAndCancerTreatmentFormUuid: '9e3ec2a7-ad26-3f43-9677-82e318996eec',
      cervicalCancerRegistrationFormUuid: '12f41bfe-6430-3d8c-9edf-2d1b7c904f0f',
    },
  },
};

export interface ConfigObject {
  identifiers: Object;
  encounterTypes: Object;
  obsConcepts: Object;
  formNames: Object;
  formUuids: Object;
}
