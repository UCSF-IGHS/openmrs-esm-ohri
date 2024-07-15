import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  identifiers: {
    _type: Type.Object,
    _description: 'Identifier sources',
    _default: {
      preferredIdentifierSource: '8549f706-7e85-4c1d-9424-217d50a2988b',
    },
  },
  identifiersTypes: {
    _type: Type.Object,
    _description: 'Identifier types for PMTCT.',
    _default: {
      ptrackerIdentifierType: '4da0a3fe-e546-463f-81fa-084f098ff06c',
      artUniqueNumberType: '9d6d1eec-2cd6-4637-a981-4a46b4b8b41f',
    },
  },
  formNames: {
    _type: Type.Object,
    _description: 'List of forms for PMTCT.',
    _default: {
      antenatalFormName: 'Antenatal Form',
      labourAndDeliveryFormName: 'Labour & Delivery Form',
      motherPostnatalFormName: 'Mother - Postnatal Form',
      infantPostnatalFormName: 'Infant - Postnatal Form',
    },
  },
  formUuids: {
    _type: Type.Object,
    _description: 'List of uuids for PMTCT forms.',
    _default: {
      antenatalFormUuid: '5255a535-2acb-3f44-bd0a-3f80595dece1',
      labourAndDeliveryFormUuid: '1e5614d6-5306-11e6-beb8-9e71128cae77',
      motherPostnatalFormUuid: 'e6b67aa4-6c59-4470-8ad5-b994efeda553',
      infantPostnatalFormUuid: '120048e5-4122-3c6d-8f77-c79e75b7b3fc',
    },
  },
  encounterTypes: {
    _type: Type.Object,
    _description: 'List of PMTCT encounter type UUIDs',
    _default: {
      antenatalEncounterType: '677d1a80-dbbe-4399-be34-aa7f54f11405',
      laborAndDeliveryEncounterType: '6dc5308d-27c9-4d49-b16f-2c5e3c759757',
      infantPostnatalEncounterType: 'af1f1b24-d2e8-4282-b308-0bf79b365584',
      motherPostnatalEncounterType: '269bcc7f-04f8-4ddc-883d-7a3a0d569aad',
      mchEncounterTypeEncounterType: '12de5bc5-352e-4faf-9961-a2125085a75c',
    },
  },
  obsConcepts: {
    _type: Type.Object,
    _description: 'List of observation concept UUIDs related to PMTCT.',
    _default: {
      caseID: '162576AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      mnchEncounterType_UUID: '3eb24129-9f7d-4372-a14e-c2cf577e5db1',
      clientsEnrolledToCare: '51bec6f7-df43-426e-a83e-c1ae5501372f',
      vLResultsConcept: '1305AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      pTrackerIdConcept: '6c45421e-2566-47cb-bbb3-07586fffbfe2',
      infantStatusAtBirthConcept: '159917AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dateOfDeliveryConcept: '5599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      bookedForAncConcept: '1719AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ancHivResultConcept: 'c5f74c86-62cd-4d22-9260-4238f1e45fe0',
      hivStatusAtDeliveryConcept: 'c5f74c86-62cd-4d22-9260-4238f1e45fe0',
      artInitiationConcept: '6e62bf7e-2107-4d09-b485-6e60cbbb2d08',
      birthCountConcept: '1568AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      visitDate: '163260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      hivTestStatus: '164401AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      artLinkage: '6e62bf7e-2107-4d09-b485-6e60cbbb2d08',
      recenctViralLoad: '163310AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      motherStatusConcept: '1856AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ancVisitConcept: '160446AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      infantDeliveryGroupingConcept: '1c70c490-cafa-4c95-9fdd-a30b62bb78b8',
      infantPTrackerIdConcept: '164803AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      infantDateOfBirth: '164802AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      nextVisitDate: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ChildPTrackerId: '6c45421e-2566-47cb-bbb3-07586fffbfe2',
      childDateOfBirth: '163260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      artProphylaxisStatus: '1148AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      linkedToArt: 'a40d8bc4-56b8-4f28-a1dd-412da5cf20ed',
      breastfeedingStatus: '1151AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      outcomeStatus: '160433AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      infantVisitDate: '159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      finalTestResults: '164460AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      visitDateConcept: '163260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      hivTestResultConcept: '159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      artNoConcept: '164402AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      followUpDateConcept: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      eDDConcept: '5596AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      nextVisitDateConcept: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      artStartDate: '159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ancVisitsConcept: '1425AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      testTypeConcept: 'ee8c0292-47f8-4c01-8b60-8ba13a560e1a',
      infantExposureStatus: '6027869c-5d7e-4a82-b22f-6d9c57d61a4d',
      MothervisitDate: '163260AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      MotherHivStatus: '159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      MotherViralLoadDate: '163281AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      MotherViralLoadResult: '1305AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      MotherNextVisitDate: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      artUniqueNoConcept: '164402AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ancVisitsReport: '5299521a-7fad-47bb-8280-14c99d04c790',
      eddReport: 'aac635c9-0a77-4489-8b0d-866b3ad22f73',
      motherHivStatusReport: 'ed50a889-dd5b-4759-861c-b54e3c686fe7',
    },
  },
};

export interface ConfigObject {
  identifiers: Object;
  identifiersTypes: Object;
  encounterTypes: Object;
  obsConcepts: Object;
  formNames: Object;
  formUuids: Object;
}
