import { Checkbox } from 'carbon-components-react';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFormField, RequiredType } from '../../../types';

export const OHRIUnspecified: React.FC<{
  question: OHRIFormField;
  setUnspecified: (value: boolean) => void;
}> = ({ question, setUnspecified }) => {
  const [field, meta] = useField(`${question.id}-unspecified`);
  const { setFieldValue } = React.useContext(OHRIFormContext);

  useEffect(() => {
    if (field.value) {
      setUnspecified && setUnspecified(true);
    } else {
      setUnspecified && setUnspecified(false);
    }
  }, [field.value]);

  useEffect(() => {
    if (question.value) {
      setFieldValue(`${question.id}-unspecified`, false);
    }
  }, [question.value]);

  const handleOnChange = useCallback(value => {
    setFieldValue(`${question.id}-unspecified`, value);
  }, []);

  return (
    <>
      <Checkbox
        id={`${question.id}-unspcified`}
        labelText="Unspecified"
        value="Unspecified"
        onChange={handleOnChange}
        checked={field.value}
      />
    </>
  );
};

export function canBeUnspecifiable(question: OHRIFormField): boolean {
  // return question.questionOptions.required?.toLowerCase() == RequiredType.YES_WITH_UNSPECIFIED.toLowerCase();
  // For now return `true` by default until the form json defition is updated
  // TODO: Remove this
  return true;
}
