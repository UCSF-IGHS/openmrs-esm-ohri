import { openmrsFetch, getConfig } from '@openmrs/esm-framework';
import { fetchPatientRelationships } from '@ohri/openmrs-esm-ohri-commons-lib';
import { type Patient, type PatientIdentifier, type Relationship } from './types';

const BASE_WS_API_URL = '/ws/rest/v1/';
const config = await getConfig('@ohri/openmrs-esm-ohri-pmtct-app');

export function generateIdentifier(source: string) {
  return openmrsFetch(`/ws/rest/v1/idgen/identifiersource/${source}/identifier`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: {},
  });
}

export function savePatient(patient: Patient) {
  return openmrsFetch(`/ws/rest/v1/patient`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: patient,
  });
}

export function savePatients(patients: Array<Patient>) {
  return Promise.all(patients.map((patient) => savePatient(patient)));
}

export function saveRelationship(relationship: Relationship) {
  return openmrsFetch('/ws/rest/v1/relationship', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: relationship,
  });
}

// Get ANC visits report count with pTrackerID and patientUuid
export function getAncVisitCount(pTrackerID: string, patientUuid: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL}reportingrest/dataSet/${config.obsConcepts.ancVisitsReport}?ptracker_id=${pTrackerID}&patient_uuid=${patientUuid}`,
  ).then(({ data }) => {
    if (data) {
      return data;
    }
    return null;
  });
}

export function fetchPatientIdentifiers(patientUuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}/patient/${patientUuid}/identifier`).then(({ data }) => {
    if (data.results.length) {
      return data.results;
    }
    return null;
  });
}

export function saveIdentifier(identifier: PatientIdentifier, patientUuid: string) {
  return openmrsFetch(`${BASE_WS_API_URL}patient/${patientUuid}/identifier`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: identifier,
  });
}

export function getEstimatedDeliveryDate(patientUuid: string, pTrackerId: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL}reportingrest/dataSet/${config.obsConcepts.eddReport}?ptracker_id=${pTrackerId}&patient_uuid=${patientUuid}`,
  ).then(({ data }) => {
    if (data) {
      return data;
    }
    return null;
  });
}

export function getIdentifierInfo(identifier: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL}patient?identifier=${identifier}&v=custom:(identifiers:(identifier,identifierType:(uuid,display)),person:(uuid,display))`,
  ).then(({ data }) => {
    if (data) {
      return data;
    }
    return null;
  });
}

export function fetchMotherHIVStatus(patientUuid: string, pTrackerId: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL}reportingrest/dataSet/${config.obsConcepts.motherHivStatusReport}?person_uuid=${patientUuid}&ptracker_id=${pTrackerId}`,
  ).then(({ data }) => {
    if (data) {
      return data;
    }
    return null;
  });
}

export function fetchChildLatestFinalOutcome(childUuid: string, conceptUuid: string, encounterTypeUuid) {
  let params = `patient=${childUuid}&code=${conceptUuid}${
    encounterTypeUuid ? `&encounter.type=${encounterTypeUuid}` : ''
  }`;
  // the latest obs
  params += '&_sort=-_lastUpdated&_count=1';
  return openmrsFetch(`/ws/fhir2/R4/Observation?${params}`).then(({ data }) => {
    return data.entry?.length ? data.entry[0].resource.valueCodeableConcept.coding[0]?.display : null;
  });
}

// Get family relationships from patient uuid
export async function getFamilyRelationships(patientUuid: string) {
  return await fetchPatientRelationships(patientUuid);
}
