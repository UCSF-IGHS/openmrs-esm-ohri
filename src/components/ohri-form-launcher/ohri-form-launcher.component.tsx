import React, { useEffect, useMemo, useState } from 'react';
import { Add16 } from '@carbon/icons-react';
import styles from './launcher-with-intent.scss';
import { applyFormIntent } from '../../utils/forms-loader';
import { useTranslation } from 'react-i18next';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';
import { OHRIOverflowMenu } from '../overflow-menu-button/ohri-overflow-menu.component';

export const OHRIFormLauncherWithIntent: React.FC<{
  formJson: any;
  launchForm: (formJson?: any) => void;
  onChangeIntent: (formJson: any) => void;
  dropDownText?: string;
  hideFormLauncher?: boolean;
}> = ({ formJson, launchForm, onChangeIntent, dropDownText, hideFormLauncher }) => {
  // Keeping this here for now, we need to figure out how to enforce users to select an intent when launching a form in edit mode
  // This should be thrown away after the above is resolved
  // const [processedForm, setProcessedForm] = useState(null);
  const { t } = useTranslation();

  //   useEffect(() => {
  //     const processed = applyFormIntent('*', formJson);
  //     setProcessedForm(processed);
  //     onChangeIntent(processed);
  //   }, []);

  return (
    <div style={{ paddingTop: '.3rem' }}>
      {!hideFormLauncher && (
        <OHRIOverflowMenu
          menuTitle={
            <>
              <span className={styles.actionsButtonText}>{t('add', 'Add')}</span>{' '}
              <Add16 style={{ marginLeft: '0.5rem' }} />
            </>
          }
          overflowItems={formJson.availableIntents}
          launchForm={launchForm}
          formJson={formJson}
        />
      )}
    </div>
  );
};
