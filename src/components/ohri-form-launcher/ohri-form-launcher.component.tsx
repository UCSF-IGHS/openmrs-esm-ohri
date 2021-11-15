import React from 'react';
import { Add16 } from '@carbon/icons-react';
import styles from './launcher-with-intent.scss';
import { useTranslation } from 'react-i18next';
import { OHRIOverflowMenu } from '../overflow-menu-button/ohri-overflow-menu.component';

export const OHRIFormLauncherWithIntent: React.FC<{
  formJson?: any;
  launchForm: (formJson?: any) => void;
  onChangeIntent: (formJson: any) => void;
  dropDownText?: string;
  hideFormLauncher?: boolean;
  formsJson?: Array<any>;
}> = ({ formJson, launchForm, onChangeIntent, dropDownText, hideFormLauncher, formsJson }) => {
  // Keeping this here for now, we need to figure out how to enforce users to select an intent when launching a form in edit mode
  // This should be thrown away after the above is resolved
  // const [processedForm, setProcessedForm] = useState(null);
  const { t } = useTranslation();

  //   useEffect(() => {
  //     const processed = applyFormIntent('*', formJson);
  //     setProcessedForm(processed);
  //     onChangeIntent(processed);
  //   }, []);

  let overFlowItems = [];
  if (formsJson && formsJson.length > 1) {
    overFlowItems = formsJson.map(item => {
      return { formJson: item, availableIntents: item.availableIntents };
    });
  } else {
    overFlowItems = [{ formJson: formJson, availableIntents: formJson.availableIntents }];
  }

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
          overflowItems={overFlowItems}
          launchForm={launchForm}
          formJson={formJson}
        />
      )}
    </div>
  );
};
