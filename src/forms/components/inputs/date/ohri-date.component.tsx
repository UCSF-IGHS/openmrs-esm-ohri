import React from 'react';
import { OHRIFormFieldProps } from '../../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';

const OHRIDate: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const onDateChange = ([date]) => {
    setFieldValue(question.id, date);
    onChange(question.id, date);
    question.value = handler.handleFieldSubmission(question, date, encounterContext);
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

export default OHRIDate;
