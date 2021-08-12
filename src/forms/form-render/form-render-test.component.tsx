import React, { useEffect, useMemo, useState } from 'react';
import { Button, Column, Form, Row, TextArea } from 'carbon-components-react';
import styles from './form-render.scss';
import { useTranslation } from 'react-i18next';
import { Run32 } from '@carbon/icons-react';
import { SessionMode } from '../types';
import { getForm } from '../../utils/forms-loader';
import OHRIForm from '../ohri-form.component';

function FormRenderTest() {
  const { t } = useTranslation();
  const headerTitle = 'Form Render Test';
  const [currentMode, setCurrentMode] = useState<SessionMode>('view');
  const [formInput, setFormInput] = useState('');

  const textareaProps = {
    labelText: 'You can either type or paste well formatted json.',
    className: 'form-group',
    placeholder: 'Enter json...',
    id: 'jsonRenderInput',
    cols: 50,
    rows: 20,
  };

  const ohriRenderForm = useMemo(() => {
    // todo pass json input
    return getForm('hiv', 'hts_retro');
  }, []);

  const renderForm = () => {
    setCurrentMode('view');
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
          <div className={styles.toggleButtons}>
            <Button
              kind="ghost"
              renderIcon={Run32}
              iconDescription="New"
              onClick={e => {
                e.preventDefault();
              }}>
              {t('run', 'Render')}
            </Button>
          </div>
        </div>
        <Row>
          <Column lg={6} md={6} sm={12} style={{ borderRight: '1em' }}>
            <h4>Enter Json</h4>
            <Form>
              <TextArea {...textareaProps} />
              <Button
                type="submit"
                className="form-group"
                style={{ marginTop: '1em' }}
                onClick={e => e.preventDefault()}>
                Submit
              </Button>
            </Form>
          </Column>
          <Column lg={6} md={6} sm={12} style={{ border: '1em' }}>
            <h5>Rendering Form...</h5>
            <OHRIForm formJson={ohriRenderForm} mode={currentMode} />
          </Column>
        </Row>
      </div>
    </div>
  );
}

export default FormRenderTest;
