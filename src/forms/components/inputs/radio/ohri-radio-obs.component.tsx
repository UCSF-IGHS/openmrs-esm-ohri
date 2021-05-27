import React, { useEffect, useState } from 'react';
import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';
import { OhriFormField, OhriAnswerOptionType } from '../../../types';
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
    if (question['obs']) {
      if (encounterContext.sessionMode == 'edit' && !field.value) {
        question['obs'].voided = true;
      } else if (!field.value) {
        question['obs'] = undefined;
      } else {
        question['obs'].value = isBoolean ? value == '18316c68-b5f9-4986-b76d-9975cd0ebe31' : value;
        question['obs'].voided = false;
      }
    } else {
      question['obs'] = {
        person: encounterContext.patient.id,
        obsDatetime: encounterContext.date,
        concept: question.questionOptions.concept,
        location: encounterContext.location,
        order: null,
        groupMembers: [],
        voided: false,
        value: isBoolean ? value == '18316c68-b5f9-4986-b76d-9975cd0ebe31' : value,
      };
    }
  };

  useEffect(() => {
    if (isBoolean) {
      if (question['obs']) {
        question['obs'].value = question['obs'].value.uuid == '18316c68-b5f9-4986-b76d-9975cd0ebe31';
      }
    }
  }, [question['obs'], isBoolean]);

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

export default OHRIRadioObs;
