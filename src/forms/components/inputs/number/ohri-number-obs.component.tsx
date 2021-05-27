import React, { useState } from 'react';
import { NumberInput } from 'carbon-components-react';
import { OhriFormField } from '../../../types';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';
import './ohri-numeric-obs.scss';

const OHRINumberObs: React.FC<{ question: OhriFormField; onChange: any }> = ({ question, onChange }) => {
  const [field, meta] = useField(question.id);
  const { encounterContext } = React.useContext(OHRIFormContext);
  const [previousValue, setPreviousValue] = useState();

  field.onBlur = () => {
    if (previousValue !== field.value) {
      onChange(question.id, field.value);
    }
    if (question['obs']) {
      if (encounterContext.sessionMode == 'edit' && !field.value) {
        question['obs'].voided = true;
      } else if (!field.value) {
        question['obs'] = undefined;
      } else {
        question['obs'].value = field.value;
        question['obs'].voided = false;
      }
    } else if (field.value) {
      question['obs'] = {
        person: encounterContext.patient.id,
        obsDatetime: encounterContext.date,
        concept: question.questionOptions.concept,
        location: encounterContext.location,
        order: null,
        groupMembers: [],
        voided: false,
        value: field.value,
      };
    }
  };

  return (
    <div className={styles.numberInputWrapper}>
      <NumberInput
        {...field}
        id={question.id}
        invalidText="Number is not valid"
        label={question.label}
        max={question.questionOptions.max || undefined}
        min={question.questionOptions.min || undefined}
        name={question.id}
        value={field.value || ''}
        onFocus={() => setPreviousValue(field.value)}
        allowEmpty={true}
        size="xl"
      />
    </div>
  );
};

export default OHRINumberObs;
