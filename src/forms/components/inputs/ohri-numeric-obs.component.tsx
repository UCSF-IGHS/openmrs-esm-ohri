import React from 'react';
import { NumberInput } from 'carbon-components-react';
import { OhriFormField } from '../../types';

const OHRINumberObs: React.FC<{ questions: OhriFormField }> = ({ questions }) => {
  return (
    <div>
      <NumberInput
        id={questions.id}
        invalidText="Number is not valid"
        label={questions.label}
        max={questions.questionOptions.max}
        min={questions.questionOptions.min}
        step={1}
        value={1}
      />
    </div>
  );
};

export default OHRINumberObs;
