import { openmrsFetch } from '@openmrs/esm-framework';
import dayjs from 'dayjs';
import {
  finalHIVCodeConcept,
  finalPositiveHIVValueConcept,
  computedHIV_StatusConcept,
  encounterRepresentation,
  covidOutcomesCohortUUID,
} from './constants';
import useSWR from 'swr';

const BASE_WS_API_URL = '/ws/rest/v1/';
const BASE_FHIR_API_URL = '/ws/fhir2/R4/';

export function fetchLastVisit(uuid: string) {
  return openmrsFetch(`/ws/fhir2/R4/Encounter?patient=${uuid}&_sort=-date&_count=1`);
}

export function fetchPatientList(offSet: number = 0, pageSize: number = 10) {
  return openmrsFetch(`/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}&_summary=data`);
}

export function fetchTodayClients() {
  let date = dayjs().format('YYYY-MM-DD');
  return openmrsFetch(`/ws/fhir2/R4/Encounter?date=${date}`).then(({ data }) => {
    if (data.entry?.length) {
      return cleanDuplicatePatientReferences(data);
    }
    return [];
  });
}

export function fetchPatientsFromObservationCodeConcept(codeConcept: string, valueConcept: string, cutOffDays: number) {
  let endDate = dayjs().format('YYYY-MM-DD');
  let startDate = dayjs().subtract(cutOffDays, 'day').format('YYYY-MM-DD');

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
  let patientRefs = data.entry.map((enc) => {
    return enc.resource.subject.reference;
  });
  patientRefs = new Set([...patientRefs]);
  patientRefs = Array.from(patientRefs);
  return Promise.all(
    patientRefs.map((ref) => {
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

export async function getCohort(cohortUuid: string, version?: string) {
  const { data } = await openmrsFetch(
    BASE_WS_API_URL + `cohortm/cohort/${cohortUuid}${version ? `?v=${version}` : ``}`,
  );
  data.cohortMembers = data.cohortMembers.filter((member) => !member.voided);
  return data;
}

export async function getReportingCohort(cohortUuid: string, queryParams?: string[]) {
  const params = queryParams ? queryParams.join('&') : '';
  const url = params ? `reportingrest/cohort/${cohortUuid}?${params}` : `reportingrest/cohort/${cohortUuid}`;
  const { data } = await openmrsFetch(BASE_WS_API_URL + url);
  return data;
}

export async function getReportingCohortMembers(cohortUuid: string, queryParams?: string[]) {
  const params = queryParams ? queryParams.join('&') : '';
  const url = params ? `reportingrest/cohort/${cohortUuid}?${params}` : `reportingrest/cohort/${cohortUuid}`;
  const { data } = await openmrsFetch(BASE_WS_API_URL + url);
  return Promise.all(
    data.members.map((member) => {
      return openmrsFetch(BASE_WS_API_URL + `patient/${member.uuid}?v=full`);
    }),
  );
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
  return results.filter((cohort) => !cohort.voided);
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

export function evictCohortMembership(membershipUuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}cohortm/cohortmember/${membershipUuid}`, { method: 'DELETE' });
}

export async function getPatientListsForPatient(patientUuid: string) {
  const {
    data: { results, error },
  } = await openmrsFetch(`${BASE_WS_API_URL}cohortm/cohortmember?patient=${patientUuid}&v=full`);
  if (error) {
    throw error;
  }
  return results.filter((membership) => !membership.voided);
}

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

export function fetchPatientObservationFromEncounter(
  patientUUID: string,
  encounterUUID: string,
  observationCode: string,
) {
  return openmrsFetch(
    `/ws/fhir2/R4/Observation?patient=${patientUUID}&encounter=${encounterUUID}&code=${observationCode}&_sort=-date&_count=1`,
  );
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

export function fetchPatientLastEncounter(patientUuid: string, encounterType) {
  const query = `encounterType=${encounterType}&patient=${patientUuid}`;
  return openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`).then(({ data }) => {
    if (data.results.length) {
      const sortedEncounters = data.results.sort(
        (firstEncounter, secondEncounter) =>
          new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
      );
      return sortedEncounters[0];
    }

    return null;
  });
}

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

export function fetchConceptNameByUuid(conceptUuid: string) {
  return openmrsFetch(`/ws/rest/v1/concept/${conceptUuid}/name?limit=1`).then(({ data }) => {
    if (data.results.length) {
      const concept = data.results[data.results.length - 1];
      return concept.display;
    }
    return null;
  });
}

export function fetchPatientRelationships(patientUuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}relationship?person=${patientUuid}&v=full`).then(({ data }) => {
    if (data.results.length) {
      return data.results;
    }
    return null;
  });
}

export function fetchOpenMRSForms(formNames: string[]) {
  const fetch = (name) => openmrsFetch(`/ws/rest/v1/form?q=${name}&v=full`);
  return Promise.all(formNames.map((name) => fetch(name)));
}

export function fetchFormsClobData(valueReferences: string[]) {
  const fetch = (ref: string) => openmrsFetch(`/ws/rest/v1/clobdata/${ref}`);
  return Promise.all(valueReferences?.map((ref) => fetch(ref)));
}

export async function fetchMambaReportData(reportId: string) {
  try {
    const response = await openmrsFetch(`ws/rest/v1/mamba/report?report_id=${reportId}`);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const record = data.results[0].record;

      for (const item of record) {
        return item.value ? parseInt(item.value, 10) : 0;
      }
    }

    return 0;
  } catch (error) {
    console.error(`Error fetching data for report_id=${reportId}: `, error);
    throw new Error(`Error fetching data for report_id=${reportId}: ${error}`);
  }
}

export function fetchEtlData(
  reportType: 'fetchMambaAncData' | 'MotherHivStatus',
  reportId?: string,
  patientUuid?: string,
  pTrackerId?: string,
) {
  const fetcher = async (url) => {
    const response = await openmrsFetch(url);
    const data = await response.json();
    if (data && data.results && data.results.length) {
      const record = data.results[0].record;

      for (const item of record) {
        if (!isNaN(item.value)) {
          return parseInt(item.value, 10);
        } else if (isInvalidValue(item.value)) {
          return '--';
        } else {
          return item.value;
        }
      }
    }
    return '--';
  };

  let endpoint = '';
  switch (reportType) {
    case 'fetchMambaAncData':
      endpoint = `/ws/rest/v1/mamba/report?report_id=${reportId}&person_uuid=${patientUuid}`;
      break;
    case 'MotherHivStatus':
      endpoint = `/ws/rest/v1/mamba/report?report_id=${reportId}&ptracker_id=${pTrackerId}&person_uuid=${patientUuid}`;
      break;
    default:
      throw new Error('Invalid report type');
  }

  const { data, error } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

function isInvalidValue(value) {
  if (typeof value === 'string') {
    return value.trim() === '';
  } else if (value instanceof Date) {
    return isNaN(value.getTime());
  }
  return false;
}

export async function getCohortList(
  cohortUuid: string,
  queryParams?: string[],
  isReportingCohort?: boolean,
  encounterType?: string,
) {
  const params = queryParams ? queryParams.join('&') : '';
  const cohortMembersUrl = params
    ? `reportingrest/cohort/${cohortUuid}?${params}`
    : `reportingrest/cohort/${cohortUuid}`;
  const cohortUrl = `cohortm/cohort/${cohortUuid}?v=full`;

  const url = isReportingCohort ? cohortMembersUrl : cohortUrl;

  const { data } = await openmrsFetch(BASE_WS_API_URL + url);

  if (data?.members) {
    return Promise.all(
      data.members.map((member) => {
        return openmrsFetch(
          `/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${member.uuid}&v=${encounterRepresentation}`,
        ).then(({ data }) => {
          if (data.results.length) {
            const sortedEncounters = data.results.sort(
              (firstEncounter, secondEncounter) =>
                new Date(secondEncounter.encounterDatetime).getTime() -
                new Date(firstEncounter.encounterDatetime).getTime(),
            );

            return sortedEncounters[0];
          }

          return null;
        });
      }),
    );
  } else if (data?.cohortMembers) {
    return Promise.all(
      data.cohortMembers.map((member) => {
        return openmrsFetch(
          `/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${member.patient.uuid}&v=${encounterRepresentation}`,
        ).then(({ data }) => {
          if (data.results.length) {
            const sortedEncounters = data.results
              .sort(
                (firstEncounter, secondEncounter) =>
                  new Date(secondEncounter.encounterDatetime).getTime() -
                  new Date(firstEncounter.encounterDatetime).getTime(),
              );
            return sortedEncounters[0];
          }
          return null;
        });
      }),
    );
  }
}
