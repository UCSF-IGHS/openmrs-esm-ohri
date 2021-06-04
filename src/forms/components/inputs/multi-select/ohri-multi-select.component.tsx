import { FormGroup } from 'carbon-components-react';
import Checkbox from 'carbon-components-react/lib/components/Checkbox';
import { useField } from 'formik';
import React from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFormFieldProps } from '../../../types';

export const OHRIMultiSelect: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

  const handleCheckboxChange = (checked, id, event) => {
    if (checked) {
      setFieldValue(question.id, [...field.value, id]);
    } else {
      setFieldValue(
        question.id,
        field.value.filter(value => value !== id),
      );
    }
    question.value = handler.handleFieldSubmission(question, { checked: checked, id: id }, encounterContext);
  };

  return (
    <div>
      <FormGroup legendText={question.label}>
        {question.questionOptions.answers.map((option, index) => (
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
