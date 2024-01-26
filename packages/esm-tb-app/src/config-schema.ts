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
    _description: 'Encounter type UUIDs for TB.',
    _default: {
      tbContactListing: '70d2b2f6-860b-438c-994b-c28e863dca34',
      tbPatientTracing: '98c938e9-fb3e-4982-ae22-0305cbd12f8c',
      tbProgramEnrollment: '9a199b59-b185-485b-b9b3-a9754e65ae57',
      tbTreatmentAndFollowUp: '1881304a-4854-4927-b0b1-a6231d61e43c',
      tptCaseEnrollment: 'dc6ce80c-83f8-4ace-a638-21df78542551',
      tptTreatmentAndFollowUp: '1ac3de3f-8fc2-43a7-addb-e805c393ecae',
    },
  },
  obsConcepts: {
    _type: Type.Object,
    _description: 'List of observation concept UUIDs related to TB.',
    _default: {
      caseID: '162576AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      enrollmentDate: '161552AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      type: '159990AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      site: '160040AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      drugSensitivity: '164368AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dSregimen: '16fd7307-0b26-4c8b-afa3-8362baff4042',
      dRregimen: '159909AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      hivStatus: '159576AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      outcome: '159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dateContacted: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // date of event
      modeOfContact: '166456AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // contact method
      visitDate: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      followUpCaseId: '162576AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      monthOfTreatment: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      adherenceAssessment: '164075AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      nextAppointmentDate: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      ADR: '160646AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dRTreatmentId: '164415AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dSTreatmentId: '161654AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dRTreatmentStartDate: '164416AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dSTreatmentStartDate: '1113AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      DateOfTreatmentOutcome: '159787AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      tBEnrollmentType: '163775AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dsTBEnrollment: '160541AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dRTBEnrollment: '160052AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      tptTreatmentId: '162727AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      tptEnrollmentDate: '164852AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      tptIndication: '162276AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      tptRegimen: '1264AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      tptAppointmentDate: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      tptAdherence: '164075AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
  },
  cohorts: {
    _type: Type.Object,
    _description: 'TB Cohort uuid.',
    _default: {
      clientsEnrolledForTb: '98fd11ba-cb4d-46f7-9b82-40d49949c7ef',
      clientsEnrolledForTpt: '5f28254f-0a80-4d15-ad91-68c6cf5ea715',
    },
  },
};

export interface ConfigObject {
  identifiers: Object;
  encounterTypes: Object;
  obsConcepts: Object;
}
