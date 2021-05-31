import React, { useState } from 'react';
import { OhriFormField, OhriAnswerOptionType } from '../../types';
import { Select, SelectItem, SelectItemGroup } from 'carbon-components-react';
import styles from './_input.scss';

const OHRISelectObs: React.FC<{ questions: OhriFormField; onChange: any }> = ({ questions, onChange }) => {
  const selectContent = questions.questionOptions.answers;
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className={styles.textContainer}>
      <label htmlFor="s">{questions.label}</label>
      <Select id="s" defaultValue="Select Value" helperText="">
        <SelectItem text="Choose an option" value="placeholder-item" />

        {selectContent.map(function(answer: OhriAnswerOptionType, index) {
          return <SelectItem text={answer.label} value={answer.concept} key={index} />;
        })}
      </Select>
    </div>
  );
};

export default OHRISelectObs;
