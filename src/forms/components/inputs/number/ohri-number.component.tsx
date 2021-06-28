import React, { useState } from 'react';
import { NumberInput } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';

const OHRINumber: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { encounterContext } = React.useContext(OHRIFormContext);
  const [previousValue, setPreviousValue] = useState();

  field.onBlur = () => {
    if (previousValue !== field.value) {
      onChange(question.id, field.value);
      question.value = handler.handleFieldSubmission(question, field.value, encounterContext);
    }
  };

  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? <OHRIValueDisplay value={field.value} /> : <OHRIValueEmpty />}
    </div>
  ) : (
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

export default OHRINumber;
