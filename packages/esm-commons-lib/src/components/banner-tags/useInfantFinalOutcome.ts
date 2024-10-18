import { useState, useEffect } from 'react';
import { openmrsFetch, useConfig } from '@openmrs/esm-framework';

export const usePatientOutcome = (patientUuid: string) => {
  const [patientOutcome, setPatientOutcome] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const config = useConfig();

  useEffect(() => {
    const fetchPatientOutcome = async () => {
      try {
        const response = await fetch(
          `/openmrs/ws/rest/v1/obs?patient=${patientUuid}&concept=${config.obsConcepts.outcomeStatus}&v=full`,
        );
        const data = await response.json();

        if (data.results.length > 0) {
          const outcome = data.results[0].value;
          setPatientOutcome(outcome.display ?? null);
        } else {
          setPatientOutcome(null);
        }
      } catch (error) {
        console.error('Failed to fetch patient outcome:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatientOutcome();
  }, [patientUuid, config.obsConcepts.outcomeStatus]);

  return { patientOutcome, isLoading, isError };
};
