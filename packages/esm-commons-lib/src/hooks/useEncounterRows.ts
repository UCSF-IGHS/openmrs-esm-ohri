import useSWR from 'swr';
import { OpenmrsEncounter } from '../api/types';
import { useCallback, useEffect, useState } from 'react';
import { openmrsFetch, OpenmrsResource } from '@openmrs/esm-framework';
import { encounterRepresentation } from '../constants';

interface EncounterResponse {
  results: OpenmrsEncounter[];
  totalCount?: number;
}

export function useEncounterRows(
  patientUuid: string,
  encounterType: string,
  encounterFilter: (encounter) => boolean,
  afterFormSaveAction: () => void,
  pageSize?: number,
  pageNumber?: number,
) {
  const [encounters, setEncounters] = useState([]);
  const startIndex = (pageNumber - 1) * pageSize;

  const url = `/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${patientUuid}&v=${encounterRepresentation}&totalCount=true&limit=${pageSize}&startIndex=${startIndex}`;

  const { data: response, error, isLoading, mutate } = useSWR<{ data: EncounterResponse }, Error>(url, openmrsFetch);

  useEffect(() => {
    if (response) {
      response.data.results.sort(
        (a, b) => new Date(b.encounterDatetime).getTime() - new Date(a.encounterDatetime).getTime(),
      );

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
    total: response?.data?.totalCount,
    isLoading,
    error,
    onFormSave,
  };
}
