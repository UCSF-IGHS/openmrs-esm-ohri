import React, { useState } from 'react';
import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { OhriFormField, OhriAnswerOptionType } from '../../types';
import styles from '../_input.scss';

const OHRIRadioObs: React.FC<{ questions: OhriFormField; onChange: any }> = ({ questions, onChange }) => {
  const radioContent = questions.questionOptions.answers;
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className={styles.textContainer}>
      <FormGroup legendText={questions.label}>
        <RadioButtonGroup defaultSelected="default-selected" name="radio-button-group" valueSelected="default-selected">
          {radioContent.map(function(answer: OhriAnswerOptionType, index) {
            return (
              <RadioButton
                id={answer.label}
                labelText={answer.label}
                value={answer.label}
                onChange={onChange}
                key={index}
              />
            );
          })}
        </RadioButtonGroup>
      </FormGroup>
    </div>
  );
};

export default OHRIRadioObs;
