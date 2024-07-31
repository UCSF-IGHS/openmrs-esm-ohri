import { openmrsFetch, useConfig } from '@openmrs/esm-framework';
import { fetchPatientsFinalHIVStatus, fetchPatientComputedConcept_HIV_Status } from '../../api.resource';
import { useState, useEffect } from 'react';

const usePatientHtsEncounters = (patientUuid: string) => {
  const [encounters, setEncounters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const config = useConfig();

  useEffect(() => {
    const fetchEncounters = async () => {
      const htsEncounterRepresentation =
        'custom:(uuid,encounterDatetime,location:(uuid,name),' +
        'encounterProviders:(uuid,provider:(uuid,name)),' +
        'obs:(uuid,obsDatetime,concept:(uuid,name:(uuid,name)),value:(uuid,name:(uuid,name))))';
      const antenatalEncounterType =
        config.encounterTypes.antenatalEncounterType || '677d1a80-dbbe-4399-be34-aa7f54f11405';

      if (!antenatalEncounterType) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      const query = `encounterType=${antenatalEncounterType}&patient=${patientUuid}`;

      try {
        const response = await openmrsFetch(`/ws/rest/v1/encounter?${query}&v=${htsEncounterRepresentation}`);
        setEncounters(response.data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (patientUuid) {
      fetchEncounters();
    }
  }, [patientUuid, config]);

  return { encounters, isLoading, isError };
};

const usePatientHivStatus = (patientUuid: string) => {
  const [hivStatus, setHivStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const config = useConfig();
  const { encounters, isLoading: encountersLoading, isError: encountersError } = usePatientHtsEncounters(patientUuid);

  useEffect(() => {
    const fetchHivStatus = async () => {
      const hivTestResultConceptUUID =
        config.obsConcepts.hivTestResultConceptUUID || '159427AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
      const positiveUUID = config.obsConcepts.positiveUUID || '138571AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
      const negativeUUID = config.obsConcepts.negativeUUID || '664AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

      let hivStatus = '';

      if (encountersError) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      if (!encountersLoading) {
        try {
          encounters.forEach((encounter) => {
            const htsTestResult = encounter.obs.find(
              (observation) => observation.concept.uuid === hivTestResultConceptUUID,
            );

            if (htsTestResult) {
              if (htsTestResult.value.uuid === positiveUUID) {
                hivStatus = 'positive';
              } else if (htsTestResult.value.uuid === negativeUUID) {
                hivStatus = 'negative';
              }
            }
          });

          if (!hivStatus) {
            const hivFinalStatus = await fetchPatientsFinalHIVStatus(patientUuid);
            const computedConcept = await fetchPatientComputedConcept_HIV_Status(patientUuid);

            if (
              hivFinalStatus.toLowerCase().includes('positive') ||
              computedConcept.toLowerCase().includes('positive')
            ) {
              hivStatus = 'positive';
            } else if (
              hivFinalStatus.toLowerCase().includes('negative') ||
              computedConcept.toLowerCase().includes('negative')
            ) {
              hivStatus = 'negative';
            }
          }

          setHivStatus(hivStatus);
        } catch (error) {
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (patientUuid) {
      fetchHivStatus();
    }
  }, [patientUuid, encountersLoading, encountersError, encounters, config]);

  return { hivStatus, isLoading, isError };
};

export { usePatientHtsEncounters, usePatientHivStatus };
