import React from 'react';
import { OhriFormField } from '../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';

const OHRIDateObs: React.FC<{ question: OhriFormField; onChange: any; setFieldValue: any }> = ({
  question,
  onChange,
  setFieldValue,
}) => {
  const [field, meta] = useField(question.id);
  const onDateChange = ([date]) => {
    setFieldValue(question.id, date);
  };

  return (
    <div>
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
