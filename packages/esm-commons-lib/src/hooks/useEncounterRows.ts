import useSWR from 'swr';
import { OpenmrsEncounter } from '../api/types';
import { useEffect, useState } from 'react';
import { openmrsFetch } from '@openmrs/esm-framework';
import { encounterRepresentation } from '../constants';

export function useEncounterRows(patientUuid: string, encounterType: string, encounterFilter: (encounter) => boolean) {
  const [encounters, setEncounters] = useState([]);
  const {
    data: response,
    error,
    isLoading,
    isValidating,
  } = useSWR<{ data: { results: OpenmrsEncounter[] } }, Error>(
    `/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${patientUuid}&v=${encounterRepresentation}`,
    openmrsFetch,
  );

  useEffect(() => {
    if (response) {
      // sort the encounters
      response.data.results.sort(
        (a, b) => new Date(b.encounterDatetime).getTime() - new Date(a.encounterDatetime).getTime(),
      );
      // apply filter
      if (encounterFilter) {
        setEncounters(response.data.results.filter((encounter) => encounterFilter(encounter)));
      }
      setEncounters([...response.data.results]);
    }
  }, [encounterFilter, response]);

  return {
    encounters,
    isLoading,
    error,
    isValidating,
  };
}
