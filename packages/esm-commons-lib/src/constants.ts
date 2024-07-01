export const careSetting = '6f0c9a92-6f24-11e3-af88-005056821db0';

export const daysDurationUnit = {
  uuid: '1072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  display: 'Days',
};

export const basePath = '${openmrsSpaBase}/patient/';
export const encounterRepresentation =
  'custom:(uuid,encounterDatetime,encounterType,location:(uuid,name),' +
  'patient:(uuid,display,age,identifiers,person),encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,voided,groupMembers,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name),' +
  'names:(uuid,conceptNameType,name))),form:(uuid,name))';

// Final HIV Test Result Concepts
export const finalHIVCodeConcept = 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab';
export const finalPositiveHIVValueConcept = '703AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const computedHIV_StatusConcept = 'a5261998-c635-4e27-870c-e837faf6cf9a';

// Linked to Care Concepts
export const linkedToCareCodeConcept = 'e8e8fe71-adbb-48e7-b531-589985094d30';
export const linkedToCareYesValueConcept = '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Cohorts
export const preTestCounsellingCohort = 'e4d801f0-e2fd-11eb-8212-7d7156e00a1f';
export const waitingForHIVTestCohort = 'cdee0abe-e471-11eb-8212-7d7156e00a1f';
export const postTestCounsellingCohort = '01af2130-e472-11eb-8212-7d7156e00a1f';
export const clientsEnrolledToCare = '51bec6f7-df43-426e-a83e-c1ae5501372f';
export const todayzAppointmentsCT = 'ccbcf6d8-77b7-44a5-bb43-d352478ea4e9';

// COVID Cohorts
export const clientsAssessedForCovid = 'ec373b01-4ba3-488e-a322-9dd6a50cfdf7';
export const covidClientsWithPendingLabResults = '166aa2b1-ce55-4d16-9643-ca9d2e2694ea';
export const clientsWithoutCovidOutcomes = 'db6c4a18-28c6-423c-9da0-58d19e364a7f';
export const allCovidAssessments = 'ec373b01-4ba3-488e-a322-9dd6a50cfdf7';
export const covidVaccinatedClients = 'b5d52da9-10c2-43af-ae23-552acc5e445b';
export const covid19PositiveClients = '1523b1e5-b6d0-44fb-bd9e-c91bfefb4d1c';

// COVID Concepts
export const dateSpecimenCollected = '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidTestType = '069f6dfe-88c1-4a45-a894-0d99549c8718';
export const covidOutcome = 'a845f3e6-4432-4de4-9fff-37fa270b1a06';
export const rapidAntigenResultDate = 'af159c77-bc5d-46dd-90d9-bcbffb22267f';
export const pcrTestResultDate = '4a77ab44-0323-490e-96be-e168c0e5c9de';
export const finalCovid19Result = '5da5c21b-969f-41bd-9091-e40d4c707544';
export const covidOutcomesCohortUUID = 'afb0d950-48fd-44d7-ae2c-79615cd125f0';

// Service Enrollment Concepts
export const careAndTreatmentEncounterType = '7e54cd64-f9c3-11eb-8e6a-57478ce139b0';
export const dateOfServiceEnrollmentConcept = '160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const patientTypeEnrollmentConcept = '83e40f2c-c316-43e6-a12e-20a338100281';
export const studyPopulationTypeConcept = 'd3d4ae96-8c8a-43db-a9dc-dac951f5dcb3';
export const dateOfHIVDiagnosisConcept = '160554AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const entryPointConcept = '160540AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const re_enrolmentDateConcept = '20efadf9-86d3-4498-b3ab-7da4dad9c429';
export const otherEntryPoint = '161011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Clinical visit
export const clinicalVisitEncounterType = 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4';
export const dateOfEncounterConcept = '163137AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const visitTypeConcept = '8a9809e9-8a0b-4e0e-b1f6-80b0cbbe361b';
export const regimenConcept = 'dfbe256e-30ba-4033-837a-2e8477f2e7cd';
export const expressCareProgramStatusConcept = '159832AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // differentiated Care Services
export const returnVisitDateConcept = '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Next Appointment Date
export const tbScreeningOutcome = 'c0661c0f-348b-4941-812b-c531a0a67f2e';

// Encounter types
export const htsRetrospectiveEncounterType = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe';
export const covidCaseAssessmentEncType = '253a43d3-c99e-415c-8b78-ee7d4d3c1d54';
export const covidVaccinationEncType = '5b37ce7a-c55e-4226-bdc8-5af04025a6de';
export const covidLabTestEncType = 'a77d3e7f-5c8f-4074-a207-77a70e197b0c';

// HTS Retrospective
export const htsRetrospectiveType = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe';

