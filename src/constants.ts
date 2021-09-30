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
export const computedHIV_StatusConcept = 'a5261998-c635-4e27-870c-e837faf6cf9a';

// Linked to Care Concepts
export const linkedToCareCodeConcept = 'e8e8fe71-adbb-48e7-b531-589985094d30';
export const linkedToCareYesValueConcept = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Cohorts
export const preTestCounsellingCohort = 'e4d801f0-e2fd-11eb-8212-7d7156e00a1f';
export const waitingForHIVTestCohort = 'cdee0abe-e471-11eb-8212-7d7156e00a1f';
export const postTestCounsellingCohort = '01af2130-e472-11eb-8212-7d7156e00a1f';
export const clientsEnrolledToCare = '1d5d64ee-3e94-45b9-904e-f9b585188119'; //'9505cba5-63db-42ba-833b-5d9eb98a6cbc';
export const todayzAppointmentsCT = '6751bf2e-492a-4000-9f37-7cf63af326e9'; //'605344bc-8a54-4df0-95d5-acadf844567e';

// COVID Cohorts
export const clientsAssessedForCovid = 'a5a9e991-8dd0-4643-9156-eb363690bf1e';
export const covidClientsWithPendingLabResults = 'dd0253db-05cd-44cb-bf44-e157bd14a3c8';
export const clientsWithoutCovidOutcomes = '5cf97790-3830-4f2a-807f-8595265c0806';

// COVID Concepts
export const dateSpecimenCollected = '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidTestType = '069f6dfe-88c1-4a45-a894-0d99549c8718';
export const covidOutcome = 'a845f3e6-4432-4de4-9fff-37fa270b1a06';
export const rapidAntigenResultDate = 'af159c77-bc5d-46dd-90d9-bcbffb22267f';
export const pcrTestResultDate = '4a77ab44-0323-490e-96be-e168c0e5c9de';

// Service Enrollment Concepts
export const careAndTreatmentEncounterType = '7e54cd64-f9c3-11eb-8e6a-57478ce139b0';
export const dateOfServiceEnrollmentConcept = '160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const patientTypeEnrollmentConcept = '83e40f2c-c316-43e6-a12e-20a338100281';
export const studyPopulationTypeConcept = '166432AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const dateOfHIVDiagnosisConcept = '160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Clinical visit
export const clinicalVisitEncounterType = 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4';
export const dateOfEncounterConcept = '163137AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const visitTypeConcept = '8a9809e9-8a0b-4e0e-b1f6-80b0cbbe361b';
export const regimenConcept = 'dfbe256e-30ba-4033-837a-2e8477f2e7cd';
export const expressCareProgramStatusConcept = '159832AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // differentiated Care Services
export const returnVisitDateConcept = '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Next Appointment Date

// HTS Retrospective
export const htsRetrospectiveEncounterType = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe';
export const covidCaseAssessmentEncType = '253a43d3-c99e-415c-8b78-ee7d4d3c1d54';
