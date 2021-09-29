import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import styles from './laucher-with-intent.scss';
import { filterFormByIntent } from '../../utils/forms-loader';

export const OHRIFormLauncherWithIntent: React.FC<{
  formJson: any;
  launchForm: (formJson?: any) => void;
  onChangeIntent: (formJson: any) => void;
  dropDownText?: string;
}> = ({ formJson, launchForm, onChangeIntent, dropDownText }) => {
  // Keeping this here for now, we need to figureout how to enforce users to select an intent when launching a form in edit mode
  // This should be thrown away after the above is resolved
  // const [processedForm, setProcessedForm] = useState(null);

  //   useEffect(() => {
  //     const processed = filterFormByIntent('*', formJson);
  //     setProcessedForm(processed);
  //     onChangeIntent(processed);
  //   }, []);

  return (
    <div style={{ paddingTop: '.3rem', paddingRight: '.5rem', width: '13rem' }}>
      <Dropdown
        id="choose-intent"
        label={dropDownText || 'New'}
        items={formJson.availableIntents}
        titleText=""
        selectedItem={null}
        onChange={({ selectedItem }) => {
          const processedForm = filterFormByIntent(selectedItem.intent, formJson);
          // setProcessedForm(processedForm);
          // onChangeIntent(processedForm);
          launchForm(processedForm);
        }}
        itemToString={item => item.display}
      />
    </div>
  );
};