// Covid Restrospective
//   const covidEncounterUUID = '902839fa-f58c-44a1-95a4-dba62d7263f8'; // Covid Case Report
export const covid_Assessment_EncounterUUID = '253a43d3-c99e-415c-8b78-ee7d4d3c1d54';
export const covidReasonsForTestingConcep_UUID = 'ae46f4b1-c15d-4bba-ab41-b9157b82b0ce'; // Reasons for testing
export const covidTestTypeUUID = '069f6dfe-88c1-4a45-a894-0d99549c8718'; // SARS2-Cov2 Test Type
export const covidTestResultUUID = '3f4ee14b-b4ab-4597-9fe9-406883b63d76'; // Diagnostic PCR Result
export const covidOutcomeUUID = 'a845f3e6-4432-4de4-9fff-37fa270b1a06';

export const covidSpecimenCollectiDate_UUID = '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Date specimen collected
export const covidPatientStatusUUID = 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f'; // Client Health Status

export const covidTreatementOutConcept_UUID = 'a845f3e6-4432-4de4-9fff-37fa270b1a06';
export const covidSARS_TestResultConcept_UUID = '89feed9c-1dd9-477a-ab1c-86f5f75f6762';

// Covid Assessment
export const covidSARS_TestResult_Name_UUID = '0961651c-d52e-41dd-957a-94b9ce08e4eb';
export const covidReasonsForTestingUUID = '5793ad0f-d726-4918-a1b5-f25f4fb2b857';
export const covidTreatmenOutConceptName_UUID = '28d43e48-3673-4671-a6b1-3ed45fdfcba6';
export const covidSpecimentTestDate_UUID = '499df97a-2a34-4562-946a-3c4d5608b67f';
export const covidTypeofTestConcept_UUID = '069f6dfe-88c1-4a45-a894-0d99549c8718';
export const covidSymptosConcept_UUID = '';
export const covidPresentSymptonsConcept_UUID = '244b0dc0-eb1b-46ae-b62a-f580345d4f46';
export const covidComorbidityPresentConcept_UUID = '166020AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidUnderComorbidityConcept_UUID = '0651869c-6e90-48d6-b25c-406270c76bee';
export const covidPresentSymptonsName_UUID = '12568215-ae1c-42ec-b7e8-8818d2761f46';
export const covidPatientStatusConcept_UUID = 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f';
export const covidEncounterDateTime_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidSymptomsPresentation = 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f';

//Covid Lab Order
export const covidLabOrderDate_UUID = '162078AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidLabOrderEncounterType_UUID = 'a77d3e7f-5c8f-4074-a207-77a70e197b0c';
export const pcrTestResult = '3f4ee14b-b4ab-4597-9fe9-406883b63d76';
export const rapidTestResult = 'cbcbb029-f11f-4437-9d53-1d0f0a170433';

//Covid Lab Results
export const covidSpecimenCollectionDate_UUID = '159951AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidLabResultsEncounterType_UUID = '253a43d3-c99e-415c-8b78-ee7d4d3c1d54';
export const covidSpecimentTypeConcept_UUID = 'ae127f82-1861-4165-ac81-8554e5a3aac4';
export const covidTestResultConcept_UUID = '161934AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidRapidTestResultDate_UUID = 'af159c77-bc5d-46dd-90d9-bcbffb22267f';
export const covidDiagnosticPcrResult_UUID = '3f4ee14b-b4ab-4597-9fe9-406883b63d76';
export const covidDiagnorticPcrResultDate_UUID = '4a77ab44-0323-490e-96be-e168c0e5c9de';
export const covidTestStatusConcept_UUID = '6681366c-2174-489a-b951-13a1404935bf';
export const covidTestResultDate_UUID = '163724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Covid Vaccination
export const covidVaccinationEncounterUUID = '5b37ce7a-c55e-4226-bdc8-5af04025a6de';
export const covidVaccinationStatusUUID = '40cb816f-797b-4cb4-a9fb-2727b2373623'; // Has the patient been vaccinated
export const covidVaccinationStatusConcept_UUID = 'de3bc9b7-05b5-41b6-a38d-8d2eec646c4f'; // What is the patient status with regard to COVID-19?
export const covidVaccination1stDoseDateConcept_UUID = 'c85eb064-5ef7-4ac6-8e56-4749bd58df44'; // What is COVID-19 vaccination date (1st dose)?
export const covidVaccination2ndDoseDateConcept_UUID = '42ee7f5c-fdd3-48c1-8d3a-5c6e248e6cb9'; // What is COVID-19 vaccination date (2nd dose)?
export const covidVaccinationTypeConcept_UUID = 'a31d1148-bbcc-4ad6-a015-8359d66bcfdc'; // What COVID-19 vaccine was administered?
export const covidVaccinationAdministeredConcept_UUID = '1410AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Which date COVID-19 vaccine was administered?
export const covidVaccinationNextVacinationDateConcept_UUID = '5096AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const covidVaccinationDose_UUID = '6ec64cb3-e710-4d3e-9db4-38c135966a45';
export const covidVaccineConcept_UUID = '0cc868bd-e9dd-4b59-b278-f923afe22d82';

