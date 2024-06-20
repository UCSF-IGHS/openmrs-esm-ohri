import { fetchPatientLastEncounter } from '../../api/api';

export function fetchLatestEncountersOfTypes(patientUuid: string, encounterTypes: string[]) {
  return Promise.all(encounterTypes?.map((type) => fetchPatientLastEncounter(patientUuid, type)));
}
