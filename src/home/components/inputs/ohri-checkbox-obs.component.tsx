import React, { useState } from 'react';
import { FormGroup, Checkbox, RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { OhriFormField, OhriAnswerOptionType } from '../../types';
import styles from './_input.scss';

const OHRICheckboxObs: React.FC<{ questions: OhriFormField; onChange: any }> = ({ questions, onChange }) => {
  const checkboxContent = questions.questionOptions.answers;
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <>
      <div className={styles.textContainer}>
        <fieldset className="bx--fieldset">
          <legend className="bx--label">{questions.label}</legend>
          {checkboxContent.map(function(answer: OhriAnswerOptionType, index) {
            return <Checkbox labelText={answer.label} id={answer.concept} onChange={onChange} key={index} />;
          })}
        </fieldset>
      </div>
    </>
  );
};

export default OHRICheckboxObs;
