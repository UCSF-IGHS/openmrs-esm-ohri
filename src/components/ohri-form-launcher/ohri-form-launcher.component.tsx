import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown, OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import styles from './laucher-with-intent.scss';
import { filterFormByIntent } from '../../utils/forms-loader';
import { useTranslation } from 'react-i18next';
import { launchOHRIWorkSpace } from '../../workspace/ohri-workspace-utils';

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
  //     const processed = filterFormByIntent('*', formJson);
  //     setProcessedForm(processed);
  //     onChangeIntent(processed);
  //   }, []);

  return (
    <div style={{ paddingTop: '.3rem', paddingRight: '.5rem', width: '13rem' }}>
      {!hideFormLauncher && (
        <OverflowMenu
          flipped={true}
          className={styles.flippedOverflowMenu}
          renderIcon={Add16}
          iconDescription="Add"
          ariaLabel="Add">
          {formJson.availableIntents.map((intent, index) => {
            return (
              <OverflowMenuItem
                itemText={intent.display}
                onClick={e => {
                  e.preventDefault();
                  const processedForm = filterFormByIntent(intent.intent, formJson);
                  launchForm(processedForm);
                }}
              />
            );
          })}
        </OverflowMenu>

        // <Button
        //   kind="ghost"
        //   renderIcon={Add16}
        //   onClick={e => {
        //     e.preventDefault();
        //     // launchForm();
        //     intentActionOverflowMenu;
        //   }}>
        //   {t('add', 'Add')}
        // </Button>

        // <Dropdown
        //   id="choose-intent"
        //   label={dropDownText || 'New'}
        //   items={formJson.availableIntents}
        //   titleText=""
        //   selectedItem={null}
        //   onChange={({ selectedItem }) => {
        //     const processedForm = filterFormByIntent(selectedItem.intent, formJson);
        //     // setProcessedForm(processedForm);
        //     // onChangeIntent(processedForm);
        //     launchForm(processedForm);
        //   }}
        //   itemToString={item => item.display}
        // />
      )}
    </div>
  );
};
