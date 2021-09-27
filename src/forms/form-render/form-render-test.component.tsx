import React, { useState } from 'react';
import { Button, Column, Dropdown, Form, Row, TextArea, Tabs, Tab } from 'carbon-components-react';
import styles from './form-render.scss';
import { Run32 } from '@carbon/icons-react';
import { OHRIFormSchema, SessionMode } from '../types';
import OHRIForm from '../ohri-form.component';
import { filterFormByIntent } from '../../utils/forms-loader';
import AceEditor from 'react-ace';

function FormRenderTest() {
  const headerTitle = 'Form Render Test';
  const patientUUID = 'b280078a-c0ce-443b-9997-3c66c63ec2f8';
  const [currentFormMode, setCurrentFormMode] = useState<SessionMode>('enter');
  const [formInput, setFormInput] = useState<OHRIFormSchema>();
  const [formIntents, setFormIntents] = useState([]);
  const [formIntentInput, setFormIntentInput] = useState('Empty Intent');
  const [isIntentsDropdownDisabled, setIsIntentsDropdownDisabled] = useState(true);

  const [inputErrorMessage, setInputErrorMessage] = useState<any>('');
  const [outputErrorMessage, setOutputErrorMessage] = useState<any>('');

  const [isSchemaLoaded, setIsSchemaLoaded] = useState(false);
  const [schemaOutput, setSchemaOutput] = useState('');
  const [schemaInput, setSchemaInput] = useState('');

  const textareaProps = {
    className: 'form-group json-render-textarea',
    placeholder: 'You can either type or paste well formatted json',
    id: 'jsonRenderInput',
    cols: 50,
    rows: 30,
  };

  const loadIntentsFromSchema = jsonSchema => {
    let _formIntents = jsonSchema.availableIntents || [];

    if (_formIntents.length > 0) {
      setFormIntentInput(null);
    }

    setFormIntents(_formIntents);
    setIsIntentsDropdownDisabled(false);
  };

  const updateFormIntentInput = e => {
    setFormIntentInput(e.selectedItem.intent);
    setIsSchemaLoaded(false);
  };

  const updateFormJsonInput = e => {
    setInputErrorMessage('');
    try {
      const parsedSchema = JSON.parse(e);
      setSchemaInput(parsedSchema);
      setFormInput(parsedSchema);
      loadIntentsFromSchema(parsedSchema);
    } catch (err) {
      setInputErrorMessage(err.toString());
    }
    setIsSchemaLoaded(false);
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
        <div className={styles.formRenderTitle}>{headerTitle}</div>
        <Row>
          <Column lg={5} md={5} sm={12} style={{ borderRight: '1em' }}>
            <h4>JSON Schema</h4>
            <h5 style={{ color: 'orange', marginBottom: '1rem' }}>{inputErrorMessage}</h5>

            <Tabs type="container">
              <Tab id="tab-form" label="JSON Input" className={styles.renderTab}>
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    handleFormSubmission(e);
                  }}
                  className={styles.txtArea}>
                  <AceEditor mode="json" theme="github" onChange={updateFormJsonInput} name={'jsonText'} />

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
              </Tab>
              <Tab id="tab-json-schema" label="Final Schema">
                <TextArea
                  {...textareaProps}
                  labelText=""
                  placeholder=""
                  value={schemaOutput}
                  name="json-schema-result"
                />
              </Tab>
            </Tabs>
          </Column>
          <Column lg={7} md={7} sm={12} style={{ paddingLeft: '0' }}>
            <h4>Generated Form</h4>
            <div className={styles.formRenderContent}>
              <h5 style={{ color: 'orange', marginBottom: '1rem' }}>{outputErrorMessage}</h5>
              <Tabs type="container">
                <Tab id="tab-form" label="Form Render" className={styles.renderTab}>
                  {isSchemaLoaded ? (
                    <div className={styles.formRenderDisplay}>
                      <OHRIForm formJson={formInput} patientUUID={patientUUID} mode={currentFormMode} />
                    </div>
                  ) : (
                    <p>Please submit the form</p>
                  )}
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
