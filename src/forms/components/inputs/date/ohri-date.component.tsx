import React, { useEffect, useMemo, useState } from 'react';
import { OHRIFormFieldProps } from '../../../types';
import { DatePicker, DatePickerInput } from 'carbon-components-react';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import styles from '../_input.scss';
import { fieldRequiredErrCode } from '../../../validators/ohri-form-validator';
import { isTrue } from '../../../utils/boolean-utils';
import { getConceptNameAndUUID, isInlineView } from '../../../utils/ohri-form-helper';
import { OHRIFieldValueView } from '../../value/view/ohri-field-value-view.component';

const OHRIDate: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext, layoutType, workspaceLayout } = React.useContext(OHRIFormContext);
  const [errors, setErrors] = useState([]);
  const [conceptName, setConceptName] = useState('Loading...');
  const isFieldRequiredError = useMemo(() => errors[0]?.errCode == fieldRequiredErrCode, [errors]);

  useEffect(() => {
    if (question['submission']?.errors) {
      setErrors(question['submission']?.errors);
    }
  }, [question['submission']]);

  const isInline = useMemo(() => {
    if (encounterContext.sessionMode == 'view' || isTrue(question.readonly)) {
      return isInlineView(question.inlineRendering, layoutType, workspaceLayout);
    }
    return false;
  }, [encounterContext.sessionMode, question.readonly, question.inlineRendering, layoutType, workspaceLayout]);

  const onDateChange = ([date]) => {
    const refinedDate = date instanceof Date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000) : date;
    setFieldValue(question.id, refinedDate);
    onChange(question.id, refinedDate, setErrors);
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

  useEffect(() => {
    getConceptNameAndUUID(question.questionOptions.concept).then(conceptTooltip => {
      setConceptName(conceptTooltip);
    });
  }, [conceptName]);

  return encounterContext.sessionMode == 'view' || isTrue(question.readonly) ? (
    <OHRIFieldValueView
      label={question.label}
      value={field.value instanceof Date ? field.value.toLocaleDateString(window.navigator.language) : field.value}
      conceptName={conceptName}
      isInline={isInline}
    />
  ) : (
    !question.isHidden && (
      <div className={styles.formField}>
        <DatePicker
          datePickerType="single"
          onChange={onDateChange}
          className={`${styles.datePickerOverrides} ${isFieldRequiredError ? styles.errorLabel : ''} ${
            question.disabled || isTrue(question.readonly) ? styles.disabledLabelOverrides : ''
          }`}
          dateFormat={carbonDateformat}>
          <DatePickerInput
            id={question.id}
            placeholder={placeHolder}
            labelText={question.label}
            value={
              field.value instanceof Date ? field.value.toLocaleDateString(window.navigator.language) : field.value
            }
            disabled={question.disabled}
            invalid={!isFieldRequiredError && errors.length > 0}
            invalidText={errors[0]?.errMessage}
          />
        </DatePicker>
      </div>
    )
  );
};

export default OHRIDate;
