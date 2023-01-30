import { openmrsFetch } from '@openmrs/esm-framework';
import moment from 'moment';
import {
  computedHIV_StatusConcept,
  encounterRepresentation,
  finalHIVCodeConcept,
  finalPositiveHIVValueConcept,
} from '@ohri/openmrs-esm-ohri-commons-lib';
import { covidOutcomesCohortUUID } from '../constants';

const BASE_WS_API_URL = '/ws/rest/v1/';
const BASE_FHIR_API_URL = '/ws/fhir2/R4/';

export function fetchPatientCovidOutcome() {
  return openmrsFetch(`/ws/rest/v1/reportingrest/cohort/${covidOutcomesCohortUUID}`).then(({ data }) => {
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
