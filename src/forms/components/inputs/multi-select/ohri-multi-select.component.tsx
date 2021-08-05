import { FormGroup, ListItem, UnorderedList } from 'carbon-components-react';
import Checkbox from 'carbon-components-react/lib/components/Checkbox';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { validateFieldValue } from '../../../ohri-form-validators';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty } from '../../value/ohri-value.component';
import { canBeUnspecifiable, OHRIUnspecified } from '../unspecified/ohri-unspecified.component';
import styles from '../_input.scss';

export const OHRIMultiSelect: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [fieldError, setFieldError] = useState(null);
  const [unspecified, setUnspecified] = useState(false);
  const [previoulsySpecified, setPrevioulsySpecified] = useState(false);

  useEffect(() => {
    if (unspecified) {
      setPrevioulsySpecified(true);
      setFieldError(null);
      setFieldValue(question.id, []);
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

  const handleCheckboxChange = (checked, id, event) => {
    if (checked) {
      setFieldValue(question.id, [...field.value, event.currentTarget.value]);
      setFieldError(validateFieldValue([...field.value, event.currentTarget.value], question));
    } else {
      const value = field.value.filter(value => value !== event.currentTarget.value);
      setFieldValue(question.id, value);
      setFieldError(validateFieldValue(value, question));
    }
    question.value = handler.handleFieldSubmission(
      question,
      { checked: checked, id: event.currentTarget.value },
      encounterContext,
    );
  };

  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value?.length ? (
        <UnorderedList style={{ marginLeft: '1rem' }}>
          {handler.getDisplayValue(question, field.value).map(displayValue => (
            <ListItem>{displayValue}</ListItem>
          ))}
        </UnorderedList>
      ) : (
        <OHRIValueEmpty />
      )}
    </div>
  ) : (
    <div>
      <FormGroup legendText={question.label} className={fieldError ? styles.errorLegend : ''}>
        {question.questionOptions.answers.map((option, index) => (
          <Checkbox
            id={`${question.id}-${option.concept}`}
            labelText={option.label}
            value={option.concept}
            key={index}
            onChange={handleCheckboxChange}
            checked={field.value && field.value.includes(option.concept)}
            disabled={encounterContext.sessionMode == 'view'}
          />
        ))}
      </FormGroup>
      {canBeUnspecifiable(question) && <OHRIUnspecified question={question} setUnspecified={setUnspecified} />}
    </div>
  );
};
