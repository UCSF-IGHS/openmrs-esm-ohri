import { useEffect, useState } from 'react';
import useSWRImmutable from 'swr';
import { fetchOpenMRSForms } from '../api.resource';
import { type OpenmrsForm } from '@openmrs/openmrs-form-engine-lib';
import { useFormJsonSchemas } from './useFormJsonSchemas';

export function useFormsJson(formNames: string[]) {
  const [openmrsForms, setOpenmrsForms] = useState<OpenmrsForm[]>([]);
  const { data: responses, isLoading: isLoadingOpenmrsForms } = useSWRImmutable<any, Error>(
    formNames,
    fetchOpenMRSForms,
  );
  const { formJsonSchemas, isLoading: isLoadingFormJsonSchemas } = useFormJsonSchemas(openmrsForms);

  useEffect(() => {
    if (responses?.length) {
      setOpenmrsForms(
        responses
          .map((response, index) => {
            const match = response?.data?.results.find((result) => !result.retired && result.name === formNames[index]);
            if (!match) {
              console.error('Form not found: ' + formNames[index]);
              return null;
            }
            return match;
          })
          .filter(Boolean),
      );
    }
  }, [formNames, responses]);

  return {
    formsJson: formJsonSchemas,
    isLoading: isLoadingOpenmrsForms || isLoadingFormJsonSchemas,
  };
}
