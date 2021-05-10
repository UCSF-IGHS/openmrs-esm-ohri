import React from 'react';
 import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { OhriFormField } from '../../types';
import styles from './_input.scss';

const OHRIRadioObs: React.FC<{ questions: OhriFormField }> = ({ questions }) => {

const radioContent = questions.questionOptions.answers

  return (
    <div className={styles.textContainer}>
      <FormGroup
  legendText={questions.label}
>
  <RadioButtonGroup
    defaultSelected="default-selected"
    legend="Group Legend"
    name="radio-button-group"
    valueSelected="default-selected"
  >
  {radioContent.map(function(answer, qAns) {
    return(
        <RadioButton
      id={answer.label}
      labelText={answer.label}
      value={answer.label}
    />
    )
      })}
  </RadioButtonGroup>
</FormGroup>
    </div>
  );
};

export default OHRIRadioObs;
