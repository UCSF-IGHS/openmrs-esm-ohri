import React, { useEffect, useState } from 'react';
import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { OhriFormField, OhriAnswerOptionType } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';

const OHRIRadioObs: React.FC<{ question: OhriFormField; onChange: any; setFieldValue: any }> = ({
  question,
  onChange,
  setFieldValue,
}) => {
  const [field, meta] = useField(question.id);
  const radioContent = question.questionOptions.answers;

  const handleChange = value => {
    setFieldValue(question.id, value);
  };

  return (
    <div className={styles.textContainer}>
      <FormGroup legendText={question.label}>
        <RadioButtonGroup
          defaultSelected="default-selected"
          name={question.id}
          valueSelected={field.value}
          onChange={handleChange}>
          {radioContent.map((answer: OhriAnswerOptionType, index) => {
            return <RadioButton id={answer.label} labelText={answer.label} value={answer.concept} key={index} />;
          })}
        </RadioButtonGroup>
      </FormGroup>
    </div>
  );
};

export default OHRIRadioObs;
