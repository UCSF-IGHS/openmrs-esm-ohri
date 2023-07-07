import { OpenmrsForm } from '@openmrs/openmrs-form-engine-lib';
import { useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr';
import { fetchFormsClobData } from '../api/api';

export function useFormJsonSchemas(openmrsForms: OpenmrsForm[]) {
  const [clobDataReferences, setClobDataReferences] = useState<{ formUuid: string; clobDataValueRef: string }[]>(null);
  const [formJsonSchemas, setFormJsonSchemas] = useState([]);
  const schemaValueRef = useMemo(
    () => clobDataReferences?.map((refMap) => refMap.clobDataValueRef),
    [clobDataReferences],
  );
  const { data: responses, error, isLoading } = useSWRImmutable<any, Error>(schemaValueRef, fetchFormsClobData);

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

  useEffect(() => {
    if (responses?.length) {
      setFormJsonSchemas(
        responses.map((response, index) => ({ ...response.data, uuid: clobDataReferences[index].formUuid })),
      );
    }
  }, [responses]);

  return {
    formJsonSchemas,
    isLoading,
    error,
  };
}
