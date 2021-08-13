import React, { useState } from 'react';
import { Button, Column, Dropdown, Form, Row, TextArea } from 'carbon-components-react';
import styles from './form-render.scss';
import { Run32 } from '@carbon/icons-react';
import { OHRIFormSchema, SessionMode } from '../types';
import OHRIForm from '../ohri-form.component';

function FormRenderTest() {
  const headerTitle = 'Form Render Test';
  const [currentMode, setCurrentMode] = useState<SessionMode>('enter');
  const [formInput, setFormInput] = useState<OHRIFormSchema>();
  const [programInput, setProgramInput] = useState('');
  const [formIntentInput, setFormIntentInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<any>();

  const patientUUID = 'b280078a-c0ce-443b-9997-3c66c63ec2f8';

  const textareaProps = {
    labelText: 'You can either type or paste well formatted json.',
    className: 'form-group',
    placeholder: 'Enter json...',
    id: 'jsonRenderInput',
    cols: 50,
    rows: 20,
  };

  const programs = [
    {
      id: 'HTS',
      text: 'HTS',
    },
    {
      id: 'Care and Treatment',
      text: 'Care and Treatment',
    },
  ];

  const formIntents = [
    {
      id: 'HTS_RETROSPECTIVE',
      text: 'HTS RETROSPECTIVE',
    },
    {
      id: 'HTS_PRETEST',
      text: 'HTS PRETEST',
    },
    {
      id: 'HTS_HIVTEST',
      text: 'HTS HIVTEST',
    },
    {
      id: 'HTS_POSTTEST',
      text: 'HTS POSTTEST',
    },
  ];

  const updateProgramInput = e => {
    setProgramInput(e.selectedItem.id);
  };

  const updateFormIntentInput = e => {
    setFormIntentInput(e.selectedItem.id);
  };

  const updateJsonInput = e => {
    try {
      setFormInput(JSON.parse(e.target.value));
    } catch (err) {
      setErrorMessage(err.toString);
    }
  };

  const handleFormSubmission = e => {
    // TODO pass program and form intent
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.widgetHeaderContainer}>
          <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
        </div>
        <Row>
          <Column lg={6} md={6} sm={12} style={{ borderRight: '1em' }}>
            <h4>Enter Json</h4>
            <Form
              action=""
              onSubmit={e => {
                e.preventDefault();
                handleFormSubmission(e);
              }}>
              <TextArea {...textareaProps} onChange={updateJsonInput} name={'jsonText'} />

              <div style={{ width: 400 }}>
                <Dropdown
                  id="default"
                  titleText="Programs"
                  label="--Select Program"
                  items={programs}
                  itemToString={item => (item ? item.text : '')}
                  onChange={updateProgramInput}
                />
              </div>

              <div style={{ width: 400 }}>
                <Dropdown
                  id="default"
                  titleText="Form Intent"
                  label="--Select Form Intent"
                  items={formIntents}
                  itemToString={item => (item ? item.text : '')}
                  onChange={updateFormIntentInput}
                />
              </div>
              <Button type="submit" renderIcon={Run32} className="form-group" style={{ marginTop: '1em' }}>
                Render
              </Button>
            </Form>
          </Column>
          <Column lg={6} md={6} sm={12} style={{ border: '1em', minHeight: '200px', backgroundColor: '#F4F4F4' }}>
            <h6>Form Render</h6>
            <h5 style={{ color: 'orange' }}>{errorMessage}</h5>
            {formInput && <OHRIForm formJson={formInput} patientUUID={patientUUID} />}
          </Column>
        </Row>
      </div>
    </div>
  );
}

export default FormRenderTest;
