import React, { useEffect, useState } from 'react';
import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { OhriFormField, OhriAnswerOptionType } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';
import { getConcept } from '../../../ohri-form.resource';

const OHRIRadioObs: React.FC<{ question: OhriFormField; onChange: any }> = ({ question, onChange }) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);
  const [isBoolean, setIsBoolean] = useState(false);

  const handleChange = value => {
    setFieldValue(question.id, value);
    onChange(question.id, value);
    question['obs'] = {
      person: encounterContext.patient.id,
      obsDatetime: encounterContext.date,
      concept: question.questionOptions.concept,
      location: encounterContext.location,
      order: null,
      groupMembers: [],
      voided: false,
      value: isBoolean ? value == '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' : value,
    };
  };

  useEffect(() => {
    getConcept(question.questionOptions.concept, 'custom:(uuid,display,datatype:(uuid,display,name))').subscribe(
      result => {
        if (result.datatype.name == 'Boolean') {
          setIsBoolean(true);
        }
      },
    );
  }, [question.questionOptions.concept]);

  return (
    <div>
      <FormGroup legendText={question.label}>
        <RadioButtonGroup
          defaultSelected="default-selected"
          name={question.id}
          valueSelected={field.value}
          onChange={handleChange}>
          {question.questionOptions.answers.map((answer: OhriAnswerOptionType, index) => {
            return <RadioButton id={answer.label} labelText={answer.label} value={answer.concept} key={index} />;
          })}
        </RadioButtonGroup>
      </FormGroup>
    </div>
  );
};

export default OHRIRadioObs;
