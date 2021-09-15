import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dropdown } from 'carbon-components-react';
import styles from './laucher-with-intent.scss';
import { filterFormByIntent } from '../../utils/forms-loader';
import { navigate } from '@openmrs/esm-framework';

export const OHRIHomeFormLauncherWithIntent: React.FC<{
  formJson: any;
  launchForm: (formJson?: any) => void;
  onChangeIntent: (formJson: any) => void;
  titleText: string;
}> = ({ formJson, launchForm, onChangeIntent, titleText }) => {
  //TODO: Refact the
  const basePath = 'patient/b280078a-c0ce-443b-9997-3c66c63ec2f8/chart/hts-summary';
  const [rerender, setRerender] = useState(true);
  const forceRerender = () => setRerender(!rerender);

  return (
    <div style={{ paddingTop: '.3rem', paddingRight: '.5rem', width: '13rem' }}>
      <Dropdown
        id="choose-intent"
        label={titleText}
        items={formJson.availableIntents}
        titleText=""
        selectedItem={null}
        onChange={({ selectedItem }) => {
          const processedForm = filterFormByIntent(selectedItem.intent, formJson);
          launchForm(processedForm);
        }}
        itemToString={item => item.display}
        onClick={e => {
          handleLinkClick(e, `${basePath}`);
          forceRerender();
          document.dispatchEvent(new CustomEvent('navigation-from-covid'));
        }}
      />
    </div>
  );
};

export function handleLinkClick(event: any, to: string) {
  event.preventDefault();
  navigate({ to });
}
