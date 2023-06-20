import { OpenmrsForm } from '@openmrs/openmrs-form-engine-lib';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetchFormsClobData } from '../api/api';

export function useFormJsonSchemas(openmrsForms: OpenmrsForm[]) {
  const [clobDataReferences, setClobDataReferences] = useState<{ formUuid: string; clobDataValueRef: string }[]>(null);
  const {
    data: responses,
    error,
    isLoading,
    isValidating,
  } = useSWR<any, Error>(
    clobDataReferences?.map((ref) => ref.clobDataValueRef),
    fetchFormsClobData,
  );

  useEffect(() => {
    if (openmrsForms?.length) {
      setClobDataReferences(
        openmrsForms
          .map((form) => ({
            clobDataValueRef: form.resources.find(({ name }) => name === 'JSON schema')?.valueReference,
            formUuid: form.uuid,
          }))
          .filter((clobRef) => clobRef.clobDataValueRef),
      );
    }
  }, [openmrsForms]);

  return {
    formJsonSchemas:
      responses?.map((response, index) => ({ ...response.data, uuid: clobDataReferences[index].formUuid })) || [],
    isLoading,
    error,
    isValidating,
  };
}
