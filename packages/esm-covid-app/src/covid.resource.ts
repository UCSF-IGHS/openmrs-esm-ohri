import { openmrsFetch } from '@openmrs/esm-framework';

const BASE_WS_API_URL = '/ws/rest/v1/';
const BASE_FHIR_API_URL = '/ws/fhir2/R4/';

export function fetchPatientCovidOutcome(covidOutcomesCohortUUID) {
  return openmrsFetch(`${BASE_WS_API_URL}reportingrest/cohort/${covidOutcomesCohortUUID}`).then(({ data }) => {
    if (data.members?.length) {
      let patientRefs = data.members.map((member) => {
        return member.uuid;
      });
      patientRefs = new Set([...patientRefs]);
      patientRefs = Array.from(patientRefs);
      return Promise.all(
        patientRefs.map((ref) => {
          return openmrsFetch(BASE_FHIR_API_URL + '/Person/' + ref);
        }),
      );
    }
    return [];
  });
}
