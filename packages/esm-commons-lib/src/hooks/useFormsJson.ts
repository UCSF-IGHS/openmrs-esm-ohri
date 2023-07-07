import { useEffect, useState } from 'react';
import useSWRImmutable from 'swr';
import { fetchOpenMRSForms } from '../api/api';
import { OpenmrsForm } from '@openmrs/openmrs-form-engine-lib';
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
      setOpenmrsForms(responses.map((response) => response.data.results[0]).filter(Boolean));
    }
  }, [responses]);

  return {
    formsJson: formJsonSchemas,
    isLoading: isLoadingOpenmrsForms || isLoadingFormJsonSchemas,
  };
}
