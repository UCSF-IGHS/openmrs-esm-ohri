import useSWR from 'swr';
import { OpenmrsEncounter } from '../api/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { openmrsFetch } from '@openmrs/esm-framework';
import { encounterRepresentation } from '../constants';

export function useEncounterRows(
  patientUuid: string,
  encounterType: string,
  encounterFilter: (encounter) => boolean,
  afterFormSaveAction: () => void,
) {
  const [encounters, setEncounters] = useState([]);
  const url = `/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${patientUuid}&v=${encounterRepresentation}`;

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<{ data: { results: OpenmrsEncounter[] } }, Error>(url, openmrsFetch);

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
    mutate();
    afterFormSaveAction && afterFormSaveAction();
  }, [afterFormSaveAction, mutate]);

  return {
    encounters,
    isLoading,
    error,
    onFormSave,
  };
}
