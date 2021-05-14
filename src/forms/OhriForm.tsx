import React, { useState } from 'react';
import Sample from './sample';
import OHRITextObs from './components/inputs/OHRI-text-obs.component';
import OHRIRadioObs from './components/inputs/OHRI-radio-obs.component';
import OHRIDateObs from './components/inputs/OHRI-date-obs.component';
import { Button, ButtonSet } from 'carbon-components-react';
import styles from './_form.scss';

function OHRIForm() {
  const [fields, setFields] = useState(Sample.pages[0].sections[0].questions);
  const [textValue, setTextValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [dateValue, setDateValue] = useState('');

  const handleFormSubmit = value => {
    return value;
  };

  const handleTextInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // return event;
    setTextValue(event.target.value);
    // eslint-disable-next-line no-console
    // console.log(textValue);
  };

  const handleRadioInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // return event;
    setRadioValue(event.target.value);
    // eslint-disable-next-line no-console
    // console.log(radioValue);
  };

  const handleDateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // return event;
    setDateValue(event.target.value);
    // eslint-disable-next-line no-console
    // console.log(dateValue);
  };


  return (
    <div className={styles.ohriformcontainer}>
      {fields.map(function(question, q) {
        const type = question.questionOptions.rendering;
        if (type == 'number') {
          return <OHRITextObs questions={question} onChange={handleTextInput} />;
        } else if (type == 'radio') {
          return <OHRIRadioObs questions={question} onChange={handleRadioInput} />;
        } else if (type == 'date') {
          return <OHRIDateObs questions={question} onChange={handleDateInput} />;
        }
      })}
      <ButtonSet>
        <Button kind="secondary">Cancel</Button>
        <Button kind="primary">Save</Button>
      </ButtonSet>
    </div>
  );
}

export default OHRIForm;
