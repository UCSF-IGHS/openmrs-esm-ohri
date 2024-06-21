import { openmrsFetch } from '@openmrs/esm-framework';
import { fetchPatientsFinalHIVStatus, fetchPatientComputedConcept_HIV_Status } from '../../api.resource';

const fetchPatientHtsEncounters = (patientUuid: string) => {
  const htsEncounterRepresentation =
    'custom:(uuid,encounterDatetime,location:(uuid,name),' +
    'encounterProviders:(uuid,provider:(uuid,name)),' +
    'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';
  const htsRetrospectiveTypeUUID = '79c1f50f-f77d-42e2-ad2a-d29304dde2fe';
  const query = `encounterType=${htsRetrospectiveTypeUUID}&patient=${patientUuid}`;

  return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${htsEncounterRepresentation}`);
};

const isPatientHivPositive = async (patientUuid: string) => {
  const hivTestResultConceptUUID = 'de18a5c1-c187-4698-9d75-258605ea07e8'; // Concept: Result of HIV test

  let isHivPositive = false;
  let htsTestResult;

  await fetchPatientHtsEncounters(patientUuid).then((encounters) => {
    encounters.data.results.forEach((encounter) => {
      htsTestResult = encounter.obs.find((observation) => observation.concept.name.uuid === hivTestResultConceptUUID);

      if (htsTestResult && htsTestResult.value.name.uuid === 'ade5ba3f-3c7f-42b1-96d1-cfeb9b446980') {
        isHivPositive = true;
      }
    });
  });

  const hivFinalStatus = await fetchPatientsFinalHIVStatus(patientUuid);

  const computedConcept = await fetchPatientComputedConcept_HIV_Status(patientUuid);

  if (hivFinalStatus.toLowerCase().includes('positive') || computedConcept.toLowerCase().includes('positive')) {
    isHivPositive = true;
  } else {
    isHivPositive = false;
  }

  return isHivPositive;
};

export { isPatientHivPositive };
