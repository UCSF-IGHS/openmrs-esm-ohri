import React, { useEffect, useState } from 'react';
import { TextInput } from 'carbon-components-react';
import { OhriFormField } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';

const OHRITextObs: React.FC<{ question: OhriFormField; onChange: any }> = ({ question, onChange }) => {
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
    !question.isHidden && (
      <div className={styles.textContainer}>
        <TextInput
          {...field}
          id={question.id}
          labelText={question.label}
          name={question.id}
          value={field.value || ''}
          onFocus={() => setPreviousValue(field.value)}
        />
      </div>
    )
  );
};

export default OHRITextObs;
