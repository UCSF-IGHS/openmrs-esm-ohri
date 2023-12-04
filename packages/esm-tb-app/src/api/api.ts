import { openmrsFetch, openmrsObservableFetch } from '@openmrs/esm-framework';

const BASE_WS_API_URL = '/ws/rest/v1/';

export function getPatientEnrolledPrograms(patientUuid: string) {
  return openmrsFetch(
    `${BASE_WS_API_URL}programenrollment?patient=${patientUuid}&v=custom:(uuid,display,program,dateEnrolled,dateCompleted,location:(uuid,display))`,
  ).then(({ data }) => {
    if (data) {
      return data;
    }
    return null;
  });
}

export function createProgramEnrollment(payload, abortController) {
  if (!payload) {
    return null;
  }
  const { program, patient, dateEnrolled, dateCompleted, location } = payload;
  return openmrsObservableFetch(`${BASE_WS_API_URL}programenrollment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { program, patient, dateEnrolled, dateCompleted, location },
    signal: abortController.signal,
  });
}

export function updateProgramEnrollment(programEnrollmentUuid: string, payload, abortController) {
  if (!payload && !payload.program) {
    return null;
  }
  const { program, dateEnrolled, dateCompleted, location } = payload;
  return openmrsObservableFetch(`${BASE_WS_API_URL}programenrollment/${programEnrollmentUuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: { dateEnrolled, dateCompleted, location },
    signal: abortController.signal,
  });
}
