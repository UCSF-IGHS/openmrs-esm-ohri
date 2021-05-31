import React from 'react';
import { TextInput } from 'carbon-components-react';
import { OhriFormField } from '../../types';
import styles from '../_input.scss';
import { useField } from 'formik';

const OHRITextObs: React.FC<{ questions: OhriFormField; onChange: any }> = ({ questions, onChange }) => {
  const [field, meta] = useField(questions.id);
  return (
    <div className={styles.textContainer}>
      <TextInput {...field} id={questions.id} labelText={questions.label} name={questions.id} value={field.value} />
    </div>
  );
};

export default OHRITextObs;
