import { openmrsFetch, openmrsObservableFetch } from '@openmrs/esm-framework';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllergyData, Concept, HSTEncounter } from '../../../api/types';

export function getPatientAllergyByPatientUuid(
  patientUuid: string,
  allergyUuid: any,
  abortController: AbortController,
) {
  return openmrsFetch<AllergyData>(`/ws/rest/v1/patient/${patientUuid}/allergy/${allergyUuid.allergyUuid}?v=full`, {
    signal: abortController.signal,
  });
}

export function getAllergyAllergenByConceptUuid(allergyUuid: string) {
  return openmrsObservableFetch(`/ws/rest/v1/concept/${allergyUuid}?v=full`).pipe(
    map(({ data }) => data['setMembers']),
  );
}

export function saveHTSEncounter(abortController: AbortController, payload: HSTEncounter, encounterUuid?: string) {
  let url = '/ws/rest/v1/encounter';
  if (encounterUuid) {
    url = url + `/${encounterUuid}`;
  }
  return openmrsFetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: payload,
    signal: abortController.signal,
  });
}

export function getHTSLocations(): Observable<{ uuid: string; display: string }[]> {
  return openmrsObservableFetch(`/ws/rest/v1/location?tag=HTS%20Test%20Location&v=custom:(uuid,display)`).pipe(
    map(({ data }) => data['results']),
  );
}

export function getConcept(conceptUuid: string, v: string): Observable<any> {
  return openmrsObservableFetch(`/ws/rest/v1/concept/${conceptUuid}?v=${v}`).pipe(map(response => response['data']));
}
