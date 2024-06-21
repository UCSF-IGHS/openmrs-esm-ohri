import { type OpenmrsForm } from '@openmrs/openmrs-form-engine-lib';
import { useEffect, useMemo, useState } from 'react';
import useSWRImmutable from 'swr';
import { fetchFormsClobData } from '../api.resource';

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
          .map((form) => {
            const clobDataValueRef = form.resources.find(({ name }) => name === 'JSON schema')?.valueReference;
            if (!clobDataValueRef) {
              console.error('JSON Schema resource not found for form: ' + form.name);
            }
            return {
              clobDataValueRef,
              formUuid: form.uuid,
            };
          })
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
  }, [responses, clobDataReferences]);

  return {
    formJsonSchemas,
    isLoading,
    error,
  };
}
