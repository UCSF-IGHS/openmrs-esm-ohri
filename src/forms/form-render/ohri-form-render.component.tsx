import React, { useEffect } from 'react';

import styles from './form-render.scss';
import Button from 'carbon-components-react/es/components/Button';
import { Run32 } from '@carbon/icons-react';
import { useTranslation } from 'react-i18next';
import { TextArea } from 'carbon-components-react';

const OHRIFormRender = () => {
  const { t } = useTranslation();
  const headerTitle = 'Form Render Test';

  useEffect(() => {
    // if (!page) setIsLoading(true);
    // loadPatients(nextOffSet, pageSize);
    // setIsLoading(false);
  }, []);

  return (
    <>
      <div className={styles.widgetContainer}>
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
        {/*<OHRITextArea handler={ onclick } />*/}
        <TextArea labelText="Enter form json?" name="form-json" value="" className={styles.textInputOverrides} />
      </div>
    </>
  );
};

export default OHRIFormRender;
