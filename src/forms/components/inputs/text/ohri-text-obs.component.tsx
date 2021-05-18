import React, { useEffect, useState } from 'react';
import { TextInput } from 'carbon-components-react';
import { OhriFormField } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';

const OHRITextObs: React.FC<{ question: OhriFormField; onChange: any }> = ({ question, onChange }) => {
  const [field, meta] = useField(question.id);
  const { encounterContext } = React.useContext(OHRIFormContext);

  useEffect(() => {
    if (meta.touched) {
      console.log(getObs());
      question['obs'] = getObs();
      onChange(question.id, field.value);
    }
  }, [field.value]);

  const getObs = () => {
    return {
      person: encounterContext.patient.id,
      obsDatetime: encounterContext.date,
      concept: question.questionOptions.concept,
      location: encounterContext.location,
      order: null,
      groupMembers: [],
      voided: false,
      value: field.value,
    };
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
        />
      </div>
    )
  );
};

export default OHRITextObs;
