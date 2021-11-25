import React, { useEffect, useState } from 'react';
import { Toggle } from 'carbon-components-react';
import { OHRIFormFieldProps } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { OHRILabel } from '../../label/ohri-label.component';
import { OHRIValueEmpty, OHRIValueDisplay } from '../../value/ohri-value.component';
import { isTrue } from '../../../utils/boolean-utils';
import { fetchConceptNameAndUUID } from '../../../../api/api';

const OHRIToggle: React.FC<OHRIFormFieldProps> = ({ question, onChange, handler }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext, values } = React.useContext(OHRIFormContext);
  const [conceptName, setConceptName] = useState('Loading...');

  const handleChange = value => {
    setFieldValue(question.id, value);
    onChange(question.id, value);
    question.value = handler.handleFieldSubmission(question, value, encounterContext);
  };

  useEffect(() => {
    // The toogle input doesn't support blank values
    // by default, the value should be false
    if (!question.value && encounterContext.sessionMode == 'enter') {
      question.value = handler.handleFieldSubmission(question, field.value, encounterContext);
    }
  }, []);

  useEffect(() => {
    fetchConceptNameAndUUID(question.questionOptions.concept).then(({ data }) => {
      if (data.results.length) {
        const concept = data.results[data.results.length - 1];
        setConceptName(`Concept Name: ${concept.display} \n UUID: ${concept.uuid}`);
      }
    });
  }, [conceptName]);

  return encounterContext.sessionMode == 'view' || isTrue(question.readonly) ? (
    <div className={styles.formField}>
      <OHRILabel value={question.label} tooltipText={conceptName} />
      {field.value ? <OHRIValueDisplay value={handler.getDisplayValue(question, field.value)} /> : <OHRIValueEmpty />}
    </div>
  ) : (
    !question.isHidden && (
      <div className={styles.formField}>
        <Toggle
          labelText={question.label}
          id={question.id}
          labelA={question.questionOptions.toggleOptions.labelFalse}
          labelB={question.questionOptions.toggleOptions.labelTrue}
          onToggle={handleChange}
          toggled={!!field.value}
          disabled={question.disabled}
        />
      </div>
    )
  );
};

export default OHRIToggle;
