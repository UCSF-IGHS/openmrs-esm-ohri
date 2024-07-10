import { Type } from '@openmrs/esm-framework';

export const configSchema = {
  encounterTypes: {
    _type: Type.Object,
    _description: 'Encounter type UUIDs for Covid.',
    _default: {
      PatnerNotificationEncounterType_UUID: '4dd0ee63-805f-43e9-833c-6386ba97fdc1',
      PeadsDisclosureEncounterType_UUID: '390c2f21-c1c4-4246-94ca-a026157cd1db',
      ServiceDeliveryEncounterType_UUID: '62ee5922-a229-48d3-a1da-875c1ffa9436',
      ContactTracingEncounterType_UUID: '570e9e42-4306-41dc-9bf8-634bbc70a524',
      IntimatePartnerEncounterType_UUID: '881fff34-b4a9-4d11-b2f5-a8a23a9f402b',
      PatientTracingEncounterType_UUID: '0cd5d4cb-204e-419a-9dd7-1e18e939ce4c',
      transferOutEncounterType_UUID: '3044916a-7e5f-478b-9091-803233f27f91',
      deathFormEncounterType_UUID: '111c2104-991d-4b58-a30e-ce84bb275534',
      hivLabResultsEncounterType_UUID: '15272be5-ae9c-4278-a303-4b8907eae73b',
      covidVaccinationEncounterUUID: '5b37ce7a-c55e-4226-bdc8-5af04025a6de',
      art_Therapy_EncounterUUID: '74bf4fe6-8fdb-4228-be39-680a93a9cf6d',
      covidLabResultsEncounterType_UUID: '253a43d3-c99e-415c-8b78-ee7d4d3c1d54',
      covid_Assessment_EncounterUUID: '253a43d3-c99e-415c-8b78-ee7d4d3c1d54',
      htsRetrospectiveEncounterType: '79c1f50f-f77d-42e2-ad2a-d29304dde2fe',
      covidCaseAssessmentEncType: '253a43d3-c99e-415c-8b78-ee7d4d3c1d54',
      covidVaccinationEncType: '5b37ce7a-c55e-4226-bdc8-5af04025a6de',
      covidLabTestEncType: 'a77d3e7f-5c8f-4074-a207-77a70e197b0c',
      careAndTreatmentEncounterType: '7e54cd64-f9c3-11eb-8e6a-57478ce139b0',
      clinicalVisitEncounterType: 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4',
    },
  },
  obsConcepts: {
    _type: Type.Object,
    _description: 'List of observation concept UUIDs related to Covid.',
    _default: {
      finalHIVCodeConcept: 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab',
      finalPositiveHIVValueConcept: '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      computedHIV_StatusConcept: 'a5261998-c635-4e27-870c-e837faf6cf9a',
      linkedToCareCodeConcept: 'e8e8fe71-adbb-48e7-b531-589985094d30',
      linkedToCareYesValueConcept: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      // COVID Cohorts
      clientsAssessedForCovid: 'ec373b01-4ba3-488e-a322-9dd6a50cfdf7',
      covidClientsWithPendingLabResults: '166aa2b1-ce55-4d16-9643-ca9d2e2694ea',
      clientsWithoutCovidOutcomes: 'db6c4a18-28c6-423c-9da0-58d19e364a7f',
      allCovidAssessments: 'ec373b01-4ba3-488e-a322-9dd6a50cfdf7',
      covidVaccinatedClients: 'b5d52da9-10c2-43af-ae23-552acc5e445b',
      covid19PositiveClients: '1523b1e5-b6d0-44fb-bd9e-c91bfefb4d1c',
      // COVID Concepts
      dateSpecimenCollected: '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      covidTestType: '069f6dfe-88c1-4a45-a894-0d99549c8718',
      covidOutcome: 'a845f3e6-4432-4de4-9fff-37fa270b1a06',
      rapidAntigenResultDate: 'af159c77-bc5d-46dd-90d9-bcbffb22267f',
      pcrTestResultDate: '4a77ab44-0323-490e-96be-e168c0e5c9de',
      finalCovid19Result: '5da5c21b-969f-41bd-9091-e40d4c707544',
      covidOutcomesCohortUUID: 'afb0d950-48fd-44d7-ae2c-79615cd125f0',
      // Service Enrollment Concepts
      dateOfServiceEnrollmentConcept: '160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      patientTypeEnrollmentConcept: '83e40f2c-c316-43e6-a12e-20a338100281',
      studyPopulationTypeConcept: 'd3d4ae96-8c8a-43db-a9dc-dac951f5dcb3',
      dateOfHIVDiagnosisConcept: '160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      entryPointConcept: '160540AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      re_enrolmentDateConcept: '20efadf9-86d3-4498-b3ab-7da4dad9c429',
      otherEntryPoint: '161011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      // Clinical visit
      dateOfEncounterConcept: '163137AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      visitTypeConcept: '8a9809e9-8a0b-4e0e-b1f6-80b0cbbe361b',
      regimenConcept: 'dfbe256e-30ba-4033-837a-2e8477f2e7cd',
      expressCareProgramStatusConcept: '159832AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // differentiated Care Services
      returnVisitDateConcept: '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // Next Appointment Date
      tbScreeningOutcome: 'c0661c0f-348b-4941-812b-c531a0a67f2e',
      // HTS Retrospective
      htsRetrospectiveType: '79c1f50f-f77d-42e2-ad2a-d29304dde2fe',
      // Covid Case Report
      covidReasonsForTestingConcep_UUID: 'ae46f4b1-c15d-4bba-ab41-b9157b82b0ce', // Reasons for testing
      covidTestTypeUUID: '069f6dfe-88c1-4a45-a894-0d99549c8718', // SARS2-Cov2 Test Type
      covidTestResultUUID: '3f4ee14b-b4ab-4597-9fe9-406883b63d76', // Diagnostic PCR Result
      covidOutcomeUUID: 'a845f3e6-4432-4de4-9fff-37fa270b1a06',
      covidSpecimenCollectiDate_UUID: '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', // Date specimen collected
      covidPatientStatusUUID: 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f', // Client Health Status
      covidTreatementOutConcept_UUID: 'a845f3e6-4432-4de4-9fff-37fa270b1a06',
      covidSARS_TestResultConcept_UUID: '89feed9c-1dd9-477a-ab1c-86f5f75f6762',
      // Covid Assessment
      covidSARS_TestResult_Name_UUID: '0961651c-d52e-41dd-957a-94b9ce08e4eb',
      covidReasonsForTestingUUID: '5793ad0f-d726-4918-a1b5-f25f4fb2b857',
      covidTreatmenOutConceptName_UUID: '28d43e48-3673-4671-a6b1-3ed45fdfcba6',
      covidSpecimentTestDate_UUID: '499df97a-2a34-4562-946a-3c4d5608b67f',
      covidTypeofTestConcept_UUID: '069f6dfe-88c1-4a45-a894-0d99549c8718',
      covidSymptosConcept_UUID: '',
      covidPresentSymptonsConcept_UUID: '244b0dc0-eb1b-46ae-b62a-f580345d4f46',
      covidComorbidityPresentConcept_UUID: '166020AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      covidUnderComorbidityConcept_UUID: '0651869c-6e90-48d6-b25c-406270c76bee',
      covidPresentSymptonsName_UUID: '12568215-ae1c-42ec-b7e8-8818d2761f46',
      covidPatientStatusConcept_UUID: 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f',
      covidEncounterDateTime_UUID: '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      covidSymptomsPresentation: 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f',
      // Covid Lab Order
      covidLabOrderDate_UUID: '162078AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      covidLabOrderEncounterType_UUID: 'a77d3e7f-5c8f-4074-a207-77a70e197b0c',
      pcrTestResult: '3f4ee14b-b4ab-4597-9fe9-406883b63d76',
      rapidTestResult: 'cbcbb029-f11f-4437-9d53-1d0f0a170433',
      // Covid Lab Results
      covidSpecimenCollectionDate_UUID: '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      covidSpecimentTypeConcept_UUID: 'ae127f82-1861-4165-ac81-8554e5a3aac4',
      covidTestResultConcept_UUID: '161934AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      covidRapidTestResultDate_UUID: 'af159c77-bc5d-46dd-90d9-bcbffb22267f',
      covidDiagnosticPcrResult_UUID: '3f4ee14b-b4ab-4597-9fe9-406883b63d76',
      covidDiagnorticPcrResultDate_UUID: '4a77ab44-0323-490e-96be-e168c0e5c9de',
      covidTestStatusConcept_UUID: '6681366c-2174-489a-b951-13a1404935bf',
      covidTestResultDate_UUID: '163724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      // Covid Vaccination
      covidVaccinationStatusUUID: '40cb816f-797b-4cb4-a9fb-2727b2373623', // Has the patient been vaccinated
      covidVaccinationStatusConcept_UUID: 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f', // What is the patient status with regard to COVID-19?
      covidVaccination1stDoseDateConcept_UUID: 'c297e939-736d-4c37-b3e5-e2da1f3afc1a', // Date of the first dose
      covidVaccination1stDoseConcept_UUID: '22f1a70d-e7b7-403b-9a34-f267dace3dc8', // First dose
      covidVaccination2ndDoseConcept_UUID: 'ff0f23f6-1104-4e11-bdb8-9bdca74f7889', // Second dose
      covidVaccination3rdDoseConcept_UUID: 'de8f8b0e-b11e-4a26-bd3e-bec75f335208', // Third dose
      covidVaccination3rdDoseDateConcept_UUID: 'c5f9024e-230f-4e09-8da8-6f4945d6e337', // Date of the third dose
      covidVaccinationFinalDoseConcept_UUID: '22f1a70d-e7b7-403b-9a34-f267dace3dc8',
      covidVaccinationFinalDoseDateConcept_UUID: 'c5f9024e-230f-4e09-8da8-6f4945d6e337',
    },
  },
  cohortTypes: {
    _type: Type.Object,
    _description: 'Cohort UUIDs for various linelists.',
    _default: {
      preTestCounsellingCohort: 'e4d801f0-e2fd-11eb-8212-7d7156e00a1f',
      waitingForHIVTestCohort: 'cdee0abe-e471-11eb-8212-7d7156e00a1f',
      postTestCounsellingCohort: '01af2130-e472-11eb-8212-7d7156e00a1f',
      clientsEnrolledToCare: '51bec6f7-df43-426e-a83e-c1ae5501372f',
      todayzAppointmentsCT: 'ccbcf6d8-77b7-44a5-bb43-d352478ea4e9',
    },
  },
  careSetting: {
    _type: Type.String,
    _description: 'The care setting uuid',
    _default: '6f0c9a92-6f24-11e3-af88-005056821db0',
  },
};

export interface ConfigObject {
  encounterTypes: Object;
  obsConcepts: Object;
  cohortTypes: Object;
  careSetting: string;
}
