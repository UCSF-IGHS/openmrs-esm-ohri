/** @module @category API */
import type { Visit } from '@openmrs/esm-api';
import useSWR from 'swr';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useMemo } from 'react';
import { openmrsFetch } from '@openmrs/esm-framework';

dayjs.extend(isToday);

export interface VisitReturnType {
  error: Error;
  mutate: () => void;
  isValidating: boolean;
  currentVisit: Visit | null;
  isLoading: boolean;
}

export function useCurrentVisit(patientUuid: string): VisitReturnType {
  const defaultVisitCustomRepresentation =
    'custom:(uuid,encounters:(uuid,diagnoses:(uuid,display,rank,diagnosis),form:(uuid,display),encounterDatetime,orders:full,obs:full,encounterType:(uuid,display,viewPrivilege,editPrivilege),encounterProviders:(uuid,display,encounterRole:(uuid,display),provider:(uuid,person:(uuid,display)))),visitType:(uuid,name,display),startDatetime,stopDatetime,patient,attributes:(attributeType:ref,display,uuid,value)';

  const activeVisitUrlSuffix = `?patient=${patientUuid}&v=${defaultVisitCustomRepresentation}&includeInactive=false`;

  const {
    data: activeData,
    error: activeError,
    mutate: activeMutate,
    isValidating: activeIsValidating,
  } = useSWR<{
    data: Visit | { results: Array<Visit> };
  }>(patientUuid ? `/ws/rest/v1/visit${activeVisitUrlSuffix}` : null, openmrsFetch);

  const activeVisit = useMemo(
    () => activeData?.data.results.find((visit) => visit.stopDatetime === null) ?? null,
    [activeData],
  );

  return {
    error: activeError,
    mutate: () => {
      activeMutate();
    },
    isValidating: activeIsValidating,
    currentVisit: activeVisit,
    isLoading: Boolean(!activeData && !activeError),
  };
}
