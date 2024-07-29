import { fhirBaseUrl, openmrsFetch } from '@openmrs/esm-framework';
import useSWR from 'swr';

export function usePatientsFinalHIVStatus(
  patientUuid: string,
  finalHIVCodeConcept: string,
  finalPositiveHIVValueConcept: string,
) {
  const url = `${fhirBaseUrl}/Observation?code=${finalHIVCodeConcept}&value-concept=${finalPositiveHIVValueConcept}&patient=${patientUuid}&_sort=-date&_count=1`;
  const { data, error, isLoading, mutate } = useSWR<{ data: any }, Error>(url, openmrsFetch);

  const hivStatusResult = data?.data?.entry[0].resource.valueCodeableConcept.coding[0].display;
  const hivStatus = hivStatusResult.toLowerCase().includes('positive') ? true : false;

  return { hivStatus: hivStatus, isLoading: isLoading, error: error };
}
