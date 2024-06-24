import { openmrsFetch } from '@openmrs/esm-framework';
import useSWR from 'swr';
import { encounterRepresentation } from '../constants';
import { fetchPatientsFinalHIVStatus } from '../api.resource';

export function useCohortData(cohortId, isReportingCohort, queryParams) {
  const params = queryParams ? queryParams.join('&') : null;
  const url = isReportingCohort 
    ? `/ws/rest/v1/reportingrest/cohort/${cohortId}?${params}`
    : `/ws/rest/v1/cohortm/cohort/${cohortId}`;
   const { data, error, isLoading } = useSWR<{ data: any }, Error>(url, openmrsFetch);

   console.log("===isLoading", isLoading)
   console.log("====cohort data", data)
   console.log("====cohort data data", data?.data)

   const cohortData = data?.data?.cohortMembers ? data?.data?.cohortMembers.filter((member) => !member.voided) : data?.data;

   return {
    data: cohortData ?? [],
    isLoading,
    error
   }
}

const fetchPatientLastEncounter = async (patientUuid, encounterType) => {
  const query = `encounterType=${encounterType}&patient=${patientUuid}`;
  const { data } = await openmrsFetch(`/ws/rest/v1/encounter?${query}&v=default`);
  if (data.results.length) {
    const sortedEncounters = data.results.sort(
      (firstEncounter, secondEncounter) =>
        new Date(secondEncounter.encounterDatetime).getTime() - new Date(firstEncounter.encounterDatetime).getTime(),
    );
    return sortedEncounters[0];
  }
  return null;
};

export function usePatientLastEncounter(patientUuid, encounterType) {
  const { data, error } = useSWR(
    patientUuid ? [`/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${patientUuid}`, encounterType] : null,
    () => fetchPatientLastEncounter(patientUuid, encounterType),
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

const fetchPatientsData = async (patients, encounterType, excludeColumns) => {
  const encountersPromises = patients.map((patient) => fetchPatientLastEncounter(patient.uuid, encounterType));
  const encountersResults = await Promise.all(encountersPromises);

  const hivStatusesPromises = excludeColumns
    ? patients.map((patient) => fetchPatientsFinalHIVStatus(patient.uuid))
    : [];
  const hivStatusesResults = await Promise.all(hivStatusesPromises);

  const patientsWithData = patients.map((patient, index) => ({
    ...patient,
    latestEncounter: encountersResults[index],
    hivResult: hivStatusesResults[index] || null,
  }));

  return patientsWithData;
};

export function usePatientsLastEncounters(patients, encounterType, excludeColumns) {
  const { data, error } = useSWR(patients.length > 0 ? [patients, encounterType, excludeColumns] : null, () =>
    fetchPatientsData(patients, encounterType, excludeColumns),
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}
