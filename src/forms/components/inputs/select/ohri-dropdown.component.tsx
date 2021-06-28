import Dropdown from 'carbon-components-react/lib/components/Dropdown';
import { useField } from 'formik';
import React, { useEffect } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';
import styles from '../_input.scss';

const OHRIDropdown: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [items, setItems] = React.useState([]);

  const handleChange = value => {
    setFieldValue(question.id, value);
    onChange(question.id, value);
    question.value = handler.handleFieldSubmission(question, value, encounterContext);
  };

  const itemToString = item => {
    const answer = question.questionOptions.answers.find(opt => (opt.value ? opt.value == item : opt.concept == item));
    return answer.label;
  };
  useEffect(() => {
    setItems(question.questionOptions.answers.map(item => item.value || item.concept));
  }, [question.questionOptions.answers]);

  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? <OHRIValueDisplay value={handler.getDisplayValue(question, field.value)} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    <div className={styles.formInputField}>
      <Dropdown
        id={question.id}
        titleText={question.label}
        label="Choose an option"
        items={items}
        itemToString={itemToString}
        selectedItem={field.value}
        onChange={({ selectedItem }) => handleChange(selectedItem)}
      />
    </div>
  );
};

export default OHRIDropdown;
