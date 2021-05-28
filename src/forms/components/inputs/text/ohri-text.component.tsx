import React, { useState } from 'react';
import { TextInput } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';

const OHRIText: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { encounterContext } = React.useContext(OHRIFormContext);
  const [previousValue, setPreviousValue] = useState();

  field.onBlur = () => {
    if (previousValue !== field.value) {
      onChange(question.id, field.value);
    }
    question.value = handler.handleFieldSubmission(question, field.value, encounterContext);
  };

  return (
    !question.isHidden && (
      <div className={styles.textContainer}>
        <TextInput
          {...field}
          id={question.id}
          labelText={question.label}
          name={question.id}
          value={field.value || ''}
          onFocus={() => setPreviousValue(field.value)}
        />
      </div>
    )
  );
};

export default OHRIText;
