import { openmrsFetch } from '@openmrs/esm-framework';
import { AncVisitsReport, Patient, PatientIdentifier, Relationship } from './types';
import { ancVisitsReport } from '../constants';
import useSWR from 'swr';
import { fetchPatientRelationships } from '@ohri/openmrs-esm-ohri-commons-lib';

const BASE_WS_API_URL = '/ws/rest/v1/';

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
export function ancVisitsReportCount(pTrackerID: string, patientUuid: string) {
  return openmrsFetch(
    `/ws/rest/v1/reportingrest/dataSet/${ancVisitsReport}?patient_uuid=${patientUuid}&ptracker_id=${pTrackerID}`,
  );
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
    `${BASE_WS_API_URL}reportingrest/dataSet/914878d8-45e4-4785-9a5c-8c6695382a4e?ptracker_id=${pTrackerId}&person_uuid=${patientUuid}`,
  ).then(({ data }) => {
    if (data) {
      return data;
    }
    return null;
  });
}

export function fetchMotherHIVStatus(patientUuid: string, pTrackerId: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL}reportingrest/dataSet/d6453c84-4122-467f-8533-83e7d15790dc?person_uuid=${patientUuid}&ptracker_id=${pTrackerId}`,
  ).then(({ data }) => {
    if (data) {
      return data;
    }
    return null;
  });
}

// Get family relationships from patient uuid
export async function getFamilyRelationships(patientUuid: string) {
  return await fetchPatientRelationships(patientUuid);
}
