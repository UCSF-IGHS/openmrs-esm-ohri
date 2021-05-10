import React from 'react'
import { OhriFormField } from '../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';

const OHRIDateObs: React.FC<{ questions: OhriFormField }> = ({ questions }) =>   {
    return (
    <div>
        <DatePicker dateFormat="m/d/Y" datePickerType="single">
      <DatePickerInput
        id="date-picker-calendar-id"
        placeholder="mm/dd/yyyy"
        labelText={questions.label}
        type="text"
      />
    </DatePicker>
        </div>
    )
}

export default OHRIDateObs

