import React, { useMemo } from 'react';
import { OHRIFormFieldProps } from '../../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';

const OHRIDate: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const onDateChange = ([date]) => {
    const refinedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    setFieldValue(question.id, refinedDate);
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
        className={styles.datePickerOverrides}
        dateFormat={carbonDateformat}>
        <DatePickerInput
          id={question.id}
          placeholder={placeHolder}
          labelText={question.label}
          value={field.value instanceof Date ? field.value.toLocaleDateString(window.navigator.language) : field.value}
        />
      </DatePicker>
    </div>
  );
};

export default OHRIDate;
