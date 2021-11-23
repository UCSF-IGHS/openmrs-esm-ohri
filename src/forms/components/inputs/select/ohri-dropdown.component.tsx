import React, { useEffect, useState } from 'react';
import { Dropdown } from 'carbon-components-react';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFieldValidator } from '../../../validators/ohri-form-validator';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';
import styles from '../_input.scss';
import { isTrue } from '../../../utils/boolean-utils';
import { fetchConceptNameAndUUID } from '../../../../api/api';

const OHRIDropdown: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [items, setItems] = React.useState([]);
  const [errors, setErrors] = useState([]);
  const [conceptName, setConceptName] = useState('Loading...');

  useEffect(() => {
    if (question['submission']?.errors) {
      setErrors(question['submission']?.errors);
    }
  }, [question['submission']]);

  const handleChange = value => {
    setFieldValue(question.id, value);
    setErrors(OHRIFieldValidator.validate(question, value));
    onChange(question.id, value);
    question.value = handler.handleFieldSubmission(question, value, encounterContext);
  };

  const itemToString = item => {
    const answer = question.questionOptions.answers.find(opt => (opt.value ? opt.value == item : opt.concept == item));
    return answer?.label;
  };
  useEffect(() => {
    setItems(question.questionOptions.answers.map(item => item.value || item.concept));
  }, [question.questionOptions.answers]);

  useEffect(() => {
    fetchConceptNameAndUUID(question.questionOptions.concept).then(({ data }) => {
      if (data.results.length) {
        const concept = data.results[data.results.length - 1];
        setConceptName(`${concept.display} (${concept.uuid})`);
      }
    });
  }, [conceptName]);

  return encounterContext.sessionMode == 'view' || isTrue(question.readonly) ? (
    <div className={`${styles.formField} ${styles.tooltip}`}>
      <OHRILabel value={question.label + ' HERE'} />
      <span className={styles.tooltipText}>Tooltip text - {conceptName}</span>
      {field.value ? <OHRIValueDisplay value={handler.getDisplayValue(question, field.value)} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    !question.isHidden && (
      <div className={styles.formInputField}>
        <div className={errors.length ? styles.errorLabel : styles.dropDownOverride}>
          <Dropdown
            id={question.id}
            titleText={question.label}
            label="Choose an option"
            items={items}
            itemToString={itemToString}
            selectedItem={field.value}
            onChange={({ selectedItem }) => handleChange(selectedItem)}
            disabled={question.disabled}
          />
        </div>
      </div>
    )
  );
};

export default OHRIDropdown;
