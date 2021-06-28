import React, { useMemo } from 'react';
import { FormGroup, ContentSwitcher, Switch } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';

export const OHRIContentSwitcher: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

  const handleChange = value => {
    setFieldValue(question.id, value.name);
    onChange(question.id, value.name);
    question.value = handler.handleFieldSubmission(question, value.name, encounterContext);
  };
  const selectedIndex = useMemo(
    () => question.questionOptions.answers.findIndex(option => option.concept == field.value),
    [field.value],
  );
  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? <OHRIValueDisplay value={handler.getDisplayValue(question, field.value)} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    !question.isHidden && (
      <div className={styles.textContainer}>
        <FormGroup legendText={question.label}>
          <ContentSwitcher onChange={handleChange} selectedIndex={selectedIndex} className={styles.selectedOption}>
            {question.questionOptions.answers.map((option, index) => (
              <Switch
                className={selectedIndex === index ? styles.switchOverrides : styles.switchOverridesNone}
                name={option.concept || option.value}
                text={option.label}
                key={index}
                disabled={encounterContext.sessionMode == 'view'}
              />
            ))}
          </ContentSwitcher>
        </FormGroup>
      </div>
    )
  );
};
