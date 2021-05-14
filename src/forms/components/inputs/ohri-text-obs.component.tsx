import React from 'react';
import { TextInput } from 'carbon-components-react';
import { OhriFormField } from '../../types';
import styles from './_input.scss';

const OHRITextObs: React.FC<{ questions: OhriFormField; onChange: any }> = ({ questions, onChange }) => {

  return (
    <div className={styles.textContainer}>
      <TextInput id={questions.id} labelText={questions.label} onChange={onChange} />
    </div>
  );
};

export default OHRITextObs;
