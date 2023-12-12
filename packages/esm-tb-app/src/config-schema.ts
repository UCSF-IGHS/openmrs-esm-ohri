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
      regimen: '16fd7307-0b26-4c8b-afa3-8362baff4042',
      hivStatus: '159576AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      outcome: '159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      dateContacted: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // date of event
      modeOfContact: '166456AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // contact method
      visitDate: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      followUpCaseId: '162576AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      monthOfTreatment: '1418AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      adherenceAssessment: '164075AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      nextAppointmentDate: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      DateEnrolledToTB: '161552AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      TreatmentId: '164415AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      TreatmentStartDate: '164416AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      Drregimen: '16fd7307-0b26-4c8b-afa3-8362baff4042',
      DateOfTreatmentOutcome: '159787AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    },
  },
  cohorts: {
    _type: Type.Object,
    _description: 'TB Cohort uuid.',
    _default: {
      clientsEnrolledForTb: '98fd11ba-cb4d-46f7-9b82-40d49949c7ef',
    },
  },
};

export interface ConfigObject {
  identifiers: Object;
  encounterTypes: Object;
  obsConcepts: Object;
}
