import { FormGroup } from 'carbon-components-react';
import Checkbox from 'carbon-components-react/lib/components/Checkbox';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OhriAnswerOptionType, OhriFormField } from '../../../types';

export const OHRIMultiSelectObs: React.FC<{ question: OhriFormField; onChange: any }> = ({ question, onChange }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

  const handleCheckboxChange = (checked, id, event) => {
    if (field.value.includes(id)) {
      setFieldValue(
        question.id,
        field.value.filter(value => value !== id),
      );
    } else {
      setFieldValue(question.id, [...field.value, id]);
    }
  };

  useEffect(() => {
    question['obs'] = field.value.map(value => ({
      person: encounterContext.patient.id,
      obsDatetime: encounterContext.date,
      concept: question.questionOptions.concept,
      location: encounterContext.location,
      order: null,
      groupMembers: [],
      voided: false,
      value: value,
    }));
  }, [field.value]);

  return (
    <div>
      <FormGroup legendText={question.label}>
        {question.questionOptions.answers.map((option: OhriAnswerOptionType, index) => (
          <Checkbox
            id={option.concept}
            labelText={option.label}
            value={option.concept}
            key={index}
            onChange={handleCheckboxChange}
          />
        ))}
      </FormGroup>
    </div>
  );
};
