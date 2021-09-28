import React, { useState } from 'react';
import { Button, Column, Dropdown, Form, Row, Tabs, Tab } from 'carbon-components-react';
import styles from './form-render.scss';
import { Run32 } from '@carbon/icons-react';
import { OHRIFormSchema, SessionMode } from '../types';
import OHRIForm from '../ohri-form.component';
import { filterFormByIntent } from '../../utils/forms-loader';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';

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
  const [editorTheme, setEditorTheme] = useState('github');

  const availableEditorThemes = [
    'monokai',
    'github',
    'tomorrow',
    'kuroir',
    'twilight',
    'xcode',
    'solarized_dark',
    'solarized_light',
    'terminal',
  ];

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
          <Column lg={5} md={5} sm={12} className={styles.renderColumn}>
            <h4>JSON Schema</h4>
            <h5 style={{ color: 'orange', marginBottom: '1rem' }}>{inputErrorMessage}</h5>

            <Tabs type="container">
              <Tab id="tab-form" label="JSON Input">
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    handleFormSubmission(e);
                  }}>
                  <AceEditor
                    mode="json"
                    theme={editorTheme}
                    onChange={updateFormJsonInput}
                    name={'jsonText'}
                    placeholder="Enter JSON Text"
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    width="100%"
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      displayIndentGuides: true,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                    }}
                  />

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

                  <div style={{ width: 400 }}>
                    <Dropdown
                      id=""
                      titleText="JSON Editor Theme"
                      label={editorTheme}
                      items={availableEditorThemes}
                      itemToString={item => item}
                      onChange={e => {
                        setEditorTheme(e.selectedItem);
                      }}
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
                <div className={styles.finalJsonSchema}>
                  <AceEditor
                    mode="json"
                    theme={editorTheme}
                    value={schemaOutput}
                    name={'json-schema-result'}
                    placeholder=""
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    width="100%"
                    height="700px"
                    readOnly={true}
                    setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      displayIndentGuides: true,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                    }}
                  />
                </div>
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
