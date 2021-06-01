import React from 'react';
import { OhriFormField } from '../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';

const OHRIDateObs: React.FC<{ questions: OhriFormField; onChange: any }> = ({ questions, onChange }) => {
  return (
    <div>
      <DatePicker dateFormat="m/d/Y" datePickerType="single">
        <DatePickerInput
          id="date-picker-calendar-id"
          placeholder="mm/dd/yyyy"
          labelText={questions.label}
          type="text"
          onChange={onChange}
        />
      </DatePicker>
    </div>
  );
};

export default OHRIDateObs;
