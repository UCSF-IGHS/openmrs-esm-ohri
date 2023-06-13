import { openmrsFetch } from '@openmrs/esm-framework';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export function usePatientDeathStatus(patientUuid: string) {
  const [isDead, setIsDead] = useState(false);
  const { data: response } = useSWR<any, Error>(`/ws/rest/v1/person/${patientUuid}?v=custom:(dead)`, openmrsFetch);

  useEffect(() => {
    if (response) {
      setIsDead(response.data.dead);
    }
  }, [response]);
  return {
    isDead,
  };
}
