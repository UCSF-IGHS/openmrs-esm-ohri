import { useField } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFormFieldProps } from '../../../types';

const OHRIFixedValue: React.FC<OHRIFormFieldProps> = ({ question, handler }) => {
  const { encounterContext, setFieldValue, isFieldInitializationComplete } = React.useContext(OHRIFormContext);
  const [field] = useField(question.id);
  const currentFixedValue = useMemo(() => question.value, []);

  useEffect(() => {
    if (!field.value) {
      setFieldValue(question.id, currentFixedValue);
    }
  }, [field.value]);

  useEffect(() => {
    if (question.value && typeof question.value == 'string' && isFieldInitializationComplete) {
      delete question.value;
      question.value = handler.handleFieldSubmission(question, currentFixedValue, encounterContext);
    } else if (typeof question.value == 'object' && question.value.value?.uuid != currentFixedValue) {
      // edit obs
      question.value = handler.handleFieldSubmission(question, currentFixedValue, encounterContext);
    }
  }, [question.value, isFieldInitializationComplete]);
  return <></>;
};

export default OHRIFixedValue;
