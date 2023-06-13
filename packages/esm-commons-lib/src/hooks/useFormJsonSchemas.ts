import { OpenmrsForm } from '@openmrs/openmrs-form-engine-lib';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetchFormsClobData } from '../api/api';

export function useFormJsonSchemas(openmrsForms: OpenmrsForm[]) {
  const [clobDataReferences, setClobDataReferences] = useState(null);
  const {
    data: responses,
    error,
    isLoading,
    isValidating,
  } = useSWR<any, Error>(clobDataReferences, fetchFormsClobData);

  useEffect(() => {
    if (openmrsForms?.length) {
      setClobDataReferences(
        openmrsForms
          .map((form) => form.resources.find(({ name }) => name === 'JSON schema')?.valueReference)
          .filter(Boolean),
      );
    }
  }, [openmrsForms]);

  return {
    formJsonSchemas: responses?.map((response) => response.data) || [],
    isLoading,
    error,
    isValidating,
  };
}
