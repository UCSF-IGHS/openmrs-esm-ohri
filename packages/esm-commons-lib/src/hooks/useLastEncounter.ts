import { openmrsFetch } from '@openmrs/esm-framework';
import { type OpenmrsEncounter } from '../types';
import { encounterRepresentation } from '../constants';
import useSWR from 'swr';

export function useLastEncounter(patientUuid: string, encounterType: string) {
  const query = `encounterType=${encounterType}&patient=${patientUuid}&limit=1&order=desc&startIndex=0`;
  const endpointUrl = `/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`;

  const { data, error, isValidating } = useSWR<{ data: { results: Array<OpenmrsEncounter> } }, Error>(
    endpointUrl,
    openmrsFetch,
  );

  return {
    lastEncounter: data ? data?.data?.results.shift() : null,
    error,
    isLoading: !data && !error,
    isValidating,
  };
}
