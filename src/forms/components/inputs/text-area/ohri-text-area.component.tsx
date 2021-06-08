import React, { useState } from 'react';
import { TextArea } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';

const OHRITextArea: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
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
      <div className={styles.formField}>
        <TextArea
          {...field}
          id={question.id}
          labelText={question.label}
          name={question.id}
          value={field.value || ''}
          className={styles.textInputOverrides}
          onFocus={() => setPreviousValue(field.value)}
          rows={question.questionOptions.rows || 4}
        />
      </div>
    )
  );
};

export default OHRITextArea;
