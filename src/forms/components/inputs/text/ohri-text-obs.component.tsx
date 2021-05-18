import React, { useEffect, useState } from 'react';
import { TextInput } from 'carbon-components-react';
import { OhriFormField } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';

const OHRITextObs: React.FC<{ question: OhriFormField; onChange: any }> = ({ question, onChange }) => {
  const [field, meta] = useField(question.id);

  useEffect(() => {
    if (meta.touched) {
      onChange(question.id, field.value);
    }
  }, [field.value]);

  return (
    !question.isHidden && (
      <div className={styles.textContainer}>
        <TextInput
          {...field}
          id={question.id}
          labelText={question.label}
          name={question.id}
          value={field.value || ''}
        />
      </div>
    )
  );
};

export default OHRITextObs;
