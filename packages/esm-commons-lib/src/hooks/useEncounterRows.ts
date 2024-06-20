import { useCallback, useEffect, useState } from 'react';
import useSWRImmutable, { mutate } from 'swr';
import { type OpenmrsEncounter } from '../types';
import { openmrsFetch } from '@openmrs/esm-framework';
import { encounterRepresentation } from '../constants';

export function useEncounterRows(patientUuid: string, encounterType: string, encounterFilter: (encounter) => boolean) {
  const [encounters, setEncounters] = useState([]);
  const url = `/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${patientUuid}&v=${encounterRepresentation}`;

  const {
    data: response,
    error,
    isLoading,
  } = useSWRImmutable<{ data: { results: OpenmrsEncounter[] } }, Error>(url, openmrsFetch);

  useEffect(() => {
    if (response) {
      // sort the encounters
      response.data.results.sort(
        (a, b) => new Date(b.encounterDatetime).getTime() - new Date(a.encounterDatetime).getTime(),
      );
      // apply filter
      if (encounterFilter) {
        setEncounters(response.data.results.filter((encounter) => encounterFilter(encounter)));
      } else {
        setEncounters([...response.data.results]);
      }
    }
  }, [encounterFilter, response]);

  const onFormSave = useCallback(() => {
    mutate(url);
  }, [url]);

  return {
    encounters,
    isLoading,
    error,
    onFormSave,
  };
}
