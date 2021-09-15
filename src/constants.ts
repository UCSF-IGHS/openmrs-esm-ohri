export const careSetting = '6f0c9a92-6f24-11e3-af88-005056821db0';

export const daysDurationUnit = {
  uuid: '1072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  display: 'Days',
};

export const basePath = '${openmrsSpaBase}/patient/';
export const encounterRepresentation =
  'custom:(uuid,encounterDatetime,location:(uuid,name),' +
  'encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';

// Final HIV Test Result Concepts
export const finalHIVCodeConcept = 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab';
export const finalPositiveHIVValueConcept = '6378487b-584d-4422-a6a6-56c8830873ff';

// Linked to Care Concepts
export const linkedToCareCodeConcept = 'e8e8fe71-adbb-48e7-b531-589985094d30';
export const linkedToCareYesValueConcept = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Cohorts
export const preTestCounsellingCohort = 'e4d801f0-e2fd-11eb-8212-7d7156e00a1f';
export const waitingForHIVTestCohort = 'cdee0abe-e471-11eb-8212-7d7156e00a1f';
export const postTestCounsellingCohort = '01af2130-e472-11eb-8212-7d7156e00a1f';
export const clientsEnrolledToCare = '9505cba5-63db-42ba-833b-5d9eb98a6cbc'; //'1d5d64ee-3e94-45b9-904e-f9b585188119';
export const todayzAppointmentsCT = '605344bc-8a54-4df0-95d5-acadf844567e'; // '6751bf2e-492a-4000-9f37-7cf63af326e9';

// Service Enrollment Concepts
export const careAndTreatmentEncounterType = '7e54cd64-f9c3-11eb-8e6a-57478ce139b0';
export const dateOfServiceEnrollmentConcept = '160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const patientTypeEnrollmentConcept = '83e40f2c-c316-43e6-a12e-20a338100281';
export const studyPopulationTypeConcept = '166432AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const dateOfHIVDiagnosisConcept = '160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Clinical visit
export const clinicalVisitEncounterType = 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4';
