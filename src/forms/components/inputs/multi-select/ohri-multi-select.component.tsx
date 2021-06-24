import { FormGroup, ListItem, UnorderedList } from 'carbon-components-react';
import Checkbox from 'carbon-components-react/lib/components/Checkbox';
import { useField } from 'formik';
import React from 'react';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRIFormFieldProps } from '../../../types';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty } from '../../value/ohri-value.component';
import styles from '../_input.scss';

export const OHRIMultiSelect: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

  const handleCheckboxChange = (checked, id, event) => {
    if (checked) {
      setFieldValue(question.id, [...field.value, event.currentTarget.value]);
    } else {
      setFieldValue(
        question.id,
        field.value.filter(value => value !== event.currentTarget.value),
      );
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
      <FormGroup legendText={question.label}>
        {question.questionOptions.answers.map((option, index) => (
          <Checkbox
            id={`${question.id}-${option.concept}`}
            labelText={option.label}
            value={option.concept}
            key={index}
            onChange={handleCheckboxChange}
            checked={field.value.includes(option.concept)}
            disabled={encounterContext.sessionMode == 'view'}
          />
        ))}
      </FormGroup>
    </div>
  );
};
