import { FormGroup, ListItem, UnorderedList } from 'carbon-components-react';
import MultiSelect from 'carbon-components-react/lib/components/MultiSelect';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFieldValidator } from '../../../ohri-form-validator';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty } from '../../value/ohri-value.component';
import styles from '../_input.scss';

export const OHRIMultiSelect: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [errors, setErrors] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (field.value && field.value.length == 0) {
      // chances are high the value was cleared
      // force the Multiselect component to be re-mounted
      setCounter(counter + 1);
    }
  }, [field.value]);

  useEffect(() => {
    if (question['submission']?.errors) {
      setErrors(question['submission']?.errors);
    }
  }, [question['submission']]);

  const questionItems = question.questionOptions.answers.map((option, index) => ({
    id: `${question.id}-${option.concept}`,
    concept: option.concept,
    text: option.label,
    key: index,
  }));

  const initiallySelectedQuestionItems = [];
  questionItems.forEach(item => {
    if (field.value.includes(item.concept)) {
      initiallySelectedQuestionItems.push(item);
    }
  });

  const handleSelectItemsChange = ({ selectedItems }) => {
    setFieldValue(
      question.id,
      selectedItems.map(selectedItem => selectedItem.concept),
    );
    setErrors(OHRIFieldValidator.validate(question, selectedItems));

    question.value = handler.handleFieldSubmission(
      question,
      selectedItems.map(selectedItem => ({
        checked: true,
        id: selectedItem.concept,
      })),
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
    <div className={errors.length ? `${styles.dropDownOverride} ${styles.errorLabel}` : styles.dropDownOverride}>
      <MultiSelect
        onChange={handleSelectItemsChange}
        itemToString={item => (item ? item.text : '')}
        id={question.label}
        items={questionItems}
        initialSelectedItems={initiallySelectedQuestionItems}
        label={question.label}
        titleText={question.label}
        key={counter}
      />
    </div>
  );
};