// HTS HIV
export const hivTestResultConceptUUID = 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab';
export const hivTestDateConceptUUID = '140414BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
export const htsStrategyUUID = 'f0d85da0-c235-4540-a0d1-63640594f98b';

//HIV Art Therapy
export const art_Therapy_EncounterUUID = '74bf4fe6-8fdb-4228-be39-680a93a9cf6d';
export const artTherapyDateTime_UUID = '159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const regimenLine_UUID = '164515AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const refusedTreatment_UUID = 'ac4f3fd1-8a2a-4c5e-a335-3f675b82dd78';
export const therapyPlanConcept = '7557d77c-172b-4673-9335-67a38657dd01';
export const artStopDateUUID = '162572AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const switchDateUUID = '164516AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const substitutionDateUUID = '164431AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const dateRestartedUUID = '160738AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const switchReasonUUID = '160568AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const substituteReasonUUID = '160562AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const stopReasonUUID = '163513AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const restartReasonUUID = '161011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// HIV Lab Results
export const hivLabResultsEncounterType_UUID = ' 15272be5-ae9c-4278-a303-4b8907eae73b';
export const hivLabTestResultConcept_UUID = '';
export const hivReasonViralLoadRequest_UUID = '86cc0cfe-bace-4969-94b6-d139f4971d13';
export const hivReasonCD4Request_UUID = '759e89a6-3260-4aee-9922-86a6301bcff3';
export const hivDateViralLoadResult_UUID = '163281AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const hivDateViralLoadInterpretation_UUID = '686dc1b2-68b5-4024-b311-bd2f5e3ce394';
export const hivDateCD4Result_UUID = '159376AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const hivCD4Result_UUID = '657AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const hivCD4Count_UUID = '5497AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//HIV Death
export const hivDeathDate_UUID = '1543AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const causeOFDeath_UUID = 'ef973f1f-557f-4620-acf5-9c4c18bf1eda';
export const deathSpecific_UUID = 'e329cdf4-4eeb-4821-85ec-80ec4b503de0';
export const deathFormEncounterType_UUID = '111c2104-991d-4b58-a30e-ce84bb275534';

//Transfer Out
export const transferOutEncounterType_UUID = '3044916a-7e5f-478b-9091-803233f27f91';
export const visitDate_UUID = '163137AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const receivingFacility_UUID = '162724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const TransferOutDate_UUID = '160649AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const verified_UUID = '797e0073-1f3f-46b1-8b1a-8cdad134d2b3';

//Patient Tracing
export const ContactDate_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const ContactMethod_UUID = '59c023dd-eed2-4b11-8c34-b88e9439db3c';
export const ContactOutcome_UUID = 'bc45edbd-11e7-4888-ad7d-4ec3dd8cdcf6';
export const PatientTracingEncounterType_UUID = '0cd5d4cb-204e-419a-9dd7-1e18e939ce4c';

//Intimate Partner
export const IntimatePartnerEncounterType_UUID = '881fff34-b4a9-4d11-b2f5-a8a23a9f402b';
export const ThreatenedToHurt_UUID = 'bd86f7ee-1d5f-4f5d-aa0f-4680aa6e65cb';
export const SexuallyMolested_UUID = '1246AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const howOftenThreatened_UUID = '953f6271-57ef-414e-bdba-fe9e0246db58';
export const howOftenSexuallyMolested_UUID = '1dd53a22-2e8f-425b-8ba4-59172ed3fafe';

//Contact Tracing
export const ContactTracingEncounterType_UUID = '570e9e42-4306-41dc-9bf8-634bbc70a524';
export const ContactTracingDate_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const ContactTracingMethod_UUID = '59c023dd-eed2-4b11-8c34-b88e9439db3c';
export const ContactTracingOutcome_UUID = '36a3e671-9d60-4109-b41f-046f44f4b389';

//Service Delivery
export const ServiceDeliveryEncounterType_UUID = '62ee5922-a229-48d3-a1da-875c1ffa9436';
export const CommunityDSDModel_UUID = '52824cbe-0e4d-4c18-8179-80b5799f34ed';

//Peads Disclosure
export const PeadsDisclosureEncounterType_UUID = '390c2f21-c1c4-4246-94ca-a026157cd1db';
export const DisclosureDate_UUID = '85fbdcc8-8dbc-40a9-b85f-5d1bfe1ab63d';
export const DisclosureStage_UUID = '573f93e2-12f6-483e-aa6e-14e9b76b311a';

//Patner Notification
export const PatnerNotificationEncounterType_UUID = '4dd0ee63-805f-43e9-833c-6386ba97fdc1';
export const IndexHIVStatus_UUID = '1436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const PatnerNotificationContactDate_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const FirstName_UUID = '166102AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const Relationship_UUID = '85d3b4fe-c1a9-4e27-a86b-dcc1e30c8a93';
