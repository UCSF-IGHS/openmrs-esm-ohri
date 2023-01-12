import { openmrsFetch } from '@openmrs/esm-framework';
import { AncVisitsReport, Patient, Relationship } from './types';
import { ancVisitsReport } from '../constants';
import useSWR from 'swr';

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
