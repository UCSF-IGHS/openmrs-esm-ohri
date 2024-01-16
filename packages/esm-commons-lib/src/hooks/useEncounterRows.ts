import useSWRImmutable, { mutate } from 'swr';
import { OpenmrsEncounter } from '../api/types';
import { useCallback, useMemo } from 'react';
import { openmrsFetch } from '@openmrs/esm-framework';
import { encounterRepresentation } from '../constants';
import isNull from 'lodash-es/isNull';

export function useEncounterRows(patientUuid: string, encounterType: string, encounterFilter: (encounter) => boolean) {
  const url = useMemo(
    () => `/ws/rest/v1/encounter?encounterType=${encounterType}&patient=${patientUuid}&v=${encounterRepresentation}`,
    [encounterType, patientUuid],
  );

  const {
    data: response,
    error,
    isLoading,
  } = useSWRImmutable<{ data: { results: OpenmrsEncounter[] } }, Error>(url, openmrsFetch);

  // Sort and filter directly in the render
  const sortedAndFilteredEncounters = useMemo(() => {
    if (isNull(response?.data?.results) || !isLoading) {
      const sortedEncounters = sortEncounters(response?.data?.results);
      return encounterFilter ? sortedEncounters.filter(encounterFilter) : sortedEncounters;
    }
    return [];
  }, [response, encounterFilter, isLoading]);

  const onFormSave = useCallback(() => {
    mutate(url);
  }, [url]);

  return {
    encounters: sortedAndFilteredEncounters,
    isLoading,
    error,
    onFormSave,
  };
}

function sortEncounters(encounters: OpenmrsEncounter[]): OpenmrsEncounter[] {
  if (encounters?.length > 0) {
    return [...encounters]?.sort(
      (a, b) => new Date(b.encounterDatetime).getTime() - new Date(a.encounterDatetime).getTime(),
    );
  } else {
    return [];
  }
}