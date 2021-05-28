import React from 'react';
import { OHRIFormField } from '../../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';

const OHRIDateObs: React.FC<{ question: OHRIFormField; onChange: any }> = ({ question, onChange }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const onDateChange = ([date]) => {
    setFieldValue(question.id, date);
    onChange(question.id, date);
    if (question['obs']) {
      if (encounterContext.sessionMode == 'edit' && !date) {
        question['obs'].voided = true;
      } else {
        question['obs'].value = date;
        question['obs'].voided = false;
      }
    } else {
      question['obs'] = {
        person: encounterContext.patient.id,
        obsDatetime: encounterContext.date,
        concept: question.questionOptions.concept,
        location: encounterContext.location,
        order: null,
        groupMembers: [],
        voided: false,
        value: date,
      };
    }
  };

  return (
    <div className={styles.formField}>
      <DatePicker datePickerType="single" onChange={onDateChange}>
        <DatePickerInput
          id="date-picker-calendar-id"
          placeholder="mm/dd/yyyy"
          labelText={question.label}
          value={field.value instanceof Date ? field.value.toLocaleDateString(window.navigator.language) : field.value}
        />
      </DatePicker>
    </div>
  );
};

export default OHRIDateObs;
