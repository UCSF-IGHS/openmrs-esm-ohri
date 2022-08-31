/* eslint-disable no-debugger, no-console */
import { openmrsFetch } from '@openmrs/esm-framework';
import { finalHIVCodeConcept, finalPositiveHIVValueConcept, computedHIV_StatusConcept } from '../constants';

const BASE_WS_API_URL = '/ws/rest/v1/';

export function fetchPatientsFinalHIVStatus(patientUUID: string) {
  return openmrsFetch(
    `/ws/fhir2/R4/Observation?code=${finalHIVCodeConcept}&value-concept=${finalPositiveHIVValueConcept}&patient=${patientUUID}&_sort=-date&_count=1`,
  ).then(({ data }) => {
    if (data.entry?.length) {
      return data.entry[0].resource.valueCodeableConcept.coding[0].display;
    }
    return '';
  });
}

export function fetchPatientComputedConcept_HIV_Status(patientUUID: string) {
  return openmrsFetch(
    `/ws/fhir2/R4/Observation?code=${computedHIV_StatusConcept}&value-concept=${computedHIV_StatusConcept}&patient=${patientUUID}&_sort=-date&_count=1`,
  ).then(({ data }) => {
    if (data.entry?.length) {
      return data.entry[0].resource.valueCodeableConcept.coding[0].display;
    }
    return '';
  });
}

export async function getReportingCohort(cohortUuid: string, queryParams?: string[]) {
  const params = queryParams ? queryParams.join('&') : '';
  const url = params ? `reportingrest/cohort/${cohortUuid}?${params}` : `reportingrest/cohort/${cohortUuid}`;
  const { data } = await openmrsFetch(BASE_WS_API_URL + url);
  return data;
}
