import { openmrsFetch } from '@openmrs/esm-framework';
import { useEffect, useState } from 'react';
import useSWRImmutable from 'swr';

export function usePatientTreatmentOutcome(patientUuid: string) {
  const [isEmptyOutcome, setIsEmptyOutcome] = useState(false);
  const outcome = '159786AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  const { data: response } = useSWRImmutable<any, Error>(
    `/ws/rest/v1/person/${patientUuid}&value-concept=${outcome}`,
    openmrsFetch,
  );
  //`/ws/rest/v1/encounter?encounterType=9a199b59-b185-485b-b9b3-a9754e65ae57&patient=20a99a88-64f5-471c-831f-f16b55c27bc2&v=full`
  //  `/ws/rest/v1/person/${patientUuid}&value-concept=${outcome}`
  useEffect(() => {
    if (response) {
      setIsEmptyOutcome(response.data);
    }
  }, [response]);
  return {
    isEmptyOutcome,
  };
}
