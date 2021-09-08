import React, { useState } from 'react';
import { Button, Column, Dropdown, Form, Row, TextArea, Tabs, Tab } from 'carbon-components-react';
import styles from './form-render.scss';
import { Run32 } from '@carbon/icons-react';
import { OHRIFormSchema, SessionMode } from '../types';
import OHRIForm from '../ohri-form.component';
import { filterFormByIntent } from '../../utils/forms-loader';

function FormRenderTest() {
  const headerTitle = 'Form Render Test';
  const patientUUID = 'b280078a-c0ce-443b-9997-3c66c63ec2f8';
  const [currentMode, setCurrentMode] = useState<SessionMode>('enter');
  const [formInput, setFormInput] = useState<OHRIFormSchema>();
  const [formIntents, setFormIntents] = useState([]);
  const [formIntentInput, setFormIntentInput] = useState('');
  const [isIntentsDropdownDisabled, setIsIntentsDropdownDisabled] = useState(true);

  const [inputErrorMessage, setInputErrorMessage] = useState<any>('');
  const [outputErrorMessage, setOutputErrorMessage] = useState<any>('');

  const [isSchemaLoaded, setIsSchemaLoaded] = useState(false);
  const [schemaOutput, setSchemaOutput] = useState('');
  const [schemaInput, setSchemaInput] = useState('');

  const textareaProps = {
    labelText: 'You can either type or paste well formatted json.',
    className: 'form-group',
    placeholder: 'Enter json...',
    id: 'jsonRenderInput',
    cols: 50,
    rows: 30,
  };

  const loadIntentsFromSchema = jsonSchema => {
    let _formIntents = [];

    _formIntents = jsonSchema.availableIntents || [];

    setFormIntents(_formIntents);
    setIsIntentsDropdownDisabled(false);
  };

  const updateFormIntentInput = e => {
    setFormIntentInput(e.selectedItem.intent);
  };

  const updateJsonInput = e => {
    setInputErrorMessage('');
    try {
      const parsedSchema = JSON.parse(e.target.value);
      setSchemaInput(parsedSchema);
      loadIntentsFromSchema(parsedSchema);
    } catch (err) {
      setInputErrorMessage(err.toString());
    }
  };

  const handleFormSubmission = e => {
    setIsSchemaLoaded(false);
    setOutputErrorMessage('');

    const filteredSchema = filterFormByIntent(formIntentInput, schemaInput);

    try {
      setSchemaOutput(JSON.stringify(filteredSchema, null, '  '));
      setFormInput(filteredSchema);
    } catch (err) {
      setOutputErrorMessage(err.toString());
    }

    setIsSchemaLoaded(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <Row>
          <Column>
            <div className={styles.widgetHeaderContainer}>
              <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
            </div>
          </Column>
        </Row>
        <Row>
          <Column lg={5} md={5} sm={12} style={{ borderRight: '1em' }}>
            <h4>Enter Json</h4>
            <h5 style={{ color: 'orange', marginBottom: '1rem' }}>{inputErrorMessage}</h5>
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
                  titleText="Form Intent"
                  label="--Select Form Intent"
                  items={formIntents}
                  itemToString={item => item.display}
                  onChange={updateFormIntentInput}
                  disabled={isIntentsDropdownDisabled}
                />
              </div>

              <Button
                type="submit"
                renderIcon={Run32}
                className="form-group"
                style={{ marginTop: '1em' }}
                disabled={!formIntentInput}>
                Render
              </Button>
            </Form>
          </Column>
          <Column lg={7} md={7} sm={12} style={{ paddingLeft: '0' }}>
            <h6 style={{ margin: '8px' }}>Output</h6>
            <div style={{ border: '1rem', minHeight: '780px', backgroundColor: '#F4F4F4' }}>
              <h5 style={{ color: 'orange', marginBottom: '1rem' }}>{outputErrorMessage}</h5>
              <Tabs type="container">
                <Tab id="tab-form" label="Form render">
                  {isSchemaLoaded ? (
                    <div className={styles.formRenderDisplay}>
                      <OHRIForm formJson={formInput} patientUUID={patientUUID} mode={currentMode} />
                    </div>
                  ) : (
                    <p>Please enter a valid schema</p>
                  )}
                </Tab>
                <Tab id="tab-json-schema" label="JSON Schema">
                  <TextArea
                    {...textareaProps}
                    labelText=""
                    placeholder=""
                    value={schemaOutput}
                    name="json-schema-result"
                  />
                </Tab>
              </Tabs>
            </div>
          </Column>
        </Row>
      </div>
    </div>
  );
}

export default FormRenderTest;
