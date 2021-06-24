import React, { useEffect } from 'react';
import { Toggle } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';

const OHRIToggle: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

  const handleChange = value => {
    setFieldValue(question.id, value);
    onChange(question.id, value);
    question.value = handler.handleFieldSubmission(question, value, encounterContext);
  };

  useEffect(() => {
    // The toogle input doesn't support blank values
    // by default, the value should be false
    if (!question.value && encounterContext.sessionMode == 'enter') {
      setFieldValue(question.id, false);
      question.value = handler.handleFieldSubmission(question, false, encounterContext);
    }
  }, []);

  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? <OHRIValueDisplay value={handler.getDisplayValue(question, field.value)} /> : <OHRIValueEmpty />}
    </div>
  ) : (
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
