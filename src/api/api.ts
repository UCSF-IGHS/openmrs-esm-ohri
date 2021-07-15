import { openmrsFetch } from '@openmrs/esm-framework';
import { careSetting } from '../constants';
import moment from 'moment';

export function fetchLastVisit(uuid: string) {
  return openmrsFetch(`/ws/fhir2/R4/Encounter?patient=${uuid}&_sort=-date&_count=1`);
}

export function fetchPatientList(offSet: number = 1, pageSize: number = 10) {
  return openmrsFetch(`/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}`);
}

export function fetchTodayClients() {
  let date = moment().format('YYYY-MM-DD');
  return openmrsFetch(`/ws/fhir2/R4/Encounter?date=${date}`);
}

export function fetchObservationsFromCodeConcept(codeConcept: string, valueConcept?: string, cutOffDays?: number) {
  let endDate = moment().format('YYYY-MM-DD');
  let startDate = moment()
    .subtract(cutOffDays, 'days')
    .format('YYYY-MM-DD');

  return openmrsFetch(
    `/ws/fhir2/R4/Observation?code=${codeConcept}${valueConcept ? `&value-concept=${valueConcept}` : ''}${
      cutOffDays ? `&_lastUpdated=ge${startDate}&_lastUpdated=le${endDate}` : ''
    }`,
  );
}
