import { openmrsFetch } from '@openmrs/esm-framework';
import { careSetting } from '../constants';

export function fetchLastVisit(uuid: string) {
  return openmrsFetch(`/ws/fhir2/R4/Encounter?patient=${uuid}&_sort=-date&_count=1`);
}
export function fetchPatientList(offSet: number = 1, pageSize: number = 10) {
  return openmrsFetch(`/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}`);
}
