import { openmrsFetch } from '@openmrs/esm-framework';
import { OpenmrsEncounter } from '../api/types';
import { encounterRepresentation } from '../constants';
import useSWR from 'swr';
import uniqBy from 'lodash-es/uniqBy';

export function usePatientEncounters(patientUuid: string) {
  const query = `&patient=${patientUuid}&order=desc&startIndex=0`;
  const endpointUrl = `/ws/rest/v1/encounter?${query}&v=${encounterRepresentation}`;

  const { data, error, isValidating } = useSWR<{ data: { results: Array<OpenmrsEncounter> } }, Error>(
    endpointUrl,
    openmrsFetch,
  );

  console.log('=== enc endpoint', data?.data?.results[0]?.encounterType);
  console.log(
    '=== enc endpoint ee',
    uniqBy(data?.data?.results, (encounter: any) => encounter?.encounterType?.uuid),
  );
  return {
    encounterTypes: uniqBy(data?.data?.results, (encounter: any) => encounter?.encounterType?.uuid),
    error,
    isLoading: !data && !error,
    isValidating,
  };
}
