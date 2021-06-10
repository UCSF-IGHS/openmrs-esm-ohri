import React from 'react';
import { Toggle } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';

const OHRIToggle: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

  const handleChange = value => {
    setFieldValue(question.id, value);
    onChange(question.id, value);
    question.value = handler.handleFieldSubmission(question, value, encounterContext);
  };
  return (
    <div className={styles.formField}>
      <Toggle
        labelText={question.label}
        id={question.id}
        labelA={question.questionOptions.toggleOptions.labelFalse}
        labelB={question.questionOptions.toggleOptions.labelTrue}
        onToggle={handleChange}
        toggled={field.value}
      />
    </div>
  );
};

export default OHRIToggle;
