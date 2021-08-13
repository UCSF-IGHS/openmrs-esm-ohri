import { Checkbox } from 'carbon-components-react';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';
import { OHRIFieldValidator } from '../../../ohri-form-validator';
import { OHRIFormField } from '../../../types';

export const OHRIUnspecified: React.FC<{
  question: OHRIFormField;
}> = ({ question }) => {
  const [field, meta] = useField(`${question.id}-unspecified`);
  const { setFieldValue } = React.useContext(OHRIFormContext);
  const [previouslyUnspecified, setPreviouslyUnspecified] = useState(false);

  useEffect(() => {
    if (field.value) {
      setPreviouslyUnspecified(true);
      question['submission'] = {
        unspecified: true,
        errors: [],
      };
      let emptyValue = null;
      switch (question.questionOptions.rendering) {
        case 'date':
          emptyValue = '';
          break;
        case 'checkbox':
          emptyValue = [];
      }
      setFieldValue(question.id, emptyValue);
      question.value = null;
    } else if (previouslyUnspecified && !question.value) {
      question['submission'] = {
        unspecified: false,
        errors: OHRIFieldValidator.validate(question, null),
      };
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
    <div className={styles.unspecified}>
      <Checkbox
        id={`${question.id}-unspcified`}
        labelText="Unspecified"
        value="Unspecified"
        onChange={handleOnChange}
        checked={field.value}
      />
    </div>
  );
};

export function canBeUnspecifiable(question: OHRIFormField): boolean {
  // return question.questionOptions.required?.toLowerCase() == RequiredType.YES_WITH_UNSPECIFIED.toLowerCase();
  // For now return `true` by default until the form json defition is updated
  // TODO: Remove this
  return true;
}
