import React from 'react';
import { FormGroup, ContentSwitcher, Switch } from 'carbon-components-react';
import { OhriFormField, OhriAnswerOptionType } from '../../../types';
import styles from '../_input.scss';
import { useField } from 'formik';
import { OHRIFormContext } from '../../../ohri-form-context';

export const OHRIContentSwitcherObs: React.FC<{ question: OhriFormField; onChange: any }> = ({
  question,
  onChange,
}) => {
  const [field, meta] = useField(question.id);
  const { setFieldValue, encounterContext } = React.useContext(OHRIFormContext);

  const handleChange = value => {
    setFieldValue(question.id, value.name);
    onChange(question.id, value.name);
    question['obs'] = {
      person: encounterContext.patient.id,
      obsDatetime: encounterContext.date,
      concept: question.questionOptions.concept,
      location: encounterContext.location,
      order: null,
      groupMembers: [],
      voided: false,
      value: value.name,
    };
  };

  return (
    <div className={styles.textContainer}>
      <FormGroup legendText={question.label}>
        <ContentSwitcher
          onChange={handleChange}
          selectedIndex={question.questionOptions.answers.indexOf(
            (option: OhriAnswerOptionType) => option.concept == field.value,
          )}>
          {question.questionOptions.answers.map((option: OhriAnswerOptionType, index) => (
            <Switch name={option.concept} text={option.label} key={index} />
          ))}
        </ContentSwitcher>
      </FormGroup>
    </div>
  );
};
