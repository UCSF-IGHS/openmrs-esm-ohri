import React, { useEffect, useMemo, useState } from 'react';
import { OHRIFormFieldProps } from '../../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';
import { canBeUnspecifiable, OHRIUnspecified } from '../unspecified/ohri-unspecified.component';
import { validateFieldValue } from '../../../ohri-form-validators';
import { UnspecifiedValue } from '../../../constants';

const OHRIDate: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [fieldError, setFieldError] = useState(null);
  const [unspecified, setUnspecified] = useState(false);
  const [previoulsySpecified, setPrevioulsySpecified] = useState(false);

  useEffect(() => {
    if (unspecified) {
      setPrevioulsySpecified(true);
      setFieldError(null);
      setFieldValue(question.id, '');
      onChange(question.id, null);
      question.value = null;
      question['submission'] = {
        specified: true,
        errors: null,
      };
    } else if (previoulsySpecified) {
      setFieldError(validateFieldValue(field.value, question));
    }
  }, [unspecified]);

  useEffect(() => {
    if (question['submission']?.errors) {
      setFieldError(question['submission']?.errors);
    }
  }, [question['submission']]);

  const onDateChange = ([date]) => {
    const refinedDate = date == UnspecifiedValue ? date : new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    setFieldValue(question.id, refinedDate);
    setFieldError(validateFieldValue(refinedDate, question));
    onChange(question.id, refinedDate);
    question.value = handler.handleFieldSubmission(question, refinedDate, encounterContext);
  };
  const { placeHolder, carbonDateformat } = useMemo(() => {
    const formatObj = new Intl.DateTimeFormat(window.navigator.language).formatToParts(new Date());
    const placeHolder = formatObj
      .map(obj => {
        switch (obj.type) {
          case 'day':
            return 'dd';
          case 'month':
            return 'mm';
          case 'year':
            return 'yyyy';
          default:
            return obj.value;
        }
      })
      .join('');
    const carbonDateformat = formatObj
      .map(obj => {
        switch (obj.type) {
          case 'day':
            return 'd';
          case 'month':
            return 'm';
          case 'year':
            return 'Y';
          default:
            return obj.value;
        }
      })
      .join('');
    return { placeHolder: placeHolder, carbonDateformat: carbonDateformat };
  }, []);

  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? (
        <OHRIValueDisplay
          value={field.value instanceof Date ? field.value.toLocaleDateString(window.navigator.language) : field.value}
        />
      ) : (
        <OHRIValueEmpty />
      )}
    </div>
  ) : (
    <div className={styles.formField}>
      <DatePicker
        datePickerType="single"
        onChange={onDateChange}
        className={`${styles.datePickerOverrides} ${fieldError ? styles.errorLabel : ''}`}
        dateFormat={carbonDateformat}>
        <DatePickerInput
          id={question.id}
          placeholder={placeHolder}
          labelText={question.label}
          value={field.value instanceof Date ? field.value.toLocaleDateString(window.navigator.language) : field.value}
        />
      </DatePicker>
      {canBeUnspecifiable(question) && <OHRIUnspecified question={question} setUnspecified={setUnspecified} />}
    </div>
  );
};

export default OHRIDate;
