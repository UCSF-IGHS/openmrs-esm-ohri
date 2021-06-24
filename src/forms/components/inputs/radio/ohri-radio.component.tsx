import React, { useEffect, useState } from 'react';
import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { getConcept } from '../../../ohri-form.resource';
import { ConceptTrue } from '../../../constants';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';
import styles from '../_input.scss';

const OHRIRadio: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [isBoolean, setIsBoolean] = useState(false);

  const handleChange = value => {
    setFieldValue(question.id, value);
    onChange(question.id, value);
    question.value = handler.handleFieldSubmission(
      question,
      isBoolean ? value == ConceptTrue : value,
      encounterContext,
    );
  };

  useEffect(() => {
    if (isBoolean) {
      if (question.value?.value && typeof question.value.value != 'boolean') {
        question.value.value = question.value.value.uuid == ConceptTrue;
      }
    }
  }, [question.value, isBoolean]);

  useEffect(() => {
    getConcept(question.questionOptions.concept, 'custom:(uuid,display,datatype:(uuid,display,name))').subscribe(
      result => {
        if (result.datatype.name == 'Boolean') {
          setIsBoolean(true);
        }
      },
    );
  }, [question.questionOptions.concept]);

  return encounterContext.sessionMode == 'view' ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} />
      {field.value ? <OHRIValueDisplay value={handler.getDisplayValue(question, field.value)} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    <div>
      <FormGroup legendText={question.label}>
        <RadioButtonGroup
          defaultSelected="default-selected"
          name={question.id}
          valueSelected={field.value}
          onChange={handleChange}
          orientation="vertical">
          {question.questionOptions.answers.map((answer, index) => {
            return (
              <RadioButton
                id={`${question.id}-${answer.label}`}
                labelText={answer.label}
                value={answer.concept}
                key={index}
              />
            );
          })}
        </RadioButtonGroup>
      </FormGroup>
    </div>
  );
};

export default OHRIRadio;
