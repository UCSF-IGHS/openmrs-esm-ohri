export const careSetting = '6f0c9a92-6f24-11e3-af88-005056821db0';

export const daysDurationUnit = {
  uuid: '1072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  display: 'Days',
};

export const basePath = '${openmrsSpaBase}/patient/';
export const encounterRepresentation =
  'custom:(uuid,encounterDatetime,encounterType,location:(uuid,name),' +
  'patient:(uuid,display),encounterProviders:(uuid,provider:(uuid,name)),' +
  'obs:(uuid,obsDatetime,voided,groupMembers,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name),' +
  'names:(uuid,conceptNameType,name))))';

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
export const allPatientsCohort = '895d0025-84e2-4306-bdd9-66acc150ec21';
export const missingCd4Cohort = '874b5fa2-0368-49ae-a756-5bfc6a14fc29';
export const highVlCohort = '5accbc54-1a6c-4789-8104-3ade8f92d3a7';

// Service Enrollment Concepts
export const careAndTreatmentEncounterType = '7e54cd64-f9c3-11eb-8e6a-57478ce139b0';
export const dateOfServiceEnrollmentConcept = '160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const patientTypeEnrollmentConcept = '83e40f2c-c316-43e6-a12e-20a338100281';
export const studyPopulationTypeConcept = 'd3d4ae96-8c8a-43db-a9dc-dac951f5dcb3';
export const populationCategoryConcept = '166432AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
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
export const tbScreeningOutcome = '160108AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const opportunisticInfectionConcept = 'c52ecf45-bd6c-43ed-861b-9a2714878729';
export const hivProgramStatusEncounterType = 'a221448d-512b-4750-84bf-d29be9f802b3';
export const generalTreatmentStatusConcept = '163105AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Encounter types
export const htsRetrospectiveEncounterType = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe';

// HTS Retrospective
export const htsRetrospectiveType = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe';

// HTS HIV
export const hivTestResultConceptUUID = 'e16b0068-b6a2-46b7-aba9-e3be00a7b4ab';
export const hivTestDateConceptUUID = '140414BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
export const htsStrategyUUID = 'f0d85da0-c235-4540-a0d1-63640594f98b';

//HIV Art Therapy
export const art_Therapy_EncounterUUID = '74bf4fe6-8fdb-4228-be39-680a93a9cf6d';
export const artTherapyDateTime_UUID = '159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const regimenLine_UUID = '164515AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const regimen_UUID = 'dfbe256e-30ba-4033-837a-2e8477f2e7cd';
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
export const PhysicalAbuse_UUID = '2a228c6a-1575-43d7-9d42-9b68d0629f46';
export const EmotionalAbuse_UUID = 'bd86f7ee-1d5f-4f5d-aa0f-4680aa6e65cb';
export const SexualAbuse_UUID = '1246AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const IpvScreeningDate_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//Contact Tracing
export const ContactTracingEncounterType_UUID = '570e9e42-4306-41dc-9bf8-634bbc70a524';
export const ContactTracingDate_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const ContactTracingMethod_UUID = '59c023dd-eed2-4b11-8c34-b88e9439db3c';
export const ContactTracingOutcome_UUID = '36a3e671-9d60-4109-b41f-046f44f4b389';

//Service Delivery
export const ServiceDeliveryEncounterType_UUID = '62ee5922-a229-48d3-a1da-875c1ffa9436';
export const CommunityDSDModel_UUID = '52824cbe-0e4d-4c18-8179-80b5799f34ed';
export const EnrollmentDate_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const DSDStatus_UUID = '8742967d-8107-4cbb-a17e-9a8c7f624673';

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

//Mental Health
export const MentalHealthAssessmentEncounter_UUID = '36db5123-0ad5-41c0-9037-625b46e0ceef';
export const LittleInterestConcept_UUID = '167006AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const DepressionConcept_UUID = '167007AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const PoorAppetiteConcept_UUID = '167070AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const PoorConcentrationConcept_UUID = '167072AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const screeningDate_UUID = '160753AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//CD4 Lab Results
export const CD4LabResultsEncounter_UUID = '96adb28e-e417-43a3-8f7d-682f8af5e912';
export const Cd4LabResultDate_UUID = '163724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const Cd4LabResultCountPercentage_UUID = '730AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const Cd4Count_UUID = '5497AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//Viral Load Results
export const ViralLoadResultsEncounter_UUID = '41af1931-184e-45f8-86ca-d42e0db0b8a1';
export const ViralLoadResultDate_UUID = '163724AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const ReasonForViralLoad_UUID = '86cc0cfe-bace-4969-94b6-d139f4971d13';
export const ViralLoadResult_UUID = '1305AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const ViralLoadCopies_UUID = '856AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//Care and Treatement
export const enrolmentDate = '160555AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const dateOfARTInitiation = '159599AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

//Express Visit
export const ExpressVisitEncounterType = 'cb0a65a7-0587-477e-89b9-cf2fd144f1d4';
export const ExpressEncounterDate = '163137AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const ExpressVisitType = '8a9809e9-8a0b-4e0e-b1f6-80b0cbbe361b';
export const ExpressTBOutcome = '160108AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
export const ExpressRefferalReason = '1272AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
