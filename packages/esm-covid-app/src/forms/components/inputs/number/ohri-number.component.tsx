import React, { useEffect, useMemo, useState } from 'react';
import { NumberInput } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';
import { isTrue } from '../../../utils/boolean-utils';
import { fieldRequiredErrCode } from '../../../validators/ohri-form-validator';

const OHRINumber: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [previousValue, setPreviousValue] = useState();
  const [errors, setErrors] = useState([]);
  const isFieldRequiredError = useMemo(() => errors[0]?.errCode == fieldRequiredErrCode, [errors]);

  useEffect(() => {
    if (question['submission']?.errors) {
      setErrors(question['submission']?.errors);
    }
  }, [question['submission']]);

  field.onBlur = () => {
    if (field.value && question.unspecified) {
      setFieldValue(`${question.id}-unspecified`, false);
    }
    if (previousValue !== field.value) {
      onChange(question.id, field.value, setErrors);
      question.value = handler.handleFieldSubmission(question, field.value, encounterContext);
    }
  };

  return encounterContext.sessionMode == 'view' || isTrue(question.readonly) ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? <OHRIValueDisplay value={field.value} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    !question.isHidden && (
      <div className={styles.numberInputWrapper}>
        <NumberInput
          {...field}
          id={question.id}
          invalid={!isFieldRequiredError && errors.length > 0}
          invalidText={errors[0]?.errMessage}
          label={question.label}
          max={question.questionOptions.max || undefined}
          min={question.questionOptions.min || undefined}
          name={question.id}
          value={field.value || ''}
          onFocus={() => setPreviousValue(field.value)}
          allowEmpty={true}
          size="xl"
          disabled={question.disabled}
          className={isFieldRequiredError ? styles.errorLabel : ''}
        />
      </div>
    )
  );
};

export default OHRINumber;
