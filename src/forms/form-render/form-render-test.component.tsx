import React, { useEffect, useMemo, useState } from 'react';
import { Button, Column, Form, Row, TextArea } from 'carbon-components-react';
import styles from './form-render.scss';
import { useTranslation } from 'react-i18next';
import { Run32 } from '@carbon/icons-react';
import { OHRIFormSchema, SessionMode } from '../types';
import { getForm } from '../../utils/forms-loader';
import OHRIForm from '../ohri-form.component';

function FormRenderTest() {
  const { t } = useTranslation();
  const headerTitle = 'Form Render Test';
  const [currentMode, setCurrentMode] = useState<SessionMode>('enter');
  const [isLoading, setIsLoading] = useState(false); // do we still need this?
  const [formInput, setFormInput] = useState<OHRIFormSchema>();

  const patientUUID = 'b280078a-c0ce-443b-9997-3c66c63ec2f8';

  const textareaProps = {
    labelText: 'You can either type or paste well formatted json.',
    className: 'form-group',
    placeholder: 'Enter json...',
    id: 'jsonRenderInput',
    cols: 50,
    rows: 20,
  };

  const handleInputChange = e => {
    setFormInput(JSON.parse(e.target.value));
  };

  useEffect(() => {
    // if (!page) setIsLoading(true);
    // renderForm(jsonInput);
    // setIsLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.widgetHeaderContainer}>
          <h4 className={`${styles.productiveHeading03} ${styles.text02}`}>{headerTitle}</h4>
        </div>
        <Row>
          <Column lg={6} md={6} sm={12} style={{ borderRight: '1em' }}>
            <h4>Enter Json</h4>
            <TextArea {...textareaProps} onChange={handleInputChange} />
          </Column>
          <Column lg={6} md={6} sm={12} style={{ border: '1em' }}>
            <h5>Rendering Form...</h5>
            {formInput && <OHRIForm formJson={formInput} patientUUID={patientUUID} />}
          </Column>
        </Row>
      </div>
    </div>
  );
}

export default FormRenderTest;
