import { FormGroup, ListItem, UnorderedList } from 'carbon-components-react';
import MultiSelect from 'carbon-components-react/lib/components/MultiSelect';
import { useField } from 'formik';
import React from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty } from '../../value/ohri-value.component';
import { canBeUnspecifiable, OHRIUnspecified } from '../unspecified/ohri-unspecified.component';
import styles from '../_input.scss';
import { Concept } from '../../../../api/types';

export const OHRIMultiSelect: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

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
    <div className={styles.dropDownOverride}>
      <MultiSelect
        onChange={handleSelectItemsChange}
        itemToString={item => (item ? item.text : '')}
        id={question.label}
        items={questionItems}
        initialSelectedItems={initiallySelectedQuestionItems}
        label={question.label}
        titleText={question.label}
      />
    </div>
  );
};
