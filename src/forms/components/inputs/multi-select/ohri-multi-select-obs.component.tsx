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
    if (!question['obs']) {
      question['obs'] = [];
    }

    if (checked) {
      const obs = question['obs'].find(o => o.value.uuid == id);
      setFieldValue(question.id, [...field.value, id]);
      if (obs && obs.voided) {
        obs.voided = false;
      } else {
        question['obs'].push({
          person: encounterContext.patient.id,
          obsDatetime: encounterContext.date,
          concept: question.questionOptions.concept,
          location: encounterContext.location,
          order: null,
          groupMembers: [],
          voided: false,
          value: id,
        });
      }
    } else {
      setFieldValue(
        question.id,
        field.value.filter(value => value !== id),
      );
      const obs = question['obs'].find(o => o.value.uuid == id);
      if (obs && encounterContext.sessionMode == 'edit') {
        obs.voided = true;
      } else {
        question['obs'] = question['obs'].filter(o => o.value !== id);
      }
    }
  };

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
            checked={field.value.includes(option.concept)}
          />
        ))}
      </FormGroup>
    </div>
  );
};
