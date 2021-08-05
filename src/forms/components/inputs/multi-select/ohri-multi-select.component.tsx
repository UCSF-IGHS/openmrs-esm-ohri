import { FormGroup, ListItem, UnorderedList } from 'carbon-components-react';
import MultiSelect from 'carbon-components-react/lib/components/MultiSelect';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { validateFieldValue } from '../../../ohri-form-validators';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty } from '../../value/ohri-value.component';
import { canBeUnspecifiable, OHRIUnspecified } from '../unspecified/ohri-unspecified.component';
import styles from '../_input.scss';
import { Concept } from '../../../../api/types';

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

  const questionItems = question.questionOptions.answers.map((option, index) => ({
    id: `${question.id}-${option.concept}`,
    concept: option.concept,
    text: option.label,
    key: index,
  }));

  let initiallySelectedQuestionItems = [];
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
    setFieldError(validateFieldValue(selectedItems, question));

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
    <div className={fieldError ? `${styles.dropDownOverride} ${styles.errorLabel}` : styles.dropDownOverride}>
      <MultiSelect
        onChange={handleSelectItemsChange}
        itemToString={item => (item ? item.text : '')}
        id={question.label}
        items={questionItems}
        initialSelectedItems={initiallySelectedQuestionItems}
        label={question.label}
        titleText={question.label}
      />
      {canBeUnspecifiable(question) && <OHRIUnspecified question={question} setUnspecified={setUnspecified} />}
    </div>
  );
};
