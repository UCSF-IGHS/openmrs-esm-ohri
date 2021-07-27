import { openmrsFetch } from '@openmrs/esm-framework';
import moment from 'moment';
import { finalHIVCodeConcept, finalPositiveHIVValueConcept } from '../constants';

const BASE_WS_API_URL = '/ws/rest/v1/';
const BASE_FHIR_API_URL = '/ws/fhir2/R4/';

export function fetchLastVisit(uuid: string) {
  return openmrsFetch(`/ws/fhir2/R4/Encounter?patient=${uuid}&_sort=-date&_count=1`);
}

export function fetchPatientList(offSet: number = 1, pageSize: number = 10) {
  return openmrsFetch(`/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}`);
}

export function fetchTodayClients() {
  let date = moment().format('YYYY-MM-DD');
  return openmrsFetch(`/ws/fhir2/R4/Encounter?date=${date}`).then(({ data }) => {
    if (data.entry?.length) {
      return cleanDuplicatePatientReferences(data);
    }
    return [];
  });
}

export function fetchPatientsFromObservationCodeConcept(
  codeConcept: string,
  valueConcept?: string,
  cutOffDays?: number,
) {
  let endDate = moment().format('YYYY-MM-DD');
  let startDate = moment()
    .subtract(cutOffDays, 'days')
    .format('YYYY-MM-DD');

  return openmrsFetch(
    `/ws/fhir2/R4/Observation?code=${codeConcept}${valueConcept ? `&value-concept=${valueConcept}` : ''}${
      cutOffDays ? `&_lastUpdated=ge${startDate}&_lastUpdated=le${endDate}` : ''
    }`,
  ).then(({ data }) => {
    if (data.entry?.length) {
      return cleanDuplicatePatientReferences(data);
    }
    return [];
  });
}

function cleanDuplicatePatientReferences(data) {
  let patientRefs = data.entry.map(enc => {
    return enc.resource.subject.reference;
  });
  patientRefs = new Set([...patientRefs]);
  patientRefs = Array.from(patientRefs);
  return Promise.all(
    patientRefs.map(ref => {
      return openmrsFetch(BASE_FHIR_API_URL + ref);
    }),
  );
}

export function performPatientSearch(query, objectVersion) {
  return openmrsFetch(`${BASE_WS_API_URL}/patient?q=${query}${objectVersion ? `&v=${objectVersion}` : ''}`, {
    method: 'GET',
  });
}

export function getPatients(searchPhrase?: string, offset?: number, pageSize: number = 10) {
  return openmrsFetch(
    `/ws/fhir2/R4/Patient?_count=${pageSize}${searchPhrase ? `&name=${searchPhrase}` : ''}${
      offset ? `&_getpagesoffset=${offset}` : ''
    }`,
    {
      method: 'GET',
    },
  );
}

export function getCohort(cohortUuid: string, version?: string) {
  return openmrsFetch(BASE_WS_API_URL + `cohortm/cohort/${cohortUuid}${version ? `?v=${version}` : ``}`);
}

export async function getCohorts(cohortTypeUuid?: string) {
  const {
    data: { results, error },
  } = await openmrsFetch(
    BASE_WS_API_URL +
      `cohortm/cohort?v=custom:(uuid,name,voided)${cohortTypeUuid ? `&cohortType=${cohortTypeUuid}` : ''}`,
  );
  if (error) {
    throw error;
  }
  return results.filter(cohort => !cohort.voided);
}

export function addPatientToCohort(patientUuid: string, cohortUuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}cohortm/cohortmember`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      patient: patientUuid,
      cohort: cohortUuid,
      startDate: new Date(),
    },
  });
}

export async function getPatientListsForPatient(patientUuid: string) {
  const {
    data: { results, error },
  } = await openmrsFetch(`${BASE_WS_API_URL}cohortm/cohortmember?patient=${patientUuid}&v=full`);
  if (error) {
    throw error;
  }
  return results.filter(membership => !membership.voided).map(membership => membership.cohort);
}

export function fetchPatientsFinalHIVStatus(patientUUID: string) {
  return openmrsFetch(
    `/ws/fhir2/R4/Observation?code=${finalHIVCodeConcept}&value-concept=${finalPositiveHIVValueConcept}&patient=${patientUUID}&_sort=-date&_count=1`,
  ).then(({ data }) => {
    if (data.entry?.length) {
      return data.entry[0].resource.valueCodeableConcept.coding[0].display;
    }
    return 'Negative';
  });
}
